package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentCourseTeacher;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.experiment.mapper.DepartmentMapper;
import com.vcooc.experiment.mapper.ExperimentCourseMapper;
import com.vcooc.experiment.mapper.ExperimentCourseTeacherMapper;
import com.vcooc.experiment.mapper.TeacherInfoMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;
@Service
public class ExperimentCourseTeacherService extends BaseService<ExperimentCourseTeacher> {
	
	@Autowired
	private DepartmentMapper departmentMapper;
	@Autowired
	private TeacherInfoMapper teacherInfoMapper;
	@Autowired
	private ExperimentCourseTeacherMapper experimentCourseTeacherMapper;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private ExperimentCourseMapper experimentCourseMapper;
	/**
	 * 1.根据实验课程信息，查询课程下的任课教师
	 * 2.根据权限，查询教师信息
	 * 过滤：
	 * 3.用 isSelected 标识课程下的任课教师：1.是，2.不是  
	 * @param experimentCourse
	 * @return
	 */
	public List<Department> selectCourseTeacherAndOtherTeacherGroupByDepartmentByexperimentCourse(
			ExperimentCourse experimentCourse,Integer menuParam) {
		//查询实验课程下的任课教师
		List<TeacherInfo> teacherInfoList = teacherInfoMapper.selectExperimentCourseTeacher(experimentCourse.getExperimentCourseId());
		//根据权限，查询院系以及院系下的所有教师
		List<Department> departmentList = null;
		List<Department> result = new ArrayList<Department>();
		switch (menuParam) {
		case 1://查询所有院系及教师
			departmentList = departmentMapper.selectAllDepartmentsAndTeachersByWhere(null, 2);
			break;
		case 2://查询课程所在院系及教师
			departmentList = departmentMapper.selectAllDepartmentsAndTeachersByWhere(experimentCourse.getDepartmentId(), 2);
			break;
		}
		if(departmentList!=null){
			for (Department department : departmentList) {
				if(department.getTeacherInfoList().size()!=0){
					for (TeacherInfo teacherInfo : department.getTeacherInfoList()) {
						if(teacherInfoList.contains(teacherInfo)){
							teacherInfo.setIsSelected(1);
						}
					}
					result.add(department);
				}
			}
		}
		return result;
	}
	/**
	 * 1.将原先的教师删除
	 * 2.将新的教师添加入实验课程中
	 * 3.移交已经删除的教师在该实验课程下的实验资源到 移交人名下
	 * @param teacherInfoIds 分配的教师ID
	 * @param teacherInfoId  移交人ID
	 */
	public void distributeTeacherToExperimentCourse(HttpServletRequest req,Integer handler,Integer experimentCourseId, List<Integer> teacherInfoIds, Integer teacherInfoId) {
		//根据实验课程ID，查询实验课程下原先的教师-实验课程 关联数据信息
		ExperimentCourseTeacher record = new ExperimentCourseTeacher();
		record.setExperimentCourseId(experimentCourseId);
		List<ExperimentCourseTeacher> experimentCourseTeachers = experimentCourseTeacherMapper.select(record);
		//若原先有分配教师
		if(experimentCourseTeachers!=null){
			//筛选出已经被删除的教师信息
			List<ExperimentCourseTeacher> isDeleteTeacher = new ArrayList<ExperimentCourseTeacher>(); 
			if(teacherInfoIds!=null){
				for (ExperimentCourseTeacher experimentCourseTeacher : experimentCourseTeachers) {
					
					if(!teacherInfoIds.contains(experimentCourseTeacher.getTeacherInfoId())){
						isDeleteTeacher.add(experimentCourseTeacher);
					}
				}
			}else{
				isDeleteTeacher.addAll(experimentCourseTeachers);
			}
			//删除原先的分配教师数据，将新的分配教师数据插入
			this.deleteByWhere(record);
			//移交数据 --后面做
		}
		//插入新的数据
		if(teacherInfoIds!=null &&teacherInfoIds.size()!=0){
			experimentCourseTeacherMapper.addExperimentCourseTeacher(experimentCourseId,teacherInfoIds);
		}
		ExperimentCourse experimentCourse = experimentCourseMapper.selectByPrimaryKey(experimentCourseId);
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, handler, "为实验课程《"+experimentCourse.getCourseName()+"》分配了任课教师", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
	}
}
