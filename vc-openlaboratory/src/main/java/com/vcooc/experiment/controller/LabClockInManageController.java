package com.vcooc.experiment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabClockInMachine;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.datatable.AoData;
import com.vcooc.experiment.dto.ClockInMachineUserDTO;
import com.vcooc.experiment.dto.ClockInRecordDTO;
import com.vcooc.experiment.dto.LabClockUserInfoDTO;
import com.vcooc.experiment.enums.KemiCmdEnum;
import com.vcooc.experiment.service.LabClockInManageService;
import com.vcooc.util.DataTableUtils;
import com.vcooc.util.convertor.ClockInDTOConvertor;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/labClockInManageController")
public class LabClockInManageController extends BaseController {
	@Autowired
	private LabClockInManageService labClockInManageService;
	
	@Autowired
	private RedisSessionService  redisSessionService;
	
	
	
	@RequestMapping("/machineList/{pageNum}")
	public ModelAndView toMahineListPage(@PathVariable Integer pageNum,@CookieValue(required=false) final String vcoocUserId) {
		return VerificationUserModel(new VerificationUserModel() {
					
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("teacherInfo",teacherInfo);
				mv.addObject("DELETE_MACHINE", KemiCmdEnum.DELETE_MACHINE.getMsg());
				mv.addObject("vcoocUserId", vcoocUserId);
				mv.addObject("machineList", labClockInManageService.selectMachineList(teacherInfo));
				mv.setViewName("admin/studentAttendanceManage/machineList");
				return mv;
			}
		});
		
	}
	
	/**
	 * 去添加考勤机页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toAddMachinePage")
	public ModelAndView toAddMachinePage(){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("teacherInfo", teacherInfo);
				mv.setViewName("admin/studentAttendanceManage/machineAdd");
				return mv;
			}
		});
	}
	/**
	 * 获取可以添加的考勤机实验室列表</br>
	 * 实验室列表为智慧云实验室列表</br>
	 * @param vcoocUserId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getAddMachineLabList")
	public SysResult getAddMachineLabList(@CookieValue(required=false) String vcoocUserId) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		List<ExperimentLab> labList = labClockInManageService.selectAddMachineLabList(teacherInfo);
		return SysResult.ok(labList);
	}
	
	/**
	 * 获取可以编辑的考勤机实验室列表</br>
	 * 列表范围为当前考勤机id和没有设置考勤机id的智慧云实验室</br>
	 * @param vcoocUserId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getEditMachineLabList")
	public SysResult getEditMachineLabList(@CookieValue(required=false) String vcoocUserId,String clockinId) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		List<ExperimentLab> labList = labClockInManageService.selectEditMachineLabList(teacherInfo,clockinId);
		return SysResult.ok(labList);
	}
	
	/**
	 * 获取可以添加的考勤机ID列表</br>
	 * 注意：考勤机id是考勤机删除标识is_deteted为1的考勤机id</br>
	 * 考勤机删除标识有两种情况：1 是考勤机删除后
	 * 						2 物联项目一启动，会查询所有的考勤机id列表，加入到map中，</br>
	 * 						考勤机通讯配置成功后，会像服务器发送指令，指令请求中包含考勤机id</br>
	 * 						会通过map，排除已有的考勤机id，新增没有的考勤机id到map,同时新增到数据库考勤机表，默认设置is_deteled为1</br>
	 * @param vcoocUserId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getAddMachineClockinIdList")
	public SysResult getAddMachineClockinIdList(@CookieValue(required=false) String vcoocUserId) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		List<String> labList = labClockInManageService.selectAddMachineClockinIdList();
		return SysResult.ok(labList);
	}
	
	/**
	 * 添加考勤机</br>
	 * @param labId 
	 * @param name 考勤机名称</br>
	 * @param clockinId
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("/addMachine")
	@ResponseBody
	public SysResult addMachine(@RequestParam(value="labId") Integer labId,@RequestParam("name") String name
			,@RequestParam("clockinId") String clockinId,@CookieValue(required=false) String vcoocUserId) {
		
		/**校验用户是否登录或者登录超时***/
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("labId",labId);
		paramMap.put("teacherInfo", teacherInfo);
		paramMap.put("name", name);
		paramMap.put("clockinId", clockinId);
		
		try {
			return labClockInManageService.addMachine(paramMap);
		} catch (RuntimeException e) {
			return SysResult.build(201,e.getMessage());
		}
		
	}
	
	/**
	 * 去修改考勤机页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toMachineEditPage/{clockinId}")
	public ModelAndView toMachineEditPage(@PathVariable("clockinId")final String clockinId){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("teacherInfo", teacherInfo);
				mv.addObject("machine", labClockInManageService.selectMachineByClockinId(clockinId));
				mv.setViewName("admin/studentAttendanceManage/machineEdit");
				return mv;
			}
		});
	}
	/**
	 * 修改考勤机</br》
	 * @param labId
	 * @param name 考勤机名称</br>
	 * @param clockinId  考勤机设备ID</br>
	 * @param vcoocUserId
	 * @param id  考勤机自增主键id</br>
	 * @return
	 */
	@RequestMapping("/editMachine")
	@ResponseBody
	public SysResult editMachine(@RequestParam(value="labId") Integer labId,@RequestParam("name") String name
			,@RequestParam("clockinId") String clockinId,@CookieValue(required=false) String vcoocUserId,Integer id) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("labId",labId);
		paramMap.put("teacherInfo", teacherInfo);
		paramMap.put("name", name);
		paramMap.put("clockinId", clockinId);
		paramMap.put("id", id);
		
		return labClockInManageService.updateMachine(paramMap);
		
	}
	
	/**
	 * 校验考勤机ID
	 * @param param
	 * @return
	 */
	@RequestMapping("/vaildateID")
	@ResponseBody
	public  HuiValidateResult  vaildateID(String param){
		return labClockInManageService.vaildateID(param) == true?
				HuiValidateResult.ok("可以使用"):HuiValidateResult.no("该考勤机ID已存在");
	}
	
	/**
	 * 校验考勤机名称</br>
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	@RequestMapping("/vaildateName")
	@ResponseBody
	public  HuiValidateResult  vaildateName(String param){
		return labClockInManageService.vaildateName(param) == true?
				HuiValidateResult.ok("可以使用"):HuiValidateResult.no("该考勤机名称已存在");
	}
	
	/**
	 * 校验考勤机名称</br>
	 * @param param
	 * @param companyUserInfoId
	 * @return
	 */
	@RequestMapping("/vaildateNameWithFkName")
	@ResponseBody
	public  HuiValidateResult  vaildateName(String param,String fkName){
		if(fkName.equals(param) ) {
			return HuiValidateResult.ok("可以使用");
		}
		return labClockInManageService.vaildateName(param) == true?
				HuiValidateResult.ok("可以使用"):HuiValidateResult.no("该考勤机名称已存在");
	}
	
	/**
	 * 去用户信息录入列表页</br>
	 * @param 
	 * @return
	 */
	@RequestMapping("/toMachineUserInfoListPage")
	public ModelAndView toMachineUserInfoListPage(@CookieValue(required=false) String vcoocUserId){
			
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return TimeErrorModelAndView();
		}
		ModelAndView mv =getModelAndView();
		mv.addObject("teacherInfo", teacherInfo);
			
		//添加考勤机新增用户的指令标识，用于用户操作考勤机任务的回调
		mv.addObject("SET_USER_INFO",KemiCmdEnum.SET_USER_INFO.getMsg());
			
		mv.addObject("vcoocUserId",vcoocUserId);
			
		//通过考勤机录入用户总表删除的指令标识，用于用户操作考勤机任务的回调
		mv.addObject("deleteUserByUserInfoList", KemiCmdEnum.DELETE_USER_BY_USERINFOLIST.getMsg());
			
		try {
			//获取考勤机列表
			mv.addObject("machineList", labClockInManageService.selectMachineList(teacherInfo));
			mv.setViewName("/admin/studentAttendanceManage/attendanceUserList");
			return mv;
		} catch (Exception e) {
			Map<String,Object> map = new HashMap<>();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}
	
	/**
	 * 查询所有用户录入考勤机信息</br>
	 * @param vcoocUserId
	 * @param aoDataStr
	 * @return
	 */
	@RequestMapping(value="/selectAllMachineUserInfo",method=RequestMethod.POST)
	@ResponseBody
	public String selectAllMachineUserInfo(@CookieValue(required=false) String vcoocUserId,
			@RequestParam(value="aoData") String aoDataStr){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return null;
		}
		
	    AoData aoData = DataTableUtils.getAoData(aoDataStr);
		//获取录入用户信息列表
		List<LabClockUserInfoDTO> userInfoList = labClockInManageService.selectMachineUserInfoList(teacherInfo, aoData.getiDisplayStart(), aoData.getiDisplayLength(), aoData.getsSearch());
		if(userInfoList !=null && !userInfoList.isEmpty()) {
			
			//构建考勤机用户信息DTO
			userInfoList = ClockInDTOConvertor.buildClockUserInfoDTO(userInfoList, teacherInfo);
		
		}
		//获取实际行数
		int size = labClockInManageService.selectMachineUserInfoCount(teacherInfo);
		
		JSONObject getObj = new JSONObject();
		getObj.put("sEcho", aoData.getsEcho());// 不知道这个值有什么用,有知道的请告知一下
		getObj.put("iTotalRecords", size);//实际的行数
		getObj.put("iTotalDisplayRecords", size);//显示的行数,这个要和上面写的一样
		getObj.put("aaData", userInfoList);//要以JSON格式返回
		return getObj.toString();
	}
	/**
	 * 去录入考勤机用户页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toInputMachineUserInfoPage")
	public ModelAndView toInputMachineUserInfoPage(){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("teacherInfo", teacherInfo);
				mv.setViewName("/admin/studentAttendanceManage/attendanceUserAdd");
				return mv;
			}
		});
	}
	/**
	 * 录入学生信息到考勤机用户信息表</br>
	 */
	@RequestMapping(value="/inputUserInfo",method=RequestMethod.POST)
	@ResponseBody
	public SysResult  inputUserInfo(HttpServletRequest request,@CookieValue(required=false) String vcoocUserId) {
		
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		String[] classArray = request.getParameterValues("classId");
		
		if(classArray==null || classArray.length ==0) {
			return SysResult.build(400, "没有选择班级，班级id为空");
		}
		List<String> classIdList = java.util.Arrays.asList(classArray);
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("classIdList", classIdList);
		paramMap.put("operatorId", teacherInfo.getId());
		//录入学生信息到考勤机用户信息表
		return labClockInManageService.insertClockUserInfo(paramMap);
	}
	
	/**
	 * 去分配用户到考勤机页面</br>
	 * @param 
	 * @return
	 */
	@RequestMapping("/toAssignUserToMachine")
	public ModelAndView toAssignUserToMachine(@CookieValue(required=false) String vcoocUserId){
			TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
			if(teacherInfo==null){
				return TimeErrorModelAndView();
			}
			ModelAndView mv =getModelAndView();
			mv.addObject("teacherInfo", teacherInfo);
			try {
				//获取考勤机列表
				mv.addObject("machineList", labClockInManageService.selectMachineList(teacherInfo));
				mv.setViewName("/admin/studentAttendanceManage/attendanceUserList");
				return mv;
			} catch (Exception e) {
				Map<String,Object> map = new HashMap<>();
				e.printStackTrace();
				map.put("status", 500);
				map.put("msg", e.getMessage());
				return new ModelAndView("error",map);
			}
	}
	
	/**
	 * 去考勤记录页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toClockInRecordPage")
	public ModelAndView toClockInRecordPage(@CookieValue(required=false) String vcoocUserId , Integer userId,String clockinId){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return TimeErrorModelAndView();
		}
		ModelAndView mv =getModelAndView();
		mv.addObject("teacherInfo", teacherInfo);
		mv.addObject("vcoocUserId", vcoocUserId);
		boolean existClockinId =clockinId!=null && !StringUtils.isEmpty(clockinId) && !"null".equals(clockinId);
		boolean existUserId = userId!=null&&userId!=0;
		try {
			if(!existUserId) {  //去考勤机考勤记录页面
				
				mv.addObject("machine", labClockInManageService.seleMachineByClockinId(clockinId));
				mv.setViewName("/admin/studentAttendanceManage/machineAttendanceRecord");
				return mv;
			}
			if(existUserId && existClockinId) { 
				mv.addObject("clockinId", clockinId); 
			}
			mv.addObject("userInfo", labClockInManageService.selectUserInfoForClockInRecord(userId));
			mv.setViewName("/admin/studentAttendanceManage/studentAttendanceRecord"); //去用户考勤记录页面
			return mv;
		} catch (Exception e) {
			Map<String,Object> map = new HashMap<>();
			map.put("status", 500);
			map.put("msg", e.getMessage());
			return new ModelAndView("error",map);
		}
	}
	
	/**
	 * 查询考勤记录</br>
	 * @param vcoocUserId
	 * @param aoDataStr
	 * @return
	 */
	@RequestMapping(value="/selectClockinRecord",method=RequestMethod.POST)
	@ResponseBody
	public String selectClockinRecord(@CookieValue(required=false) String vcoocUserId,
			@RequestParam(value="aoData") String aoDataStr,Integer userId,String clockinId){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return null;
		}
		
	    AoData aoData = DataTableUtils.getAoData(aoDataStr);
		//获取用户的考勤记录列表
	    List<ClockInRecordDTO> recordList = labClockInManageService.selectClockinRecord(clockinId,userId,aoData.getiDisplayStart(), aoData.getiDisplayLength(), aoData.getsSearch());
		
	    //构建考勤机记录页面html页面
	    if(recordList!=null && !recordList.isEmpty()) {
	    	recordList = ClockInDTOConvertor.buildClockRecordDTO(teacherInfo,recordList,clockinId);
	    }
	    //获取实际行数
		int size = labClockInManageService.selectClockinRecordCount(userId,clockinId);
		
		JSONObject getObj = new JSONObject();
		getObj.put("sEcho", aoData.getsEcho());// 不知道这个值有什么用,有知道的请告知一下
		getObj.put("iTotalRecords", size);//实际的行数
		getObj.put("iTotalDisplayRecords", size);//显示的行数,这个要和上面写的一样
		getObj.put("aaData", recordList);//要以JSON格式返回
		return getObj.toString();
	}
	
	/**
	 * 去用户考勤记录页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toMachineUserListPage")
	public ModelAndView toMachineUserListPage(@RequestParam("clockinId") final  String clockinId,@CookieValue(required=false) final String vcoocUserId){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				
				mv.addObject("teacherInfo", teacherInfo);
				mv.addObject("machine", labClockInManageService.seleMachineByClockinId(clockinId));
				//用于确定相应的websocketsession
				mv.addObject("DELETE_USER_BY_MACHINE", KemiCmdEnum.DELETE_USER_BY_MACHINE.getMsg());
				mv.addObject("vcoocUserId", vcoocUserId);
				mv.setViewName("/admin/studentAttendanceManage/machineUserList");
				return mv;
			}
		});
	}
	
	/**
	 * 查询考勤机用户列表</br>
	 * @param vcoocUserId
	 * @param aoDataStr
	 * @return
	 */
	@RequestMapping(value="/selectMachineUserList",method=RequestMethod.POST)
	@ResponseBody
	public String selectMachineUserList(@CookieValue(required=false) String vcoocUserId,
			@RequestParam(value="aoData") String aoDataStr,String clockinId){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return null;
		}
		
		AoData aoData = DataTableUtils.getAoData(aoDataStr);
		//获取录入用户信息列表
		List<ClockInMachineUserDTO> userList = labClockInManageService.selectMachineUserList(clockinId, aoData.getiDisplayStart(), aoData.getiDisplayLength(), aoData.getsSearch());
		if(userList !=null && !userList.isEmpty()) {
			//构建考勤机记录页面html元素
			userList = ClockInDTOConvertor.buildClockInMachineUserDTO(userList, teacherInfo,clockinId);
		}
	    //获取实际行数
		int size = labClockInManageService.selectMachineUserCount(clockinId);
		
		JSONObject getObj = new JSONObject();
		getObj.put("sEcho", aoData.getsEcho());// 不知道这个值有什么用,有知道的请告知一下
		getObj.put("iTotalRecords", size);//实际的行数
		getObj.put("iTotalDisplayRecords", size);//显示的行数,这个要和上面写的一样
		getObj.put("aaData", userList);//要以JSON格式返回
		return getObj.toString();
	}
	
	/**
	 * 去考勤机考勤记录页面
	 * @param 
	 * @return
	 */
	@RequestMapping("/toMachineClockInRecordPage")
	public ModelAndView toMachineClockInRecordPage(@RequestParam("clockinId") final  String clockinId,@CookieValue(required=false) final String vcoocUserId){
			return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				
				mv.addObject("teacherInfo", teacherInfo);
				mv.addObject("machine", labClockInManageService.seleMachineByClockinId(clockinId));
				mv.addObject("vcoocUserId", vcoocUserId);
				mv.setViewName("/admin/studentAttendanceManage/machineAttendanceRecord");
				return mv;
			}
		});
	}
	
	/**
	 * 导出考勤机考勤记录
	 * @param idStr
	 * @param response
	 * @return
	 */
	@RequestMapping("/exportMachineClockinRecord")
	@ResponseBody
	public SysResult exportMachineClockinRecord(Integer type,String ids,String clockinId,HttpServletResponse  response,String startTime,String endTime,String fkName,String labName){
		
		if(StringUtils.isEmpty(fkName) || StringUtils.isEmpty(clockinId) || StringUtils.isEmpty(labName)) {
			return SysResult.build(400, "获取考勤记录信息失败！");
		}
		LabClockInMachine machine = new LabClockInMachine();
		machine.setClockinId(clockinId);
		machine.setFkName(fkName);
		machine.setLabName(labName);
		try {
			switch (type) {
			case 1:  //批量查询
				if(StringUtils.isEmpty(ids)) {
					return SysResult.build(400, "获取考勤记录信息失败！");
				}
				labClockInManageService.exportMachineClockinRecordByIdList(response,ids,machine);
				break;
			case 2:  //查询全部
				labClockInManageService.exportAllMachineClockinRecordByClockinId(response,machine);
				break;
				
			case 3:  //按时间段查询
				labClockInManageService.exportMachineClockinRecordByTime(response,machine,startTime,endTime);
				break;
			default: 
				break;
			}
  	  		return SysResult.build(200, "导出成功!");
  		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	} 
	
	/**
	 * 按时间段考勤机考勤记录个数
	 * @param idStr
	 * @param response
	 * @return
	 */
	@RequestMapping("/countMachineClockinRecordByTime")
	@ResponseBody
	public SysResult getMachineClockinRecordCountByTime(String clockinId,String startTime,String endTime){
		
		if(StringUtils.isEmpty(clockinId) || StringUtils.isEmpty(startTime) || StringUtils.isEmpty(endTime)) {
			return SysResult.build(400, "获取考勤记录信息失败！");
		}
		try {	
			int size = labClockInManageService.countMachineClockinRecordByTime(clockinId,startTime,endTime);
			if(size==0) {
				return SysResult.build(400, "没有考勤记录");
			}
  	  		return SysResult.build(200, "导出成功!");
  		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	} 
	
	/**
	 * 按时间段用户考勤记录个数
	 * @param idStr
	 * @param response
	 * @return
	 */
	@RequestMapping("/countUserClockinRecordByTime")
	@ResponseBody
	public SysResult getUserClockinRecordCountByTime(Integer userId,String clockinId,String startTime,String endTime){
		
		if(StringUtils.isEmpty(userId) || StringUtils.isEmpty(startTime) || StringUtils.isEmpty(endTime)) {
			return SysResult.build(400, "获取考勤记录信息失败！");
		}
		try {	
			int size = labClockInManageService.countUserClockinRecordByTime(userId, clockinId, startTime, endTime);
			if(size==0) {
				return SysResult.build(400, "没有考勤记录");
			}
  	  		return SysResult.build(200, "导出成功!");
  		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	} 
	
	
	/**
	 * 导出用户考勤记录
	 * @param idStr
	 * @param response
	 * @return
	 */
	@RequestMapping("exportUserClockinRecord")
	@ResponseBody
	public SysResult exportUserClockinRecord(Integer type,Integer userId,String ids,String clockinId,HttpServletResponse  response,String startTime,String endTime){
		if(StringUtils.isEmpty(userId) || StringUtils.isEmpty(type) ) {
			return SysResult.build(400, "获取考勤记录信息失败！");
		}
  	  	try {
  	  		return labClockInManageService.exportUserClockinRecord(type,userId,ids,clockinId,response,startTime,endTime);
  		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	}
	
}
