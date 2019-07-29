package com.vcooc.experiment.dto;

import java.util.ArrayList;
import java.util.List;


import com.vcooc.base.pojo.ExperimentStep;
import com.vcooc.common.util.StringUtil;

public class ExperimentStepDTO {
	List<ExperimentStep> experimentSteps;
	List<String> contentList;
	List<String> contentTextList;

	public List<ExperimentStep> getExperimentSteps() {
		return experimentSteps;
	}

	public void setExperimentSteps(List<ExperimentStep> experimentSteps) {
		this.experimentSteps = experimentSteps;
	}
	
	public List<String> getContentList() {
		return contentList;
	}

	public void setContentList(List<String> contentList) {
		this.contentList = contentList;
	}

	public List<String> getContentTextList() {
		return contentTextList;
	}

	public void setContentTextList(List<String> contentTextList) {
		this.contentTextList = contentTextList;
	}

	public List<ExperimentStep> getHasData(){
		if(experimentSteps!=null){
			List<ExperimentStep> hasData = new ArrayList<>();
			for(int i=0;i<experimentSteps.size();i++){
				if(experimentSteps.get(i)!=null && StringUtil.isNotEmpty(experimentSteps.get(i).getTitle())){
					experimentSteps.get(i).setStepNum(i+1);
					experimentSteps.get(i).setContent(contentList.get(i));
					experimentSteps.get(i).setContentText(contentTextList.get(i));
					hasData.add(experimentSteps.get(i));
				}
			}
			return hasData;
		}else{
			return null;
		}
	}
}
