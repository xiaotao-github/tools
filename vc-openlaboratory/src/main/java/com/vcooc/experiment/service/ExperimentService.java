package com.vcooc.experiment.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.ExperimentStep;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.service.RedisLock;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.dto.ExperimentStandardDTO;
import com.vcooc.experiment.dto.ExperimentStepDTO;
import com.vcooc.experiment.mapper.ExperimentMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;
import com.vcooc.util.ResourceFileUtil;

@Service
public class ExperimentService extends BaseService<Experiment> {
	@Autowired
	private ExperimentMapper experimentMapper;
	@Autowired
	private ExperimentFileService experimentFileService;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private ExperimentCourseService experimentCourseService;
	@Autowired
	private ExperimentStepService experimentStepService;
	@Autowired
	private ExperimentStandardService experimentStandardService;
	@Autowired
	private CourseExperimentService courseExperimentService;
	@Autowired
	private RedisLock redisLock;
	@PropertyConfig
	private Long lock_due_time;//锁的过期时间
	@PropertyConfig
	private String addExperimentLock;//添加实验的锁
	@PropertyConfig
	private Integer MAX_COUNT;
	@PropertyConfig
	private String  VS_EXPERIMENT;
	@PropertyConfig
	private String FILE_PATH;
	/**
	 * 根据权限查询实验信息
	 * 包括作者。
	 * menuParam==1 查看所有实验、menuParam==2查看院系实验、menuParam==3查看我的实验；
	 * @param menuParam
	 * @param teacherInfo
	 * @return
	 */
	public List<Experiment> selectExperimentByMenuParam(Integer menuParam, TeacherInfo teacherInfo,Integer systemIdentify) throws RuntimeException {
		switch (menuParam) {
		case 1://查看所有实验
			return experimentMapper.selectExperimentByWhere(null,null,null,2,MAX_COUNT,systemIdentify);
		case 2:	
			if(teacherInfo.getDepartment()==null || teacherInfo.getDepartment().getId()==null){
				throw new RuntimeException("对不起,您不属于任何院系");
			}else{
				return experimentMapper.selectExperimentByWhere(teacherInfo.getDepartment().getId(),null,null,2,MAX_COUNT,systemIdentify);
			}
		case 3:		
			return experimentMapper.selectExperimentByWhere(null,teacherInfo.getId(),null,2,MAX_COUNT,systemIdentify);
		default:
			return null;
		}
	}
	/**
	 * 添加实验，判断实验名称、实验内容、难易程度、实验类型、作者ID不能为空
	 * @param experiment
	 */
	public void addExperiment(Experiment experiment,TeacherInfo teacherInfo
			, HttpServletRequest req) throws RuntimeException{
		//检测实验数据是否正确
		checkExperiment(experiment);
		//编辑器图片的资源路径
		if(experiment.getExperimentInstructorBag()==null){
			throw new RuntimeException("【添加实验】无法获取实验资源存放路径！");
		}
		String value = String.valueOf(System.currentTimeMillis()+lock_due_time);
			for(int i=0;i<10;i++){
				if(redisLock.getLock(addExperimentLock, value)){
					//封装数据
					try {
					experiment.setExperimentType(3);
					experiment.setStealth(2);
					experiment.setCreateTime(new Date());
					experiment.setUpdateTime(experiment.getCreateTime());
					//添加实验进数据库
					experimentMapper.insertSelective(experiment);
					//先进行文件判断，并且写入资源表  资源与实验中间表
					//experimentFileService.addExperimentFile(files,experiment,teacherInfo,experiment.getExperimentType());
					//添加  实验课程关联数据
					courseExperimentService.addExperimentToCourse(experiment.getExperimentCourseId(),experiment.getExperimentId());
					//添加操作员信息
					TeacherLogInformation record = TeacherLogInformation.bildInfo(req, experiment.getAuthorId(),"添加了实验《"+experiment.getExperimentName()+"》", 7);
					teacherLogInformationMapper.insertSelective(record);
					} finally{
						//解锁
						redisLock.unLock(addExperimentLock, value);
					}
					break;
				}
				if(i>=9){
					throw new RuntimeException("【添加实验】 添加实验失败,原因:由于太多人操作了，请您稍后操作,experimentName:"+experiment.getExperimentName());
				}
			}
	}
	/**
	 * 修改实验，判断实验名称、实验内容、难易程度、实验类型、作者ID不能为空
	 * @param experiment
	 */
	public void updateExperiment(Experiment experiment) throws RuntimeException{
		if(experiment.getExperimentId()==null){
			throw new RuntimeException("【修改实验】获取不到实验id");
		}
		//检测实验数据是否正确
		checkExperiment(experiment);
		//封装数据
		experiment.setUpdateTime(new Date());
		
		if(experiment.getExperimentCourseId()!=null){
			courseExperimentService.deleteByExperimentId(experiment.getExperimentId());
			courseExperimentService.addExperimentToCourse(experiment.getExperimentCourseId(), experiment.getExperimentId());
		}
		
		//添加实验进数据库中
		experimentMapper.updateByPrimaryKeySelective(experiment);
	}
	
