package com.vcooc.sso.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.User;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.Encrypt;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.common.vo.SysResult;
import com.vcooc.sso.mapper.StudentInfoMapper;
import com.vcooc.sso.mapper.UserMapper;

@Service
public class StudentInfoService extends BaseService<StudentInfo> {
	
	@Autowired
	private StudentInfoMapper studentInfoMapper;
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
	 * 根据学生id查询学生信息
	 * @param userId
	 * @return
	 */
	public StudentInfo findStudentInfoByUserId(Integer userId) {
		
		return studentInfoMapper.findStudentInfoByUserId(userId);
	}
	/**
	 * 学生注册
	 * 添加学生信息
	 * 1.添加用户信息
	 * 2.得到用户id
	 * 3.添加学生信息
	 * @param studentInfo
	 */
	public void addStudent(StudentInfo studentInfo){
		User user = studentInfo.getUser();
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
		studentInfo.setUser(u);
		studentInfo.setSource(2);
		studentInfo.setCreateTime(new Date());
		studentInfo.setUpdateTime(studentInfo.getCreateTime());
		studentInfoMapper.addStudent(studentInfo);
	}
	/**
	 * 根据学生id更新学生登录信息
	 * id：学生用户id
	 * loginNumber:登录次数
	 * updateTime:登录时间
	 * @param mapData
	 */
	public void updateStudentInfoByStudentId(Map<String, Object> mapData) {
		studentInfoMapper.updateStudentInfoByStudentId(mapData);
	}
	
	/**
	 * 根据学生ID，更新学生信息，涉及到图片上传
	 * @param photoFile
	 * @param studentInfo
	 * @param vcoocUserId
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	public void updateStudentInfoAndFileById(MultipartFile photoFile, StudentInfo studentInfo, String vcoocUserId) throws IllegalStateException, IOException {
		//获取用户信息
				if (!StringUtils.isNotEmpty(vcoocUserId)) {
					throw new RuntimeException("由于您长时间未操作，请重新登录后操作！");
				}
				// 从redis中获取用户信息
				Object obj = redisSessionService.querySessionStudentInfo(vcoocUserId);
				if (obj != null && obj instanceof StudentInfo) {
						StudentInfo oldStudentInfo = (StudentInfo)obj;
						studentInfo.setId(oldStudentInfo.getId());
						
						//获取学生的学生的院系tbClass.grade.major.department.name
						 String stDepartment = oldStudentInfo.getTbClass().getGrade().getMajor().getDepartment().getName();
						
						String filePath = "";
						// 判断编辑信息是否完整
						if (null != studentInfo && studentInfo.getName() != null) {
							// 判断图片是否为空
							if (null != photoFile && !photoFile.isEmpty()) {
								// 验证图片格式
								if (!FileOperateUtils.checkFilepattern(photoFile, "jpg|png|gif")) {
									throw new RuntimeException("修改失败,上传的头像格式错误！");
								}
								// 获取图片的下载路径
								filePath = FileOperateUtils.upload(FILE_PATH, SSO_MANAGE, "/"+stDepartment+"/"+studentInfo.getName(), studentInfo.getName(),
										photoFile);
								// 设置文件的下载路径
								studentInfo.setImagePath(filePath);
							}
							// 设置更新时间
							studentInfo.setUpdateTime(new Date());
							studentInfoMapper.updateByPrimaryKeySelective(studentInfo);
							//更新redis中的用户信息
							userService.updateLoginUserInfo();
							
						}else{
							throw new RuntimeException("修改失败,学生姓名不能为空！");
						}
				}else {
					throw new RuntimeException("无法修改信息，请重新登录！");
				}
	}
	/**
	 * 根据学生用户ID，修改学生用户信息
	 * @param studentInfo
	 */
	public void updateStudentInfoById(StudentInfo studentInfo) {
		if(studentInfo.getId()==null){
			throw new RuntimeException("由于您长时间未操作，请重新登录后操作");
		}
		//更新学生用户信息到数据库
		studentInfo.setUpdateTime(new Date());
		studentInfoMapper.updateByPrimaryKeySelective(studentInfo);
		//更新redis中的用户信息
		userService.updateLoginUserInfo();
	}
	public SysResult updateStudentInfoPwd(String vcoocUserId, String pwd, String confirmPwd) {
			// 从redis中获取用户信息
			Object obj = redisSessionService.querySessionStudentInfo(vcoocUserId);
			if (obj != null && obj instanceof StudentInfo) {
				StudentInfo studentInfo = (StudentInfo) obj;
	              //判断redis中的教师信息是否完整
				  if(null==studentInfo || null==studentInfo.getUser() || null==studentInfo.getUser().getId() ||
						  null == studentInfo.getUser().getPassword() || null ==studentInfo.getUser().getUsername() ){
					  return  SysResult.build(203, "无法获取用户信息，请重新登录");
				  }
				  //加密原密码
				   pwd= Encrypt.getMd5(studentInfo.getUser().getUsername(), pwd.replace(" ", ""));
				  //判断原密码是否正确
				  if(!pwd.equals( studentInfo.getUser().getPassword())){
					  return  SysResult.build(202, "原密码错误，请重新输入");
				  }
				  //密码加密
				  confirmPwd=Encrypt.getMd5(studentInfo.getUser().getUsername(), confirmPwd.replace(" ", ""));
				//修改密码
				  studentInfoMapper.updateStudentInfoPwd(confirmPwd, studentInfo.getUser().getId());
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
		 * 根据学生id 获取学生的所有信息
		 * @param id
		 * @return
		 */
		public StudentInfo selectctInfo(Integer id) {
			StudentInfo st =  studentInfoMapper.selectctInfo(id);
			return st;
		}
}
