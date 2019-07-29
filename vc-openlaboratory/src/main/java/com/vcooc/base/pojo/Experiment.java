package com.vcooc.base.pojo;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 实验信息表
 * @author Administrator
 */
@Table(name="experiment")
public class Experiment extends BaseBean {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentId;            //实验ID
	private Integer authorId;                //作者ID
	private String experimentName;           //实验名称
	private Integer needHour;                //需要的时间
	private Integer openStatus;              //开放状态1.不开放  2.院系开放  3.完全开放 - 取消
	private Integer experimentType;          //实验类型 1.设计实验 2.参考实验 3.实物实验
	private Integer level;                   //难易程度  1.容易   2.适中  3.困难
	private String experimentPresentation;   //实验介绍
	private String expandContext;            //拓展实验内容 --暂时取消
	private String experimentInstructor;     //实验指导书 ---改为实验报告模板  --取消
	private String experimentInstructorBag;  //实验指导书备份字段---改为 文件保存路径 
	private Integer stealth;                 //隐藏字段
	private String keyword;                  //关键字  --取消
	private Integer answerShowWay;           //答案展现方式:1.提交后展现	2.批改后展现 3.实验过期后展现  --取消
	private String standardIdentify;         //成绩评定。32位UUID --暂时取消
	@Transient
	private Integer experimentCourseId;
	@Transient
	private TeacherInfo author;//作者信息
	@Transient
	private List<SentenceCompletion> SentenceList; //填空题信息
	@Transient
	private List<ResourceFile> fileList;//资源文件信息 
	@Transient
	private ResourceFile instructor;//实验指导书
	@Transient
	private ResourceFile solution;//实验的标准答案
	@Transient
	private ExperimentCourse experimentCourse; //实验所属的课程信息
	@Transient
	private Map<String,List<String>> fileMap;//资源文件映射  ：flvPath ：flv预览路径	swfPath ： swf预览路径 imgPath ：img预览路径  othersPath：其他资源文件    
	@Transient
	private List<ExperimentStep> steps;//实验下的实验步骤信息
	@Transient
	private List<ExperimentStandard> experimentStandards;
	
	@Transient
	private String  exCourseSchedule;//课程节数
	@Transient
	private String exCourseScheduleByte;//将字节转换为时间暂时存放
	@Transient
	private Date schooltime;//上课日期
	@Transient
	private Integer type; //实验室所属课程的类型/正班级或者自主预约
	
	@Transient
	private String extId;//实验下模板id
	
	@Transient
	private Department department; //院系信息
	
	
	
	public String getExtId() {
		return extId;
	}
	public void setExtId(String extId) {
		this.extId = extId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getAuthorId() {
		return authorId;
	}
	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}
	public String getExperimentName() {
		return experimentName;
	}
	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}
	public Integer getExperimentType() {
		return experimentType;
	}
	public void setExperimentType(Integer experimentType) {
		this.experimentType = experimentType;
	}
	public Integer getLevel() {
		return level;
	}
	public void setLevel(Integer level) {
		this.level = level;
	}
	public String getExperimentPresentation() {
		return experimentPresentation;
	}
	public void setExperimentPresentation(String experimentPresentation) {
		this.experimentPresentation = experimentPresentation;
	}
	public String getExpandContext() {
		return expandContext;
	}
	public void setExpandContext(String expandContext) {
		this.expandContext = expandContext;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public TeacherInfo getAuthor() {
		return author;
	}
	public void setAuthor(TeacherInfo author) {
		this.author = author;
	}
	public List<SentenceCompletion> getSentenceList() {
		return SentenceList;
	}
	public void setSentenceList(List<SentenceCompletion> sentenceList) {
		SentenceList = sentenceList;
	}
	public List<ResourceFile> getFileList() {
		return fileList;
	}
	public void setFileList(List<ResourceFile> fileList) {
		this.fileList = fileList;
	}
	public ResourceFile getInstructor() {
		return instructor;
	}
	public void setInstructor(ResourceFile instructor) {
		this.instructor = instructor;
	}
	public Integer getNeedHour() {
		return needHour;
	}
	public void setNeedHour(Integer needHour) {
		this.needHour = needHour;
	}
	public String getExperimentInstructor() {
		return experimentInstructor;
	}
	public void setExperimentInstructor(String experimentInstructor) {
		this.experimentInstructor = experimentInstructor;
	}
	public String getExperimentInstructorBag() {
		return experimentInstructorBag;
	}
	public void setExperimentInstructorBag(String experimentInstructorBag) {
		this.experimentInstructorBag = experimentInstructorBag;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public Map<String, List<String>> getFileMap() {
		return fileMap;
	}
	public void setFileMap(Map<String, List<String>> fileMap) {
		this.fileMap = fileMap;
	}
	public ResourceFile getSolution() {
		return solution;
	}
	public void setSolution(ResourceFile solution) {
		this.solution = solution;
	}
	public Integer getOpenStatus() {
		return openStatus;
	}
	public void setOpenStatus(Integer openStatus) {
		this.openStatus = openStatus;
	}
	public ExperimentCourse getExperimentCourse() {
		return experimentCourse;
	}
	public void setExperimentCourse(ExperimentCourse experimentCourse) {
		this.experimentCourse = experimentCourse;
	}
	public Integer getAnswerShowWay() {
		return answerShowWay;
	}
	public void setAnswerShowWay(Integer answerShowWay) {
		this.answerShowWay = answerShowWay;
	}
	public List<ExperimentStep> getSteps() {
		return steps;
	}
	public void setSteps(List<ExperimentStep> steps) {
		this.steps = steps;
	}
	public Integer getExperimentCourseId() {
		return experimentCourseId;
	}
	public void setExperimentCourseId(Integer experimentCourseId) {
		this.experimentCourseId = experimentCourseId;
	}
	
	public List<ExperimentStandard> getExperimentStandards() {
		return experimentStandards;
	}
	public void setExperimentStandards(List<ExperimentStandard> experimentStandards) {
		this.experimentStandards = experimentStandards;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj==null){
			return false;
		}
		if(obj == this ){
			return true;
		}
		if (obj instanceof Experiment) {
			Experiment e = (Experiment)obj;
			if( this.getExperimentId()!=null && this.getExperimentId().equals(e.getExperimentId())){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	@Override
	public int hashCode() {
		return this.experimentId+
				this.experimentName==null?0:this.experimentName.hashCode();
	}
	
	
	public String getStandardIdentify() {
		return standardIdentify;
	}
	public void setStandardIdentify(String standardIdentify) {
		this.standardIdentify = standardIdentify;
	}
	public String getExCourseSchedule() {
		return exCourseSchedule;
	}
	public void setExCourseSchedule(String exCourseSchedule) {
		this.exCourseSchedule = exCourseSchedule;
	}
	public String getExCourseScheduleByte() {
		return exCourseScheduleByte;
	}
	public void setExCourseScheduleByte(String exCourseScheduleByte) {
		this.exCourseScheduleByte = exCourseScheduleByte;
	}
	public Date getSchooltime() {
		return schooltime;
	}
	public void setSchooltime(Date schooltime) {
		this.schooltime = schooltime;
	}
	
	
	
}
