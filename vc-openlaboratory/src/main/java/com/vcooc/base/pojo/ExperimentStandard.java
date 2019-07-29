package com.vcooc.base.pojo;


import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name="experiment_standard")
public class ExperimentStandard extends BaseBean{

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long standardId;             
	private String standardIdentify;     //实验相关联  UUID
	private Integer number;              //编号
	private String presentation;         //评分描述
	private String standTitle;           //标题--改成  报告内容
	private double score;                //评分标准的分数
	private Integer stealth;             //1、隐藏；2、显示
	private String exp1;                 //备用
	
	@Transient
	private Double studentScore; //学生分数
	
	public String getExp1() {
		return exp1;
	}
	public void setExp1(String exp1) {
		this.exp1 = exp1;
	}
	public Long getStandardId() {
		return standardId;
	}
	public void setStandardId(Long standardId) {
		this.standardId = standardId;
	}
	public String getStandardIdentify() {
		return standardIdentify;
	}
	public void setStandardIdentify(String standardIdentify) {
		this.standardIdentify = standardIdentify;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public String getPresentation() {
		return presentation;
	}
	public void setPresentation(String presentation) {
		this.presentation = presentation;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public String getStandTitle() {
		return standTitle;
	}
	public void setStandTitle(String standTitle) {
		this.standTitle = standTitle;
	}
	public Double getStudentScore() {
		return studentScore;
	}
	public void setStudentScore(Double studentScore) {
		this.studentScore = studentScore;
	}
}
