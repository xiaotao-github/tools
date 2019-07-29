package com.vcooc.base.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * @author Administrator
 *
 */
@Table(name="submit_experiment_file")
public class SubmitExperimentFile extends BaseBean{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer submitExperimentFileId;
	private Integer experimentId;
	private Integer experimentCourseId;
	private Integer experimentGroupId;
	private Integer submitStatus;
	private String labReport;
	private String projectFile;
	private String gifFile;
	private String otherFile;//1.已导出
	private Integer submitterId;
	private Double score;
	private String remark;
	private Integer goodReport; 
	private Date checkTime;//批改时间
	
	
	@Transient
	private Integer labId;//该参数用于form提交成功后的跳转实验
	@Transient
	private Integer scheduleId;
	@Transient
	private StudentInfo studentSubmitter;//提交人 --学生信息
	@Transient
	private Experiment experiment;
	@Transient
	private ExperimentCourse experimentCourse;
	@Transient
	private ExperimentGroup experimentGroup;
	@Transient
	private TeacherInfo teacherInfo;
	@Transient
	private User SubmitUser;//提交人账号信息
	@Transient
	private List<ExperimentStandard> ExperimentStandardList;//分数
	
	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	public User getSubmitUser() {
		return SubmitUser;
	}
	public void setSubmitUser(User submitUser) {
		SubmitUser = submitUser;
	}
	public Integer getSubmitExperimentFileId() {
		return submitExperimentFileId;
	}
	public void setSubmitExperimentFileId(Integer submitExperimentFileId) {
		this.submitExperimentFileId = submitExperimentFileId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
	public Integer getExperimentGroupId() {
		return experimentGroupId;
	}
	public void setExperimentGroupId(Integer experimentGroupId) {
		this.experimentGroupId = experimentGroupId;
	}
	public Integer getSubmitStatus() {
		return submitStatus;
	}
	public void setSubmitStatus(Integer submitStatus) {
		this.submitStatus = submitStatus;
	}
	public String getLabReport() {
		return labReport;
	}
	public void setLabReport(String labReport) {
		this.labReport = labReport;
	}
	public String getProjectFile() {
		return projectFile;
	}
	public void setProjectFile(String projectFile) {
		this.projectFile = projectFile;
	}
	public String getGifFile() {
		return gifFile;
	}
	public void setGifFile(String gifFile) {
		this.gifFile = gifFile;
	}
	public String getOtherFile() {
		return otherFile;
	}
	public void setOtherFile(String otherFile) {
		this.otherFile = otherFile;
	}
	public Integer getSubmitterId() {
		return submitterId;
	}
	public void setSubmitterId(Integer submitterId) {
		this.submitterId = submitterId;
	}
	public Double getScore() {
		return score;
	}
	public void setScore(Double score) {
		this.score = score;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getGoodReport() {
		return goodReport;
	}
	public void setGoodReport(Integer goodReport) {
		this.goodReport = goodReport;
	}
	public StudentInfo getStudentSubmitter() {
		return studentSubmitter;
	}
	public void setStudentSubmitter(StudentInfo studentSubmitter) {
		this.studentSubmitter = studentSubmitter;
	}
	public Experiment getExperiment() {
		return experiment;
	}
	public void setExperiment(Experiment experiment) {
		this.experiment = experiment;
	}
	public ExperimentCourse getExperimentCourse() {
		return experimentCourse;
	}
	public void setExperimentCourse(ExperimentCourse experimentCourse) {
		this.experimentCourse = experimentCourse;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public ExperimentGroup getExperimentGroup() {
		return experimentGroup;
	}
	public void setExperimentGroup(ExperimentGroup experimentGroup) {
		this.experimentGroup = experimentGroup;
	}
	public Date getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}
	public List<ExperimentStandard> getExperimentStandardList() {
		return ExperimentStandardList;
	}
	public void setExperimentStandardList(List<ExperimentStandard> experimentStandardList) {
		ExperimentStandardList = experimentStandardList;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	
}
