package com.vcooc.experiment.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ScourseGroup;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.service.CourseScheduleService;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.ExperimentLabService;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ScheduleClassService;
import com.vcooc.experiment.service.ScourseGroupService;
import com.vcooc.experiment.service.ScourseGroupStudentService;
import com.vcooc.experiment.service.SemesterService;
import com.vcooc.experiment.service.TbClassService;

@Controller
@RequestMapping("courseScheduleController")
public class CourseScheduleController extends BaseController{

	@Autowired
	private ExperimentLabService experimentLabService;  //实验室
	@Autowired
    private SemesterService semesterService;            //学期
	@Autowired
	private CourseScheduleService courseScheduleService;//课程表
	@Autowired
	private ExperimentCourseService experimentCourseService;  //实验课程
	@Autowired
	private TbClassService tbClassService;    //班级
	@Autowired
	private ScheduleClassService scheduleClassService;  //课程表-班级
	@Autowired
	private ExperimentService experimentService;       //实验
	@Autowired
	private ScourseGroupStudentService scourseGroupStudentService;
	@Autowired
	private ScourseGroupService scourseGroupService;   //小组
	
	@Autowired
	private RedisSessionService redisSessionService;
	
	
	
 	/**
	 * 根据实验室id去课表的详情页(多表关联)
	 * @param exprimentLabId
	 * @param menuParam
	 * @return
	 * 		experimentLab  实验室:关联负责人，关联院系
	 * 		semesterList   查询所有的学期
	 * 		semester       dayCount 总天数;weekCount 周数;weekNum 第几周;
 	 * @throws Exception 
	 */
/*	@RequestMapping("toDetailPage/{labId}/{menuParam}/{semesterId}")
	public ModelAndView toDetailPage(final @PathVariable Integer labId,
			final @PathVariable Integer menuParam,final @PathVariable Integer semesterId){
		return  VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//实验室ExperimentLab 
				mv.addObject("experimentLab", 
						      experimentLabService.AselectById(labId));
				//全部学期List<Semester>
				mv.addObject("semesterList", 
							  courseScheduleService.selectSemester(2));
				//当前学期Map<String, Object> 
				//mv.addObject("semester",
							 // semesterService.getCurrentSemesterWithWeek(semesterId));
				mv.addObject("semester",semesterService.getCurrentSemesterWithWeek2(semesterId));
				//查询所有的课程
				mv.addObject("experiemntCourseList", 
					          experimentCourseService.selectExperimentCoursesByMenuParam(menuParam, teacherInfo));
				//查询所有的班级
				mv.addObject("classList", 
						      tbClassService.selectAllClasses(teacherInfo, menuParam));
				//实验室使用次数
				mv.addObject("useCount", courseScheduleService.selectLabUseCount(labId));
				
				mv.addObject("menuParam", menuParam);
				
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_detail");
				return mv;
			}
		});
	}*/
	
