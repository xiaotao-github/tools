package com.vcooc.sso.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;
import com.vcooc.common.service.shiro.RedisService;
import com.vcooc.common.util.CookieUtils;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.service.ImageCodeService;
import com.vcooc.sso.service.StudentInfoService;
import com.vcooc.sso.service.TeacherInfoService;
import com.vcooc.sso.service.UserService;
import com.vcooc.sso.utils.CookieSSOUtils;
import com.vcooc.sso.utils.EncryptUtil;

/**
 * 注意：18.9.20 进行修改 
 * 此控制层进行跳转页面为智慧实验室的系列 
 * @author ITcast
 * 项目部署请注意把http链接隐藏
 *nginx进行反向代理通过路径指定到相对应的页面
 */
@Controller
@RequestMapping("fbwisdomlabController")
public class FBWisdomLabController {
	@Autowired
	private UserService userService;
	@Autowired
	private TeacherInfoService teacherInfoService;
	@Autowired
	private StudentInfoService studentInfoService;
	
	@Autowired
	private ImageCodeService imageCodeService;

	/**
	 * 用户登录
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping("fbwisdomlablogin")
	public ModelAndView login(String username, String password, String originalPath,String validateCode, HttpServletRequest request
			,HttpServletResponse response,ModelAndView model) {
		try {
			// 判断验证码
			SysResult validateResult = this.validateCode(validateCode,request);
			
			if (validateResult != null) {
				model.addObject("status", 201);
				model.addObject("msg", "验证码错误");
				model.setViewName("lab");	
				return model;
			}
			// 判断是否为空
			if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
				model.addObject("status", 202);
				model.addObject("msg", "用户名或密码不能为空");
				model.setViewName("lab");
				return model;
				}
			//从seesion中获取固定密钥
			//String UsetPassageKey = (String) SecurityUtils.getSubject().getSession().getAttribute("UsetPassageKey");
			//String UsetPassageIV = (String) SecurityUtils.getSubject().getSession().getAttribute("UsetPassageIV");
			
			String UsetPassageKey = EncryptUtil.KEY;
			String UsetPassageIV = EncryptUtil.IV;
			//获取到用户密码进行解密
			String userPassword =EncryptUtil.desEncrypt(password, UsetPassageKey, UsetPassageIV);//注意去掉空格
//			System.out.println(userPassword+"是否与"+password+"相等");
			SysResult data = userService.login(username.trim(), userPassword.trim(),request,response);
				//不存在此用户判断
				if (data.getStatus()==202 ) {
					model.addObject("status", 202);
					model.addObject("msg", data.getMsg());
					model.setViewName("lab");
					return model;
				}else if(data.getStatus()==400){
					model.addObject("status", 202);
					model.addObject("msg", data.getMsg());
					model.setViewName("lab");
					return model;
				}else if(data.getStatus()==205){
					model.addObject("status", 205);
					model.addObject("msg", data.getMsg());
					model.setViewName("lab");
					return model;
				}else{
					User us = (User) data.getData();
					//封装原来的路径
					if(StringUtils.isNotEmpty(originalPath)){
						data.setMsg(originalPath);
					}
					//进行重定向，防止表单重复提交
					if(us.getType()==1){
						return new ModelAndView("redirect:/adminPage/teacherpage");
					}else if(us.getType()==2) {
					
						return new ModelAndView("redirect:/studentPage/studentpage");
					}else{
					
						return new ModelAndView("");
					}
				}
			}catch (Exception e) {
				e.printStackTrace();
				model.addObject("status", 500);
				model.addObject("msg", e.getMessage());
				model.setViewName("lab");
			return model;
		}
		
	}
	
	/**
	 * 用户退出
	 * @param vcoocUserId
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("fbwisdomlablogOut")
	@ResponseBody
	public SysResult logOut(@CookieValue(required = false) String vcoocUserId, HttpServletRequest request,
			HttpServletResponse response) {
	//	CookieUtils.deleteCookie(request, response, "vcoocUserId");
		//CookieUtils.deleteCookie(request, response, "yanzhengma");
		//cookie 哪里请求哪里删除 ，注意path 路径  否则会有 session 获取不到问题
		CookieSSOUtils.removeCookie("vcoocUserId",request, response);
		CookieSSOUtils.removeCookie("yanzhengma",request, response);
		return SysResult.ok("注销成功");
	}

	/**
	 * 根据cookie，查询用户信息
	 * 
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("queryUser/{vcoocUserId}")
	@ResponseBody
	public SysResult queryUser(@PathVariable("vcoocUserId") String vcoocUserId) {
		Object obj = userService.queryUser(vcoocUserId);
		if (obj == null) {
			return SysResult.build(202, "获取用户信息失败,请登录");
		}
		return SysResult.ok(obj);
	}

	/**
	 * 教师用户注册
	 * 
	 * @param teacherInfo
	 * @return
	 */
	@RequestMapping("teacherRegister")
	@ResponseBody
	public SysResult teacherRegister(TeacherInfo teacherInfo, String validateCode, HttpServletRequest request) {
		// 判断验证码
		SysResult validateResult = this.validateCode(validateCode,request);
		if (validateResult != null) {
			return validateResult;
		}

		// 判断接收的信息是否为空
		if (teacherInfo == null || teacherInfo.getUser() == null) {
			return SysResult.build(202, "注册失败，请正确输入注册信息!");
		}
		// 判断用户名和密码是否为空
		if (!StringUtils.isNotEmpty(teacherInfo.getUser().getUsername())
				|| !StringUtils.isNotEmpty(teacherInfo.getUser().getPassword())) {
			return SysResult.build(202, "用户名或密码不能为空!");
		}
		// 校验用户名唯一性
		Boolean result = userService.validateUserNameById(teacherInfo.getUser().getUsername(), null);
		if (result) {
			return SysResult.build(202, "用户名称已存在！");
		}
		teacherInfoService.addTeacher(teacherInfo);
		return SysResult.ok("注册成功，等待管理员启用");
	}

