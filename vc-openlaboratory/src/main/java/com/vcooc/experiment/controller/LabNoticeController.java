package com.vcooc.experiment.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabNotice;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentLabService;
import com.vcooc.experiment.service.LabNoticeService;

@Controller
@RequestMapping("labNoticeController")
public class LabNoticeController {
	@Autowired
	private LabNoticeService labNoticeService;
	@Autowired
	private ExperimentLabService experimentLabService;
	
	//根据labId查
	@RequestMapping("selectByLabIdToPage/{labId}")
	public ModelAndView selectByLabIdToPage(@PathVariable("labId") Integer labId,Map<String,Object> map){
		List<LabNotice> notices = labNoticeService.selectByLabIdAndCommonNotice(labId);
		ExperimentLab experimentLab = experimentLabService.selectById(labId);
		map.put("notices", notices);
		map.put("labId", labId);
		map.put("experimentLab", experimentLab);
		return new ModelAndView("admin/lab_manage/lab_electronicScreen_msg_manage",map);
	}
	
	//改
	//新增
	@RequestMapping("save")
	@ResponseBody
	public SysResult save(LabNotice labNotice){
		try{
			LabNotice data = labNoticeService.saveLabNotice(labNotice);
			return SysResult.ok(data);
		}catch(Exception e){
			return SysResult.build(202,e.getMessage());
		}
	}
	
	//删除
	@RequestMapping("delete/{id}")
	@ResponseBody
	public SysResult delete(@PathVariable("id") Integer id){
		labNoticeService.delete(id);
		return SysResult.ok();
	}
	/**
	 * 修改公告状态
	 */
	@RequestMapping("updateShowStatus/{id}/{status}")
	@ResponseBody
	public SysResult updateShowStatus(@PathVariable("id")Integer id,@PathVariable("status") Integer status){
		LabNotice labNotice = new LabNotice();
		labNotice.setNoticeId(id);
		labNotice.setIsPublish(status);
		labNotice.setUpdateTime(new Date());
		labNoticeService.updateSelective(labNotice);
		return SysResult.ok();
	}
	
	
	/**
	 * 修改公告公布范围
	 */
	@RequestMapping("changeMsgBoundary/{id}/{boundary}")
	@ResponseBody
	public SysResult changeMsgBoundary(@PathVariable("id")Integer id,@PathVariable("boundary") Integer boundary){
		LabNotice labNotice = new LabNotice();
		labNotice.setNoticeId(id);
		labNotice.setIsCommon(boundary);
		labNotice.setUpdateTime(new Date());
		labNoticeService.updateSelective(labNotice);
		return SysResult.ok();
	}
	
	/**
	 * 到修改页面
	 * @param id
	 * @param map
	 * @return
	 */
	@RequestMapping("toEditPage/{id}")
	public ModelAndView toEditPage(@PathVariable("id")Integer id,Map<String,Object> map){
		LabNotice notice = labNoticeService.queryById(id);
		if(notice==null){
			map.put("msg","数据错误，查不到该公告信息");
			return new  ModelAndView("error",map);
		}
		map.put("notice", notice);
		return new ModelAndView("admin/lab_manage/editMsg",map);
	}
}
