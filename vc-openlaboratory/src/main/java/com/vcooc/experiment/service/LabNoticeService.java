package com.vcooc.experiment.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.LabNotice;
import com.vcooc.experiment.mapper.LabNoticeMapper;

@Service
public class LabNoticeService extends BaseService<LabNotice>{
	@Autowired
	private LabNoticeMapper labNoticeMapper;
	
	
	/**
	 * 添加 或修改实验公告
	 * @param labNotice
	 * @return
	 */
	public LabNotice saveLabNotice(LabNotice labNotice) {
		if(StringUtils.isEmpty(labNotice.getTitle())){
			throw new RuntimeException("公告标题不能为空");
		}
		if(StringUtils.isEmpty(labNotice.getContent())){
			throw new RuntimeException("公告内容不能为空");
		}
		if(labNotice.getLabId()==null){
			throw new RuntimeException("公告所属实验室不能为空");
		}
		labNotice.setUpdateTime(new Date());
		if(labNotice.getNoticeId()==null){
			labNotice.setCreateTime(labNotice.getUpdateTime());
			this.saveSelective(labNotice);
		}else{
			this.updateSelective(labNotice);
		}
		return labNotice;
	}

	/**
	 * 根据id 删除实验公告
	 * @param id
	 */
	public void delete(Integer id) {
		this.deleteById(id);
	}
	/**
	 * 根据实验室id 查询该实验下的公告以及其他实验开放的公告
	 * @param labId 实验室id
	 * @return
	 */
	public List<LabNotice> selectByLabIdAndCommonNotice(Integer labId) {
		return labNoticeMapper.selectByLabIdAndCommonNotice(labId,null);
	}
	
}
