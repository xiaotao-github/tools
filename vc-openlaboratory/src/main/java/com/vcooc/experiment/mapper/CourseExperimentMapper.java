package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.CourseExperiment;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.common.mapper.SysMapper;

public interface CourseExperimentMapper extends SysMapper<CourseExperiment> {
	/**
	 * 根据教师用户ID，查询该教师带领实验课程下的实验信息
	 * @param teacherInfoId 教师用户ID
	 * @return
	 */
	List<ExperimentCourse> selectExperimentCourseAndExperimentByUserId(Integer teacherInfoId);
	
	/**
	 * 根据实验课程ID，查询实验信息
	 * @param experimentId
	 * @return
	 */
	List<Experiment> selectExperimentsByExperimentCourseId(Integer experimentCourseId);
	/**
	 * 根据用户ID和实验ID
	 * @param experimentCourseId
	 * @param teacherInfoId
	 * @param departmentId
	 * @return
	 */
	List<Experiment> selectOtherExperimentByExperimentCourseId(@Param("experimentCourseId")Integer experimentCourseId,@Param("teacherInfoId") Integer teacherInfoId,@Param("departmentId")Integer departmentId);
	
	/**
	 * 将实验分配给课程
	 * @param experimentCourseId  实验课程ID
	 * @param experimentIds 实验ID 数组
	 */
	void distributeExperimentToCourse(@Param("experimentCourseId")Integer experimentCourseId,@Param("experimentIds") Integer[] experimentIds);
	/**
	 * 根据实验课程ID和院系ID，查询不属于该课程下的，院系开放和完全开放的实验
	 * @param experimentCourseId
	 * @param departmentId
	 * @return
	 */
	List<Experiment> selectOtherExperimentByOpenStatus(@Param("experimentCourseId")Integer experimentCourseId,@Param("departmentId")Integer departmentId);

	/**
	 * 根据实验id和班级id，查询该班级下的其它实验的信息
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	List<Experiment> selectClassOtherExperiment(@Param("experimentId")Integer experimentId,@Param("classId")Integer classId);
}
