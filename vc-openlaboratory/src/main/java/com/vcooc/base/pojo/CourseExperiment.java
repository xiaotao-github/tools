package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 实验课程关联表
 * @author Administrator
 *
 */
@Table(name="course_experiment")
public class CourseExperiment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer courseExperimentId;//实验课程关联ID
	private Integer experimentId;//实验ID
	private Integer experimentCourseId;//课程ID
	
	
	
	public Integer getCourseExperimentId() {
		return courseExperimentId;
	}
	public void setCourseExperimentId(Integer courseExperimentId) {
		this.courseExperimentId = courseExperimentId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
}
