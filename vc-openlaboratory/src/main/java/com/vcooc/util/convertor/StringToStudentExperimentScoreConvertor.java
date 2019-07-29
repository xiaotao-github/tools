package com.vcooc.util.convertor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.vcooc.base.pojo.StudentExperimentScore;

public class StringToStudentExperimentScoreConvertor {
	
	public static List<StudentExperimentScore> convertor(String[] scores,String[] standardIds,String[] submitIds){
		
		
		List<StudentExperimentScore> list = new ArrayList<StudentExperimentScore>();
		for (String submitId : submitIds) {
			for(int i =0;i<standardIds.length;i++){
				StudentExperimentScore studentExperimentScore = new StudentExperimentScore();
				studentExperimentScore.setExperimentScoreId(UUID.randomUUID().toString());
				studentExperimentScore.setStandardId(Long.valueOf(standardIds[i]));
				studentExperimentScore.setScore(Double.valueOf(scores[i]));
				studentExperimentScore.setSubmitId(Integer.valueOf(submitId));
				list.add(studentExperimentScore);
			}
		}
		return list;
	}

}
