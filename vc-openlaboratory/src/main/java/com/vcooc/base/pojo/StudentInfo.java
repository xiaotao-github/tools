package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 学生信息表
 * @author admin
 *
 */
@Table(name="student_info")
public class StudentInfo extends BaseBean  implements Serializable{
	
	private static final long serialVersionUID = -1268828803278825733L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private Integer tbClassId;//班级(tb_class_id) 
	private Integer tbGroupId;//小组
	private String name;//学生姓名
	private Integer age;//学生年龄
	private Integer sex;//学生性别1(男),2(女)
	private String phone;//学生电话
	private String imagePath;//头像路径
	private String email;//学生邮箱
	private Long loginNumber;//登录次数
	private String nickname;//昵称
	private Integer source;//账号来源  1（批量导入），2（注册），3（管理员添加）
	private Date preTime;  //上次登录时间
	private String openId;
	private String icNo;
	private String exp1;//备用字段 -- 个性签名
	private String exp2;//备用字段
	
	//自定
	@Transient
	private User user;//用户账号(user_id) 一对一关联
	@Transient
	private String departmentName;//所属院系名称
	@Transient
	private String username; //学生学号
	@Transient
	private String className;//所属班级名称
	@Transient
	private String majorName;//所属专业名称
	@Transient
	private String gradeName;//所属年级名称
	@Transient
	private TbClass tbClass;//班级(tb_class_id)
	@Transient
	private ClockingIn clockingIn; //课程表考勤记录
	@Transient
	private SubmitExperimentFile submitExperimentFile;
	@Transient
	private ScheduleStudentScore scheduleStudentScore;    //课程表成绩
	@Transient
	private Integer blacklistId;  //黑名单id
	
	public ScheduleStudentScore getScheduleStudentScore() {
		return scheduleStudentScore;
	}
	public void setScheduleStudentScore(ScheduleStudentScore scheduleStudentScore) {
		this.scheduleStudentScore = scheduleStudentScore;
	}
	public SubmitExperimentFile getSubmitExperimentFile() {
		return submitExperimentFile;
	}
	public void setSubmitExperimentFile(SubmitExperimentFile submitExperimentFile) {
		this.submitExperimentFile = submitExperimentFile;
	}
	public ClockingIn getClockingIn() {
		return clockingIn;
	}
	public void setClockingIn(ClockingIn clockingIn) {
		this.clockingIn = clockingIn;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public TbClass getTbClass() {
		return tbClass;
	}
	public void setTbClass(TbClass tbClass) {
		this.tbClass = tbClass;
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
	public Integer getTbClassId() {
		return tbClassId;
	}
	public void setTbClassId(Integer tbClassId) {
		this.tbClassId = tbClassId;
	}
	public Integer getTbGroupId() {
		return tbGroupId;
	}
	public void setTbGroupId(Integer tbGroupId) {
		this.tbGroupId = tbGroupId;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMajorName() {
		return majorName;
	}
	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
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
	public Integer getBlacklistId() {
		return blacklistId;
	}
	public void setBlacklistId(Integer blacklistId) {
		this.blacklistId = blacklistId;
	}
	
	
}
