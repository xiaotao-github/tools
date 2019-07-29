package com.vcooc.experiment.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mysql.fabric.xmlrpc.base.Data;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentCourseClassService;
import com.vcooc.experiment.service.ExperimentCourseService;

import cn.hutool.log.Log;

@Controller
@RequestMapping("experimentCourseClassController")
public class ExperimentCourseClassController  {
	@Autowired
	private ExperimentCourseClassService experimentCourseClassService;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private RedisSessionService redisSessionService;
	
	/**
	 * 1.根据课程ID，查询课程信息
	 * 2.查询课程下的班级信息
	 * 3.根据权限查询课程下的班级信息
	 * 4.过滤已经分配给班级的课程： //自定义字段  isSelect;//判断是否被课程选中 1.是  2.否
	 * @param experimentCourseId
	 * @param menuParam
	 * @return
	 */
	@RequestMapping("selectCourseClassByCourseIdToDistributePage/{experimentCourseId}/{menuParam}")
	private ModelAndView selectCourseClassByCourseIdToDistributePage(@PathVariable Integer experimentCourseId,@PathVariable Integer menuParam,ModelAndView model){
		ExperimentCourse experimentCourse = experimentCourseService.selectExperimentCourseById(experimentCourseId);
		//查询课程下的班级，以及其他班级信息，根据所属年级、专业、院系划分
		if(experimentCourse!=null){
			List<Department> departmentList = experimentCourseClassService.selectCourseClsssAndOtherClassGroupByDepartmentByexperimentCourse(experimentCourse,menuParam);
			model.addObject("departmentList", departmentList);
		}
		model.addObject("experimentCourse", experimentCourse);
		model.setViewName("admin/experiment_course_manage/course_class_choice_compulsory");
		return model;
	}
	
	/**
	 * 分配实验课程的班级
	 * @param experimentCourseId 实验课程ID
	 * @param tbClassIds 班级ID
	 * @param oldClassIds 旧的班级ID
	 * @return
	 */
	@RequestMapping("distributeClassToExperimentCourse/{experimentCourseId}")
	@ResponseBody
	public SysResult distributeTeacherToExperimentCourse(@CookieValue(required=false) String vcoocUserId,@PathVariable Integer experimentCourseId,
			Integer[] tbClassIds,Integer[] oldClassIds,HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		experimentCourseClassService.distributeTeacherToExperimentCourse(req,teacherInfo.getId(),experimentCourseId,tbClassIds,oldClassIds);
		return SysResult.ok();
	}
	/**（不使用）
	 * 根据实验课程ID，查询实验课程下分配的班级信息
	 * @param experimentCourseId
	 * @return
	 */
	/*@RequestMapping("selectClassByExperimentCourseId/{experimentCourseId}")
	@ResponseBody
	public SysResult selectClassByExperimentCourseId(@PathVariable Integer experimentCourseId){
		List<TbClass> tbClassList = experimentCourseClassService.selectClassByExperimentCourseId(experimentCourseId);
		if(tbClassList==null || tbClassList.isEmpty()){
			return SysResult.build(202,"该实验室没有安排班级");
		}
		return SysResult.ok(tbClassList);
	}*/
	/**
	 * 根据实验课程ID，查询实验课程下分配的班级信息
	 * @param experimentCourseId
	 * @return
	 */
	@RequestMapping("selectClassByExperimentCourseId/{experimentCourseId}/{courseTime}/{courseSlice}")
	@ResponseBody
	public SysResult selectClassByExperimentCourseId(@PathVariable("experimentCourseId") Integer experimentCourseId
			,@PathVariable("courseTime")String courseTime 
			,@PathVariable("courseSlice")String courseSlice){
		List<TbClass> tbClassList = experimentCourseClassService.selectClassByExperimentCourseId(experimentCourseId,courseTime,courseSlice);
		if(tbClassList==null || tbClassList.isEmpty()){
			return SysResult.build(202,"该实验室没有安排班级,或者已有排课！");
		}
		return SysResult.ok(tbClassList);
	}
}
