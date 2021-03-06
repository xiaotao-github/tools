package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 教师信息表
 * @author admin
 *
 */
/**
 * @author Administrator
 *
 */
@Table(name="teacher_info")
public class TeacherInfo extends BaseBean  implements Serializable{
	
	private static final long serialVersionUID = -5379141492128057824L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String name;//教师姓名
	private Integer age;//教师年龄
	private Integer sex;//教师性别  1(男),2(女)
	private String phone;//教师电话
	private String imagePath;//头像路径
	private String email;//教师邮箱
	private Long loginNumber;//登录次数
	private String nickname;//昵称
	private Integer source;//账号来源  1（批量导入），2（注册），3（管理员添加）
	private String teacherPresentation; //个人介绍
	private Integer lookNum;//浏览次数
	private String unit;//部门
	private String teacherTitle;//职称
	private Date preTime;  //上次登录时间
	private String openId;
	private String icNo;
	private String exp1;//备用字段 -- 个性签名
	private String exp2;//备用字段
	
	@Transient
	private User user; //用户账号(userId) 一对一关联
	@Transient
	private Department department; //所属院系
	@Transient
	private Role role;//用户角色，一个教师对应一个角色信息
	
	//角色所有权限map
	@Transient
	private Map<String,String> powers;

	
	public Map<String, String> getPowers() {
		return powers;
	}
	public void setPowers(Map<String, String> powers) {
		this.powers = powers;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getLoginNumber() {
		return loginNumber;
	}
	public void setLoginNumber(Long loginNumber) {
		this.loginNumber = loginNumber;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Integer getSource() {
		return source;
	}
	public void setSource(Integer source) {
		this.source = source;
	}
	public Date getPreTime() {
		return preTime;
	}
	public void setPreTime(Date preTime) {
		this.preTime = preTime;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getTeacherPresentation() {
		return teacherPresentation;
	}
	public void setTeacherPresentation(String teacherPresentation) {
		this.teacherPresentation = teacherPresentation;
	}
	public Integer getLookNum() {
		return lookNum;
	}
	public void setLookNum(Integer lookNum) {
		this.lookNum = lookNum;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getTeacherTitle() {
		return teacherTitle;
	}
	public void setTeacherTitle(String teacherTitle) {
		this.teacherTitle = teacherTitle;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getIcNo() {
		return icNo;
	}
	public void setIcNo(String icNo) {
		this.icNo = icNo;
	}
	public String getExp1() {
		return exp1;
	}
	public void setExp1(String exp1) {
		this.exp1 = exp1;
	}
	public String getExp2() {
		return exp2;
	}
	public void setExp2(String exp2) {
		this.exp2 = exp2;
	}
	
}
