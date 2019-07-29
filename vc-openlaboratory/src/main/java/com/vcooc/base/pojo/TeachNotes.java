package com.vcooc.base.pojo;
import java.util.Date;

/**
 * 教务笔记表
 */
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
@Table(name="teach_notes")
public class TeachNotes {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//教务笔记id
    private Integer teacherInfoId;//教师id
    private Integer stealth;//是否隐藏
    private Integer noteType;
    private String notesContent;//笔记内容
    private Date createTime;
    
    @Transient
    private TeacherInfo teacherInfo;//教师id

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Integer getNoteType() {
		return noteType;
	}

	public void setNoteType(Integer noteType) {
		this.noteType = noteType;
	}

	public String getNotesContent() {
		return notesContent;
	}

	public void setNotesContent(String notesContent) {
		this.notesContent = notesContent;
	}

	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}

	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
