package com.vcooc.base.pojo;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

public class LabBlacklist extends BaseBean{
	private static final long serialVersionUID = -8014601113539274267L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer blacklistId;
	private Integer studentId;
	
	@Transient
	private String createTimeStr;
	
	@Transient
	private StudentInfo studentInfo;
	
	public LabBlacklist() {
		super();
	}
	public LabBlacklist(Integer studentId) {
		super();
		this.studentId = studentId;
		this.setCreateTime(new Date());
		this.setUpdateTime(this.getCreateTime());
	}
	public Integer getBlacklistId() {
		return blacklistId;
	}
	public void setBlacklistId(Integer blacklistId) {
		this.blacklistId = blacklistId;
	}
	public Integer getStudentId() {
		return studentId;
	}
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	public StudentInfo getStudentInfo() {
		return studentInfo;
	}
	public void setStudentInfo(StudentInfo studentInfo) {
		this.studentInfo = studentInfo;
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}
	
	
}
