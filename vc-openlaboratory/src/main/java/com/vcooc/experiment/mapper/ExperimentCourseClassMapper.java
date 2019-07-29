package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentCourseClass;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentCourseClassMapper extends SysMapper<ExperimentCourseClass> {
	/**
	 * 根据实验ID，查询实验下的课程信息
	 * @param experimentCourseId
	 * @return
	 */
	List<TbClass> selectExperimentCourseCalssByExperimentCourseId(Integer experimentCourseId);
	/**
	 * 根据条件，查询班级信息
	 * @param departmentId 院系ID
	 * @param stealth 伪删除字段
	 * @return
	 */
	List<TbClass> selectAllTbClassByWhere(@Param("departmentId")Integer  departmentId,@Param("stealth") Integer stealth);
	/**
	 *分配新的班级进实验课程中 
	 * @param experimentCourseId
	 * @param classIds
	 */
	void distributeTeacherToExperimentCourse(@Param("experimentCourseId")Integer experimentCourseId,@Param("classIds")Integer[] classIds);
	/**
	 * 根据实验课程ID 和班级ID 删除实验课程班级关联数据
	 * @param experimentCourseId  实验课程ID
	 * @param oldClassIds 班级ID 数组
	 */
	void deleExperimentCourseClassByExperimentCourseIdAndOldClassIds(@Param("experimentCourseId")Integer experimentCourseId,@Param("oldClassIds") Integer[] oldClassIds);


	/**
	 * 通过课程表id获取下面的班级
	 * @param scheduleId
	 * @return
	 */
	public List<TbClass> selectClassByScheduleId(Integer scheduleId);
}
