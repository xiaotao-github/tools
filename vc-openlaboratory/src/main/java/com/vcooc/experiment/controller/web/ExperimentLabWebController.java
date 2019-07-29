package com.vcooc.experiment.controller.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.dto.ClockingInDTO;
import com.vcooc.experiment.dto.ScheduleDTO;
import com.vcooc.experiment.service.web.ExperimentLabWebService;

/**
 * 通过webSocket连接
 * @author Administrator
 *
 */
@Controller
@RequestMapping("blank")
public class ExperimentLabWebController {
	@Autowired
	private ExperimentLabWebService experimentLabWebService;
	
	/**
	 * 查询实验室信息 
	 * @param labId 实验室id
	 * @return ExperimentLab
	 */
	@RequestMapping("findLabById/{labId}")
	@ResponseBody
	public SysResult findLabById(@PathVariable("labId")Integer labId){
		try{
			ExperimentLab experimentLab = experimentLabWebService.getExperimentLabById(labId);
			return SysResult.ok(experimentLab);
		}catch(Exception e){
			return SysResult.build(202,e.getMessage());
		}
	}
	/**
	 * 根据实验室id 查询该实验室 当前课程信息
	 * @param labId  实验室id
	 * @return CourseSchedule
	 */
	@RequestMapping("findNowCourseByLabId/{labId}")
	@ResponseBody
	public SysResult findNowCourseByLabId(@PathVariable("labId") Integer labId){
		try{
			CourseSchedule schedule = experimentLabWebService.findNowCourseByLabId(labId);
			return SysResult.ok(schedule);
		}catch(Exception ex){
			ex.printStackTrace();
			return SysResult.build(202,ex.getMessage());
		}
	}
	
	/**
	 * 根据课程表id查询课程学生的考勤信息
	 * @param shceduleId 课程表id
	 * @return map  none：未考勤  normal：正常考勤  delay：迟到
	 */
	@RequestMapping("selectClockInByScheduleId/{shceduleId}")
	@ResponseBody
	public SysResult selectClockInByScheduleId(@PathVariable("shceduleId") Integer shceduleId){
		try{
			Map<String, List<ClockingInDTO>> map = experimentLabWebService.selectClockInByScheduleId(shceduleId);
			return SysResult.ok(map);
		}catch(Exception ex){
			return SysResult.build(202,ex.getMessage());
		}
	}
	//根据实验室id 查询当前实验室当周的课程表信息
	@RequestMapping("selectLabSchedule/{labId}")
	@ResponseBody
	public SysResult selectLabSchedule(@PathVariable("labId") Integer labId){
		try{
			List<ScheduleDTO> scheduleDTOs = experimentLabWebService.selectLabSchedule(labId);
			return SysResult.ok(scheduleDTOs);
		}catch(Exception ex){
			return SysResult.build(202,ex.getMessage());
		}
	}

}
