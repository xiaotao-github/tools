/*
 * 预计删除
 *  package com.vcooc.experiment.controller;
 
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcooc.base.pojo.ProteusData;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ProteusDataService;

@RestController
@RequestMapping("proteusData")
public class ProteusDataController {
	@Autowired
	private ProteusDataService proteusDataService;
	
	//录入Proteus 数据
	
	@RequestMapping("inser")
	public SysResult insertData(ProteusData proteusData){
		try {
			proteusDataService.addData(proteusData);
			return SysResult.ok();
		} catch (RuntimeException e) {
			return SysResult.build(202,e.getMessage());
		}
	}
	
	@RequestMapping("getData/{sId}")
	public SysResult getData(@PathVariable("sId")Long sId){
		try {
			ProteusData data = proteusDataService.getData(sId);
			return SysResult.ok(data);
		} catch (RuntimeException e) {
			return SysResult.build(403, e.getMessage());
		}
	}
}
*/