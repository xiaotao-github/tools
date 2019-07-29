package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.ExperimentGroup;
import com.vcooc.base.pojo.ExperimentGroupStudent;
import com.vcooc.base.pojo.Grade;
import com.vcooc.base.pojo.Major;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.experiment.mapper.ExperimentGroupMapper;
import com.vcooc.experiment.mapper.ExperimentGroupStudentMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;


@Service
public class ExperimentGroupService extends BaseService<ExperimentGroup> {
	@Autowired
	private SubmitExperimentFileService submitExperimentFileService;
	@Autowired
	private ExperimentGroupMapper experimentGroupMapper;
	@Autowired
	private ExperimentGroupStudentMapper experimentGroupStudentMapper;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private TeacherRemarkService teacherRemarkService;
	
	/**
	 * 根据实验课程ID，实验ID
	 * 查询实验下的班级
	 * 		该班级 在   实验课程下的实验小组
	 * 				小组下的学生
	 * 按院系区分
	 * @param experimentCourseId
	 * @param experimentId
	 * @return
	 */
	public List<Department> selectExperimentClassInfo(Integer experimentCourseId, Integer experimentId) {
		List<TbClass> tbClassList = experimentGroupMapper.selectExperimentClassInfo(experimentCourseId,experimentId);
		//把班级存进年级信息中
		List<Grade> gradeList=new ArrayList<Grade>();
		for (TbClass tbClass : tbClassList) {
			boolean blf=true;
			for (Grade grade : gradeList) {
				if(grade.getId()==tbClass.getGrade().getId()){
					grade.getTbClassList().add(tbClass);
					blf=false;
					continue;
				}
			}
			if(blf){
				Grade grade = tbClass.getGrade();
				grade.setTbClassList(new ArrayList<TbClass>());
				grade.getTbClassList().add(tbClass);
				gradeList.add(grade);
			}
		}
		//把年级存进专业中
		List<Major> majorList=new ArrayList<Major>();
		for (Grade grade : gradeList) {
			boolean blf=true;
			for (Major major : majorList) {
				if(major.getId()==grade.getMajor().getId()){
					major.getGradeList().add(grade);
					blf=false;
					continue;
				}
			}
			if(blf){
				Major major=grade.getMajor();
				major.setGradeList(new ArrayList<Grade>());
				major.getGradeList().add(grade);
				majorList.add(major);
			}
		}
		//把专业存进院系中
		List<Department> departmentList=new ArrayList<Department>(); 
		for (Major major : majorList) {
			boolean blf=true;
			for (Department department : departmentList) {
				if(department.getId()==major.getDepartment().getId()){
					department.getMajorList().add(major);
					blf=false;
					continue;
				}
			}
			if(blf){
				Department department=major.getDepartment();
				department.setMajorList(new ArrayList<Major>());
				department.getMajorList().add(major);
				departmentList.add(department);
			}
		}
		return departmentList;
	}
	
