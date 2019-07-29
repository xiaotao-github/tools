package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 班级信息表
 * @author admin
 *
 */
/**
 * @author Administrator
 *
 */
@Table(name="tb_class")
public class TbClass  extends BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//id
	private Integer gradeId;//所属年级(gradeId)
	private String number;//班级编号
	private String name;//班级名称
	private String presentation;//班级介绍
	private Integer teacherInfoId;//操作员(teacherInfoId)
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	@Transient
	private Grade grade;//所属年级(gradeId)
	@Transient
	private TeacherInfo teacherInfo;//操作员(teacherInfoId)
	//自定义字段
	@Transient
	private Integer isSelect;//判断是否被课程选中 1.是  2.否
	@Transient
	private List<ExperimentGroup> experimentGroupList;//班级下的实验小组
	@Transient
	private List<StudentInfo> studentInfoList;//班级下的学生
	@Transient
	private String majorName;
	@Transient
	private List<ScourseGroup> scourseGroup;         //课程表下的小组
	@Transient
	private int memberNum;//班级人数
	
	public List<ScourseGroup> getScourseGroup() {
		return scourseGroup;
	}
	public void setScourseGroup(List<ScourseGroup> scourseGroup) {
		this.scourseGroup = scourseGroup;
	}
	public String getMajorName() {
		return majorName;
	}
	public void setMajorName(String majorName) {
		this.majorName = majorName;
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
	public Grade getGrade() {
		return grade;
	}
	public void setGrade(Grade grade) {
		this.grade = grade;
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
	public Integer getIsSelect() {
		return isSelect;
	}
	public void setIsSelect(Integer isSelect) {
		this.isSelect = isSelect;
	}
	public List<ExperimentGroup> getExperimentGroupList() {
		return experimentGroupList;
	}
	public void setExperimentGroupList(List<ExperimentGroup> experimentGroupList) {
		this.experimentGroupList = experimentGroupList;
	}
	public List<StudentInfo> getStudentInfoList() {
		return studentInfoList;
	}
	public void setStudentInfoList(List<StudentInfo> studentInfoList) {
		this.studentInfoList = studentInfoList;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	public Integer getGradeId() {
		return gradeId;
	}
	public void setGradeId(Integer gradeId) {
		this.gradeId = gradeId;
	}
	public int getMemberNum() {
		return memberNum;
	}
	public void setMemberNum(int memberNum) {
		this.memberNum = memberNum;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj==null){
			return false;
		}
		if(obj==this){
			return true;
		}
		if (obj instanceof TbClass) {
			TbClass tbClass = (TbClass)obj;
			if(tbClass.getId() == this.getId()){
				return true;
			}
		}
		return false;	
	}
	@Override
	public int hashCode() {
		return (this.id==null?0:this.id)
				+(this.name==null?0:name.hashCode())
				+(this.presentation==null?0:this.presentation.hashCode());
	}
}
