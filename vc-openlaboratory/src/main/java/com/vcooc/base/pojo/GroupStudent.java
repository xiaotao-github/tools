/*package com.vcooc.base.pojo;

import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;
*//**
 * 小组学生关联表
 * @author Administrator
 *
 *//*
@Table(name="group_student")
public class GroupStudent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer groupStudentId;
	private Integer groupId;
	private Integer studentInfoId;
	
	//@Transient
	//private TbGroup group;
	@Transient
	private StudentInfo studentInfo;
	
	public Integer getGroupStudentId() {
		return groupStudentId;
	}
	public void setGroupStudentId(Integer groupStudentId) {
		this.groupStudentId = groupStudentId;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public Integer getStudentInfoId() {
		return studentInfoId;
	}
	public void setStudentInfoId(Integer studentInfoId) {
		this.studentInfoId = studentInfoId;
	}
	public TbGroup getGroup() {
		return group;
	}
	public void setGroup(TbGroup group) {
		this.group = group;
	}
	public StudentInfo getStudentInfo() {
		return studentInfo;
	}
	public void setStudentInfo(StudentInfo studentInfo) {
		this.studentInfo = studentInfo;
	}
}
*/