	/**
	 * 创建实验小组:
	 * 1.判断小组是否有成员；
	 * 2.判断小组下的成员是否在同一个班；
	 * 3.判断小组下的成员是否在该实验下的其他小组；
	 * @param experimentGroup
	 */
	public void addGroup(HttpServletRequest req,ExperimentGroup experimentGroup,Integer[] studentInfoIds){
		//校验小组
		this.checkGroup(experimentGroup);
		//判断小组成员是否同一班级、是否在该实验下的其他小组中，得到班级ID
		Integer classId = this.checkGroupStudent(experimentGroup,studentInfoIds);
		//封装数据
		experimentGroup.setTbClassId(classId);
		experimentGroup.setCreateTime(new Date());
		experimentGroup.setUpdateTime(experimentGroup.getCreateTime());
		//创建小组
		experimentGroupMapper.insertSelective(experimentGroup);
		//添加小组成员
		experimentGroupMapper.distrubuteStudentToGroup(experimentGroup.getExperimentGroupId(),studentInfoIds);
		//初始化成绩
		submitExperimentFileService.insertInitializeStudentGrade(experimentGroup.getExperimentCourseId(), experimentGroup.getExperimentId(), experimentGroup.getExperimentGroupId(), Arrays.asList(studentInfoIds));
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, experimentGroup.getTeacherInfoId(), "添加了实验小组《"+experimentGroup.getGroupName()+"》", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
	}
	/**
	 * 修改小组
	 * @param experimentGroup
	 * @param studentInfoIds
	 * TODO
	 */
	public void updateGroup(HttpServletRequest req,Integer teacherInfoId,ExperimentGroup experimentGroup, Integer[] studentInfoIds){
		//校验小组
		checkGroup(experimentGroup);
		//判断小组成员是否同一班级、是否在该实验下的其他小组中，得到班级ID
		this.checkGroupStudent(experimentGroup,studentInfoIds);
		experimentGroup.setUpdateTime(new Date());
		//更新小组
		experimentGroupMapper.updateByPrimaryKeySelective(experimentGroup);
		//删除原先的小组成员
		experimentGroupMapper.deleGroupStudent(experimentGroup.getExperimentGroupId());
		//添加小组成员
		experimentGroupMapper.distrubuteStudentToGroup(experimentGroup.getExperimentGroupId(),studentInfoIds);
		//初始化实验成单
		submitExperimentFileService.insertInitializeStudentGrade(experimentGroup.getExperimentCourseId(), experimentGroup.getExperimentId(), experimentGroup.getExperimentGroupId(), Arrays.asList(studentInfoIds));
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req,teacherInfoId, "修改了实验小组《"+experimentGroup.getGroupName()+"》", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
	}
	/**
	 * 校验小组学生
	 *  传入的学生在同一班级
	 *  传入的学生不在该实验的其他小组中
	 * @param experimentGroup
	 * @param studentInfoIds
	 */
	private Integer checkGroupStudent(ExperimentGroup experimentGroup, Integer[] studentInfoIds) {
		//校验小组成员
		if(studentInfoIds==null||studentInfoIds.length==0){
			throw new RuntimeException("小组成员不能为空!");
		}
		//小组学生在同一班级
		Map<String,Integer> resultMap =  experimentGroupMapper.selectStudentInfoInClassSize(studentInfoIds);
		if(!"1".equals(resultMap.get("classSize")+"")){
			throw new RuntimeException("请选择同一班级下的学生");
		}
		//校验学生不在该班级该实验下的其他小组中
		Integer result =  experimentGroupMapper.selectStudentSizeIsOtherGroup(experimentGroup.getExperimentCourseId(),experimentGroup.getExperimentId(),experimentGroup.getExperimentGroupId(),studentInfoIds);
		if(result!=0){
			throw new RuntimeException("选择的学生已经在该本实验的其他小组中");
		}
		return resultMap.get("classId");
		
	}
	/**
	 * 校验小组数据
	 * @param experimentGroup
	 */
	private void checkGroup(ExperimentGroup experimentGroup){
		if(experimentGroup.getStartTime()==null){
			throw new RuntimeException("实验开始时间不能为空!");
		}
		if(experimentGroup.getEndTime()==null){
			throw new RuntimeException("实验结束时间不能为空!");
		}
		if(!StringUtils.isNotEmpty(experimentGroup.getGroupName())){
			throw new RuntimeException("实验小组名称不能为空!");
		}
		if(experimentGroup.getExperimentCourseId()==null){
			throw new RuntimeException("创建失败,无法获取实验课程的相关信息，请正确操作!");
		}
		if(experimentGroup.getExperimentId()==null){
			throw new RuntimeException("创建失败,无法获取实验的相关信息，请正确操作!");
		}
		/*if(experimentGroup.getTeacherInfoId()==null){
			throw new RuntimeException("创建失败，无法获取创建小组的教师信息");
		}*/
	}
	/**
	 * 删除小组下的学生提交的数据
	 * 删除小组下的学生
	 * 删除小组
	 * @param experimentGroupId 小组ID
	 */
	public void deleteGroup(HttpServletRequest req,Integer teacherInfoId,Integer experimentGroupId) {
		//删除小组下的学生提交的数据
		ExperimentGroup record = experimentGroupMapper.selectByPrimaryKey(experimentGroupId);
		SubmitExperimentFile sefRecord = new SubmitExperimentFile();
		sefRecord.setExperimentGroupId(experimentGroupId);
		submitExperimentFileService.deleteByWhere(sefRecord);
		//删除小组下的学生
		ExperimentGroupStudent egsRecord = new ExperimentGroupStudent();
		egsRecord.setExperimentGroupId(experimentGroupId);
		experimentGroupStudentMapper.delete(egsRecord);
		//删除小组
		experimentGroupMapper.deleteByPrimaryKey(experimentGroupId);
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, teacherInfoId, "删除了实验小组《"+record.getGroupName()+"》", 5);
		teacherLogInformationMapper.insertSelective(teacherLogInformation);
	}
	
	/**
	 * 根据小组ID，查询小组的信息
	 * 		包括小组下的学生信息
	 * @param experimentGroupId
	 * @return
	 */
	public ExperimentGroup selectExperimentGroupById(Integer experimentGroupId) {
		return experimentGroupMapper.selectExperimentGroupById(experimentGroupId);
	}
	/**
	 * 根据权限查询小组信息
	 * 	menuParam == 1 查询所有小组   menuParam == 2 查询院系小组   menuParam == 3 查询我的实验小组
	 * @param menuParam
	 * @param teacherInfo
	 * @return
	 */
	public List<ExperimentGroup> selectExperimentGroupsByMenuParamAndTeacherInfo(Integer menuParam,
			TeacherInfo teacherInfo) {
		switch (menuParam) {
		case 1:
			return experimentGroupMapper.selectExperimentGroupByWhere(null,null);
		case 2:
			if(teacherInfo.getDepartment() ==null){
				throw new RuntimeException("对不起，无法查到您属于哪个院系，无法获得院系小组！");
			}
			return experimentGroupMapper.selectExperimentGroupByWhere(teacherInfo.getDepartment().getId(),null);
		case 3:
			return experimentGroupMapper.selectExperimentGroupByWhere(null,teacherInfo.getId());
		}
		return null;
	}
	
	/**
	 * 根基实验课程ID、实验ID、班级ID、查询实验-班级下未分配小组的学生
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	public List<StudentInfo> selectNotGroupStudentInfoByData(Integer experimentCourseId, Integer experimentId,
			Integer classId) {
		return experimentGroupMapper.selectOtherStudentInfoByExperimentCourseIdAndExperimentIdAndClassId(
				experimentCourseId,experimentId,classId);
	}
	/**
	 * 查询班级在该实验下的小组信息
	 * @param experimentId 实验id
	 * @param classId 小组id
	 * @return
	 */
	public List<ExperimentGroup> selectClassExperimentGroup(Integer experimentId, Integer classId) {
		return experimentGroupMapper.selectClassExperimentGroup(experimentId,classId);
	}
	
	/**
	 * 
	 * @param cloneExperimentId 需要克隆的实验id
	 * @param experimentGroup 实验小组信息。里面有实验课id，实验id，班级id
	 */
	public void coloneExeprimentGroupToNewExperiment(Integer cloneExperimentId,ExperimentGroup experimentGroup){
		Boolean isGroup = experimentGroupMapper.selectClassExperimentGroup(experimentGroup.getExperimentId(),experimentGroup.getTbClassId()).isEmpty();
		if(!isGroup){
			throw new RuntimeException("无法克隆实验小组,该实验下已经有实验小组。");
		}
		List<ExperimentGroup> data = experimentGroupMapper.selectClassExperimentGroup(cloneExperimentId,experimentGroup.getTbClassId());
		for (ExperimentGroup temp : data) {
			temp.setUpdateTime(new Date());
			temp.setExperimentCourseId(experimentGroup.getExperimentCourseId());
			temp.setExperimentId(experimentGroup.getExperimentId());
			temp.setExperimentGroupId(null);
			temp.setTeacherInfoId(experimentGroup.getTeacherInfoId());
			temp.setStartTime(experimentGroup.getStartTime());
			temp.setEndTime(experimentGroup.getEndTime());
			List<StudentInfo> studentInfoList = temp.getStudentInfoList();//小组下的学生
			List<Integer> studentIds = new ArrayList<Integer>();
			if(studentInfoList!=null && !studentInfoList.isEmpty()){
				for (StudentInfo studentInfo : studentInfoList) {
					if(studentInfo.getId()!=null){
						studentIds.add(studentInfo.getId());
					}
				}
			}
			experimentGroupMapper.insertSelective(temp);//保存小组信息，id回写
			if(!studentIds.isEmpty()){
				experimentGroupStudentMapper.insertStudentToGroup(temp.getExperimentGroupId(),studentIds);
			}
		}
	}
	/**
	 * 判断班级在改实验下是否有历史实验小组,有:false  无:true
	 * @param experimentCourseId
	 * @param experimentId
	 * @param classId
	 * @return
	 */
	public boolean isGroup(Integer experimentCourseId, Integer experimentId, Integer classId) {
		return experimentGroupMapper.selectClassExperimentGroup(experimentId,classId).isEmpty();
	}
	/**
	 * 根据小组id，查询小组下的成员
	 * @param gourpId
	 * @return
	 */
	public List<StudentInfo> selectStudentByGroupId(Integer gourpId) {
		ExperimentGroup experimentGroup = experimentGroupMapper.selectExperimentGroupById(gourpId);
		if(experimentGroup!=null){
			return experimentGroup.getStudentInfoList();
		}else{
			return null;
		}
	}
}
