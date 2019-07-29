/*package com.vcooc.experiment.controller;
 * 
 * 预计删除
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.service.ScourseGroupService;

@Controller
@RequestMapping("scheduleGroupController")
public class ScheduleGroupController extends BaseController{
	@Autowired
	private ScourseGroupService scourseGroupService;
	
	*//**
	 * 通过班级id获取小组模板
	 * 		source为0的小组
	 * @param classId
	 * @return
	 *//*
	@RequestMapping("getGroupByClassId/{classId}/{experimentId}")
	@ResponseBody
	public SysResult getGroupByClassId(final @PathVariable("classId") Integer classId,final @PathVariable("experimentId") Integer experimentId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				// TODO Auto-generated method stub
				sysResult.setData(scourseGroupService.getGroupByClassId(classId, 0,experimentId));
				return sysResult;
			}
		});
	}
	
	
	@RequestMapping("getGroupMember/{groupId}")
	@ResponseBody
	public SysResult getGroupMember(final @PathVariable Integer groupId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				// TODO Auto-generated method stub
				sysResult.setData(scourseGroupService.getGroupMember(groupId));
				return sysResult;
			}
		});
	}
	

}
*/