package com.vcooc.base.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 实验小组关联表
 * @author Administrator
 *
 */
/**
 * @author Administrator
 *
 */
@Table(name="experiment_group")
public class ExperimentGroup extends BaseBean {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentGroupId; //id
	private String groupName; //小组名称
	private Integer tbClassId;//班级ID
	private Integer experimentCourseId; //实验课程ID
	private Integer experimentId;//实验ID
	private Integer teacherInfoId;//创建的教师ID
	private Date startTime;//开始时间
	private Date endTime;//结束时间
	private Integer groupType;//小组类型
	
	@Transient
	private TbClass tbClass;//班级信息
	@Transient
	private ExperimentCourse experimentCourse;//实验课程信息
	@Transient
	private Experiment experiment;//实验信息
	@Transient
	private SubmitExperimentFile submitExperimentFile;//学生提交的实验结果
	@Transient
	private TeacherInfo teacherInfo;//创建小组的教师信息
	@Transient
	private List<StudentInfo> studentInfoList;//小组下的学生信息
	@Transient
	private List<StudentInfo> notGroupStudentInfoList;//实验下下未分配小组的学生
	@Transient
	private Integer experimentStatus;//实验状态 1.即将开始  2.进行中  3.已过期
	@Transient
	private String studentListName;//用于前台截取
	@Transient
	private String departmentName;//该小组所属院系
	@Transient
	private Integer submitStatus;//学生实验状态 临时字段
	
	
	
	public String getStudentListName() {
		return studentListName;
	}
	public void setStudentListName(String studentListName) {
		this.studentListName = studentListName;
	}
	public Integer getExperimentGroupId() {
		return experimentGroupId;
	}
	public void setExperimentGroupId(Integer experimentGroupId) {
		this.experimentGroupId = experimentGroupId;
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
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
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
	public Integer getGroupType() {
		return groupType;
	}
	public void setGroupType(Integer groupType) {
		this.groupType = groupType;
	}
	public TbClass getTbClass() {
		return tbClass;
	}
	public void setTbClass(TbClass tbClass) {
		this.tbClass = tbClass;
	}
	public ExperimentCourse getExperimentCourse() {
		return experimentCourse;
	}
	public void setExperimentCourse(ExperimentCourse experimentCourse) {
		this.experimentCourse = experimentCourse;
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
	public List<StudentInfo> getStudentInfoList() {
		return studentInfoList;
	}
	public void setStudentInfoList(List<StudentInfo> studentInfoList) {
		this.studentInfoList = studentInfoList;
	}
	public SubmitExperimentFile getSubmitExperimentFile() {
		return submitExperimentFile;
	}
	public void setSubmitExperimentFile(SubmitExperimentFile submitExperimentFile) {
		this.submitExperimentFile = submitExperimentFile;
	}
	public List<StudentInfo> getNotGroupStudentInfoList() {
		return notGroupStudentInfoList;
	}
	public void setNotGroupStudentInfoList(List<StudentInfo> notGroupStudentInfoList) {
		this.notGroupStudentInfoList = notGroupStudentInfoList;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setExperimentStatus(Integer experimentStatus) {
		this.experimentStatus = experimentStatus;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public Integer getSubmitStatus() {
		return submitStatus;
	}
	public void setSubmitStatus(Integer submitStatus) {
		this.submitStatus = submitStatus;
	}
	public Integer getExperimentStatus() {
		Date now = new Date();
		if(startTime!=null && endTime!=null){
			if(now.before(startTime)){
				return 1;
			}else if(now.before(endTime)){
				return 2;
			}else{
				return 3;
			}
		}else{
			return 3;
		}
	}
	/**
	 *页面展示需要，优化效率，将时间转化为字符串格式
	 * @return
	 */
	public String getEndTimeToString(){
		if(endTime!=null){
			return super.sdf.format(endTime);
		}
		return "";
	}
	/**
	 *页面展示需要，优化效率，将时间转化为字符串格式
	 * @return
	 */
	public String getStartTimeToString(){
		if(startTime!=null){
			return sdf.format(startTime);
		}
		return "";
	}
}
