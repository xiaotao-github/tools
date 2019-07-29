package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.LabManager;
import com.vcooc.experiment.mapper.LabManagerMapper;

@Service
public class LabManagerService {
	@Autowired
	private LabManagerMapper labManagerMapper;
	
	
	/**
	 * 通过实验室id查询关联
	 * @param labId
	 * @return
	 */
	public List<LabManager> selectByLabId(Integer labId){
		LabManager l = new LabManager();
		l.setLadId(labId);
		return labManagerMapper.select(l);
	}
	
	
	/**
	 * 批量插入数据
	 * @param list
	 */
	public void insertList(List<LabManager> list){
		if(list.size()>0) 
			labManagerMapper.insertList(list);
	}
	
	
	/**
	 * 批量插入数据
	 * @param labId    实验室id
	 * @param managerIds 以逗号分隔的teacherInfoId
	 */
	public void insert(Integer labId,String managerIds){
		if(managerIds != null && !managerIds.equals("") && labId != null){
			String[] ids = managerIds.split(",");
			List<LabManager> list = new ArrayList<LabManager>();
			Date d = new Date();
			for(String i : ids){
				LabManager  l = new LabManager(); 
				l.setLadId(labId);
				l.setManagerId(Integer.valueOf(i));
				l.setCreateTime(d);
				l.setUpdateTime(d);
				list.add(l);
			}
			//插入关联表
			if(list.size()>0) insertList(list);
		}
	}
	
	
	/**
	 * 先删除之前的关联数据，再批量插入数据
	 * @param labId    实验室id
	 * @param managerIds 以逗号分隔的teacherInfoId
	 */
	public void replace(Integer labId,String managerIds){
		//删除
		LabManager  l = new LabManager();
		l.setLadId(labId);
		labManagerMapper.delete(l);
		
		if(managerIds != null && managerIds != "")
			insert(labId, managerIds);
	}
}
