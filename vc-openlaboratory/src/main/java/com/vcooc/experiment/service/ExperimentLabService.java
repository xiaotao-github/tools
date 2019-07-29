package com.vcooc.experiment.service;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabManager;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.ScheduleClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.base.pojo.User;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.ScheduleClassMapper;
import com.vcooc.util.ImportCunrseDTO;
import com.vcooc.util.ImportExcelUtil;

@Service
public class ExperimentLabService extends BaseService<ExperimentLab> {

	@Autowired
	private ExperimentLabMapper experimentLabMapper;
	@PropertyConfig
	private String FILE_PATH;// 文件保存的磁盘路径前缀
	@PropertyConfig
	private String VS_EXPERIMENT;// 文件保存的项目路径前缀
	@Autowired
	private DepartmentService departmentService;
	@Autowired
	private LabManagerService labManagerService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	@PropertyConfig
	private String COURSE_MODEL;//课程模板地址
	//每行单元格数量
	@PropertyConfig
	private Integer COURSE_CELL_COUNT;
	// EXCEL导入的起始行数
	@PropertyConfig
	private Integer BEGIN_ROW;
	@PropertyConfig //存放的长度，增加单元格加1
	private Integer COURSE_SIZE;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	@Autowired
	private ScheduleClassMapper scheduleClassMapper;
	@Autowired
	private ScheduleClassService scheduleClassService;
	
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyyMMdd ");// 格式化时间

	/**
	 * 根据权限查询实验室,默认查出来非伪删除的数据 参数太多，不宜开放
	 * 
	 * @param menuParam
	 *            1、所有; 2、院系; 3、我负责的; null;我的
	 * @param keyword
	 *            根据实验室名称和编号模糊查询，可为null
	 * @param teacherInfo
	 *            department.id 院系id,不能为空 id 教师id，不能为空 后期可加上校验权限
	 * @return 关联查询 关联负责人 关联操作人 关联院系名称
	 */
	public List<ExperimentLab> selectExperimentLabList(Integer menuParam, TeacherInfo teacherInfo) {
		if (menuParam == 1) {
			List<ExperimentLab> exlList = experimentLabMapper.selectExperimentLabList(null, 2, null);
			return exlList;
		} else if (menuParam == 2) {
			List<ExperimentLab> exlList = experimentLabMapper
					.selectExperimentLabList(teacherInfo.getDepartment().getId(), 2, null);
			return exlList;
		} else if (menuParam == 3) {
			// 先获取我的负责的实验室id 再通过实验室id获取我负责实验室明细
			List<LabManager> labManagerList = experimentLabMapper.selectlabManagerList(teacherInfo.getId());
			List<ExperimentLab> exlList = new ArrayList<ExperimentLab>();
			for (int i = 0; i < labManagerList.size(); i++) {
				List<ExperimentLab> list = experimentLabMapper.selectExperimentLabList(null, 2,
						labManagerList.get(i).getLadId());
				exlList.addAll(list);
			}

			return exlList;
		}
		return null;
	}

	/**
	 * 根据权限查询实验室,默认查出来非伪删除的数据 参数太多，不宜开放
	 * 
	 * @param menuParam
	 *            1、所有; 2、院系; 3、我的; null;我的
	 * @param keyword
	 *            根据实验室名称和编号模糊查询，可为null
	 * @param teacherInfo
	 *            department.id 院系id,不能为空 id 教师id，不能为空 后期可加上校验权限
	 * @return 关联查询 关联负责人 关联操作人 关联院系名称
	 */
	private List<ExperimentLab> selectByMenuParam(Integer menuParam, TeacherInfo teacherInfo, String keyword, Page p,
			Integer labStatus) {
		if (menuParam == null)
			menuParam = 3;
		PageData pd = new PageData();
		pd.put("stealth", 2);
		pd.put("keyword", keyword);
		pd.put("page", p);
		pd.put("labStatus", labStatus);// 只获取可使用的实验室
		if (menuParam == 1) {
			pd.put("NoFaculties", -1);// 点击通用实验室 指定此字段 获取通用实验室
			return experimentLabMapper.Aselect(pd);
		} else if (menuParam == 2) {
			pd.put("departmentId", teacherInfo.getDepartment().getId());
			return experimentLabMapper.Aselect(pd);
		} else if (menuParam == 3) {
			return null;
			// return selectMyLab(teacherInfo.getId(),keyword);
		}
		return null;
	}

