package com.vcooc.sso.mapper;


import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.User;
import com.vcooc.common.mapper.SysMapper;

public interface UserMapper extends SysMapper<User> {
	/**
	 * shiro，根据用户名查询用户信息
	 * @param username
	 * @return
	 */
	User findUserByUserName(@Param("username") String username);
	
	/**
	 * 查询用户名是否存在，
	 * 根据用户id，排除某个用户。
	 * @param username
	 * @param userId
	 * @return
	 */
	Integer validateUserNameById(@Param("username") String username,@Param("userId") String userId);
	

	

}
