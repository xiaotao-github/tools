package com.vcooc.experiment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.StudentExperimentScore;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.mapper.StudentExperimentScoreMapper;
import com.vcooc.util.convertor.StringToStudentExperimentScoreConvertor;

/**
 * 学生实验成绩分数表
 * @author Administrator
 *
 */
@Service
public class StudentExperimentSocreService {
	
	@Autowired
	private StudentExperimentScoreMapper studentExperimentSocreMapper;
	
	/**
	 * 根据 提交id   分数评定id 查询学生实验成绩     根据 序号 number 排序
	 * @param submitId
	 * @param standardId
	 * @return
	 */
	public List<ExperimentStandard> selectExperimentStandardStudentscoreByWhere(Long submitId,String standardIdentify,Integer experimentType){
		if(submitId == null || standardIdentify==null){
			throw new RuntimeException("【查询学生实验成绩】 实验成绩id或实验评定标准id为空：submitId="+submitId+",standardId="+standardIdentify);
		}
		return studentExperimentSocreMapper.selectExperimentStandardStudentscoreByWhere(submitId,standardIdentify,experimentType);
	}
	
	/**
	 * 载入学生实验成绩
	 */
	public Double insertStudentScore(String studentScore,String standardId,String submitId,Integer experimentType){
		double sum = 0;
		if(StringUtil.isNotEmpty(standardId) && StringUtil.isNotEmpty(studentScore)){
			//删除旧的实验成绩数据
			studentExperimentSocreMapper.deleteStudentScoreByWhere(submitId,experimentType);
			//导入新的实验成绩数据
			String[] scores= studentScore.split(",");
			String[] standardIds = standardId.split(",");
			String[] submitIds = submitId.split(",");
			for (String str : scores) {
				sum += Double.parseDouble(str);
			}
			List<StudentExperimentScore> StudentExperimentScores = StringToStudentExperimentScoreConvertor.convertor(scores, standardIds,submitIds);
			studentExperimentSocreMapper.insertStudentListScore(StudentExperimentScores,experimentType);
		}
		return sum;
	}
}
