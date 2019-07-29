package com.vcooc.experiment.dto;

/**
 * Excel 导出学生实验成绩用的dto其他不可用 或者不能修改本类中的属性
 * @author Administrator
 *
 */
public class ScheduleStudentScoreExcelDTO {
	
	private String username; //学号
	private String stuName;//姓名
	private String clazzName;//班级
	private String courseName;//课程名称
	private String experimentName;//实验名称
	private String schoolTime; //开始实验时间
	private String submitTime;//提交时间
	private String score;//实验成绩
	private String status;//实验状态
	private String pattern;//模式  自助预约  整班上课  小组协作  
	private String teacherName;//指导老师姓名
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getStuName() {
		return stuName;
	}
	public void setStuName(String stuName) {
		this.stuName = stuName;
	}
	public String getClazzName() {
		return clazzName;
	}
	public void setClazzName(String clazzName) {
		this.clazzName = clazzName;
	}
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
	public String getSchoolTime() {
		return schoolTime;
	}
	public void setSchoolTime(String schoolTime) {
		this.schoolTime = schoolTime;
	}
	public String getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(String submitTime) {
		this.submitTime = submitTime;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPattern() {
		return pattern;
	}
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
}