	/**
	 * 判断实验名称、实验内容、难易程度、实验类型、作者ID不能为空
	 * 测试实验中的数据
	 * @param experiment 实验
	 * @throws RuntimeException 若测试的数据有问题， 返回问题原因
	 */
	private void checkExperiment(Experiment experiment) throws RuntimeException{
		//判断实验数据的
		if(experiment==null){
			throw new RuntimeException("服务器无法获取您输入的数据,请重试！");
		}
		if(experiment.getExperimentCourseId()==null){
			throw new RuntimeException("服务器无法获取课程ID"); 
		}
		if(!StringUtils.isNotEmpty(experiment.getExperimentName())){
			throw new RuntimeException("请输入实验名称！");
		}
		if(!StringUtils.isNotEmpty(experiment.getExperimentPresentation())){
			throw new RuntimeException("请输入实验介绍！");
		}
		if(experiment.getLevel()==null){
			throw new RuntimeException("请选择实验等级！");
		}
		if(experiment.getExperimentType()==null){
			throw new RuntimeException("请选择实验类型！");
		}
		if(experiment.getAuthorId()==null){
			throw new RuntimeException("无法获取实验作者信息！");
		}
	}
	/**
	 * 根据实验ID查询实验信息-包括实验下的资源文件信息
	 * @param experimentId 实验ID
	 * @return
	 */
	public Experiment selectExperimentByExperimentId(Integer experimentId) {
		List<Experiment> experimentList = experimentMapper.selectExperimentByWhere(null, null, experimentId, 2,1,null);
		if(experimentList==null || experimentList.get(0) ==null){
			return null;
		}
		Experiment experiment = experimentList.get(0);
		//资源
		List<ResourceFile> fileList = experiment.getFileList();
		if(fileList!=null && !fileList.isEmpty()){
			//1.分离出实验指导书
			List<ResourceFile> instructors = experimentFileService.selectExperimentFileIdByExperimentIdAndType(experimentId,1);
			ResourceFile instructor= instructors.size()>0? instructors.get(0):null;
			//2.分离出实验标准答案
			List<ResourceFile> solutions = experimentFileService.selectExperimentFileIdByExperimentIdAndType(experimentId,5);
			
			ResourceFile solution = solutions.size()>0?solutions.get(0):null;
			if(instructor!=null){
				fileList.remove(instructor);
				experiment.setInstructor(instructor);
			}
			if(solution!=null){
				fileList.remove(solution);
				experiment.setSolution(solution);
			}
			//2.将各个实验资源按类型分类
			experiment.setFileMap(ResourceFileUtil.getTypeFile(fileList,FILE_PATH));
		}
		return experiment;
	}
	/**
	 * 根据实验课程ID 查询该实验课程下的设计实验信息
	 * @param experimentCourseId
	 * @return
	 */
	public List<Experiment> selectExperimentByExperimentCourseId(Integer experimentCourseId) {
		return experimentMapper.selectExperimentByExperimentCourseId(experimentCourseId);
	}
	/**
	 * 根据实验课程ID以及stealth 查询该实验课程下的设计实验信息
	 * @param experimentCourseId
	 *  @param stealth
	 * @return
	 */
	public List<Experiment> selectExperimentByExperimentCourseIdAndStealth(Integer experimentCourseId,Integer stealth,Integer identify) {
		return experimentMapper.selectExperimentByExperimentCourseIdAndStealth(experimentCourseId,stealth,identify);
	}
	