	/**
	 * 根据权限查询实验室,默认查出来非伪删除的数据,不分页
	 * 
	 * @param menuParam
	 *            1、所有; 2、院系; 3、我的; null;我的
	 * @param teacherInfo
	 *            department.id 院系id,不能为空 id 教师id，不能为空 后期可加上校验权限
	 * @return 关联查询 关联负责人 关联操作人 关联院系名称
	 */
	public List<ExperimentLab> selectByMenuParam(Integer menuParam, TeacherInfo teacherInfo) {
		return selectByMenuParam(menuParam, teacherInfo, null, null, null);
	}

	/**
	 * 分页搜索实验室
	 * 
	 * @param menuParam
	 *            权限参数
	 * @param teacherInfo
	 *            department.id 院系id,不能为空 id 教师id，不能为空
	 * @param p
	 *            分页搜索，如果不传参，默认为第一页，查询10条 thisPage:当前页 pageSize：查询条数
	 * @param keyword
	 *            根据实验室名称和编号模糊查询，可为null
	 * @param labStatus
	 * @return
	 */
	public Page<ExperimentLab> selectByMenuParamPage(Integer menuParam, TeacherInfo teacherInfo, Page p, String keyword,
			Integer labStatus) {
		if (p != null)
			p.setStartNumber(p.getPageSize() * p.getThisPage());
		List<ExperimentLab> list = selectByMenuParam(menuParam, teacherInfo, keyword, p, labStatus);
		Page<ExperimentLab> temp = new Page<>(list, p.getThisPage(), p.getPageSize(),
				experimentLabMapper.countAselect(2, keyword));
		return temp;
	}

	/**
	 * 根据作者id查询我的实验室 默认查询非伪删除数据 查询安排给我的负责的实验室
	 * 
	 * @param authorId
	 *            用户id
	 * @param keyword
	 *            关键词搜索
	 * @return
	 */
	public List<ExperimentLab> selectMyLab(Integer authorId, String keyword) {
		return experimentLabMapper.AselectMyLab(authorId, 2, keyword);
	}

	/**
	 * 备注:该接口备用，不用后期可删除 根据作者id查询我的实验室 默认查询非伪删除数据 查询安排给我的负责的实验室
	 * 
	 * @param authorId
	 * @return
	 */
	/*
	 * public List<ExperimentLab> selectMyLab(Integer authorId){ return
	 * experimentLabMapper.AselectMyLab(authorId,2,null); }
	 */

	/**
	 * 添加实验室
	 * 
	 * @param files
	 *            上传的封面文件
	 * @param experimentLab
	 *            labName 实验室名称，不能为空
	 * @param teacherInfo
	 *            添加记录，添加操作人 teacherInfo.id,teacherInfo.name 不能为空
	 * @param labManagerIds
	 *            负责人，以逗号隔开
	 * @param req
	 * 
	 */
	public void insert(MultipartFile file, ExperimentLab experimentLab, TeacherInfo teacherInfo, String labManagerIds,
			HttpServletRequest req) {
		if (file.getSize() > 0) {
			try {
				String fileAllName = file.getOriginalFilename();// 原始文件名
				String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
				if (!extFileName.matches("^.*(jpg|png|3gp|jpeg|bmp)$")) { // 视频格式
					throw new RuntimeException("请重新上传格式的文件");
				}
				String tagPath = VS_EXPERIMENT + "实验室封面/" + experimentLab.getLabName() + "/";
				experimentLab.setLabImg(FileOperateUtils.upload(FILE_PATH, tagPath, file));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		experimentLab.setOperatorId(teacherInfo.getId());
		experimentLab.setCreateTime(new Date());
		experimentLab.setUpdateTime(experimentLab.getCreateTime());
		experimentLab.setStealth(2);
		experimentLabMapper.insert(experimentLab);

		// 分配负责人
		if (labManagerIds != null && !labManagerIds.equals("")) {
			labManagerService.insert(experimentLab.getLabId(), labManagerIds);
		}
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),
				"添加了《" + experimentLab.getLabName() + "》实验室", 7);
		teacherLogInformationService.saveSelective(record);
	}

