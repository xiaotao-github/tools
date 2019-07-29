package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.util.ExportExcelUtil;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.enums.ExperimentScoreType;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ScheduleStudentScoreMapper;
import com.vcooc.experiment.mapper.StudnetInfoMapper;
import com.vcooc.experiment.mapper.TbClassMapper;
import com.vcooc.util.convertor.ScheduleStudentScoreConvertor;

import cn.hutool.core.date.DateUtil;

@Service
public class ScheduleStudentScoreService {
	@Autowired
	private ScheduleStudentScoreMapper scheduleStudentScoreMapper;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	@Autowired
	private StudentExperimentSocreService studentExperimentSocreService;
	@Autowired
	private ClockinConfig clockinConfig;
	@Autowired
	private StudnetInfoMapper studnetInfoMapper;
	
	/**
	 * 初始化课程表成绩
	 * @param scheduleId    课程表id
	 * @param classIds      班级id，以逗号分隔
	 */
	public void initScore(Integer scheduleId,String classIds){
		if(classIds != null && classIds != "" && classIds.length()>0){
			if(",".equals(classIds.substring(classIds.length()-1, classIds.length()))){
				classIds = classIds.substring(classIds.length()-1, classIds.length()); 
			}
			//查询所有学生的id
			List<Integer> list = scheduleStudentScoreMapper.getStudentIdByClassId(classIds);
			if(list != null && list.size()>0){
				CourseSchedule courseSchedule = courseScheduleMapper.selectByPrimaryKey(scheduleId);
				//获取上课开始时间
				String stipulateSgininTime = DateUtil.format(courseSchedule.getSchooltime(),"yyyy-MM-dd")+" "+clockinConfig.getStart(courseSchedule.getSlice());
				scheduleStudentScoreMapper.initScore(scheduleId,DateUtil.parse(stipulateSgininTime), list);
			}
		}
	}
	
	
	/**
	 * 初始化成绩表
	 * @param scheduleId  课程表id
	 * @param classId     班级id
	 */
	public void initScore(Integer scheduleId,Integer[] classId){
		String result = "";
		for(Integer i:classId){
			result+=i+",";
		}
		if(result != "")
			initScore(scheduleId,result.substring(0, result.length()-1));
	}
	
	/**
	 * 初始化成绩表
	 * @param scheduleId  课程表id
	 * @param classId     班级id
	 */
	public void initScore(Integer scheduleId,List<Integer> classId){
		String result="";
		for(Integer i:classId){
			result += i+",";
		}
		if(result != "")
			initScore(scheduleId,result.substring(0, result.length()-1));
	}
	
	
	/**
	 * 初始化课程表小组成绩
	 * @param scheduleId
	 * @param studentInfoIds
	 */
	public void initGroupScore(Integer scheduleId,Integer[] studentInfoIds){
		if(studentInfoIds != null && studentInfoIds.length>0){
			List<Integer> list = new ArrayList<Integer>();
			for(Integer i:studentInfoIds)  list.add(i);
			if(list.size()>0){
				CourseSchedule courseSchedule = courseScheduleMapper.selectByPrimaryKey(scheduleId);
				//获取上课开始时间
				String stipulateSgininTime = DateUtil.format(courseSchedule.getSchooltime(),"yyyy-MM-dd")+" "+clockinConfig.getStart(courseSchedule.getSlice());
				scheduleStudentScoreMapper.initScore(scheduleId,DateUtil.parse(stipulateSgininTime),list);
			}
		}
	}
	
	
	/**
	 * 初始化课程表小组成绩
	 * @param scheduleId
	 * @param studentInfoIds
	 */
	public void initGroupScore(Integer scheduleId,List<Integer> studentInfoIds){
		if(studentInfoIds != null && studentInfoIds.size()>0){
			Integer[] result = new Integer[studentInfoIds.size()];
			for(int i=0; i<studentInfoIds.size(); i++)  result[i] = studentInfoIds.get(i);
			initGroupScore(scheduleId, result);
		}
	}
	
	
	/**
	 * 通过课程表和学生id批量删除成绩
	 * @param scheduleId	课程表id
	 * @param groupId 		小组id
	 */
	public void deleteScore(Integer scheduleId,Integer groupId){
		if(scheduleId != null  && groupId != null )
			scheduleStudentScoreMapper.deleteScore(scheduleId, groupId);
	}
	
	
	/**
	 * 批量删除学生成绩
	 * @param scheduleId  课程表id
	 * @param studentIds  学生id串
	 */
	public void deleteScoreByStudentId(Integer scheduleId,String studentIds){
		if(scheduleId != null  && studentIds != null )
			scheduleStudentScoreMapper.deleteScoreByStudentId(scheduleId, studentIds);
	}
	
