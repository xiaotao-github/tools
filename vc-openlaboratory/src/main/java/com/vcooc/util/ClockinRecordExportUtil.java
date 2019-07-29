package com.vcooc.util;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;

import com.vcooc.base.pojo.LabClockInMachine;
import com.vcooc.common.util.ExportExcelUtil;
import com.vcooc.experiment.dto.ClockInRecordDTO;

public class ClockinRecordExportUtil {
	
	public static void exportMachineClockinRecord(HttpServletResponse response,List<ClockInRecordDTO> list, LabClockInMachine machine) {
		
		//字符串集合
	   	List<String> perStr = new ArrayList<String>();
		if(list==null || list.isEmpty()) {
			  return;
		}
		String title =machine.getFkName()+"考勤记录表";
		for (int i = 0; i < list.size(); i++) {
			//将对象转换为数组
			String str = ClockinRecordExportUtil.MachineClockinRecordToStr(list.get(i), machine);
	   		//将字符串添加到集合中
	   		perStr.add(str);
   	 	}
		 // 设置excel表格头部
		String[] headers = {"考勤机名称","考勤机编号","所在实验室","用户账号","用户名称","考勤时间"};
	   	ExportExcelUtil.exportExcel(response, headers, perStr,title);
	}
	
	public static void exportUserClockinRecord(HttpServletResponse response,List<ClockInRecordDTO> list,String clockinId) {
		
		//字符串集合
	   	List<String> perStr = new ArrayList<String>();
		if(list==null || list.isEmpty()) {
			  return;
		}
		String title =list.get(0).getName()+"-"+"考勤记录表";
		if(!StringUtils.isEmpty(clockinId)) {
			title =list.get(0).getName()+"-"+list.get(0).getLabName()+"-"+"考勤记录表";
		}
		for (int i = 0; i < list.size(); i++) {
			///将对象转换为数组
			String str = ClockinRecordExportUtil.UserClockinRecordToStr(list.get(i));
	   		//将字符串添加到集合中
	   		perStr.add(str);
   	 	}
		 // 设置excel表格头部
		String[] headers = {"用户名称","用户账号","实验室名称","考勤时间"};
	   	ExportExcelUtil.exportExcel(response, headers, perStr,title);
		
	}
	
	public static String MachineClockinRecordToStr(ClockInRecordDTO record,LabClockInMachine machine) {
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append(machine.getFkName()!=null?machine.getFkName()+",":"未知,");
		stringBuffer.append(machine.getClockinId()!=null?machine.getClockinId()+",":"未知,");
		stringBuffer.append(machine.getLabName()!=null?machine.getLabName()+",":"未知,");
		stringBuffer.append(record.getUserName()!=null?record.getUserName()+",":"未知,");
		stringBuffer.append(record.getName()!=null?record.getName()+",":"未知,");
		stringBuffer.append(record.getClockingTime()!=null?record.getClockingTime():"未知");
		return stringBuffer.toString();
	}
	
	public static String UserClockinRecordToStr(ClockInRecordDTO record) {
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append(record.getName()!=null?record.getName()+",":"未知,");
		stringBuffer.append(record.getUserName()!=null?record.getUserName()+",":"未知,");
		stringBuffer.append(record.getLabName()!=null?record.getLabName()+",":"未知,");
		stringBuffer.append(record.getClockingTime()!=null?record.getClockingTime():"未知");
		return stringBuffer.toString();
	}

}
