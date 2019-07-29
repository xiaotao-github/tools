package com.vcooc.base.pojo;


import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 用户登录表
 * @author admin
 *
 */
@Table(name="user")
public class User extends BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id; //用户id
	private String username; //用户名
	private String password; //密码  MD5加密
	private Integer type;	//用户类型 1(老师)，2(学生)
	private Integer status;	//状态  1(启用,离线),2(禁用),3（在线）
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	private Integer userloginnumber;//用户登陆次数-用作密码错误冻结
	
	public Integer getUserloginnumber() {
		return userloginnumber;
	}
	public void setUserloginnumber(Integer userloginnumber) {
		this.userloginnumber = userloginnumber;
	}
	
	@Transient
	private String loginIp;//登录ip。临时字段
	
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getLoginIp() {
		return loginIp;
	}
	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}
}
