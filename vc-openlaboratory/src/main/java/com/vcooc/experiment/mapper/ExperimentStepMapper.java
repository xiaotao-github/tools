package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentStep;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentStepMapper extends SysMapper<ExperimentStep>{
	
	/**
	 * 批量添加实验步骤
	 * @param steps
	 */
	void addSteps(@Param("steps")List<ExperimentStep> steps);
	
	/**
	 * 查询实验下的实验步骤信息
	 * @param experimentId
	 * @return
	 */
	List<ExperimentStep> selectByExperimentId(Integer experimentId);
	
	/**
	 * 根据实验id 删除实验下的步骤
	 * @param experimentId
	 */
	void deleteByExperimentId(Integer experimentId);
}
