package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 学院信息表
 * @author admin
 *
 */
@Table(name="department")
public class Department extends BaseBean implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//院系id
	private String number;//院系编号
	private String name;//院系名称
	private String presentation;//院系介绍
	private Integer teacherInfoId;//操作员id (teacherInfoId)
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	
	@Transient
	private TeacherInfo teacherInfo;//操作员id (teacherInfoId)
	@Transient
	private List<TeacherInfo> teacherInfoList;//教师集合
	@Transient
	private List<Major> majorList;//专业集合
	@Transient
	private List<ExperimentCourse> experimentCourseList;//实验课程
	
	
	public List<Major> getMajorList() {
		return majorList;
	}
	public void setMajorList(List<Major> majorList) {
		this.majorList = majorList;
	}
	public List<TeacherInfo> getTeacherInfoList() {
		return teacherInfoList;
	}
	public void setTeacherInfoList(List<TeacherInfo> teacherInfoList) {
		this.teacherInfoList = teacherInfoList;
	}
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
	public List<ExperimentCourse> getExperimentCourseList() {
		return experimentCourseList;
	}
	public void setExperimentCourseList(List<ExperimentCourse> experimentCourseList) {
		this.experimentCourseList = experimentCourseList;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj==null){
			return false;
		}
		if(obj instanceof Department){
			Department department = (Department)obj;
			if(department.getId() == this.getId()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	@Override
	public int hashCode() {
		return (this.id==null?0:this.id)+
				(this.name==null?0:this.name.hashCode())+
				(this.number==null?0:this.number.hashCode())+
				(this.getPresentation()==null?0:this.getPresentation().hashCode());
	}
}
