package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name= "schedule_student_score")
public class ScheduleStudentScore extends BaseBean implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer scheduleStudentScoreId;   //成绩表主键
	private Integer scheduleId;               //课程表  CourseSchedule ID
	private Integer submitStatus;             //1.进行中   2.待批改（已提交） 3.已批改   4.重做中 5.上传图爿判断参数 6.保存作业
	private String  labReport;                //实验报告html
	private String  reportFilePath;           //实验报告路径(文件存放路径)
	private String  projectFile;              //工程文件
	private String 	projectFileHtml;		//工程文件预览路径
	private String  gifFile;                  //Gif动态图
	private String  otherFile;                //实验的其他附件
	private Integer submitterId;              //提交人ID
	private Double  score;                    //学生提交的分数
	private String  remark;                   //教师评语
	private Integer goodReport;               //优秀报告
	private Date checkTime;                //批改时间
	private Date submitTime;              //提交时间
	//新增表字段
	private Integer signin;//考勤  0 未签到  1已签到 3 迟到
	private Date  signinTime;//签到时间
	private Date stipulateSgininTime;//规定打卡时间 
	private String reportDescription;//报告描述
	private String templateContent;//学生填写模板内容
	
	//自定义
	@Transient
	private String studentName; //学生名称
	@Transient
	private String courseName; //课程名称
	@Transient
	private String experimentName; //实验名称
	@Transient
	private String username;//学号
	@Transient
	private String teacherName;//教师名称
	@Transient
	private String clazzName; //班级名称
	@Transient
	private CourseSchedule courseSchedule; //课程表信息
	@Transient
	private List<ExperimentStandard> experimentStandards;//学生实验分数表
	@Transient
	private StudentInfo submitter;//学生信息
	@Transient
	private String imagePath;//学生头像
	@Transient
	private Integer experimentId ;//实验Id 作为页面跳转
	@Transient
	private Integer labId;//实验室Id 作为页面跳转
	@Transient
	private Integer experimentCourseId;//课程表id 用于界面跳转
	
	@Transient
	private Integer labMyseat;//课程表工位
	@Transient
	private Date timeOfAppointment;//学生预约的时间
	
	
	
	public String getTemplateContent() {
		return templateContent;
	}
	public void setTemplateContent(String templateContent) {
		this.templateContent = templateContent;
	}
	public String getProjectFileHtml() {
		return projectFileHtml;
	}
	public void setProjectFileHtml(String projectFileHtml) {
		this.projectFileHtml = projectFileHtml;
	}
	
	public Date getTimeOfAppointment() {
		return timeOfAppointment;
	}
	public void setTimeOfAppointment(Date timeOfAppointment) {
		this.timeOfAppointment = timeOfAppointment;
	}
	public Integer getLabMyseat() {
		return labMyseat;
	}
	public void setLabMyseat(Integer labMyseat) {
		this.labMyseat = labMyseat;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getExperimentName() {
		return experimentName;
	}
	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}
	public Integer getScheduleStudentScoreId() {
		return scheduleStudentScoreId;
	}
	public void setScheduleStudentScoreId(Integer scheduleStudentScoreId) {
		this.scheduleStudentScoreId = scheduleStudentScoreId;
	}
	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
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
	public String getReportFilePath() {
		return reportFilePath;
	}
	public void setReportFilePath(String reportFilePath) {
		this.reportFilePath = reportFilePath;
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
	public Date getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}
	public String getCheckTimeToString(){
		return checkTime!=null?sdf.format(checkTime):"";
	}
	public CourseSchedule getCourseSchedule() {
		return courseSchedule;
	}
	public void setCourseSchedule(CourseSchedule courseSchedule) {
		this.courseSchedule = courseSchedule;
	}
	public List<ExperimentStandard> getExperimentStandards() {
		return experimentStandards;
	}
	public void setExperimentStandards(List<ExperimentStandard> experimentStandards) {
		this.experimentStandards = experimentStandards;
	}
	public StudentInfo getSubmitter() {
		return submitter;
	}
	public void setSubmitter(StudentInfo submitter) {
		this.submitter = submitter;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public Date getSubmitTime() {
		return submitTime;
	}
	public void setSubmitTime(Date submitTime) {
		this.submitTime = submitTime;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public String getClazzName() {
		return clazzName;
	}
	public void setClazzName(String clazzName) {
		this.clazzName = clazzName;
	}
	public Integer getSignin() {
		return signin;
	}
	public void setSignin(Integer signin) {
		this.signin = signin;
	}
	public Date getSigninTime() {
		return signinTime;
	}
	public void setSigninTime(Date signinTime) {
		this.signinTime = signinTime;
	}
	public Date getStipulateSgininTime() {
		return stipulateSgininTime;
	}
	public void setStipulateSgininTime(Date stipulateSgininTime) {
		this.stipulateSgininTime = stipulateSgininTime;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getReportDescription() {
		return reportDescription;
	}
	public void setReportDescription(String reportDescription) {
		this.reportDescription = reportDescription;
	}
	
}
