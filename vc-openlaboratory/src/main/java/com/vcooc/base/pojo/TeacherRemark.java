package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 教师评价表
 * @author Administrator
 *
 */
@Table(name="teacher_remark")
public class TeacherRemark extends BaseBean{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer teacherRemarkId;//教师评价id
	private String remark;//教师评价
	private Integer type;//评价类型 1.实验评价
	private Integer teacherInfoId;//创建人
	public Integer getTeacherRemarkId() {
		return teacherRemarkId;
	}
	public void setTeacherRemarkId(Integer teacherRemarkId) {
		this.teacherRemarkId = teacherRemarkId;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
}
