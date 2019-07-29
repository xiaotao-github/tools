package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentMapper extends SysMapper<Experiment> {
	
	/**
	 * 根据条件查询实验信息，包括作者信息
	 * @param departmentId 院系id 若有，查询院系下的实验   若无，查询所有实验
	 * @param teacherInfoId 教师id 若有，查询该教师的实验 
	 * @param experimentId 实验ID，若有，查询该实验信息
	 * @param stealth 伪删除字段  stealth==1 标识查询删除的   stealth==2标识查询未删除的
	 * @param maxCount 最大查询数
	 * @return
	 */
	List<Experiment> selectExperimentByWhere(@Param("departmentId")Integer departmentId,@Param("teacherInfoId") Integer teacherInfoId,@Param("experimentId") Integer experimentId,@Param("stealth")  Integer stealth,@Param("maxCount") Integer maxCount,@Param("systemIdentify")Integer systemIdentify );
	
	/**
	 * 根据实验ID，查询实验信息
	 * 	查询实验下的资源信息
	 * 		查询实验下的实验指导书信息
	 * 查询实验下的步骤信息
	 * @param experimentId
	 * @return
	 */
	Experiment selectExperimentByExperimentId(Integer experimentId);
	
	/**
	 * 查询实验以及实验下的步骤信息
	 * @param experimentId
	 * @return
	 */
	Experiment selectExperimentAndStepByExperimentId(Integer experimentId);
	/**
	 * 根据实验课程ID，查询实验课程下的设计实验信息
	 * @param experimentCourseId
	 * @return
	 */
	List<Experiment> selectExperimentByExperimentCourseId(Integer experimentCourseId);
	/**
	 * 根据实验课程ID以及stealth，查询实验课程下的设计实验信息
	 * @param experimentCourseId
	 * @return
	 */
	
	List<Experiment> selectExperimentByExperimentCourseIdAndStealth(@Param("experimentCourseId")Integer experimentCourseId,@Param("stealth")Integer stealth,@Param("identify")Integer identify);
	/**
	 * 修改实验开放状态
	 * @param status 状态 1.不开放  2.院系开放 3.完全开放
	 * @param experimentIds 实验ID 数组
	 * @param updateTime 修改时间
	 */
	void updateExperimentStatus(@Param("status")Integer status,@Param("experimentIds")Integer[] experimentIds,@Param("updateTime")Date updateTime);


	/**
	 * 根据课程表Id, 查询课程下的设计实验信息
	 * @param experimentCourseId
	 * @return
	 */
	public List<Experiment> selectExperimentByScheduleId(Integer scheduleId);
	
	/**
	 * 查询实验 以及实验的评分标准
	 * @param experimentId
	 * @return
	 */
	Experiment selectExperimentAndStandByExperimentId(Integer experimentId);

	
	
	/**
	 * 查看全部实验 并且是显示状态
	 * @return
	 */
	List<Experiment> selectExperimentList();
	
}
