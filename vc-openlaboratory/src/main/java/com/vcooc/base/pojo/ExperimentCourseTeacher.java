package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="experiment_course_teacher")
public class ExperimentCourseTeacher{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentCourseTeacherId;
	private Integer teacherInfoId;
	private Integer experimentCourseId;
	
	public Integer getExperimentCourseTeacherId() {
		return experimentCourseTeacherId;
	}
	public void setExperimentCourseTeacherId(Integer experimentCourseTeacherId) {
		this.experimentCourseTeacherId = experimentCourseTeacherId;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
}
