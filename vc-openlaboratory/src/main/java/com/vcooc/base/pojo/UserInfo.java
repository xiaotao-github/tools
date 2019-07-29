package com.vcooc.base.pojo;

import java.io.Serializable;

/**
 * 登陸用戶信息表，存在redis ，记录在线用户的基本信息，为实时监控封装数据
 * @author admin
 *
 */
public class UserInfo  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name;//用户姓名
	private String username;//用户名
	private Integer type;//用户类型
	private String loginIp;//登录ip
	
	public UserInfo() {
		super();
	}
	public UserInfo(String name, String username, Integer type, String loginIp) {
		super();
		this.name = name;
		this.username = username;
		this.type = type;
		this.loginIp = loginIp;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getLoginIp() {
		return loginIp;
	}
	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}
}
