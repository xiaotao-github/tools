package com.vcooc.experiment.dto;
/**
 * 学生考勤信息表
 * @author Administrator
 *
 */
public class ClockingInDTO {
	
	private String studentName; //学生名称
	private String studentNumber;//学生学号
	private String siginTime;//打卡时间
	private String imagePath;//学生头像
	private int sigin;
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getSiginTime() {
		return siginTime;
	}
	public void setSiginTime(String siginTime) {
		this.siginTime = siginTime;
	}
	public int getSigin() {
		return sigin;
	}
	public void setSigin(int sigin) {
		this.sigin = sigin;
	}
	public String getStudentNumber() {
		return studentNumber;
	}
	public void setStudentNumber(String studentNumber) {
		this.studentNumber = studentNumber;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
}
