package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.common.mapper.SysMapper;

public interface CourseScheduleMapper extends SysMapper<CourseSchedule> {

	/**
	 * 根据实验室id和周一的日期获取所有排课
	 * 
	 * @param startTime
	 *            起始时间
	 * @param endTime
	 *            结束时间
	 * @param exprimentLabId
	 *            实验室id
	 * @param stealth
	 *            1隐藏，2显示
	 * @param type
	 *            预约类型。可以传null,查出全部。根据业务来 比如:"1,2,3" "4"
	 * @return
	 */
	List<CourseSchedule> AselectByLabId(@Param("startTime") Date startTime, @Param("endTime") Date endTime,
			@Param("exprimentLabId") Integer exprimentLabId, @Param("stealth") Integer stealth,
			@Param("type") String type);

	/**
	 * 根据课程表id查询班级及班级下各个学生的信息 查询各个学生的考勤情况及成绩信息
	 * 
	 * @param scheduleId
	 * @return
	 */
	List<TbClass> getTbClassAndStudent(Integer scheduleId);

	/**
	 * 根据课程表id查询班级下各个小组下各个学生的信息
	 * 
	 * @param scheduleId
	 * @return
	 */
	List<TbClass> getGroupStudent(Integer scheduleId);

	/**
	 * 通过课程表id获取预约的学生
	 * 
	 * @param scheduleId
	 * @return
	 */
	List<TbClass> getAppointStudent(Integer scheduleId);

	/**
	 * 根据课程表id获取实验 不关联课程表信息
	 * 
	 * @param scheduleId
	 * @return
	 */
	Experiment getExperimentByScheduleId(Integer scheduleId);

	/**
	 * 获取教师个人课表
	 * 
	 * @param teacherInfoId
	 * @return
	 */
	List<CourseSchedule> myCourseSchedule(Integer teacherInfoId);

	/**
	 * 根据实验室id和周一的日期获取所有排课 无实验关联 有班级关联
	 * 
	 * @param startTime
	 *            起始时间
	 * @param endTime
	 *            结束时间
	 * @param exprimentLabId
	 *            实验室id
	 * @param stealth
	 *            1隐藏，2显示
	 * @param teacherId
	 *            教师id 可以为空 查出全部
	 * @return
	 */
	List<CourseSchedule> AselectMyScheduleByLabId(@Param("startTime") Date startTime, @Param("endTime") Date endTime,
			@Param("exprimentLabId") Integer exprimentLabId, @Param("stealth") Integer stealth,
			@Param("teacherId") Integer teacherId);

	/**
	 * 根据时间段和实验室 id 获取课程安排信息 无班级关联 有实验关联
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @param exprimentLabId
	 *            实验室id
	 * @param stealth
	 *            隐藏字段
	 * @return
	 */
	List<CourseSchedule> selectScheduleByLabIdAndTime(@Param("startTime") Date startTime,
			@Param("endTime") Date endTime, @Param("exprimentLabId") Integer exprimentLabId,
			@Param("stealth") Integer stealth);

	/**
	 * 查询实验室的使用次数
	 * 
	 * @param labId
	 * @return
	 */
	int selectLabUseCountByLabId(Integer labId);

	/**
	 * 
	 * @param scheduleId
	 * @return
	 */
	CourseSchedule selectScheduleInfoById(Integer scheduleId);

	/**
	 * 查询预约了的学生数量
	 * 
	 * @param scheduleId
	 *            课程表id
	 * @return
	 */
	Integer getAppointStudentSize(@Param("scheduleId") Integer scheduleId);

	/**
	 * 查询上课的类型时间次数不包含午休不统计伪删除
	 * 
	 * @param labId
	 *            实验室Id
	 * @param type
	 *            1 整班上课
	 * @param stealth
	 *            2 显示
	 * @return
	 */
	@Select("SELECT  COUNT(slice) FROM course_schedule WHERE  lab_id = #{labId} AND TYPE =#{type} AND stealth = 2  AND slice IN('A','B','D','E','F')")
	Integer selectCountTime(@Param("labId") Integer labId, @Param("type") Integer type);

	/**
	 * 查询上课类型的时间次数不包含午休不统计伪删除并且指定班级
	 * 
	 * @param classId
	 *            班级Id
	 * @param type
	 *            1 整班上课
	 * @param stealth
	 *            2 显示
	 * @return
	 */
	@Select("SELECT  COUNT(slice) FROM course_schedule WHERE  class_id = #{classId} AND TYPE = #{type} AND stealth = 2  AND slice IN('A','B','D','E','F')")
	Integer selectCountClassTypeTime(@Param("classId") Integer classId, @Param("type") Integer type);

	/**
	 * 实验室Id 查询出所有的信息 此查询是实验室详情列表和导出共用。
	 * 
	 * @param labId
	 * @return
	 */
	List<CourseSchedule> selectfinAllTeacherCourseTypeCalssList(Integer labId);

	/**
	 * 班级获取所属的预约课程信息
	 * @param classId
	 * @return
	 */
	List<CourseSchedule> getCourseScheduleClassData(@Param("classId")Integer classId);

	/**
	 * 获取教师个人课程表明细
	 * @param id 教师id
	 * @return
	 */
	List<CourseSchedule> myCourseScheduleList(@Param("teacherInfoId")Integer teacherInfoId);

	/**
	 * 删除课程表成绩
	 * @param integer
	 * @param scheduleId
	 */
	@Delete("DELETE FROM schedule_student_score WHERE submitter_id = #{stId} AND schedule_id = #{scheduleId}")
	void deleteCourseSchedule(@Param("stId")Integer stId,@Param("scheduleId") Integer scheduleId);

	/**
	 * @param labId 实验室id 
	 * @param thisSelectedMonday 一周的时间
	 * @return
	 */
	List<CourseSchedule> getConreNameClassList(Integer labId, String thisSelectedMonday);

	/**根据实验室id 教师id 获取 教师个人的统计内容 
	 * @param labId
	 * @param thId
	 * @return
	 */
	List<CourseSchedule> selectFinMyCourseTypeCalssList(@Param("labId") Integer labId, @Param("thId") Integer thId);

	/**
	 * 统计当前教师课表总数
	 * @param labId
	 * @param thId
	 * @return
	 */
	Integer selectFinMyCourseNumber(@Param("labId") Integer labId, @Param("thId") Integer thId);

	/**
	 * 获取教师上课的所有课表
	 * @param thId
	 * @return
	 */
	List<CourseSchedule> exportMyAllLabdata(@Param("thId") Integer thId);

}

/**
 * 根据实验室id，某天，某节的排课(多表关联) 关联实验课程 关联任课教师
 * 
 * @param exprimentLabId
 * @param slice
 * @param schooltime
 * @param type
 *            4、私人日程
 * @param stealth
 *            1:隐藏，2:显示 null:全部
 * @return
 */
/*
 * public List<CourseSchedule> selectByLabIdAndSliceAndSchooltimeAndType(
 * 
 * @Param("exprimentLabId") Integer exprimentLabId,
 * 
 * @Param("slice") String slice,
 * 
 * @Param("schooltime") Date schooltime,
 * 
 * @Param("type") String type,
 * 
 * @Param("stealth") Integer stealth); }
 */
