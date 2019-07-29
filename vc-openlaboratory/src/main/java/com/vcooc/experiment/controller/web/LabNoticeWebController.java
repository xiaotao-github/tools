package com.vcooc.experiment.controller.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcooc.base.pojo.LabNotice;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.web.LabNoticeWebService;

@RestController
@RequestMapping("labNoticeWebController")
public class LabNoticeWebController {
	@Autowired
	private LabNoticeWebService labNoticeWebService;
	
	
	@RequestMapping("selectByLabId/{labId}")
	public SysResult selectByLabId(@PathVariable("labId")Integer labId){
		try{
			List<LabNotice> labNoticeList = labNoticeWebService.selectByLabId(labId);
			return SysResult.ok(labNoticeList);
		}catch(Exception e){
			return SysResult.build(202,e.getMessage());
		}
	}

}
