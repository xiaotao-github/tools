package com.vcooc.base.pojo;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="student_experiment_score")
public class StudentExperimentScore {
	@Id
	private String experimentScoreId;     //主键  UUID
	private Integer submitId;             //学生实验成绩id,与submit_experiment_file , schedule_student_score表关联
	private long standardId;             //评分标准id,与experiment_standard表关联
	private double score;                 //学生该项标准，教师给的成绩
	private Integer experimentType;     //实验类型：1.虚拟实验 2.实物实验
	
	public Integer getSubmitId() {
		return submitId;
	}
	public void setSubmitId(Integer submitId) {
		this.submitId = submitId;
	}
	public long getStandardId() {
		return standardId;
	}
	public void setStandardId(long standard_id) {
		this.standardId = standard_id;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public String getExperimentScoreId() {
		return experimentScoreId;
	}
	public void setExperimentScoreId(String experimentScoreId) {
		this.experimentScoreId = experimentScoreId;
	}
	public Integer getExperimentType() {
		return experimentType;
	}
	public void setExperimentType(Integer experimentType) {
		this.experimentType = experimentType;
	}
}
