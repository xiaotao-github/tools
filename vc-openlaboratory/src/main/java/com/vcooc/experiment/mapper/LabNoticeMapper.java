package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.LabNotice;
import com.vcooc.common.mapper.SysMapper;
public interface LabNoticeMapper extends SysMapper<LabNotice>{

	/**
	 * 根据实验室id 查询该实验下的公告以及其他实验开放的公告
	 *  关联 实验室名称  发布者名称
	 * @param labId 实验室id
	 * @param isPublish 0.显示  1.隐藏   null.都查询
	 * @return
	 */
	List<LabNotice> selectByLabIdAndCommonNotice(@Param("labId")Integer labId,@Param("isPublish")Integer isPublish);

}
