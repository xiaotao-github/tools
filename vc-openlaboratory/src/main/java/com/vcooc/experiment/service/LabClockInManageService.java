package com.vcooc.experiment.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabClockInMachine;
import com.vcooc.base.pojo.LabClockInUserInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.dto.ClockInMachineUserDTO;
import com.vcooc.experiment.dto.ClockInRecordDTO;
import com.vcooc.experiment.dto.ClockInRecordUserInfoDTO;
import com.vcooc.experiment.dto.LabClockUserInfoDTO;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.LabClockInMachineMapper;
import com.vcooc.experiment.mapper.LabClockInMachineUserMapper;
import com.vcooc.experiment.mapper.LabClockInRecordMapper;
import com.vcooc.experiment.mapper.LabClockInUserInfoMapper;
import com.vcooc.util.ClockinRecordExportUtil;

@Service
public class LabClockInManageService {
	@Autowired
	private LabClockInMachineMapper labClockInMachineMapper; 
	
	@Autowired
	private ExperimentLabMapper  experimentLabMapper;
	
	@Autowired
	private LabClockInUserInfoMapper labClockInUserInfoMapper;
	
	@Autowired
	private LabClockInRecordMapper LabClockInRecordMapper;
	
	@Autowired
	private LabClockInMachineUserMapper labClockInMachineUserMapper; 
	
	
	/**
	 * 查询考勤机列表</br>
	 * @param teacherInfo
	 * @return
	 */
	public List<LabClockInMachine>  selectMachineList(TeacherInfo teacherInfo) {
		List<LabClockInMachine> machineList = labClockInMachineMapper.selectMachineList(teacherInfo);
		return machineList ;
	}
	

	/**
	 * 获取可以添加考勤机的实验室列表</br>
	 * @param teacherInfo
	 * @return
	 */
	public List<ExperimentLab> selectAddMachineLabList(TeacherInfo teacherInfo) {
		
		return labClockInMachineMapper.selectAddMachieLabList(teacherInfo);
		
		
	}
	
	/**
	 * 获取编辑考勤机的实验室列表</br>
	 * @param teacherInfo
	 * @return
	 */
	public List<ExperimentLab> selectEditMachineLabList(TeacherInfo teacherInfo,String clockinId) {
		
		return labClockInMachineMapper.selectEditMachieLabList(teacherInfo.getDepartmentId(),clockinId);
		
	}
	
	/**
	 * 获取可以添加考勤机id列表</br>
	 * @param teacherInfo
	 * @return
	 */
	public List<String> selectAddMachineClockinIdList() {
		
		return labClockInMachineMapper.selectAddMachieClockinIdList();
		
		
	}

	/**
	 * 新增考勤机</br>
	 * @param paramMap key clockinId 考勤机设备号 type:String</br>
	 * 				   key labId  实验室id  type:Integer</br>
	 * 				   key name    考勤机名称  type:String</br>
	 * 				   key teacherInfo  老师信息 type:TeacherInfo</br>
	 * @return
	 */
	public SysResult addMachine(HashMap<String, Object> paramMap) {
		
		//新增考勤机
		LabClockInMachine  machine = new LabClockInMachine();
		machine.setClockinId((String)paramMap.get("clockinId"));
		machine.setLabId(Long.parseLong(String.valueOf(paramMap.get("labId"))));
		TeacherInfo teacherInfo = (TeacherInfo) paramMap.get("teacherInfo");
		machine.setOperatorId(teacherInfo.getId());
		machine.setFkName((String)paramMap.get("name"));
		
		//添加考勤机，其实就是将考勤机的删除标志1改为0，同时更新相应的考勤机信息
		int result = labClockInMachineMapper.updateForAddMachine(machine);
		if(result ==0) {
			return SysResult.build(201, "所选的考勤机ID已添加，请勿重复操作！");
		}
		
		//更新实验室考勤id
		ExperimentLab  lab = new ExperimentLab();
		lab.setClockinId((String)paramMap.get("clockinId"));
		lab.setUpdateTime(new Date());
		lab.setLabId((Integer)paramMap.get("labId"));
		
		int updateLabResult = experimentLabMapper.updateByPrimaryKeySelective(lab);
		if(updateLabResult ==0) {
			throw new RuntimeException("没有存在该实验室");
			//return SysResult.build(201, "没有存在该实验室");
		}
		
		return SysResult.build(200, "添加考勤机成功");
	}
	
