package com.vcooc.experiment.service.config;

import org.springframework.stereotype.Component;

import com.vcooc.common.spring.exetend.PropertyConfig;

@Component
public class PropertiesConfig {
	@PropertyConfig
	private String addExperimentLock;//#添加实验
	@PropertyConfig
	private String addExperimentGroupLock;//添加实验小组
	@PropertyConfig
	private String exportExperimentGradeLock;//导出实验成绩
	@PropertyConfig
	private String referExperimentGradeLock;//提交实验成绩
	@PropertyConfig
	private String studentQueryExperimentLock;//学生查询实验
	@PropertyConfig
	private Long lock_due_time=1800000L;//过期时间ms 半个小时
	
	
	public String getAddExperimentLock() {
		return addExperimentLock;
	}
	public void setAddExperimentLock(String addExperimentLock) {
		this.addExperimentLock = addExperimentLock;
	}
	public String getAddExperimentGroupLock() {
		return addExperimentGroupLock;
	}
	public void setAddExperimentGroupLock(String addExperimentGroupLock) {
		this.addExperimentGroupLock = addExperimentGroupLock;
	}
	public String getExportExperimentGradeLock() {
		return exportExperimentGradeLock;
	}
	public void setExportExperimentGradeLock(String exportExperimentGradeLock) {
		this.exportExperimentGradeLock = exportExperimentGradeLock;
	}
	public String getReferExperimentGradeLock() {
		return referExperimentGradeLock;
	}
	public void setReferExperimentGradeLock(String referExperimentGradeLock) {
		this.referExperimentGradeLock = referExperimentGradeLock;
	}
	public String getStudentQueryExperimentLock() {
		return studentQueryExperimentLock;
	}
	public void setStudentQueryExperimentLock(String studentQueryExperimentLock) {
		this.studentQueryExperimentLock = studentQueryExperimentLock;
	}
	public Long getLock_due_time() {
		return lock_due_time;
	}
	public void setLock_due_time(Long lock_due_time) {
		this.lock_due_time = lock_due_time;
	}
}
