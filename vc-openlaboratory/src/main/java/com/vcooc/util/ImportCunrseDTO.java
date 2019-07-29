package com.vcooc.util;

import java.util.Date;

/**封装导入的参数
 * @author ITcast
 *
 */
public class ImportCunrseDTO {
	private Integer numberLabId;//实验室id
	private Integer labSeats;//实验室初始座位数
	private Integer courserId;//实验课程id
	private Integer experimernteId ;//实验id 
	private Integer classId ;//班级id
	private String sliceToString;//上课第几节
	private Date schooltime;//上课日期
	private Integer thId;//上课教师
	private Integer stId;//学生id
	public Integer getNumberLabId() {
		return numberLabId;
	}
	public void setNumberLabId(Integer numberLabId) {
		this.numberLabId = numberLabId;
	}
	public Integer getLabSeats() {
		return labSeats;
	}
	public void setLabSeats(Integer labSeats) {
		this.labSeats = labSeats;
	}
	public Integer getCourserId() {
		return courserId;
	}
	public void setCourserId(Integer courserId) {
		this.courserId = courserId;
	}
	public Integer getExperimernteId() {
		return experimernteId;
	}
	public void setExperimernteId(Integer experimernteId) {
		this.experimernteId = experimernteId;
	}
	public Integer getClassId() {
		return classId;
	}
	public void setClassId(Integer classId) {
		this.classId = classId;
	}
	public String getSliceToString() {
		return sliceToString;
	}
	public void setSliceToString(String sliceToString) {
		this.sliceToString = sliceToString;
	}
	public Date getSchooltime() {
		return schooltime;
	}
	public void setSchooltime(Date schooltime) {
		this.schooltime = schooltime;
	}
	public Integer getThId() {
		return thId;
	}
	public void setThId(Integer thId) {
		this.thId = thId;
	}
	public Integer getStId() {
		return stId;
	}
	public void setStId(Integer stId) {
		this.stId = stId;
	}
	
	

}
