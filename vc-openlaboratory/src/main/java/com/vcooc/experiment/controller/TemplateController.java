package com.vcooc.experiment.controller;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.vcooc.base.pojo.ExperimentTemplate;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentTemplateService;

/**2019-1-22 提出的需求，即进行 新建模板功能需求，新建模板表。
 * 实验模板 -2019
 * @author ITcast
 *
 */
@Controller
@RequestMapping("templateController")
public class TemplateController {
	
	@Autowired
	private ExperimentTemplateService experimentTemplateService;
	@Autowired
	private RedisSessionService redisSessionService;
	
	
	/**
	 * 跳转到添加模板页面
	 * @param exId 实验id
	 * @param exName 实验名称
	 * @return
	 */
	@RequestMapping("JumpAddTemplatePage/{exId}/{exName}")
	public ModelAndView JumpTemplatePage(@PathVariable("exId") Integer exId,@PathVariable("exName") String exName,
			ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		model.addObject("experimentId", exId);
		model.addObject("exName", exName);
		//编辑器路径
		model.addObject("experimentFilePath", experimentTemplateService.getTemplatePath(teacherInfo));
		model.setViewName("admin/template/template_manage_add");
		return model;
	}
	
	
	/**
	 * 添加模板
	 */
	@RequestMapping("addTemplate/{exId}")
	@ResponseBody
	public SysResult addTemplate(@PathVariable("exId") Integer exId,HttpServletRequest req){
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			experimentTemplateService.addTemplate(exId,req,teacherInfo);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 跳转到修改模板页面
	 * @param etId 模板id
	 * @param exName 实验名称
	 * @return
	 */
	@RequestMapping("JumpUpdateTemplatePage/{exId}/{exName}")
	public ModelAndView JumpUpdateTemplatePage(@PathVariable("exId") Integer exId,@PathVariable("exName") String exName,
			ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		model.addObject("experimentId", exId);
		model.addObject("exName", exName);
		model.addObject("et", experimentTemplateService.getTemplatePage(exId));
		model.addObject("experimentFilePath", experimentTemplateService.getTemplatePath(teacherInfo));
		model.setViewName("admin/template/template_manage_edit");
		return model;
	}
	
	/**
	 * 保存修改模板
	 */
	@RequestMapping("updateTemplate")
	@ResponseBody
	public SysResult updateTemplate(ExperimentTemplate ext,HttpServletRequest req){
		try {
			
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			experimentTemplateService.updateTemplate(ext,req,teacherInfo);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 删除模板
	 */
	@RequestMapping("deleteTemplate/{etId}")
	@ResponseBody
	public SysResult deleteTemplate(@PathVariable("etId") Integer etId,HttpServletRequest req){
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			experimentTemplateService.deleteTemplateExId(etId,req,teacherInfo);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	/**
	 * 根据实验删除模板
	 */
	@RequestMapping("deleteTemplateExId/{exId}")
	@ResponseBody
	public SysResult deleteTemplateExId(@PathVariable("exId") Integer exId,HttpServletRequest req){
		try {
			
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());

			experimentTemplateService.deleteTemplateExId(exId,req,teacherInfo);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}
	
	
	
	
	

}
