package com.vcooc.experiment.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ScourseGroup;
import com.vcooc.base.pojo.ScourseGroupStudent;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.experiment.mapper.ScourseGroupStudentMapper;

@Service
public class ScourseGroupStudentService {
	@Autowired
	private ScourseGroupStudentMapper scourseGroupStudentMapper;
	/**
	 * 添加小组多个学生
	 * @param groupId    小组id
	 * @param studentId  学生id
	 */
	public void addGroupStudent(Integer groupId,Integer[] studentId){
		if(groupId != null && studentId != null && studentId.length>0)
		scourseGroupStudentMapper.addGroupStudent(groupId, studentId);
	}
	
	
	/**
	 * 添加小组多个学生
	 * @param groupId    小组id
	 * @param studentId  学生id
	 */
	public void addGroupStudent(Integer groupId,List<Integer> studentId){
		if(studentId != null && studentId.size()>0){
			Integer[] result = new Integer[studentId.size()];
			for(int i=0; i<studentId.size(); i++) result[i] = studentId.get(i);
			addGroupStudent(groupId, result);
		}
	}
	
	/**
	 * 查询没有添加进小组的学生
	 * @param scheduleId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	public List<StudentInfo> getNoGroupStudent(Integer scheduleId,Integer classId){
		return scourseGroupStudentMapper.getNoGroupStudent(scheduleId,classId);
	}
	
	
	/**
	 * 通过小组id删除小组成员
	 * @param groupId
	 */
	public void deleteByGroupId(Integer groupId){
		ScourseGroupStudent key = new ScourseGroupStudent();
		key.setGroupId(groupId);
		scourseGroupStudentMapper.delete(key);
	}
	
	
	/**
	 * 通过小组id获取小组信息和小组成员信息(小组成员只有名字、学号、头像)
	 * @param groupId
	 * @return
	 */
	public ScourseGroup getGroupAndGroupMember(Integer groupId){
		return scourseGroupStudentMapper.getGroupAndGroupMember(groupId);
	}
	
	/**
	 * 通过小组id获取在这个班级下，还没有分配小组的学生
	 * 		如果不在这个小组，在这个课程表的这个班的其他小组成员，不会查询出来
	 * @param groupId
	 * @return
	 */
	public List<StudentInfo> getOtherStudent(Integer groupId){
		return scourseGroupStudentMapper.getOtherStudent(groupId);
	}
	
	/**
	 * 删除小组成员
	 * @param scheduleId
	 * @param groupId
	 * @param studentId
	 */
	public void DeleteGroupMember(Integer groupId,List<Integer> studentId){
		if(groupId != null && studentId != null && studentId.size()>0){
			String result = "";
			for(Integer i:studentId) result+=i+",";
			scourseGroupStudentMapper.deleteGroupMember(groupId,result.substring(0,result.length()-1));
		}
	}
	
	
	/**
	 * 获取这个课程表下所有的学生
	 * @param scheduleId
	 * @return
	 */
	public Integer[] getScheduleStudent(Integer scheduleId){
		return scourseGroupStudentMapper.getScheduleStudent(scheduleId);
	}
}
