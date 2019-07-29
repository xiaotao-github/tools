package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ScheduleClass;
import com.vcooc.base.pojo.ScourseStudent;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.common.mapper.SysMapper;

public interface ScheduleClassMapper extends SysMapper<ScheduleClass>{
	
	/**
	 * 插入多条关联信息
	 * @param scheduleId 课程表id
	 * @param classIds   班级id
	 * @param date       创建时间/更新时间,使用数据库NOW()方法也可以，效率没这个高
	 */
	public void insertByArray(@Param("scheduleId")Integer scheduleId,
			@Param("classIds")Integer[] classIds,@Param("date")Date date);

	
	/**
	 * 伪删除多条数据
	 * @param scheduleId
	 * @param classIds
	 */
	public void deleteByArray(@Param("scheduleId")Integer scheduleId,
			@Param("classIds")Integer[] classIds);


	/**
	 * 插入多条关联信息
	 * @param scheduleId 课程表id
	 * @param classIds   班级id
	 */
	public void insertByList(@Param("scheduleId")Integer scheduleId,
			@Param("classIds")List<Integer> classIds);
	
	/**
	 * 添加可以添加的班级
	 * @param scheduleId
	 * @return
	 */
	public List<TbClass> addAllowTbClass(Integer scheduleId);
	
	
	
	/**
	 * 通过课程表id查询哪些班级是存在的数据
	 * 		业务描述:插入班级数据是软删除，如果那条数据已存在，那么恢复就好了，不用再去初始化成绩表
	 * @param scheduleId
	 * @param classIds
	 * @return
	 */
	public List<ScheduleClass> selectDeletedByScheduleIdAndClassId(@Param("scheduleId")Integer scheduleId,
			@Param("classIds")Integer[] classIds);
	
	
	/**
	 * 修改多条关联信息
	 * @param scheduleId 课程表id
	 * @param classIds   班级id,逗号分隔
	 */
	public void updateStealth(@Param("scheduleId")Integer scheduleId,
			@Param("classIds")String classIds,@Param("stealth")Integer stealth);
	
	/**
	 * 根据课程表id查询信息
	 * @param scheduleId
	 * @return
	 */
	public List<ScheduleClass> selectScheduleClassByScheduldeId(Integer scheduleId);

	/**
	 * 根据课程表id 查询已经在该课程表下的班级
	 * @param scheduleId
	 * @return
	 */
	public List<TbClass> addExitedTbClass(Integer scheduleId);


	/**
	 * 课程表id 学生id 获取在自主预约表下的自增id
	 * @param integer
	 * @param scheduleId
	 * @return
	 */
	@Select("SELECT scourse_student_id FROM scourse_student WHERE student_id = #{stId} AND schedule_id = #{scheduleId}")
	String scheduleClassMapperfinAllScourseStudent( @Param("stId") Integer stId, @Param("scheduleId")Integer scheduleId);


	 /**
	  * 根据自主预约表id 删除已经预约的信息
	 * @param integer
	 */
	@Delete("DELETE FROM scourse_student WHERE scourse_student_id =#{ScourseStudentIds}")
	void deleteScourseStudentId(@Param("ScourseStudentIds") String ScourseStudentIds);
	
	
	 /**
	  * 根据学生id 课程id 获取已经预约过的人数
	 * @param integer
	 */
	@Select("SELECT * FROM scourse_student WHERE student_id =#{stId} and schedule_id = #{scheduleId}")
	ScourseStudent scourseStudentId( @Param("stId") Integer stId,@Param("scheduleId")Integer scheduleId);
}

