package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.Equipment;
import com.vcooc.common.mapper.SysMapper;

public interface EquipmentMapper extends SysMapper<Equipment>{

	/**
	 * 根据网关id查询设备信息 根据类型进行排序
	 * @param gwId
	 * @return
	 */
	@Select("select * from equipment where gw_id = #{gwId} order by ep_type")
	List<Equipment> selectByGwId(String gwId);
	

}
