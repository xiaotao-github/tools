package com.vcooc.experiment.mapper;

import java.util.List;

import com.vcooc.base.pojo.LabManager;
import com.vcooc.common.mapper.SysMapper;

public interface LabManagerMapper extends SysMapper<LabManager>{

	
	public void insertList(List<LabManager> list);
}
