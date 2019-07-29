package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="sentence_completion")
public class SentenceCompletion extends BaseBean{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer sentenceCompletionId;//填空题id
	private Integer authorId;//作者
	private Integer librarySource;//所属题库
	private Integer level;//难易程度
	private Integer stealth;//伪删除字段
	private String sentenceContext;//填空题内容
	private String sentenceAnswer;//填空题答案
	private String resultInfo;//答案详解
	private Integer integral;//积分(备用)
	private Integer OpenStatus;//开放状态
	
    @Transient
	private TeacherInfo teacherInfo;

	public Integer getAuthorId() {
		return authorId;
	}

	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}

	public Integer getLibrarySource() {
		return librarySource;
	}

	public void setLibrarySource(Integer librarySource) {
		this.librarySource = librarySource;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Integer getStealth() {
		return stealth;
	}

	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}

	public String getSentenceContext() {
		return sentenceContext;
	}

	public void setSentenceContext(String sentenceContext) {
		this.sentenceContext = sentenceContext;
	}

	public String getSentenceAnswer() {
		return sentenceAnswer;
	}

	public void setSentenceAnswer(String sentenceAnswer) {
		this.sentenceAnswer = sentenceAnswer;
	}

	public String getResultInfo() {
		return resultInfo;
	}

	public void setResultInfo(String resultInfo) {
		this.resultInfo = resultInfo;
	}

	public Integer getIntegral() {
		return integral;
	}

	public void setIntegral(Integer integral) {
		this.integral = integral;
	}

	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}

	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}

	public Integer getSentenceCompletionId() {
		return sentenceCompletionId;
	}

	public Integer getOpenStatus() {
		return OpenStatus;
	}

	public void setOpenStatus(Integer openStatus) {
		OpenStatus = openStatus;
	}
    
    

}
