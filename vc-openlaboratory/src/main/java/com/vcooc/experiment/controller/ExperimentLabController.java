package com.vcooc.experiment.controller;


import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.service.ExperimentLabService;

@Controller
@RequestMapping("experimentLabController")
public class ExperimentLabController extends BaseController{
	
	@Autowired
	private ExperimentLabService experimentLabService;
	@Autowired
	private RedisSessionService redisSessionService;
	
	/**
	 * 根据权限查找实验室(实验室管理)
	 * @param menuParam        1、所有; 2、院系;  3、我的;
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("experimentLabList/{menuParam}")
	public ModelAndView list(final @PathVariable Integer menuParam){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				//List<ExperimentLab> lsit =  experimentLabService.selectExperimentLabList(menuParam,teacherInfo);
				mv.addObject("experimentLabList", experimentLabService.selectExperimentLabList(menuParam,teacherInfo));
				mv.addObject("menuParam", menuParam);
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_list");
				return mv;
			}
		});
	}
	
	
	/**
	 * 根据权限查找实验室
	 * @param menuParam  1、所有; 2、院系;  3、我的;
	 * @param p   thisPage:当前页; 默认1
	 * 			  pageSize：查询条数  默认10
	 * @param keyword  关键词搜索
	 * @return
	 */
	@RequestMapping("list/{menuParam}")
	public ModelAndView list(final @PathVariable Integer menuParam,final Page p,final String keyword){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				// TODO Auto-generated method stub
				mv.addObject("page", experimentLabService.selectByMenuParamPage(menuParam,teacherInfo,p,keyword,1));
				mv.addObject("menuParam", menuParam);
				mv.addObject("keyword", keyword);
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_list_static");
				return mv;
			}
		});
	}
	
	
	
	
	/**
	 * 添加实验室
	 * @param img  封面
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("add")
	public ModelAndView add(final @RequestParam(value = "photoFile", required = false) MultipartFile photoFile,
			final ExperimentLab experimentLab,final String labManagerIds,final HttpServletRequest req){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				// TODO Auto-generated method stub
				experimentLabService.insert(photoFile, experimentLab, teacherInfo,labManagerIds,req);
				mv.addObject("status", 200);
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_add");
				return mv;
			}
		});
	}
	
	
	
	/**
	 * 去添加页面
	 * @param menuParam  1、查询所有院系的教师;  2、查询同院系的教师;  3、自己
	 * @return
	 */
	@RequestMapping("toAddPage/{menuParam}")
	public ModelAndView toAddPage(final @PathVariable Integer menuParam){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				// TODO Auto-generated method stub
				mv.addObject("departmentList", 
						experimentLabService.selectTeacherByMenuParam(menuParam, teacherInfo, null));
				mv.addObject("menuParam", menuParam);
				mv.addObject("teacherInfo", teacherInfo);
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_add");
				return mv;
			}
		});
	}
	
	
	/**
	 * 去修改页面
	 * @param labId  实验室id
	 * @return
	 */
	@RequestMapping("toEditPage/{menuParam}/{labId}/{departmentId}")
	public ModelAndView toEditPage(final @PathVariable Integer menuParam,
			final @PathVariable Integer labId ,final @PathVariable("departmentId") Integer departmentId  ){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				// TODO Auto-generated method stub
				
				mv.addObject("departmentList", 
						experimentLabService.selectTeacherByMenuParam(menuParam, teacherInfo, labId));
				ExperimentLab selectById = experimentLabService.selectById(labId);
				mv.addObject("data", selectById);
				mv.addObject("menuParam", menuParam);
				mv.addObject("teacherInfo", teacherInfo);
				mv.addObject("departmentId", departmentId);
				Department de = experimentLabService.selectdepartmentId(departmentId);
				mv.addObject("departmentName", de.getName());
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_edit");
				return mv;
			}
		});
	}
	
	
	
	

	/**
	 * 修改
	 * @param photoFile
	 * @param experimentLab
	 * @return
	 */
	@RequestMapping("edit")
	public ModelAndView edit(final @RequestParam(value = "photoFile", required = false) MultipartFile photoFile,
			final ExperimentLab experimentLab,final String labManagerIds){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				// TODO Auto-generated method stub
				experimentLabService.edit(photoFile, experimentLab, teacherInfo,labManagerIds);
				mv.addObject("status", 200);
				mv.setViewName("admin/experiment_lab_manage/experiment_lab_manage_edit");
				return mv;
			}
		});
	}
	
	
	
	/**
	 * 根据id删除
	 * @param vcoocUserId
	 * @param labId
	 * @return
	 */
	@RequestMapping("delete/{labId}/{labName}")
	@ResponseBody
	public SysResult delete(final @PathVariable("labId") Integer labId ,@PathVariable("labName") final String labName,final HttpServletRequest req){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				// TODO Auto-generated method stub
				experimentLabService.deleteById(labId,labName,req,teacherInfo);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 校验实验室名称
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	@RequestMapping("vaildateName/{labId}")
	@ResponseBody
	public  HuiValidateResult  vaildateName(String param,@PathVariable Integer labId){
		return experimentLabService.vaildateName(param, labId) == true?
				HuiValidateResult.ok("可以使用"):HuiValidateResult.no("该实验室名称已存在");
	}
	
	
	/**
	 * 校验实验室编号
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	@RequestMapping("vaildateNumber/{labId}")
	@ResponseBody
	public  HuiValidateResult  vaildateNumber(String param,@PathVariable Integer labId){
		return experimentLabService.vaildateNumber(param, labId) == true?
				HuiValidateResult.ok("可以使用"):HuiValidateResult.no("该实验室编号已存在");
	}
	
	
	/**
	 *跳转到批量导入课程页面
	 * @param photoFile
	 * @param experimentLab
	 * @return 
	 * @return
	 */
	@RequestMapping("importLabCourse")
	public  ModelAndView importLabCourse(ModelAndView model){
			model.setViewName("admin/experiment_lab_manage/experiment_lab_course_Importlist");
			return model;
	}
	
	/**
	 * 课程批量下载模板
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("downloadModel")
	@ResponseBody
	public SysResult downloadModel(HttpServletRequest request, HttpServletResponse response) {
		try {
			experimentLabService.downloadModel(request, response);
			return SysResult.ok("下载成功");
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}

	}
	
	/**
	 * 使用excel表格批量添加排课信息
	 * 
	 * @param vcoocUserId
	 * @param menuParam
	 * @param teachersFile
	 * @return
	 */
	@RequestMapping("addLabCourseByExcel")
	@ResponseBody
	public SysResult addLabCourseByExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "courseFile", required = false) MultipartFile courseFile,
			@CookieValue(required = false) String vcoocUserId) {
		try {
			Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
			if (obj != null || obj instanceof TeacherInfo) {
				TeacherInfo teacherInfo = (TeacherInfo) obj;
				experimentLabService.addTeacehrInfoByExcel(request, response, courseFile, teacherInfo,
						courseFile.getOriginalFilename());
				return SysResult.ok();
			}else{
				return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, "批量导入预约排课失败，原因："+e.getMessage());
		}

	}
	
	
	/**
	 * 获取具有网关的实验室列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("getGatewayList")
	@ResponseBody
	public SysResult getGatewayList() {
		try {
		List<ExperimentLab> list = 	experimentLabService.getGatewayList();
			return SysResult.ok(list);
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}

	}
	
		
}