	/**
	 * 批量删除学生成绩
	 * @param scheduleId  课程表id
	 * @param studentIds  学生id串
	 */
	public void deleteScoreByStudentId(Integer scheduleId,List<Integer> studentId){
		if(scheduleId != null  && studentId != null && studentId.size()>0){
			String result = "";
			for(Integer i:studentId) result += i+",";
			scheduleStudentScoreMapper.deleteScoreByStudentId(scheduleId, result.substring(0,result.length()-1));
		}
	}

	
	/**
	 * 根据id 查询学生实物实验信息
	 * @param id
	 * @return
	 */
	public ScheduleStudentScore selectById(Long id) {
		//查询实物实验基本信息--包括提交学生的信息
		ScheduleStudentScore scheduleStudentScore = scheduleStudentScoreMapper.selectByKey(id);
		if(scheduleStudentScore==null){
			throw new RuntimeException("【查询实物实验详情】查询失败，实物实验成绩信息为空：id="+id);
		}
		//查询实物实验  实验  课程信息 实验教师信息
		if(scheduleStudentScore.getScheduleId()!=null){
			CourseSchedule courseSchedule = courseScheduleMapper.selectScheduleInfoById(scheduleStudentScore.getScheduleId());
			
			if(courseSchedule!=null){
				if(courseSchedule.getExperiment()!=null && courseSchedule.getExperiment().getStandardIdentify()!=null){
					List<ExperimentStandard> experimentStandards = studentExperimentSocreService.selectExperimentStandardStudentscoreByWhere(id,
							courseSchedule.getExperiment().getStandardIdentify(), 2);
					scheduleStudentScore.setExperimentStandards(experimentStandards);
				}
				scheduleStudentScore.setCourseSchedule(courseSchedule);
			}
		}
		//查询学生信息
		return scheduleStudentScore;
	}
	//批改
	public void update(ScheduleStudentScore scheduleStudentScore,
			String studentScore,String standardId,String ids){
		if(studentScore==null || studentScore.equals("")|| studentScore.isEmpty()){
			throw new RuntimeException("学生成绩不能为空");
		}
		if(scheduleStudentScore.getRemark()==null ||scheduleStudentScore.getRemark().equals("")|| scheduleStudentScore.getRemark().isEmpty()){
			throw new RuntimeException("评语不能为空");
		}
		if(scheduleStudentScore ==null || scheduleStudentScore.getScheduleStudentScoreId()==null){
			throw new RuntimeException("【批改实验成绩】 实验成绩Id为空：ScheduleStudentScoreId="+scheduleStudentScore.getScheduleStudentScoreId());
		}
		String updateIds = null;
		if(StringUtils.isNotEmpty(ids)){
			ids = ids+","+scheduleStudentScore.getScheduleStudentScoreId();
			updateIds = ids;
		}else{
			updateIds = scheduleStudentScore.getScheduleStudentScoreId()+"";
		}
		//注释
		//Double sum = studentExperimentSocreService.insertStudentScore(studentScore,standardId,updateIds,ExperimentScoreType.NEW.getCode());
		if(studentScore.isEmpty()&& studentScore.equals("")){
			studentScore="0";
		}
		scheduleStudentScore.setScore(Double.valueOf(studentScore));;
		scheduleStudentScore.setCheckTime(new Date());
		scheduleStudentScore.setUpdateTime(new Date());
		scheduleStudentScoreMapper.updateStudentScore(scheduleStudentScore,updateIds);
	}

	/**
	 * 查询该课程下 其他学生的实验信息
	 * @param scheduleId 课程表id
	 * @param studentScoreId 排除的学生成绩id
	 * @param code 状态
	 * @return
	 */
	public List<ScheduleStudentScore> selectOther(Integer scheduleId,Long studentScoreId,Integer code) {
		return scheduleStudentScoreMapper.selectOther(scheduleId,studentScoreId,code);
	}

	
	
