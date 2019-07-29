package com.vcooc.sso.service;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.base.pojo.Menu;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.Encrypt;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.common.util.SensitiveWord;
import com.vcooc.common.util.Validation;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.mapper.MenuMapper;
import com.vcooc.sso.mapper.TeacherInfoMapper;
import com.vcooc.sso.mapper.UserMapper;
import com.vcooc.sso.utils.ImageUtils;

@Service
public class TeacherInfoService {
	
	@Autowired
	private TeacherInfoMapper teacherInfoMapper;
	@Autowired
	private MenuMapper menuMapper;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private UserService userService;
	// 文件上传地址前缀
	@PropertyConfig
	private String FILE_PATH;
	//项目名前缀
	@PropertyConfig
	private String SSO_MANAGE;
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
	 * 教师注册，返回注册结果
	 * true ： 注册成功
	 * false： 注册失败
	 * @param teacherInfo
	 * @return
	 */
	public void addTeacher(TeacherInfo teacherInfo) {
		/*
		 * 1.添加用户信息（user）
		 * 2.添加教师信息（teacherInfo)
		 */
		//添加用户
		User user = teacherInfo.getUser();
		user.setCreateTime(new Date());
		user.setUpdateTime(user.getCreateTime());
		//密码加密
		String md5 = Encrypt.getMd5(user.getUsername(),user.getPassword());
		user.setPassword(md5);
		user.setStatus(3);
		user.setStealth(2);
		userMapper.insert(user);
		List<User> us = userMapper.select(user);
		//得到用户id
		User u = us.get(0);
		teacherInfo.setUser(u);
		teacherInfo.setSource(2);
		teacherInfo.setCreateTime(new Date());
		teacherInfo.setUpdateTime(teacherInfo.getCreateTime());
		//添加教师信息
		teacherInfoMapper.addTeacher(teacherInfo);
	}
    
	/**
	 * 根据vcoocUserId查询教师信息
	 * @param vcoocUserId
	 * @return
	 * @throws Exception
	 */
	public TeacherInfo selectTeacherInfoByVoocUserId(String vcoocUserId) throws Exception{
		// 从redis中获取用户信息
		Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
		if (obj != null && obj instanceof TeacherInfo) {
			TeacherInfo teacherInfo = (TeacherInfo) obj;
			return teacherInfo;
	}else{
		throw new RuntimeException("无法获取用户信息，请重新登录！");
	}
  }
	
