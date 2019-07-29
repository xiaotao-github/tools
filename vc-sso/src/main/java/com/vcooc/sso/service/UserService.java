package com.vcooc.sso.service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ThreadContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.IpUtil;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.mapper.StudentInfoMapper;
import com.vcooc.sso.mapper.UserMapper;
import com.vcooc.sso.utils.CookieSSOUtils;
import com.vcooc.sso.utils.EncryptUtil;

@Service
public class UserService extends BaseService<User> {
	
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private ShiroUserService ShiroUserService;
	@Autowired
	private StudentInfoMapper studentInfoMapper;
	@Value("${FreezingNumber}")
	private String FreezingNumber;
	@Value("${SSO_URL}")
	private  String SSO_URL;
	/**
	 * 根据用户名查找当前的用户信息
	 * @param username
	 * @return
	 */
	public User findUserByUserName(String username) {
		return userMapper.findUserByUserName(username);
	}
	/**
	 * 使用shiro框架进行校验
	 * @param username
	 * @param password
	 * @return
	 * @throws Exception 
	 */
	public synchronized  SysResult login(String username,String password,HttpServletRequest request,HttpServletResponse response) throws Exception{
		
			//检查账号是否已经被冻结（根据用户名获取用户的详细信息）
			List<User> failNumberIsNull =  checkUserName(username);
			//进行判断是否已经被禁用
			if(failNumberIsNull.get(0).getStatus().equals(2)){
				return SysResult.build(205, "您的账号输入错误过多已被锁定，请联系管理员解锁！");
			}
			if(failNumberIsNull!=null & failNumberIsNull.get(0).getUsername().equals(username)){
				if(failNumberIsNull.get(0).getUserloginnumber()==Integer.valueOf(FreezingNumber)){
					return SysResult.build(205, "您的账号输入错误过多已被锁定，请联系管理员解锁！");
				}
			}
			
			//使用shiro进行校验
			//1.生成令牌   传入用户输入的username和password
			UsernamePasswordToken token = new UsernamePasswordToken(username,password);
			//2.获取subject
			Subject subject = SecurityUtils.getSubject();
			try {
			subject.login(token);
				//如果没有抛异常 证明登陆成功
				//得到用户的真实对象
				Object obj =  subject.getPrincipal();
				if(obj!=null && obj instanceof User){
						User user = (User)obj;
						//获取当前用户的ip地址
						String clientIp = IpUtil.getClientIpAddr(request);
						user.setLoginIp(clientIp);
						//登陆成功，进行账号登陆次数置0（根据当前操作者的id）
						RecoveryUserData(user.getId());
					//判断用户类型 
					if(1==user.getType()){//老师
						TeacherInfo teacherInfo = ShiroUserService.findTeacherInfoByUserId(user.getId());
						if(teacherInfo ==null){
							SysResult.build(400,"登录失败，数据错误");
						}
						teacherInfo.setUser(user);
						//清除redis中的遗留数据，防止session污染
						subject.getSession().removeAttribute("teacherInfo");
						subject.getSession().removeAttribute("studentInfo");
						//封装需要更新到数据库的数据
						Map<String,Object> mapData = new HashMap<String,Object>();
						mapData.put("id", user.getId());
						mapData.put("preTime",teacherInfo.getUpdateTime());
						mapData.put("updateTime", new Date());
						mapData.put("loginNumber", teacherInfo.getLoginNumber()==null?1:teacherInfo.getLoginNumber()+1);
						mapData.put("status", 3);
						ShiroUserService.updateTeacherInfoByTeacherId(mapData);
						//更新用户登录时间、登录次数
						teacherInfo.setLoginNumber(teacherInfo.getLoginNumber()==null?1:teacherInfo.getLoginNumber()+1);
						teacherInfo.setUpdateTime(new Date());
						teacherInfo.getUser().setStatus(3);
						
						//将teacherInfo对象存入session中
						subject.getSession().setAttribute("teacherInfo", teacherInfo);
						//存储cookie uId（学号）  uName（名字） 下面两行可以注释：目前仅仅只用开放预约的带有（示波器）硬件版本。
						CookieSSOUtils.addUserCookie(String.valueOf(user.getUsername()),"uId",60 * 60,request,response);
						CookieSSOUtils.addUserCookie(String.valueOf(teacherInfo.getName()),"uName",60 * 60,request,response);
					}else if(2==user.getType()){
						StudentInfo studentInfo = studentInfoMapper.findStudentInfoByUserId(user.getId());
						if(studentInfo ==null){
							SysResult.build(400,"登录失败，数据错误");
						}
						studentInfo.setUser(user);
						//清除redis中的遗留数据，防止session污染
						subject.getSession().removeAttribute("teacherInfo");
						subject.getSession().removeAttribute("studentInfo");
						//封装需要更新到数据库的数据
						Map<String,Object> mapData = new HashMap<String,Object>();
						mapData.put("id",user.getId());
						mapData.put("preTime",studentInfo.getUpdateTime());
						mapData.put("loginNumber",studentInfo.getLoginNumber()==null?1:studentInfo.getLoginNumber()+1);
						mapData.put("updateTime", new Date());
						mapData.put("status", 3);
						studentInfoMapper.updateStudentInfoByStudentId(mapData);
						//更新用户登录时间，登录次数
						studentInfo.setLoginNumber(studentInfo.getLoginNumber()==null?1:studentInfo.getLoginNumber()+1);
						studentInfo.setUpdateTime(new Date());
						studentInfo.getUser().setStatus(3);
						//将studentInfo对象存入session中
						subject.getSession().setAttribute("studentInfo", studentInfo);
						//存储cookie uId（学号）  uName（名字） 下面两行可以注释：目前仅仅只用开放预约的带有（示波器）硬件版本。
						CookieSSOUtils.addUserCookie(String.valueOf(user.getUsername()),"uId",60 * 60,request,response);
						CookieSSOUtils.addUserCookie(String.valueOf(studentInfo.getName()),"uName",60 * 60,request,response);
					}else{
						return SysResult.build(400, "未知用户类型");
					}
					return SysResult.ok(user);
				}else{
					return SysResult.build(202,"登录失败");
				}
			} catch (Exception e) {
				e.printStackTrace();
				//登陆失败同时进行校验是否用户名正确而密码输入错误！
				//校验该用户名是否存在？进行10次锁号 ：忽略
				List<User> uName =  checkUserName(username);
				if(uName!=null & uName.get(0).getUsername().equals(username)){
					//进行存表
					Integer Number = uName.get(0).getUserloginnumber()+1;
					User us = new User();
					us.setId(uName.get(0).getId());
					us.setUserloginnumber(Number);
					userMapper.updateByPrimaryKeySelective(us);
					//再次查询失败次数
					List<User> failNumber =  checkUserName(username);
					if(failNumber.get(0).getUserloginnumber()==Integer.valueOf(FreezingNumber)){
						User u = new User();
						u.setUsername(username);
						u.setStatus(2);
						//锁号
						userMapper.updateByPrimaryKeySelective(u);
						return SysResult.build(205, "您的账号输入错误过多已被锁定，请联系管理员解锁！");	
					}
					return SysResult.build(205, "账号或密码错误，你已输错"+failNumber.get(0).getUserloginnumber()+"次!将在"+Integer.valueOf(FreezingNumber)+"次后被锁定");	
				}else{
					return SysResult.build(202, "登录失败");
				}
			}
	}
	
