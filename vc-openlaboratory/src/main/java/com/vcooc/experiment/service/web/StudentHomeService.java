package com.vcooc.experiment.service.web;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.internet.MimeUtility;
import javax.persistence.Transient;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.multipart.MultipartFile;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.ClockingIn;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentFile;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabBlacklist;
import com.vcooc.base.pojo.LabClockInMachine;
import com.vcooc.base.pojo.LabManager;
import com.vcooc.base.pojo.ResourceCollection;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.ResourceLibrary;
import com.vcooc.base.pojo.ScheduleClass;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.base.pojo.Semester;
import com.vcooc.base.pojo.StudentExperimentResult;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.StudentNotes;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherMsgResult;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileFormatUtil;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.common.util.JavaCallOpenoffice;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.dto.ExperimentFileNameDTO;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ExperimentCourseMapper;
import com.vcooc.experiment.mapper.ExperimentFileMapper;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.ExperimentMapper;
import com.vcooc.experiment.mapper.LabClockInMachineMapper;
import com.vcooc.experiment.mapper.ResourceFileMapper;
import com.vcooc.experiment.mapper.ScheduleStudentScoreMapper;
import com.vcooc.experiment.mapper.StudentHomeMapper;
import com.vcooc.experiment.mapper.StudentNotesMapper;
import com.vcooc.experiment.mapper.StudnetInfoMapper;
import com.vcooc.experiment.mapper.SubmitExperimentFileMapper;
import com.vcooc.experiment.service.ExperimentFileService;
import com.vcooc.experiment.service.SemesterService;
import com.vcooc.util.DateUtils;
import com.vcooc.util.UUIDUtils;

import eu.bitwalker.useragentutils.UserAgent;

/**
 * @author ITcast
 *
 */
@Service
public class StudentHomeService {

	@Autowired
	private SemesterService semesterService;
	@Autowired
	private StudentHomeMapper studentHomeMapper;
	@Autowired
	private ClockinConfig clockinConfig; // 转换时间工具
	@Autowired
	private StudentNotesMapper studentNotesMapper;
	@Autowired
	private ResourceFileMapper resourceFileMapper;
	@Autowired
	private ExperimentFileService experimentFileService;
	@Autowired
	private SubmitExperimentFileMapper submitExperimentFileMapper;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	@Autowired
	private ScheduleStudentScoreMapper scheduleStudentScoreMapper;
	@Autowired
	private ExperimentFileMapper experimentFileMapper;
	@Autowired
	private ExperimentLabMapper experimentLabMapper;
	@Autowired
	private StudnetInfoMapper studnetInfoMapper;
	@Autowired
	private ExperimentCourseMapper experimentCourseMapper;
	@Autowired
	private ExperimentMapper experimentMapper;
	@PropertyConfig
	private String VS_EXPERIMENT;// 项目路径
	@PropertyConfig
	private String FILE_PATH;// 资源的路径
	private String StudentFile = "StudentFile";//学生目录
	@PropertyConfig
	private String FILE_FORMAT;// 允许上传的文件格式
	@PropertyConfig
	private String SWF_PATH; // swf转换工具路径
	// openoffice配置
	@PropertyConfig
	private String OPENOFFICEPATH;
	@PropertyConfig
	private String OPENOFFICEDICK;
	@PropertyConfig
	private String PROGRAMPATH;
	@PropertyConfig
	private String OPENOFFICEHOST;
	@PropertyConfig
	private String OPENOFFICEPORT;
	// 学生笔记日期转换工具
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");// 格式化时间
	private final static SimpleDateFormat SDF1 = new SimpleDateFormat("yyyy-MM");
	private final static SimpleDateFormat SDF2 = new SimpleDateFormat("dd");
	private final static SimpleDateFormat SDF3 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	@Autowired
	private LabClockInMachineMapper labClockInMachineMapper;
	/**
	 * 根据学生id和一学期的id，查询所在班级的排课记录
	 * 
	 * @param exprimentLabId
	 *            id
	 * @param semesterId
	 *            学期id
	 * @param number
	 *            判断参数 0 不查询 我的预约实验 1 查询我的预约实验
	 * @return 关联查询任课教师，课程
	 */
	public Map<String, Object> getPersonSchedule(Integer classId, Integer studentId, Integer semesterId,
			Integer number) {
		// 关联查询班级
		// 根据学期的id 获取该学期的时间
		Semester semester = semesterService.selectSemesterById(semesterId);
		if (semester != null) {
			// 判断一下,是否是当前这个学期,如果是,返回第几周，不是,则返回第一周
			Map<String, Object> map = new HashMap<String, Object>();
			long dayCount = CountDay(semester.getStartTime(), semester.getEndTime()); // 这个学期的共计天数
			if (dayCount > 0) {
				map.put("dayCount", dayCount); // 学期总天数
				// map.put("weekCount", Surplus(dayCount, 7));// 总周数
				map.put("weekCount", DateUtils.weekNum(DateUtils.dateToStrYMD(semester.getStartTime()),
						DateUtils.dateToStrYMD(semester.getEndTime())));// 总周数

				long current = CountDay(semester.getStartTime(), new Date());// 学期开始过了多少天

				// 现在第几周/第1周,如果总的天数小于已过天数，说明并不是当前这个学期
				if (current > 0 && CountDay(semester.getEndTime(), new Date()) < 0){
					// map.put("weekNum", Surplus(current, 7));
					map.put("weekNum", DateUtils.selectWeekNum(semester.getStartTime(), semester.getEndTime())[0]);

				}else {
					// 周数
					map.put("weekNum", 1);
					// 第一周的周一
					map.put("monday", new SimpleDateFormat("yyyy-MM-dd").format(getMonday(semester.getStartTime())));

				}
			}
			// 查询排课记录,因为第一周的日期不一定是周一，有可能用户会误操作，
			// 将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
			Calendar atart = Calendar.getInstance();
			atart.setTime(semester.getStartTime());
			atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天

			if (number == 0) {
				// 获取整个学期的课程表
				map.put("scheduleList", studentHomeMapper.AselectMyHomeScheduleByLabId(atart.getTime(),
						semester.getEndTime(), classId, null, null, null));
			}
			if (number == 1) {
				// 获取我的预约信息
				map.put("studentAppointmentList", studentHomeMapper.studentAppointmentList(atart.getTime(),
						semester.getEndTime(), studentId, null, null, null));
			}
			return map;
		}
		return null;
	}

