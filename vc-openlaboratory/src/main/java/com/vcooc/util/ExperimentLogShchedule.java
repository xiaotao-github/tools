package com.vcooc.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.vcooc.base.pojo.ExperimentLog;

public class ExperimentLogShchedule{
	//key是日志id  value是对应的实体类
	private  static ExperimentLogShchedule els;
	private static final String LOCK = "LOCK";
	
	private static Map<Long,ExperimentLog> experimentLogMap = new HashMap<Long,ExperimentLog>();
	
	private ExperimentLogShchedule(){
	}
	public static ExperimentLogShchedule instance() {
		if(els==null) {
			synchronized(LOCK) {
				els = new ExperimentLogShchedule();
				return els;
			}
		}else {
			return els;
		}
	}
	
	
	public synchronized void add(ExperimentLog e,Long time) {
		ExperimentLog experimentLog = experimentLogMap.get(e.getLogId());
		
		if(experimentLog==null) {
			experimentLogMap.put(e.getLogId(), e);
		}else {
			
			if(experimentLog.getLookTime()==null) {
				experimentLog.setLookTime(time);
			}else {
				experimentLog.setLookTime(experimentLog.getLookTime()+time);
			}
			experimentLogMap.put(e.getLogId(),experimentLog);
		}
	}
	public synchronized  List<ExperimentLog> get(){
		Set<Entry<Long, ExperimentLog>> entrySet = experimentLogMap.entrySet();
		List<ExperimentLog> experimentLogs = new ArrayList<>();
		for (Entry<Long, ExperimentLog> entry : entrySet) {
			experimentLogs.add(entry.getValue());
		}
		if(CollectionUtil.isEmpty(experimentLogs)) {
			return null;
		}else {
			
			return experimentLogs;
		}
	}
}
