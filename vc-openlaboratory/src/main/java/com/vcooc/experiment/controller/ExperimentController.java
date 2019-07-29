package com.vcooc.experiment.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;

import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.TeacherLogInformationService;


@Controller
@RequestMapping("experimentController")
public class ExperimentController {
	@Autowired
	private ExperimentService experimentService;
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
		
	/**
	 * 1.根据权限，查询实验信息，跳转到实验信息展现页面。
	 * menuParam==1 查看所有实验、menuParam==2查看院系实验、menuParam==3查看我的实验；
	 * 
	 * @param menuParam
	 *  @param systemIdentify   预约实验
	 * @return
	 */
	@RequestMapping("selectExperimentToPage/{vcoocUserId}/{menuParam}")
	public ModelAndView selectExperimentToPage(@PathVariable("menuParam") Integer menuParam,
			@PathVariable String vcoocUserId,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			model.addObject("msg", "由于您长时间未操作，请登录后操作");
			model.setViewName("error");
			return model;
		}
		//2 ：开放与预约管理实验   1 是虚拟仿真实验 （不使用）
		int systemIdentify = 2;
		List<Experiment> experimentList = experimentService.selectExperimentByMenuParam(menuParam,teacherInfo,systemIdentify);
		model.addObject("experimentList", experimentList);
		model.addObject("menuParam", menuParam);
		model.setViewName("admin/experiment_manage/experiment_manage_list");
		return model;
	}
	
	/**
	 * 跳转到添加当前课程实验页面
	 * 1.查询课程信息
	 * 2.生成实验资源存放路径
	 * @param menuParam 参数，用于查询课程信息
	 * @param map 封装返回值
	 * @return courseList experimentFilePath
	 */
	@RequestMapping("toAddExperimentPage/{menuParam}/{experimentCourseId}/{courseName }")
	public ModelAndView toAddExperimentPage(@PathVariable("menuParam") Integer menuParam/*,Integer status,String msg*/
			,@PathVariable("experimentCourseId") Integer experimentCourseId
			,@PathVariable("courseName ") String courseName 
			,Map<String,Object> map){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		Map<String,Object> data = experimentService.toAddExperimentPage(menuParam,teacherInfo);
		map.put("status", 200);
		map.put("experimentCourseId", experimentCourseId);
		map.put("courseName", courseName);
		map.put("menuParam", menuParam);
		return new ModelAndView("admin/experiment_manage/experiment_manage_add",data);
	}
	
	
	/**
	 * 跳转到添加所有实验页面
	 * 1.查询课程信息
	 * 2.生成实验资源存放路径
	 * @param menuParam 参数，用于查询课程信息
	 * @param map 封装返回值
	 * @return courseList experimentFilePath
	 */
	@RequestMapping("toAddAllExperimentPage/{menuParam}")
	public ModelAndView toAddAllExperimentPage(@PathVariable("menuParam") Integer menuParam,Integer status,String msg
			,Map<String,Object> map){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		Map<String,Object> data = experimentService.toAddExperimentPage(menuParam,teacherInfo);
		map.put("status", status);
		map.put("menuParam", menuParam);
		return new ModelAndView("admin/experiment_manage/experiment_manage_addAll",data);
	}
	
	
	
	/**
	 * 添加实验数据
	 * @param vcoocUserId 操作者ID
	 * @param experiment 实验数据
	 * @return
	 */
	@RequestMapping("addExperiment")
	public ModelAndView addExperiment(Experiment experiment
			,@RequestParam("menuParam")Integer menuParam 
			,@RequestParam(value = "courseName", required = false) String courseName 
			,HttpServletRequest req,Map<String,Object> map){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		try {
			experimentService.addExperiment(experiment,teacherInfo,req);
			return new ModelAndView ("forward:/experimentController/toAddAllExperimentPage/"+menuParam+"?status=200");
		} catch (RuntimeException e) {
			map.put("status", 402);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}
	/**
	 * 根据实验ID，查询实验信息，跳转到修改实验页面
	 * @param experimentId 实验ID
	 * @param model 模型
	 * @return
	 */
	@RequestMapping("selectExperimentToEditPage/{experimentId}/{menuParam}")
	public ModelAndView selectExperimentToEditPage(@PathVariable("experimentId") Integer experimentId,@PathVariable("menuParam")Integer menuParam,Integer status){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		if(teacherInfo==null){
			throw new RuntimeException("由于您长时间未操作，请登录后再进行操作");
		}
		Map<String, Object> data = experimentService.selectExperimentToEdit(experimentId,menuParam,teacherInfo);
		//获取编辑器保存的路径
		data.put("manuParam", menuParam);
		if(status!=null){
			data.put("status", status);
		}
		return new ModelAndView("admin/experiment_manage/experiment_manage_edit",data);
	}
	/**
	 * 修改实验数据
	 * @param experiment 实验数据
	 * @return
	 */
	@RequestMapping("updateExperiment/{menuParam}")
	public String updateExperiment(@RequestParam("experimentInstructorBag")String experimentInstructorBag
			,@RequestParam("authorId")Integer authorId
			,@RequestParam("experimentId") Integer experimentId 
			,@RequestParam("experimentName")String experimentName
			,@RequestParam("experimentType")Integer experimentType
			,@RequestParam("level")Integer level
			,@RequestParam("needHour") Integer needHour
			,@RequestParam(value="experimentPresentation",required=false) String experimentPresentation
			,@PathVariable("menuParam")Integer menuParam 
			,HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		if(teacherInfo==null){
			throw new RuntimeException("由于您长时间未操作，请登录后再进行操作");
		}
		Experiment experiment = new Experiment ();
		experiment.setAuthorId(authorId);//作者Id
		experiment.setExperimentId(experimentId);//Id
		experiment.setExperimentName(experimentName);//实验名称
		experiment.setNeedHour(needHour);//实验课时
		experiment.setExperimentType(experimentType);//实验类型
		experiment.setLevel(level);//实验难度
		experiment.setExperimentPresentation(experimentPresentation);//实验介绍
		experiment.setExperimentInstructorBag(experimentInstructorBag);//文件存放的路径
		experimentService.newUpdateExperiment(experiment,teacherInfo,req);
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"修改了实验《"+experiment.getExperimentName()+"》", 5);
		teacherLogInformationService.saveSelective(record);
		
		return "forward:/experimentController/selectExperimentToEditPage/"+experiment.getExperimentId()+"/"+menuParam+"?status=200";
	}
	/**
	 * 修改实验实验标准答案展现方式
	 */
	@RequestMapping("updateExperimentAnswerShowWay")
	@ResponseBody
	public SysResult updateExperimentAnswerShowWay(Experiment experiment){
		try {
			experimentService.updateSelective(experiment);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 3.伪删除实验
	 * @param experimentId
	 * @param stealth
	 * @return
	 */
	@RequestMapping("updateExperimentStealth/{experimentId}")
	@ResponseBody
	public SysResult updateExperimentStealth(@CookieValue("vcoocUserId") String vcoocUserId,@PathVariable("experimentId") Integer experimentId,HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203, "由于您长时间未操作，请登录后再进行操作");
		}
		Experiment experiment = new Experiment();
		experiment.setStealth(1);
		experiment.setExperimentId(experimentId);
		experiment.setUpdateTime(new Date());
		//修改之前查询下该实验的信息，用于显示实验操作记录
		Experiment ex = experimentService.selectById(experimentId);
		//再进行伪删除
		experimentService.updateSelective(experiment);
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"删除了实验《"+ex.getExperimentName()+"》", 5);
		teacherLogInformationService.saveSelective(record);
		return SysResult.ok();
	}
	/**
	 * 跳转到实验模板页面
	 * @return
	 */
	@RequestMapping("selectExperimentToMubanPage/{experimentId}")
	public ModelAndView selectExperimentToMubanPage(@PathVariable Integer experimentId,ModelAndView model){
		model.addObject("experiment", experimentService.queryById(experimentId));
		model.setViewName("admin/experiment_manage/experiment_add_muban");
		return model;
	}
	/**
	 * 修改实验模板数据
	 * @param experiment 实验数据
	 * @return
	 */
	@RequestMapping("updateExperimentMuban")
	@ResponseBody
	public SysResult updateExperimentMuban(Experiment experiment,HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		if(teacherInfo==null){
			return SysResult.build(203, "由于您长时间未操作，请登录后再进行操作");
		}
		try {
			experiment.setUpdateTime(new Date());
			experimentService.updateSelective(experiment);
			TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"修改了实验《"+experiment.getExperimentName()+"》的模板", 5);
			teacherLogInformationService.saveSelective(record);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 修改实验模板数据 跳转到实验修改页面
	 * @param experiment 实验数据
	 * @return
	 */
	@RequestMapping("updateExperimentMubanToEdit/{menuParam}")
	public ModelAndView updateExperimentMubanToEdit(@PathVariable Integer menuParam,Experiment experiment,Map<String,Object> map,HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		if(teacherInfo==null){
			throw new RuntimeException("由于您长时间未操作，请登录后再进行操作");
		}
		experiment.setUpdateTime(new Date());
		experimentService.updateSelective(experiment);
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"修改了实验《"+experiment.getExperimentName()+"》的模板", 5);
		teacherLogInformationService.saveSelective(record);
		return new ModelAndView("forward:/experimentController/selectExperimentToEditPage/"+experiment.getExperimentId()+"/"+menuParam+"?status=200");
		
	}
	/**
	 * 跳转到实验预览页面
	 * @return
	 */
	@RequestMapping("selectExperimentToPreviewPage/{experimentId}")
	public ModelAndView selectExperimentToPreviewPage(@PathVariable Integer experimentId,ModelAndView model){
		//根据实验id 获取所属的课程
		model.addObject("experiment", experimentService.selectExperimentByExperimentId(experimentId));
		model.setViewName("admin/experiment_manage/preview");
		return model;
	}
	/**
	 * 根据实验课程ID查询 设计实验信息
	 * @return
	 */
	@RequestMapping("selectExperimentByExperimentCourseId/{experimentCourseId}/{identify}")
	@ResponseBody
	public SysResult selectExperimentByExperimentCourseId(@PathVariable("experimentCourseId") Integer experimentCourseId,@PathVariable("identify") Integer identify){
		List<Experiment> experimentList = experimentService.selectExperimentByExperimentCourseIdAndStealth(experimentCourseId,2,identify);
		if(experimentList==null||experimentList.isEmpty()){
			return SysResult.build(202,"该实验室下无分配实验");
		}
		return SysResult.ok(experimentList);
	}
	/**
	 * 修改实验开发状态
	 * 1.不开放
	 * 2.院系开放
	 * 3.完全开放
	 * @param status
	 * @param experimentIds
	 * @return
	 */
	@RequestMapping("updateExperimentStatus/{status}")
	@ResponseBody
	public SysResult updateExperimentStatus(@PathVariable Integer status,Integer[] experimentIds){
		try {
			experimentService.updateExperimentStatus(status,experimentIds);
			return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
			return  SysResult.build(202, "修改失败，原因："+e.getMessage());
		}
	}
	
	//更新插入实验的成绩评定
	@RequestMapping("updateexperimentStand/{str}")
	@ResponseBody
	public SysResult updateexperimentStand(@PathVariable("str")String str){
		
		experimentService.updateExperimentStandard(str);
		return SysResult.ok();
	}

	/**
	 * 跳转到查看全部实验界面 并且查看全部数据
	 * @return
	 */
	@RequestMapping("selectExperimentList/{menuParam}")
	public ModelAndView selectExperimentList(@PathVariable("menuParam") Integer menuParam,  ModelAndView model){
		model.addObject("experimentList", experimentService.selectExperimentList());
		model.addObject("{menuParam",menuParam);
		model.setViewName("admin/experiment_manage/experiment_manage_allCheck");
		return model;
	}
	
}
