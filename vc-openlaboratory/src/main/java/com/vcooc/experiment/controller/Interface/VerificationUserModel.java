package com.vcooc.experiment.controller.Interface;

import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.TeacherInfo;

public interface VerificationUserModel {
	/**
	 * 身份校验成功做的事
	 */
	public ModelAndView success(TeacherInfo teacherInfo,ModelAndView mv);
}