	/**
	 * 编辑考勤机</br>
	 * @param paramMap key clockinId 考勤机设备号 type:String</br>
	 * 				   key labId  实验室id  type:Integer</br>
	 * 				   key name    考勤机名称  type:String</br>
	 * 				   key teacherInfo  老师信息 type:TeacherInfo</br>
	 * 				   key id  考勤机自增主键id type:Integer</br>
	 * @return
	 */
	public SysResult updateMachine(HashMap<String, Object> paramMap) {
		
		//新增考勤机
		LabClockInMachine  machine = new LabClockInMachine();
		machine.setClockinId((String)paramMap.get("clockinId"));
		machine.setLabId(Long.parseLong(String.valueOf(paramMap.get("labId"))));
		TeacherInfo teacherInfo = (TeacherInfo) paramMap.get("teacherInfo");
		machine.setOperatorId(teacherInfo.getId());
		machine.setFkName((String)paramMap.get("name"));
		machine.setId((Integer)paramMap.get("id"));
		machine.setUpdateTime(new Date());
		//修改考勤机
		int result = labClockInMachineMapper.updateByPrimaryKeySelective(machine);
		
		//更新实验室考勤id
		ExperimentLab  lab = new ExperimentLab();
		lab.setClockinId((String)paramMap.get("clockinId"));
		lab.setUpdateTime(new Date());
		lab.setLabId((Integer)paramMap.get("labId"));
		
		int updateLabResult = experimentLabMapper.updateByPrimaryKeySelective(lab);
		if(updateLabResult ==0) {
			throw new RuntimeException("没有存在该实验室");
		}
		
		return SysResult.build(200, "添加考勤机成功");
	}

	/**
	 * 校验考勤机ID</br>
	 * @param param
	 * @return
	 */
	public boolean vaildateID(String param) {
		//正则校验，考勤机id
		LabClockInMachine machine = new LabClockInMachine();
		machine.setClockinId(param);
		machine.setIsDeleted(false);
		List<LabClockInMachine> list = labClockInMachineMapper.select(machine);
		if(list == null || list.isEmpty()) {
			return true;
		}
		return false;
	}

	/**
	 * 校验考勤机名称</br>
	 * @param param
	 * @return
	 */
	public boolean vaildateName(String param) {
		//正则校验，考勤机id
		LabClockInMachine machine = new LabClockInMachine();
		machine.setFkName(param);
		machine.setIsDeleted(false);
		List<LabClockInMachine> list = labClockInMachineMapper.select(machine);
		if(list == null || list.isEmpty()) {
			return true;
		}
		return false;
	}
	/**
	 * 根据classIdList初始化用户录入总表信息</br>
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings("null")
	public SysResult insertClockUserInfo(HashMap<String, Object> paramMap) {
		List<LabClockInUserInfo> userList = getClockInUserInfoListByClassIdList(paramMap);
		if(userList==null || userList.isEmpty()) {
			return SysResult.build(201, "当前选班级的学生已经录入过了");
		}
		paramMap.put("list", userList);
		return labClockInUserInfoMapper.batchInsert(paramMap)>0?SysResult.ok():SysResult.build(201, "录入异常");
	}
	
	/**
	 * 根据classId获取要初始化的考勤用户列表信息</br>
	 * @param paramMap </br>
	 * 		  key classId value(String) classId
	 * 
	 * @return
	 */
	public List<LabClockInUserInfo> getClockInUserInfoListByClassIdList(HashMap<String, Object> paramMap) {
		return labClockInUserInfoMapper.selectByClassIdList(paramMap);
	}
	/**
	 * 获取录入考勤机用户信息列表</br>
	 * @param teacherInfo
	 * @param sSearch 
	 * @param iDisplayLength 
	 * @param iDisplayStart 
	 * @return
	 */
	public List<LabClockUserInfoDTO> selectMachineUserInfoList(TeacherInfo teacherInfo, int iDisplayStart, int iDisplayLength, String sSearch) {
		return labClockInUserInfoMapper.selectByDepartmentId(teacherInfo.getDepartmentId(),iDisplayStart,iDisplayLength,sSearch);
	}
	
	/**
	 * 获取录入考勤机用户信息列表的个数</br>
	 * @param teacherInfo
	 * @return
	 */
	public Integer selectMachineUserInfoCount(TeacherInfo teacherInfo) {
		return labClockInUserInfoMapper.selectCountByDepartmentId(teacherInfo.getDepartmentId());
	}
	
	/**
	 * 获取考勤机记录页面，要显示的用户信息</br>
	 * 院系，专业，年级班级等</br>
	 */
	public ClockInRecordUserInfoDTO selectUserInfoForClockInRecord(Integer userId) {
		
		return LabClockInRecordMapper.selectUserInfoForClockInRecord(userId);
	}
	
