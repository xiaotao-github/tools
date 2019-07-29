package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.StudentExperimentScore;

public interface StudentExperimentScoreMapper {
	
	/**
	 * 根据 实验成绩id 实验评分标准id 查询 实验步骤成绩
	 * @param submitId 成绩id
	 * @param standardId 评分标准id
	 * @return
	 */
	List<ExperimentStandard> selectExperimentStandardStudentscoreByWhere(@Param("submitId")Long submitId,@Param("standardId")String standardIdentify,@Param("experimentType")Integer experimentType);
	
	/**
	 * 载入学生实验成绩
	 * @param studentExperimentSocreList
	 */
	void insertStudentScore(List<StudentExperimentScore> studentExperimentSocreList,@Param("experimentType")Integer experimentType);
	
	/**
	 * 根据条件删除学生实验成绩 
	 * @param ids submitId 数据逗号隔开好了
	 * @param standardId  实验成绩评定id
	 */
	void deleteStudentScoreByWhere(@Param("submitIds")String submitIds,@Param("experimentType")Integer experimentType);
	
	/**
	 * 载入学号  分数
	 * @param studentExperimentScores 分数
	 * @param submitIds 学生成绩
	 */
	void insertStudentListScore(@Param("studentExperimentScores")List<StudentExperimentScore> studentExperimentScores,@Param("experimentType")Integer experimentType);

}
