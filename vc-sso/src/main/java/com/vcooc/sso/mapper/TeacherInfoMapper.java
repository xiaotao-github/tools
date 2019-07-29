package com.vcooc.sso.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.TeacherInfo;

public interface TeacherInfoMapper {
	/**
	 * 根据教师信息查询教师id
	 * @param userId
	 * @return
	 */
	TeacherInfo findTeacherInfoByUserId(Integer userId);
	
	/**
	 * 添加教师
	 * @param teacherInfo
	 */
	void addTeacher(TeacherInfo teacherInfo);
	
	/**
	 * 更新教师信息
	 * @param map
	 */
	void updateTeacherInfoByTeacherId(Map<String, Object> map);

	/**
	 * 修改用户信息
	 * @param teacher
	 */
	void updateTeacherInfoById(TeacherInfo teacher);
	
	/**
	 * 设置教师密码
	 * @param pwd
	 * @return
	 */
	void updateTeacherInfoPwd(@Param("pwd")String pwd,@Param("id")Integer id);

	/**教师id获取教师信息
	 * @param id
	 * @return
	 */
	@Select("select * from teacher_info WHERE id = #{id} ")
	TeacherInfo selectInfo(@Param("id")Integer id);
}
