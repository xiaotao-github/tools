package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.Semester;
import com.vcooc.common.mapper.SysMapper;

public interface SemesterMapper extends SysMapper<Semester>{

	/**
	 * 查询所有学期信息
	 * @param stealth
	 * @return
	 */
	List<Semester> selectAllSemesters(Integer stealth);
	
	/**
	 * 校验名称是否重复
	 * @param name
	 * @param id
	 * @return
	 */
	Integer validateSemesterName(@Param("name")String name ,@Param("id")Integer id);
	
	/**
	 * 查询所有学期时间
	 * @param id
	 * @return
	 */
	List<Semester> selectAllSemseters(@Param("id")Integer id);
	/**
	 * 获取当前学期
	 * @return
	 */
	public  List<Semester>  getCurrentSemester();
}
