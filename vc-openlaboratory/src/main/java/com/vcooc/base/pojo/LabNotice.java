package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="lab_notice")
public class LabNotice extends BaseBean{
	private static final long serialVersionUID = 6831771022686145050L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer noticeId; //id
	private Integer labId;	//实验室id
	private Integer teacherId;//教师id
	private String title;//标题
	private String content;//内容
	private Integer isPublish;//0.显示  1.隐藏
	private Integer isCommon;//0.独自公告  1.通用公告  
	
	@Transient
	private String labName;//实验室名称
	@Transient
	private String teacherName;//操作教师
	
	public Integer getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Integer isPublish) {
		this.isPublish = isPublish;
	}
	public Integer getIsCommon() {
		return isCommon;
	}
	public void setIsCommon(Integer isCommon) {
		this.isCommon = isCommon;
	}
	public Integer getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
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
}
