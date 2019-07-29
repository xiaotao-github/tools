package com.vcooc.experiment.service;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.LabBlacklist;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.experiment.mapper.LabBlacklistMapper;

@Service
public class LabBlacklistService {
	
	@Autowired
	private LabBlacklistMapper labBlacklistMapper;
	/**
	 * 黑名单列表
	 * @return
	 */
	public List<StudentInfo> list() {
		return labBlacklistMapper.list();
	}
	
	/**
	 * 加入黑名单
	 * @param studentId 学生id
	 */
	public void add(Integer studentId) {
		if(studentId==null){
			throw new RuntimeException("参数错误");
		}
		LabBlacklist record = new LabBlacklist();
		record.setStudentId(studentId);
		List<LabBlacklist> select = labBlacklistMapper.select(record);
		if(CollectionUtils.isEmpty(select)){
			labBlacklistMapper.insert(new LabBlacklist(studentId));
		}else{
			throw new RuntimeException("该学生已经在黑名单中");
		}
	}
	
	/**
	 * 从黑名单移除
	 * @param blacklistId 黑名单id
	 */
	public void del(Integer blacklistId) {
		if(blacklistId==null){
			throw new RuntimeException("参数错误");
		}
		labBlacklistMapper.deleteByPrimaryKey(blacklistId);
	}
	
	public LabBlacklist selectByStudentId(Integer studentId) {
		return labBlacklistMapper.selectByUserId(studentId);
	}
}
