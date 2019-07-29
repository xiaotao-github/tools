package com.vcooc.experiment.service.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.LabNotice;
import com.vcooc.experiment.mapper.LabNoticeMapper;

@Service
public class LabNoticeWebService {
	@Autowired
	private LabNoticeMapper labNoticeMapper;
	
	
	public List<LabNotice> selectByLabId(Integer labId) {
		
		return labNoticeMapper.selectByLabIdAndCommonNotice(labId, 0);
	}
	
	

}
