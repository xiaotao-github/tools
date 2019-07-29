package com.vcooc.base.pojo;
import java.sql.Timestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.Id;
/**
 * 小组信息表
 * @author Administrator
 *
 */
@Table(name="tb_group")
public class TbGroup extends BaseBean{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer groupId;//小组ID
	private String groupName;//小组名称
	private Integer tbClassId;//班级ID
	private Integer courseExperimentId;//实验课程ID
	private Integer experimentId;//实验ID
	private Integer teacherInfoId;//教师ID
	private Timestamp startTime;//开始时间
	private Timestamp endTime;//结束时间
	private Integer groupType;//小组类型
	
	@Transient
	private TbClass tbClass;//班级信息
	@Transient
	private CourseExperiment courseExperiment;//实验课程信息
	@Transient
	private Experiment experiment;//实验信息
	@Transient
	private TeacherInfo teacherInfo;//教师信息
	
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Integer getTbClassId() {
		return tbClassId;
	}
	public void setTbClassId(Integer tbClassId) {
		this.tbClassId = tbClassId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	public Timestamp getStartTime() {
		return startTime;
	}
	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}
	public Timestamp getEndTime() {
		return endTime;
	}
	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}
	public Integer getGroupType() {
		return groupType;
	}
	public void setGroupType(Integer groupType) {
		this.groupType = groupType;
	}
	public Integer getCourseExperimentId() {
		return courseExperimentId;
	}
	public void setCourseExperimentId(Integer courseExperimentId) {
		this.courseExperimentId = courseExperimentId;
	}
	public TbClass getTbClass() {
		return tbClass;
	}
	public void setTbClass(TbClass tbClass) {
		this.tbClass = tbClass;
	}
	public CourseExperiment getCourseExperiment() {
		return courseExperiment;
	}
	public void setCourseExperiment(CourseExperiment courseExperiment) {
		this.courseExperiment = courseExperiment;
	}
	public Experiment getExperiment() {
		return experiment;
	}
	public void setExperiment(Experiment experiment) {
		this.experiment = experiment;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
}
