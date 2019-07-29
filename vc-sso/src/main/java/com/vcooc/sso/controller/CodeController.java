package com.vcooc.sso.controller;

import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.sso.service.ImageCodeService;
import com.vcooc.sso.utils.CookieSSOUtils;

@RequestMapping("validateCodeController")
@Controller
public class CodeController {
	@Autowired
	private ImageCodeService imageCodeService;
	
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
	public HuiValidateResult validateCode(String param, HttpServletRequest request){
		 if(!StringUtils.isNotEmpty(param)){
			 return HuiValidateResult.no("验证码不能为空");
		 }
		 Cookie ck =  CookieSSOUtils.getCookieByName("yanzhengma", request);
		 String obj;
		 //添加对Cookie对象ck空值的判断并处理 2019.02.22 张风堂
		 if(ck==null) {
			 obj = String.valueOf(SecurityUtils.getSubject().getSession().getAttribute("yanzhengma"));
		 }else obj =  String.valueOf(ck.getValue());
		//  Object obj = SecurityUtils.getSubject().getSession().getAttribute("yanzhengma");
		 
		  if(obj!=null&&param.equalsIgnoreCase((String)obj)){
			  return HuiValidateResult.ok("校验通过"); 
		  }
		  return HuiValidateResult.no("验证码错误");
	}
}
