package com.vcooc.experiment.controller;


import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherRemark;
//import com.vcooc.base.pojo.TeacherRemark;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.TeacherRemarkService;

@Controller
@RequestMapping("teacherRemarkController")
public class TeacherRemarkController {
    @Autowired
     private TeacherRemarkService teacherRemarkService;
  	@Autowired
 	private RedisSessionService redisSessionService;
     /**
 	 * 删除教师评价
 	 * @param vcoocUserId
 	 * @param id
 	 * @return
 	 */
  	@RequestMapping("deleteTeacherRemark")
 	@ResponseBody
 	public SysResult deleteTeacherRemark(@CookieValue(required=false)String vcoocUserId,Integer id){
 		// 通过vcoocUserId获取操作员信息
 				TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
 				if(null==teacherInfo){
 					return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作");
 				}
 				
 				teacherRemarkService.deleetRemark(id);
 				return SysResult.ok();
 	}
  	
  	/**
  	 * 添加教师评价
  	 * @param vcoocUserId
  	 * @param content
  	 * @return
  	 */
  	@RequestMapping("addTeacherRemark")
 	@ResponseBody
 	public SysResult addTeacherRemark(@CookieValue(required=false)String vcoocUserId,TeacherRemark remark){
 		// 通过vcoocUserId获取操作员信息
 				TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
 				if(null==teacherInfo){
 					return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作");
 				}
 				
 				try {
 					return SysResult.ok(teacherRemarkService.addRemark(remark, teacherInfo));
										
					} catch (Exception e) {
						e.printStackTrace();
						return SysResult.build(202,e.getMessage());
			 }
 	}
 	
  	/**
  	 * 根据vcoocUserId获取redis中的TeacherInfo信息
  	 * 
  	 * @param vcoocUserId
  	 * @return
  	 */
  	private TeacherInfo IsExitTeacherInfo(String vcoocUserId) {
  		if (!StringUtils.isNotEmpty(vcoocUserId)) {
  			return null;

  		}
  		// 从redis中获取用户信息
  		Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
  		// 获取操作员信息
  		if (obj != null && obj instanceof TeacherInfo) {
  			TeacherInfo teacherInfo = (TeacherInfo) obj;
  			return teacherInfo;
  		}
  		return null;
  	}

       
    }
