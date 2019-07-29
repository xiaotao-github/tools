package com.vcooc.experiment.controller;

import java.text.NumberFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.dto.EquipmentDTO;
import com.vcooc.experiment.service.EquipmentService;
import com.vcooc.experiment.service.ExperimentLabService;
import com.vcooc.experiment.service.web.ExperimentLabStatisticsWebService;

/**
 * 迷你实验室控制层 注意进行手机web 端控制南京物联
 * @author ITcast
 *
 */
@Controller
@RequestMapping("miniLab")
public class MiniLabController {
	@Autowired
	private ExperimentLabService experimentLabService;
	
	@Autowired
	private EquipmentService equipmentService;
	
	@Autowired
	private ExperimentLabStatisticsWebService experimentLabStatisticsWebService;

	@Autowired
	private RedisSessionService redisSessionService;
	
	
	// 跳装到迷你实验室的迷你页面
	/*@RequestMapping("getPage")
	public ModelAndView getData(ModelAndView mv) {
		// 获取智慧实验室（预留后续将增加权限判断）
		mv.addObject("experimentLabList", experimentLabService.selectWisdomLabList());
		mv.setViewName("minilab/lab_change");
		return mv;
	}*/

	// 分页跳转
	@RequestMapping("list")
	public ModelAndView list(Page p,String keyword,ModelAndView mv) {
		//暂时定死超级管理员	
		TeacherInfo teacherInfo = new TeacherInfo();
		Department department = new Department();
		department.setId(1);
		teacherInfo.setId(15);
		teacherInfo.setDepartment(department);
		//暂时只获取跟当前操作者相关的实验室后续需要改进
		Integer menuParam = 2;
		mv.addObject("page", experimentLabService.selectWisdomLabListPage(menuParam, teacherInfo, p, keyword, 1));
		mv.addObject("menuParam", menuParam);
		mv.addObject("keyword", keyword);
		mv.setViewName("minilab/lab_change");
		return mv;
	}
	
	/**场景页面跳转
	 * @param mv
	 * @return
	 */
	@RequestMapping("getPage/{labId}")
	public ModelAndView getPage(ModelAndView mv,@PathVariable Integer labId) {
		mv.addObject("lab",experimentLabService.selectById(labId));
		mv.setViewName("minilab/lab_scenes_manage");
		return mv;
	}
	
	/**
	 * 跳转设备控制
	 * @param mv
	 * @param labId
	 * @return
	 */
	@RequestMapping("labInfo/{mainframeId}/{labId}/{menuParam}")
	public ModelAndView getPage(ModelAndView mv,@PathVariable("mainframeId") String mainframeId,
			@PathVariable("labId")Integer labId,
			@PathVariable("menuParam") Integer menuParam,Map<String,Object> map) {
		try{
			Map<String, List<EquipmentDTO>> data = equipmentService.findAllByGwId(mainframeId);
			ExperimentLab experimentLab = experimentLabService.selectById(labId);
			map.put("lab",experimentLabService.selectById(labId));
			map.put("exLab",experimentLab );
			map.put("menuParam",menuParam);
			map.putAll(data);
			
			return new ModelAndView("minilab/lab_info_manage",map);
		}catch(Exception e){
			e.printStackTrace();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
		
	}
	
	/**
	 * 迷你实验室统计详细情况
	 * 
	 * @param labId
	 * @param type
	 * @return
	 */
	@RequestMapping("lab_used_count/{labIds}/{labName}/{menuParam}")
	public ModelAndView labUsedCount(@PathVariable("labIds") Integer labId, @PathVariable("labName") String labName,
			@PathVariable("menuParam") Integer menuParam,ModelAndView model) {
				//获取实验室信息
				model.addObject("lab",experimentLabService.selectById(labId));
				// 整班上课的总次数
				Integer wholeClassCount = experimentLabStatisticsWebService.finallCount(labId, 1);
				model.addObject("wholeClassCount", wholeClassCount);
				model.addObject("wholeClassTime", experimentLabStatisticsWebService.finallCountTime(labId, 1));

				// 小组上课的次数
				Integer groupCount = experimentLabStatisticsWebService.finallCount(labId, 2);
				model.addObject("groupCount", groupCount);
				model.addObject("groupTime", experimentLabStatisticsWebService.finallCountTime(labId, 2));

				// 自主预约的总数
				Integer privateCount = experimentLabStatisticsWebService.finallCount(labId, 3);
				model.addObject("privateCount", privateCount);
				model.addObject("privateTime", experimentLabStatisticsWebService.finallCountTime(labId, 3));

				// 实验课程总数
				Integer laboratoryCount = experimentLabStatisticsWebService.finallCount(labId, null);

				// 实验详情
				model.addObject("Laboratorylist", experimentLabStatisticsWebService.finAllStatistics(labId));
				model.addObject("classTime", experimentLabStatisticsWebService.getClassTime());
				// 整班上课的百分比
				model.addObject("wholeClassCountThan", wholeClassCount);
				// 小组上课的百分比
				model.addObject("groupCountThan", groupCount);
				// 自主预约上课的百分比
				model.addObject("privateCountThan", privateCount);

				model.addObject("labName", labName);

				model.addObject("labId", labId);
				
				model.addObject("menuParam", menuParam);

				model.setViewName("minilab/lab_used_count");

				return model;
	}
	
	/**
	 * 跳转到实验室设备管理页面
	 * @param gwId
	 * @param labId
	 * @param map
	 * @return
	 */
	@RequestMapping(value="toManagePage/{mainframeId}/{labId}",method=RequestMethod.GET)
	public ModelAndView toManagePage(@PathVariable("mainframeId") String mainframeId,@PathVariable("labId")Integer labId,Map<String,Object> map){
		try{
			Map<String, List<EquipmentDTO>> data = equipmentService.findAllByGwId(mainframeId);
			ExperimentLab experimentLab = experimentLabService.selectById(labId);
			//获取实验室信息
			map.put("lab",experimentLabService.selectById(labId));
			map.put("experimentLab",experimentLab );
			map.putAll(data);
			return new ModelAndView("minilab/lab_equipments_manage",map);
		}catch(Exception e){
			e.printStackTrace();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}


}
