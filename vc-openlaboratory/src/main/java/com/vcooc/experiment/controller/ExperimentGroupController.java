package com.vcooc.experiment.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentGroup;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.DepartmentService;
import com.vcooc.experiment.service.ExperimentCourseService;
import com.vcooc.experiment.service.ExperimentGroupService;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.TbClassService;
import com.vcooc.util.CollectionUtil;

@Controller
@RequestMapping("experimentGroupController")
public class ExperimentGroupController extends BaseController{
	@Autowired
	private ExperimentGroupService experimentGroupService;
	@Autowired
	private ExperimentService experimentService;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private TbClassService tbClassService;
	@Autowired
	private DepartmentService departmentService;
	/**	
	 *
	 *  查询课程实验下的相关信息  跳转到课程实验分配小组页面
	 * 实验ID
	 * 实验课程ID
	 * 思路：
	 * 1.根据实验课程ID 查询实验课程下的班级
	 * 2.根据实验课程ID  实验ID  班级ID  查询该班级下的小组
	 * 3.根据小组ID，查询小组下的同学
	 * 4.根据班级中未分配小组的同学
	 */
	 
	
	@RequestMapping("toPlanExperimentPage/{experimentCourseId}/{experimentId}")
	public ModelAndView toPlanExperimentPage(@PathVariable("experimentCourseId") Integer experimentCourseId,@PathVariable("experimentId") Integer experimentId,ModelAndView model){
		//查询实验课程下的班级信息-班级中的小组信息-班级下未分配小组的学生信息
		List<Department> departmentList = experimentGroupService.selectExperimentClassInfo(experimentCourseId,experimentId);
		model.addObject("departmentList", departmentList);
		//查询根据实验ID 查询实验信息
		model.addObject("experiment",experimentService.queryById(experimentId));
		//根据实验课程ID 查询实验课程信息
		model.addObject("experimentCourse",experimentCourseService.selectExperimentCourseById(experimentCourseId));
		model.setViewName("admin/course_experiment_manage/experiment_edit_group");
		return model;
	}
	/**
	 * 创建实验小组：
	 * 1.判断小组是否有成员；
	 * 2.判断小组下的成员是否在同一个班；
	 * 3.判断小组下的成员是否在该实验下的其他小组；
	 * @param ExperimentGroup
	 * @return
	 */
	@RequestMapping("addGroup/{vcoocUserId}")
	@ResponseBody
	public SysResult addGroup(@PathVariable String vcoocUserId,
			ExperimentGroup experimentGroup,
			Integer[] studentInfoIds,
			HttpServletRequest req){
		TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203, "由于您长时间未操作，请登录后再进行操作");
		}
		experimentGroup.setTeacherInfoId(teacherInfo.getId());
		try {
			experimentGroupService.addGroup(req,experimentGroup,studentInfoIds);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
		return SysResult.ok();
	}
	/**
	 * 根据小组ID，查询小组信息
	 * 			小组下的学生信息
	 * 该小组所属实验未分配小组的学生信息
	 * 		跳转到小组修改页面
	 * @param experimentGroupId
	 * @param model
	 * @return
	 */
	@RequestMapping("selectGroupAndStudentToEditPage/{experimentGroupId}")
	public ModelAndView selectGroupAndStudentToEditPage(@PathVariable Integer experimentGroupId,ModelAndView model){
		//查询小组相关信息
		ExperimentGroup experimentGroup = experimentGroupService.selectExperimentGroupById(experimentGroupId);
		model.addObject("experimentGroup", experimentGroup);
		model.setViewName("admin/course_experiment_manage/group_edit");
		return model;
	}
	/**
	 * 根据小组ID，查询小组信息
	 * 			小组下的学生信息
	 * 该小组所属实验未分配小组的学生信息
	 * 		跳转到小组预览页面
	 * @param experimentGroupId
	 * @param model
	 * @return
	 */
	@RequestMapping("selectGroupAndStudentToPreviewPage/{experimentGroupId}/{menuParam}")
	public ModelAndView selectGroupAndStudentToPreviewPage(@PathVariable Integer experimentGroupId,@PathVariable Integer menuParam,ModelAndView model){
		//查询小组相关信息
		ExperimentGroup experimentGroup = experimentGroupService.selectExperimentGroupById(experimentGroupId);
		model.addObject("experimentGroup", experimentGroup);
		model.addObject("menuParam", menuParam);
		model.setViewName("admin/experiment_group_manage/group_manage_preview");
		return model;
	}
	/**
	 * 修改小组信息：
	 * 1.判断小组是否有成员；
	 * 2.判断小组下的成员是否在同一个班；
	 * 3.判断小组下的成员是否在该实验下的其他小组；
	 * @param experimentGroup
	 * @param studentInfoIds
	 * @return
	 */
	@RequestMapping("updateGroup")
	@ResponseBody
	public SysResult updateGroup(@CookieValue("vcoocUserId") String vcoocUserId,
			ExperimentGroup experimentGroup,
			Integer[] studentInfoIds,HttpServletRequest req){
		TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
		if(teacherInfo==null){
			SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		try {
			experimentGroupService.updateGroup(req,teacherInfo.getId(),experimentGroup,studentInfoIds);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
		return SysResult.ok();
	}
	/**
	 * 删除小组
	 * @param vcoocUserId
	 * @param experimentGroupId
	 * @param req
	 * @return
	 */
	@RequestMapping("deleteGroup/{experimentGroupId}")
	@ResponseBody
	public SysResult deleteGroup(@CookieValue("vcoocUserId") String vcoocUserId,
			@PathVariable Integer experimentGroupId,
			HttpServletRequest req){
		TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
		if(teacherInfo==null){
			SysResult.build(203,"由于您长时间未操作，请登录后再操作！");
		}
		experimentGroupService.deleteGroup(req,teacherInfo.getId(),experimentGroupId);
		return SysResult.ok();
	}
	//------------------------------------------------------------实验小组管理-----------------------------------------------------------
	/**
	 * 根据权限和用户信息  查询小组相关信息，跳转到小组管理页面
	 * @param vcoocUserId
	 * @param menuParam
	 * @param model
	 * @return
	 */
	@RequestMapping("toGroupManagePageByMenuParam/{vcoocUserId}/{menuParam}")
	public ModelAndView toGroupManagePageByMenuParam(@PathVariable String vcoocUserId,@PathVariable Integer menuParam,ModelAndView model){
		TeacherInfo teacherInfo = this.IsExitTeacherInfo(vcoocUserId);
		ModelMap map = new ModelMap();
		if(teacherInfo==null){
			map.addAttribute("status",203);
			map.addAttribute("msg", "由于您长时间未操作，请等理由后再重新操作");
			model.setViewName("error");
			model.addAllObjects(map);
			return model;
		}
		try {
			List<ExperimentGroup> experimentGroupList = experimentGroupService.selectExperimentGroupsByMenuParamAndTeacherInfo(menuParam,teacherInfo);
			for(int i=0; i<experimentGroupList.size(); i++){
				String StudentName="";
				List<StudentInfo> silist = experimentGroupList.get(i).getStudentInfoList();
				if(silist!=null){
					for(int j=0;j<silist.size(); j++){
						StudentName+=silist.get(j).getName()+"、";
					}
				}
				if(StudentName != "") 
					experimentGroupList.get(i).setStudentListName(
							StudentName.substring(0, StudentName.length()-1));
			}
			map.addAttribute("experimentGroupList", experimentGroupList);
			map.addAttribute("menuParam", menuParam);
			model.addAllObjects(map);
			model.setViewName("admin/experiment_group_manage/group_manage_list");
		} catch (RuntimeException e) {
			map.addAttribute("status",202);
			map.addAttribute("msg",e.getMessage());
			model.setViewName("error");
			model.addAllObjects(map);
		}
		return model;
	}
	/**
	 * 根据实验课程ID、实验ID、 班级ID、查询班级下未分配小组的学生信息  、实验课程信息、
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	@RequestMapping("selectNotGroupStudentInfoByData/{experimentCourseId}/{experimentId}/{classId}")
	@ResponseBody
	public SysResult selectNotGroupStudentInfoByData(@PathVariable Integer experimentCourseId,@PathVariable Integer experimentId,@PathVariable Integer classId){
		List<StudentInfo> studentInfoList = experimentGroupService.selectNotGroupStudentInfoByData(experimentCourseId,experimentId,classId);
		if(studentInfoList==null||studentInfoList.isEmpty()){
			return SysResult.build(202,"该班级下无学生数据或已在其他小组中");
		}else{
			return SysResult.ok(studentInfoList);
		}
	}
	/**
	 * 判断该班级下是否有实验小组
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	@RequestMapping("isGroup/{experimentCourseId}/{experimentId}/{classId}")
	@ResponseBody
	public SysResult isGroup(@PathVariable Integer experimentCourseId,@PathVariable Integer experimentId,@PathVariable Integer classId){
		if(experimentGroupService.isGroup(experimentCourseId,experimentId,classId)){
			return SysResult.ok();
		}else{
			return SysResult.build(202,"该班级下已经有实验小组");
		}
	}
	
	/**
	 * 根据实验课程ID、实验ID、 班级ID、查询班级下未分配小组的学生信息 跳转到小组添加页面
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	@RequestMapping("selectNotGroupStudentInfoAndOtherInfoByData/{experimentCourseId}/{experimentId}/{classId}/{departmentId}")
	@ResponseBody
	public ModelAndView selectNotGroupStudentInfoAndOtherInfoByData(@PathVariable Integer experimentCourseId,@PathVariable Integer experimentId,@PathVariable Integer classId,@PathVariable Integer departmentId,ModelAndView model){
		List<StudentInfo> studentInfoList = experimentGroupService.selectNotGroupStudentInfoByData(experimentCourseId,experimentId,classId);
		model.addObject("studentInfoList", studentInfoList);
		model.addObject("experimentCourse", experimentCourseService.queryById(experimentCourseId));
		model.addObject("experiment", experimentService.queryById(experimentId));
		model.addObject("tbClass", tbClassService.queryById(classId));
		model.addObject("department",departmentService.queryById(departmentId));
		model.setViewName("admin/course_experiment_manage/group_add");
		return model;
	}
	/**
	 * 根据实验id，班级id，查询该班级在该实验下的小组信息
	 * @return
	 */
	@RequestMapping("selectClassExperimentGroup/{experimentId}/{classId}")
	@ResponseBody
	public SysResult selectClassExperimentGroup(@PathVariable Integer experimentId,@PathVariable Integer classId){
		List<ExperimentGroup> experimentGroupList = experimentGroupService.selectClassExperimentGroup(experimentId,classId);
		return SysResult.ok(experimentGroupList);
	}
	/**
	 * 克隆实验小组到新的实验
	 * @param cloneExperimentId
	 * @param experimentGroup
	 * @return
	 /
	@RequestMapping("coloneExeprimentGroupToNewExperiment")
	@ResponseBody
	public SysResult coloneExeprimentGroupToNewExperiment(Integer cloneExperimentId,ExperimentGroup experimentGroup){
		try {
			if(cloneExperimentId == null){
				return SysResult.build(202,"克隆的实验不能为空");
			}
			experimentGroupService.coloneExeprimentGroupToNewExperiment(cloneExperimentId, experimentGroup);
			return SysResult.ok();
		} catch (Exception e) {
			return SysResult.build(202,e.getMessage());
		}
	}
	/**
	 * 根据小组id，查询小组下的成员
	 */
	//TODO
	@RequestMapping("selectStudentByGroupId/{gourpId}")
	@ResponseBody
	public SysResult selectStudentByGroupId(@PathVariable Integer gourpId){
		List<StudentInfo> studentInfos = experimentGroupService.selectStudentByGroupId(gourpId);
		if(CollectionUtil.isEmpty(studentInfos)) return SysResult.build(202, "该小组未分配学生");
		return SysResult.ok(studentInfos);
	}
	
	
	/**
	 * 根据vcoocUserId获取redis中的TeacherInfo信息
	 * @param vcoocUserId
	 * @return
	 */
	private TeacherInfo IsExitTeacherInfo(String vcoocUserId) {
		if (!StringUtils.isNotEmpty(vcoocUserId)) {
			return null;
		}
		// 从redis中获取用户信息
		Object obj = redisSessionService.querySessionTeacherInfo(vcoocUserId);
		// 获取操作员信息
		if (obj != null && obj instanceof TeacherInfo) {
			TeacherInfo teacherInfo = (TeacherInfo) obj;
			return teacherInfo;
		}
		return null;
	}
}
