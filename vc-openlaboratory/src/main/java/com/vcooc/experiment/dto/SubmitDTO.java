package com.vcooc.experiment.dto;
/**
 * 实验成绩  数据传输 对象
 * @author Administrator
 *
 */
public class SubmitDTO {
	//选择框
	private String checkBox;
	//学生学号(姓名)
	private String studentNumberName;
	//所属院系
	private String departmentName;
	//班级名称
	private String className;
	//所属课程
	private String courseName;
	//实验名称
	private String experimentName;
	//小组名称
	private String groupName;
	//实验状态
	private String experimentStatus;
	//批改状态
	private String checkStatus;
	//导出状态
	private String exportStatus;
	//指导老师
	private String instructor;
	//批阅、删除
	private String operation;
	public String getCheckBox() {
		return checkBox;
	}
	public void setCheckBox(String checkBox) {
		this.checkBox = checkBox;
	}
	public String getStudentNumberName() {
		return studentNumberName;
	}
	public void setStudentNumberName(String studentNumberName) {
		this.studentNumberName = studentNumberName;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
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
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getExperimentStatus() {
		return experimentStatus;
	}
	public void setExperimentStatus(String experimentStatus) {
		this.experimentStatus = experimentStatus;
	}
	public String getCheckStatus() {
		return checkStatus;
	}
	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}
	public String getExportStatus() {
		return exportStatus;
	}
	public void setExportStatus(String exportStatus) {
		this.exportStatus = exportStatus;
	}
	public String getInstructor() {
		return instructor;
	}
	public void setInstructor(String instructor) {
		this.instructor = instructor;
	}
	public String getOperation() {
		return operation;
	}
	public void setOperation(String operation) {
		this.operation = operation;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
}
