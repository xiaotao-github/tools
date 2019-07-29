package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 实验步骤表
 * @author Administrator
 *
 */
@Table(name="experiment_step")
public class ExperimentStep extends BaseBean{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer stepId;//实验步骤id
	private Integer experimentId;//实验id
	private String  title;//实验步骤名称
	private String  content;//步骤内容
	private String  contentText;//步骤内容纯文本
	private String  filePath;//文件路径
	private String  exp1;//保留字段
	private Integer stealth;//伪删除字段
	private Integer stepNum;//步骤序号
	
	@Transient
	private Experiment experiment;//所属实验信息
	
	public Integer getStepNum() {
		return stepNum;
	}
	public void setStepNum(Integer stepNum) {
		this.stepNum = stepNum;
	}
	public Integer getStepId() {
		return stepId;
	}
	public void setStepId(Integer stepId) {
		this.stepId = stepId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getContentText() {
		return contentText;
	}
	public void setContentText(String contentText) {
		this.contentText = contentText;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getExp1() {
		return exp1;
	}
	public void setExp1(String exp1) {
		this.exp1 = exp1;
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

}
