package com.vcooc.experiment.service.shiro;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Menu;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.experiment.mapper.MenuMapper;
import com.vcooc.experiment.mapper.TeacherInfoMapper;
@Service
public class ShiroTeacherInfoService {
	@Autowired
	private TeacherInfoMapper teacherInfoMapper;
	@Autowired
	private MenuMapper menuMapper;
	/**
	 * 根据教师id查询教师信息。
	 * 同时封装用户权限power
	 * @param userId
	 * @return
	 */
	public TeacherInfo findTeacherInfoByUserId(Integer userId) {
		TeacherInfo teacherInfo = teacherInfoMapper.findTeacherInfoByUserId(userId);
		//根据教师角色id，查询教师角色权限
		if(teacherInfo.getRole()!=null){
			List<Menu> menus =  menuMapper.getMenusByRoleId(teacherInfo.getRole().getId());
			teacherInfo.getRole().setMenus(menus);
			//封装教师所有权限
			Map<String,String> menuNameMap = new HashMap<String,String>();
			for (Menu menu : menus) {
				menuNameMap.put(menu.getName(), menu.getId()+"");
			}
			teacherInfo.setPowers(menuNameMap);
			}
		return teacherInfo;
	}
}