	/**
	 * 修改实验开放状态
	 * @param status
	 * @param experimentIds
	 */
	public void updateExperimentStatus(Integer status, Integer[] experimentIds) {
		experimentMapper.updateExperimentStatus(status,experimentIds,new Date());
	}
	
	
	
	/**
	 * 单表查询
	 * @param exprimentId
	 * @return
	 */
	public Experiment selectById(Integer exprimentId){
		return experimentMapper.selectByPrimaryKey(exprimentId);
	}
	
	
	/**
	 * 根据主键，修改不为null的字段
	 * @param record
	 * @return
	 */
	public void updateByPrimaryKeySelective(Experiment record){
		experimentMapper.updateByPrimaryKeySelective(record);
	}
	/**
	 * 跳转到添加实验页面
	 * 1.查询课程信息
	 * 2.生成实验资源存放路径
	 * @param menuParam
	 * @param teacherInfo
	 * @return
	 */
	public Map<String, Object> toAddExperimentPage(Integer menuParam, TeacherInfo teacherInfo) {
		Map<String,Object> map = new HashMap<String,Object>();
		if(teacherInfo == null){
			throw new RuntimeException("由于您长时间未操作,请登录后再进行操作");
		}
		List<ExperimentCourse> courseList = experimentCourseService.selectExperimentCoursesByMenuParam(menuParam, teacherInfo);
		/*if(CollectionUtils.isEmpty(courseList)){
			throw new RuntimeException("请先添加课程再添加实验");
		}*/
		//课程信息
		map.put("courseList", courseList);
		//路径  experiment/实验资源/teacherName/三个随机数/
		map.put("experimentFilePath", VS_EXPERIMENT+"/resource/"+teacherInfo.getName()+"/"+RandomUtils.nextInt(100,999));
		return map;
	}
	/**
	 * 查询实验信息 以及实验下的步骤、实验报告、实验标准答案
	 * @param experimentId
	 * @return
	 */
	public Map<String, Object> selectExperimentToEdit(Integer experimentId,Integer menuParam,TeacherInfo teacherInfo) {
		if(experimentId==null){
			throw new RuntimeException("【查询实验信息跳转到修改页面】实验Id为空");
		}
		//1.查询实验的基本信息--包括实验报告
		Experiment experiment = experimentMapper.selectByPrimaryKey(experimentId);
		if(experiment==null){
			throw new RuntimeException("【查询实验信息跳转到修改页面】无法查询到实验信息,实验id:"+experimentId);
		}
		//2.查询实验步骤信息 -- 排序
		List<ExperimentStep> experimentStepList =  experimentStepService.selectExperimentStepByExperimentId(experimentId);
		//3.查询实验评分标准--排序
		List<ExperimentStandard> ExperimentStandardList = experimentStandardService.selectByExprimentId(experimentId);
		//4.查询实验指导书和实验标准答案
		List<ResourceFile> instrutor = experimentFileService.selectFileByEperimentId(experimentId,"1");
		List<ResourceFile> answer = experimentFileService.selectFileByEperimentId(experimentId,"5");
		//5.根据权限查询课程
		List<ExperimentCourse> courseList = experimentCourseService.selectExperimentCoursesByMenuParam(menuParam, teacherInfo);
		//6.查询实验的所属课程信息
		ExperimentCourse experimentCourse = experimentCourseService.selectCourseByExperimentId(experimentId);
		
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("experiment", experiment);
		data.put("experimentStepList", experimentStepList);
		data.put("experimentStandardList", ExperimentStandardList);
		data.put("instrutor", instrutor);
		data.put("answer", answer);
		data.put("experiment", experiment);
		data.put("courseList", courseList);
		data.put("experimentCourse", experimentCourse);
		return data;
	}
	/**
	 * 生成 、更新实验的standardIdentify
	 * @param experimentId
	 * @return
	 */
	public String updateStandardIdentify(Integer experimentId) {
		Experiment experiment = this.selectById(experimentId);
		
		if(experiment!=null){
			if(StringUtil.isNotEmpty(experiment.getStandardIdentify())){
				return experiment.getStandardIdentify();
			}else{
				String standardIdentify = UUID.randomUUID().toString();
				experiment.setStandardIdentify(standardIdentify);
				this.update(experiment);
				return standardIdentify;
			}
		}else{
			throw new RuntimeException("【更新实验standardIdentify】 实验数据为空，id="+experimentId);
		}
	}
	
	
	
