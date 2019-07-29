package com.vcooc.base.pojo;

import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Transient;
/**
 * 小组学生关联表
 * @author Administrator
 */
@Table(name="experiment_group_student")
public class ExperimentGroupStudent {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentGroupStudentId;
	private Integer experimentGroupId;
	private Integer studentInfoId;
	
	@Transient
	private ExperimentGroup experimentGroup;
	@Transient
	private StudentInfo studentInfo;
	
	public Integer getExperimentGroupStudentId() {
		return experimentGroupStudentId;
	}
	public void setExperimentGroupStudentId(Integer experimentGroupStudentId) {
		this.experimentGroupStudentId = experimentGroupStudentId;
	}
	public Integer getExperimentGroupId() {
		return experimentGroupId;
	}
	public void setExperimentGroupId(Integer experimentGroupId) {
		this.experimentGroupId = experimentGroupId;
	}
	public Integer getStudentInfoId() {
		return studentInfoId;
	}
	public void setStudentInfoId(Integer studentInfoId) {
		this.studentInfoId = studentInfoId;
	}
	public ExperimentGroup getExperimentGroup() {
		return experimentGroup;
	}
	public void setExperimentGroup(ExperimentGroup experimentGroup) {
		this.experimentGroup = experimentGroup;
	}
	public StudentInfo getStudentInfo() {
		return studentInfo;
	}
	public void setStudentInfo(StudentInfo studentInfo) {
		this.studentInfo = studentInfo;
	}
}