	/**
	 * 统计天数
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @return
	 */
	public long CountDay(Date startTime, Date endTime) {
		return (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
	}

	/**
	 * 求余 整除的话直接相除 不整除，结果+1
	 * 
	 * @param dividends
	 *            被除数
	 * @param divisor
	 *            除数
	 * @return 异常参数处理，如果分子或者分母为0,,返回0
	 */
	public long Surplus(long dividends, long divisor) {
		if (dividends == 0 || divisor == 0)
			return 0;
		return dividends % divisor == 0 ? dividends / divisor : dividends / divisor + 1;
	}

	/**
	 * 查询所有学期信息
	 * 
	 * @param stealth
	 * @return
	 */
	public List<Semester> selectSemester(Integer stealth) {
		List<Semester> result = semesterService.selectSemester(2);
		for (Semester i : result) {
			/*
			 * i.setMondayTime(new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss"
			 * ).format(getMonday(i.getStartTime())).replace(" ", "T"));
			 */
			i.setMondayTime(new SimpleDateFormat("yyyy-MM-dd").format(getMonday(i.getStartTime())));
		}
		return result;
	}

	/**
	 * 获取周一时间
	 * 
	 * @param time
	 * @return
	 */
	public Date getMonday(Date time) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(time);
		// 判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
		int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
		if (1 == dayWeek)
			cal.add(Calendar.DAY_OF_MONTH, -1);
		cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一
		int day = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天
		cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
		return cal.getTime(); // 周一时间
	}

	/**
	 * 学生Id 获取自主预约总数 历史记录总数
	 * 
	 * @param studentId
	 * @return
	 */
	public Integer countScourseStudent(Integer studentId) {
		Integer countList = studentHomeMapper.countList(studentId);
		return countList;
	}

	/**
	 * 该学生所在班级所关联并在显示的课程
	 * 
	 * @param classId
	 * @return
	 */
	public Integer countExperimenTcourse(Integer classId) {
		Integer countExperimentcourse = studentHomeMapper.countExperimenTcourse(classId);
		return countExperimentcourse;
	}

	/**
	 * 该学生所在班级所关联课程下的实验
	 * 
	 * @param classId
	 * @return
	 */
	public Integer countexperimentList(Integer classId) {
		Integer experimentList = studentHomeMapper.countexperimentList(classId);
		return experimentList;
	}

	/**
	 *  获取课程所有明细
	 * @param experimentId 实验Id
	 * 
	 * @param scheduleId 排课id 
	 * @return
	 */
	public Experiment finallExperimentList(Integer experimentId, Integer scheduleId) {
		Experiment experimentList = studentHomeMapper.finallExperimentList(experimentId,scheduleId);
		// 将 字节[A...]转换为时间
		String time = clockinConfig.getTime(experimentList.getExCourseSchedule());
		experimentList.setExCourseScheduleByte(time);
		return experimentList;
	}

	/**
	 * 根据实验室获取实验室详情
	 * 
	 * @param labId
	 * @return
	 */
	public ExperimentLab finallexperimentLab(Integer labId) {
		ExperimentLab experimentLab = studentHomeMapper.finallexperimentLab(labId);
		// TODO Auto-generated method stub
		return experimentLab;
	}

	/**
	 * 实验室Id 获取管理员
	 * 
	 * @param labId
	 * @return
	 */
	public List<LabManager> finAllExperimentLabManager(Integer labId) {
		List<LabManager> experimentLabManager = studentHomeMapper.finAllExperimentLabManager(labId);
		return experimentLabManager;
	}

	/**
	 * 课程表Id 获取课程下面的班级
	 * 
	 * @param scheduleId
	 * @return
	 */
	public List<ScheduleClass> finAllscheduleClassList(Integer scheduleId) {
		List<ScheduleClass> scheduleClassList = studentHomeMapper.finAllscheduleClassList(scheduleId);
		return scheduleClassList;
	}

	/**
	 * 学生id 课程表id 获取该学生对该课程是否已经考勤的信息(考勤机数据写入课程成绩表)
	 * 
	 * @param studentId
	 * @param scheduleId
	 * @return
	 */
	public ScheduleStudentScore selectStudenClockingIn(Integer studentId, Integer scheduleId) {
		ScheduleStudentScore studenClockingIn = studentHomeMapper.selectStudenClockingIn(studentId, scheduleId);
		return studenClockingIn;
	}

	/**
	 * 学生id 与 实验室Id 获取学生笔记
	 * 
	 * @param studentId
	 * @param experimentId
	 * @return
	 */
	public List<StudentNotes> selectstudentNotesList(Integer studentId, Integer experimentId) {
		List<StudentNotes> StudentNotesList = studentHomeMapper.selectstudentNotesList(studentId, experimentId);
		return StudentNotesList;
	}

	/**
	 * 笔记id删除
	 * 
	 * @param notesListId
	 */
	public void delNoteById(Integer notesListId) {
		if (notesListId == null && notesListId.equals(" ")) {
			throw new RuntimeException("错误的操作");
		}
		studentHomeMapper.delNoteById(notesListId);
	}