	/**
	 * 添加实验室
	 * 
	 * @param files
	 *            上传的封面文件
	 * @param experimentLab
	 *            labId 实验室id，不能为空 labName 实验室名称，不能为空
	 * @param teacherInfo
	 *            添加记录，添加操作人 teacherInfo.id,teacherInfo.name 不能为空
	 */
	public void edit(MultipartFile file, ExperimentLab experimentLab, TeacherInfo teacherInfo, String labManagerIds) {
		if (file.getSize() > 0) {
			try {
				// 删除旧文件
				ExperimentLab temp = selectById(experimentLab.getLabId());
				if (temp != null && temp.getLabImg() != null) {
					FileOperateUtils.deleteFile(FILE_PATH + temp.getLabImg(), true);
				}

				String fileAllName = file.getOriginalFilename();// 原始文件名
				String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
				if (!extFileName.matches("^.*(jpg|png|3gp|jpeg|bmp)$")) { // 视频格式
					throw new RuntimeException("请重新上传格式的文件");
				}
				String tagPath = VS_EXPERIMENT + "实验室封面/" + experimentLab.getLabName() + "/";
				experimentLab.setLabImg(FileOperateUtils.upload(FILE_PATH, tagPath, file));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		experimentLab.setOperatorId(teacherInfo.getId());
		experimentLab.setUpdateTime(new Date());
		experimentLabMapper.updateByPrimaryKeySelective(experimentLab);

		// 修改负责人
		if (labManagerIds != null) {
			labManagerService.replace(experimentLab.getLabId(), labManagerIds);
		}
	}

	/**
	 * 根据实验室id，单表查询
	 * 
	 * @param id
	 * @return
	 */
	public ExperimentLab selectById(Integer id) {
		return experimentLabMapper.selectByPrimaryKey(id);
	}

	/**
	 * 根据实验室id,多表查询 关联实验室,关联负责人
	 * 
	 * @param id
	 * @return
	 */
	public ExperimentLab AselectById(Integer labId) {
		return experimentLabMapper.AselectById(labId);
	}

	/**
	 * 通过id删除实验室(伪删除)
	 * 
	 * @param id
	 * @param req
	 * @param labName
	 * @param teacherInfo
	 */
	public void deleteById(Integer id, String labName, HttpServletRequest req, TeacherInfo teacherInfo) {
		ExperimentLab experimentLab = new ExperimentLab();
		experimentLab.setLabId(id);
		experimentLab.setStealth(1);
		experimentLabMapper.updateByPrimaryKeySelective(experimentLab);
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),
				"删除了《" + labName + "》实验室", 7);
		teacherLogInformationService.saveSelective(record);
	}

