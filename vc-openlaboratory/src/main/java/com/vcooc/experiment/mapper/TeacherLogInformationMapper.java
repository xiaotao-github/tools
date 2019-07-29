package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.mapper.SysMapper;

public interface TeacherLogInformationMapper extends SysMapper<TeacherLogInformation>{
	
	/**
	 * 录入教师操作日志
	 * @param logInformation
	 */
	void addTeacherInfoLog(TeacherLogInformation logInformation);
	
	/**
	 * 查询日志信息
	 * @param maxCount ： 最大查询数
	 * @param departmentId：院系ID，若无，查询所有日志信息
	 * @param userId:用户id
	 * @return
	 */
	List<TeacherLogInformation> selectTeacherLogInformation(@Param("maxCount")Integer maxCount,@Param("departmentId") Integer departmentId,@Param("userId")Integer userId);

	/**
	 * 批量删除日志信息
	 * @param array
	 */
	void deleteLogs(Integer[] array);
}
