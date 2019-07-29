package com.vcooc.experiment.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ClockingIn;
import com.vcooc.experiment.mapper.ClockingInMapper;
import com.vcooc.experiment.mapper.ScourseGroupStudentMapper;
import com.vcooc.experiment.mapper.StudnetInfoMapper;

@Service
public class ClockingInService {
           @Autowired
           private ClockingInMapper clockingInMapper;
	       @Autowired
	       private StudnetInfoMapper studentInfoMapper;
           @Autowired
           private ScourseGroupStudentMapper scourseGroupStudentMapper;
          
           /**
            * 向同一班级下的所有学生插入考勤信息
            * @param classId
            * @param scheduleId
            */
           public void addclockingInForClass(Integer classId,Integer scheduleId){
        	   if(classId==null || scheduleId==null){
        		   throw new RuntimeException("获取信息失败！请重新操作。");
        	   }
        	   
        	   //课程下所有学生id
        	   List<Integer> studnetIds= studentInfoMapper.selectStudentIdsByClassId(classId);
        	   //排课表下已经录入考情的学生id
        	   List<Integer> ids = clockingInMapper.selectStudentIdsByScheduleId(scheduleId);
        	   
        	   //去除两个结合中重复的数据
        	   studnetIds.removeAll(ids);
        	   
        	   if(studnetIds!=null && studnetIds.size()>0){
        		   ClockingIn record = new ClockingIn();
        		   
        		   record.setScheduleId(scheduleId);
        		   record.setClassId(classId);
        		   record.setCreateTime(new Date());
        		   record.setUpdateTime(record.getCreateTime());
        		   record.setStatus(1);
        		   
        		   clockingInMapper.addClockInForClassOrGroup(studnetIds, record);
        	   }
           }
           
           /**
            * 向同一小组下的所有学生插入考勤信息
            * @param groupId
            * @param scheduleId
            */
           public void addclockingInForGroup(Integer groupId,Integer scheduleId){
        	   if(groupId==null || scheduleId==null){
        		   throw new RuntimeException("获取信息失败！请重新操作。");
        	   }
        	   
        	   //课程下所有学生id
        	   List<Integer> studnetIds= scourseGroupStudentMapper.selectStudentIdsByGroupId(groupId);
        	   //排课表下已经录入考情的学生id
        	   List<Integer> ids = clockingInMapper.selectStudentIdsByScheduleId(scheduleId);
        	   
        	   //去除两个结合中重复的数据
        	   studnetIds.removeAll(ids);
        	   
        	   
        	   if(studnetIds!=null && studnetIds.size()>0){
        		   ClockingIn record = new ClockingIn();
        		   
        		   record.setScheduleId(scheduleId);
        		   record.setGroupId(groupId);
        		   record.setCreateTime(new Date());
        		   record.setUpdateTime(record.getCreateTime());
        		   record.setStatus(1);
        		   
        		   clockingInMapper.addClockInForClassOrGroup(studnetIds, record);
        	   }
           }
           
           /**
            * 插入学生考勤信息
            * @param studentId
            * @param scheduleId
            */
           public void addclockingInForStudentInfo(Integer studentId,Integer scheduleId,Integer classId){
        	   if(studentId==null || scheduleId==null || classId==null){
        		   throw new RuntimeException("获取信息失败！请重新操作。");
        	   }
        	   //查询该学生是否已录入考情
        	   Integer result=clockingInMapper.selectClockingIdByStudentIdAndScheduleId(studentId, scheduleId);
        	   
        	   if(result==null || result<=0){
        		   
        		   ClockingIn record = new ClockingIn();
        		   
        		   record.setScheduleId(scheduleId);
        		   record.setStudentId(studentId);
        		   record.setCreateTime(new Date());
        		   record.setUpdateTime(record.getCreateTime());
        		   record.setStatus(1);
        		   record.setClassId(classId);
        		   
        		   clockingInMapper.addClockInForStudent(record);
        	     }
        	   }
  
           /**
            * 修改学生的签到状态
            * @param studentId
            * @param scheduleId
            * @param status
            */
           public void modifyStudentClockingStatus(Integer studentId,Integer scheduleId,Integer status){
        	   if(studentId==null || scheduleId==null || status==null){
        		   throw new RuntimeException("获取信息失败！请重新操作。");
        	   }
        	   
        	   ClockingIn record = new ClockingIn();
        	   record.setStudentId(studentId);
               record.setScheduleId(scheduleId);
               
        	  List<ClockingIn> list = clockingInMapper.select(record);
        	  
        	  if(list!=null && list.size()>0){
        		  list.get(0).setStatus(status);
        		  list.get(0).setUpdateTime(new Date());
        		  
        		  clockingInMapper.updateByPrimaryKeySelective(list.get(0));
        	  }
           }
           
           /**
            * 删除课程表下的考勤信息
            * @param scheduleId 课程表id
            * @param studentIds 学生id
            */
           public void deleteClockingIn(Integer scheduleId,String studentIds){
        	   if(scheduleId != null && studentIds!= null && studentIds != "")
        		   clockingInMapper.deleteClockingIn(scheduleId,studentIds);
           }
           /**
            * 删除课程表下的考勤信息
            * @param scheduleId 课程表id
            * @param studentIds 学生id
            */
           public void deleteClockingIn(Integer scheduleId,List<Integer> studentId){
        	   if(studentId != null && studentId.size()>0){
        		   String result = "";
        		   for(Integer i:studentId) result+=i+",";
        		   deleteClockingIn(scheduleId,result.substring(0,result.length()-1));
        	   }
           }
           
           
           //删除整组的考勤
           public void deleteGroupClockingIn(Integer scheduleId,Integer groupId){
        	   if(scheduleId != null && groupId != null){
        		   ClockingIn key = new ClockingIn();
        		   key.setScheduleId(scheduleId);
        		   key.setGroupId(groupId);
        		   clockingInMapper.delete(key);
        	   }
           }
}