	/**
	 * 添加笔记
	 * 
	 * @param studentNotes
	 */
	public Map<String, Object> addStudentNotes(StudentNotes studentNotes) {
		studentNotes.setCreateTime(new Date());
		studentNotes.setUpdateTime(new Date());
		studentNotes.setNoteType(3);//开放预约笔记

		if (studentNotes.getStudentInfoId() == null && studentNotes.getStudentInfoId().equals(" ")) {
			throw new RuntimeException("没有学生id,拒绝操作");
		}
		if (studentNotes.getRelevanceId() == null && studentNotes.getRelevanceId().equals(" ")) {
			throw new RuntimeException("没有实验id,拒绝操作");
		}
		if (studentNotes.getNoteType() == null && studentNotes.getNoteType().equals(" ")) {
			throw new RuntimeException("没有指定实验类型,拒绝操作");
		}
		if (studentNotes.getNotesContent() == null && studentNotes.getNotesContent().equals(" ")) {
			throw new RuntimeException("笔记文本为空,拒绝操作");
		}
		// 保存
		studentNotesMapper.insert(studentNotes);// 此处会自动将自增长id 重新写回去
		String yearMonth = SDF1.format(studentNotes.getCreateTime());
		String date = SDF2.format(studentNotes.getCreateTime());
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("yearMonth", yearMonth);
		data.put("date", date);
		data.put("studentNotesId", studentNotes.getStudentNotesId() + "");
		data.put("note", studentNotes);
		// 查询返回
		return data;
	}

	/**
	 * 根据实验id获取实验资源并进行分类
	 * 
	 * @param experimentId
	 * @return
	 */
	//public Map<String, Object> selectExperimentByExperimentId(Integer experimentId) {
	public List<ResourceFile> selectExperimentByExperimentId(Integer experimentId) {
		List<ResourceFile> resourceFileList = studentHomeMapper.selectExperimentByExperimentId(experimentId);

		// 视频集合
		//List<ResourceFile> flv = new ArrayList<ResourceFile>();
		// 文档结合
		//List<ResourceFile> swf = new ArrayList<ResourceFile>();
		// 图片集合
		//List<ResourceFile> img = new ArrayList<ResourceFile>();
		// 其他资源集合
		//List<ResourceFile> others = new ArrayList<ResourceFile>();
		/*
		 * //1.分离出实验指导书 List<ResourceFile> instructors =
		 * experimentFileService.selectExperimentFileIdByExperimentIdAndType(
		 * experimentId,1); ResourceFile instructor= instructors.size()>0?
		 * instructors.get(0):null; //2.分离出实验标准答案 List<ResourceFile> solutions =
		 * experimentFileService.selectExperimentFileIdByExperimentIdAndType(
		 * experimentId,5); ResourceFile solution =
		 * solutions.size()>0?solutions.get(0):null; //将分离出来的实验指导书和标标准答案加入文档集合
		 */
	//	Map<String, Object> fileMap = new HashMap<>();
		for (int i = 0; i < resourceFileList.size(); i++) {
			// 文档(ppt|pptx|xls|xlsx|doc|docx|txt)
			if (resourceFileList.get(i).getFileType().equalsIgnoreCase("doc")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("swf")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("pdf")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("ppt")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("pptx")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("xls")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("xlsx")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("doc")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("docx")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("txt")) {
			//	swf.add(resourceFileList.get(i));
				resourceFileList.get(i).setType(3);//文档
				// 视频(asx|asf|mpg|wmv|3gp|mp4|mov|avi)
			} else if (resourceFileList.get(i).getFileType().equalsIgnoreCase("mp4")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("flv")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("asx")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("asf")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("mpg")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("wmv")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("3gp")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("mov")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("avi")) {
			//	flv.add(resourceFileList.get(i));
				resourceFileList.get(i).setType(2);//视频
			} else if (resourceFileList.get(i).getFileType().equalsIgnoreCase("gif")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("jpg")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("png")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("jbp")
					|| resourceFileList.get(i).getFileType().equalsIgnoreCase("jpeg")) {
				// 图片jpg|png|gif|jbp|jpeg
			//	img.add(resourceFileList.get(i));
				resourceFileList.get(i).setType(1);//图片
			} else {
				// 其他zip rar...
			//	others.add(resourceFileList.get(i));
				resourceFileList.get(i).setType(4);//其他
			}
		}
		//fileMap.put("flvFile", flv);
		//fileMap.put("swfFile", swf);
		//fileMap.put("imgFile", img);
		//fileMap.put("othersFile", others);
		return resourceFileList;
	}

