package com.vcooc.experiment.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentGroup;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentGroupMapper extends SysMapper<ExperimentGroup> {
	
	/**
	 * 根据实验课程ID和实验ID，查询实验课程下的班级信息，相关联的  班级下的小组信息  以及 小组下的学生信息
	 * @param experimentCourseId
	 * @param experimentId
	 * @return
	 */
	List<TbClass> selectExperimentClassInfo(@Param("experimentCourseId")Integer experimentCourseId,@Param("experimentId") Integer experimentId);
	
	/**
	 * 添加小组成员，将小组成员添加进小组中
	 * @param experimentGroupId 小组ID
	 * @param studentInfoIds 小组成员ID
	 */
	void distrubuteStudentToGroup(@Param("experimentGroupId")Integer experimentGroupId,@Param("studentInfoIds")Integer[] studentInfoIds);
	
	/**
	 * 校验小组学生在同一班级
	 * @param studentInfoIds
	 * @return classId 班级ID   classSize 班级数量
	 */
	Map<String, Integer> selectStudentInfoInClassSize(@Param("studentInfoIds")Integer[] studentInfoIds);
	
	/**
	 * 校验学生不在该实验课程 该实验的其他小组中
	 * @param experimentCourseId 实验课ID
	 * @param experimentId 实验ID
	 * @param experimentGroupId 去除的小组ID
	 * @param studentInfoIds 学生ID
	 * @return 0 不在   >0 在
	 */
	Integer selectStudentSizeIsOtherGroup(@Param("experimentCourseId")Integer experimentCourseId,@Param("experimentId") Integer experimentId,
			@Param("experimentGroupId") Integer experimentGroupId,@Param("studentInfoIds")Integer[] studentInfoIds);
	
	/**
	 * 删除小组下的学生
	 * @param experimentGroupId
	 */
	void deleGroupStudent(Integer experimentGroupId);
	/**
	 * 根据小组ID，查询小组下的学生信息
	 * @param experimentGroupId
	 * @return
	 */
	ExperimentGroup selectExperimentGroupById(Integer experimentGroupId);
	
	/**
	 * 根据条件查询小组信息
	 * 		包括小组所属实验  -- 所属课程
	 * departmentId 院系小组
	 * teacherInfoId 小组的创建教师
	 * @return
	 */
	List<ExperimentGroup> selectExperimentGroupByWhere(@Param("departmentId")Integer departmentId,@Param("teacherInfoId")Integer teacherInfoId);
	
	/**
	 * 根据实验课程ID，实验ID，班级ID 查询班级下未分配小组的学生
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	List<StudentInfo> selectOtherStudentInfoByExperimentCourseIdAndExperimentIdAndClassId(@Param("experimentCourseId") Integer experimentCourseId,@Param("experimentId")Integer experimentId,
			@Param("classId")Integer classId);
	/**
	 * 查询班级在实验下的小组信息
	 * @param experimentId 实验id
	 * @param classId 小组id
	 * @return
	 */
	List<ExperimentGroup> selectClassExperimentGroup(@Param("experimentId")Integer experimentId,@Param("classId")Integer classId);

	/**
	 * 查询实验小组的知道教师以及实验信息
	 * @param id
	 * @return
	 */
	ExperimentGroup selectGroupById(Integer id);
}