	/**
	 * 学生注册
	 */
	@RequestMapping("studentRegister")
	@ResponseBody
	public SysResult studentRegister(StudentInfo studentInfo, String validateCode, HttpServletRequest request) {

		// 判断验证码
		SysResult validateResult = this.validateCode(validateCode, request);
		if (validateResult != null) {
			return validateResult;
		}
		// 判断接收的消息是否为空
		if (studentInfo == null || studentInfo.getUser() == null) {
			return SysResult.build(202, "注册失败，请正确输入注册信息!");
		}
		// 判断用户名和密码是否为空
		if (!StringUtils.isNotEmpty(studentInfo.getUser().getUsername())
				|| !StringUtils.isNotEmpty(studentInfo.getUser().getPassword())) {
			return SysResult.build(202, "用户名或密码不能为空!");
		}
		// 校验用户名唯一性
		Boolean result = userService.validateUserNameById(studentInfo.getUser().getUsername(), null);
		if (result) {
			return SysResult.build(202, "用户名称已存在！");
		}
		studentInfoService.addStudent(studentInfo);
		return SysResult.ok("注册成功，等待管理员启用");
	}
	
	

	/**
	 * 自定义，校验验证码是否正确 null：校验通过。 SysResult：校验不通过
	 */
	private SysResult validateCode(String validateCode, HttpServletRequest request) {
		// 判断验证码
		//Object sessionCode = SecurityUtils.getSubject().getSession().getAttribute("yanzhengma");
		Cookie ck =  CookieSSOUtils.getCookieByName("yanzhengma", request);
		String sessionCode;
		if(ck==null){
			sessionCode = String.valueOf(SecurityUtils.getSubject().getSession().getAttribute("yanzhengma"));
		}else{
			 sessionCode =  String.valueOf(ck.getValue());
		}
		
		if (sessionCode != null || sessionCode instanceof String) {
			String code = (String) sessionCode;
			if (!StringUtils.isNotEmpty(validateCode)) {
				return SysResult.build(202, "验证码不能为空");
			}
			if (StringUtils.isNotEmpty(code)) {
				if (!code.equalsIgnoreCase(validateCode)) {
					return SysResult.build(202, "验证码错误，请重新输入");
				}
			} else {
				return SysResult.build(202, "验证码参数错误，请重新进入页面进行操作，若依旧不成功，请联系工程师解决");
			}
			return null;
		} else {
			return SysResult.build(400, "验证码参数错误，请重新进入页面进行操作，若依旧不成功，请联系工程师解决");
		}
	}
	
	
	
	
	
	@RequestMapping("toNoticePage")
	public String toNoticePage(){
		return "notice";
	}
	
	/**
	 * 上成密钥响应给页面
	 * @return
	 */
	@RequestMapping("getUserKey")
	@ResponseBody
	public SysResult getUserKey(){
		String key = EncryptUtil.KEY;
		String IV = EncryptUtil.IV;

        Map<Object, Object> map = new HashMap<>();
        map.put("key", key);
        map.put("IV", IV);
		return SysResult.build(200,"成功",map);
	}
	
	
	

	
	/**
	 * 生成验证码
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getImage")  
	 @ResponseBody
    public void getImage(HttpServletRequest request,HttpServletResponse response) throws IOException {

		// 禁止图像缓存。  
        response.setHeader("Pragma", "no-cache");  
        response.setHeader("Cache-Control", "no-cache");  
        response.setDateHeader("Expires", 0);  
  
        response.setContentType("image/jpeg");  
        // 将图像输出到Servlet输出流中。  
        ServletOutputStream sos = response.getOutputStream();  
        ImageIO.write(imageCodeService.getImage(request,response), "jpeg", sos);  
        sos.close();
    } 
	
	 
	//校验验证码是否正确
	 @RequestMapping("validateCode")
	 @ResponseBody
	public HuiValidateResult validateCodeTwo(String param, HttpServletRequest request){
		 if(!StringUtils.isNotEmpty(param)){
			 return HuiValidateResult.no("验证码不能为空");
		 }
		 Cookie ck =  CookieSSOUtils.getCookieByName("yanzhengma", request);
		 String obj =  String.valueOf(ck.getValue());
		// Object obj = SecurityUtils.getSubject().getSession().getAttribute("yanzhengma");
		  if(obj!=null&&param.equalsIgnoreCase((String)obj)){
			  return HuiValidateResult.ok("校验通过"); 
		  }
		  return HuiValidateResult.no("验证码错误");
	}
	
	 /**
	  * 清空浏览器cookie 缓存  因为在谷歌6.2版本没有问题，新版本有问题。往后再有问题可以尝试此方法或者关闭。
	 * @return
	 */
	@RequestMapping("delectUserCache")
	@ResponseBody
	public SysResult delectUserCache(HttpServletRequest request,
			HttpServletResponse response) {
		userService.delectUserCache(request,response);
		return SysResult.ok();

	}

}
