package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 课程表--班级关联表
 * @author ITcast
 *
 */
@Table(name= "schedule_class")
public class ScheduleClass extends BaseBean{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer scheduleClassId;
	private Integer classId;        //班级id
	private Integer scheduleId;     //课程表id
	private Integer stealth;        //显示隐藏字段
	
	@Transient
	private TbClass tbClass;
	
	public Integer getScheduleClassId() {
		return scheduleClassId;
	}
	public void setScheduleClassId(Integer scheduleClassId) {
		this.scheduleClassId = scheduleClassId;
	}
	public Integer getClassId() {
		return classId;
	}
	public void setClassId(Integer classId) {
		this.classId = classId;
	}
	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public TbClass getTbClass() {
		return tbClass;
	}
	public void setTbClass(TbClass tbClass) {
		this.tbClass = tbClass;
	}
	
}
