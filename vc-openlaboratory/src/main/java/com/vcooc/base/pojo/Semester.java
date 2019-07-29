package com.vcooc.base.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 学期
 * @author Administrator
 *
 */
@Table(name="semester")
public class Semester extends BaseBean{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer semesterId;//学期id
	private String semesterName;//学期名称
	private Integer operatorId;//操作员id
	private Date startTime;//开始时间
	private Date endTime;//结束时间
	private Integer stealth;//伪删除字段
	
	@Transient
	private TeacherInfo teacherInfo;//操作员信息
	@Transient
	private String mondayTime;
	
	public String getMondayTime() {
		return mondayTime;
	}
	public void setMondayTime(String mondayTime) {
		this.mondayTime = mondayTime;
	}
	public Integer getSemesterId() {
		return semesterId;
	}
	public void setSemesterId(Integer semesterId) {
		this.semesterId = semesterId;
	}
	public String getSemesterName() {
		return semesterName;
	}
	public void setSemesterName(String semesterName) {
		this.semesterName = semesterName;
	}
	public Integer getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}

	public String getStartTimeToString(){
		if(startTime!=null){
			return sdf.format(startTime);
		}
		return "";
	}
	
	public String getEndTimeToString(){
		if(startTime!=null){
			return sdf.format(endTime);
		}
		return "";
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	
}
