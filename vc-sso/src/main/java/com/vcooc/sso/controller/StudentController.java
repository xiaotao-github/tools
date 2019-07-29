package com.vcooc.sso.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.service.StudentInfoService;

@Controller
@RequestMapping("studentController")
public class StudentController {
	@Autowired
	private StudentInfoService studentInfoService;
	@Autowired
	private RedisSessionService redisSessionService;
	
	/**
	 * 根据学生用户vcoocUserId
	 * 查询个人信息
	 * 跳转到个人信息展现页面
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@RequestMapping("toStudentInfoView")
	public ModelAndView toUserInfoView(@CookieValue(value="vcoocUserId",required=false) String vcoocUserId,ModelAndView model){
		if(vcoocUserId==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		Object stuObj = redisSessionService.querySessionStudentInfo(vcoocUserId);
		if(stuObj==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		model.addObject("studentInfo", stuObj);
		model.setViewName("/studentPage/studentInfoView");
		return model;
	}
	/**
	 * 根据学生ID，修改学生信息
	 */
	@RequestMapping("updateStudentInfoById")
	@ResponseBody
	public SysResult updateStudentInfoById(StudentInfo studentInfo){
		try {
			studentInfoService.updateStudentInfoById(studentInfo);
		} catch (RuntimeException e) {
			return SysResult.build(202,e.getMessage());
		}
		return SysResult.ok();
	}
	
	
	/**
	 * 查询学生信息，跳转到学生信息修改页面
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@SuppressWarnings("unused")
	@RequestMapping("toStudentInfoEdit")
	public ModelAndView toUserInfoEdit(@CookieValue(value="vcoocUserId",required=false) String vcoocUserId,ModelAndView model){
		if(vcoocUserId==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		//Object stuObj = redisSessionService.querySessionStudentInfo(vcoocUserId);
		StudentInfo stuObj = (StudentInfo) redisSessionService.querySessionStudentInfo(vcoocUserId);
		StudentInfo  st = studentInfoService.selectctInfo(stuObj.getId());
		if(stuObj==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		model.addObject("studentInfo",stuObj);
		model.addObject("st",st);
		model.setViewName("/studentPage/studentInfoEdit");
		return model;
	}
	
	
	/**
	 * 查询学生信息，跳转到学生信息展示页面
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@SuppressWarnings("unused")
	@RequestMapping("studentInfoView")
	public ModelAndView toStudentInfoView(@CookieValue(value="vcoocUserId",required=false) String vcoocUserId,ModelAndView model){
		if(vcoocUserId==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		//Object stuObj = redisSessionService.querySessionStudentInfo(vcoocUserId);
		StudentInfo stuObj = (StudentInfo) redisSessionService.querySessionStudentInfo(vcoocUserId);
		StudentInfo  st = studentInfoService.selectctInfo(stuObj.getId());
		if(stuObj==null){
			model.addObject("msg", "无法获取您的数据信息");
			model.setViewName("/error");
			return model;
		}
		model.addObject("studentInfo",stuObj);
		model.addObject("st",st);
		model.setViewName("/studentPage/studentInfoView");
		return model;
	}
	
	
	
	/**
	 * 修改学生个人信息，涉及到图片上传
	 * jpg|png|gif 
	 * @param teacherInfo
	 * @return
	 */
	@RequestMapping("updateStudentInfoAndFileById")
	public ModelAndView updateStudentInfoAndFileById(MultipartFile photoFile,StudentInfo studentInfo,@CookieValue(required=false) String vcoocUserId,HttpServletRequest request,ModelAndView model) {
		try {
	        studentInfoService.updateStudentInfoAndFileById(photoFile,studentInfo,vcoocUserId);
	        model.addObject("status", 200);
	        model.addObject("msg", "修改成功");
	        model.setViewName("/studentPage/studentInfoEdit");
			return  model;
	     } catch (Exception e) {
			e.printStackTrace();
			model.addObject("status",203);
			model.addObject("msg", e.getMessage());
			model.setViewName("/studentPage/studentInfoEdit");
			return model;
	     }
	}
	
	/**
	 * 修改密码
	 * @param vcoocUserId
	 * @param pwd
	 * @param confirmPwd
	 * @return
	 */
	@RequestMapping("updatetStudentPwd")
	public ModelAndView updatetStudentPwd(@CookieValue(required = false) String vcoocUserId,String pwd,String confirmPwd,ModelAndView model) {	 
		if(!StringUtils.isNotEmpty(pwd) || !StringUtils.isNotEmpty(confirmPwd)){
				model.addObject("status", 202);
				model.addObject("msg", "输入信息有误，请重新输入");
				model.setViewName("/studentPage/studentPasswordEdit");
	    	   return model;
	       }
		if(!StringUtils.isNotEmpty(vcoocUserId)){
			model.addObject("status", 203);
			model.addObject("msg", "无法获取用户信息，请重新登录");
			model.setViewName("/studentPage/studentPasswordEdit");
    	   return model;
	       }
	       try {
			 SysResult result = studentInfoService.updateStudentInfoPwd(vcoocUserId, pwd, confirmPwd);
			model.addObject("status", result.getStatus());
			model.addObject("msg", result.getMsg());
			model.setViewName("/studentPage/studentPasswordEdit");
    	   return model;
	       } catch (Exception e) {
			e.printStackTrace();
			model.addObject("status", 202);
			model.addObject("msg", e.getMessage());
			model.setViewName("/studentPage/studentPasswordEdit");
			return model;
		}
	}

}
