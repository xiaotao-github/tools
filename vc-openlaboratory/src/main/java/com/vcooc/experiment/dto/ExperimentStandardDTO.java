package com.vcooc.experiment.dto;

import java.util.ArrayList;
import java.util.List;

import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.common.util.StringUtil;

public class ExperimentStandardDTO{
	List<ExperimentStandard> experimentStandards;

	public List<ExperimentStandard> getExperimentStandards() {
		return experimentStandards;
	}

	public void setExperimentStandards(List<ExperimentStandard> experimentStandards) {
		this.experimentStandards = experimentStandards;
	}
	public List<ExperimentStandard> getHasData(){
		if(experimentStandards!=null){
			List<ExperimentStandard> hasData = new ArrayList<>();
			 for(int i=0;i<experimentStandards.size();i++){
				if(experimentStandards.get(i) != null && StringUtil.isNotEmpty(experimentStandards.get(i).getPresentation())){
					experimentStandards.get(i).setNumber(i);
					hasData.add(experimentStandards.get(i));
				}
			}
			return hasData;
		}else{
			return null;
		}
	}

}
