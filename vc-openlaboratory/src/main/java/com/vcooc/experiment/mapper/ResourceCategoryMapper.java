package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ResourceCategory;
import com.vcooc.common.mapper.SysMapper;

public interface ResourceCategoryMapper  extends SysMapper<ResourceCategory>{
	
	/**
	 * 根据教师id查询资源标签
	 * @param teacherInfoId
	 * @return
	 */
	 List<ResourceCategory> selectResourceCategoriesTeacherInfoId(Integer teacherInfoId);
	
	
	/**
	 * 批量插入
	 * @param list
	 * @return 
	 */
	void addResourceCategories(List<ResourceCategory> list);
	
	/**
	 * 批量查询
	 * @param list
	 * @param teacherInfoId
	 * @return
	 */
	List<ResourceCategory> queryNames(@Param("list")List<ResourceCategory> list,@Param("teacherInfoId")Integer teacherInfoId);
}
