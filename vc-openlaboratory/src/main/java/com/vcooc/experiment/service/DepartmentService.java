package com.vcooc.experiment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Department;
import com.vcooc.experiment.mapper.DepartmentMapper;

@Service
public class DepartmentService extends BaseService<Department>{
	@Autowired
	private DepartmentMapper departmentMapper;

	/**
	 * 根据院系id查询院系下的所有教师
	 * 		不包括已删除的院系
	 * 		不包括已删除的教师
	 * @param departmentId      -1或者null,查询所有院系
	 * @return
	 * 		仅查询来院系id,院系名称
	 * 		仅查询教师id,教师名称
	 */
	public List<Department> selectTeacherByDepartmentId(Integer departmentId){
		return departmentId == null || departmentId == -1 ? departmentMapper.selectTeacherByDepartmentId(null):
			departmentMapper.selectTeacherByDepartmentId(departmentId);
	}
}
