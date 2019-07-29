package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="simulate_terrace")
public class SimulateTerrace extends BaseBean {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer simulateTerraceId;//id
	private Integer operatorId;//操作人ID
	private Integer isPublish;//是否公布 0.不公布 1.公布  
	private String terraceName;//仿真平台名称
	private String terraceIntroduction;//仿真平台介绍
	private String filePath;//文件存放路径
	private String linkPath;//链接路径
	
	@Transient
	private TeacherInfo teacherInfo;//操作教师信息

	public Integer getSimulateTerraceId() {
		return simulateTerraceId;
	}

	public void setSimulateTerraceId(Integer simulateTerraceId) {
		this.simulateTerraceId = simulateTerraceId;
	}

	public String getTerraceName() {
		return terraceName;
	}

	public void setTerraceName(String terraceName) {
		this.terraceName = terraceName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getLinkPath() {
		return linkPath;
	}

	public void setLinkPath(String linkPath) {
		this.linkPath = linkPath;
	}

	public Integer getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}

	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}

	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}

	public Integer getIsPublish() {
		return isPublish;
	}

	public void setIsPublish(Integer isPublish) {
		this.isPublish = isPublish;
	}

	public String getTerraceIntroduction() {
		return terraceIntroduction;
	}

	public void setTerraceIntroduction(String terraceIntroduction) {
		this.terraceIntroduction = terraceIntroduction;
	}
}
