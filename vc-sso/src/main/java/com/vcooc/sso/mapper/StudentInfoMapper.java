package com.vcooc.sso.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.mapper.SysMapper;
/**
 * 学生信息
 * @author Administrator
 *
 */
public interface StudentInfoMapper extends SysMapper<StudentInfo> {

	/**
	 * 根据学生id查询学生信息
	 * @param userId
	 * @return
	 */
	StudentInfo findStudentInfoByUserId(Integer userId);
	/**
	 * 添加学生信息
	 * @param studentInfo
	 */
	void addStudent(StudentInfo studentInfo);
	/**
	 * 根据学生id更新学生登录信息
	 * id：学生用户id
	 * loginNumber:登录次数
	 * updateTime:登录时间
	 * @param mapData
	 */
	void updateStudentInfoByStudentId(Map<String, Object> mapData);
	/**
	 * 修改学生密码
	 * @param confirmPwd
	 * @param id
	 */
	void updateStudentInfoPwd(@Param("pwd")String pwd,@Param("id")Integer id);
	
	@Select("select * from student_info WHERE id = #{id} ")
	StudentInfo selectctInfo(@Param("id")Integer id);;

}
