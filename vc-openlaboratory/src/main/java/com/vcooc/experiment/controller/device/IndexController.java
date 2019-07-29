package com.vcooc.experiment.controller.device;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.deviceService.IndexService;

/**
 * 模板页面接收硬件图片数据处理
 * @author ITcast
 *
 */
@Controller
@RequestMapping("IndexController")
public class IndexController {
	
	@Autowired
	private IndexService indexService;


	/*//接文件
	@RequestMapping("addFiles")
	@ResponseBody
	public SysResult addFile(String userName, String userId,
			@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request
			) {
		try {
		indexService.addFile(userName, userId, file);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202,"数据错误");
		}
	}*/
	
	//接收实验动态图数据--2019.04.25修改，
	/*@RequestMapping("reciverImg")
	@ResponseBody
	public SysResult receiveImgData(@RequestParam("experimentId") String experimentId
			, @RequestParam("userId") String userId,
			@RequestParam("imgData")String imgData, HttpServletRequest request) {
		try {
			indexService.receiveImgData(experimentId, userId, imgData);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202,"数据错误");
		}
	}*/

}
