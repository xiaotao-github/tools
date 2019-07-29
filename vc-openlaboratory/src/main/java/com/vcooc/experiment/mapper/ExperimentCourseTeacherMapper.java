package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentCourseTeacher;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentCourseTeacherMapper extends SysMapper<ExperimentCourseTeacher> {
	/**
	 * 添加新的 实验课程-教师 数据关联表
	 * @param experimentCourseId
	 * @param teacherInfoIds
	 */
	void addExperimentCourseTeacher(@Param("experimentCourseId")Integer experimentCourseId,@Param("teacherInfoIds") List<Integer> teacherInfoIds);

}
