package com.vcooc.experiment.controller.web;

import java.text.NumberFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.web.ExperimentLabStatisticsWebService;

/**
 * @author yjt
 * 
 */
@Controller
@RequestMapping("experimentLabStatisticsWebController")
public class ExperimentLabStatisticsWebController {

	@Autowired
	private ExperimentLabStatisticsWebService experimentLabStatisticsWebService;

	@Autowired
	private RedisSessionService redisSessionService;

	/**
	 * 不使用
	 * 实验室详情界面
	 * @param labId
	 * @return model
	 */
	@RequestMapping("lab_info_manage/{labIds}/{menuParam}")
	@ResponseBody
	public ModelAndView labInFoMange(@PathVariable("labIds") Integer labId,@PathVariable("menuParam") Integer menuParam,  ModelAndView model) {
		model.addObject("exLab", experimentLabStatisticsWebService.finallById(labId));
		model.addObject("menuParam", menuParam);
		model.addObject("labIds", labId);
		model.setViewName("admin/lab_manage/lab_info_manage");
		return model;
	}

	/**
	 * 实验室统计详细情况
	 * 
	 * @param labId
	 * @param type
	 * @return
	 */
	@RequestMapping("lab_used_count/{labIds}/{labName}/{menuParam}")
	public ModelAndView labUsedCount(@PathVariable("labIds") Integer labId, @PathVariable("labName") String labName,
			@PathVariable("menuParam") Integer menuParam,ModelAndView model,@CookieValue(required = false) String vcoocUserId) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo(), vcoocUserId);
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
				// 创建一个数值格式化对象
				NumberFormat numberFormat = NumberFormat.getInstance();
				// 设置精确到小数点后2位
				numberFormat.setMaximumFractionDigits(2);
				// 整班上课的百分比
				//String wholeClassCountResult = numberFormat.format((float) wholeClassCount / (float) laboratoryCount * 100);
				// 小组上课的百分比
				//String groupCountResult = numberFormat.format((float) groupCount / (float) laboratoryCount * 100);
				// 自主预约的百分比
				//String privateCountResult = numberFormat.format((float) privateCount / (float) laboratoryCount * 100);

				// 整班上课的百分比
				model.addObject("wholeClassCountThan", wholeClassCount);
				// 小组上课的百分比
				model.addObject("groupCountThan", groupCount);
				// 自主预约上课的百分比
				model.addObject("privateCountThan", privateCount);
				
				//自主加班整个班级上课的总数
				model.addObject("countCourse", wholeClassCount+privateCount);
				//判断当前教师有没有排课，用于控制按钮
				model.addObject("thCountCourse", experimentLabStatisticsWebService.selectCountMyCounrse(labId,teacherInfo.getId()));
				
				model.addObject("labName", labName);

				model.addObject("labId", labId);
				
				model.addObject("menuParam", menuParam);

				model.setViewName("admin/lab_manage/lab_used_count");

				return model;
	}

	@RequestMapping("exportLabdata/{labId}")
	@ResponseBody
	public SysResult exportLabdata(@PathVariable("labId") Integer labId, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			//thId 为空导出全部
			experimentLabStatisticsWebService.exportData(response, request, labId,null);
			return SysResult.ok("导出成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("exportMyLabdata/{labId}/{thId}")
	@ResponseBody
	public SysResult exportMyLabdata(@PathVariable("labId") Integer labId,@PathVariable("thId") Integer thId, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			//thId 不为空导出该教师的
			experimentLabStatisticsWebService.exportData(response, request, labId,thId);
			return SysResult.ok("导出成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping("exportMyAllLabdata/{thId}")
	@ResponseBody
	public SysResult exportMyAllLabdata(@PathVariable("thId") Integer thId, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			//thId导出该教师的所有的课程
			experimentLabStatisticsWebService.exportMyAllLabdata(response, request,thId);
			return SysResult.ok("导出成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	
	/**
	 * 获取状态码，用户判断该实验室轮播图片还是视频
	 * 
	 * @param labId
	 *            实验室id
	 * @return
	 */
	@RequestMapping("getStateCode/{labId}")
	@ResponseBody
	public SysResult getStateCode(@PathVariable("labId") Integer labId) {
		try {
			ExperimentLab exLab = experimentLabStatisticsWebService.getStateCode(labId);
			return SysResult.ok(exLab);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