	/**
	 * 登陆成功进行账号登陆次数清零！
	 * @param userId 用户id
	 */
	private void RecoveryUserData(Integer userId) {
		User us = new User();
		us.setId(userId);
		us.setUserloginnumber(0);
		 userMapper.updateByPrimaryKeySelective(us);
	}
	
	/**
	 * 检查该用户名是否存在
	 * @param username
	 */
	private List<User> checkUserName(String username) {
		User us = new User();
		us.setUsername(username);
		List<User> uName =  userMapper.select(us);
		return uName;
	}
	
	
	public void updateLoginUserInfo(){
		Subject subject = SecurityUtils.getSubject();
		Object obj =  subject.getPrincipal();
		if(obj!=null && obj instanceof User){
				User user = (User)obj;
				if(1==user.getType()){//老师
					TeacherInfo teacherInfo = ShiroUserService.findTeacherInfoByUserId(user.getId());
					teacherInfo.setUser(user);
					//清除redis中的遗留数据，防止session污染
					subject.getSession().removeAttribute("teacherInfo");
					subject.getSession().removeAttribute("studentInfo");
					subject.getSession().setAttribute("teacherInfo", teacherInfo);
				}else if(2==user.getType()){
					StudentInfo studentInfo = studentInfoMapper.findStudentInfoByUserId(user.getId());
					studentInfo.setUser(user);
					//清除redis中的遗留数据，防止session污染
					subject.getSession().removeAttribute("teacherInfo");
					subject.getSession().removeAttribute("studentInfo");
					subject.getSession().setAttribute("studentInfo", studentInfo);
				}
		}
	}
	
	/**
	 * 去redis中查询用户信息
	 * @return
	 */
	public Object queryUser(String vcoocUserId) {
		if(StringUtils.isNotEmpty(vcoocUserId)){
			//根据vcoocUserId去redis中获取用户信息
			Object obj = redisSessionService.querySessionStudentInfo(vcoocUserId);
			if(obj!=null){ //判断是否非空
				return obj;
			}else{ 
				obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
				if(obj!=null){
					return obj;
				}
			}
		}
		return null;
	}
	/**
	 * 校验用户名唯一性
	 * false：不存在
	 * true：存在
	 */
	public Boolean  validateUserNameById(String username,String userId){
		Integer result = userMapper.validateUserNameById(username, userId);
		if(result>=1){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 清理缓存 更换当前线程
	 * @param response 
	 * @param request 
	 */
	public void delectUserCache(HttpServletRequest request, HttpServletResponse response) {
		//CookieSSOUtils	ck = new CookieSSOUtils();
		CookieSSOUtils.delectUserCache(request,response,SSO_URL);
	}
	
}