	/**
	 * 根据资源Id 获取资源的详情 并根据实验的id 获取所属的课程
	 * 
	 * @param resourcefileId
	 * @param experimentId
	 * @return
	 */
	public Map<String, Object> selectPreviewList(Integer resourcefileId, Integer experimentId) {
		Map<String, Object> map = new HashMap<>();
		// 获取该资源的明细
		ResourceFile rs = new ResourceFile();
		rs.setFileId(resourcefileId);
		rs.setStealth(2);
		List<ResourceFile> res = resourceFileMapper.select(rs);
		if (StringUtils.isNotEmpty(res.get(0).getFileFormatPath())) {
			String path = FILE_PATH + res.get(0).getFileFormatPath();
			if (new File(path).exists()) {
				res.get(0).setIsExist(1);// 判断文件夹是否被人手动删除 1 存在 2 存在
			} else {
				res.get(0).setIsExist(2);
				}
			} else {
				res.get(0).setIsExist(2);
		}
		Experiment experimentList = null;
		if(experimentId!=0 ){
			// 获取该实验的实验课程相关信息
			 experimentList = studentHomeMapper.finallExperimentList(experimentId,null);
		}else{
			//通过资源id 查询中间表  
			ExperimentFile ef = new ExperimentFile();
			ef.setResourceFileId(res.get(0).getFileId());
			List<ExperimentFile> efList = experimentFileMapper.select(ef);
			//资源与实验中间表再获取实验信息
			 experimentList = studentHomeMapper.finallExperimentList(efList.get(0).getExperimentId(),null);
		}
		// 获取所在的库
		//ResourceLibrary reslibrary = studentHomeMapper.selcetLibrary(res.get(0).getLibraryId());
		// 获取资源作者
		TeacherInfo thif = studentHomeMapper.selectAuthor(res.get(0).getAuthorId());
		// 获取该资源作者所属的学院
		Department dep = studentHomeMapper.selectDepatment(thif.getDepartmentId());
		// 获取收藏量
		ResourceCollection rescount = studentHomeMapper.selectcollection(res.get(0).getFileId());
		map.put("experimentList", experimentList);
		map.put("resourceFileList", res);
		map.put("thif", thif);
		map.put("rescount", rescount);
		//map.put("reslibrary", reslibrary);
		map.put("dep", dep);
		return map;
	}

