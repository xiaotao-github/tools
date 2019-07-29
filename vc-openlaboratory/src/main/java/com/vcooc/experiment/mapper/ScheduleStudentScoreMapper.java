package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.common.mapper.SysMapper;

public interface ScheduleStudentScoreMapper extends SysMapper<ScheduleStudentScore>{

	/**
	 * 通过班级id查找所有学生id
	 * @param classIds
	 * @return
	 */
	List<Integer> getStudentIdByClassId(@Param("classIds")String classIds);
	
	/**
	 * 批量插入学生课程表成绩
	 * @param scheduleId
	 * @param studentId
	 */
	void initScore(@Param("scheduleId")Integer scheduleId,
			@Param("stipulateSgininTime") Date stipulateSgininTime,
			@Param("studentId")List<Integer> studentId);
	
	/**
	 * 通过课程表和学生id批量删除成绩
	 * @param scheduleId	课程表id
	 * @param groupId 		小组id
	 */
	void deleteScore(@Param("scheduleId")Integer scheduleId,
			@Param("groupId")Integer groupId);

	/**
	 * 批量删除学生成绩
	 * @param scheduleId  课程表id
	 * @param studentIds  学生id串
	 */
	void deleteScoreByStudentId(
			@Param("scheduleId")Integer scheduleId,@Param("studentIds") String studentIds);
	
	/*
	 *根据学生课程表成绩id 查询学生课程实验信息  
	 *  包括 课程实验基本 信息  学生信息
	 */
	ScheduleStudentScore selectByKey(@Param("id") Long id);

	/**
	 * 查询该课程下 其他学生的实验信息
	 * @param scheduleId 课程表id
	 * @param studentScoreId 排除的学生成绩id
	 * @param code 状态
	 * @return
	 */
	List<ScheduleStudentScore> selectOther(@Param("scheduleId")Integer scheduleId,@Param("studentScoreId") Long studentScoreId,@Param("code")Integer code);
	
	/**
	 * 批量修改学生实物实验成绩
	 * @param scheduleStudentScore
	 * @param updateIds
	 */
	void updateStudentScore(@Param("scheduleStudentScore")ScheduleStudentScore scheduleStudentScore,@Param("updateIds")String updateIds);

	/**
	 * 根据教师权限查询学生提交但未批改的成绩信息 
	 * @param teacherId
	 * @param departmentId
	 * @return
	 */
    List<ScheduleStudentScore> selectScoreBySubmitStatus(@Param("teacherId")Integer teacherId,@Param("departmentId")Integer departmentId);

    /**
     * 查询需要导出的实物实验的成绩
     * @param ids 学生成绩id
     * @return
     */
	List<ScheduleStudentScore> selectExportDataByIds(@Param("ids")Integer[] ids);
	/**
	 * 根据课程表id查询该课程表安排下的学生考勤信息
	 * @param shceduleId 课程表id
	 * @return 学生考勤信息
	 */
	List<ScheduleStudentScore> selectScoreByScheduleId(@Param("shceduleId")Integer shceduleId);

	/**
	 * 学生id 课程表id 获取 课程成绩表id
	 * @param integer
	 * @param scheduleId
	 * @return
	 */
	@Select("SELECT schedule_student_score_id FROM  schedule_student_score WHERE submitter_id = #{stId}  AND schedule_id = #{scheduleId}")
	Integer finAllscheduleStudentScoreId(@Param("stId")Integer stId, @Param("scheduleId")Integer scheduleId);
	
	/**根据课程表id 获取 该课程下所有学生的成绩id 
	 * @param shceduleId
	 * @return
	 */
	@Select("SELECT schedule_student_score_id FROM  schedule_student_score WHERE schedule_id = #{scheduleId}")
	List<ScheduleStudentScore> selectkey(@Param("scheduleId")Integer scheduleId);
}
