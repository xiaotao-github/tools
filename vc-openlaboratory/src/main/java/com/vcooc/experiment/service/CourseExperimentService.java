package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.CourseExperiment;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.experiment.mapper.CourseExperimentMapper;

@Service
public class CourseExperimentService extends BaseService<CourseExperiment>{
	@Autowired
	private CourseExperimentMapper courseExperimentMapper;
	
	/**
	 * 根据教师ID，查询教师下的实验课程信息以及实验课程下的实验信息（包括实验的作者）
	 * @param teacherInfoId
	 * @return
	 */
	public List<ExperimentCourse> selectExperimentCourseAndExperimentByUserId(Integer teacherInfoId){
		return courseExperimentMapper.selectExperimentCourseAndExperimentByUserId(teacherInfoId);
	}
	
	/**
	 * 根据实验课程ID，查询课程下的实验信息
	 * @param experimentCourseId  实验课ID
	 * @param teacherInfoId 教师ID
	 * @return
	 */
	public List<Experiment> selectExperimentByExperimentCourseId(Integer experimentCourseId) {
		return courseExperimentMapper.selectExperimentsByExperimentCourseId(experimentCourseId);
	}
	/**
	 * 根据实验课ID，和教师ID
	 * 查询 该教师上传的，不在该实验课下的实验信息
	 * 改1：根据权限查询实验：1.所有实验、2.院系实验、3.我的实验
	 * 改2：根据实验状态，查询开放实验;
	 * @param experimentCourseId  实验课ID
	 * @param teacherInfoId  教师ID
	 * @return
	 */
	public List<Experiment> selectOtherExperimentByExperimentCourseId(Integer experimentCourseId,TeacherInfo teacherInfo,Integer menuParam) {
		switch (menuParam) {
		case 1://所有实验
			return courseExperimentMapper.selectOtherExperimentByExperimentCourseId(experimentCourseId,null,null);
		case 2://院系实验、包括开放的实验
			Integer departmentId = null;
			if(teacherInfo.getDepartment()!=null && (departmentId = teacherInfo.getDepartment().getId())!=null){
				//查询院系下的实验
				List<Experiment> departmentExperiment = courseExperimentMapper.selectOtherExperimentByExperimentCourseId(experimentCourseId,null,departmentId);
				//查询开放的实验(院系开放和完全开放)
				List<Experiment> openExperiment = courseExperimentMapper.selectOtherExperimentByOpenStatus(experimentCourseId,departmentId);
				Set<Experiment> experimentSet = new HashSet<Experiment>();
				experimentSet.addAll(openExperiment);
				experimentSet.addAll(departmentExperiment);
				List<Experiment> result = new ArrayList<Experiment>();
				result.addAll(experimentSet);
				return result;
			}
		default://我的实验、包括开放的实验
			List<Experiment> myExperimentList = courseExperimentMapper.selectOtherExperimentByExperimentCourseId(experimentCourseId,teacherInfo.getId(),null);
			Set<Experiment> experimentSet = new HashSet<Experiment>();
			experimentSet.addAll(myExperimentList);
			if(teacherInfo.getDepartment()!=null && (departmentId = teacherInfo.getDepartment().getId())!=null){
				List<Experiment> openExperiment = courseExperimentMapper.selectOtherExperimentByOpenStatus(experimentCourseId,departmentId);
				experimentSet.addAll(openExperiment);
			}
			List<Experiment> result = new ArrayList<Experiment>();
			result.addAll(experimentSet);
			return result;
		}
	}
	
	/**
	 * 将实验分配给实验课程
	 * 原理：将旧的课程实验关联数据删除，将新的实验分配给该课程
	 * @param experimentCourseId  实验课程ID
	 * @param experimentIds 实验ID数组
	 */
	public void distributeExperimentToCourse(Integer experimentCourseId, Integer[] experimentIds) {
		//删除旧的课程实验关联数据
		CourseExperiment record = new CourseExperiment();
		record.setExperimentCourseId(experimentCourseId);
		courseExperimentMapper.delete(record);
		if(experimentIds!=null && experimentIds.length>0){
			//将新的实验分配给实验课程
			courseExperimentMapper.distributeExperimentToCourse(experimentCourseId,experimentIds);
		}
	}


	public List<Experiment> selectClassOtherExperiment(Integer experimentId, Integer classId) {
		return courseExperimentMapper.selectClassOtherExperiment(experimentId,classId);
	}
	/**
	 * 将实验与课程进行关联
	 * @param experimentCourseId
	 * @param experimentId
	 */
	public void addExperimentToCourse(Integer experimentCourseId, Integer experimentId) {
		if(experimentCourseId==null || experimentId==null){
			throw new RuntimeException("【关联课程实验】实验id或者课程id为空，无法建立关联：experimentId:"+experimentId+",experimentCourseId:"+experimentCourseId);
		}
		CourseExperiment record = new CourseExperiment();
		record.setExperimentId(experimentId);
		record.setExperimentCourseId(experimentCourseId);
		courseExperimentMapper.insertSelective(record);
	}
	
	/**
	 * 根据实验id 删除课程实验关联信息
	 * @param experimentId
	 */
	public void deleteByExperimentId(Integer experimentId) {
		CourseExperiment courseExperiment = new CourseExperiment();
		courseExperiment.setExperimentId(experimentId);
		courseExperimentMapper.delete(courseExperiment);
	}
}
