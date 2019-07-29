package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 教师操作日志表
 * @author admin
 *
 */

@Table(name="teacher_log_information")
public class TeacherLogInformation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//日志id
	private TeacherInfo teacherInfo;//操作教师（teacherInfoId）
	private String operationIp;//操作ip
	private Date operationTime;//操作时间
	private String message;//操作信息
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public String getOperationIp() {
		return operationIp;
	}
	public void setOperationIp(String operationIp) {
		this.operationIp = operationIp;
	}
	public Date getOperationTime() {
		return operationTime;
	}
	public void setOperationTime(Date operationTime) {
		this.operationTime = operationTime;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
