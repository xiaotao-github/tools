package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ClockingIn;
import com.vcooc.common.mapper.SysMapper;

public interface ClockingInMapper extends SysMapper<ClockingIn>{
         
	/**
	 *   批量班级下所有学生插入考勤信息或者小组成员考勤 
	 * @param list
	 * @param record
	 */
	void addClockInForClassOrGroup(@Param("list")List<Integer> list, @Param("record")ClockingIn record);
    
	
	/**
	 * 插入学生考勤
	 * @param record
	 */
	void addClockInForStudent(@Param("record")ClockingIn record);
	
	/**
	 * 查询课程表下已经录入的学生id 
	 * @param scheduleId
	 * @return
	 */
	List<Integer> selectStudentIdsByScheduleId(Integer scheduleId);
	
/**
 * 查询学生id以及排课id查询学生是否已录入考勤信息 
 * @param studentId
 * @param scheduleId
 * @return
 */
	Integer selectClockingIdByStudentIdAndScheduleId(@Param("studentId")Integer studentId,@Param("scheduleId")Integer scheduleId);

	
	/**
     * 删除课程表下的考勤信息
     * @param scheduleId 课程表id
     * @param studentIds 学生id
     */
	void deleteClockingIn(@Param("scheduleId")Integer scheduleId, @Param("studentIds")String studentIds);
}

