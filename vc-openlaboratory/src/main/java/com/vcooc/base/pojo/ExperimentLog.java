package com.vcooc.base.pojo;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 学生实验日志信息
 * @author Administrator
 *
 */
@Table(name="Experiment_log")
public class ExperimentLog implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long logId;//学生实验日志id
	private Long scheduleStudentScoreId;//学生成绩id
	private Integer lookCount;//实验查看次数
	private Long lookTime;//实验查看总时长
	private Integer type;//成绩类型 1.scheduleStudentScore 2.submitExperimentFile
	
	public Long getLogId() {
		return logId;
	}
	
	public void setLogId(Long logId) {
		this.logId = logId;
	}
	
	public Integer getLookCount() {
		return lookCount;
	}
	public void setLookCount(Integer lookCount) {
		this.lookCount = lookCount;
	}
	public Long getLookTime() {
		return lookTime;
	}
	public void setLookTime(Long lookTime) {
		this.lookTime = lookTime;
	}

	public Long getScheduleStudentScoreId() {
		return scheduleStudentScoreId;
	}

	public void setScheduleStudentScoreId(Long scheduleStudentScoreId) {
		this.scheduleStudentScoreId = scheduleStudentScoreId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	
}
