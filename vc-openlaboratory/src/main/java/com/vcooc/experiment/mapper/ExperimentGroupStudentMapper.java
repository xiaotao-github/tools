package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentGroup;
import com.vcooc.base.pojo.ExperimentGroupStudent;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentGroupStudentMapper extends SysMapper<ExperimentGroupStudent>{
	
	/**
	 * 根据学生ID。查询学生的小组信息
	 * 	小组实验
	 * 	小组实验课程
	 * @param studentInfoId
	 * @return
	 */
	List<ExperimentGroup> selectStudentGroupAndCourseAndExperiment(@Param("studentInfoId")Integer studentInfoId,@Param("experimentCourseId")Integer experimentCourseId);
	/**
	 *根据学生ID，查询该学生未过期的实验
	 * @param studentInfoId
	 * @return
	 */
	List<ExperimentGroup> selectExperimentGroupAndExperimentByStudentInfoId(@Param("studentInfoId")Integer studentInfoId,@Param("nowTime")Date nowTime);
	/**
	 * 
	 * 根据学生ID，实验课程ID。查询学生在该实验课程下的小组
	 * @param experimentCourseId 实验课程ID
	 * @param studentInfoId 学生ID
	 * @return
	 */
	List<ExperimentGroup> selectExperimentGroupByCourseIdAndStudentId(@Param("experimentCourseId")Integer experimentCourseId,
			@Param("studentInfoId")Integer studentInfoId);
	/**
	 * 根据实验小组ID，查询实验的信息
	 * 	包括资源所属课程
	 * 	实验的信息
	 * 		实验下的资源文件信息
	 * 该学生对该实验的完成情况
	 * @param experimentGroupId
	 * @param studentInfoId
	 * @return
	 */
	ExperimentGroup selectExperimentGroupByStudentInfoIdAndExperimentGroupId(@Param("experimentGroupId")Integer experimentGroupId,
			@Param("studentInfoId")Integer studentInfoId);
	/**
	 * 根据实验课程ID，实验ID，学生ID，查询该学生在该实验课程下的其他正在进行中的实验
	 * @param experimentGroupId
	 * @param experimentCourseId
	 * @param studentInfoId
	 * @return
	 */
	List<ExperimentGroup> selectOtherExperimentGroupByExperimentGroupIdAndExperimentCourse(@Param("experimentGroupId")Integer experimentGroupId,
			@Param("experimentCourseId")Integer experimentCourseId,@Param("studentInfoId") Integer studentInfoId,@Param("nowTime")Date nowTime );
	
	/**
	 * 将学生批量插入小组中
	 * @param experimentGroupId 实验小组id
	 * @param studentInfoList 学生id信息
	 */
	void insertStudentToGroup(@Param("experimentGroupId")Integer experimentGroupId,@Param("studentIds")List<Integer> studentIds);
	
	/**
	 * 查询  根据小组学生id  查询  学生 实验小组  包括  已完成实验 -- 未完成实验  --- 实验课程  --任课教师  
	 * @param studentInfoId
	 * @return
	 */
	List<ExperimentGroup> selectStudentGroupByStudentId(Integer studentInfoId);
}
