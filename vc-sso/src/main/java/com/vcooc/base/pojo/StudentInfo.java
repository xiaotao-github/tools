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
	private Integer id;//学生信息ID
	private Integer tbClassId;//学生班级ID
	private Integer tbGroupId;//学生小组ID
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
	private String studentPresentation;//个人介绍
	private String qqNum;//QQ号码
	private Integer integral;//积分
	private String openId;//微信openid
	private String icNo;//ic卡
	private String exp1;//备用字段 -- 个性签名
	private String exp2;//备用字段
	
	@Transient
	private User user;//用户账号(user_id) 一对一关联
	@Transient
	private TbClass tbClass;//班级(tb_class_id)
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
	public String getStudentPresentation() {
		return studentPresentation;
	}
	public void setStudentPresentation(String studentPresentation) {
		this.studentPresentation = studentPresentation;
	}
	public String getQqNum() {
		return qqNum;
	}
	public void setQqNum(String qqNum) {
		this.qqNum = qqNum;
	}
	public Integer getIntegral() {
		return integral;
	}
	public void setIntegral(Integer integral) {
		this.integral = integral;
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
