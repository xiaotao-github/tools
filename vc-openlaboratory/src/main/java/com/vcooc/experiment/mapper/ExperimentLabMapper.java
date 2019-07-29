package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabManager;
import com.vcooc.base.pojo.PageData;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentLabMapper extends SysMapper<ExperimentLab>{

	/**
	 * 根据院系id,关联查询 
	 * @param pd
	 * 			stealth      :显示隐藏字段，不可为空
	 * 			departmentId :院系id,可为空
	 * 			keyword      :关键词模糊查询，可为空
	 * 			page.thisPage:当前页,可为空
	 * 			page.pageSize：查询条数,可为空
	 * @param labStatus 1 可使用 2 不可使用
	 * @return
	 * 		关联院系名称
	 * 		关联负责教师
	 * 		关联操作人
	 */
	/*public List<ExperimentLab> Aselect(
			@Param("departmentId")Integer departmentId,@Param("stealth")Integer stealth,@Param("keyword")String keyword);*/
	public List<ExperimentLab> Aselect(PageData pd);
	
	/**
	 * 实验室管理  
	 * @param departmentId 院系Id
 	 * @param stealth 非伪删除
	 * @param teacherInfoId 
 	 * @thid 教师id
	 * @return
	 */
	public List<ExperimentLab> selectExperimentLabList(@Param("departmentId")Integer departmentId,@Param("stealth")Integer stealth,@Param("ladId") Integer ladId);
	
	/**
	 * 与上面关联查询分页连用Aselect(PageData pd),如果不用上面的方法去分页，那么不需要调用这方法
	 * @param pd
	 * 		stealth         :显示隐藏字段，不可为空
	 * 		keyword         :关键词关联查询,可为空
	 * @return
	 */
	public Integer countAselect(@Param("stealth")Integer stealth,@Param("keyword")String keyword);
	
	
	
	
	/**
	 * 根据院系id,关联查询
	 * @param departmentId  如果为空，查询全部
	 * @return
	 * 		关联院系名称
	 * 		关联负责教师
	 * 		关联操作人
	 */
	public List<ExperimentLab> AselectMyLab(
			@Param("authorId")Integer authorId,@Param("stealth")Integer stealth,@Param("keyword")String keyword);
	
	
	/**
	 * 根据实验室id,多表查询,关联实验室,关联负责人
	 * @param id
	 * @return
	 */
	public ExperimentLab AselectById(Integer labId);
	
	
	/**
	 * 根据课程表id查询所在实验室
	 * @return
	 */
	public ExperimentLab selectByScheduleId(Integer scheduleId);

	/**统计实验室总数
	 * stealth 2 显示 
	 * @return
	 */
	@Select("SELECT COUNT(*) FROM 	experiment_lab WHERE stealth  = 2 ")
	public Integer selectExperimentLabCount();

	@Select("SELECT * FROM 	experiment_lab WHERE stealth  = 2 AND lab_id = #{labId}")
	ExperimentLab selectById(@Param("labId")Integer labId);

	 /**
	  * 获取教师负责的实验室
	 * @param teacherInfoId 教师id
	 * @return
	 */
	@Select("select lad_id from lab_manager where manager_id = #{teacherInfoId} ")
	List<LabManager> selectlabManagerList(@Param("teacherInfoId") Integer teacherInfoId);
	
	/**
	 * 院系id 获取所在的院系
	 * @param departmentId
	 * @return
	 */
	@Select("select name  from department where id  = #{departmentId}")
	 Department selectdepartmentId(@Param("departmentId")Integer departmentId);
	
	/**
	 * 获取所有实验 
	 * @return
	 */
	@Select("SELECT * FROM 	experiment_lab WHERE stealth  = 2 and lab_status = 1 ")
	List<ExperimentLab> selectLabList();


	/**
	 * 获取实验室id 
	 * @param number
	 * @return
	 */
	@Select("select * from experiment_lab where lab_number = #{number} AND lab_status = 1 ")
	 ExperimentLab selectLabNumber(@Param("number") String number);
	
	@Select("select experiment_course_id from experiment_course where course_name = #{counrseName} and is_publish = 2")
	 Integer selectCounrseId(@Param("counrseName")String counrseName);
	
	@Select("select experiment_id from experiment where experiment_name = #{experimernteName}  and stealth = 2 and  experiment_type = 3")
	 Integer selectExperimentId(@Param("experimernteName")String experimernteName);
	
	@Select("select id from  major where name = #{majorName} and stealth = 2")
	 Integer selectmajorId(@Param("majorName")String majorName);
	
	@Select("select id from grade where name = #{gradeName} and stealth = 2 ")
	 Integer selecgradeId(@Param("gradeName")String gradeName);
	
	@Select("select id from tb_class  where name = #{className} and grade_id = #{gradeId} and stealth = 2 ")
	 Integer selectClassId(@Param("className")String className,@Param("gradeId") Integer gradeId);
	
	@Select("select id from teacher_info  where name = #{th}")
	 Integer selectThId(@Param("th")String th);
	
	@Select("select id from  user where username = #{st} ")
	 Integer selectStName(@Param("st")String st);

}
