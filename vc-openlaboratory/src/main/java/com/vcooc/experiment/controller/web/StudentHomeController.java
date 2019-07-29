package com.vcooc.experiment.controller.web;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.LabBlacklist;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.base.pojo.Semester;
import com.vcooc.base.pojo.StudentExperimentResult;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.StudentNotes;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.dto.ExperimentFileNameDTO;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ExperimentTemplateService;
import com.vcooc.experiment.service.LabBlacklistService;
import com.vcooc.experiment.service.SemesterService;
import com.vcooc.experiment.service.web.StudentHomeService;

@Controller
@RequestMapping("studentController")
public class StudentHomeController {

	@Autowired
	private RedisSessionService redisSessionService;

	@Autowired
	private StudentHomeService studentHomeService;

	@Autowired
	private SemesterService semesterService; // 学期

	@Autowired
	private ExperimentService experimentService;
	
	@Autowired
	private LabBlacklistService labBlacklistService;
	
	@Autowired
	private ExperimentTemplateService experimentTemplateService;
	
	@RequestMapping("toMainPage/{studentId}/{classId}")
	private ModelAndView toMainPage(@CookieValue(required = false) String vcoocUserId, ModelAndView model,
			@PathVariable("studentId") Integer studentId, @PathVariable("classId") Integer classId)  {
		// 获取登陆用户信息
		try {
			
	
		StudentInfo studentInfo = redisSessionService.querySessionUserInfo(new StudentInfo(), vcoocUserId);
		// 判断学生是否为空
		if (studentInfo == null) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		// 全部学期List<Semester>
		model.addObject("semesterList", semesterService.selectSemester(2));
		// 当前学期Map<String, Object>
		model.addObject("semester", semesterService.getCurrentSemesterWithWeek2(-1));
		// 获取学生的详细信息
		model.addObject("studentInfo", studentInfo);
		// 获取我的预约总数 /我的课程总数/实验总数
		//model.addObject("scourseStudent", studentHomeService.countScourseStudent(studentId));
		//model.addObject("experimenTcourse", studentHomeService.countExperimenTcourse(classId));
		//model.addObject("experimentList", studentHomeService.countexperimentList(classId));
		model.setViewName("student/welcome");
		return model;
		} catch (Exception e) {
			// TODO: handle exception
		}
		return model;
	}

	/**
	 * 获取一学期的课程表
	 * 
	 * @param exprimentId
	 *            班级id
	 * @param semesterId
	 *            学期id
	 * @return
	 */
	@RequestMapping("getCourseSchedule/{classId}/{studentId}/{semesterId}")
	@ResponseBody
	public SysResult getPersonSchedule(final @PathVariable Integer semesterId, final @PathVariable Integer classId,
			@PathVariable Integer studentId) {
		return SysResult.ok(studentHomeService.getPersonSchedule(classId, studentId, semesterId,0));
	}

