package com.vcooc.util.convertor;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.experiment.dto.ClockInMachineUserDTO;
import com.vcooc.experiment.dto.ClockInRecordDTO;
import com.vcooc.experiment.dto.LabClockUserInfoDTO;

public class ClockInDTOConvertor {
	
	/**
	 * 构建考勤机用户信息</br>
	 * @param list 考勤机用户信息列表</br>
	 * @param teacherInfo
	 * @return
	 */
	public static List<LabClockUserInfoDTO>    buildClockUserInfoDTO(List<LabClockUserInfoDTO> list ,TeacherInfo teacherInfo) {
		for(int i=0;i<list.size();i++) {
			list.get(i).setCheckBox("<td class=\"text-c\"> <input type='checkbox' name='userId' value='"+list.get(i).getId()+"'></td>");
			StringBuffer operation  =new StringBuffer();
			operation.append("<td class='text-c f-16' style='letter-spacing:2px;'>");
			Map<String, String> powers = teacherInfo.getPowers();
			for(Entry<String, String> name :powers.entrySet()) {
				System.out.println(name.getKey() +":" +name.getValue());
			}
			if(powers.containsKey("查看考勤记录（考勤机用户录入总表）")){
				operation.append(" <a href='javascript:void(0);' title='查看用户考勤记录' onclick='Hui_admin_tab(this);' data-title='用户考勤记录' data-href='/labClockInManageController/toClockInRecordPage?userId="
						+list.get(i).getId()+"&clockinId="+null+ "'><i class='Hui-iconfont Hui-iconfont-yulan'></i></a>");
			}
			if(powers.containsKey("删除用户（考勤机用户管理）")){
				operation.append(" <a href='javascript:void(0);' title='删除该用户' onclick='delUser("
						+list.get(i).getId()+");'><i class='Hui-iconfont Hui-iconfont-del2'></i></a>");
			
			}
			operation.append(" </td>");
			list.get(i).setOperation(operation.toString());
		}
		return list;
		
	}
	
	/**
	 * 构建考勤记录DTO</br>
	 * @param teacherInfo
	 * @param list  考勤记录列表</br>
	 * @param clockinId
	 * @return
	 */
	public static List<ClockInRecordDTO> buildClockRecordDTO(TeacherInfo teacherInfo,List<ClockInRecordDTO> list,String clockinId){
		for(int i=0;i<list.size();i++) {
			list.get(i).setCheckBox("<td class=\"text-c\"> <input type=\"checkbox\" name=\"recordId\" value='"+list.get(i).getId()+"'></td>");
			list.get(i).setClockingTime("<td class=\"text-c\">"+list.get(i).getClockingTime()+"</td>");
			list.get(i).setLabName("<td class=\"text-c\">"+list.get(i).getLabName()+"</td>");
			list.get(i).setMachineName("<td class=\"text-c\">"+list.get(i).getMachineName()+"</td>");
			list.get(i).setName("<td class=\"text-c\">"+list.get(i).getName()+"</td>");
			list.get(i).setUserName("<td class=\"text-c\">"+list.get(i).getUserName()+"</td>");
			StringBuffer operation  =new StringBuffer();
			operation.append("<td class='text-c f-16' style='letter-spacing:2px;'>");
			Map<String, String> powers = teacherInfo.getPowers();
			String title="";
			if(powers.containsKey(" 查看考勤记录（考勤机用户录入总表）")){
				operation.append(" <a href='javascript:void(0);' title='查看用户考勤记录' onclick='Hui_admin_tab(this);' data-title='用户考勤记录' data-href='/labClockInManageController/toClockInRecordPage?userId="
						+list.get(i).getUserId()+"&clockinId="+clockinId+ "'><i class='Hui-iconfont Hui-iconfont-yulan'></i></a>");
			}
//			if(powers.containsKey("删除用户（考勤机用户管理）")){
//				
//				operation.append("<a href=\"javascript:void(0);\" title=\"考勤机用户管理\" onclick=\"Hui_admin_tab(this);\" data-title=\"考勤机用户管理\" data-href=\"/labClockInManageController/toMachineUserListPage?clockinId="
//						+ clockinId+ "\"><i class=\"iconfont icon-renyuanguanli5\"></i></a>");
//			
//			}
			operation.append(" </td>");
			list.get(i).setOperation(operation.toString());
		}
		return list;
		
	}
	
	/**
	 * 构建考勤机用户DTO</br>
	 * @param list 考勤机机用户列表</br>
	 * @param teacherInfo
	 * @param clockinId  考勤机id</br>
	 * @return
	 */
	public static List<ClockInMachineUserDTO> buildClockInMachineUserDTO(List<ClockInMachineUserDTO> list,TeacherInfo teacherInfo,String clockinId){
		for(int i=0;i<list.size();i++) {
			list.get(i).setCheckBox("<td class=\"text-c\"> <input type=\"checkbox\" name=\"userId\" value='"+list.get(i).getId()+"'></td>");
			list.get(i).setName("<td class=\"text-c\">"+list.get(i).getName()+"</td>");
			list.get(i).setUsername("<td class=\"text-c\">"+list.get(i).getUsername()+"</td>");
			list.get(i).setDepartName("<td class=\"text-c\">"+list.get(i).getDepartName()+"</td>");
			list.get(i).setMajorName("<td class=\"text-c\">"+list.get(i).getMajorName()+"</td>");
			list.get(i).setGradeName("<td class=\"text-c\">"+list.get(i).getGradeName()+"</td>");
			list.get(i).setClassName("<td class=\"text-c\">"+list.get(i).getClassName()+"</td>");
			list.get(i).setOperateName("<td class=\"text-c\">"+list.get(i).getOperateName()+"</td>");
			list.get(i).setUpdateTime("<td class=\"text-c\">"+list.get(i).getUpdateTime()+"</td>");
			list.get(i).setCreateTime("<td class=\"text-c\">"+list.get(i).getCreateTime()+"</td>");
			StringBuffer operation  =new StringBuffer();
			operation.append("<td class='text-c f-16' style='letter-spacing:2px;'>");
			Map<String, String> powers = teacherInfo.getPowers();
			if(powers.containsKey(" 查看考勤记录（考勤机用户录入总表）")){
				operation.append(" <a href='javascript:void(0);' title='查看用户考勤记录' onclick='Hui_admin_tab(this);' data-title='用户考勤记录' data-href='/labClockInManageController/toClockInRecordPage?userId="
						+list.get(i).getId()+ "&clockinId="+clockinId+"'><i class='Hui-iconfont Hui-iconfont-yulan'></i></a>");
			}
			if(powers.containsKey("删除用户（考勤机用户管理）")){
				operation.append(" <a href='javascript:void(0);' title='删除该用户' onclick='delUser("
						+list.get(i).getId()+");'><i class='Hui-iconfont Hui-iconfont-del2'></i></a>");
			
			}
			operation.append(" </td>");
			list.get(i).setOperation(operation.toString());
		}
		return list;
		
	}

}
