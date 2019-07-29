
package com.vcooc.common.filter;


import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import com.vcooc.common.service.IpService;
import com.vcooc.common.util.CookieUtils;
/**
 * 自定义拦截器，封装ip地址 到cookie
 * @author Administrator
 *
 */
public class addIpInterceptor implements HandlerInterceptor{
	
	@Autowired
	private IpService IpService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//将ip地址封装到cookie中
			Map<String, String> allServerIP = IpService.getAllServerIP();
			Session session = SecurityUtils.getSubject().getSession();
			for(Map.Entry<String,String> entry : allServerIP.entrySet()){
				if(StringUtils.isNotEmpty(entry.getValue())){
					CookieUtils.setCookie(request, response, entry.getKey(),entry.getValue());
					session.setAttribute(entry.getKey(),entry.getValue());
				}
			}
			Map<String, String> params = IpService.getParam();
			for(Map.Entry<String,String> entry : params.entrySet()){
				if(StringUtils.isNotEmpty(entry.getValue())){
					CookieUtils.setCookie(request, response, entry.getKey(),entry.getValue());
					session.setAttribute(entry.getKey(),entry.getValue());
				}
			}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		//调用shiro权限，进行封装
	/*	Subject subject = SecurityUtils.getSubject();
		Boolean blf = subject.hasRole("所有院系");*/
	}

}
