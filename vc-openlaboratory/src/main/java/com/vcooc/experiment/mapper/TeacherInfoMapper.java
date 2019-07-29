package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.TeacherInfo;

public interface TeacherInfoMapper {
	/**
	 * 根据教师信息查询教师id
	 * @param userId
	 * @return
	 */
	TeacherInfo findTeacherInfoByUserId(Integer userId);
	/**
	 * 查询实验课程下的任课教师
	 * @param experimentCourseId
	 * @return
	 */
	List<TeacherInfo> selectExperimentCourseTeacher(Integer experimentCourseId);
	/**
	 * 根据教师名称查询教师id
	 * @param sSearch
	 * @return
	 */
	Integer findTeacherIdByName(@Param("sSearch")String sSearch);
}
