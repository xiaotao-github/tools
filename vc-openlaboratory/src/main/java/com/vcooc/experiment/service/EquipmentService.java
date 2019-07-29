package com.vcooc.experiment.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Equipment;
import com.vcooc.experiment.dto.EquipmentDTO;
import com.vcooc.experiment.enums.LabEpTypeEnum;
import com.vcooc.experiment.mapper.EquipmentMapper;
import com.vcooc.experiment.mq.ActiveMQProducer;
import com.vcooc.experiment.mq.ControlEuqData;
import com.vcooc.util.convertor.EquipmentClassifyConvertor;

import cn.hutool.core.collection.CollectionUtil;

@Service
public class EquipmentService {
	
	@Autowired
	private EquipmentMapper equipmentMapper;
	@Autowired
	private ActiveMQProducer activeMQProducer;
	
	/**
	 * 根据网关id 查询该实验室的设备信息 并进行分类
	 * @param geId
	 * @return
	 */
	public Map<String,List<EquipmentDTO>> findAllByGwId(String gwId){
		List<Equipment> equipments = equipmentMapper.selectByGwId(gwId);
		Map<String,List<EquipmentDTO>> map = EquipmentClassifyConvertor.convertor(equipments);
		if(CollectionUtil.isEmpty(equipments)){
			//throw new RuntimeException("该实验室无设备信息");
			return map;
		}
		//转换
	//	Map<String,List<EquipmentDTO>> map = EquipmentClassifyConvertor.convertor(equipments);
		List<EquipmentDTO> list = map.get("equ_"+LabEpTypeEnum.STATION.getCode());
		if(!CollectionUtils.isEmpty(list)){
			Collections.sort(list);
		}
		return map;
	}
	public void updateType(Integer id, Integer type) {
		Equipment equipment = new Equipment();
		equipment.setEquId(id);
		equipment.setLabEpType(type);
		equipmentMapper.updateByPrimaryKeySelective(equipment);
	}
	/**
	 * 控制设备
	 * @param devId
	 */
	public void controlEqu(ControlEuqData controlEuqData) {
		if(StringUtils.isEmpty(controlEuqData.getDevId()) || StringUtils.isEmpty(controlEuqData.getGwId())){
			throw new RuntimeException("参数错误,无法控制设备 devId:"+controlEuqData.getDevId()+",gwId:"+controlEuqData.getGwId());
		}
		activeMQProducer.sendMessage(controlEuqData);
	}
}
