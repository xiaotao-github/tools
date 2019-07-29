package com.vcooc.base.pojo;

import java.util.List;

/**
 * 返回学生实验列表信息的封装
 * @author Administrator
 *
 */
public class StudentExperimentResult {
	
	private String experimentName;  //实验名称
	
	private String courseName;      //课程名称
	
	private String experimentType; //实验类型
	
	
	private String level;		   //实验等级
	
	private String schoolTime;     //上课时间
	
	private String slice;          //课时小节
	
	private String labName;		   //实验室名称
	
	private Integer scheduleId;   //
	
	private Integer studentId;
	
	private Integer experimentId;
	
	private Integer labId;
	
	private Integer submitStatus;//提交状态
	
	
	
	public Integer getSubmitStatus() {
		return submitStatus;
	}

	public void setSubmitStatus(Integer submitStatus) {
		this.submitStatus = submitStatus;
	}

	private List<TeacherMsgResult> teacherMsgList;//任课教师信息
	
	private Integer experimentCourseId;

	public String getExperimentName() {
		return experimentName;
	}

	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	


	public String getExperimentType() {
		return experimentType;
	}

	public void setExperimentType(String experimentType) {
		this.experimentType = experimentType;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getSchoolTime() {
		return schoolTime;
	}

	public void setSchoolTime(String schoolTime) {
		this.schoolTime = schoolTime;
	}

	public String getSlice() {
		return slice;
	}

	public void setSlice(String slice) {
		this.slice = slice;
	}

	public String getLabName() {
		return labName;
	}

	public void setLabName(String labName) {
		this.labName = labName;
	}

	public List<TeacherMsgResult> getTeacherMsgList() {
		return teacherMsgList;
	}

	public void setTeacherMsgList(List<TeacherMsgResult> teacherMsgList) {
		this.teacherMsgList = teacherMsgList;
	}

	public Integer getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}

	public Integer getStudentId() {
		return studentId;
	}

	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}

	public Integer getExperimentId() {
		return experimentId;
	}

	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}

	public Integer getLabId() {
		return labId;
	}

	public void setLabId(Integer labId) {
		this.labId = labId;
	}

	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}

	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}

	
	
}

