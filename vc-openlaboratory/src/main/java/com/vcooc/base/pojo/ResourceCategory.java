package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="resource_category")
public class ResourceCategory implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
     private Integer resourseCategoryId;
     private String categoryName;
     private Integer  teacherInfoId;
 	 private Date  createTime;
     
     public Integer getResourseCategoryId() {
		return resourseCategoryId;
	}
	public void setResourseCategoryId(Integer resourseCategoryId) {
		this.resourseCategoryId = resourseCategoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
