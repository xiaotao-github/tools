package com.vcooc.sso.service.shiro;


import java.util.HashSet;
import java.util.Set;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;
import com.vcooc.sso.service.ShiroUserService;
import com.vcooc.sso.service.UserService;



public class AuthRealm extends AuthorizingRealm{
	
	@Autowired
	private ShiroUserService shiroUserService;
	@Autowired
	private UserService  userService;
	
	@Override
	//用来做权限管理的
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
/*		权限管理实现思路
		 *1.获取教师对象信息
		 *2.根据用户对象得到powers   
		 *3.将返回后的字符串设置到modules中 ，然后返回*/
		//List<String>  moduleListA = userService.findModuleLists(user.getUserId());	
		Set<String> modules = new HashSet<String>();
		User user =  (User)SecurityUtils.getSubject().getPrincipal();
		
		if(user.getType()==1){
			TeacherInfo teacherInfo = 	shiroUserService.findTeacherInfoByUserId(user.getId());
			if(teacherInfo.getPowers()!=null){
				modules  = teacherInfo.getPowers().keySet();
			}
		}
		//前台需要，返回权限信息
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		info.addStringPermissions(modules);
		return info;
	}

	@Override
	//登陆验证
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		/*
		 * 登陆验证的思路
		 * 1.获取用户传入的用户名username  用户名必然唯一
		 * 2.根据用户名查询出真实的用户
		 * 3.将真实的用户、真实的密码、当前realm的名称一起传入AuthenticationInfo  然后返回
		 */
		
		UsernamePasswordToken loginToken = (UsernamePasswordToken) token;
		String username = loginToken.getUsername();
		
		//根据用户名查询用户   该对象是数据库中真实的对象
		User user =  userService.findUserByUserName(username);
		
		/*创建认证对象 然后返回    
		 *参数1.真实的user对象
		 *参数2.真实用户密码
		 *参数3.当前realm的名称
		 * 
		 */
		AuthenticationInfo info = 
				new SimpleAuthenticationInfo(user, user.getPassword(), this.getName());
		return info;
	}
}
