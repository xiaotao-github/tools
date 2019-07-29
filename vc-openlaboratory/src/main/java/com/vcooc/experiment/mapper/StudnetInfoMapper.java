package com.vcooc.experiment.mapper;

import java.util.List;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.mapper.SysMapper;

public interface StudnetInfoMapper extends SysMapper<StudentInfo>{

	/**
	 * 查询班级下所有学生id 
	 * @param classId
	 * @return
	 */
	List<Integer> selectStudentIdsByClassId(Integer classId);
	
     	
}
