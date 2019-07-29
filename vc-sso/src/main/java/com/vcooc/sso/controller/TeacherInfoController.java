package com.vcooc.sso.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.service.TeacherInfoService;

/**
 * 教师管理
 * 
 * @author admin
 *
 */
@Controller
@RequestMapping("teacherController")
public class TeacherInfoController {
	@Autowired
	private TeacherInfoService teacherInfoService;
	@Autowired
	private RedisSessionService redisSessionService;
	
	/**
	 * 通过vcoocUserId查询redis中教师信息
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("selectTeacher")
	@ResponseBody
	public SysResult selectTeacher(@CookieValue(required = false) String vcoocUserId) {
		if(!StringUtils.isNotEmpty(vcoocUserId) ){
			SysResult.build(202, "用户长时间未进行操作，请重新登录！");
        }
	     try {
	    	 TeacherInfo teacher =  teacherInfoService.selectTeacherInfoByVoocUserId(vcoocUserId);
			return SysResult.ok(teacher);
	     } catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}
	
	//个人信息修改页面跳转
	@SuppressWarnings("unused")
	@RequestMapping("tomyselfInfoRevise")
	public ModelAndView toMyselfInfoRevise(@CookieValue(required = false) String vcoocUserId,ModelAndView model) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			//此处教师的个人介绍存放在redis  取出来却没有  不知道原因 改为根据rendis 获取的教师id 进行显示
			TeacherInfo th = teacherInfoService.selectInfo(teacherInfo.getId());
			
			if (teacherInfo == null) {
				model.addObject("msg", "由于您长时间 未操作,请重新登录后再进行操作");
				model.addObject("status", 203);
				model.setViewName("error");
				return model;
			}
			model.addObject("teacherInfo", th);
			model.setViewName("adminPage/myselfInfoRevise");
			
			return model;
		
		} catch (Exception e) {
			e.printStackTrace();
			model.setViewName("error");
			return model;
		}
		
	}
	
	/**
	 * 修改教师个人信息
	 * jpg|png|gif 
	 * @param teacherInfo
	 * @return
	 */
	@RequestMapping("updatetTeacher")
	@ResponseBody
	public SysResult updatetTeacher(MultipartFile photoFile,TeacherInfo teacherInfo,HttpServletRequest request) {
		try {
	         teacherInfoService.updateTecherInfoById(photoFile,teacherInfo);
			return SysResult.ok("修改成功");
	     } catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 修改密码
	 * @param vcoocUserId
	 * @param pwd
	 * @param confirmPwd
	 * @return
	 */
	@RequestMapping("updatetTeacherPwd")
	@ResponseBody
	public SysResult updatetTeacherPwd(@CookieValue(required = false) String vcoocUserId,String pwd,String confirmPwd) {	 
		if(!StringUtils.isNotEmpty(pwd) || !StringUtils.isNotEmpty(confirmPwd)){
	    	   return SysResult.build(202, "输入信息有误，请重新输入");
	       }
		if(!StringUtils.isNotEmpty(vcoocUserId)){
	    	   return SysResult.build(203, "无法获取用户信息，请重新登录");
	       }
	       try {
			return teacherInfoService.updateTeacherInfoPwd(vcoocUserId, pwd, confirmPwd);
		} catch (Exception e) {
			e.printStackTrace();
			return  SysResult.build(202, e.getMessage());
		}
	}
	
}