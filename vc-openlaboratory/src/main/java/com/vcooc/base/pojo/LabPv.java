package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
//实验室视频图片管理表
@Table(name="lab_pv")
public class LabPv extends BaseBean{
	private static final long serialVersionUID = 6831771022686145050L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer pvId; //id
	private Integer labId;	//实验室id
	private Integer teacherId;//教师id
	private String title;//标题
	private Integer type;//类型 0.视频  1.图片
	private String filePath;//路径
	private Integer isPublish;//0.显示  1.隐藏
	private String pvDescribe; //视频描述 
	
	@Transient
	private String labName;//实验室名称
	@Transient
	private String teacherName;//操作教师
	

	public Integer getPvId() {
		return pvId;
	}
	public void setPvId(Integer pvId) {
		this.pvId = pvId;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	public Integer getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public Integer getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Integer isPublish) {
		this.isPublish = isPublish;
	}
	public String getLabName() {
		return labName;
	}
	public void setLabName(String labName) {
		this.labName = labName;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public String getPvDescribe() {
		return pvDescribe;
	}
	public void setPvDescribe(String pvDescribe) {
		this.pvDescribe = pvDescribe;
	}
	
	

}
