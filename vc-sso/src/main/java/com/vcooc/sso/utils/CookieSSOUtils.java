package com.vcooc.sso.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;


public class CookieSSOUtils{

	//打印日志
	private static final Logger logger = LoggerFactory.getLogger(CookieSSOUtils.class);
	//添加Cookie   添加至浏览器(客户端)   response:用于将cookie响应至客户端   request：获取浏览器中所有的cookie信息
	public static void addCookie(String id,String cookieName,int time,HttpServletRequest request,HttpServletResponse response){
		
		//根据cookie的名字获取cookie信息
		Cookie cookielist = getCookieByName(cookieName,request);
		if(cookielist!=null){
			removeCookie("yanzhengma",request,response);
		}
		Cookie cookie = new Cookie(cookieName, id);//第一个参数：cookie名字    第二个参数：cookie中的value值
		//设置cookie的存活时间
		cookie.setMaxAge(time);
		//设置cookie的value值 
		cookie.setValue(id);
		//设置cookie的作用范围域（当前为实验室开放与预约登录）
		//cookie.setPath("/fbwisdomlabController/");
		
		//添加cookies作用域对所有系统的支持 2019.3.14
		//设置cookie的作用范围域（当前为所有系统登录）
		cookie.setPath("/");
		
		//将cookie响应至客户端    备注：浏览器禁用cookie  或者时隐身模式  cookie都是写入失败
		response.addCookie(cookie);
	}

	//根据cookie名字获取cookie信息
	public static Cookie getCookieByName(String cookieName,HttpServletRequest request) {
		// TODO Auto-generated method stub
		//从request获取所有的cookie
		String cookiee=request.getHeader("cookie");
		Cookie[] cookies = request.getCookies();
		for(int i=0;i<cookies.length;i++){
			System.out.println(cookies[i].getName()+","+cookies[i].getValue());
		}
		if(cookies!=null){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals(cookieName)){
					return cookie;
				}
			}
		}
		
		return null;
	}

	//删除指定Cookie信息
	public static void removeCookie(String loginCookieName,HttpServletRequest request,HttpServletResponse response) {
		// TODO Auto-generated method stub
		//根据cookie的名字获取cookie信息
		Cookie cookie = getCookieByName(loginCookieName,request);
		if(cookie!=null){
			
			//将cookie的存活时间设置为  0  
			cookie.setMaxAge(0);
			
			//设置cookie的作用范围域
			cookie.setPath("/fbwisdomlabController/");
			
			//重新写入cookie至客户端
			response.addCookie(cookie);
		}
		
		
	}
	
		//清空cookie信息
		public static void  delectUserCache(HttpServletRequest request, HttpServletResponse response, String CookieName) {
			// TODO Auto-generated method stub
			//从request获取所有的cookie
			Cookie[] cookies = request.getCookies();
			if(cookies!=null){
				for(Cookie cookie : cookies){
					
					if(cookie.getValue().equals(CookieName)){
						continue;
					}
					logger.info("cookieName......."+cookie.getName());
					//将cookie的存活时间设置为  0  
					cookie.setMaxAge(0);
					//设置cookie的作用范围域
					cookie.setPath("/");
					//重新写入cookie至客户端
					response.addCookie(cookie);
				}
			
			}
		}
		
		//添加用户Cookie   添加至浏览器(客户端)   response:用于将cookie响应至客户端   request：获取浏览器中所有的cookie信息
		public static void addUserCookie(String id,String cookieName,int time,HttpServletRequest request,HttpServletResponse response){
			try {
			//根据cookie的名字获取cookie信息
			Cookie cookielist = getCookieByName(cookieName,request);
			if(cookielist!=null){
				removeCookie("uId",request,response);
				removeCookie("uName",request,response);
			}
			  //  # 中文不能存储在cookie中，需要编码处理
			Cookie cookie = new Cookie(cookieName, URLEncoder.encode(id, "UTF-8"));//第一个参数：cookie名字    第二个参数：cookie中的value值
			//设置cookie的存活时间
			cookie.setMaxAge(time);
			//设置cookie的value值 
			//设置cookie的作用范围域
			cookie.setPath("/");
			
			//将cookie响应至客户端    备注：浏览器禁用cookie  或者时隐身模式  cookie都是写入失败
			response.addCookie(cookie);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	


}