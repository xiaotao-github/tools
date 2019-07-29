package com.vcooc.experiment.service;

import java.util.List;
import java.util.TimerTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ExperimentLog;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.experiment.mapper.ExperimentLogMapper;
import com.vcooc.util.ExperimentLogShchedule;
import com.vcooc.util.TimerUtils;

@Service
public class ExperimentLogService{
	     @Autowired
        private ExperimentLogMapper experimentLogMapper;
	 
	     
	     /**
	      * 查询学生实验日志信息
	      * @param scheduleStudentScoreId
	      * @param type
	      * @return
	      */
	     public ExperimentLog insertExperimentLog(Long scheduleStudentScoreId,Integer type) {
	        	ExperimentLog experimentLog = new ExperimentLog();
	        	experimentLog.setScheduleStudentScoreId(scheduleStudentScoreId);
	        	experimentLog.setType(type);
	        	List<ExperimentLog> list = experimentLogMapper.select(experimentLog);
	              
	        	if(list ==null || list.size()<=0) {
	        		experimentLog.setLookTime(0L);
	        		experimentLog.setLookCount(0);
	        		experimentLogMapper.insertSelective(experimentLog);
	        		return experimentLog;
	        	}
	        	 experimentLog = list.get(0);
	        	if(experimentLog.getLookTime()!=null) {
	        		//进位取整
	        		int  lookTime = (int) Math.ceil(experimentLog.getLookTime()/60);
	        		experimentLog.setLookTime(Long.valueOf(lookTime));
	        	}
	        	return experimentLog;
	        }
       
        
}
