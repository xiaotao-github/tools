package com.vcooc.experiment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.experiment.mapper.TbClassMapper;

@Service
public class TbClassService extends BaseService<TbClass>{
	@Autowired
	private TbClassMapper tbClassMapper;
	// 最大查询数量
	@PropertyConfig
	private Integer MAX_COUNT;
	/**
	 * 查询所有班级
	 * @param vcoocUserId
	 * @return
	 * 
	 */
	public List<TbClass> selectAllClasses(TeacherInfo teacherInfo, Integer menuParam) {
		// 获取操作员信息
			if (teacherInfo.getPowers() != null && menuParam == 1 && teacherInfo.getPowers().get("所有班级") != null) {// 查询所有班级
				return tbClassMapper.selectAllClasses(MAX_COUNT, null, 2);
			} else
				if (teacherInfo.getPowers() != null && menuParam == 2 && teacherInfo.getPowers().get("院系班级") != null) {// 查询院系班级
				// 查询该用户是否有所属院系
				if (teacherInfo.getDepartment() == null || teacherInfo.getDepartment().getId() == null) {
					throw new RuntimeException("无法找到你所属的院系！");
				}
				return tbClassMapper.selectAllClasses(MAX_COUNT, teacherInfo.getDepartment().getId(), 2);
			} else if (teacherInfo.getPowers() != null && menuParam == 3
					) { // 查询个人班级
				/*
				 * 通过教师ID 关联教师所带的课程， 得到 教师课程下的班级。
				 */
//				return tbClassMapper.selectMyClass(MAX_COUNT, teacherInfo.getUser().getId(), 2);
				return null;
			} else {
				throw new RuntimeException("查询失败，您的权限不足！");
			}
	}
	
	
	/**
	 * 通过班级id查询班级及班级下面的学生
	 * 		
	 * @param classId
	 * @return
	 */
	public TbClass AselectById(Integer classId){
		return tbClassMapper.AselectById(classId);
	}
}