	/**
	 * 获取课程明细 获取实验资源 获取 笔记 获取考勤
	 * 
	 * @param model
	 * @param scheduleId
	 *            课程表Id
	 * @param studentId
	 *            学生Id
	 * @param labId
	 *            实验室Id
	 * @param experimentId
	 * @return
	 */
	@RequestMapping("getCourseScheduleList/{scheduleId}/{studentId}/{experimentId}/{labId}/{experimentCourseId}")
	public ModelAndView getCourseScheduleList(ModelAndView model, @PathVariable("scheduleId") Integer scheduleId,
			@PathVariable("studentId") Integer  studentId, @PathVariable("experimentId") Integer experimentId,
			@PathVariable("labId") Integer labId,
			@PathVariable("experimentCourseId") Integer experimentCourseId,
			@CookieValue(required = false) String vcoocUserId,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value="msg",required=false)String msg) {
		// 获取登陆用户信息
		StudentInfo studentInfo = redisSessionService.querySessionUserInfo(new StudentInfo(), vcoocUserId);
		// 学生Id 实验Id 用于 笔记的操作 与实验报告的提交 同时做跳转
		model.addObject("studentId", studentId);
		model.addObject("experimentId", experimentId);
		model.addObject("scheduleId", scheduleId);
		model.addObject("labId", labId);
		model.addObject("status", status);// 此参数用与界面判断学生文件提交状态
		model.addObject("msg", msg);
		model.addObject("experimentCourseId", experimentCourseId);
		
		// 获取当前学生是否已经提交了作业，界面作为判断
		model.addObject("ScheduleStudentScore", studentHomeService.finAll(studentId, experimentId, scheduleId));
		// 获取界面编辑的路径
		model.addObject("experimentFilePath", studentHomeService.getPath(studentInfo));
		// 实验详情
		model.addObject("experiment", studentHomeService.finallExperimentList(experimentId,scheduleId));
		//实验上的实验课程有多个老师
		model.addObject("experimentThif", studentHomeService.finAllExperimentListThif(experimentCourseId));
		// 实验室详情
		model.addObject("experimentLab", studentHomeService.finallexperimentLab(labId));
		//实验室id 获取是否有考勤机
		model.addObject("labMachine", studentHomeService.finallexperimentLabMachine(labId));
		// 实验室管理员
		model.addObject("experimentLabManager", studentHomeService.finAllExperimentLabManager(labId));
		// 课程下的上课班级
		model.addObject("scheduleClassList", studentHomeService.finAllscheduleClassList(scheduleId));
		// 考勤
		model.addObject("studenClockingIn", studentHomeService.selectStudenClockingIn(studentId, scheduleId));
		// 学生笔记表
		model.addObject("studentNotesList", studentHomeService.selectstudentNotesList(studentId, experimentId));
		// 获取当前实验的资源
		model.addObject("experimentResourceFile", studentHomeService.selectExperimentByExperimentId(experimentId));
		//获取当前实验的模板【没有硬件的把此处注释掉即可】
		model.addObject("experimentTemplate", experimentTemplateService.gettemplateInfo(experimentId));
		model.setViewName("student/experimentDetail_v3");
		return model;
	}

	/**
	 * 删除笔记
	 * 
	 * @param NotesListId
	 * @return
	 */
	@RequestMapping("delNoteById/{id}")
	@ResponseBody
	public SysResult delNoteById(@PathVariable("id") Integer NotesListId) {
		try {
			studentHomeService.delNoteById(NotesListId);
			return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}

	/**
	 * 添加笔记
	 * 
	 * @param NotesListId
	 * @return
	 */
	@RequestMapping("addStudentNotes")
	@ResponseBody
	public SysResult addStudentNotes(StudentNotes studentNotes) {
		try {
			return SysResult.ok(studentHomeService.addStudentNotes(studentNotes));
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}

	/**
	 * 跳转到全部笔记界面
	 * 
	 * @param studentId
	 * @param experimentId
	 * @param model
	 * @return
	 */
	@RequestMapping("JumpInterfaceNotesList/{studentId}/{experimentId}")
	public ModelAndView JumpInterface(@PathVariable("studentId") Integer studentId,
			@PathVariable("experimentId") Integer experimentId, ModelAndView model) {
		// 学生Id 实验Id 用于 笔记的操作
		model.addObject("studentId", studentId);
		model.addObject("experimentId", experimentId);
		model.setViewName("student/teachnote");
		return model;
	}

	/**
	 * 获取全部笔记
	 * 
	 * @param NotesListId
	 * @return
	 */
	@RequestMapping("NotesList/{studentId}/{experimentId}")
	@ResponseBody
	public SysResult NotesList(@PathVariable("studentId") Integer studentId,
			@PathVariable("experimentId") Integer experimentId) {
		try {
			return SysResult.ok(studentHomeService.selectstudentNotesList(studentId, experimentId));
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}

	/**
	 * 实验资源跳转
	 * 
	 * @param NotesListId
	 * @return
	 */
	@RequestMapping("preview/{resourcefileId}/{experimentId}")
	public ModelAndView preview(@PathVariable("resourcefileId") Integer resourcefileId,
			@PathVariable("experimentId") Integer experimentId, ModelAndView model) {
		model.addObject("resourcefileId", resourcefileId);
		model.addObject("experimentId", experimentId);
		model.addObject("resourcefileId", resourcefileId);
		model.setViewName("student/resourcesPreview");
		return model;

	}

	/**
	 * 资源预览详情
	 * 
	 * @param resourcefileId
	 * @param experimentId
	 * @return
	 */
	@RequestMapping("previewList/{resourcefileId}/{experimentId}")
	@ResponseBody
	public SysResult previewList(@PathVariable("resourcefileId") Integer resourcefileId,
			@PathVariable("experimentId") Integer experimentId) {
		try {
			return SysResult.ok(studentHomeService.selectPreviewList(resourcefileId, experimentId));
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}

	/**
	 * 判断文件是否存在
	 * 
	 * @param fileId
	 * @return
	 */
	@RequestMapping("fileExistsById/{fileId}")
	@ResponseBody
	public SysResult fileExistsById(@PathVariable Integer fileId) {
		if (studentHomeService.fileExistsById(fileId)) {
			return SysResult.ok();
		} else {
			return SysResult.build(202, "该资源文件不存在,请联系管理员解决");
		}
	}

	/**
	 * 下载文件
	 * 
	 * @param request
	 * @param response
	 * @param fileId
	 * @return
	 */
	@RequestMapping("downLoad")
	public SysResult downLoad(HttpServletRequest request, HttpServletResponse response, Integer fileId) {
		studentHomeService.downLoadFile(request, response, fileId);
		return SysResult.ok();
	}
	
	

	/**
	 * 学生提交实验报告，文件，图片
	 * 
	 * @param NotesListId
	 * @return
	 */
	@RequestMapping("submitStudentExperimentScore")
	public ModelAndView submitStudentExperimentScore(ScheduleStudentScore score,
			@RequestParam(value = "subProjectFile", required = false) MultipartFile subProjectFile,
			@RequestParam(value = "subGifFile", required = false) MultipartFile subGifFile,
			@CookieValue(required = false) String vcoocUserId,
			ExperimentFileNameDTO experimentFileNameDTO) {
		try {
			StudentInfo studentInfo = redisSessionService.querySessionUserInfo(new StudentInfo(), vcoocUserId);
			studentHomeService.submitOrSaveScheduleStudentScore(score, subProjectFile, subGifFile,
					experimentFileNameDTO,studentInfo.getId());
			return new ModelAndView("forward:/studentController/getCourseScheduleList/" + score.getScheduleId()
					+ "/" + score.getSubmitterId() + "/" + score.getExperimentId() + "/" + score.getLabId()
					+ '/'+score.getExperimentCourseId()+"?status=200");
		} catch (Exception e) {
			e.printStackTrace();
			return new ModelAndView("forward:/studentController/getCourseScheduleList/" + score.getScheduleId()
					+ "/" + score.getSubmitterId() + "/" + score.getExperimentId() + "/" + score.getLabId()
					+ '/'+score.getExperimentCourseId()+"?status=202&msg="+e.getMessage()+"");
		}
	}

	/**
	 * 进行扫描上传图片界面跳转(对象封装跳转界面的数据)
	 * @param score
	 * @param subProjectFile
	 * @param subGifFile
	 */
	@RequestMapping("toExperimentImageUpload")
	public ModelAndView toExperimentImageUpload(
			@RequestParam(value = "scheduleStudentScoreId", required = true) Integer scheduleStudentScoreId,ModelAndView model) {
		ExperimentFileNameDTO experimentFileNameDTO = new ExperimentFileNameDTO();
		model.addObject("scheduleStudentScoreId", scheduleStudentScoreId);
		model.setViewName("student/experiment_image_upload");
		return model;
	}
	/**
	 * 扫描上传图片添加
	 * @param score
	 * @param subProjectFile
	 * @param subGifFile
	 */
	@RequestMapping("saveExperimentImage")
	public ModelAndView saveExperimentImage(
			ExperimentFileNameDTO experimentFileNameDTO
			,ModelAndView model
			,@RequestParam(value = "subGifFile", required = true) MultipartFile subGifFile) {
		try {
			studentHomeService.saveExperimentImage(experimentFileNameDTO,subGifFile);
			model.addObject("status", 200);
			model.addObject("msg", "上传成功,请在PC端刷新查看");
			model.setViewName("student/experiment_image_upload");
		} catch (Exception e) {
			e.printStackTrace();
			model.addObject("status", 202);
			model.addObject("msg",e.getMessage());
			model.setViewName("student/experiment_image_upload");
		}
		return model;
	}
	
	/**
	 * 进行我的预约页面跳转
	 * @param model
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("toExperimentReservationPage")
	public ModelAndView toExperimentReservationPage(@CookieValue(required = false) String vcoocUserId 
			,@RequestParam(value="semesterId" ,required=false) Integer semesterId ,ModelAndView model) throws Exception {
		
			// 获取登陆用户信息
			StudentInfo studentInfo = redisSessionService.querySessionUserInfo(new StudentInfo(), vcoocUserId);
			// 判断学生是否为空
			if (studentInfo == null) {
				model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
				model.addObject("status", 203);
				model.setViewName("error");
				return model;
			}
			if(semesterId==null ||semesterId.equals("")){
				 List<Semester>  semesterList =  semesterService.selectSemester(2);
				 semesterId = semesterList.get(0).getSemesterId();
			}
			// 全部学期List<Semester>
			model.addObject("semesterList", semesterService.selectSemester(2));
			// 当前学期Map<String, Object>
			model.addObject("semester", semesterService.getCurrentSemesterWithWeek2(-1));
			// 获取学生的详细信息
			model.addObject("studentInfo", studentInfo);
			//我的预约总数（包括历史记录）
			model.addObject("scourseStudent", studentHomeService.countScourseStudent(studentInfo.getId()));
			//可预约的实验总数(包含正班上课与自主预约)
			model.addObject("MyReservation",studentHomeService.findAllStudentmyReservableExperimentList(studentInfo.getId(),1,studentInfo.getTbClassId(),semesterId));
			model.addObject("AlreadyReserved",studentHomeService.findAllStudentmyReservableExperimentList(studentInfo.getId(),2,studentInfo.getTbClassId(),semesterId));
			//黑名单
			model.addObject("StrudentLabBlacklist",studentHomeService.finStudentByIdGetBlacklist(studentInfo.getId()));
			model.setViewName("student/experimentReservation");
		return model;
	}
	
	
	/**
	 * 获取当前学期我的预约实验的课程表
	 * 
	 * @param exprimentId
	 *            班级id
	 * @param semesterId
	 *            学期id
	 * @return
	 */
	@RequestMapping("getCourseScheduleAppointment/{classId}/{studentId}/{semesterId}")
	@ResponseBody
	public SysResult getCourseScheduleAppointment(final @PathVariable Integer semesterId, final @PathVariable Integer classId,
			@PathVariable Integer studentId) {
		return SysResult.ok(studentHomeService.getPersonSchedule(classId, studentId, semesterId,1));
	}
	
	/**
	 * 获取我的实验预约列表数据</br>
	 * @param studentId
	 * @param type 0 全部 ；1可预约的实验； 2自主预约 3 历史预约</br> 
	 * @param thisPage 当前页</br>
	 * @return
	 */
	@RequestMapping("myReservableExperimentList/{studentId}/{semesterId}/{classId}/{type}/{thisPage}")
	@ResponseBody
	private SysResult myReservableExperimentList(@PathVariable("studentId") Integer studentId
			,@PathVariable("type") Integer type
			,@PathVariable("semesterId") Integer semesterId
			,@PathVariable("thisPage") Integer thisPage
			,@PathVariable("classId") Integer classId) {
		//获取学生相应实验类型的实验次数
		try {
			Integer total = studentHomeService.findAllStudentmyReservableExperimentList(studentId,type,classId,semesterId);
			Page<CourseSchedule> pageList = new Page<CourseSchedule>();
			pageList.setThisPage(thisPage);
			pageList.setTotal(total);
			pageList.setPageNum(total/pageList.getPageSize() == 0 ? 1:(total/pageList.getPageSize())+(total%pageList.getPageSize()==0?0:1));
			//获取整个学期可以预约的课程（）
			List<CourseSchedule> experimentList = studentHomeService.findAllReservableExperimentList(studentId,type,classId,semesterId,thisPage,pageList.getPageSize());
			pageList.setList(experimentList);
			return SysResult.ok(pageList);
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
		
	}
	
	
	/**
	 * 预约实验
	 * @param studentId //学生id
	 * @param scheduleId 课程表id
	 * @return 预约的工位
	 */
	@RequestMapping("subscribeSchedule/{studentId}/{scheduleId}/{schooltime}/{sliceNmber}")
	@ResponseBody
	private SysResult subscribeSchedule(@PathVariable("studentId") Integer studentId
			,@PathVariable("scheduleId") Integer scheduleId
			,@PathVariable("schooltime")Long schooltime
			,@PathVariable("sliceNmber")String sliceNmber) {
		try {
			//判断当前学生是否是实验室黑名单
			LabBlacklist labBlacklist = labBlacklistService.selectByStudentId(studentId);
			boolean  isLabBlacklist = labBlacklist!=null;
			if(isLabBlacklist) {
				return SysResult.build(203, "你是实验黑名单，不可预约，请联系老师！");
			}
			//return SysResult.build(202, "请选择要安排的小节!");
			Map<String, Object> mySeat = studentHomeService.insertStudentdata(studentId,scheduleId,schooltime,sliceNmber);
			return SysResult.ok(mySeat);
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
		
	}
	
	/**跳转到资源总页面 指定为 实物实验可并根据要求换实验的类型
	 * @param model
	 * @return
	 */
	@RequestMapping("totalResources/{departmentId}")
	private ModelAndView totalResources(ModelAndView model,@PathVariable("departmentId")Integer departmentId ) {
		model.addObject("totalResources",studentHomeService.totalResources(3,departmentId));
		model.setViewName("student/totalResources");
		return model;
	}

	
	
	
	
	//---------------------------------------
	
	
	/**
	 * 来到学生端 -我的实验列表页面 </br>
	 * @param model
	 * @param studentId
	 * @return
	 */
	@RequestMapping("toMyExperimentListPage/{studentId}")
	private ModelAndView toMyExperimentListPage(ModelAndView model,@PathVariable("studentId") Integer studentId,@CookieValue(required=false) String vcoocUserId ) {
		
		// 获取登陆用户信息
		StudentInfo studentInfo = redisSessionService.querySessionUserInfo(new StudentInfo(), vcoocUserId);
		// 判断教师是否为空
		if (studentInfo == null) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
				
		model.addObject("studentId",studentId);
		//学生实验次数
		Integer allCount = studentHomeService.findStudentExperimentCount(studentId,1);
		model.addObject("allCount",allCount==null?0:allCount);
		
		//学生自主预约实验次数
		Integer  freedoCcount = studentHomeService.findStudentExperimentCount(studentId,3);
		model.addObject("freedoCcount",freedoCcount==null?0:freedoCcount);
		//学生已提交实验次数
		Integer  freedoCcountOne = studentHomeService.findStudentExperimentCount(studentId,10);
		model.addObject("freedoCcountOne",freedoCcountOne==null?0:freedoCcountOne);
		//学生已批改实验次数
		Integer  freedoCcountTwo = studentHomeService.findStudentExperimentCount(studentId,20);
		model.addObject("freedoCcountTwo",freedoCcountTwo==null?0:freedoCcountTwo);
		//学生未提交实验次数
		Integer  freedoCcountThree = studentHomeService.findStudentExperimentCount(studentId,30);
		model.addObject("freedoCcountThree",freedoCcountThree==null?0:freedoCcountThree);
		//学生已保存实验次数
		Integer  freedoCcountFour = studentHomeService.findStudentExperimentCount(studentId,40);
		model.addObject("freedoCcountFour",freedoCcountFour==null?0:freedoCcountFour);
		//学生重做实验次数
		Integer  freedoCcountFive = studentHomeService.findStudentExperimentCount(studentId,50);
		model.addObject("freedoCcountFive",freedoCcountFive==null?0:freedoCcountFive);
		
		model.setViewName("student/myExperimentList");
		
		return model;
		
	}
	/**
	 * 获取我的实验列表数据</br>
	 * @param studentId
	 * @param type 0 全部 ；1整班上课； 3自主预约</br> 
	 * @param thisPage 当前页</br>
	 * @return
	 */
	@RequestMapping("myExperimentList/{studentId}/{type}/{thisPage}")
	@ResponseBody
	private SysResult getMyExperimentList(@PathVariable("studentId") Integer studentId,@PathVariable("type") Integer type,@PathVariable("thisPage") Integer thisPage) {
		
		//获取学生相应实验类型的实验次数
		try {
			Integer total = studentHomeService.findStudentExperimentCount(studentId,type);
			
			Page<StudentExperimentResult> pageList = new Page<StudentExperimentResult>();
			pageList.setThisPage(thisPage);
			pageList.setTotal(total);
			pageList.setPageNum(total/pageList.getPageSize() == 0 ? 1:(total/pageList.getPageSize())+(total%pageList.getPageSize()==0?0:1));
			
			//如何实验次数为0，直接返回不查找实验列表
			if(total==0) {
				return SysResult.ok(pageList);
			}
			
			//学生实验列表
			List<StudentExperimentResult> experimentList = studentHomeService.findStudentExperimentList(studentId,type,thisPage,pageList.getPageSize());
			pageList.setList(experimentList);
			
			return SysResult.ok(pageList);
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
		
	}
	
	

}
