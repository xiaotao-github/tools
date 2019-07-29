package com.vcooc.experiment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ResourceLibrary;
import com.vcooc.experiment.mapper.ResourceLibraryMapper;

@Service
public class ResourceLibraryService extends BaseService<ResourceLibrary>{
	@Autowired
	private ResourceLibraryMapper resourceLibraryMapper;
	/**
	 * 根据院系id，查询院系下的资源库信息
	 * @param departmentId
	 * @return
	 */
	public List<ResourceLibrary> selectResourceLibrariesByDepartmentId(Integer departmentId) {
		ResourceLibrary record = new ResourceLibrary();
		record.setDepartmentId(departmentId);
		record.setStealth(2);
		return resourceLibraryMapper.select(record);
	}
}