	@RequestMapping("toDetailPage/{labId}/{semesterId}")
	public ModelAndView toDetailPage(@CookieValue(required = false) String vcoocUserId, @PathVariable Integer labId,
			 @PathVariable Integer semesterId,ModelAndView mv) {
		try {
			
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			mv.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			mv.addObject("status", 203);
			mv.setViewName("error");
			return mv;
		}
		//实验室ExperimentLab 
		mv.addObject("experimentLab", 
				      experimentLabService.AselectById(labId));
		//全部学期List<Semester>
		mv.addObject("semesterList", 
					  courseScheduleService.selectSemester(2));
		//当前学期Map<String, Object> 
		//mv.addObject("semester",
					 // semesterService.getCurrentSemesterWithWeek(semesterId));
		mv.addObject("semester",semesterService.getCurrentSemesterWithWeek2(semesterId));
		//查询当前所有课程
	/*	mv.addObject("experiemntCourseList", 
			          experimentCourseService.selectExperimentCoursesByMenuParam(menuParam,teacherInfo));*/
		//查询所有的班级
	/*	mv.addObject("classList", 
				      tbClassService.selectAllClasses(teacherInfo,menuParam));*/
		//获取当前操作的所拥有的课程
		mv.addObject("experiemntCourseList", 
		          experimentCourseService.selectMyExperimentCourses(teacherInfo));
		
		//实验室使用次数
		mv.addObject("useCount", courseScheduleService.selectLabUseCount(labId));
		//定死
		mv.addObject("menuParam", 3);
		
		mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_detail");
		return mv;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return mv;
		
	}
	
	
	
	
	/**
	 * 获取一周的课程表
	 * @param exprimentId  实验室id
	 * @param monday       周一时间
	 * @return
	 */
	/*@RequestMapping("getWeekSchedule/{exprimentLabId}/{monday}")
	@ResponseBody
	public SysResult getWeekSchedule(final @PathVariable String monday,
			final @PathVariable Integer exprimentLabId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(courseScheduleService.AselectByLabId(monday, exprimentLabId));
				return sysResult;
			}
		});
	}*/
	
	
	/**
	 * 获取一学期的课程表
	 * @param exprimentId  实验室id
	 * @param semesterId   学期id
	 * @return
	 */
	@RequestMapping("getSemesterSchedule/{exprimentLabId}/{semesterId}")
	@ResponseBody
	public SysResult getSemesterSchedule(final @PathVariable Integer semesterId,
			final @PathVariable Integer exprimentLabId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(courseScheduleService.getSemesterSchedule2(exprimentLabId,semesterId,null));
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 预约实验室
	 * @param courseSchedule
	 * 			courseId    课程id     (什么课)         不能为null
	 * 			labId       实验室id   (预约哪个实验室)  不能为null
	 * 			schooltime  上课时间        (精确到日)        不能为null
	 * 			type         预约类型        (4、私人日程)    不能为null
	 * @return
	 */
	@RequestMapping("appointment")
	@ResponseBody
	public SysResult appointment(final CourseSchedule courseSchedule,final Date endTime,final String classIds){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				//不明所以
	//			if(endTime==null || endTime.getTime()< courseSchedule.getSchooltime().getTime()) return SysResult.build(202, "该学期已结束，无法预约!");
				if(courseSchedule.getLabId() == null)     return SysResult.build(202, "请选择要预约的实验室!");
				if(courseSchedule.getCourseId() == null)  return SysResult.build(202, "请选择要安排的课程!");
				if(courseSchedule.getSchooltime() == null)return SysResult.build(202, "请选择要预约的上课时间!");
				if(courseSchedule.getSlice() == null)     return SysResult.build(202, "请选择要安排的小节!");
				courseSchedule.setOperatorId(teacherInfo.getId());
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("teacherName", teacherInfo.getName());
				map.put("schedule", courseScheduleService.insert(courseSchedule,classIds));
				sysResult.setData(map);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 伪删除课程表
	 * @param scheduleId
	 * @return
	 */
	@RequestMapping("delete/{scheduleId}/{experimentCourseName}/{schooltime}/{slice}/{type}/{number}")
	@ResponseBody
	public SysResult delete(final @PathVariable("scheduleId") Integer scheduleId
			,final HttpServletRequest req
			,final@PathVariable("experimentCourseName")String experimentCourseName
			,final@PathVariable("schooltime")String schooltime
			,final@PathVariable("slice") String slice
			,final@PathVariable("type")Integer type,
			final @PathVariable("number")Integer number){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				courseScheduleService.deleteById(scheduleId,experimentCourseName,schooltime,slice,type,req,teacherInfo,number);
				return sysResult;
			}
		});
	}
	
	@RequestMapping("toEdit/{id}")
	public ModelAndView toEdit(@PathVariable Integer id,Map<String,Object> map){
		CourseSchedule courseSchedule = courseScheduleService.selectByIdAndSeats(id);
		if(courseSchedule == null){
			map.put("status",400);
			map.put("msg","数据为空");
		}else{
			map.put("courseSchedule", courseSchedule);
		}
		return new ModelAndView("admin/experiment_lab_manage/schedule_edit",map);
	}
	
	/**
	 * 修改课程表
	 * @param scheduleId
	 * @return
	 */
	@RequestMapping("update")
	@ResponseBody
	public SysResult update(final CourseSchedule courseSchedule){
		return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				courseScheduleService.updateByPrimaryKeySelective(courseSchedule);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 去添加课程表页面(暂未使用)
	 * @param exprimentLabId  实验室id
	 * @param slice           节数。A.1-2节    B.3-4节    C.午休    D.5-6节     E.7-8节     F.9-10节
	 * @param schooltime      上课时间(格式化到日)
	 * @param menuParam       权限参数
	 * @return
	 */
	@RequestMapping("toAddPage/{exprimentLabId}/{slice}/{schooltime}/{menuParam}")
	public ModelAndView toAddPage(
			final @PathVariable Integer exprimentLabId,
			final @PathVariable String  slice,
			final @PathVariable String  schooltime,
			final @PathVariable Integer menuParam){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//根据权限参数查询实验课程
				mv.addObject("experiemntCourseList", 
						      experimentCourseService.selectExperimentCoursesByMenuParam(menuParam, teacherInfo));
				mv.addObject("exprimentLabId", exprimentLabId);
				mv.addObject("slice", slice);
				mv.addObject("schooltime", schooltime);
				mv.addObject("menuParam", menuParam);
				mv.setViewName("");
				return mv;
			}
		});
	}
	
	
	/**
	 * 添加课程表(暂未使用)
	 * 关联表: course_schedule\scourse_group(小组协作)
	 * @param courseSchedule
	 * type != 4
	 * @return
	 */
	@RequestMapping("add")
	@ResponseBody
	public SysResult add(final CourseSchedule courseSchedule){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				/*if(courseSchedule.getExperimentId() == null)  return SysResult.build(202, "请选择实验!");
				if(courseSchedule.getClassId() == null)       return SysResult.build(202, "请选择班级!");
				
				if(courseSchedule.getType() == 2){
					//小组协作，要创建小组，暂时不管顺序，随机创建小组
				}
				courseSchedule.setOperatorId(teacherInfo.getId());
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("teacherName", teacherInfo.getName());
				map.put("schedule", courseScheduleService.insert(courseSchedule));
				sysResult.setData(map);*/
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 查询实验室在某个时间某个小节的排课信息(暂未使用)
	 * @param exprimentLabId   实验室id
	 * @param slice            节数。A.1-2节    B.3-4节    C.午休    D.5-6节     E.7-8节     F.9-10节
	 * @param schooltime       上课时间(格式化到日)
	 * @return
	 * 		courseScheduleList 只查询出来是'私人日程的排课(4)'
	 * 				关联实验课程
	 * 				关联任课教师
	 * 		ExperimentLab        这个实验室信息
	 */
	/*@RequestMapping("scheduleDetail/{experimentLabId}/{slice}/{schooltime}")
	public ModelAndView ScheduleDetail(
			final @PathVariable Integer experimentLabId,
			final @PathVariable String  slice,
			final @PathVariable String  schooltime){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//实验室
				mv.addObject("experimentLab", experimentLabService.AselectById(experimentLabId));
				//排课表
				mv.addObject("courseScheduleList", 
				courseScheduleService.selectByLabIdAndSliceAndSchooltimeAndType(experimentLabId, slice, schooltime));
				//页面
				mv.setViewName("");
				return mv;
			}
		});
	}*/
	
	
	/**
	 * 去课程表详情页
	 * @param scheduleId 课程表id
	 * @param menuParem  权限参数
	 * @return
	 */
	@RequestMapping("toScheduleDetailPage/{scheduleId}/{menuParam}")
	public ModelAndView toScheduleDetailPage(final @PathVariable Integer scheduleId,
			final @PathVariable Integer menuParam){
		return VerificationUserModel(new VerificationUserModel() {
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//学生列表
				Map<String, Object> map = courseScheduleService.getStudentOfTbclassOrGroup(scheduleId);
				String type = map.get("type")+"";
				//根据课程表里面的实验室id，获取实验室
				//预留方法 获取该课程所对应的实验室网关作为是否是智慧实验室判断，后面该考勤机网关（未对接考勤机）
				mv.addObject("experimentLab", experimentLabService.selectByScheduleId(scheduleId));
				mv.addObject("menuParam", menuParam);
				mv.addObject("scheduleId", scheduleId);
				mv.addObject("scheduleInfo", courseScheduleService.selectCourseScheduleInfo(scheduleId));
				if("2".equals(type)){
					mv.addObject("tbclassList", map);
					//小组
					mv.setViewName("admin/experiment_lab_manage/scourse_detail_team");
				}else if("1".equals(type)){
					mv.addObject("tbclassList", map);
					//整班上课
					mv.setViewName("admin/experiment_lab_manage/scourse_detail_class");
				}else if("3".equals(type)){
					mv.addObject("data", map);
					//自主预约
					mv.setViewName("admin/experiment_lab_manage/scourse_detail_appoint");
				}
				
				return mv;
			}
		});
	}
	/**
	 * 移除班级并且写入到日志
	 * @param scheduleId
	 * @param classId
	 * @return
	 */
	/*@RequestMapping("removeClass/{scheduleId}/{classId}")
	@ResponseBody
	public SysResult removeClass(final @PathVariable Integer scheduleId,
			final @PathVariable Integer classId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scheduleClassService.delete(scheduleId, classId);
				return sysResult;
			}
		});
	}*/
	
	/**移除自主预约的课程班级关联以及查询
	 * @param scheduleId
	 * @param classId
	 * @param req
	 * @return
	 */
	@RequestMapping("removeAutonomyClass/{scheduleId}/{classId}/{experimentCourseName}/{schooltime}/{slice}/{type}")
	@ResponseBody
	public SysResult removeAutonomyClass(final @PathVariable("scheduleId") Integer scheduleId
			,final @PathVariable("classId") Integer classId
			,final HttpServletRequest req
			,final@PathVariable("experimentCourseName")String experimentCourseName
			,final@PathVariable("schooltime")String schooltime
			,final@PathVariable("slice") String slice
			,final@PathVariable("type")Integer type){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scheduleClassService.removeAutonomyClass(scheduleId, classId,req,teacherInfo,experimentCourseName,schooltime,slice,type);
				return sysResult;
			}
		});
	}
	
	/**
	 * 
	 * 添加小组并初始化成绩
	 * @param scourseGroup
	 * 				scheduleId   课程表id不能为null
	 * 				experimentId 实验id不能为null
	 * 				classId      班级id不能为null
	 * @return
	 */
	@RequestMapping("addGroup")
	@ResponseBody
	public SysResult addGroup(final ScourseGroup scourseGroup,final String studentInfoIds){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scourseGroupService.addGroup(scourseGroup, studentInfoIds, teacherInfo);
				return sysResult;
			}
		});
	}
	
	
	
	/**
	 * 查找可以添加的班级
	 * @param scheduleId
	 * @return 
	 */
	@RequestMapping("addAllowTbClass/{courseTime}/{courseSlice}/{scheduleId}")
	@ResponseBody
	public SysResult addAllowTbClass(@PathVariable("courseTime")final  String courseTime ,
			@PathVariable("courseSlice") final  String courseSlice,
			@PathVariable("scheduleId")final  Integer scheduleId){
		return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(scheduleClassService.getAllowTbClass(courseTime,courseSlice,scheduleId));
				return sysResult;
			}
		});
	}
	/*旧接口
	 	//查找可以添加的班级
	 	@RequestMapping("addAllowTbClass")
		@ResponseBody
		public SysResult addAllowTbClass(final Integer scheduleId){
			return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(scheduleClassService.getAllowTbClass(scheduleId));
				return sysResult;
				}
			});
		}*/
	
	/**
	 * 添加班级
	 * @param scheduleId
	 * @param classId
	 * @return
	 */
	@RequestMapping("addClass")
	@ResponseBody
	public SysResult add(final Integer scheduleId,final String classIds,final Integer type){
		return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scheduleClassService.insert(scheduleId, classIds,type);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 教师获取个人课表
	 * @return
	 */
	@RequestMapping("myCourseSchedule")
	@ResponseBody
	public SysResult myCourseSchedule(){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(courseScheduleService.myCourseSchedule(teacherInfo.getId()));
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 去添加小组页面
	 * @param scheduleId  课程表id
	 * @param menuParam   权限
	 * @return
	 * 		添加小组需要课程表id,实验id,班级id
	 */
	//@RequestMapping("toAddGroupPage/{scheduleId}/{menuParam}/{classId}/{experimentId}")
	public ModelAndView toAddGroupPage(final @PathVariable("scheduleId") Integer scheduleId,
			final @PathVariable("menuParam") Integer menuParam,
			final @PathVariable("classId") Integer classId,
			final @PathVariable("experimentId") Integer experimentId){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("scheduleId", scheduleId);
				mv.addObject("classId", classId);
				mv.addObject("menuParam", menuParam);
				mv.addObject("experimentId", experimentId);
		/*		//根据课程表的课程获取下面的实验
				mv.addObject("experimentList", experimentService.selectExperimentByScheduleId(scheduleId));
				//根据课程表id获取下面的班级
				mv.addObject("TbclassList", experimentCourseClassService.selectClassByScheduleId(scheduleId));*/
				//班级学生信息
				mv.addObject("studentList", getNoGroupStudent(scheduleId, classId));
				mv.setViewName("admin/experiment_lab_manage/schedule_group_add");
				return mv;
			}
		});
	}

	
	/**
	 * 查询没有添加进小组的学生
	 * @param scheduleId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	//@RequestMapping("getNoGroupStudent/{scheduleId}/{classId}")
	//@ResponseBody
	public SysResult getNoGroupStudent(final @PathVariable Integer scheduleId,
			final @PathVariable Integer classId){
		return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(scourseGroupStudentService.
						getNoGroupStudent(scheduleId, classId));
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 删除小组,记得提示人家，包括成绩等等都会删除掉
	 * @param scheduleId
	 * @param groupId
	 * @return
	 */
	//@RequestMapping("deleteGroup/{scheduleId}/{groupId}")
	//@ResponseBody
	public SysResult deleteGroup(final @PathVariable Integer scheduleId,
			final @PathVariable Integer groupId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scourseGroupService.deleteGroup(scheduleId, groupId);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 去修改小组页面
	 * @param group
	 * @return
	 * 		小组的信息，以及可选择的学生
	 */
	//@RequestMapping("toEditGroupPage/{groupId}")
	public ModelAndView toEditGroupPage(final @PathVariable Integer groupId){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				return new ModelAndView("admin/experiment_lab_manage/schedule_group_edit", 
						scourseGroupService.getGroupAndOtherStudent(groupId));
			}
		});
	}
	
	
	/**
	 * 修改小组信息
	 * @param scourseGroup
	 * @param studentInfoIds
	 * @return
	 */
	//@RequestMapping("editGroup")
	//@ResponseBody
	public SysResult editGroup(final ScourseGroup scourseGroup,
			final String studentInfoIds){
		return VerificationUser(new VerificationUser() {
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scourseGroupService.EditGroup(scourseGroup, studentInfoIds);
				return sysResult;
			}
		});
	}
	
	
	
	/**
	 * 根据实验室id去课表的详情页(多表关联)
	 * @param exprimentLabId
	 * @param menuParam
	 * @return
	 * 		experimentLab  实验室:关联负责人，关联院系
	 * 		semesterList   查询所有的学期
	 * 		semester       dayCount 总天数;weekCount 周数;weekNum 第几周;
	 */
	@RequestMapping("toPersonSchedulePage/{labId}/{menuParam}/{semesterId}")
	public ModelAndView toPersonSchedulePage(final @PathVariable Integer labId,
			final @PathVariable Integer menuParam,final @PathVariable Integer semesterId){
		return  VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//实验室ExperimentLab 
				mv.addObject("experimentLab", 
						      experimentLabService.AselectById(labId));
				//全部学期List<Semester>
				mv.addObject("semesterList", 
							  courseScheduleService.selectSemester(2));
				//当前学期Map<String, Object> 
				mv.addObject("semester",
							  semesterService.getCurrentSemesterWithWeek(semesterId));
				mv.setViewName("");
				return mv;
			}
		});
	}
	
	/**
	 * 获取一学期的课程表
	 * @param exprimentId  实验室id
	 * @param semesterId   学期id
	 * @return
	 */
	@RequestMapping("getPersonSchedule/{exprimentLabId}/{semesterId}")
	@ResponseBody
	public SysResult getPersonSchedule(final @PathVariable Integer semesterId,
			final @PathVariable Integer exprimentLabId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				sysResult.setData(courseScheduleService.getPersonSchedule(exprimentLabId,semesterId,teacherInfo.getId()));
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 去添加历史小组页面
	 * @param scheduleId  课程表id
	 * @param menuParam   权限
	 * @return
	 * 		添加小组需要课程表id,实验id,班级id
	 */
	//@RequestMapping("toAddHistoryGroupPage/{scheduleId}/{menuParam}/{classId}/{experimentId}")
	public ModelAndView toAddHistoryGroupPage(final @PathVariable("scheduleId") Integer scheduleId,
			final @PathVariable("menuParam") Integer menuParam,
			final @PathVariable("classId") Integer classId,
			final @PathVariable("experimentId") Integer experimentId
			){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("scheduleId", scheduleId);
				mv.addObject("classId", classId);
				mv.addObject("experimentId", experimentId);
				mv.addObject("menuParam", menuParam);
				//根据课程表的课程获取下面的实验
				mv.addObject("experimentList", experimentService.selectExperimentByScheduleId(scheduleId));
				//根据课程表id获取下面的班级
/*				mv.addObject("TbclassList", experimentCourseClassService.selectClassByScheduleId(scheduleId));
*/				
				mv.addObject("studentList", scourseGroupStudentService.getNoGroupStudent(scheduleId, classId));
				mv.setViewName("admin/experiment_lab_manage/schedule_group_history_add");
				return mv;
			}
		});
	}
	
	
	/**
	 * 
	 * 添加历史实验小组并初始化成绩
	 * 		切记，添加了历史模板之后，是不能添加小组的!
	 * @param scourseGroup
	 * 				scheduleId   课程表id不能为null
	 * 				experimentId 实验id不能为null
	 * 				classId      班级id不能为null
	 * @return
	 */
	//@RequestMapping("addHistoryGroup")
	//@ResponseBody
	public SysResult addHistoryGroup(final ScourseGroup scourseGroup,final Integer checkGroupId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				scourseGroupService.addHistoryGroup(scourseGroup, checkGroupId, teacherInfo);
				return sysResult;
			}
		});
		
	}
	
	
	/**
	 * 跳转到教师课表
	 * @param 
	 * @param menuParam
	 * @return
	 */
	@RequestMapping("myCourseScheduleList")
	public ModelAndView myCourseSchedule(@CookieValue(required = false) String vcoocUserId,@RequestParam Integer menuParam,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		List<CourseSchedule> cs = courseScheduleService.myCourseScheduleList(teacherInfo.getId());
		model.addObject("currentTimeStamp",new Date().getTime());
		model.addObject("csList",cs);
		model.addObject("menuParam",menuParam);
		model.setViewName("admin/course_schedule_details/myCourseScheduleList");
		return model;
	}
		
		
	
	/**
	 * 跳转到调课页面
	 * @param 
	 * @param menuParam
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("changeCourse/{scheduleId}")
	public ModelAndView changeCourse(@PathVariable Integer scheduleId,ModelAndView model) throws Exception{

		CourseSchedule cs = courseScheduleService.selectCourseScheduleInfo(scheduleId);
		model.addObject("csList",cs);
		model.addObject("map", semesterService.getCurrentSemesterWithWeek2());
		model.addObject("lablist",experimentLabService.getLabList());
		model.setViewName("admin/course_schedule_details/changeCourse");
		return model;
	}
		
	/**
	 * 根据实验室id 查询该实验室 当前课程信息
	 * @param labId  实验室id
	 * @return CourseSchedule
	 */
	@RequestMapping("getConreNameClassList/{labId}/{thisSelectedMonday}")
	@ResponseBody
	public SysResult findNowCourseByLabId(@PathVariable("labId") Integer labId ,@PathVariable("thisSelectedMonday") String thisSelectedMonday){
		try{
			List<CourseSchedule> schedule = courseScheduleService.getConreNameClassList(labId,thisSelectedMonday);
			return SysResult.ok(schedule);
		}catch(Exception ex){
			ex.printStackTrace();
			return SysResult.build(202,ex.getMessage());
		}
	}
	/**
	 * 更改预约排课
	 * @param labId  实验室id
	 * @return CourseSchedule
	 */
	@RequestMapping("changeCourse")
	@ResponseBody
	public SysResult changeCourse(@RequestParam("schooltimeToString") String schooltimeToString ,@RequestParam("slice") String slice,@RequestParam("labId") Integer labId ,@RequestParam("scheduleId")Integer scheduleId){
		try{
			CourseSchedule schedule = courseScheduleService.setchangeCourse(schooltimeToString,slice,labId,scheduleId);
			return SysResult.ok();
		}catch(Exception ex){
			ex.printStackTrace();
			return SysResult.build(202,ex.getMessage());
		}
	}
	
	/**
	 * 设置课代表
	 * @param studentId 学生id 
	 * @param scheduleId 排课课程id
	 * @return
	 */
	@RequestMapping("addDeputy")
	@ResponseBody
	public SysResult addDeputy(@RequestParam("studentId") Integer studentId ,@RequestParam("scheduleId")Integer scheduleId){
		try{
			courseScheduleService.addDeputy(studentId,scheduleId);
			return SysResult.ok();
		}catch(Exception ex){
			ex.printStackTrace();
			return SysResult.build(202,ex.getMessage());
		}
	}
	
	/**
	 * 取消课代表
	 * @param studentId 学生id 
	 * @param scheduleId 排课课程id
	 * @return
	 */
	@RequestMapping("delectDeputy")
	@ResponseBody
	public SysResult delectdeputy(@RequestParam("studentId") Integer studentId ,@RequestParam("scheduleId")Integer scheduleId){
		try{
			courseScheduleService.delectDeputy(studentId,scheduleId);
			return SysResult.ok();
		}catch(Exception ex){
			ex.printStackTrace();
			return SysResult.build(202,ex.getMessage());
		}
	}

	
	
}
