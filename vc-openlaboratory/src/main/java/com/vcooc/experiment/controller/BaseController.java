package com.vcooc.experiment.controller;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationStudent;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;

public abstract class BaseController {
	
	public final String  TIMEERRORMSG = "由于您长时间 未操作,请重新登录后再进行操作";
	@Autowired
	private RedisSessionService redisSessionService;
	
	
	@InitBinder
	//此方法用于日期的转换，如果未加，当页面日期格式转换错误，将报400错误，实际是因为此方法
	public void initBinder(WebDataBinder binder) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dateFormat.setLenient(true);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
	
	/**
	 * 获取一个ModelAndView对象
	 * @return
	 */
	public ModelAndView getModelAndView(){
		return new ModelAndView();
	}
	
	/**
	 * 长时间未操作报错
	 * @return
	 */
	public ModelAndView TimeErrorModelAndView(){
		ModelAndView mv = this.getModelAndView();
		mv.addObject("msg", TIMEERRORMSG);
		mv.addObject("status", 203);
		mv.setViewName("error");
		return mv;
	}
	
	/**
	 * 后台异常报错
	 * @param e
	 * @return
	 */
	public ModelAndView ExceptionErrorModelAndView(String e){
		ModelAndView mv = this.getModelAndView();
		if(e == null || e == "") mv.addObject("msg", "系统出错啦~赶紧联系工程师解决");
		else mv.addObject("msg", e);
		mv.addObject("status", 202);
		mv.setViewName("error");
		return mv;
	}
	
	
	/**
	 * 根据vcoocUserId获取redis中的TeacherInfo信息
	 * @param vcoocUserId
	 * @return TeacherInfo
	 */
	public TeacherInfo getTeacherInfo(String vcoocUserId) {
		if (!StringUtils.isNotEmpty(vcoocUserId))  return null;
		// 从redis中获取用户信息
		Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
		return obj != null && obj instanceof TeacherInfo ? (TeacherInfo) obj:null;
	}
	
	
	/**
	 * 根据vcoocUserId获取redis中的StudentInfo信息
	 * @param vcoocUserId redis中存放的session
	 * @return
	 */
	public StudentInfo getStudentInfo(String vcoocUserId) {
		if (!StringUtils.isNotEmpty(vcoocUserId))  return null;
		// 从redis中获取用户信息
		Object obj = redisSessionService.querySessionStudentInfo(vcoocUserId);;
		return obj != null && obj instanceof StudentInfo ? (StudentInfo) obj:null;
	}
	
	
	/**
	 * 验证教师用户登录
	 * @param userId
	 * @param v
	 * @return
	 * 		SysResult.build(202, TIMEERRORMSG);
	 * 		SysResult.ok()
	 */
	public SysResult VerificationUser(String vcoocUserId,VerificationUser v){
		TeacherInfo ti = getTeacherInfo(vcoocUserId);
		if(ti == null){
			return SysResult.build(202, TIMEERRORMSG);
		}else{
			try{
				return v.success(ti,SysResult.ok());
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(202, e.toString());
			}
		}
	}
	
	/**
	 * 验证教师用户登录
	 * @param userId
	 * @param v
	 * @return
	 * 		SysResult.build(202, TIMEERRORMSG);
	 * 		SysResult.ok()
	 */
	public SysResult VerificationUser(VerificationUser v){
		TeacherInfo ti = redisSessionService.querySessionUserInfo(new TeacherInfo());
		if(ti == null){
			return SysResult.build(202, TIMEERRORMSG);
		}else{
			try{
				return v.success(ti,SysResult.ok());
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(202, e.toString());
			}
		}
	}
	
	
	
	
	
	/**
	 * 验证教师用户登录
	 * @param userId
	 * @param v
	 * @return
	 * 		ModelAndView
	 */
	public ModelAndView VerificationUserModel(VerificationUserModel v){
		TeacherInfo ti = redisSessionService.querySessionUserInfo(new TeacherInfo());
		if(ti == null){
			return TimeErrorModelAndView();
		}else{
			try{
				return v.success(ti,getModelAndView());
			}catch(Exception e){
				e.printStackTrace();
				return ExceptionErrorModelAndView(e.toString());
			}
		}
	}
	/**
	 * 验证学生用户登录
	 * @param v
	 * @return
	 */
	public SysResult VerificationStudent(VerificationStudent v){
		StudentInfo si = redisSessionService.querySessionUserInfo(new StudentInfo());
		if(si == null){
			return SysResult.build(202, TIMEERRORMSG);
		}else{
			try{
				return v.success(si,SysResult.ok());
			}catch(Exception e){
				e.printStackTrace();
				return SysResult.build(202, e.toString());
			}
		}
	}
	
	/**
	 * 获取32位UUID
	 * @return
	 */
	public String get32UUID(){
		return UUID.randomUUID().toString().replace("-", "");
	}
}
