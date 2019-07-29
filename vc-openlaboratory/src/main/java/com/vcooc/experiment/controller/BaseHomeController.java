package com.vcooc.experiment.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.util.CookieUtils;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.ExperimentLabService;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ScheduleStudentScoreService;
import com.vcooc.experiment.service.SubmitExperimentFileService;
import com.vcooc.experiment.service.TeacherLogInformationService;
import com.vcooc.experiment.service.TeacherNotesService;

@Controller
@RequestMapping("page")
public class BaseHomeController {
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private TeacherNotesService teacherNotesService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	@Autowired
	private ExperimentCourseService experimentCoutseService;
	@Autowired
	private SubmitExperimentFileService submitExperimentFileService;
	@Autowired
	private ScheduleStudentScoreService scheduleStudentScoreService;
	@Autowired
	private ExperimentService experimentService;
	@Autowired
	private ExperimentLabService experimentLabService;

	/**
	 * 跳转到开放实验室预约管理系统： 1.登录人信息 2.笔记 3.操作记录 4.学生成绩记录 5.实验课程信息 参考实验个数 设计实验个数
	 * 
	 * @param vcoocUserId
	 * @param model
	 * @param systemIdentify
	 *            1.虚拟实验子系统 2.预约实验子系统
	 * @return
	 */


	@RequestMapping("toMainPage/{vcoocUserId}")
	public ModelAndView toMainPage(@PathVariable("vcoocUserId") String vcoocUserId, HttpServletRequest request,
			HttpServletResponse response, ModelAndView model) {

		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
		// 判断教师是否为空
		if (null == teacherInfo) {
			model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
			model.addObject("status", 203);
			model.setViewName("error");
			return model;
		}
		try {
			// 登录人信息
			model.addObject("teacherInfo", teacherInfo);
			// 教师教务笔记
			model.addObject("teacherNoteList", teacherNotesService.selectNotesByUserId(teacherInfo));
			// 操作记录
			model.addObject("logs", teacherLogInformationService.selectTeacherLogInformation(teacherInfo.getId()));
			// 实验课程信息
			model.addObject("departmentList",experimentCoutseService.selectMainPageDepartmentExperimentCourses(teacherInfo));
			// 开放实验室预约子系统实验成绩（根据权限）
			//model.addObject("scheduleStudentScoreList",scheduleStudentScoreService.selectScoreBySubmitStatus(teacherInfo));
			//获取我的
			model.addObject("scheduleStudentScoreList",scheduleStudentScoreService.selectMyScoreBySubmitStatus(teacherInfo));

			// 统计实验/实验室/课程/各自总数
			model.addObject("experimentCount", experimentService.selectExperimentCount());
			model.addObject("labCount", experimentLabService.selectExperimentLabCount());
			model.addObject("courseCount", experimentCoutseService.selectexperimentCoutseCount());
		} catch (RuntimeException e) {
			e.printStackTrace();
			model.addObject("msg", e.getMessage());
			model.addObject("status", 202);
			model.setViewName("error");
		}
		model.addObject("identify", 2);
		model.setViewName("admin/welcome");
		return model;
	}

	/**
	 * 页面跳转
	 * 
	 * @param pageName
	 * @return
	 */
	@RequestMapping("/{pageName}")
	public String toPage(@PathVariable("pageName") String pageName, HttpServletRequest request,
			HttpServletResponse response) {
		return pageName;
	}

	@RequestMapping("{fileName}/{pageName}")
	public String toChidPage(@PathVariable("pageName") String pageName, @PathVariable("fileName") String fileName,
			HttpServletRequest request, HttpServletResponse response) {
		response.addHeader("Access-Control-Allow-Origin", "*");
		Subject subject = SecurityUtils.getSubject();
		subject.hasRole("所有院系");
		return fileName + "/" + pageName;
	}

	@RequestMapping("{fileName}/{pageName}/{childName}")
	public String toGrandsonPage(@PathVariable("pageName") String pageName, @PathVariable("fileName") String fileName,
			@PathVariable("childName") String childName) {
		return fileName + "/" + pageName + "/" + childName;
	}

	@RequestMapping("style/{pageName}/{skinfile}")
	public ModelAndView toChidPage(@PathVariable("skinfile") String skinfile, @PathVariable("pageName") String pageName,
			ModelAndView model) {
		model.addObject("skinfile", skinfile);
		model.setViewName(pageName);
		return model;
	}

	@RequestMapping("/toLogin")
	public String toLogin() {
		return "toLogin";
	}

}