	public Map<String, Object> seleteScheduleStudentScoreByMenuToList(Integer menuParam, TeacherInfo teacherInfo,
			int iDisplayStart, int iDisplayLength, String sSearch, String sortCol, String sortDir) {
		return null;
	}
	
	/**
	 * 根据教师权限查询学生已提交未批改的预约实验成绩
	 * @param teacherInfo
	 * @return
	 */
	public List<ScheduleStudentScore> selectScoreBySubmitStatus(TeacherInfo teacherInfo) {
		if(teacherInfo.getPowers().get("查看学生实验成绩(所有)")!=null){//所有实验成绩
			return scheduleStudentScoreMapper.selectScoreBySubmitStatus(null, null);
		}else if(teacherInfo.getPowers().get("查看学生实验成绩(院系)")!=null){//院系实验成绩
			return scheduleStudentScoreMapper.selectScoreBySubmitStatus(null,teacherInfo.getDepartment().getId());
		}else{ //我的学生实验成绩
			return scheduleStudentScoreMapper.selectScoreBySubmitStatus(teacherInfo.getId(),null);
		}
		
	}
	
	/**只获取我当前的课程下的学生的成绩
	 * @param teacherInfo
	 * @return
	 */
	public List<ScheduleStudentScore> selectMyScoreBySubmitStatus(TeacherInfo teacherInfo) {
		return scheduleStudentScoreMapper.selectScoreBySubmitStatus(teacherInfo.getId(),null);
	}
	

	/**
	 * 导出学生实验成绩
	 * @param ids
	 */
	public void exportScore(Integer[] ids,HttpServletResponse rep) {
		if(ids==null || ids.length==0){
			throw new RuntimeException("获取不到学生成绩ids,需要导出学生的实验成绩为空");
		}
		List<ScheduleStudentScore> dataList =  scheduleStudentScoreMapper.selectExportDataByIds(ids);
		if(CollectionUtils.isEmpty(dataList)){
			throw new RuntimeException("获取不到学生成绩信息");
		}else{
			// 设置excel表格头部
	 		String[] headers = {"学号","姓名","班级","课程","实验","模式","实验时间","提交时间","实验成绩","实验状态","指导老师"};
	 		//将内容转化为String数组
	 		List<String> preStr = ScheduleStudentScoreConvertor.convert(dataList);
	    	ExportExcelUtil.exportExcel(rep, headers, preStr,"学生实验成绩信息表");
		}
	}

	/**
	 * 导出班级全部学生成绩成绩
	 * @param ids
	 */
	public synchronized   void  exportScoreClass(Integer[] classIds, Integer scheduleId, HttpServletResponse rep) {
		if(classIds==null || classIds.length==0){
			throw new RuntimeException("获取不到班级ids,需要导出学生的实验成绩为空");
		}
		//获取班级下的学生id
		List<Integer> stIds = new ArrayList<>();
		for(int i=0;i<classIds.length;i++){
			List<Integer> stId = studnetInfoMapper.selectStudentIdsByClassId(classIds[i]);
			stIds.addAll(stId);
        }
		Integer[] ids = new  Integer[stIds.size()];
		//根据课程表id 学生id 获取课程成绩表Id
		for(int j=0;j<stIds.size();j++){
			Integer stId= stIds.get(j);
			Integer id =  scheduleStudentScoreMapper.finAllscheduleStudentScoreId(stId,scheduleId);
			ids[j] = id;//每查询一条加上去
		}
		
		List<ScheduleStudentScore> dataList =  scheduleStudentScoreMapper.selectExportDataByIds(ids);
		if(CollectionUtils.isEmpty(dataList)){
			throw new RuntimeException("获取不到学生成绩信息");
		}else{
			// 设置excel表格头部
	 		String[] headers = {"学号","姓名","班级","课程","实验","模式","实验时间","提交时间","实验成绩","实验状态","指导老师"};
	 		//将内容转化为String数组
	 		List<String> preStr = ScheduleStudentScoreConvertor.convert(dataList);
	    	ExportExcelUtil.exportExcel(rep, headers, preStr,"学生实验成绩信息表");
		}
		
	}
}
