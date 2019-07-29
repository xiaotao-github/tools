package com.vcooc.experiment.controller.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.LabNotice;
import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.Page;

import com.vcooc.base.pojo.TeacherInfo;

import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.BaseController;
import com.vcooc.experiment.service.web.ExperimentLabStatisticsWebService;
import com.vcooc.experiment.service.web.LabClassCardPicWebService;


/**
 * @author ITcast
 *
 */
@Controller
@RequestMapping("labClassCardPicWebController")
public class LabClassCardWebPicController extends BaseController {
	
	@Autowired
	private ExperimentLabStatisticsWebService  experimentLabStatisticsWebService;
	
	@Autowired
	private LabClassCardPicWebService labClassCarPicWebService;

	@Autowired
	private RedisSessionService redisSessionService;

	/**
	 * 跳转到电子班牌的图片管理界面
	 * 
	 * @param labId
	 *            实验室id
	 * @return 
	 */
	@RequestMapping("Piclist/{labId}")
	public ModelAndView SelectByLabPic(@PathVariable("labId") Integer labId, Page p, ModelAndView model) {
		try {

			if (labId == null) {
				model.setViewName("index");
				return model;
			}
			//获取实验室名称
			model.addObject("exLab",experimentLabStatisticsWebService.finallById(labId));
			model.addObject("page", labClassCarPicWebService.selectByPicPage(p, labId));
			model.addObject("labId", labId);
			model.addObject("pvStatus", labClassCarPicWebService.selectStatus(labId));
			model.setViewName("admin/lab_manage/lab_electronicScreen_banner_manage");
			return model;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	/**
	 * 删除图片
	 * 
	 * @param pvid
	 * @return
	 */
	@RequestMapping("delete/{id}")
	@ResponseBody
	public SysResult DeletePic(@PathVariable("id") Integer pvid) {
		try {
			labClassCarPicWebService.deleteById(pvid);
			return SysResult.ok();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * 修改图片隐藏状态
	 * @param pvid 图片Id
	 * @param isShow 状态标识符
	 * @return
	 */
	@RequestMapping("updata/{id}/{isShow}")
	@ResponseBody
	public SysResult updateById(@PathVariable("id") Integer pvid, @PathVariable("isShow") Integer isShow) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			labClassCarPicWebService.updateById(pvid, isShow,teacherInfo);
			return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 添加界面跳转
	 * @param labIds 实验室Id
	 * @return
	 */
	@RequestMapping("uploadBanner/{labId}")
	@ResponseBody
	public ModelAndView uploadBanner(@PathVariable("labId") Integer labId, Integer status ,ModelAndView model) {
		model.addObject("status", status);
		model.addObject("labId", labId);
		model.setViewName("admin/lab_manage/uploadBanner");
		return model;
	}

	/**
	 * 添加图片
	 * @param labId 实验室Id
	 * @param title 标题 
	 * @param files 图片
	 * @param request
	 * @return
	 */
	@RequestMapping("addPicFiles")
	public ModelAndView addFile(Integer labId, String title,
			@RequestParam(value = "file", required = true) MultipartFile[] files, HttpServletRequest request
			) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			LabPv labPv = new LabPv();
			labPv.setTitle(title);
			labPv.setLabId(labId);
			labClassCarPicWebService.addFile(files, labPv, teacherInfo);
			return new ModelAndView("forward:/labClassCardPicWebController/uploadBanner/"+labId+"?status=200");
		} catch (Exception e) {
			return new ModelAndView("forward:/labClassCardPicWebController/uploadBanner/"+labId+"?status=202");
		}
	}
	

	/**根据实验室Id修改实验室默认的轮播或者视频状态
	 * @param labId
	 * @param pvStatus
	 * @return
	 */
	@RequestMapping("updateStatus/{labId}/{pvStatus}")
	@ResponseBody
	public SysResult updateSttu(@PathVariable("labId") Integer labId, @PathVariable("pvStatus") Integer pvStatus) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			labClassCarPicWebService.updateStatu(teacherInfo, labId, pvStatus);
			return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 获取轮播图片
	 * labId 实验室Id
	 * @return
	 */
	@RequestMapping("selectByLabIdPic/{labId}")
	@ResponseBody
	public SysResult selectByLabIdPic(@PathVariable("labId")Integer labId){
		try{
			List<LabPv> labLabPvList = labClassCarPicWebService.selectByLabIdPic(labId);
			return SysResult.ok(labLabPvList);
		}catch(Exception e){
			return SysResult.build(202,e.getMessage());
		}
	}
	

}
