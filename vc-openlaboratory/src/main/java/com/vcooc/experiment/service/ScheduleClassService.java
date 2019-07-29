package com.vcooc.experiment.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ScheduleClass;
import com.vcooc.base.pojo.ScourseStudent;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ScheduleClassMapper;
import com.vcooc.experiment.mapper.StudnetInfoMapper;

@Service
public class ScheduleClassService {
	@Autowired
	private ScheduleClassMapper scheduleClassMapper;
	@Autowired
	private ScheduleStudentScoreService scheduleStudentScoreService;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	@Autowired
	private ClockinConfig clockinConfig;
	@Autowired
	private StudnetInfoMapper studnetInfoMapper;
	
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");// 格式化时间
	/**
	 * 插入单条记录
	 * @param scheduleId
	 * @param classId
	 */
	public void insert(Integer scheduleId,Integer classId){
		Integer array[]={classId};
		insert(scheduleId,array);
	}
	
	/**
	 * 批量插入记录
	 * @param scheduleId
	 * @param classIds
	 */
	public void insert(Integer scheduleId,Integer[] classIds){
		if(scheduleId != null && classIds != null && classIds.length>0){
			//在这里要判断一下之前有没有添加这些班级，如果有，那么就不需要插入这些数据，直接update状态
			List<ScheduleClass> list = scheduleClassMapper.selectDeletedByScheduleIdAndClassId(scheduleId, classIds);
			//如果之前没有的，要insert，并且要初始化成绩
			if(list != null && list.size()>0){
				String existIds = ",";
				for(ScheduleClass i:list){
					existIds+=i.getClassId()+",";
				}
				List<Integer> insertList = new ArrayList<Integer>();//用于插入新数据的数组
				String updateIdStr = "";//用于update数据的String
				if(existIds.length()>1){
					for(Integer i:classIds){
						if(!existIds.contains(","+i+",")){
							insertList.add(i);
						}else{
							updateIdStr+=i+",";
						}
					}
				}
				if(insertList.size()>0)
					scheduleClassMapper.insertByList(scheduleId, insertList);
				if(updateIdStr != "")
					scheduleClassMapper.updateStealth(
							scheduleId, updateIdStr.substring(0, updateIdStr.length()-1), 2);
				//
				//初始化成绩
				scheduleStudentScoreService.initScore(scheduleId, insertList);
			}else{
				scheduleClassMapper.insertByArray(scheduleId, classIds, new Date());
				scheduleStudentScoreService.initScore(scheduleId, classIds);
			}
			
		}
	}
	
	
	/**
	 * 批量插入记录
	 * @param scheduleId
	 * @param classIds
	 * @param courseScheduleType 
	 */
	public void insert(Integer scheduleId,Integer[] classIds,Integer courseScheduleType){
		if(scheduleId != null && classIds != null && classIds.length>0){
			//在这里要判断一下之前有没有添加这些班级，如果有，那么就不需要插入这些数据，直接update状态
			List<ScheduleClass> list = scheduleClassMapper.selectDeletedByScheduleIdAndClassId(scheduleId, classIds);
			//如果之前没有的，要insert，并且要初始化成绩
			if(list != null && list.size()>0){
				String existIds = ",";
				for(ScheduleClass i:list){
					existIds+=i.getClassId()+",";
				}
				List<Integer> insertList = new ArrayList<Integer>();//用于插入新数据的数组
				String updateIdStr = "";//用于update数据的String
				if(existIds.length()>1){
					for(Integer i:classIds){
						if(!existIds.contains(","+i+",")){
							insertList.add(i);
						}else{
							updateIdStr+=i+",";
						}
					}
				}
				if(insertList.size()>0)
					scheduleClassMapper.insertByList(scheduleId, insertList);
				if(updateIdStr != "")
					scheduleClassMapper.updateStealth(
							scheduleId, updateIdStr.substring(0, updateIdStr.length()-1), 2);
				//
				//初始化成绩
				if(courseScheduleType.equals(1)) {
					scheduleStudentScoreService.initScore(scheduleId, insertList);
				}
			}else{
				scheduleClassMapper.insertByArray(scheduleId, classIds, new Date());
				if(courseScheduleType.equals(1)) {
				   scheduleStudentScoreService.initScore(scheduleId, classIds);
				}
			}
			
		}
	}
	
	/**
	 * 插入多条记录
	 * @param scheduleId 班级id串，以逗号分隔
	 * @param classIds
	 */
	public void insert(Integer scheduleId,String classIds){
		String ids[] = classIds.split(",");
		Integer[] array = new Integer[ids.length]; 
		for(int i=0; i<ids.length; i++){
			array[i] = Integer.parseInt(ids[i]);
		}
		insert(scheduleId,array);
	}
	
	
	/**
	 * 插入多条记录
	 * @param scheduleId 班级id串，以逗号分隔
	 * @param classIds
	 * @param courseScheduleType
	 */
	public void insert(Integer scheduleId,String classIds,Integer courseScheduleType){
		String ids[] = classIds.split(",");
		Integer[] array = new Integer[ids.length]; 
		for(int i=0; i<ids.length; i++){
			array[i] = Integer.parseInt(ids[i]);
		}
		insert(scheduleId,array,courseScheduleType);
	}
	
	/**
	 * 伪删除课程表---班级关联
	 * @param scheduleId
	 * @param classIds
	 */
	/*public void delete(Integer scheduleId,Integer[] classIds){
		if(scheduleId != null && classIds != null && classIds.length>0)
		scheduleClassMapper.deleteByArray(scheduleId, classIds);
	}*/
	public void delete(Integer scheduleId,Integer classId){
		Integer array[]={classId};
		scheduleClassMapper.deleteByArray(scheduleId, array);
	
	}
	
