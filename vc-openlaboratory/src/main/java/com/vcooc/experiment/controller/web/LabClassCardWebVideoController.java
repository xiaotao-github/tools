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

import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.web.ExperimentLabStatisticsWebService;
import com.vcooc.experiment.service.web.LabClassCarVideoWebService;
import com.vcooc.experiment.service.web.LabClassCardPicWebService;

/**
 * @author yjt
 *
 */
@Controller
@RequestMapping("labClassCardWebVideoController")
public class LabClassCardWebVideoController {

	@Autowired
	private LabClassCarVideoWebService labClassCarVideoWebService;
	@Autowired
	private LabClassCardPicWebService labClassCarPicWebService;
	@Autowired
	private ExperimentLabStatisticsWebService experimentLabStatisticsWebService;

	@Autowired
	private RedisSessionService redisSessionService;

	/**
	 * 跳转到电子班牌的视频管理界面
	 * 
	 * @param labId
	 *            实验室id
	 * @return ExperimentLab
	 */
	@RequestMapping("Videolist/{labId}")
	public ModelAndView SelectByLabPic(@PathVariable("labId") Integer labId, ModelAndView model) {
		try {
			if (labId == null) {
				model.setViewName("index");
				return null;
			}
			// 获取实验室名称
			model.addObject("exLab", experimentLabStatisticsWebService.finallById(labId));
			model.addObject("page", labClassCarVideoWebService.selectByVideoPage(labId));
			model.addObject("labId", labId);
			model.addObject("pvStatus", labClassCarPicWebService.selectStatus(labId));

			model.setViewName("admin/lab_manage/lab_electronicScreen_video_manage");
			return model;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	/**
	 * 删除视频
	 * 
	 * @param pvid
	 *            视频id
	 * @return
	 */
	@RequestMapping("delete/{id}")
	@ResponseBody
	public SysResult DeletePic(@PathVariable("id") Integer pvid) {
		try {
			labClassCarVideoWebService.deleteById(pvid);
			return SysResult.ok();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * 隐藏状态修改
	 * 
	 * @param pvid
	 *            视频Id
	 * @param isPlay
	 *            状态标识符
	 * @return
	 */
	@RequestMapping("updata/{id}/{isPlay}/{labId}")
	@ResponseBody
	public SysResult updateById(@PathVariable("id") Integer pvid, @PathVariable("isPlay") Integer isPlay,
			@PathVariable("labId") Integer labId, ModelAndView model) {
		try {
			labClassCarVideoWebService.updateById(pvid, isPlay, labId);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202, e.getMessage());
		}
	}

	/**
	 * 添加界面跳转
	 * 
	 * @param labId
	 * @param model
	 * @return
	 */
	@RequestMapping("uploadVideo/{labId}")
	@ResponseBody
	public ModelAndView uploadVideo(@PathVariable("labId") Integer labId, Integer status, ModelAndView model) {
		model.addObject("labId", labId);
		model.addObject("status", status);
		model.setViewName("admin/lab_manage/uploadVideo");
		return model;
	}

	/**
	 * 编辑界面跳转
	 * 
	 * @param pvId
	 * @param model
	 * @return
	 */
	@RequestMapping("editVideo/{pvId}")
	@ResponseBody
	public ModelAndView editVideo(@PathVariable("pvId") Integer pvId, ModelAndView model) {
		model.addObject("videoList", labClassCarVideoWebService.finAllList(pvId));
		model.addObject("pvId", pvId);
		model.setViewName("admin/lab_manage/editVideo");
		return model;
	}

	/**
	 * 添加视频
	 * 
	 * @param labId
	 *            实验室Id
	 * @param title
	 *            标题
	 * @param files
	 *            文件
	 * @param request
	 * @return
	 */
	
	@RequestMapping("addVideoFiles")
	public ModelAndView addFile(Integer labId, String title, String pvDescribe,
			@RequestParam(value = "file", required = true) MultipartFile[] files, HttpServletRequest request
			) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			LabPv labPv = new LabPv();
			labPv.setTitle(title);
			labPv.setLabId(labId);
			labPv.setPvDescribe(pvDescribe);
			labClassCarVideoWebService.addFile(files, labPv, teacherInfo);
			return new ModelAndView("forward:/labClassCardWebVideoController/uploadVideo/"+labId+"?status=200");
		} catch (Exception e) {
			return new ModelAndView("forward:/labClassCardWebVideoController/uploadVideo/"+labId+"?status=202");
		}
	}
	

	/**
	 * 修改视频
	 * 
	 * @param pvId
	 *            实验室id
	 * @param title
	 *            标题
	 * @param files
	 *            文件
	 * @param request
	 * @return
	 */
	@RequestMapping("updateVideoFiles")
	@ResponseBody
	public SysResult updateFile(LabPv labPv) {
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
			labClassCarVideoWebService.updateFile(labPv, teacherInfo);
			SysResult.ok();
		} catch (Exception e) {
			SysResult.build(202, e.getMessage());
		}
		return null;
	}

	/**
	 * 获取播放的视频 labId 实验室Id
	 * 
	 * @return
	 */
	@RequestMapping("selectByLabIdvideo/{labId}")
	@ResponseBody
	public SysResult selectByLabIdVideo(@PathVariable("labId") Integer labId) {
		List<LabPv> labLabPvList = labClassCarVideoWebService.selectByLabIdVideo(labId);
		return SysResult.ok(labLabPvList);
	}

}
