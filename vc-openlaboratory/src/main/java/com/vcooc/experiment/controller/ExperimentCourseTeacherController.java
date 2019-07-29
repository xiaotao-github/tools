package com.vcooc.experiment.controller;

import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.ExperimentCourseTeacherService;

@Controller
@RequestMapping("experimentCourseTeacherController")
public class ExperimentCourseTeacherController {
	@Autowired
	private ExperimentCourseTeacherService experimentCourseTeacherService;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private RedisSessionService  redisSessionService;
	
	/**
	 * 根据课程ID，查询课程信息
	 * 根据课程ID，权限ID，查询任课教师信息。
	 * 跳转到任课教师分配页面
	 * @param courseId 课程ID
	 * @param menuParam 权限参数
	 * @param model
	 * @return
	 */
	@RequestMapping("selectTeacherCourseByCourseIdToDistributePage/{experimentCourseId}/{menuParam}")
	public ModelAndView selectTeacherCourseByCourseIdToDistributePage(@PathVariable("experimentCourseId") Integer experimentCourseId,
			@PathVariable("menuParam") Integer menuParam,
			ModelAndView model){
		//查询课程信息
		ExperimentCourse experimentCourse = experimentCourseService.selectExperimentCourseById(experimentCourseId);
		//查询课程下的任课教师，以及其他教师信息，根据所属院系划分
		if(experimentCourse!=null){
			List<Department> departmentList = experimentCourseTeacherService.selectCourseTeacherAndOtherTeacherGroupByDepartmentByexperimentCourse(experimentCourse,menuParam);
			model.addObject("departmentList", departmentList);
		}
		model.addObject("experimentCourse", experimentCourse);
		model.setViewName("admin/experiment_course_manage/course_manage_selTeacher");
		return model;
	}
	/**
	 * 分配实验课程的教师
	 * 移交实验下的小组、班级数据信息
	 * @param teacherInfoIds 分配的教师
	 * @param teacherInfoId 将删除的教师下的实验数据移交人
	 * @param experimentCourseId 需要分配的实验ID
	 * @return
	 */
	@RequestMapping("distributeTeacherToExperimentCourse/{experimentCourseId}")
	@ResponseBody
	public SysResult distributeTeacherToExperimentCourse(@CookieValue(required=false) String vcoocUserId,
			@PathVariable Integer experimentCourseId,
			Integer[] teacherInfoIds,Integer teacherInfoId,
			HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		if(teacherInfoIds!=null){
		List<Integer> teacherInfoIdList = Arrays.asList(teacherInfoIds);
		experimentCourseTeacherService.distributeTeacherToExperimentCourse(req,teacherInfo.getId(),experimentCourseId,teacherInfoIdList,teacherInfoId);
		}else{
			experimentCourseTeacherService.distributeTeacherToExperimentCourse(req,teacherInfo.getId(),experimentCourseId,null,teacherInfoId);
		}
		return SysResult.ok();
	}
}
