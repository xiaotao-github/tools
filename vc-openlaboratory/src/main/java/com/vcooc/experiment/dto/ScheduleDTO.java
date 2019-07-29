package com.vcooc.experiment.dto;
/**
 * 课程信息表DTO
 * @author Administrator
 */
public class ScheduleDTO {
	private String courseName;//课程名称
	private String experimentName;//实验名称
	private String schooltimeString; //上课时间
	private String slice;//节数
	private String teacherName; //教师名称
	private Integer type;//类型
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getExperimentName() {
		return experimentName;
	}
	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}
	public String getSchooltimeString() {
		return schooltimeString;
	}
	public void setSchooltimeString(String schooltimeString) {
		this.schooltimeString = schooltimeString;
	}
	public String getSlice() {
		return slice;
	}
	public void setSlice(String slice) {
		this.slice = slice;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
}
