package com.vcooc.experiment.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ResourceCategoryService;

@Controller
@RequestMapping("resourceCategoryController")
public class ResourceCategoryController {
	    @Autowired
        private ResourceCategoryService resourceCategoryService;
     	@Autowired
    	private RedisSessionService redisSessionService;
         
     	/**
     	 * 查询该操作员的所有资源标签
     	 * @param vcoocUserId
     	 * @return
     	 */
    	@RequestMapping("selectAllResourceCategoryByTeacherInfoId")
    	@ResponseBody
    	public SysResult selectAllResourceCategoryByTeacherInfoId(@CookieValue(required=false)String vcoocUserId){
    		// 通过vcoocUserId获取操作员信息
    				TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
    				if(null==teacherInfo){
    					return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作");
    				}
    				
    		return SysResult.ok(resourceCategoryService.selectResourceCategoryByTeacherInfoId(teacherInfo.getId()));
    	}
         
    	/**
    	 * 删除资源标签
    	 * @param vcoocUserId
    	 * @param id
    	 * @return
    	 */
     	@RequestMapping("deleteResourceCategory/{id}")
    	@ResponseBody
    	public SysResult deleteResourceCategory(@CookieValue(required=false)String vcoocUserId,@PathVariable("id")Integer id){
    		// 通过vcoocUserId获取操作员信息
    				TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
    				if(null==teacherInfo){
    					return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作");
    				}
    				
    				resourceCategoryService.deleteResourceCategory(id);
    				return SysResult.ok();
    	}
     	
     	/**
     	 * 添加资源标签
     	 * @param vcoocUserId
     	 * @param content
     	 * @return
     	 */
     	@RequestMapping("addResourceCategory")
    	@ResponseBody
    	public SysResult addResourceCategory(@CookieValue(required=false)String vcoocUserId,String content){
    		// 通过vcoocUserId获取操作员信息
    				TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
    				if(null==teacherInfo){
    					return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作");
    				}
    				
    				
    				try {
    					if(content!=null){
    						content=content.trim().replace(" ", ",").replace("，", ",");
    						String[] arr=content.split(",");
        				    return SysResult.ok(resourceCategoryService.addResourceCategory(arr, teacherInfo));
    					}else {
    						
    						return SysResult.build(202,"标签不能为空");
    					}
    		
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
