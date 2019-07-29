package com.vcooc.base.pojo;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="clocking_in")
public class ClockingIn extends BaseBean{
	/**
	 * 不再使用，直接把考勤信息写到课程成绩表
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long clockingId;//考勤id
	private Integer scheduleId;//课程表id
	private Integer classId;//班级id
	private Integer groupId;//小组id
	private String  exp1;//备用字段
	private Integer studentId;//学生id
	private Integer status;//签到状态 1.未签到  2.已签到
	private Date clockingTime;//签到时间
	public Long getClockingId() {
		return clockingId;
	}
	public void setClockingId(Long clockingId) {
		this.clockingId = clockingId;
	}
	
	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	public Integer getClassId() {
		return classId;
	}
	public void setClassId(Integer classId) {
		this.classId = classId;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public String getExp1() {
		return exp1;
	}
	public void setExp1(String exp1) {
		this.exp1 = exp1;
	}
	public Integer getStudentId() {
		return studentId;
	}
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Date getClockingTime() {
		return clockingTime;
	}
	public void setClockingTime(Date clockingTime) {
		this.clockingTime = clockingTime;
	}

}
