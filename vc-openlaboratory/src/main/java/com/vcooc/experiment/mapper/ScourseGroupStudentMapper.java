package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ScourseGroup;
import com.vcooc.base.pojo.ScourseGroupStudent;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.mapper.SysMapper;

public interface ScourseGroupStudentMapper extends SysMapper<ScourseGroupStudent>{

	/**
	 * 查询小组下学生id 
	 * @param groupId
	 * @return
	 */
	List<Integer> selectStudentIdsByGroupId(Integer groupId);
	
	/**
	 * 添加学生小组
	 * @param groupId  小组id
	 * @param studentId  学生id
	 */
	public void addGroupStudent(@Param("groupId")Integer groupId,
			@Param("studentId")Integer[] studentId);
	
	
	/**
	 * 查询没有添加进小组的学生
	 * @param scheduleId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	public List<StudentInfo> getNoGroupStudent(
			@Param("scheduleId")Integer scheduleId,@Param("classId")Integer classId);
	
	
	/**
	 * 通过小组id获取小组信息和小组成员信息(小组成员只有名字、学号、头像)
	 * @param groupId
	 * @return
	 */
	public ScourseGroup getGroupAndGroupMember(Integer groupId);
	
	
	/**
	 * 通过小组id获取在这个班级下，还没有分配小组的学生
	 * 		如果不在这个小组，在这个课程表的这个班的其他小组成员，不会查询出来
	 * @param groupId
	 * @return
	 */
	public List<StudentInfo> getOtherStudent(Integer groupId);
	
	
	/**
	 * 删除小组成员
	 * @param scheduleId
	 * @param groupId
	 * @param deleteList
	 */
	void deleteGroupMember(@Param("groupId")Integer groupId,@Param("studentIds") String studentIds);

	/**
	 * 获取这个课程表下所有的学生
	 * @param scheduleId
	 * @return
	 */
	Integer[] getScheduleStudent(Integer scheduleId);
}
