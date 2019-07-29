package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 实验资源关联表
 * @author Administrator
 *
 */
@Table(name="experiment_file")
public class ExperimentFile {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentFileId;//实验资源文件关联表ID
	private Integer experimentId;//实验ID
	private Integer resourceFileId;//资源文件ID
	private Integer isInstructor;//是否是 实验指导书  1.是  2.否
	
	
	public ExperimentFile() {
		super();
	}
	public ExperimentFile(Integer experimentFileId, Integer experimentId, Integer resourceFileId,
			Integer isInstructor) {
		super();
		this.experimentFileId = experimentFileId;
		this.experimentId = experimentId;
		this.resourceFileId = resourceFileId;
		this.isInstructor = isInstructor;
	}
	public Integer getExperimentFileId() {
		return experimentFileId;
	}
	public void setExperimentFileId(Integer experimentFileId) {
		this.experimentFileId = experimentFileId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getResourceFileId() {
		return resourceFileId;
	}
	public void setResourceFileId(Integer resourceFileId) {
		this.resourceFileId = resourceFileId;
	}
	public Integer getIsInstructor() {
		return isInstructor;
	}
	public void setIsInstructor(Integer isInstructor) {
		this.isInstructor = isInstructor;
	}
}
