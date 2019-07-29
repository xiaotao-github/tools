package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 课程表
 * @author admin
 *
 */
@Table(name="course")
public class Course  extends BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//课程id
	private Department department;//所属院系
	private String number;//课程编号
	private String courseName;//课程名称
	private String courseImg;//课程图片
	private Integer type;//课程类型 1.必修、2.选修
	private Integer manCount;//冗余字段，类型为选修课时，选课人数
	private Integer semester;//学期  1.第一学期；2.第二学期；3.第三学期；4.第四学期；	5.第五学期；6.第六学期；7.第七学期；8.第八学期
	private Integer classHour;//总课时
	private String presentation;//课程介绍
	private TeacherInfo teacherInfo;//操作员(teacherInfoId)
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	
	//老师--课程 ，选修（课程--学生），必修（课程--班级）
	private List<StudentInfo> studentInfos;//选修时，课程跟学生关联，一对多。(course_id,student_info_id)
	private List<TbClass> tbClasses;//必修时，课程跟班级关联，一对多。（course_id，tb_class_id）
	private List<TeacherInfo> teacherInfos; //任课老师，一门课程可能由多个老师教，一对多
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
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
	public String getCourseImg() {
		return courseImg;
	}
	public void setCourseImg(String courseImg) {
		this.courseImg = courseImg;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getManCount() {
		return manCount;
	}
	public void setManCount(Integer manCount) {
		this.manCount = manCount;
	}
	public Integer getSemester() {
		return semester;
	}
	public void setSemester(Integer semester) {
		this.semester = semester;
	}
	public Integer getClassHour() {
		return classHour;
	}
	public void setClassHour(Integer classHour) {
		this.classHour = classHour;
	}
	public String getPresentation() {
		return presentation;
	}
	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public List<StudentInfo> getStudentInfos() {
		return studentInfos;
	}
	public void setStudentInfos(List<StudentInfo> studentInfos) {
		this.studentInfos = studentInfos;
	}
	public List<TbClass> getTbClasses() {
		return tbClasses;
	}
	public void setTbClasses(List<TbClass> tbClasses) {
		this.tbClasses = tbClasses;
	}
	public List<TeacherInfo> getTeacherInfos() {
		return teacherInfos;
	}
	public void setTeacherInfos(List<TeacherInfo> teacherInfos) {
		this.teacherInfos = teacherInfos;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	@Override
	public String toString() {
		return "Course [id=" + id + ", department=" + department + ", number=" + number + ", courseName=" + courseName
				+ ", courseImg=" + courseImg + ", type=" + type + ", manCount=" + manCount + ", semester=" + semester
				+ ", classHour=" + classHour + ", presentation=" + presentation + ", teacherInfo=" + teacherInfo
				+ ", stealth=" + stealth + ", studentInfos=" + studentInfos + ", tbClasses=" + tbClasses
				+ ", teacherInfos=" + teacherInfos + ", getId()=" + getId() + ", getDepartment()=" + getDepartment()
				+ ", getNumber()=" + getNumber() + ", getCourseName()=" + getCourseName() + ", getCourseImg()="
				+ getCourseImg() + ", getType()=" + getType() + ", getManCount()=" + getManCount() + ", getSemester()="
				+ getSemester() + ", getClassHour()=" + getClassHour() + ", getPresentation()=" + getPresentation()
				+ ", getTeacherInfo()=" + getTeacherInfo() + ", getStudentInfos()=" + getStudentInfos()
				+ ", getTbClasses()=" + getTbClasses() + ", getTeacherInfos()=" + getTeacherInfos() + ", getStealth()="
				+ getStealth() + ", getCreateTime()=" + getCreateTime() + ", getUpdateTime()=" + getUpdateTime()
				+ ", getCreateTimeToString()=" + getCreateTimeToString() + ", getUpdateTimeToString()="
				+ getUpdateTimeToString() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	
	
}
	