package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="course_schedule")
public class CourseSchedule extends BaseBean implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer scheduleId;           //课程表id
	private Integer courseId;               //课程id
	private Integer experimentId;           //实验id
	private Integer operatorId;             //操作人id
	private Integer labId;                  //实验室id
	private Integer type;                   //1.整班上课      2.	小组协作       3.自主预约      4.	私人日程
	private Integer classId;                //班级id
	private String  slice;                  //A.1-2节  8:30-10:00     B.3-4节 10:30-12:00  C.午休  12:30 - 14:00   D.5-6节 14:00 - 15:30  E.7-8节 16:00 - 17:30 F.9-10节 19:00 - 20:300 
	private Date    schooltime;             //上课时间(格式化到日)
	private String  presentation;           //排课说明
	private Integer  seats;                   //自主预约总工位数
	private Integer remainingSeats;			//剩余工位数
	private Integer stealth;                //1、隐藏      2、显示
	private Integer deputy;					//预约排课课程负责人(学生id)
	
	@Transient
	private Integer courseScheduleClassId;//课程班级id标识
	@Transient
	private ExperimentCourse experimentCourse; //实验课程详细情况
	@Transient
	private TeacherInfo teacherInfo;//任课教师
	@Transient
	private Experiment experiment;//所属实验信息
	@Transient
	private Integer appoinNum ;//已预约人数
	@Transient
	private List<TbClass> tbClassList;     //关联班级
	@Transient
	private ScheduleClass scheduleClass;//课程班级中间表
	
	@Transient
	private String attendTime; //上课时间
	@Transient
	private Integer isNow;//是否正在上课  0.不是    1.是
	
	@Transient
	private  ExperimentLab experimentLab;//实验室
	
	@Transient
	private List<TeacherInfo> teacherInfoList;     //实验课程下教师
	
	@Transient
	private Integer isPastTimes;//告知前端这是已经预约过的字段
	@Transient
	private String newSchooltime; //临时存放时间，用于预约实验的冲突判断
	@Transient
	private ScourseStudent scourseStudent ; //自主预约表 
	@Transient
	private Integer rowno;//伪列
	@Transient
	private String sliceByte; //字节标识符转换为字节
	@Transient
	private Long timeStamp;//上课时间的时间戳，用于判断上课的时间如果大于当前？即不可修改：否可以
	
	
	
	public Integer getDeputy() {
		return deputy;
	}
	public void setDeputy(Integer deputy) {
		this.deputy = deputy;
	}
	public Long getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(Long timeStamp) {
		this.timeStamp = timeStamp;
	}
	public Integer getRowno() {
		return rowno;
	}
	public void setRowno(Integer rowno) {
		this.rowno = rowno;
	}
	public ScheduleClass getScheduleClass() {
		return scheduleClass;
	}
	public void setScheduleClass(ScheduleClass scheduleClass) {
		this.scheduleClass = scheduleClass;
	}
	public Integer getRemainingSeats() {
		return remainingSeats;
	}
	public void setRemainingSeats(Integer remainingSeats) {
		this.remainingSeats = remainingSeats;
	}
	public ScourseStudent getScourseStudent() {
		return scourseStudent;
	}
	public void setScourseStudent(ScourseStudent scourseStudent) {
		this.scourseStudent = scourseStudent;
	}
	public String getNewSchooltime() {
		return newSchooltime;
	}
	public void setNewSchooltime(String newSchooltime) {
		this.newSchooltime = newSchooltime;
	}
	
	public Integer getIsPastTimes() {
		return isPastTimes;
	}
	public void setIsPastTimes(Integer isPastTimes) {
		this.isPastTimes = isPastTimes;
	}
	

	public List<TeacherInfo> getTeacherInfoList() {
		return teacherInfoList;
	}
	public void setTeacherInfoList(List<TeacherInfo> teacherInfoList) {
		this.teacherInfoList = teacherInfoList;
	}
	public List<TbClass> getTbClassList() {
		return tbClassList;
	}
	public void setTbClassList(List<TbClass> tbClassList) {
		this.tbClassList = tbClassList;
	}
	public String getSchooltimeToString(){
		if(schooltime!=null){
			return sdf.format(schooltime);
		}
		return "";
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
	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	public Integer getCourseId() {
		return courseId;
	}
	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getClassId() {
		return classId;
	}
	public void setClassId(Integer classId) {
		this.classId = classId;
	}
	public String getSlice() {
		return slice;
	}
	public void setSlice(String slice) {
		this.slice = slice;
	}
	public Date getSchooltime() {
		return schooltime;
	}
	public void setSchooltime(Date schooltime) {
		this.schooltime = schooltime;
	}
	public String getPresentation() {
		return presentation;
	}
	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}

	public Integer getSeats() {
		return seats;
	}
	public void setSeats(Integer seats) {
		this.seats = seats;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public Experiment getExperiment() {
		return experiment;
	}
	public void setExperiment(Experiment experiment) {
		this.experiment = experiment;
	}
	public Integer getAppoinNum() {
		return appoinNum;
	}
	public void setAppoinNum(Integer appoinNum) {
		this.appoinNum = appoinNum;
	}
	public String getAttendTime() {
		return attendTime;
	}
	public void setAttendTime(String attendTime) {
		this.attendTime = attendTime;
	}
	public Integer getIsNow() {
		return isNow;
	}
	public void setIsNow(Integer isNow) {
		this.isNow = isNow;
	}
	public Integer getCourseScheduleClassId() {
		return courseScheduleClassId;
	}
	public void setCourseScheduleClassId(Integer courseScheduleClassId) {
		this.courseScheduleClassId = courseScheduleClassId;
	}
	public String getSliceByte() {
		return sliceByte;
	}
	public void setSliceByte(String sliceByte) {
		this.sliceByte = sliceByte;
	}
	public ExperimentLab getExperimentLab() {
		return experimentLab;
	}
	public void setExperimentLab(ExperimentLab experimentLab) {
		this.experimentLab = experimentLab;
	}
	
	
}
