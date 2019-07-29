package com.vcooc.sso.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Menu;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.sso.mapper.MenuMapper;
import com.vcooc.sso.mapper.TeacherInfoMapper;

/**
 * shiro用户信息类，读取用户信息；
 * 原因：由于和shiro相关的service加载顺序不同，到时service中无法加载到配置文件中的信息
 *		所以将shiro相关的service封装成一个类 
 * @author Administrator
 *
 */
@Service
public class ShiroUserService {
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
	/**
	 * 更新教师登录信息
	 * id:教师用户id
	 * loginNumber:登录次数
	 * updateTime:更新时间（登录时间）
	 * @param teacherInfo
	 */
	public void updateTeacherInfoByTeacherId(Map<String,Object> map){
		teacherInfoMapper.updateTeacherInfoByTeacherId(map);
	}
}