	/**
	 * 通过考勤机设备id获取考勤机对象</br>
	 * @param clockinId 考勤机设备id</br>
	 * @return
	 */
	public LabClockInMachine seleMachineByClockinId(String clockinId) {
		
		LabClockInMachine machine = labClockInMachineMapper.selectMachineByClockinId(clockinId);
		
		return machine;
	}
	/**
	 * 获取考勤机下的用户列表</br>
	 * @param clockinId 考勤机设备id</br>
	 * @param iDisplayStart
	 * @param iDisplayLength
	 * @param sSearch
	 * @return
	 */
	public List<ClockInMachineUserDTO> selectMachineUserList( String clockinId, int iDisplayStart,
			int iDisplayLength, String sSearch) {
		
		return labClockInMachineUserMapper.selectMachineUserList(clockinId,iDisplayStart,iDisplayLength,sSearch);
	}
	
	/**
	 * 获取考勤机下的用户总数</br>
	 * @param clockinId
	 * @return
	 */
	public int selectMachineUserCount(String clockinId) {
		return  labClockInMachineUserMapper.selectMachineUserCountByClockinId(clockinId);
	}
	
	/**
	 * 获取考勤机下的考勤机记录列表</br>
	 * @param clockinId
	 * @param iDisplayStart
	 * @param iDisplayLength
	 * @param sSearch
	 * @return
	 */
	public List<ClockInRecordDTO> selectMachineClockinRecord(String clockinId, int iDisplayStart,
			int iDisplayLength, String sSearch) {
		return LabClockInRecordMapper.selectMachineClockinRecord(clockinId,iDisplayStart,iDisplayLength,sSearch);
	}
	
	/**
	 * 根据考勤机记录id集合获取考勤机记录</br>
	 * @param ids
	 * @return
	 */
	public List<ClockInRecordDTO> selectClockinRecordByIdList(List<Integer>ids) {
		return LabClockInRecordMapper.selectByIdList(ids);
	}
	
	/**
	 * 获取考勤机记录,userId、clockinId至少一个不为null</br>
	 * @param clockinId
	 * @param userId
	 * @param iDisplayStart
	 * @param iDisplayLength
	 * @param sSearch
	 * @return
	 */
	public List<ClockInRecordDTO> selectClockinRecord(String clockinId, Integer userId, int iDisplayStart,
			int iDisplayLength, String sSearch) {
		boolean existClockinId =clockinId!=null && !StringUtils.isEmpty(clockinId) && !"null".equals(clockinId);
		boolean existUserId = userId!=null&&userId!=0;
		if(existClockinId &&existUserId) {
			return LabClockInRecordMapper.selectUserClockinRecordByClockinIdAndUserId(userId,clockinId,iDisplayStart,iDisplayLength,sSearch);
		}
		if(existClockinId && !existUserId) {
			
			return LabClockInRecordMapper.selectMachineClockinRecord(clockinId,iDisplayStart,iDisplayLength,sSearch);
		}
		return LabClockInRecordMapper.selectUserClockinRecordByUserId(userId,iDisplayStart,iDisplayLength,sSearch);
		
	}
	
	/**
	 * 获取考勤机记录的总数,userId、clockinId至少一个不为null</br>
	 * @param userId
	 * @param clockinId
	 * @return
	 */
	public int selectClockinRecordCount(Integer userId, String clockinId) {
		
		boolean existClockinId =clockinId!=null && !StringUtils.isEmpty(clockinId) && !"null".equals(clockinId);
		boolean existUserId = userId!=null&&userId!=0;
		if(existClockinId &&existUserId) {
			return LabClockInRecordMapper.selectCountByClockinIdAndUserId(clockinId, userId);
		}
		if(existClockinId && !existUserId) {
			
			return LabClockInRecordMapper.selectCountByClockinId(clockinId);
		}
		return LabClockInRecordMapper.selectCountByUserId(userId);
	}
	
	/**
	 * 根据考勤机设备id，获取考勤机</br>
	 * @param clockinId
	 * @return
	 */
	public LabClockInMachine selectMachineByClockinId(String clockinId) {
		return labClockInMachineMapper.selectMachineByClockinId(clockinId);
	
	}
	
