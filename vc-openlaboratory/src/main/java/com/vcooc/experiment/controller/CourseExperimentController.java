package com.vcooc.experiment.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.CourseExperimentService;
import com.vcooc.experiment.service.DepartmentService;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.TbClassService;

@Controller
@RequestMapping("courseExperimentController")
public class CourseExperimentController {
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private CourseExperimentService  courseExperimentService;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private TbClassService tbClassService;
	@Autowired
	private DepartmentService departmentService;
	@Autowired
	private ExperimentService experimentService;
	
	//根据教师ID，查询教师下的实验课程下的实验信息。跳转到课程实验展现页面
	@RequestMapping("selectCourseExperimentToPage/{vcoocUserId}")
	public ModelAndView selectCourseExperimentToPage(@PathVariable String vcoocUserId,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		List<ExperimentCourse> experimentCourseList = courseExperimentService.selectExperimentCourseAndExperimentByUserId(teacherInfo.getId());
		model.addObject("experimentCourseList", experimentCourseList);
		model.setViewName("admin/course_experiment_manage/course_experiment_manage_list");
		return model;
	}
	/**
	 *根据实验课程ID，查询实验课程信息 experimentCourse
	 *查询已经分配给该课程的实验hasExperimentList
	 *包括实验作者
	 *查询用户分配给该课程的实验 myDistributeExperiment
	 *查询用户上传的实验 myExperimentList
	 * @param experimentCourseId
	 * @param model
	 * @return
	 */
	@RequestMapping("selectExperimentToDistribute/{vcoocUserId}/{experimentCourseId}/{menuParam}")
	public ModelAndView selectExperimentToDistribute(@PathVariable String vcoocUserId,
			@PathVariable Integer experimentCourseId,
			@PathVariable Integer menuParam,
			ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		//查询实验课程信息
		ExperimentCourse experimentCourse = experimentCourseService.selectExperimentCourseById(experimentCourseId);
		//查询在该实验下的实验
		List<Experiment> hasExperimentList = courseExperimentService.selectExperimentByExperimentCourseId(experimentCourseId);
		//查询未分配的实验
		//List<Experiment> otherExperimentList = courseExperimentService.selectOtherExperimentByExperimentCourseId(experimentCourseId,teacherInfo,menuParam);
		//20171025只查询个人的实验
		List<Experiment> otherExperimentList = courseExperimentService.selectOtherExperimentByExperimentCourseId(experimentCourseId,teacherInfo,3);
		model.addObject("menuParam", menuParam);
		model.addObject("hasExperimentList", hasExperimentList);
		model.addObject("otherExperimentList", otherExperimentList);
		model.addObject("experimentCourse", experimentCourse);
		model.setViewName("admin/experiment_course_manage/course_edit_experiment");
		return model;
	}
	/**
	 * 将原先的实验删除，将新的实验分配给实验课程
	 * @param experimentCourseId
	 * @param experimentIds
	 * @return
	 */
	@RequestMapping("distributeExperimentToCourse/{experimentCourseId}")
	@ResponseBody
	public SysResult distributeExperimentToCourse(@PathVariable Integer experimentCourseId,Integer[] experimentIds){
		courseExperimentService.distributeExperimentToCourse(experimentCourseId,experimentIds);
		return SysResult.ok();
	}
	/**
	 * 根据实验id、班级id查询该班级下的其它实验的信息
	 */
	@RequestMapping("selectClassOtherExperiment/{experimentId}/{classId}")
	@ResponseBody
	public SysResult selectClassOtherExperiment(@PathVariable Integer experimentId,@PathVariable Integer classId){
		List<Experiment> experimentList = courseExperimentService.selectClassOtherExperiment(experimentId,classId);
		if(experimentList == null || experimentList.isEmpty()){
			return SysResult.build(202,"该班级下无历史实验小组");
		}else{
			return SysResult.ok(experimentList);
		}
	}
	/**
	 * 根据实验课程id，实验id，班级id，查询其它实验，跳转到实验分配历史实验页面
	 * @param courseId
	 * @param experimentId
	 * @param classId
	 * @param model
	 * @return
	 */
	@RequestMapping("selectClassOtherExperimentToAddPage/{courseId}/{experimentId}/{classId}/{departmentId}")
	public ModelAndView selectClassOtherExperimentToAddPage(@PathVariable Integer courseId,@PathVariable Integer experimentId,@PathVariable Integer classId,@PathVariable Integer departmentId,ModelAndView model){
		List<Experiment> experimentList = courseExperimentService.selectClassOtherExperiment(experimentId,classId);
		model.addObject("experimentCourse", experimentCourseService.queryById(courseId));
		model.addObject("experiment",experimentService.queryById(experimentId));
		model.addObject("tbClass", tbClassService.queryById(classId));
		model.addObject("department",departmentService.queryById(departmentId));
		model.addObject("experimentList", experimentList);
		model.setViewName("admin/course_experiment_manage/group_assign");
		return model;
	}
}