	/**
	 * 根据课程表Id, 查询课程下的设计实验信息
	 * @param experimentCourseId
	 * @return
	 */
	public List<Experiment> selectExperimentByScheduleId(Integer scheduleId) {
		return experimentMapper.selectExperimentByScheduleId(scheduleId);
	}
	
	public Experiment insertAndSelectExperimentAndStepByExperimentId(Integer experimentId) {
		 Experiment experiment = experimentMapper.selectExperimentAndStepByExperimentId(experimentId);
		if(experiment.getStandardIdentify()==null){
			experiment.setStandardIdentify(UUID.randomUUID().toString());
			experimentMapper.updateByPrimaryKeySelective(experiment);
		}
		return experiment;
	}
	
	//为实验加上评分标准
	
	public boolean updateExperimentStandard(String str){
		List<ExperimentStandard> experimentStandards = experimentStandardService.selectByStandardIdentify(str);
		for (ExperimentStandard experimentStandard : experimentStandards) {
			experimentStandard.setStandardId(null);
		}
		
		List<Experiment> experiments = experimentMapper.select(null);
		for (Experiment experiment : experiments) {
			if(experiment.getStandardIdentify()==null){
				synchronized(this){
					experiment.setStandardIdentify(UUID.randomUUID().toString());
					experimentMapper.updateByPrimaryKey(experiment);
					experimentStandardService.addStandards(experimentStandards, experiment.getStandardIdentify());	
				}
				
			}else{
				synchronized(this){
					List<ExperimentStandard> experimentStandardList = experimentStandardService.selectByStandardIdentify(experiment.getStandardIdentify());
					if(experimentStandardList==null || experimentStandardList.isEmpty() || experimentStandardList.size()==1){
						if(experimentStandardList.size()==1){
							experimentStandardService.delete(experimentStandardList.get(0).getStandardId());
						}
						experimentStandardService.addStandards(experimentStandards, experiment.getStandardIdentify());	
					}
				}
			}	
		}
		return true;
	}
	/**
	 * 统计实验总数
	 * @return
	 */
	public Integer selectExperimentCount() {
		Experiment ex = new Experiment();//实验表
		ex.setExperimentType(3);//类型是实物实验
		ex.setStealth(2);//显示
		Integer exCount = experimentMapper.selectCount(ex);
		return exCount;
	}

	/**
	 *  修改实验，判断实验名称、实验内容、难易程度、实验类型、作者ID不能为空
	 * @param experiment
	 * @param teacherInfo
	 * @param files
	 * @param req
	 * @throws RuntimeException
	 */
	public void newUpdateExperiment(Experiment experiment,TeacherInfo teacherInfo
			, HttpServletRequest req) throws RuntimeException{
		//编辑器图片的资源路径
		if(experiment.getExperimentInstructorBag()==null){
			throw new RuntimeException("【添加实验】无法获取实验资源存放路径！");
		}
		String value = String.valueOf(System.currentTimeMillis()+lock_due_time);
			for(int i=0;i<10;i++){
				if(redisLock.getLock(addExperimentLock, value)){
					//封装数据
					try {
					experiment.setStealth(2);
					experiment.setCreateTime(new Date());
					experiment.setUpdateTime(experiment.getCreateTime());
					//修改实验进数据库
					experimentMapper.updateByPrimaryKeySelective(experiment);
					//添加操作员信息
					TeacherLogInformation record = TeacherLogInformation.bildInfo(req, experiment.getAuthorId(),"修改了实验《"+experiment.getExperimentName()+"》", 5);
					teacherLogInformationMapper.insertSelective(record);
					} finally{
						//解锁
						redisLock.unLock(addExperimentLock, value);
					}
					break;
				}
				if(i>=9){
					throw new RuntimeException("【修改实验】 修改实验失败,原因:由于太多人操作了，请您稍后操作,experimentName:"+experiment.getExperimentName());
				}
			}
	}
	
	/**
	 * 查看所有实验
	 * @return
	 */
	public List<Experiment> selectExperimentList() {
		List<Experiment> experimentList  = experimentMapper.selectExperimentList();
		return experimentList;
	}
	
}
