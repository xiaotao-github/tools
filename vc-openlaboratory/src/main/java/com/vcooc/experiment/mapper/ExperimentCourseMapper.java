package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentCourseMapper extends SysMapper<ExperimentCourse>{
	
	/**
	 * 根据条件查询实验课程信息
	 * 	包括任课教师
	 * 	包括课程的所属院系
	 * 	包括操作员
	 *   包括实验课程下的参考实验、设计实验
	 * @param departmentId 院系ID
	 * @param stealth 伪删除字段
	 * @param MAX_COUNT 最大查询数
	 * @return List<ExperimentCourse>
	 */
	List<ExperimentCourse> selectExperimentCourseByWhere(@Param("departmentId")Integer departmentId, @Param("stealth")Integer stealth, @Param("maxCount")Integer MAX_COUNT);
	
	/**
	 * 根据任课教师ID，查询分配给该教师的实验课程信息
	 * @param teacherInfoId 任课教师ID
	 * @param stealth 伪删除字段
	 * @return List<ExperimentCourse>
	 */
	List<ExperimentCourse> selectTeacherExperimentCourseByTeacherInfoId(@Param("teacherInfoId")Integer teacherInfoId,@Param("stealth")Integer stealth);
	
	/**
	 * 根据实验课程ID，查询实验课程信息
	 * @param experimentCourseId 实验课程ID
	 * @return
	 */
	ExperimentCourse selectExperimentCourseById(Integer experimentCourseId);
	/**
	 * 根据实验id，查询实验课程信息
	 * @param experimentId
	 * @return
	 */
	List<ExperimentCourse> selectCourseByExperimentId(Integer experimentId);
	
	/**
	 * 根据学生id  查询 学生
	 * @param studentInfoId
	 * @return
	 */
	List<ExperimentCourse> selectStudentExperimentCourseByStudentId(Integer studentInfoId);
	
	/**
	 * 查询课程以及课程下的实验信息
	 * @param courseId
	 * @return
	 */
	ExperimentCourse selectCourseAndExprimentByCourseId(@Param("courseId")Integer courseId,@Param("systemIdentify")Integer systemIdentify);
	
	/**
	 * 根据学生id 查询其他实验室信息
	 * @param studentInfoId
	 * @param experimentCourseId
	 * @return
	 */
	List<ExperimentCourse> selectOtherExperimentCourseByStudentInfoId(@Param("studentInfoId")Integer studentInfoId,
			@Param("experimentCourseId")Integer experimentCourseId);

}
