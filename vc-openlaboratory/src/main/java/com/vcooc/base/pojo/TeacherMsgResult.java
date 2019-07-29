package com.vcooc.base.pojo;
/**
 * 返回老师信息
 * @author Administrator
 *
 */
public class TeacherMsgResult {
	private String teacherId ; 
	private String teacherName; //姓名
	private String departMentName; //所属院系
	private String imagePath;     //头像路径
	
	
	public String getTeacherId() {
		return teacherId;
	}
	
	public void setTeacherId(String teacherId) {
		this.teacherId = teacherId;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public String getDepartMentName() {
		return departMentName;
	}
	public void setDepartMentName(String departMentName) {
		this.departMentName = departMentName;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	
	

}