	/**
	 * 伪删除课程表---班级关联
	 * @param scheduleId
	 * @param teacherInfo2 
	 * @param req 
	 * @param type 
	 * @param slice 
	 * @param schooltime 
	 * @param experimentCourseName 
	 * @param classIds
	 */
	public void removeAutonomyClass(Integer scheduleId,Integer classId, HttpServletRequest req, TeacherInfo teacherInfo, String experimentCourseName, String schooltime, String slice, Integer type){
		//时间转换
		Date date = new Date(schooltime);
		String schooltimeToString  = SDF.format(date);
		//将字节转换为时间
		// 将 字节[A...]转换为时间
		String time = clockinConfig.getTime(slice);
		//指出类型
		String typeString = null;
		if(type==1){
			 typeString = "整班上课";
		}else if(type == 3){
			 typeString = "自主预约";
		}
		
		//删除整班上课关联
		Integer array[]={classId};
		scheduleClassMapper.deleteByArray(scheduleId, array);
		if(type== 3){
			//删除自主上课关联以及学生预约信息
			//再删掉自主预约表里面当前课程表id和班级下的学生！
			//根据班级获取学生
			List<Integer> stIds =  studnetInfoMapper.selectStudentIdsByClassId(classId);
			//空集合存放获取到已预约的id
			List<String> ScourseStudentIds = new ArrayList<>();
			//获取该班级有多少预约了该课程
			for (int i = 0; i < stIds.size(); i++) {
				String ScourseStudentId = scheduleClassMapper.scheduleClassMapperfinAllScourseStudent(stIds.get(i),scheduleId);
				if(ScourseStudentId!=null){
					ScourseStudentIds.add(ScourseStudentId);
				}
			}
			
//			---------------------------------------------------
			//根据课程id 和学生id 获取有多少学生已经预约过
			Integer stnubner = 0;
			if(stIds.size()>0){
				for (int i = 0; i <  stIds.size(); i++) {
				ScourseStudent	n =  scheduleClassMapper.scourseStudentId(stIds.get(i),scheduleId);	
				if(n!=null){
					if(n.getScourseStudentId()!=null){
						stnubner = stnubner+1;
						}
					}
				
				}
			}
			
			
//		--------------------------------------------------------------------------------
			
			//循环删除该班级下已经获取该课程的学生（自主预约表）
			if(ScourseStudentIds.size()>0){
				for (int i = 0; i < ScourseStudentIds.size(); i++) {
					scheduleClassMapper.deleteScourseStudentId(ScourseStudentIds.get(i));	
				}
			}
			//再删除课程成绩表
			for (int i = 0; i < stIds.size(); i++) {
				courseScheduleMapper.deleteCourseSchedule(stIds.get(i),scheduleId);
			}
			
			
//			-----------------------------------------------------------------------------
			//删除整个班级的自主预约将可预约还原
			 //先获取总的预约数
			 CourseSchedule	cs =  courseScheduleMapper.selectByPrimaryKey(scheduleId);
			 //将总的预约数还原 已经预约了多少人还原多少座位
			 CourseSchedule cse = new CourseSchedule();
			 //剩余的工位数+已经预约的工位数
			Integer nubmer = cs.getRemainingSeats()+stnubner;
			if(nubmer > cs.getSeats()){
				throw new RuntimeException("预约数还原错误，请联系工程师解决！");
			}else{
				cse.setScheduleId(scheduleId);
				cse.setRemainingSeats(nubmer);
				courseScheduleMapper.updateByPrimaryKeySelective(cse);
			}
		
		}
		//7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"删除了《"+ experimentCourseName +"》"+ schooltimeToString+":"+time+"类型为"+typeString+"的排课以及所属学生成绩信息和预约记录", 7);
		teacherLogInformationService.saveSelective(record);
	}
	/**
	 * 查询可以添加的班级(不包含已添加的)
	 * 		注意!实验id不能为null
	 * 			不包含已删除的班级
	 * @param scheduleId
	 * @param scheduleId 
	 * @param slice 
	 * @return
	 */
	public List<TbClass> getAllowTbClass(String courseTime, String courseSlice, Integer scheduleId){
		//临时存储班班级集合 
		List<TbClass> tbDelectList = new ArrayList<>();
		//获取班级
		List<TbClass> tb = scheduleClassMapper.addAllowTbClass(scheduleId);
		//循环遍历拿到每一个班级去获取所有的课程，如果有则去掉该班级并且返回的页面
		for (int i = 0; i < tb.size(); i++) {
				List<CourseSchedule> csList =  getCourseScheduleClassData(tb.get(i).getId());
				for (int j = 0; j < csList.size(); j++) {
					if(!csList.isEmpty()){
						//注意时间转换空格问题
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
	 * 查询已经添加的班级
	 * 			不包含已删除的班级
	 * @param scheduleId
	 * @return
	 */
	public List<TbClass> getExitedTbClass(Integer scheduleId){
		return scheduleClassMapper.addExitedTbClass(scheduleId);
	}
	
	/**
	 * 插入多条关联信息
	 * @param scheduleId 课程表id
	 * @param classIds   班级id
	 * @param date       创建时间/更新时间,使用数据库NOW()方法也可以，效率没这个高
	 */
	public void insertByArray(Integer scheduleId,Integer[] classIds,Date date){
		scheduleClassMapper.insertByArray(scheduleId, classIds, date);
	}
}
