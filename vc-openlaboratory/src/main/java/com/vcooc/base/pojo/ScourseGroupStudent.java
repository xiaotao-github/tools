package com.vcooc.base.pojo;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name="scourse_group_student")
public class ScourseGroupStudent extends BaseBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer groupStudentId;           //课程表id
	private Integer groupId;                  //课程小组id
	private Integer studentId;                //学生id
	private String  exp1;                     //备用字段
	
	
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
	public Integer getStudentId() {
		return studentId;
	}
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	public String getExp1() {
		return exp1;
	}
	public void setExp1(String exp1) {
		this.exp1 = exp1;
	}
	
}
