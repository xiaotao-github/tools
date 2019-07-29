package com.vcooc.experiment.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.RedisLock;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.ExportExcelUtil;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.mapper.SubmitExperimentFileMapper;
import com.vcooc.util.DateUtils;
import com.vcooc.util.Html2WorldUtils;
import com.vcooc.util.convertor.SubmitExperimentFileToSubmitDTOConvertor;
@Service
public class SubmitExperimentFileService extends BaseService<SubmitExperimentFile>{
	@Autowired
	private SubmitExperimentFileMapper submitExperimentFileMapper;
	@Autowired
	private RedisLock redisLock; //Redis锁
	@PropertyConfig
	private String initializeStudentGradeLock;//初始化成绩锁
	@PropertyConfig
	private String exportExperimentReport;
	@PropertyConfig
	private Long lock_due_time;//锁过期时间
	@PropertyConfig
	private String FILE_PATH;
	@PropertyConfig
	private String VS_EXPERIMENT;
	
	/**
	 * 根据权限，查询学生成绩信息
	 * @param menuParam 权限 1.所有学生成绩  、2.院系学生成绩   、3.我的学生成绩
	 * @param teacherInfo
	 * @param iDisplayStart 查询的起始位置
	 * @param iDisplayLength 查询的总数
	 * @param sortCol 排序的字段
	 * @param  sortDir 排序的状态 倒叙还是正序
	 * @return
	 */
	public Map<String,Object> seleteStudentSubmitReportByMenuToList(Integer menuParam
			,TeacherInfo teacherInfo
			,Integer iDisplayStart
			,Integer iDisplayLength
			,String sSearch
			,String sortCol
			,String sortDir) {
		List<SubmitExperimentFile> submitExperimentFileList = new ArrayList<SubmitExperimentFile>();
		
		Integer size = 0;
		Integer teacherId = null;
		//TODO 根据教师名字搜索教师下的学生实验成绩 遇到分步骤查询问题，待解决
		/*if(StringUtil.isNotEmpty(sSearch)){
			teacherId = teacherInfoMapper.findTeacherIdByName(sSearch);
		}*/
		switch (menuParam) {
		case 1://所有成绩
			submitExperimentFileList = submitExperimentFileMapper.selectSubmitExperimentFileByWhereToList(null,teacherId,null,iDisplayStart,iDisplayLength,sSearch,sortCol,sortDir);
			size = submitExperimentFileMapper.selectSubmitExperimentFileSizeByWhere(null,teacherId,null,sSearch);
			break;
		case 2://院系成绩
			 submitExperimentFileList = submitExperimentFileMapper.selectSubmitExperimentFileByWhereToList(teacherInfo.getDepartment().getId(),teacherId,null,iDisplayStart,iDisplayLength,sSearch,sortCol,sortDir);
			 size = submitExperimentFileMapper.selectSubmitExperimentFileSizeByWhere(teacherInfo.getDepartment().getId(),teacherId,null,sSearch);
			 break;
		case 3:	//我的学生成绩
			 submitExperimentFileList = submitExperimentFileMapper.selectSubmitExperimentFileByWhereToList(null,teacherInfo.getId(),null,iDisplayStart,iDisplayLength,sSearch,sortCol,sortDir);
			 size = submitExperimentFileMapper.selectSubmitExperimentFileSizeByWhere(null,teacherInfo.getId(),null,sSearch);
			 break;
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("submitExperimentFileList", submitExperimentFileList);
		map.put("size", size);
		return map;
	}
	
	
	/**
	 * 根据权限，查询学生成绩信息
	 * @param menuParam 权限 1.所有学生成绩  、2.院系学生成绩   、3.我的学生成绩
	 * @param teacherInfo
	 * @return
	 */
	public List<SubmitExperimentFile> seleteStudentSubmitReportByMenu(Integer menuParam,TeacherInfo teacherInfo) {
		switch (menuParam) {
		case 1://所有成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(null,null,null);
		case 2://院系成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(teacherInfo.getDepartment().getId(),null,null);
		case 3:	//我的学生成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(null,teacherInfo.getId(),null);
		}
		return null;
	}
	
	/**
	 * 根据ID查询学生实验报告信息
	 * @param submitId
	 * @return 返回实验报告信息
	 */
	public SubmitExperimentFile seleteStudentSubmitReportById(Integer submitId) {
		return submitExperimentFileMapper.seleteStudentSubmitReportById(submitId);
	}
	/**
	 * 修改实验报告（批阅实验报告）
	 * @param submitExperimentFile
	 */
	public void updateSubmitReportById(SubmitExperimentFile submitExperimentFile,String ids) {
		/*if(!StringUtils.isNotEmpty(submitExperimentFile.getScore()+"")){
			throw new RuntimeException("请为学生打分"); 
		}*/
		if(!StringUtils.isNotEmpty(submitExperimentFile.getRemark()+"")){
			throw new RuntimeException("请为学生填写评语"); 
		}
		submitExperimentFile.setCheckTime(new Date());;
		submitExperimentFileMapper.updateByPrimaryKeySelective(submitExperimentFile);
		//批量批阅
		if(StringUtils.isNotEmpty(ids)){
			submitExperimentFileMapper.updateStudentSubmitReportByIds(ids,submitExperimentFile);
		}
	}
	/**
	 * 删除实验报告
	 * @param submitId
	 */
	public void deleteSubmitReportById(Integer submitId) {
		SubmitExperimentFile submitFile = submitExperimentFileMapper.seleteStudentSubmitReportById(submitId);
		if(StringUtils.isNotEmpty(submitFile.getGifFile())){
			FileOperateUtils.deleteFile(FILE_PATH+"/"+submitFile.getGifFile(), true);
		}
		if(StringUtils.isNotEmpty(submitFile.getProjectFile())){
			FileOperateUtils.deleteFile(FILE_PATH+"/"+submitFile.getProjectFile(), true);
		}
		if(StringUtils.isNotEmpty(submitFile.getOtherFile())){
			FileOperateUtils.deleteFile(FILE_PATH+"/"+submitFile.getOtherFile(), true);
		}
		submitExperimentFileMapper.deleteByPrimaryKey(submitId);
	}
	/**
	 * 根据教师权限查询 学生提交的，待批改的成绩
	 * @param teacherInfo
	 * @return
	 */
	public List<SubmitExperimentFile> seleteStudentSubmitReportByTeacherInfoPower(TeacherInfo teacherInfo) {
		if(teacherInfo.getPowers().get("查看学生实验成绩(所有)")!=null){//所有实验成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(null,null,2);
		}else if(teacherInfo.getPowers().get("查看学生实验成绩(院系)")!=null){//院系实验成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(teacherInfo.getDepartment().getId(),null,2);
		}else{ //我的学生实验成绩
			return submitExperimentFileMapper.selectSubmitExperimentFileByWhere(null,teacherInfo.getId(),2);
		}
	}
	
	/**
	 * 批量导出实验报告
	 * @param response
	 * @param idStr
	 */
	public void exportStudentSubmitExperimentFile(HttpServletResponse response, String idStr) {
		  //将字符串转id换为数组
    	 String[] ids =idStr.split(",");
    	 if(ids.length==0){
    		 throw new RuntimeException("获取成绩信息失败！");
    	 }
    	 //去重
    	 List<String> asList = Arrays.asList(ids);
    	 
    	 Set<String> set = new HashSet<String>();
    	 for (String temp : asList) {
			set.add(temp);
		}
    	 ids = set.toArray(new String[0]);
    	 
    	 Integer[] userIds = new Integer[ids.length];
   		 for (int i = 0; i <ids.length; i++)
   		 {
   			 userIds[i] = Integer.parseInt(ids[i]);
   		  }
    	// 设置excel表格头部
 		String[] headers = {"院系","专业","年级","班级","课程","指导老师","实验","小组","学生","学号","状态(分数)","提交时间","批改时间"};
    	 //学生章节成绩信息
    	 List<SubmitExperimentFile> list = submitExperimentFileMapper.selectsubmitExperimentFileByIds(userIds);
    	 //字符串集合
    	 List<String> perStr = new ArrayList<String>();
    	 for (int i = 0; i < list.size(); i++) {
			//将对象转换为数组
    		 String str=ObjToStr(list.get(i));
    		 //将字符串添加到集合中
    		 perStr.add(str);
    	 }
    	 ExportExcelUtil.exportExcel(response, headers, perStr,"学生实验成绩信息表");
	}
	 /**
     * 将学生项目成绩对象转换为字符串
     * @param per
     * @return
     */
    public String ObjToStr(SubmitExperimentFile per){
   	 //课程下的教师信息
    	String teacherName= "";
    	String submitStatus="";
    	if(per.getSubmitStatus()==1){
	    	  submitStatus ="进行中";   
	      }else if(per.getSubmitStatus()==2){
	    	  submitStatus = "待批改";
	      }else if(per.getSubmitStatus()==3){
	    	  submitStatus= "已完成";
	    	  if(per.getScore()!=null)submitStatus+="("+per.getScore()+")";
	      }else if(per.getSubmitStatus()==4){
	    	  submitStatus= "重做中";
	    	  if(per.getScore()!=null)submitStatus+="("+per.getScore()+")";
	      }
    	
    	if(per.getTeacherInfo()!=null){
    		teacherName=per.getTeacherInfo().getName();
    	}
		String str="";
		str += per.getStudentSubmitter()!=null?per.getStudentSubmitter().getDepartmentName()+",":"未知,";
		str += per.getStudentSubmitter()!=null?per.getStudentSubmitter().getMajorName()+",":"未知,";
		str += per.getStudentSubmitter()!=null?per.getStudentSubmitter().getGradeName()+",":"未知,";
		str += per.getStudentSubmitter()!=null?per.getStudentSubmitter().getClassName()+",":"未知,";
		str += per.getExperimentCourse()!=null?per.getExperimentCourse().getCourseName()+",":"未知,";
		str += teacherName!=""?teacherName+",":"未知,";
		str += per.getExperiment()!=null?per.getExperiment().getExperimentName()+",":"未知,";
		str += per.getExperimentGroup()!=null?per.getExperimentGroup().getGroupName()+",":"未知,";
		str += per.getStudentSubmitter().getName()!=null?per.getStudentSubmitter().getName()+",":"未知,";
		str += per.getStudentSubmitter().getUsername()!=null?per.getStudentSubmitter().getUsername()+",":"未知,";
		str += submitStatus!=""?submitStatus+",":"未知,";
		str += per.getUpdateTime() != null? new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(per.getUpdateTime())+",":"未知,";
		str += per.getCheckTime() != null? new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(per.getCheckTime()):"未知";
   	 return str;
    }
    
    /**
     *查询同一教师分配给同一门实验课下的同一实验下学生提交的实验报告
     * @return
     */
    public List<SubmitExperimentFile> selectExperimentFileByWhere(Integer teacherInfoId,Integer experimentId,Integer experimentCourseId){
    	return  submitExperimentFileMapper.seleteStudentSubmitReportByWhere(teacherInfoId, experimentId, experimentCourseId);
    }
    
    
    /**
     * 批量导出实验报告
     * @param ids
     * @throws Exception 
     */
    public  void exportStudentSubmitExperimentFileReport(HttpServletResponse response,HttpServletRequest request,Integer[] ids,TeacherInfo teacher) throws Exception{
    	//这里拿锁的时间
    	String value = String.valueOf(System.currentTimeMillis()+lock_due_time);
	    	for(int i=1;i<15;i++){
	    		if(redisLock.getLock(exportExperimentReport, value)){
	    			try{
	    				
		        		List<SubmitExperimentFile> list=	submitExperimentFileMapper.selectsubmitExperimentFileByIds(ids);
		            	List<Map<String, Object>> listMap = SubmitExperimentFileToSubmitDTOConvertor.toHtml(list);
		            	if(listMap!=null && listMap.size()>0){
		            		
		            		if(listMap.size()==1){
		            			Html2WorldUtils.html2WorldList(request, response,listMap.get(0));
		            		}else{
		            			Html2WorldUtils.html2WorldList(request, response, listMap,FILE_PATH+VS_EXPERIMENT+"/experiment_reports/"+teacher.getName(),"实验报告-"+DateUtils.getTimeStr());
		            		}
		            	}
		            	updateExportStatusByIds(ids,1);
		            	
	    			}finally{//解锁
	    	        	redisLock.unLock(exportExperimentReport, value);
	    	    	}
	            	break;
	        	}
	    		if(i>=14){
	    			throw new RuntimeException("导出实验报告的教师过多,请稍后重试");
	    		}
	    	}
    	
    }
    //初始化学生实验成绩单
    public void insertInitializeStudentGrade(Integer experimentCourseId
    		,Integer experimentId
    		,Integer experimentGroupId
    		,List<Integer> studentInfoIds){
    	String value = String.valueOf(System.currentTimeMillis()+lock_due_time);
	    	for(int i=0;i<10;i++){
	    		if(redisLock.getLock(initializeStudentGradeLock, value)){
	    			try{
		        		List<Integer> temp = new ArrayList<>(studentInfoIds);
		            	if(!CollectionUtils.isEmpty(temp) && experimentCourseId!=null && experimentId!=null ){
		            		List<Integer> temp2 = new ArrayList<>(studentInfoIds);
		            		//拿到旧的数据 
		            		List<Integer> oldStudentInfoIds =  submitExperimentFileMapper.getOldStudentGradeId(experimentCourseId,experimentId,experimentGroupId);
		            		//取得交集
		            		/*oldStudentInfoIds.retainAll(temp);
		        			if(!CollectionUtils.isEmpty(oldStudentInfoIds)){
		        				submitExperimentFileMapper.updateStudentGrade(experimentCourseId,experimentId,experimentGroupId,oldStudentInfoIds);
		        			}*/
		            		temp.removeAll(oldStudentInfoIds);//删除交集数据
		        			if(!CollectionUtils.isEmpty(temp)){//插入
		            			submitExperimentFileMapper.initializeStudentGrade(experimentCourseId,experimentId,experimentGroupId,temp);
		            		}
		        			//删除没用的学生数据
		        			oldStudentInfoIds.removeAll(temp2);
		        			if(!CollectionUtils.isEmpty(oldStudentInfoIds)){//插入
		        				submitExperimentFileMapper.updateStudentGrade(experimentCourseId, experimentId, null, oldStudentInfoIds);
		            		}
		            	}
		            	break;
	    			}finally{
	    	        	redisLock.unLock(initializeStudentGradeLock, value);
	    	    	}
	            	
	        	}
	    		if(i>=9){
	        		throw new RuntimeException("对不起,成绩初始化失败,请稍后再试一下");
	    		}
	    	}
    }
    /**
     * 批量修改转换状态
     * @param ids
     * @param status
     */
    public void updateExportStatusByIds(Integer[] ids,Integer status){
    	submitExperimentFileMapper.updateExportStatusByIds(ids, status);
    }
    
}
