package com.vcooc.experiment.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.common.mapper.SysMapper;

public interface ResourceFileMapper extends SysMapper<ResourceFile> {
	/**
	 * 根据用户ID，查询用户上传的资源文件信息
	 * 	包括用户作者信息
	 * 	包括资源文件的所属资源库
	 * @param authorId 作者ID
	 * @param stealth 伪删除字段
	 * @return
	 */
	List<ResourceFile> selectFilesByAuthorId(@Param("authorId")Integer authorId,@Param("stealth")Integer stealth);
	
	List<ResourceFile> selectFilesByAuthorIds(PageData pd);
	
	List<ResourceFile> selectCollectionFilesByAuthorId(@Param("teacherInfoId")Integer teacherInfoId,@Param("stealth")Integer stealth,@Param("experimentName")String experimentName);


	public ResourceFile selectById(Integer fileId);
	
	/**
	 * 获取校内公开的资源文件信息
	 * 	包括用户作者信息
	 * 	包括资源文件的所属资源库
	 * @param stealth 2为显示  
	 * @param openStatus 3 为完全开放 可变 看表
	 * @return
	 */
	List<ResourceFile> selectOpenFiles(@Param("stealth")Integer stealth,@Param("openStatus")Integer openStatus);
}
