package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 实验课程班级关联表
 * @author Administrator
 *
 */
@Table(name="experiment_course_class")
public class ExperimentCourseClass {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentCourseClassId;
	private Integer experimentCourseId;
	private Integer tbClassId;
	
	public Integer getExperimentCourseClassId() {
		return experimentCourseClassId;
	}
	public void setExperimentCourseClassId(Integer experimentCourseClassId) {
		this.experimentCourseClassId = experimentCourseClassId;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
	public Integer getTbClassId() {
		return tbClassId;
	}
	public void setTbClassId(Integer tbClassId) {
		this.tbClassId = tbClassId;
	}
}