	/**
	 * 修改教师个人信息
	 * @param teacher
	 */
	public void updateTecherInfoById(MultipartFile photoFile, TeacherInfo teacher) throws Exception {
		if(teacher.getExp1().length()!=0){
			if(teacher.getExp1().equals("")&& teacher.getExp1().length()==0){
				teacher.setExp1(null);
			}
		}
			
		TeacherInfo oldTeacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		//此处针对渥课（多学校试用版本）做的修改 2019-2-22
		//获取到院系
		String thDepartment = oldTeacherInfo.getDepartment().getName();
			if(!StringUtils.isEmpty(teacher.getExp1()) && teacher.getExp1().length()>800){
				String data = teacher.getExp1().substring(teacher.getExp1().indexOf(",")+1,teacher.getExp1().lastIndexOf("\""));
				String imgFilePath = "";
				if(!StringUtils.isEmpty(oldTeacherInfo.getExp1()) && oldTeacherInfo.getExp1().trim()!=""){//如果存在，直接覆盖；
					imgFilePath = oldTeacherInfo.getExp1();
					ImageUtils.generateImage(data,FILE_PATH,imgFilePath);
					teacher.setExp1(imgFilePath);
				}else{//如果不存在，生成路径
					int randomInt = RandomUtils.nextInt(999);
					imgFilePath = FILE_PATH+"/"+SSO_MANAGE+"/"+thDepartment+"/个性签名/"+teacher.getName()+"/";
					String fileName= randomInt+".png";
					ImageUtils.generateImage(data, imgFilePath, fileName);
					teacher.setExp1("/"+SSO_MANAGE+"/"+thDepartment+"/个性签名/"+teacher.getName()+"/"+fileName);;
				}
			}
		
			
		if (oldTeacherInfo != null) {
				teacher.setId(oldTeacherInfo.getId());
				String filePath = "";
				// 判断编辑信息是否完整
				if (null != teacher && teacher.getName() != null) {
					//进行敏感词过滤
					if(!StringUtils.isEmpty(teacher.getName())){
						String thName =  teacher.getName();
						if(SensitiveWord.checkSenstiveWord(thName)){
							throw new RuntimeException("修改失败,非法参数！");	
						}
					}
					
					//进行正则表达式判断
					if(!StringUtils.isEmpty(teacher.getPhone())){
						if(!Validation.isSTR_NUM((teacher.getPhone()))){
							throw new RuntimeException("修改失败,电话号码格式不正确！");
						}	
					}
					if(!StringUtils.isEmpty(teacher.getEmail())){
						if(!Validation.isEmail(teacher.getEmail())){
							throw new RuntimeException("修改失败,邮箱格式不正确！");	
						}	
					}
					if(!StringUtils.isEmpty(teacher.getTeacherPresentation())){
						//敏感词过滤
						if(SensitiveWord.checkSenstiveWord(teacher.getTeacherPresentation())){
							throw new RuntimeException("修改失败,非法参数！");	
						}
						
					}
					
					// 判断图片是否为空
					if (null != photoFile && !photoFile.isEmpty()) {
						// 验证图片格式
						if (!FileOperateUtils.checkFilepattern(photoFile, "jpg|png|gif")) {
							throw new RuntimeException("修改失败,上传的头像格式错误！");
						}
						// 获取图片的下载路径
						filePath = FileOperateUtils.upload(FILE_PATH, SSO_MANAGE,"/"+thDepartment+"/"+ teacher.getName(), teacher.getName(),
								photoFile);
						// 设置文件的下载路径
						teacher.setImagePath(filePath);
					}
					//判断个人简介是否为空，空就用以前的
					if(teacher.getTeacherPresentation().length()==0){
						teacher.setTeacherPresentation(oldTeacherInfo.getTeacherPresentation());
					}
					
					// 设置更新时间
					teacher.setUpdateTime(new Date());
					teacherInfoMapper.updateTeacherInfoById(teacher);
					//更新redis中的用户信息
					userService.updateLoginUserInfo();
					
				}else{
					throw new RuntimeException("修改失败,教师姓名不能为空！");
				}
		}else {
			throw new RuntimeException("无法修改信息，请重新登录！");
		}

	}

	public SysResult updateTeacherInfoPwd(String vcoocUserId,String pwd,String confirmPwd) throws Exception{
		// 从redis中获取用户信息
				Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
				if (obj != null && obj instanceof TeacherInfo) {
					TeacherInfo teacherInfo = (TeacherInfo) obj;
	                  //判断redis中的教师信息是否完整
					  if(null==teacherInfo || null==teacherInfo.getUser() || null==teacherInfo.getUser().getId() ||
							  null == teacherInfo.getUser().getPassword() || null ==teacherInfo.getUser().getUsername() ){
						  return  SysResult.build(203, "无法获取用户信息，请重新登录");
					  }
					  //加密原密码
					   pwd= Encrypt.getMd5(teacherInfo.getUser().getUsername(), pwd.replace(" ", ""));
					  //判断原密码是否正确
					  if(!pwd.equals( teacherInfo.getUser().getPassword())){
						  return  SysResult.build(202, "原密码错误，请重新输入");
					  }
					  //密码加密
					  confirmPwd=Encrypt.getMd5(teacherInfo.getUser().getUsername(), confirmPwd.replace(" ", ""));
					//修改密码
					  teacherInfoMapper.updateTeacherInfoPwd(confirmPwd, teacherInfo.getUser().getId());
					//清除redis中的信息
					Session session = redisSessionService.doReadSession(vcoocUserId);
					if(session!=null){
					redisSessionService.delete(session);
					}
					  return SysResult.ok("修改成功");
			}else{
				return  SysResult.build(203, "无法获取用户信息，请重新登录");
			}
	}
	
		 /**
		  * 根据教师id 获取教师信息
		 * @param id
		 * @return
		 */
		public TeacherInfo selectInfo(Integer id) {
			TeacherInfo th = teacherInfoMapper.selectInfo(id);
				return th;
		}
}
