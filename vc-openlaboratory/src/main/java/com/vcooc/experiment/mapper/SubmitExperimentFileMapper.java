package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentGroup;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.common.mapper.SysMapper;

public interface SubmitExperimentFileMapper extends SysMapper<SubmitExperimentFile>{
	
	/**
	 * 根据学生ID，查询学生已经完成的实验
	 * 	submitStatus==2 submitStatus==3 
	 * @param studentInfoId
	 * @return
	 */
	List<SubmitExperimentFile> selectStudentFinishExperimentByStudentInfoId(Integer studentInfoId);
	
	/**
	 * 查询学生所属实验下的优秀报告
	 * @param studentInfoId 学生ID
	 * @return
	 */
	List<SubmitExperimentFile> selectGoodReportByStudentInfoId(Integer studentInfoId);
	
	/**
	 * 根据条件查询学生在该课程下的实验小组
	 * @param experimentCourseId 实验课程ID
	 * @param studentInfoId 学生ID
	 * @return
	 */
	List<ExperimentGroup> selectExperimentGroupByCourseIdAndStudentId(Integer experimentCourseId,
			Integer studentInfoId);
	/**
	 * 根据实验ID，查询实验下的优秀报告
	 * @param experimentId
	 * @return
	 */
	List<SubmitExperimentFile> selectGoodReportByAndExperimentId(Integer experimentId);
	/**
	 * 根据实验报告ID，查询实验报告信息
	 * 		包括实验报告所属课程
	 * 			包括实验小组
	 * 				实验小组的指导教师
	 * 		包括实验
	 * 			包括实验下的资源
	 * @param submitFileId
	 * @return
	 */
	SubmitExperimentFile selectSubmitExperimentFileById(Integer submitFileId);
	
	/**
	 * 根据条件查询学生查询的条件报告 到DataTable展现页面
	 * @param departmentId 院系ID
	 * @param teacherInfoId 教师ID
	 * @param start 起始位置
	 * @param end 结束位置
	 * @param sSearch 查询条件 
	 */
	List<SubmitExperimentFile> selectSubmitExperimentFileByWhereToList(@Param("departmentId")Integer departmentId
			,@Param("teacherInfoId")Integer teacherInfoId
			,@Param("submitStatus") Integer submitStatus
			,@Param("start") Integer start
			,@Param("end")Integer end
			,@Param("sSearch") String sSearch
			,@Param("sortCol")String sortCol
			,@Param("sortDir")String sortDir);
	
	/**
	 * 根据条件查询学生查询的条件报告
	 * @param departmentId 院系ID
	 * @param teacherInfoId 教师ID
	 */
	List<SubmitExperimentFile> selectSubmitExperimentFileByWhere(@Param("departmentId")Integer departmentId
			,@Param("teacherInfoId")Integer teacherInfoId
			,@Param("submitStatus") Integer submitStatus);	
	
	
	/**
	 *根据条件查询学生提交的实验报告数量 
	 * @return
	 */
	Integer selectSubmitExperimentFileSizeByWhere(@Param("departmentId")Integer departmentId
			,@Param("teacherInfoId")Integer teacherInfoId
			,@Param("submitStatus") Integer submitStatus
			,@Param("sSearch") String sSearch);
	
	/**
	 * 根据ID查询实验报告
	 * @param submitId
	 * @return
	 */
	SubmitExperimentFile seleteStudentSubmitReportById(Integer submitId);
	
	/**
	 * 根据实验IDS 查询学生实验信息
	 * @param submitIds
	 * @return
	 */
	List<SubmitExperimentFile> selectsubmitExperimentFileByIds(@Param("submitIds")Integer[] submitIds);

	/**
	 * 查询同一教师分配给同一门实验课下的同一实验下学生提交的实验报告
	 * @param teacherInfoId
	 * @param experimentId
	 * @param experimentCourseId
	 * @return
	 */
	List<SubmitExperimentFile>seleteStudentSubmitReportByWhere(@Param("teacherInfoId")Integer teacherInfoId,@Param("experimentId")Integer experimentId,@Param("experimentCourseId")Integer experimentCourseId);
    
	/**
	 * 批量批阅学生提交的实验
	 * @param ids
	 */
	void updateStudentSubmitReportByIds(@Param("ids")String ids,@Param("record")SubmitExperimentFile record);
	/**
	 * 批量修改导出状态 
	 * @param ids
	 */
	void updateExportStatusByIds(@Param("ids")Integer[] ids,@Param("status")Integer status);
	
	/**
	 * 初始化学生实验成绩信息
	 * @param experimentCourseId 课程id
	 * @param experimentId 实验id
	 * @param experimentGroupId 实验小组id
	 * @param studentInfos 学生id
	 */
	void initializeStudentGrade(@Param("experimentCourseId")Integer experimentCourseId
			,@Param("experimentId") Integer experimentId
			,@Param("experimentGroupId")Integer experimentGroupId
			,@Param("studentInfoIds")List<Integer> studentInfoIds);
	
	
	/**
	 * 初始化学生课程表成绩信息
	 * @param experimentCourseId 课程id
	 * @param experimentId 实验id
	 * @param experimentGroupId 实验小组id
	 * @param studentInfos 学生id
	 */
	void initializeStudentScheduleGrade(
			@Param("experimentCourseId")Integer       experimentCourseId,
			@Param("experimentId")      Integer       experimentId,
			@Param("experimentGroupId") Integer       experimentGroupId,
			@Param("scheduleId")        Integer       scheduleId,
			@Param("studentInfoIds")    List<Integer> studentInfoIds
			);
	
	
	/**
	 * 根据条件  获取学生实验成绩单中的学生id
	 * @param experimentCourseId 实验课程id
	 * @param experimentId 实验id
	 * @return
	 */
	List<Integer> getOldStudentGradeId(@Param("experimentCourseId")Integer experimentCourseId
			,@Param("experimentId")Integer experimentId,@Param("groupId") Integer groupId);
	/**
	 * 更新学生的实验成绩单
	 * @param experimentCourseId 实验课程id
	 * @param experimentId 实验id
	 * @param experimentGroupId 实验小组id 可能为空
	 * @param oldStudentInfoIds 学生id
	 */
	void updateStudentGrade(@Param("experimentCourseId")Integer experimentCourseId
			,@Param("experimentId")Integer experimentId
			,@Param("experimentGroupId")Integer experimentGroupId
			,@Param("studentInfoIds")List<Integer> studentInfoIds);
	
	/**
	 * 2017-1-3 根据学生id 查询学生的实验信息   实验状态 实验名称 等
	 * @param id
	 * @return
	 */
	List<SubmitExperimentFile> selectStudentExperimentByStudentId(Integer id);
	
	
	/**
	 * 根据实验课程ID，实验ID，学生ID，查询该学生在该实验课程下的其他正在进行中的实验
	 * @param experimentGroupId
	 * @param experimentCourseId
	 * @param studentInfoId
	 * @return
	 */
	List<SubmitExperimentFile> selectOtherExperimentByExperimentGroupIdAndExperimentCourse2(@Param("experimentCourseId")Integer experimentCourseId,@Param("studentInfoId")Integer studentInfoId,@Param("experimentId")Integer experimentId);
}
