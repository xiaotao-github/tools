package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 实验填空题关联表
 * @author Administrator
 *
 */
@Table(name="experiment_sentence")
public class ExperimentSentence {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer experimentSentenceId;
	private Integer experimentId;
	private Integer sentenceCompletionId;
	
	public Integer getExperimentSentenceId() {
		return experimentSentenceId;
	}
	public void setExperimentSentenceId(Integer experimentSentenceId) {
		this.experimentSentenceId = experimentSentenceId;
	}
	public Integer getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(Integer experimentId) {
		this.experimentId = experimentId;
	}
	public Integer getSentenceCompletionId() {
		return sentenceCompletionId;
	}
	public void setSentenceCompletionId(Integer sentenceCompletionId) {
		this.sentenceCompletionId = sentenceCompletionId;
	}
}
