package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 实验室管理员表
 * @author ITcast
 *
 */
@Table(name="lab_manager")
public class LabManager extends BaseBean{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer labManagerId;//主键
	private Integer ladId;       //实验室id
	private Integer managerId;   //教师id(teacherInfo表)
	
	@Transient
	private String thManager;         //实验室管理员
	
	
	public Integer getLabManagerId() {
		return labManagerId;
	}
	public void setLabManagerId(Integer labManagerId) {
		this.labManagerId = labManagerId;
	}
	public Integer getLadId() {
		return ladId;
	}
	public void setLadId(Integer ladId) {
		this.ladId = ladId;
	}
	public Integer getManagerId() {
		return managerId;
	}
	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}
	public String getThManager() {
		return thManager;
	}
	public void setThManager(String thManager) {
		this.thManager = thManager;
	}
	
	
}
