package com.vcooc.experiment.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.LabBlacklistService;
import com.vcooc.experiment.service.TeacherLogInformationService;
/**
 * 实验室黑名单
 * @author Administrator
 *
 */
@Controller
@RequestMapping("lab/black")
public class LabBlacklistController {
	
	@Autowired
	private LabBlacklistService labBlacklistService;
	
	@Autowired
	private RedisSessionService  redisSessionService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	
	//实验室黑名单列表
	@RequestMapping("list")
	public ModelAndView list(Map<String,Object> map){
		List<StudentInfo> studentInfos = labBlacklistService.list();
		map.put("studentInfos", studentInfos);
		return new ModelAndView("admin/experiment_lab_manage/lab_black_list",map); 
	}
	
	//将学生加入黑名单
	@RequestMapping("add")
	@ResponseBody
	public SysResult add(Integer studentId,@CookieValue(required=false) String vcoocUserId,HttpServletRequest req,String name,String username){
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
			if(teacherInfo==null){
				return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
			}
			labBlacklistService.add(studentId);
			TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),teacherInfo.getName()+"将"+name+"账号为"+username+"拉入实验室黑名单",7);
			teacherLogInformationService.saveSelective(record);
			return SysResult.build(200,"已加入黑名单");
		} catch (RuntimeException e) {
			return SysResult.build(202,e.getMessage());
		}
	}
	
	//将学生从黑名单移除 参数黑名单id
	@RequestMapping("del")
	@ResponseBody
	public SysResult del(Integer blacklistId,@CookieValue(required=false) String vcoocUserId,HttpServletRequest req,String name,String username){
		try {
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
			if(teacherInfo==null){
				return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
			}
			labBlacklistService.del(blacklistId);
			
			TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),teacherInfo.getName()+"将"+name+"账号为"+username+"移出实验室黑名单",7);
			teacherLogInformationService.saveSelective(record);
			return SysResult.build(200,"已从黑名单移除");
		} catch (RuntimeException e) {
			return SysResult.build(202,e.getMessage());
		}
	}
}
