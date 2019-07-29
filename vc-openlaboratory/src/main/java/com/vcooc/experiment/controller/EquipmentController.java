package com.vcooc.experiment.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.dto.EquipmentDTO;
import com.vcooc.experiment.mq.ControlEuqData;
import com.vcooc.experiment.service.EquipmentService;
import com.vcooc.experiment.service.ExperimentLabService;

@Controller
@RequestMapping("equipment")
public class EquipmentController {
	@Autowired
	private EquipmentService equipmentService;
	@Autowired
	private ExperimentLabService experimentLabService;
	
	
	/**
	 * 根据网关id，并进行分类 查询网关的设备
	 * 后面改为页面跳转
	 * @param gwId 网关id
	 * @return 设备信息
	 */
	@RequestMapping(value="gwId/{gwId}",method=RequestMethod.GET)
	@ResponseBody
	public SysResult findBygwId(@PathVariable("gwId") String gwId){
		try{
			Map<String, List<EquipmentDTO>> data = equipmentService.findAllByGwId(gwId);
			return SysResult.ok(data);
		}catch(Exception e){
			return SysResult.build(404,e.getMessage());
		}
	}
	/**
	 * 跳转到实验室设备控制页面
	 */
	@RequestMapping("toEquControlPage/{gwId}/{labId}/{menuParam}")
	public ModelAndView toEquControlPage(@PathVariable("gwId") String gwId,
			@PathVariable("labId")Integer labId,
			@PathVariable("menuParam") Integer menuParam,
			Map<String,Object> map){
		try{
			/**根据网关id 查询该实验室的设备信息 并进行分类***/
			/****EquipmentDTO实现Comparable接口，比较器**/
			Map<String, List<EquipmentDTO>> data = equipmentService.findAllByGwId(gwId);
			/***根据实验室ID查询实验室信息**/
			ExperimentLab experimentLab = experimentLabService.selectById(labId);
			map.put("exLab",experimentLab );
			map.put("menuParam",menuParam);
			map.putAll(data);
			return new ModelAndView("admin/lab_manage/lab_info_manage",map);
		}catch(Exception e){
			e.printStackTrace();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}
	
	
	/**
	 * 跳转到实验室设备管理页面
	 * @param gwId
	 * @param labId
	 * @param map
	 * @return
	 */
	@RequestMapping(value="toManagePage/{gwId}/{labId}",method=RequestMethod.GET)
	public ModelAndView toManagePage(@PathVariable("gwId") String gwId,@PathVariable("labId")Integer labId,Map<String,Object> map){
		try{
			Map<String, List<EquipmentDTO>> data = equipmentService.findAllByGwId(gwId);
			ExperimentLab experimentLab = experimentLabService.selectById(labId);
			map.put("experimentLab",experimentLab );
			map.putAll(data);
			return new ModelAndView("admin/lab_manage/lab_equipments_manage",map);
		}catch(Exception e){
			e.printStackTrace();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}
	
	/**
	 * 设置设备的类型
	 * @param id 设备id
	 * @param type 类型  0.其他（默认） 1.灯控 2.红外 3.工位 4.插座 5.摄像头 6.窗户 7.窗帘 8.门 9.电源总开关 10.传感设备
	 * @return
	 */
	@RequestMapping(value="updateType/{id}/{type}",method=RequestMethod.POST)
	@ResponseBody
	public SysResult updateType(@PathVariable("id")Integer id,@PathVariable("type")Integer type){
		equipmentService.updateType(id,type);
		return SysResult.ok();
	}
	/**
	 * 控制设备
	 * @param devId 设备id
	 * @return 
	 */
	@RequestMapping(value="controlEqu",method=RequestMethod.POST)
	@ResponseBody
	public SysResult controlEqu(ControlEuqData controlEuqData){
		try{
			equipmentService.controlEqu(controlEuqData);
			return SysResult.ok();
		}catch(RuntimeException e){
			return SysResult.build(400, e.getMessage());
		}
	}
	
}
