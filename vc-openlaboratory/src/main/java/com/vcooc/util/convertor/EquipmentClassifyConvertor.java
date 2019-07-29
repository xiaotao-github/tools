package com.vcooc.util.convertor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.vcooc.base.pojo.Equipment;
import com.vcooc.experiment.dto.EquipmentDTO;
import com.vcooc.experiment.enums.LabEpTypeEnum;

import cn.hutool.core.bean.BeanUtil;
/**
 * Equipment 分类 转换工具类 
 * @author Administrator
 *
 */
public class EquipmentClassifyConvertor {
	/**
	 * 将 Equipment 转换成 EquipmentDTO 并进行分类
	 * @param list
	 * @return
	 */
	public static Map<String,List<EquipmentDTO>> convertor(List<Equipment> list){
		//根据类型定义List
		Map<String,List<EquipmentDTO>> map = new HashMap<String,List<EquipmentDTO>>();
		LabEpTypeEnum[] labEpTypes = LabEpTypeEnum.values();
		for (LabEpTypeEnum temp : labEpTypes) {
			map.put("equ_"+temp.getCode(),new ArrayList<EquipmentDTO>());
		}
		
		for (Equipment equipment : list) {
			EquipmentDTO dto = new EquipmentDTO();
			BeanUtil.copyProperties(equipment, dto);
			dto.setEquIdentify(dto.getGwId()+dto.getEpType()+dto.getEp());
			map.get("equ_"+equipment.getLabEpType()).add(dto);
		}
		return map;
	}
}
