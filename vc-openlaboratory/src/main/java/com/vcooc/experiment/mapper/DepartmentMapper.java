package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.Department;
import com.vcooc.common.mapper.SysMapper;

public interface DepartmentMapper extends SysMapper<Department> {
	
	/**
	 * 根据条件查询院系信息，以及院系下的教师信息
	 * @param departmentId 院系ID   若无，查询所有院系信息
	 * @param stealth 伪删除字段
	 * @return
	 */
	List<Department> selectAllDepartmentsAndTeachersByWhere(@Param("departmentId")Integer departmentId,@Param("stealth")Integer stealth);


	/**
	 * 根据院系id查询院系下的所有教师
	 * 		不包括已删除的院系
	 * 		不包括已删除的教师
	 * @param departmentId
	 * @return
	 * 		仅查询来院系id,院系名称
	 * 		仅查询教师id,教师名称
	 */
	public List<Department> selectTeacherByDepartmentId(@Param("departmentId")Integer departmentId);
}