	/**
	 * 校验实验室名称
	 * 
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	public boolean vaildateName(String param, Integer labId) {
		ExperimentLab experimentLab = new ExperimentLab();
		experimentLab.setStealth(2);
		experimentLab.setLabName(param);
		List<ExperimentLab> list = experimentLabMapper.select(experimentLab);
		if (list.size() <= 0)
			return true;
		return list.get(0).getLabId() == labId ? true : false;
	}

	/**
	 * 校验实验室编号
	 * 
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	public boolean vaildateNumber(String param, Integer labId) {
		ExperimentLab experimentLab = new ExperimentLab();
		experimentLab.setStealth(2);
		experimentLab.setLabNumber(param);
		List<ExperimentLab> list = experimentLabMapper.select(experimentLab);
		if (list.size() <= 0)
			return true;
		return list.get(0).getLabId() == labId ? true : false;
	}

	/**
	 * 根据权限查询院系下的教师 不包括已删除的院系 不包括已删除的教师
	 * 
	 * @param menuParam
	 *            null:自己; 1、查询所有院系的教师; 2、查询同院系的教师; 3、自己;
	 * @param teacherInfo
	 *            教师id，教师名字;院系id，院系名称,不能为空
	 * @param labId
	 *            关联查询负责人表,如果有分配的话,在isSelected属性加上1标识,如果不需要,可传值null
	 * @return 仅查询来院系id,院系名称 仅查询教师id,教师名称
	 */
	public List<Department> selectTeacherByMenuParam(Integer menuParam, TeacherInfo teacherInfo, Integer labId) {
		List<Department> list = new ArrayList<Department>();
		// 查询数据
		if (menuParam == null) {
			// 自己
			Department department = new Department();
			department.setId(teacherInfo.getDepartment().getId());
			department.setName(teacherInfo.getDepartment().getName());
			List<TeacherInfo> tilist = new ArrayList<TeacherInfo>();
			tilist.add(teacherInfo);
			list.add(department);
		} else {
			if (menuParam == 1) {
				// 所有院系
				list = departmentService.selectTeacherByDepartmentId(null);
			} else if (menuParam == 2) {
				// 本院系
				list = departmentService.selectTeacherByDepartmentId(teacherInfo.getDepartment().getId());
			} else if (menuParam == 3) {
				// 自己
				Department department = new Department();
				department.setId(teacherInfo.getDepartment().getId());
				department.setName(teacherInfo.getDepartment().getName());
				List<TeacherInfo> tilist = new ArrayList<TeacherInfo>();
				tilist.add(teacherInfo);
				list.add(department);
			}
		}

		// add tag
		if (labId != null && list != null && list.size() > 0) {
			// find managers of this experiment’s lab
			List<LabManager> lablist = labManagerService.selectByLabId(labId);
			if (lablist != null && lablist.size() > 0) {
				// this string is managers
				String managerIds = ",";
				for (LabManager k : lablist) {
					managerIds += k.getManagerId() + ",";
				}
				// record tag
				int tagCount = 0;
				// loop all teachers,add tag to who is manager;
				for (Department i : list) {
					// try it;if the department has teachers
					if (i.getTeacherInfoList() != null && i.getTeacherInfoList().size() > 0) {

						for (TeacherInfo j : i.getTeacherInfoList()) {
							if (managerIds.contains("," + j.getId() + ",")) {
								// yes,he is the manager of this expriment’s lab
								j.setIsSelected(1);
								tagCount++;
							}

						}
					}
					// lablist.size() managers
					if (tagCount == lablist.size())
						break;
				}
			}
		}
		return list;
	}

	/**
	 * 根据实体类不为null的字段and 查询
	 * 
	 * @param record
	 * @return
	 */
	public List<ExperimentLab> select(ExperimentLab record) {
		return experimentLabMapper.select(record);
	}

	/**
	 * 根据课程表id查询所在实验室
	 * 
	 * @return
	 */
	public ExperimentLab selectByScheduleId(Integer scheduleId) {
		return experimentLabMapper.selectByScheduleId(scheduleId);
	}

	/**
	 * 统计实验室总数
	 * 
	 * @return
	 */
	public Integer selectExperimentLabCount() {
		Integer exLabCount = experimentLabMapper.selectExperimentLabCount();
		return exLabCount;
	}

	/**
	 * @param departmentId
	 *            院系id
	 * @return
	 */
	public Department selectdepartmentId(Integer departmentId) {
		if (departmentId != -1) {
			Department de = experimentLabMapper.selectdepartmentId(departmentId);
			return de;
		} else {
			Department de = new Department();
			de.setName("通用实验室");
			return de;
		}
	}

	/**
	 * 只返回智慧实验室
	 * 
	 * @param scheduleId
	 * @return
	 */
	public List<ExperimentLab> selectWisdomLabList(List<ExperimentLab> exlList) {
	//	List<ExperimentLab> exlList = experimentLabMapper.selectExperimentLabList(null, 2, null);
		Iterator<ExperimentLab> iterator = exlList.iterator();
		while (iterator.hasNext()) {
			ExperimentLab lab = iterator.next();
			if (lab.getMainframeId()==null && lab.getMainframeKey()==null) {
				iterator.remove();
			}
		}

		return exlList;
	}
	
	public Page<ExperimentLab> selectWisdomLabListPage(Integer menuParam, TeacherInfo teacherInfo, Page p, String keyword,
			Integer labStatus) {
		if (p != null)
			p.setStartNumber(p.getPageSize() * p.getThisPage());
		List<ExperimentLab> list = selectByMenuParam(menuParam, teacherInfo, keyword, p, labStatus);
		//只获取智慧实验室
		List<ExperimentLab>  listLab = selectWisdomLabList(list);
		Page<ExperimentLab> temp = new Page<>(listLab, p.getThisPage(), p.getPageSize(),
				experimentLabMapper.countAselect(2, keyword));
		return temp;
	}

