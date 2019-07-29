package com.vcooc.experiment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;

/**
 * 教师日志信息
 * @author Administrator
 */
@Service
public class TeacherLogInformationService extends BaseService<TeacherLogInformation> {
	@Autowired
	private TeacherLogInformationMapper teacherLogInfomationMapper;
	// 最大查询数量
	@PropertyConfig
	private Integer MAX_COUNT;
	
	//新增操作日志
	public void addTeacherInfoLog(TeacherLogInformation logInformation){
		if(logInformation==null || 
				logInformation.getTeacherInfo()==null || 
				logInformation.getTeacherInfo().getUser()==null ||
				logInformation.getTeacherInfo().getUser().getId()==null){
			throw new RuntimeException("日志信息录入错误");
		}
		teacherLogInfomationMapper.addTeacherInfoLog(logInformation);
	}
	/**
	 * 根据教师ID，查询教师日志
	 * @param teacherInfo
	 * @return
	 * @throws RuntimeException
	 */
	public List<TeacherLogInformation> selectTeacherLogInformation(Integer teacherInfoId) throws RuntimeException{
			List<TeacherLogInformation> logs = teacherLogInfomationMapper.selectTeacherLogInformation(MAX_COUNT,
					null,teacherInfoId);
			return logs;
	}
}
