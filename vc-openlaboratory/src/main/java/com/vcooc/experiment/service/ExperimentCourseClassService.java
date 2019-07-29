package com.vcooc.experiment.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.fabric.xmlrpc.base.Data;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentCourseClass;
import com.vcooc.base.pojo.Grade;
import com.vcooc.base.pojo.Major;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ExperimentCourseClassMapper;
import com.vcooc.experiment.mapper.ExperimentCourseMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;

@Service
public class ExperimentCourseClassService extends BaseService<ExperimentCourseClass> {
	@Autowired
	private ExperimentCourseClassMapper experimentCourseClassMapper;
	@Autowired
	private ExperimentCourseMapper experimentCourseMapper;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 格式化时间
	
	/**
	 * 查询实验课程下的班级
	 * 按权限查询班级，根据所属年级、专业、院系进行划分
	 * @param experimentCourse
	 * @param menuParam
	 * @return
	 */
	public List<Department> selectCourseClsssAndOtherClassGroupByDepartmentByexperimentCourse(
			ExperimentCourse experimentCourse, Integer menuParam) {
		//查询原先实验课程班级数据
		List<TbClass> experimentCourseClassList = experimentCourseClassMapper.selectExperimentCourseCalssByExperimentCourseId(experimentCourse.getExperimentCourseId());
		// 按权限查询班级，根据所属年级、专业、院系进行划分
		List<TbClass> classList = null;
		switch (menuParam) {
		case 1://查询所有院系及教师
			classList = experimentCourseClassMapper.selectAllTbClassByWhere(null, 2);
			break;
		case 2://查询课程所在院系及教师
			classList = experimentCourseClassMapper.selectAllTbClassByWhere(experimentCourse.getDepartmentId(), 2);
		case 3://查询课程所在院系及教师
			classList = experimentCourseClassMapper.selectAllTbClassByWhere(experimentCourse.getDepartmentId(), 2);
			break;
		}
		if(classList!=null && classList.size()!=0){
			//筛选出已经分配了的班级 标识IsSelect==1
			for (TbClass tbClass : classList) {
				if(experimentCourseClassList.contains(tbClass)){
					tbClass.setIsSelect(1);
				}
			}
			//把班级存进年级信息中
			List<Grade> gradeList=new ArrayList<Grade>();
			for (TbClass tbClass : classList) {
				boolean obj=true;
				for (Grade grade : gradeList) {
				  if(tbClass.getGrade()!=null &&  tbClass.getGrade().getId()!=null){
					if(grade.getId()==tbClass.getGrade().getId()){
						grade.getTbClassList().add(tbClass);
						obj=false;
						continue;
					}
				  }
				}
				if(obj){
					if(tbClass.getGrade()!=null){
						Grade grade = tbClass.getGrade();
						grade.setTbClassList(new ArrayList<TbClass>());
						grade.getTbClassList().add(tbClass);
						gradeList.add(grade);
					}
					
				}
			}
			//把年级存进专业中
			List<Major> majorList=new ArrayList<Major>();
			for (Grade grade : gradeList) {
				boolean obj=true;
				for (Major major : majorList) {
				  if(grade.getMajor()!=null &&  grade.getMajor().getId()!=null){
					if(major.getId()==grade.getMajor().getId()){
						major.getGradeList().add(grade);
						obj=false;
						continue;
					}
				  }
				}
				if(obj){
					if(grade.getMajor()!=null){
						Major major=grade.getMajor();
						major.setGradeList(new ArrayList<Grade>());
						major.getGradeList().add(grade);
						majorList.add(major);
					}
					
				}
			}
			//把专业存进院系中
			List<Department> departmentList=new ArrayList<Department>();
			for (Major major : majorList) {
				boolean obj=true;
				for (Department department : departmentList) {
					if(major.getDepartment()!=null && major.getDepartment().getId()!=null){
						if(department.getId()==major.getDepartment().getId()){
							department.getMajorList().add(major);
							obj=false;
							continue;
						}
					}
				}
				if(obj){
					if(major.getDepartment()!=null){
						Department department=major.getDepartment();
						department.setMajorList(new ArrayList<Major>());
						department.getMajorList().add(major);
						departmentList.add(department);
					}
					
				}
			}
			return departmentList;
		}
		return null;
	}
	
