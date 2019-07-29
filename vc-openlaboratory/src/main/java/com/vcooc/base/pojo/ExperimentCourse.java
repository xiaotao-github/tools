package com.vcooc.base.pojo;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Transient;
/**
 * 实验课程
 * @author Administrator
 *
 */
@Table(name="experiment_course")
public class ExperimentCourse extends BaseBean {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentCourseId; //实验课程ID
	private Integer departmentId; //院系ID
	private String number; //课程编号
	private String courseName;//课程名称
	private Integer classHour;//总课时
	private Integer courseImgId;//课程封面ID
	private String semester;//学期
	private String presentation;//课程介绍
	private String referenceBook;//参考教材
	private Integer teacherInfoId;//操作员ID
	private Integer stealth;//隐藏字段
	private Integer isPublish;// 1 是虚拟仿真 2 是 开放与预约（原本为是否公布）
	
	@Transient
	private Department department; //院系信息
	@Transient
	private ResourceFile resourceFile;//封面信息
	@Transient
	private TeacherInfo teacherInfo;//操作员信息
	@Transient
	private List<TeacherInfo> teacherInfoList;//任课教师信息
	@Transient
	private List<Experiment> visitExperimentList;//参考实验
	@Transient
	private int visitExperimentCount;//参考实验数量
	@Transient
	private List<Experiment> planExperimentList;//设计实验
	@Transient
	private int planExperimenCount;//设计实验数量
	@Transient
	private int courseExperimentCount;//课程实验的数量
	@Transient 
	private List<Experiment> experimentList;//实验（包含设计实验和参考实验）
	@Transient
	private Integer finishExperimentSieze;//完成的实验
	@Transient
	private Integer unFinishExperimentSize;//未完成得实验
	@Transient
	private String imgPath;//封面路径
	@Transient
	private List<TbClass> tbclass;
	
	
	public List<TbClass> getTbclass() {
		return tbclass;
	}
	public void setTbclass(List<TbClass> tbclass) {
		this.tbclass = tbclass;
	}
	public int getCourseExperimentCount() {
		return courseExperimentCount;
	}
	public void setCourseExperimentCount(int courseExperimentCount) {
		this.courseExperimentCount = courseExperimentCount;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getPresentation() {
		return presentation;
	}
	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}
	public String getReferenceBook() {
		return referenceBook;
	}
	public void setReferenceBook(String referenceBook) {
		this.referenceBook = referenceBook;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public Integer getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Integer isPublish) {
		this.isPublish = isPublish;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public ResourceFile getResourceFile() {
		return resourceFile;
	}
	public void setResourceFile(ResourceFile resourceFile) {
		this.resourceFile = resourceFile;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public Integer getClassHour() {
		return classHour;
	}
	public void setClassHour(Integer classHour) {
		this.classHour = classHour;
	}
	public List<TeacherInfo> getTeacherInfoList() {
		return teacherInfoList;
	}
	public void setTeacherInfoList(List<TeacherInfo> teacherInfoList) {
		this.teacherInfoList = teacherInfoList;
	}
	public Integer getCourseImgId() {
		return courseImgId;
	}
	public void setCourseImgId(Integer courseImgId) {
		this.courseImgId = courseImgId;
	}
	public List<Experiment> getVisitExperimentList() {
		return visitExperimentList;
	}
	public void setVisitExperimentList(List<Experiment> visitExperimentList) {
		this.visitExperimentList = visitExperimentList;
	}
	public List<Experiment> getPlanExperimentList() {
		return planExperimentList;
	}
	public void setPlanExperimentList(List<Experiment> planExperimentList) {
		this.planExperimentList = planExperimentList;
	}
	public List<Experiment> getExperimentList() {
		return experimentList;
	}
	public void setExperimentList(List<Experiment> experimentList) {
		this.experimentList = experimentList;
	}
	public Integer getFinishExperimentSieze() {
		return finishExperimentSieze;
	}
	public void setFinishExperimentSieze(Integer finishExperimentSieze) {
		this.finishExperimentSieze = finishExperimentSieze;
	}
	public Integer getUnFinishExperimentSize() {
		return unFinishExperimentSize;
	}
	public void setUnFinishExperimentSize(Integer unFinishExperimentSize) {
		this.unFinishExperimentSize = unFinishExperimentSize;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public int getVisitExperimentCount() {
		return visitExperimentCount;
	}
	public void setVisitExperimentCount(int visitExperimentCount) {
		this.visitExperimentCount = visitExperimentCount;
	}
	public int getPlanExperimenCount() {
		return planExperimenCount;
	}
	public void setPlanExperimenCount(int planExperimenCount) {
		this.planExperimenCount = planExperimenCount;
	}
	
}
