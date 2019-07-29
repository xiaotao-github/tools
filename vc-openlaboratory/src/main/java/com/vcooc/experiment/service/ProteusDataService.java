package com.vcooc.experiment.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ProteusData;
import com.vcooc.experiment.mapper.ProteusDataMapper;

@Service
public class ProteusDataService {
	@Autowired
	private ProteusDataMapper proteusDataMapper;
	/**
	 * proteus 校验mapper
	 */
	/*@Autowired
	private ScheduleStudentScoreMapper scheduleStudentScoreMapper;*/
	
	private final static String ADDDATALOCK= "ADDDATALOCK";
	
	/**
	 * 载入数据  原先已有就替换  未有就载入
	 * @param proteusData
	 */
	public void addData(ProteusData proteusData){
		checkData(proteusData);
		ProteusData oldData = proteusDataMapper.selectByPrimaryKey(proteusData.getSid());
		synchronized(ADDDATALOCK){
			if(oldData !=null){
				proteusData.setUpdateTime(new Date());
				proteusData.setCreateTime(oldData.getCreateTime());
				proteusDataMapper.updateByPrimaryKey(proteusData);
			}else{
				proteusData.setCreateTime(new Date());
				proteusData.setUpdateTime(proteusData.getCreateTime());
				proteusDataMapper.insert(proteusData);
			}
		}
	}
	/**
	 * 根据id获取Proteus数据
	 * @param sId
	 * @return
	 */
	public ProteusData getData(Long sId){
		if(sId == null){
			throw new RuntimeException("获取数据失败,sId不能为空");
		}else{
			ProteusData proteusData = proteusDataMapper.selectByPrimaryKey(sId);
			if(proteusData == null){
				throw new RuntimeException("获取数据为空");
			}else{
				return proteusData;
			}
		}
	}
	
	private void checkData(ProteusData proteusData){
		if(proteusData == null ){
			throw new RuntimeException("服务器无法接收到数据");
		}
		if(proteusData.getSid() == null){
			throw new RuntimeException("数据错误,服务器无法接收到数据唯一标识(sId)");
			
		}
		//TODO 校验，到时候打开
		/*if(scheduleStudentScoreMapper.selectByPrimaryKey(proteusData.getSid())==null){
			throw new RuntimeException("服务器未发现该学生需要提交Proteus数据");
		}*/
		if(proteusData.getStartTime()==null){
			throw new RuntimeException("数据错误,服务器无法接收到开始截取的时间(startTime)");
		}
		if(proteusData.getEndTime()==null){
			throw new RuntimeException("数据错误,服务器无法接收到结束截取的时间(endTime)");
		}
		if(proteusData.getData()==null){
			throw new RuntimeException("参数错误,服务器无法获取数据(data)");
		}
		if(proteusData.getFrequency()==null){
			throw new RuntimeException("数据错误,服务器无法接收到频率(frequency)");
		}
	}
}
