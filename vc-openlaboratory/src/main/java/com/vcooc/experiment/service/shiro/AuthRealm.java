package com.vcooc.experiment.service.shiro;


import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;

public class AuthRealm extends AuthorizingRealm{
	
	@Resource
	private ShiroTeacherInfoService shiroTeacherInfoService;
	
	@Override
	//用来做权限管理的
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
/*		权限管理实现思路
		 *1.获取教师对象信息
		 *2.根据用户对象得到powers   
		 *3.将返回后的字符串设置到modules中 ，然后返回*/
		//List<String>  moduleListA = userService.findModuleLists(user.getUserId());
		
		Set<String> modules = new HashSet<String>();
		User user = (User) SecurityUtils.getSubject().getPrincipal();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		if(user.getType()==1){
			TeacherInfo teacherInfo = shiroTeacherInfoService.findTeacherInfoByUserId(user.getId());
			if(teacherInfo.getPowers()!=null){
				modules  = teacherInfo.getPowers().keySet();
			}
			info.addStringPermissions(modules);
			return info;
		}else{
			return info;
		}
	}

	@Override
	//登陆验证
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		 
			AuthenticationInfo info = 
					new SimpleAuthenticationInfo(null, this.getName());
		return info;
	}
	private static final String OR_OPERATOR = " or ";
	private static final String AND_OPERATOR = " and ";
	private static final String NOT_OPERATOR = "not ";
	/**
     * 支持or and not 关键词  不支持and or混用
     * @param principals
     * @param permission
     * @return
     */
	@Override
    public boolean isPermitted(PrincipalCollection principals, String permission) {
        if(permission.contains(OR_OPERATOR)) {
            String[] permissions = permission.split(OR_OPERATOR);
            for(String orPermission : permissions) {
                if(isPermittedWithNotOperator(principals, orPermission)) {
                    return true;
                }
            }
            return false;
        } else if(permission.contains(AND_OPERATOR)) {
            String[] permissions = permission.split(AND_OPERATOR);
            for(String orPermission : permissions) {
                if(!isPermittedWithNotOperator(principals, orPermission)) {
                    return false;
                }
            }
            return true;
        } else {
            return isPermittedWithNotOperator(principals, permission);
        }
    }
    private boolean isPermittedWithNotOperator(PrincipalCollection principals, String permission) {
        if(permission.startsWith(NOT_OPERATOR)) {
            return !super.isPermitted(principals, permission.substring(NOT_OPERATOR.length()));
        } else {
            return super.isPermitted(principals, permission);
        }
    }
}
