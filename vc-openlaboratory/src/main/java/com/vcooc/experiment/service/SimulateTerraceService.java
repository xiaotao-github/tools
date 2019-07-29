package com.vcooc.experiment.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vcooc.base.pojo.SimulateTerrace;
import com.vcooc.experiment.mapper.SimulateTerraceMapper;

@Service
public class SimulateTerraceService extends BaseService<SimulateTerrace> {
	@Autowired
	private SimulateTerraceMapper simulateTerraceMapper;

	/**
	 * 根据公布状态查询仿真平台
	 * @param openStatus
	 * @return
	 */
	public List<SimulateTerrace> selectTerrace(Integer openStatus) {
		SimulateTerrace record = new SimulateTerrace();
		record.setIsPublish(openStatus);
		return simulateTerraceMapper.select(record);
	}
}