	/**
	 * 获取所有实验室 可用状态
	 * @return
	 */
	public List<ExperimentLab> getLabList() {
		List<ExperimentLab> lab = experimentLabMapper.selectLabList();
		return lab;
	}

	/**
	 * 下载课程模板
	 * @param request
	 * @param response
	 */
	public void downloadModel(HttpServletRequest request, HttpServletResponse response)throws Exception {
		// TODO Auto-generated method stub
		  //下载模板
		FileOperateUtils.download(request, response, COURSE_MODEL);
	}

	/**
	 * 使用excel批量导入课程信息
	 * 
	 * @param param
	 * @param teachersFile
	 * @param vcoocUserId
	 * @throws Exception
	 */
	public void addTeacehrInfoByExcel(HttpServletRequest request, HttpServletResponse response,
		MultipartFile courseFile,TeacherInfo teacherInfo, String fileName) throws Exception {
		InputStream in = courseFile.getInputStream();
		// 返回一个字符串的数据
		String str = ImportExcelUtil.toStr(in, fileName,BEGIN_ROW,COURSE_CELL_COUNT);
		// 将字符串转换为数组
		String[] courses = str.split(",");
		
		String[] counrse = new String[COURSE_SIZE];
		ImportCunrseDTO t = new ImportCunrseDTO();
		
		List<ImportCunrseDTO> csLsit = new ArrayList<ImportCunrseDTO>();
		List<User> userList = new ArrayList<User>();
		for (int i = 0; i < courses.length; i += COURSE_SIZE) {
			// 获取一条教师数组
			System.arraycopy(courses, i, counrse, 0, COURSE_SIZE);
			// 将数组转换为对象
			t = stringToCourse(counrse);
		
			csLsit.add(t);
		}
		synchronized(teacherInfo) {
			for (int i = 0; i < csLsit.size(); i++) {
				CourseSchedule cs  = new CourseSchedule();
				cs.setCourseId(csLsit.get(i).getCourserId());//课程id
				cs.setLabId(csLsit.get(i).getNumberLabId());//实验id
				cs.setExperimentId(csLsit.get(i).getExperimernteId());//实验id
				cs.setSeats(csLsit.get(i).getLabSeats());//初始化实验室工位
				cs.setSlice(csLsit.get(i).getSliceToString());//第几节
				cs.setSchooltime(csLsit.get(i).getSchooltime());//上课时间
				cs.setOperatorId(csLsit.get(i).getThId());//教师id
				cs.setType(1);//只写入正班上课
				cs.setStealth(2);
				cs.setCreateTime(new Date());
				cs.setUpdateTime(new Date());
				cs.setDeputy(csLsit.get(i).getStId());
				courseScheduleMapper.insertSelective(cs);
				Integer classId = csLsit.get(i).getClassId();
				Integer[] arr = new Integer[1];
				arr[0]=classId;
				
				scheduleClassService.insert(cs.getScheduleId(), arr);
				/*ScheduleClass sc = new ScheduleClass();
				sc.setClassId(csLsit.get(i).getClassId());//班级id
				sc.setScheduleId(cs.getScheduleId());
				sc.setStealth(2);
				sc.setCreateTime(new Date());
				sc.setUpdateTime(new Date());*/
				//拿到自增id 进行 添加班级
				//scheduleClassMapper.insertSelective(sc);
				//Integer classId = csLsit.get(i).getClassId();
				//集合中取出班级id 加入数组
				//Integer[] arr = new Integer[1];
				//arr[1]=classId;
				//初始化成绩表
				//scheduleClassService.insertByArray(cs.getScheduleId(), arr, new Date());
				
			}  
	    }
	   // 设置日志信息
		String message ="批量添加了课程排课";
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(request, teacherInfo.getId(),message, 7);
		teacherLogInformationService.saveSelective(record);
		
	}
	/**
	 * 
	 * @param str
	 *            excel中一条教师数据
	 * @param i
	 *            数组下标
	 * @return
	 * @throws ParseException 
	 */
	private ImportCunrseDTO stringToCourse(String[] str) throws ParseException {
		ImportCunrseDTO ic = new ImportCunrseDTO();
		//根据编号查询实验室id
		String number = String.valueOf(str[0].replace(" ", "").trim());
		ExperimentLab numberLab = experimentLabMapper.selectLabNumber(number);
		
		if(numberLab==null || numberLab.getLabId()==null){
			throw new RuntimeException("实验室编号不能为空，或者检查该实验室是否可用状态！");
		}
		ic.setNumberLabId(numberLab.getLabId());
		ic.setLabSeats(numberLab.getLabSeat());
		//根据课程查询课程id 
		String counrseName = str[1].replace(" ", "").trim();
		Integer courserId = experimentLabMapper.selectCounrseId(counrseName);
		if(courserId==null || courserId==0){
			throw new RuntimeException("上课课程不能为空，或者检查该课程室是否存在！");
		}
		ic.setCourserId(courserId);
		//根据实验查询id
		String experimernteName = str[2].replace(" ", "").trim();
		Integer experimernteId = experimentLabMapper.selectExperimentId(experimernteName);
		if(experimernteId==null || experimernteId==0){
			throw new RuntimeException("上课实验不能为空，或者检查该实验是否存在！");
		}
		ic.setExperimernteId(experimernteId);
		//根据专业年纪班级名称查询班级id
		String majorName = str[3].replace(" ", "").trim();
		String gradeName = str[4].replace(" ", "").trim();
		String className = str[5].replace(" ", "").trim();
		//先查专业再查年级再查班级
		Integer majorId = experimentLabMapper.selectmajorId(majorName);
		if(majorId==null || majorId==0){
			throw new RuntimeException("专业不能为空，或者检查该专业是否存在！");
		}
		
		Integer gradeId = experimentLabMapper.selecgradeId(gradeName);
		if(gradeId==null || gradeId==0){
			throw new RuntimeException("班级不能为空，或者检查该年级是否存在！");
		}
		//班级名称 年级id 获取班级 id 
		Integer classId = experimentLabMapper.selectClassId(className,gradeId);
		if(classId==null || classId==0){
			throw new RuntimeException("班级不能为空，或者检查该班级级是否存在！");
		}
		ic.setClassId(classId);
		//上课节数
		String sliceToString = str[6].replace(" ", "").trim();
		if(sliceToString==null || sliceToString.isEmpty()){
			throw new RuntimeException("上课节数不能为空！");
		}
		ic.setSliceToString(sliceToString);
		//上课时间
		String schoolTimeToString = str[7].replace(" ", "").trim();
		String timeSlot = SDF.format((DateFormat.getDateInstance().parse(schoolTimeToString)));
		//装换成为时间
		//将上课时间转换为date类型存入数据库 ，
		Date schooltime = SDF.parse(timeSlot);  
		if(schooltime==null){
			throw new RuntimeException("上课日期不能为空，或者检查该上课日期格式是否正确！");
		}
		ic.setSchooltime(schooltime);
		
		String th = str[8].replace(" ", "").trim();
		//根据教师名称获取上课教师id
		Integer thId  = experimentLabMapper.selectThId(th);
		if(thId==null || thId==0){
			throw new RuntimeException("上课教师不能为空，或者检查该教师是否存在或者重名！");
		}
		ic.setThId(thId);
		//根据学号获取学生id 
		String st = str[9].replace(" ", "").trim();
		Integer stId = experimentLabMapper.selectStName(st);
		if(stId==null || stId==0){
			throw new RuntimeException("课代表不能为空，或者检查该学号是否存在！");
		}
		ic.setStId(stId);
		//写一个对象包装
		return ic;
	}

	public List<ExperimentLab> getGatewayList() {
		List<ExperimentLab> list = experimentLabMapper.selectLabList();
		List<ExperimentLab> listLab = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i).getMainframeId()!=null&list.get(i).getMainframeKey()!=null){
				
				if(list.get(i).getMainframeId().length()!=0&list.get(i).getMainframeKey().length()!=0){
					//网关id和网关密码不为空才可以进入返回给页面
					listLab.add(list.get(i));
				}
			}
			
		}
		return listLab;
	}

}