	/**
	 * 给实验课程分配班级
	 * @param experimentCourseId 实验课程ID
	 * @param classIds 班级ID
	 */
	public void distributeTeacherToExperimentCourse(HttpServletRequest req,Integer teacherInfoId,Integer experimentCourseId, Integer[] classIds,Integer[] oldClassIds) {
		//将原先的实验课程删除
		if(oldClassIds!=null && oldClassIds.length>0){
			experimentCourseClassMapper.deleExperimentCourseClassByExperimentCourseIdAndOldClassIds(experimentCourseId,oldClassIds);
			//日志-实验课程名称 --- 班级名称
			ExperimentCourse experimentCourse = experimentCourseMapper.selectByPrimaryKey(experimentCourseId);
			TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfoId, "为实验课程《"+experimentCourse.getCourseName()+"》重新安排了上课班级", 5);
			teacherLogInformationMapper.insertSelective(record);
		}
		//分配将新的班级数据插入到实验课程中
		if(classIds!=null && classIds.length>0){
			experimentCourseClassMapper.distributeTeacherToExperimentCourse(experimentCourseId,classIds);
			//日志-实验课程名称 --- 班级名称
			ExperimentCourse experimentCourse = experimentCourseMapper.selectByPrimaryKey(experimentCourseId);
			TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfoId, "为实验课程《"+experimentCourse.getCourseName()+"》安排了上课班级", 5);
			teacherLogInformationMapper.insertSelective(record);
		}
	}
	/**
	 * 根据实验课程ID分配在该课程下的班级信息
	 * @param experimentCourseId
	 * @param courseSlice 
	 * @param courseTime 
	 * @return 
	 */
	/*public List<TbClass> selectClassByExperimentCourseId(Integer experimentCourseId) {
		return 	experimentCourseClassMapper.selectExperimentCourseCalssByExperimentCourseId(experimentCourseId);
	}*/
	public synchronized List<TbClass> selectClassByExperimentCourseId(Integer experimentCourseId, String courseTime, String courseSlice) {
		//临时存储班班级集合 
		List<TbClass> tbDelectList = new ArrayList<>();
		//课程id 获取所属的班级
		List<TbClass> tb = experimentCourseClassMapper.selectExperimentCourseCalssByExperimentCourseId(experimentCourseId);
		//转换时间
		//循环遍历拿到每一个班级去获取所有的课程，如果有则去掉该班级并且返回的页面
		for (int i = 0; i < tb.size(); i++) {
			List<CourseSchedule> csList =  getCourseScheduleClassData(tb.get(i).getId());
			for (int j = 0; j < csList.size(); j++) {
				if(!csList.isEmpty()){
					if(csList.get(j).getNewSchooltime().equals(courseTime)&csList.get(j).getSlice().equals(courseSlice)){
						//如果有班级跟当前上课时间，去掉
						tbDelectList.add(tb.get(i));
					}
				}
			}
			
			
		}
		if(!tbDelectList.isEmpty()&& tbDelectList!=null){
			tb.removeAll(tbDelectList);
			return tb;
		
		}else{
			
			return tb;
		}
	}
	
	/**
	 * 获取班级下的课程进行时间转换
	 * @param classId
	 * @return
	 */
	public List<CourseSchedule> getCourseScheduleClassData(Integer classId){
		String newSchooltime = null; 
		List<CourseSchedule> cs = courseScheduleMapper.getCourseScheduleClassData(classId);
		//将上课转换存储，作为匹配
		for (int i = 0; i < cs.size(); i++) {
				newSchooltime = SDF.format(cs.get(i).getSchooltime());
				cs.get(i).setNewSchooltime(newSchooltime);
			}
		return cs;
	}
	
	
	/**
	 * 通过课程表id获取下面的班级
	 * @param scheduleId
	 * @return
	 */
	public List<TbClass> selectClassByScheduleId(Integer scheduleId){
		return experimentCourseClassMapper.selectClassByScheduleId(scheduleId);
	}
}
