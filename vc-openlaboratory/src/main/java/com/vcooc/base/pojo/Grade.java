package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 年级信息表
 * @author admin
 *
 */
@Table(name="grade")
public class Grade  extends BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//年级id
	private Major major;//所属专业(majorId)
	private String number;//年级编号
	private String name;//年级名称
	private String presentation;//年级介绍
	private TeacherInfo teacherInfo;//操作员(teacherInfoId)
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	
	@Transient
	private List<TbClass> tbClassList;
	
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Major getMajor() {
		return major;
	}
	public void setMajor(Major major) {
		this.major = major;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPresentation() {
		return presentation;
	}
	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public List<TbClass> getTbClassList() {
		return tbClassList;
	}
	public void setTbClassList(List<TbClass> tbClassList) {
		this.tbClassList = tbClassList;
	}
}
