package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="student_notes")
public class StudentNotes extends BaseBean{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer studentNotesId;
	private Integer studentInfoId;
	private Integer noteType;
	private Integer relevanceId;
	private String notesContent;
	
	
	//自定义
	@Transient
	private String experimentName;//实验名称
	@Transient
	private StudentInfo studentInfo;

	public Integer getStudentNotesId() {
		return studentNotesId;
	}

	public void setStudentNotesId(Integer studentNotesId) {
		this.studentNotesId = studentNotesId;
	}

	public Integer getStudentInfoId() {
		return studentInfoId;
	}

	public void setStudentInfoId(Integer studentInfoId) {
		this.studentInfoId = studentInfoId;
	}

	public Integer getNoteType() {
		return noteType;
	}

	public void setNoteType(Integer noteType) {
		this.noteType = noteType;
	}

	public Integer getRelevanceId() {
		return relevanceId;
	}

	public void setRelevanceId(Integer relevanceId) {
		this.relevanceId = relevanceId;
	}

	public String getNotesContent() {
		return notesContent;
	}

	public void setNotesContent(String notesContent) {
		this.notesContent = notesContent;
	}

	public StudentInfo getStudentInfo() {
		return studentInfo;
	}

	public void setStudentInfo(StudentInfo studentInfo) {
		this.studentInfo = studentInfo;
	}

	public String getExperimentName() {
		return experimentName;
	}

	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}
}
