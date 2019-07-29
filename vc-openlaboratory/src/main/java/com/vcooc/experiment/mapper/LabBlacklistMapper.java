package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.LabBlacklist;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.mapper.SysMapper;

public interface LabBlacklistMapper extends SysMapper<LabBlacklist> {
	
	List<StudentInfo> list();

	LabBlacklist selectByUserId(@Param("studentId")Integer studentId);

}