	/**
	 * 批量导出考勤机考勤记录</br>
	 * @param response
	 * @param ids 考勤记录主键数组字符串</br>
	 * @param machine
	 */
	public List<ClockInRecordDTO> exportMachineClockinRecordByIdList(HttpServletResponse response, String ids, LabClockInMachine machine) {
		
		List<Integer> idList = com.vcooc.util.StringUtils.intArrayStrToList(ids);
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByIdList(idList);
		ClockinRecordExportUtil.exportMachineClockinRecord(response, list,machine);
		return list;
		
	}
	/**
	 * 导出考勤机全部考勤机记录</br>
	 * @param response
	 * @param machine
	 */
	public List<ClockInRecordDTO> exportAllMachineClockinRecordByClockinId(HttpServletResponse response, LabClockInMachine machine) {
		
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByClockinId(machine.getClockinId());
		ClockinRecordExportUtil.exportMachineClockinRecord(response, list,machine);
		return list;
	}
	
	/**
	 * 通过时间段导出考勤机考勤记录</br>
	 * @param response
	 * @param machine
	 * @param startTime
	 * @param endTime
	 */
	public List<ClockInRecordDTO> exportMachineClockinRecordByTime(HttpServletResponse response, LabClockInMachine machine,
			String startTime, String endTime) {
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByTime(machine.getClockinId(),startTime,endTime);
		if(list ==null || list.isEmpty()) {
			return null;
		}
		ClockinRecordExportUtil.exportMachineClockinRecord(response, list,machine);
		return list;
	}
	
	/**
	 * 导出用户考勤记录</br>
	 * @param type 1为批量导出  2为全部导出  3 为按时间段导出</br>
	 * @param userId
	 * @param ids 考勤记录主键数组字符串</br>
	 * @param clockinId
	 * @param response
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public SysResult exportUserClockinRecord(Integer type, Integer userId, String ids, String clockinId,
			HttpServletResponse response, String startTime, String endTime) {
		
		switch (type) {
		case 1:  //批量查询
			if(StringUtils.isEmpty(ids)) {
				return SysResult.build(400, "获取考勤记录信息失败！");
			}
			exportUserClockinRecordByIdList(response,ids,clockinId);
			break;
		case 2:  //查询全部
			exportUserAllClockinRecord(response,userId,clockinId);
			break;
			
		case 3:  //按时间段查询
			exportUserClockinRecordByTime(response,userId,startTime,endTime,clockinId);
			break;
		default: 
			break;
		}
		return SysResult.build(200, "已导出考勤记录");
	}
	/**
	 * 批量导出用户考勤记录</br>
	 * @param response
	 * @param ids 考勤记录主键数组字符串</br>
	 * @param clockinId
	 */
	private List<ClockInRecordDTO> exportUserClockinRecordByIdList(HttpServletResponse response, String ids,String clockinId) {
		List<Integer> idList = com.vcooc.util.StringUtils.intArrayStrToList(ids);
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByIdList(idList);
		ClockinRecordExportUtil.exportUserClockinRecord(response, list, clockinId);
		return list;
	}
	
	/**
	 * 全部导出用户考勤记录</br>
	 * @param response
	 * @param userId 
	 * @param clockinId
	 */
	private List<ClockInRecordDTO> exportUserAllClockinRecord(HttpServletResponse response, Integer userId,String clockinId) {
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByUserIdAndClockinId(userId, clockinId);
		ClockinRecordExportUtil.exportUserClockinRecord(response, list, clockinId);
		return list;
	}
	/**
	 * 按时间段导出用户考勤记录</br>
	 * @param response
	 * @param userId
	 * @param startTime
	 * @param endTime
	 * @param clockinId
	 */
	private List<ClockInRecordDTO> exportUserClockinRecordByTime(HttpServletResponse response, Integer userId, String startTime,
			String endTime, String clockinId) {
		List<ClockInRecordDTO> list = LabClockInRecordMapper.selectByUserIdAndClockinIdAndTime(userId, clockinId, startTime, endTime);
		if(list ==null || list.isEmpty()) {
			return null;
		}
		ClockinRecordExportUtil.exportUserClockinRecord(response, list, clockinId);
		return list;
	}

	/**
	 * 获取按时间的考勤机考勤机记录个数
	 * @param clockinId
	 * @param startTime
	 * @param endTime
	 */
	public int countMachineClockinRecordByTime(String clockinId, String startTime, String endTime) {
		return LabClockInRecordMapper.countMachineClockinRecordByTime(clockinId,startTime,endTime);
		
	}
	
	/**
	 * 获取按时间的用户考勤机记录个数
	 * @param clockinId
	 * @param startTime
	 * @param endTime
	 */
	public int countUserClockinRecordByTime(Integer userId,String clockinId, String startTime, String endTime) {
		return LabClockInRecordMapper.countUserClockinRecordByTime(userId, clockinId, startTime, endTime);
		
	}

}
