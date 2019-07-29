package com.vcooc.experiment.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.TeacherLogInformationService;
@Controller
@RequestMapping("experimentCourseController")
public class ExperimentCourseController {
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	
	/**
	 * 根据权限参数和用户信息，查询实验课程信息：
	 * menuParam ==1 :所有实验课程
	 * menuParam ==2 :院系实验课程
	 * menuParam ==3 :我的实验课程
	 * 查询出实验课程信息，任课教师，所属院系
	 * @param menuParam 权限参数
	 * @param vcoocUserId 用户的cookie参数
	 * @param model 模型
	 * @return
	 */
	@RequestMapping("selectExperimentCoursesToPage/{menuParam}")
	public ModelAndView selectExperimentCoursesToPage(@PathVariable Integer menuParam,@CookieValue(required=false) String vcoocUserId,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			model.addObject("msg", "由于您长时间未操作，请登录后操作");
			model.setViewName("error");
			return model;
		}
		try {
			List<ExperimentCourse> experimentCourseList = experimentCourseService.selectExperimentCoursesByMenuParam(menuParam,teacherInfo);
			model.addObject("experimentCourseList", experimentCourseList);
			model.addObject("menuParam",menuParam);
			model.setViewName("admin/experiment_course_manage/course_manage_list");
			return model;
		} catch (RuntimeException e) {
			model.addObject("msg", e.getMessage());
			model.setViewName("error");
			return model;
		}
	}
	
	/**
	 * 根据权限参数和用户信息，查询实验课程信息：
	 * menuParam ==1 :所有实验课程
	 * menuParam ==2 :院系实验课程
	 * menuParam ==3 :我的实验课程
	 * 查询出实验课程信息，任课教师，所属院系
	 * @param menuParam 权限参数
	 * @param vcoocUserId 用户的cookie参数
	 * @param model 模型
	 * @return
	 */
	@RequestMapping("selectExperimentCoursesByMenuParam/{menuParam}")
	@ResponseBody
	public SysResult selectExperimentCoursesByMenuParam(@PathVariable Integer menuParam){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		try {
			List<ExperimentCourse> experimentCourseList = experimentCourseService.selectExperimentCoursesByMenuParam(menuParam,teacherInfo);
			return SysResult.ok(experimentCourseList);
		} catch (RuntimeException e) {
			return SysResult.build(202,e.getMessage());
		}
	}
	
	/**
	 * a)判断所属院系、课程名称、课程所属学期，总课时，课程介绍不能为空；
	 * 9)添加成功，跳转回课程添加页面：参数：status200;msg:”添加成功”；
	 *	添加失败，跳转回课程添加页面：参数：status:202;msg:”失败原因”；course:”用户输入的课程信息”
	 * @param imgFile
	 * @param experimentCourse
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@RequestMapping("addExperimentCourse/{menuParam}")
	public ModelAndView addExperimentCourse(@PathVariable(value="menuParam") Integer menuParam,@RequestParam(required=false)MultipartFile photoFile ,
			ExperimentCourse experimentCourse,@CookieValue(required=false) String vcoocUserId,HttpServletRequest req,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		try {
			//添加实习课程
			experimentCourseService.addExperimentCourse(req,experimentCourse,photoFile,teacherInfo);
			//封装结果
			model.addObject("status",200);
			model.addObject("msg", "添加成功");
			model.setViewName("admin/experiment_course_manage/course_manage_add");
			return model;
		} catch (RuntimeException e) {
			//封装错误结果
			model.addObject("status",202);
			model.addObject("menuParam", menuParam);
			model.addObject("experimentCourse", experimentCourse);
			model.addObject("msg", e.getMessage());
			model.setViewName("admin/experiment_course_manage/course_manage_add");
			return model;
		}
		
	}
	/**
	 * 根据实验课程ID，查询实验课程信息，跳转到实验课程修改页面
	 * @param experimentCourseId 实验课程ID
	 * @param model
	 * @return
	 */
	@RequestMapping("selectExperimentCourseByIdToEditPage/{experimentCourseId}/{menuParam}")
	public ModelAndView selectExperimentCourseByIdToEditPage(@PathVariable("menuParam") Integer menuParam,@PathVariable("experimentCourseId") Integer experimentCourseId,ModelAndView model){
		ExperimentCourse experimentCourse = experimentCourseService.selectExperimentCourseById(experimentCourseId);
		model.addObject("experimentCourse", experimentCourse);
		model.addObject("menuParam", menuParam);
		model.setViewName("admin/experiment_course_manage/course_manage_edit");
		return model;
	}
	/**
	 * 实验课程预览
	 * @param experimentCourseId 实验课程ID
	 * @param model
	 * @return
	 */
	@RequestMapping("selectExperimentCourseByIdToPreviewPage/{experimentCourseId}/{menuParam}")
	public ModelAndView selectExperimentCourseByIdToPreviewPage(@PathVariable("menuParam") Integer menuParam,@PathVariable("experimentCourseId") Integer experimentCourseId,ModelAndView model){
		ExperimentCourse experimentCourse = experimentCourseService.selectExperimentCourseById(experimentCourseId);
		model.addObject("experimentCourse", experimentCourse);
		model.addObject("menuParam", menuParam);
		model.setViewName("admin/experiment_course_manage/course_manage_preview");
		return model;
	}
	/**
	 * 课程实验预览
	 * @param experimentCourseId 实验课程ID
	 * @param model
	 * @param systemIdentify  代表是开放与预约管理实验  
	 * @return
	 */
	@RequestMapping("selectCourseExperimentByIdToPreviewPage/{experimentCourseId}/{menuParam}")
	public ModelAndView selectCourseExperimentByIdToPriviewPage(@PathVariable("menuParam") Integer menuParam
			,@PathVariable("experimentCourseId") Integer experimentCourseId
			,@RequestParam("courseName") String courseName,
			 ModelAndView model){
		 int systemIdentify = 2;
		ExperimentCourse experimentCourse = experimentCourseService.selectCourseAndExprimentByCourseId(experimentCourseId,systemIdentify);
		model.addObject("experimentCourse", experimentCourse);
		model.addObject("menuParam", menuParam);
		model.addObject("courseName",courseName);
		model.addObject("experimentCourseId", experimentCourseId);
		model.setViewName("admin/experiment_course_manage/course_experiment_preview");
		return model;
	}
	/**
	 * 修改实验课程信息
	 * @param imgFile
	 * @param experimentCourse
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@RequestMapping("updateExperimentCourse/{menuParam}")
	public ModelAndView updateExperimentCourse(@PathVariable Integer menuParam,
			@RequestParam(required=false)MultipartFile photoFile ,
			HttpServletRequest req,
			ExperimentCourse experimentCourse,
			@CookieValue(required=false) String vcoocUserId,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		//判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		try {
			//添加实习课程
			experimentCourseService.updateExperimentCourse(req,experimentCourse,photoFile,teacherInfo);
			//封装结果
			model.addObject("status",200);
			model.addObject("msg", "修改成功");
			model.setViewName("admin/experiment_course_manage/course_manage_edit");
			return model;
		} catch (RuntimeException e) {
			//封装错误结果
			model.addObject("status",202);
			model.addObject("experimentCourse", experimentCourse);
			model.addObject("menuParam", menuParam);
			model.addObject("msg", e.getMessage());
			model.setViewName("admin/experiment_course_manage/course_manage_edit");
			return model;
		}
	}
	/**
	 * 伪删除实验课程，修改实验课程的显示状态
	 * @return
	 */
	@RequestMapping("updateExperimentCourseStealth/{experimentCourseId}/{stealth}")
	@ResponseBody
	public SysResult updateExperimentCourseStealth(@CookieValue(required=false) String vcoocUserId,
			@PathVariable("experimentCourseId") Integer experimentCourseId,
			HttpServletRequest req,
			@PathVariable("stealth")Integer stealth){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		ExperimentCourse experimentCourse = new ExperimentCourse();
		experimentCourse.setStealth(stealth);
		experimentCourse.setExperimentCourseId(experimentCourseId);
		experimentCourse.setUpdateTime(new Date());
		experimentCourseService.updateSelective(experimentCourse);
		
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"添加了实验课程《"+experimentCourse.getCourseName()+"》", 5);
		teacherLogInformationService.saveSelective(record);
		return SysResult.ok();
	}
	/**
	 * 根据院系ID查询院系下的实验课程信息
	 * @param departmentId 院系ID
	 * @return
	 */
	@RequestMapping("selectExperimentCourseByDepartmentId/{departmentId}")
	@ResponseBody
	public SysResult selectExperimentCourseByDepartmentId(@PathVariable Integer departmentId){
		List<ExperimentCourse> experimentCourseList = experimentCourseService.selectExperimentCourseByDepartmentId(departmentId);
		if(experimentCourseList!=null && !experimentCourseList.isEmpty()){
			return SysResult.ok(experimentCourseList);
		}else{
			return SysResult.build(202,"该院系下无实验课程！");
		}
	}
}
