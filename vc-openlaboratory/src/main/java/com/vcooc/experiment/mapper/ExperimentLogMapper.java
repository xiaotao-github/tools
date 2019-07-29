package com.vcooc.experiment.mapper;

import java.util.List;


import com.vcooc.base.pojo.ExperimentLog;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentLogMapper extends SysMapper<ExperimentLog>{

	void updateExperimentLog(List<ExperimentLog> list);

}
