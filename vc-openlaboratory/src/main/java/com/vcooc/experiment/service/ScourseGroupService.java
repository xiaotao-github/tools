package com.vcooc.experiment.service;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ScourseGroup;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.experiment.mapper.ScourseGroupMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;

@Service
public class ScourseGroupService {
	@Autowired
	private ScourseGroupMapper scourseGroupMapper;
	@Autowired
	private ScourseGroupStudentService scourseGroupStudentService;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private ScheduleStudentScoreService scheduleStudentScoreService;
	@Autowired
	private ClockingInService clockingInService;
	/**
	 * 创建实验小组:
	 * 1.判断小组是否有成员；
	 * 2.判断小组下的成员是否在同一个班；
	 * 3.判断小组下的成员是否在该实验下的其他小组；
	 * @param experimentGroup
	 */
	public void addGroup(ScourseGroup scourseGroup,Integer[] studentInfoIds,TeacherInfo teacherInfo){
		//校验小组
		if(scourseGroup.getScheduleId()==null){
			throw new RuntimeException("课程表不能为空!");
		}
		if(scourseGroup.getGroupName()==null){
			throw new RuntimeException("小组名称不能为空!");
		}
		if(scourseGroup.getClassId()==null){
			throw new RuntimeException("班级不能为空!");
		}
		if(scourseGroup.getExperimentId()==null){
			throw new RuntimeException("实验不能为空!");
		}
		
		scourseGroup.setSource(0);//新增
		scourseGroup.setCreateTime(new Date());
		scourseGroup.setUpdateTime(scourseGroup.getCreateTime());
		//创建小组
		scourseGroupMapper.insertSelective(scourseGroup);
		//添加小组成员,这里因为在前面筛选学生的时候就已经把选了小组的排除了，所以不做校验
		scourseGroupStudentService.addGroupStudent(scourseGroup.getGroupId(),studentInfoIds);
		//初始化成绩
		scheduleStudentScoreService.initGroupScore(scourseGroup.getScheduleId(), studentInfoIds);
		//初始化考勤
		clockingInService.addclockingInForGroup(scourseGroup.getGroupId(),scourseGroup.getScheduleId());
		//initMemberAndScoreAndClicking(scourseGroup.getScheduleId(),scourseGroup.getGroupId(),studentInfoIds);
		
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(teacherInfo.getId(), "添加了实验小组《"+scourseGroup.getGroupName()+"》", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
		
	}
	
	
	/**
	 * 初始化小组的成员，初始化成绩和考勤
	 * @param group
	 * @param studentInfoIds
	 */
	public void initMemberAndScoreAndClicking(Integer scheduleId,Integer groupId,Integer[] studentInfoIds){
		//添加小组成员,这里因为在前面筛选学生的时候就已经把选了小组的排除了，所以不做校验
		scourseGroupStudentService.addGroupStudent(groupId,studentInfoIds);
		//初始化成绩
		scheduleStudentScoreService.initGroupScore(scheduleId, studentInfoIds);
		//初始化考勤
		clockingInService.addclockingInForGroup(groupId,scheduleId);
	}
	
	
	/**
	 * 轻松重载
	 * @param scourseGroup
	 * @param studentInfoIds
	 * @param teacherInfo
	 * @throws RuntimeException
	 */
	public void addGroup(ScourseGroup scourseGroup,String studentInfoIds,TeacherInfo teacherInfo){
		if(studentInfoIds != null && studentInfoIds != ""){
			String[] temp = studentInfoIds.split(",");
			Integer[] result = new Integer[temp.length];
			for(int i=0; i<temp.length; i++) result[i] = Integer.parseInt(temp[i]);
			addGroup(scourseGroup, result, teacherInfo);
		}
	}
	
	
	/**
	 * 删除小组
	 * 		删除小组
	 * 		删除小组成员
	 * 		删除成绩(不删除资源，以防万一误删除)
	 * @param groupId
	 */
	public void deleteGroup(Integer scheduleId,Integer groupId){
		//删除考勤
		clockingInService.deleteGroupClockingIn(scheduleId, groupId);
		//删除成绩
		scheduleStudentScoreService.deleteScore(scheduleId, groupId);
		//删除小组学生
		scourseGroupStudentService.deleteByGroupId(groupId);
		//删除小组
		scourseGroupMapper.deleteByPrimaryKey(groupId);
	}
	
	
	/**
	 * 通过小组id,获取小组的信息以及小组成员，获取没有被分配在小组的其他学生
	 * @param groupId
	 * @return
	 * 		group  小组信息及小组成员
	 * 		otherStudent  没有加入其他小组的学生
	 */
	public Map<String, Object> getGroupAndOtherStudent(Integer groupId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("group", scourseGroupStudentService.getGroupAndGroupMember(groupId));
		map.put("otherStudent", scourseGroupStudentService.getOtherStudent(groupId));
		return map;
	}
	
	
	/**
	 * 修改小组
	 * @param scourseGroup  小组;groupId、scheduleId不能为null
	 * @param studentInfoIds
	 */
	public void EditGroup(ScourseGroup scourseGroup,String studentInfoIds){
		if(scourseGroup.getGroupId() != null && scourseGroup.getScheduleId() != null){
			Integer groupId = scourseGroup.getGroupId();
			Integer scheduleId = scourseGroup.getScheduleId();
			scourseGroupMapper.updateByPrimaryKeySelective(scourseGroup);
			//判断修改里面有没有学生
			if(studentInfoIds == null || studentInfoIds == ""){
				//全部移除，那么全部删除
				//删除考勤
				clockingInService.deleteGroupClockingIn(scheduleId, groupId);
				//删除成绩
				scheduleStudentScoreService.deleteScore(scourseGroup.getScheduleId(), groupId);
				//删除小组学生
				scourseGroupStudentService.deleteByGroupId(groupId);
			}else{
				//添加部分或者减少部分
				//查询小组里面的成员
				ScourseGroup tempGroup = scourseGroupStudentService.getGroupAndGroupMember(groupId);
				if(tempGroup != null && tempGroup.getGroupMember() != null && tempGroup.getGroupMember().size()>0){
					//之前有成员
					List<StudentInfo> stuList = tempGroup.getGroupMember();
					//这个数组是要删除掉的考勤、成绩、小组成员的数组
					List<Integer> deleteList = new ArrayList<Integer>();
					String tempStr = ","+studentInfoIds+",";//用于比较的临时变量
					String existMemberStr = ",";            //已存在的成员id串
					for(int i=0; i<stuList.size(); i++){
						if(stuList.get(i) != null && stuList.get(i).getId() != null){
							existMemberStr += stuList.get(i).getId()+",";
							//如果不包含，那么删除
							if(!tempStr.contains(","+stuList.get(i).getId()+","))deleteList.add(stuList.get(i).getId());
						}
					}
					
					//这个是要添加考勤、成绩、小组成员的数组
					List<Integer> addList = new ArrayList<Integer>();					
					String[] addStrArray = studentInfoIds.split(",");
					if(existMemberStr.length()>1){
						for(int i=0; i<addStrArray.length; i++){
							String temp = ","+addStrArray[i]+",";
							if(!existMemberStr.contains(temp)) addList.add(Integer.parseInt(addStrArray[i]));
						}
					}
					
					//删除多的
					if(deleteList.size()>0){
						//删除考勤
						clockingInService.deleteClockingIn(scheduleId, deleteList);
						//删除成绩
						scheduleStudentScoreService.deleteScoreByStudentId(scheduleId, deleteList);
						//删除成员
						scourseGroupStudentService.DeleteGroupMember(groupId,deleteList);
					}
					
					//添加多的
					if(addList.size()>0){
						Integer[] result = new Integer[addList.size()];
						for(int i=0; i<addList.size(); i++){
							result[i] = addList.get(i);
						}
						initMemberAndScoreAndClicking(scheduleId, groupId, result);
					}
					
				}else{
					//之前没成员
					if(studentInfoIds != null && studentInfoIds != ""){
						String[] temp = studentInfoIds.split(",");
						Integer[] result = new Integer[temp.length];
						for(int i=0; i<temp.length; i++) result[i] = Integer.parseInt(temp[i]);
						initMemberAndScoreAndClicking(scheduleId,groupId,result);
					}
					
				}
			}
		}
	}
	
	
	/**
	 * 根据班级id和来源获取历史小组
	 * @param classId  班级id
	 * @param source   小组来源   0新增，1拷贝
	 * @return
	 */
	public List<ScourseGroup> getGroupByClassId(Integer classId,Integer source,Integer experimnetId){
		ScourseGroup record = new ScourseGroup();
		record.setClassId(classId);
		record.setSource(0);
		List<ScourseGroup> list = scourseGroupMapper.select(record);
		
		//去除该实验的小组
		for (int i = 0; i < list.size(); i++) {
			if(list.get(i).getExperimentId()!=null &&list.get(i).getExperimentId().equals(experimnetId)){
				list.remove(list.get(i));
			}
		}
		
		return list;
	}
	
	
	/**
	 * 根据小组id获得成员
	 * @param groupId
	 * @return
	 */
	public List<StudentInfo> getGroupMember(Integer groupId){
		ScourseGroup temp = scourseGroupStudentService.getGroupAndGroupMember(groupId);
		return temp != null && temp.getGroupMember() != null && temp.getGroupMember().size()>0? 
				temp.getGroupMember():null;
	}
	
	
	/**
	 * 创建历史实验小组
	 */
	public void addHistoryGroup(ScourseGroup scourseGroup,Integer checkGroupId,TeacherInfo teacherInfo){
		ScourseGroup temp = scourseGroupStudentService.getGroupAndGroupMember(checkGroupId);
		//校验小组
		if(scourseGroup.getScheduleId()==null){
			throw new RuntimeException("课程表不能为空!");
		}
		if(scourseGroup.getClassId()==null){
			throw new RuntimeException("班级不能为空!");
		}
		if(scourseGroup.getExperimentId()==null){
			throw new RuntimeException("实验不能为空!");
		}
		//小组名称
		scourseGroup.setGroupName(temp.getGroupName());
		scourseGroup.setSource(1);//拷贝
		scourseGroup.setCreateTime(new Date());
		scourseGroup.setUpdateTime(scourseGroup.getCreateTime());
		//创建小组
		scourseGroupMapper.insertSelective(scourseGroup);
		
		if(temp.getGroupMember() != null && temp.getGroupMember().size()>0){
			List<Integer> result = new ArrayList<Integer>();
			
			//安全校验，如果历史实验小组里面有了,那就不需要再添加进去了
			Integer[] stuIds = scourseGroupStudentService.getScheduleStudent(scourseGroup.getScheduleId());
			String stuIdStr = ",";
			for(Integer i:stuIds){
				stuIdStr+=i+",";
			}
			
			if(stuIdStr.length()>1){
				for(StudentInfo i:temp.getGroupMember()){
					if(i.getId() != null) {
						String tempStr = ","+i.getId()+",";
						if(!stuIdStr.contains(tempStr)){
							result.add(i.getId());
						}
						
					}
				}
			}else{
				for(StudentInfo i:temp.getGroupMember()){
					if(i.getId() != null) result.add(i.getId());
				}
			}
			//添加小组成员,这里因为在前面筛选学生的时候就已经把选了小组的排除了，所以不做校验
			scourseGroupStudentService.addGroupStudent(scourseGroup.getGroupId(),result);
			//初始化成绩
			scheduleStudentScoreService.initGroupScore(scourseGroup.getScheduleId(), result);
			//初始化考勤
			clockingInService.addclockingInForGroup(scourseGroup.getGroupId(),scourseGroup.getScheduleId());
		}
		
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(teacherInfo.getId(), "添加了实验小组《"+scourseGroup.getGroupName()+"》", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
		
	}
	
}