	/**
	 * 文件下载
	 * 
	 * @param request
	 * @param response
	 * @param fileId
	 */
	public void downLoadFile(HttpServletRequest request, HttpServletResponse response, Integer Id) {
		ResourceFile rs = new ResourceFile();
		rs.setFileId(Id);
		rs.setStealth(2);
		List<ResourceFile> res = resourceFileMapper.select(rs);
		try {
			// 下载资源文件
			File file = new File(FILE_PATH + res.get(0).getFilePath());
			// 判断文件是否存在
			if (!file.exists()) {
				throw new RuntimeException("该文件已经被删除！");
			}
			// 判断文件类型
			String mimeType = URLConnection.guessContentTypeFromName(file.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}
			response.setContentType(mimeType);

			// 设置文件响应大小
			response.setContentLength((int) file.length());

			// 文件名编码，解决乱码问题
			String fileName = file.getName().substring(file.getName().lastIndexOf("_") + 1);
			String encodedFileName = null;
			String userAgentString = request.getHeader("User-Agent");
			String browser = UserAgent.parseUserAgentString(userAgentString).getBrowser().getGroup().getName();
			if (browser.equals("Chrome") || browser.equals("Internet Exploer") || browser.equals("Safari")) {
				encodedFileName = URLEncoder.encode(fileName, "utf-8").replaceAll("\\+", "%20");
			} else {
				encodedFileName = MimeUtility.decodeText(fileName);
			}
			// 解决文件名中文乱码问题
			encodedFileName = new String(encodedFileName.getBytes(), "ISO-8859-1");
			// 设置Content-Disposition响应头，一方面可以指定下载的文件名，另一方面可以引导浏览器弹出文件下载窗口
			response.setHeader("Content-Disposition", "attachment;fileName=\"" + encodedFileName + "\"");
			// 文件下载
			InputStream in = new BufferedInputStream(new FileInputStream(file));
			FileCopyUtils.copy(in, response.getOutputStream());
			// 下载成功一次就加一次下载量
			Integer num = res.get(0).getDownloadNum();
			if (num == null) {
				num = 0;
			}
			num = num + 1;
			// 设置修改时间
			res.get(0).setUpdateTime(new Date());
			res.get(0).setDownloadNum(num);
			resourceFileMapper.updateByPrimaryKeySelective(res.get(0));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 编辑器路径
	 * @param studentInfo
	 * @return
	 */
	public String getPath(StudentInfo studentInfo) {
		// 路径 experiment/实验资源/teacherName/三个随机数/
		String ueditFilePath = (VS_EXPERIMENT + "/resource/" + studentInfo.getName() + "/"
				+ RandomUtils.nextInt(100, 999999));
		return ueditFilePath;
	}

	/**
	 * 判断文件是否存在
	 * 
	 * @param fileId
	 * @return
	 */
	public boolean fileExistsById(Integer fileId) {
		ResourceFile rs = new ResourceFile();
		rs.setFileId(fileId);
		rs.setStealth(2);
		List<ResourceFile> res = resourceFileMapper.select(rs);
		if (res != null && res.get(0).getFilePath() != null) {
			if (new File(FILE_PATH + res.get(0).getFilePath()).exists()) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	/**
	 * 保存学生提交的文件
	 * 
	 * @param score
	 * @param subProjectFile
	 * @param subGifFile
	 * @param experimentFileNameDTO
	 * @param studentId 
	 * @throws Exception
	 */
	public synchronized void submitOrSaveScheduleStudentScore(ScheduleStudentScore score, MultipartFile subProjectFile,
			MultipartFile subGifFile, ExperimentFileNameDTO experimentFileNameDTO, Integer studentId) throws Exception {
		//防止学生非法提交，@CookieValue获取当前操作者与提交值配对 ？正确执行：错误禁止
		if(!score.getSubmitterId().equals(studentId)){
			throw new RuntimeException("非法参数！");
		}
		//判断当前实验室的类型，智慧实验室需要考勤，通用实验室不用
		ExperimentLab lab = experimentLabMapper.selectById(score.getLabId());
		ScheduleStudentScore oldeScore = scheduleStudentScoreMapper.selectByPrimaryKey(score.getScheduleStudentScoreId());
		//当前实验室为智慧云实验室时,未考勤，不能提交实验报告 考虑到更改排课，取消考勤机限制
		/*if(lab.getMainframeId() !=null && lab.getMainframeId().trim()!="") {
			
			if(oldeScore.getSignin()==null){
				throw new RuntimeException("你未进行考勤，不能提交实验报告！");
			}
			
		}*/
		//为通用实验室
//		else {  
//			throw new RuntimeException("无需提交实验报告");
//		}
//		
		if (subGifFile != null || subGifFile.getSize() > 0 || subProjectFile!=null || subProjectFile.getSize()>0) {
			//文件格式判断
			fileJudge(subProjectFile,subGifFile);
		}
			
		// 获取实验的详细信息判断不为空
		//重做和保存不作校验
		if(score.getSubmitStatus()!=null){
			
			if(score.getSubmitStatus()!=6 && score.getSubmitStatus()!=4){
				
				if (score == null || score.getSubmitterId() == null || score.getLabReport().equals("")||score.getLabReport()==null
						||score.getLabReport().length()==0 ) {
					throw new RuntimeException("请补充你的实验过程后重新提交！");
				}
			}	
		}else{
			
			if (score == null || score.getSubmitterId() == null || score.getLabReport().equals("")||score.getLabReport()==null
					||score.getLabReport().length()==0) {
				throw new RuntimeException("请补充你的实验过程后重新提交！");
			}
		}
		
		
		
		// 判断是曾保存过,即：再次保存覆盖并删除原文件
		if(oldeScore.getScheduleStudentScoreId()!=null){//-->
			//上传文件不为空  并且 查询到已经存在过 进行删除
			if (subProjectFile.getSize()!= 0 & oldeScore.getProjectFile()!=null ) {
					this.deteOldFile(oldeScore, subProjectFile, null);
					score.setCreateTime(oldeScore.getCreateTime());
			}
				//上传gif不为空  并且 查询到已经存在过 进行删除
			if (subGifFile.getSize()!=0 & score.getGifFile()!=null) {
					this.deteOldFile(oldeScore, null, subGifFile);
					score.setCreateTime(oldeScore.getCreateTime());
			}
	}//<---
		if(subGifFile!=null&subGifFile.getSize()!=0){
			// 设置实验图片路径
			String path = VS_EXPERIMENT + "/"+StudentFile+"/"+ experimentFileNameDTO.getExperimentCourseName() + "/"
						+ experimentFileNameDTO.getExperimentName() + "/" + experimentFileNameDTO.getStudentName() + "/"
						+ "实验结果图/";
				score.setGifFile(FileOperateUtils.upload(FILE_PATH, path, subGifFile));
			}
		//如果只提交了图片也进行下面方法
		// 单独对文件进行处理 图片不处理 第一个参数 提交的文件用于转换 第二个参数 页面传递的数据 第三个参数 获取到数据 第四个参数 封装的参数
		addFile(subProjectFile, score, experimentFileNameDTO);	
	}

	/**
	 * 进行文件格式判断
	 * @param subProjectFile
	 * @param subGifFile
	 * @return
	 */
	public boolean fileJudge(MultipartFile subProjectFile, MultipartFile subGifFile) {
		//判断文件格式是否正确
		if(subProjectFile.getSize()>0){
			String fileAllName = subProjectFile.getOriginalFilename();// 文件原始文件名
			String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
			if (!extFileName.matches("^.*(doc|docx|zip|rar)$")) {
				throw new RuntimeException("请上传指定格式文件！");
			}	
			
		}
		if( subGifFile.getSize() > 0){
			String fileAllGifName = subGifFile.getOriginalFilename();// 图片原始文件名
			String extFileGifName = fileAllGifName.substring(fileAllGifName.lastIndexOf(".") + 1);// 文件后缀名
			if(!extFileGifName.matches("^.*(gif|png|jpg)$")){
				throw new RuntimeException("请上传指定格式图片！");
			}	
		}
		
		return true;
	}

	/**
	 * 根据课程Id 学生id 实验id 获取当前实验、课程、提交人提交的成绩
	 * 
	 * @param studentId
	 * @param experimentId
	 * @param scheduleId
	 * @return
	 */

	public List<ScheduleStudentScore> finAll(Integer studentId, Integer experimentId, Integer scheduleId) {
		ScheduleStudentScore sf = new ScheduleStudentScore();
		sf.setScheduleId(scheduleId);
		sf.setSubmitterId(studentId);
		//SELECT * FROM 	schedule_student_score WHERE  schedule_id = 35 AND submitter_id = 2214
		List<ScheduleStudentScore> sflist = scheduleStudentScoreMapper.select(sf);
		return sflist;
	}
	/**
	 * 单独保存扫描上传的图片
	 * 
	 * @param score
	 * @param experimentFileNameDTO
	 * @param subGifFile
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	public void saveExperimentImage(ExperimentFileNameDTO experimentFileNameDTO,
			MultipartFile subGifFile) throws IllegalStateException, IOException {
		if( subGifFile.getSize() > 0){
			String fileAllGifName = subGifFile.getOriginalFilename();// 图片原始文件名
			String extFileGifName = fileAllGifName.substring(fileAllGifName.lastIndexOf(".") + 1);// 文件后缀名
			if(!extFileGifName.matches("^.*(gif|png|jpg)$")){
				throw new RuntimeException("请上传指定格式图片！");
			}	
		}
		
		// 获取实验的详细信息判断不为空
		if (experimentFileNameDTO.getScheduleStudentScoreId() == null ) {
					throw new RuntimeException("提交的实验报告错误,请按照正确的方法操作！");
			}
		//获取学生这门课程作业的明细
		ScheduleStudentScore oldeScore = scheduleStudentScoreMapper.selectByPrimaryKey(Integer.valueOf(experimentFileNameDTO.getScheduleStudentScoreId()));
		//获取学生信息 
		StudentInfo st = studnetInfoMapper.selectByPrimaryKey(oldeScore.getSubmitterId());
		experimentFileNameDTO.setStudentName(st.getName());
		//获取排课明细
		CourseSchedule sc = courseScheduleMapper.selectByPrimaryKey(oldeScore.getScheduleId());
		//获取实验课程名称和实验名称
		ExperimentCourse exc = experimentCourseMapper.selectByPrimaryKey(sc.getCourseId());
		Experiment ext = experimentMapper.selectByPrimaryKey(sc.getExperimentId());
		experimentFileNameDTO.setExperimentCourseName(exc.getCourseName());
		experimentFileNameDTO.setExperimentName(ext.getExperimentName());
		
		ScheduleStudentScore score = new ScheduleStudentScore();
		// 判断是曾保存过,即：再次保存覆盖并删除原文件
		if (experimentFileNameDTO.getScheduleStudentScoreId() != null) {
			
			if (oldeScore != null&subGifFile.getSize()!=0) {
				this.deteOldFile(oldeScore, null, subGifFile);
				score.setCreateTime(oldeScore.getCreateTime());
			}
		}
		// 判断gift是否存在
		if (subGifFile != null && subGifFile.getSize() > 0) {
			// 文件夹命名规则 ：项目名称-实验课程名称-实验名称-学生名称
			if (!FileOperateUtils.checkFilepattern(subGifFile, FILE_FORMAT)) {
				throw new RuntimeException("仅能上传" + FILE_FORMAT + "格式的图片");
			}
			
			// 设置实验图片路径
			String path = VS_EXPERIMENT + "/" +StudentFile+"/"+ experimentFileNameDTO.getExperimentCourseName() + "/"
					+ experimentFileNameDTO.getExperimentName() + "/" + experimentFileNameDTO.getStudentName() + "/"
					+ "实验结果图/";
			score.setGifFile(FileOperateUtils.upload(FILE_PATH, path, subGifFile));
		}
		// 不设置提交状态
			score.setScheduleStudentScoreId(Integer.valueOf(experimentFileNameDTO.getScheduleStudentScoreId()));
			score.setSubmitStatus(5);
			score.setUpdateTime(new Date());
			scheduleStudentScoreMapper.updateByPrimaryKeySelective(score);

	}

	/**
	 * 单独处理文档文件
	 * 
	 * @param files
	 * @param resourceFile
	 * @param teacherInfo
	 */
	public void addFile(MultipartFile subProjectFile, ScheduleStudentScore score,
			ExperimentFileNameDTO experimentFileNameDTO) throws RuntimeException {
		//转换工具
		FileFormatUtil fileFormatUtil = FileFormatUtil.getFileFormatUtil(SWF_PATH, OPENOFFICEPATH);
		try {
			if(subProjectFile!=null&subProjectFile.getSize()!=0){
			// 封装资源文件信息
			String fileAllName = subProjectFile.getOriginalFilename();// 原始文件名
			String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
			String fileName = fileAllName.substring(0, fileAllName.lastIndexOf("."));// 文件名
			// 文件夹命名规则 ：项目名称-实验课程名称-实验名称-学生名称
			// 上传资源文件，封装资源文件路径
			String targetPath = VS_EXPERIMENT + "/"+StudentFile+"/" + experimentFileNameDTO.getExperimentCourseName() + "/"
					+ experimentFileNameDTO.getExperimentName() + "/" + experimentFileNameDTO.getStudentName() + "/"
					+ "工程文件/";
			String filePath = FileOperateUtils.upload(FILE_PATH, targetPath, subProjectFile);
			// 下载路径
			score.setProjectFile(filePath);
			//只处理doc|docx 文件 其他不管
			if (extFileName.matches("^.*(doc|docx)$")) {// doc|docx|//
				// doc转换为html文档格式
				String previewtPath = filePath.substring(0, filePath.lastIndexOf(".")) + ".html";
				fileFormatUtil.addFilePath(FILE_PATH + "/" + filePath);
				score.setProjectFileHtml(previewtPath);
			} 
		}	
			if(score.getSubmitStatus()!=null){
				if(score.getSubmitStatus()==6){
					score.setSubmitStatus(6);// 设置提交状态为保存状态
					score.setUpdateTime(new Date());//设置保存时间
				}
			}else{
				// 插入文件信息
				score.setSubmitStatus(2);// 设置提交状态为正在提交为批改 值为 2
			}
			
			
			if (score.getScheduleStudentScoreId() == null) {
				score.setSubmitTime(new Date());//学生提交的时间
				score.setCreateTime(new Date());
				score.setUpdateTime(new Date());
				scheduleStudentScoreMapper.insertSelective(score);
			} else {
				score.setSubmitTime(new Date());//学生提交的时间
				
				scheduleStudentScoreMapper.updateByPrimaryKeySelective(score);
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("文件上传失败,请重新上传");
		}
		fileFormatUtil.run();
	}

	/**
	 * 删除原有的文件
	 * 
	 * @param score
	 * @param projectFile
	 * @param gifFile
	 * @return
	 */
	public boolean deteOldFile(ScheduleStudentScore score, MultipartFile projectFile,
			MultipartFile gifFile) {
		try {
		if (gifFile != null && gifFile.getSize() > 0 && score != null && score.getGifFile() != null) {
			File file = new File(FILE_PATH + score.getGifFile());
			file.delete();
			return true;
		}
		if (projectFile != null && projectFile.getSize() > 0 && score != null && score.getProjectFile() != null) {
			File file = new File(FILE_PATH + score.getProjectFile());
			file.delete();
			return true;
		}
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return false;
	}

	/**
	 * 课程Id 获取实验课程下多个老师
	 * 
	 * @param experimentId
	 * @return
	 */
	public List<TeacherMsgResult> finAllExperimentListThif(Integer scheduleId) {
		List<TeacherMsgResult> tf = studentHomeMapper.selectCourseTeacherByCourseId(scheduleId);
		return tf;
	}

	/**
	 * 获取该学生预约实验数
	 * 
	 * @param tbClassId
	 * @return
	 */
/*	public Integer myReservableExperimentList(Integer classId) {
		Integer myReservableExperimentList = studentHomeMapper.finAllMyReservableExperimentList(null, null, classId,
				null);
		return myReservableExperimentList;
	}*/


	/**
	 * 获取学生实验列表</br>
	 * type 1 为整班上课 </br>
	 * 3为自主预约 </br>
	 * 0为全部
	 * 
	 * @param studentId
	 * @param type
	 * @return
	 */
	public List<StudentExperimentResult> findStudentExperimentList(Integer studentId, Integer type, Integer thisPage,
			Integer pageSize) {
		 if(type==10){
			 return studentHomeMapper.findStudentExperimentListOne(studentId, type, (thisPage - 1) * pageSize, pageSize);
		 }else if(type == 20){
			 return studentHomeMapper.findStudentExperimentListTwo(studentId, type, (thisPage - 1) * pageSize, pageSize);

		 }else if(type == 30){
			 return studentHomeMapper.findStudentExperimentListThree(studentId, type, (thisPage - 1) * pageSize, pageSize);
		 }else if(type == 40){
			 return studentHomeMapper.findStudentExperimentListFour(studentId, type, (thisPage - 1) * pageSize, pageSize);

		 }else if(type == 50){
			 return studentHomeMapper.findStudentExperimentListFive(studentId, type, (thisPage - 1) * pageSize, pageSize);

		 }else{
			 
			 return studentHomeMapper.findStudentExperimentList(studentId, type, (thisPage - 1) * pageSize, pageSize);
		 }
	}

	/**
	 * 获取学生实验次数</br>
	 * type 1 为整班上课 </br>
	 * 3为自主预约 </br>
	 * 0为全部
	 * 
	 * @param studentId
	 * @param type
	 * @return
	 */
	public Integer findStudentExperimentCount(Integer studentId, Integer type) {
		
		 if(type==10){
				return studentHomeMapper.findStudentExperimentCountOne(studentId,type);
		 }else if(type == 20){
				return studentHomeMapper.findStudentExperimentCountTwo(studentId,type);

		 }else if(type == 30){
				return studentHomeMapper.findStudentExperimentCountThree(studentId,type);

		 }else if(type == 40){
				return studentHomeMapper.findStudentExperimentCountFour(studentId,type);

		 }else if(type == 50){
				return studentHomeMapper.findStudentExperimentCountFive(studentId,type);

		 }else{
			 
				return studentHomeMapper.findStudentExperimentCount(studentId,type);
		 }

	}

	/**
	 * 根据传递的类型获取对应的数据总数
	 * 
	 * @param studentId
	 * @param type
	 *            0 全部 1 可预约 2 我已经预约
	 * @param classId
	 *            班级Id
	 * @param semesterId
	 * @return
	 */
	public Integer findAllStudentmyReservableExperimentList(Integer studentId, Integer type, Integer classId,
			Integer semesterId) {
		Integer countList = null ;
		// 根据学期的id 获取该学期的时间
		Semester semester = semesterService.selectSemesterById(semesterId);
		// 查询排课记录,因为第一周的日期不一定是周一，有可能用户会误操作，
		// 将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
		Calendar atart = Calendar.getInstance();
		atart.setTime(semester.getStartTime());
		atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天
		if (type == 0) {
			// 无

		} else if (type == 1) {
			Integer countListWhole = studentHomeMapper.finAllMyReservableExperimentList(classId,studentId);
			// 可预约 = 自主预约总数 - 我已经 预约过的总数
			// 获取当前学期该班级可预约的总数
		//	Integer countListWhole = studentHomeMapper.finAllMyReservableExperimentList(atart.getTime(),
		//			semester.getEndTime(), classId, type);
			// 获取我已经预约过的
		//	Integer countListMy = studentHomeMapper.finAllMyReservableExperiment(atart.getTime(), semester.getEndTime(),
		//			studentId);
		//	countList = countListWhole - countListMy;
			countList = countListWhole;
		} else if (type == 2) {
			// 学生当前学期预约的总数
			countList = studentHomeMapper.finAllMyReservableExperiment(atart.getTime(), semester.getEndTime(),
					studentId);
		} else {
			// 我的预约(全部)历史记录
			countList = studentHomeMapper.countList(studentId);
		}
		return countList;
	}

	/**
	 * 获取当前整个学期可以预约的课程
	 * 
	 * @param studentId
	 * @param type
	 * @param classId
	 * @param semesterId
	 * @param integer
	 * @param thisPage
	 */
	public List<CourseSchedule> findAllReservableExperimentList(Integer studentId, Integer type, Integer classId,
			Integer semesterId, Integer thisPage, Integer pageSize) {
		List<CourseSchedule> coutList = null; // 存放结果集
		// 关联查询班级
		// 根据学期的id 获取该学期的时间
		Semester semester = semesterService.selectSemesterById(semesterId);
		// 将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
		Calendar atart = Calendar.getInstance();
		atart.setTime(semester.getStartTime());
		atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天
		if (type == 0) {
			// 无
		} else if (type == 1) {
			// 学生{当前学期}可预约的课程
			/*coutList = studentHomeMapper.MyReservation(atart.getTime(), semester.getEndTime(), classId, studentId,
					(thisPage - 1) * pageSize, pageSize);*/
			coutList = studentHomeMapper.MyReservation( classId, studentId,
					(thisPage - 1) * pageSize, pageSize);
		} else if (type == 2) {
			// 获取我这学期预约过的课程
			coutList = studentHomeMapper.studentAppointmentList(atart.getTime(), semester.getEndTime(), studentId, 2,
					(thisPage - 1) * pageSize, pageSize);
		} else {
			// 获取我预约过的不指定时间（历史记录）
			coutList = studentHomeMapper.studentAppointmentList(null, null, studentId, 2, (thisPage - 1) * pageSize,
					pageSize);

		}
		// 将字节转换为时间
		for (int i = 0; i < coutList.size(); i++) {
			String time = clockinConfig.getTime(coutList.get(i).getSlice());
			coutList.get(i).setSliceByte(time);
			// 当点击已经预约按钮 加入一个值用于判断
			if (type == 2) {
				coutList.get(i).setIsPastTimes(1);// 1 是已经预约过 用于前端判断
			}else if(type==1){
				coutList.get(i).setIsPastTimes(0);//  0 是可预约 用于前端判断
			}else {
				coutList.get(i).setIsPastTimes(2);//  2 是历史预约 用于前端判断
			}
		}

		return coutList;
	}

	/**
	 * 学生id获取该学生是否上了黑名单 不为空，则上黑名单
	 * 
	 * @param strudentId
	 * @return
	 */
	public LabBlacklist finStudentByIdGetBlacklist(Integer strudentId) {
		LabBlacklist lb = studentHomeMapper.finStudentByIdGetBlacklist(strudentId);
		return lb;
	}

	/**
	 * 插入学生自主预约数据
	 * @param studentId
	 * @param scheduleId
	 * @param sliceNmber 
	 * @param schooltime 
	 * @param labseat
	 * @return
	 */
	public synchronized Map<String, Object> insertStudentdata(Integer studentId, Integer scheduleId, Long schooltime, String sliceNmber) {
		int number = 0;//临时存放 剩余总数
		int studentNumber = 0;//学生预约工位
		String ConflictSchooltime = SDF.format(schooltime);
		Map<String, Object> map = new HashMap<String, Object>();
		//查询排课是否有冲突
		String newSchooltime = null;
		List<CourseSchedule> coutList = studentHomeMapper.studentAppointmentList(null, null,studentId,null,null,null);
		for (int i = 0; i < coutList.size(); i++) {
			newSchooltime = SDF.format(coutList.get(i).getSchooltime());
			coutList.get(i).setNewSchooltime(newSchooltime);
		}
		//通过学生已经预约过的进行判断日期，日期相同，排课节数相同  即 上课时间冲突
		for (int i = 0; i < coutList.size(); i++) {
			if(coutList.get(i).getNewSchooltime().equals(ConflictSchooltime) & coutList.get(i).getSlice().equals( sliceNmber)){
				throw new RuntimeException("该课程跟你现有的课程安排有冲突，请换其它课程!");
			}
		}
		
		//先根据课程表id 获取是剩下的 实验室工位数
		CourseSchedule cs = studentHomeMapper.selectCourseSchedule(scheduleId);
		//剩余工位{0} == 总的工位 （已经爆满）不能再预约
		if(cs.getSeats()==0){
			throw new RuntimeException("该课程已经满员，请换其它课程!");
		}else{
			//剩余工位 - 1 
			number = cs.getRemainingSeats()-1;
			//对所属课程进行剩余座位修改
			CourseSchedule csd = new CourseSchedule();
			csd.setScheduleId(scheduleId);
			csd.setRemainingSeats(number);
			courseScheduleMapper.updateByPrimaryKeySelective(csd);
			//统计该课程已经有多少人预约了
			Integer countSeat = studentHomeMapper.countSeat(scheduleId);
			studentNumber = countSeat+1;
			studentHomeMapper.insertStudentSeat(UUIDUtils.get32UUID(),scheduleId,studentId,studentNumber);
			//返回学生预约的内容
			CourseSchedule studentsCourseSchedule = studentHomeMapper.selectStudentCourseSchedule(scheduleId);
			//将减掉前的（剩余工位数）返回给学生  告诉预约成功的座位号
			map.put("labMyseat", studentNumber);//学生工位
			map.put("number", number);//剩余
			map.put("studentsCourseSchedule", studentsCourseSchedule);//学生预约后的课程明细
			//返回学生预约的内容
			//预约成功初始课程成绩表
			ScheduleStudentScore studentScore = new ScheduleStudentScore();
			studentScore.setScheduleId(scheduleId);
			studentScore.setSubmitterId(studentId);
			studentScore.setSubmitStatus(1);//提交状态
			studentScore.setCreateTime(new Date());
			
			String sliceStr = clockinConfig.getStart(sliceNmber);
			String ss = SDF.format(new Date(schooltime));
			
			
			studentScore.setScore(Double.valueOf("0"));
			try {
				studentScore.setStipulateSgininTime(SDF3.parse(ss+" "+sliceStr));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			scheduleStudentScoreMapper.insertSelective(studentScore);
			return map;
		}
	}

	/**跳转到资源总页面 指定为 实物实验可并根据要求换实验的类型
	 * @param type
	 * @param departmentId  当前操作者的院系
	 * @return
	 */
	public  List<ResourceFile> totalResources(Integer type, Integer departmentId) {
		 List<ResourceFile>  rs= studentHomeMapper.totalResources(type,departmentId);
		return rs;
	}
	
	/* 
     * 将时间转换为时间戳
     */    
    public static String dateToStamp(String s) throws Exception{
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = simpleDateFormat.parse(s);
        long ts = date.getTime();
        res = String.valueOf(ts);
        return res;
    }
    
	/**
	 * 实验室id 获取考勤机信息
	 * @param labId
	 * @return
	 */
	public LabClockInMachine finallexperimentLabMachine(Integer labId) {
		//根据实验室id 获取考勤信息
		LabClockInMachine lm = labClockInMachineMapper.seleceLabMachine(labId);
		return lm;
	}


    
}
