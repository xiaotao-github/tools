/*package com.vcooc.experiment.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.dto.SubmitDTO;
import com.vcooc.experiment.service.StudentExperimentSocreService;
import com.vcooc.experiment.service.SubmitExperimentFileService;
import com.vcooc.experiment.service.TeacherRemarkService;
import com.vcooc.experiment.service.web.ExperimentLogWebService;
import com.vcooc.util.Html2WorldUtils;
import com.vcooc.util.convertor.SubmitExperimentFileDataTableUtils;
import com.vcooc.util.convertor.SubmitExperimentFileToSubmitDTOConvertor;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("submitExperimentFileController")
public class SubmitExperimentFileController {
	@Autowired
	private SubmitExperimentFileService submitExperimentFileService;
	@Autowired
	private StudentExperimentSocreService studentExperimentSocreService;
	@Autowired
	private RedisSessionService redisSessionService;
    @Autowired
    private TeacherRemarkService teacherRemarkService;
    @Autowired
    private ExperimentLogWebService experimentLogWebService;
    
	@RequestMapping("seleteStudentSubmitReportByMenu/{menuParam}")
	@ResponseBody
	public String seleteStudentSubmitReportByMenu(
			@PathVariable("menuParam")Integer menuParam,
			@RequestParam(value="aoData") String aoData,
			HttpServletRequest request){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		//获取分页的数据
		String sEcho = null;
	    int iDisplayStart = 0; // 起始索引
	    int iDisplayLength = 0; // 每页显示的行数
	    String sSearch = null;//查询条件
	    Integer sortCol = null;//排序列表
	    String sortDir = "asc";
		JSONArray jsonarray = JSONArray.fromObject(aoData);
		
	    for (int i = 0; i < jsonarray.size(); i++) {
	        JSONObject obj = (JSONObject) jsonarray.get(i);
	        if (obj.get("name").equals("sEcho"))
	            sEcho = obj.get("value").toString();
	 
	        if (obj.get("name").equals("iDisplayStart"))
	            iDisplayStart = obj.getInt("value");
	 
	        if (obj.get("name").equals("iDisplayLength"))
	            iDisplayLength = obj.getInt("value");
	        
	        if (obj.get("name").equals("sSearch"))
	        	sSearch = obj.get("value").toString();
	        
	        if (obj.get("name").equals("iSortCol_0"))
	        	sortCol = obj.getInt("value");
	        
	        if (obj.get("name").equals("sSortDir_0"))
	        	sortDir = obj.get("value").toString();
	    }
	    //数据转换 -- 待批改 
	    
		//获取数据
 		Map<String,Object> map =  submitExperimentFileService.seleteStudentSubmitReportByMenuToList(menuParam,teacherInfo,iDisplayStart,iDisplayLength,sSearch,SubmitExperimentFileDataTableUtils.getSortCol(sortCol),sortDir);
 		Integer size = Integer.valueOf(map.get("size")+"");
 		List<SubmitExperimentFile> submitExperimentFiles = (List<SubmitExperimentFile>) map.get("submitExperimentFileList");
 		List<SubmitDTO> submitDTOList = SubmitExperimentFileToSubmitDTOConvertor.convertor(submitExperimentFiles,teacherInfo.getPowers(),menuParam,request);
	    //获取实际行数
 		JSONObject getObj = new JSONObject();
	   getObj.put("sEcho", sEcho);// 不知道这个值有什么用,有知道的请告知一下
	   getObj.put("iTotalRecords", size);//实际的行数
	   getObj.put("iTotalDisplayRecords", size);//显示的行数,这个要和上面写的一样
	   getObj.put("aaData", submitDTOList);//要以JSON格式返回
		return getObj.toString();
	}
	
	
	*//**
	 * 根据ID查询学生提交的实验报告，跳转到实验报告批阅页面
	 * @param submitId
	 * @param model
	 * @return
	 *//*
	@RequestMapping("selectStudentSubmitReportById/{submitId}")
	public ModelAndView selectStudentSubmitReportById(@CookieValue(required=false) String vcoocUserId,@PathVariable("submitId") Integer submitId,ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo());
		if(teacherInfo==null){
			model.addObject("msg", "由于您长时间未操作，请登录后操作");
			model.setViewName("error");
			return model;
		}
		SubmitExperimentFile sub=submitExperimentFileService.seleteStudentSubmitReportById(submitId);
		if(sub!=null && sub.getExperiment()!=null && sub.getExperiment().getStandardIdentify()!=null){
			List<ExperimentStandard> experimentStandards = studentExperimentSocreService.selectExperimentStandardStudentscoreByWhere(Long.valueOf(submitId), sub.getExperiment().getStandardIdentify(),1);
			model.addObject("experimentStandards",experimentStandards);
		}
		model.addObject("submitExperimentFile",sub);
		//该实验分配给班级下的学生信息
		try{
			model.addObject("otherSubmits", submitExperimentFileService.selectExperimentFileByWhere(sub.getExperimentGroup().getTeacherInfoId(), sub.getExperimentId(), sub.getExperimentGroup().getExperimentCourseId()));
		}catch(Exception e){
			
		}
		//实验日志信息
		model.addObject("experimentLog", experimentLogWebService.selectExperimentLog(Long.valueOf(sub.getSubmitExperimentFileId()),2));
		//教师评语
		model.addObject("remarks", teacherRemarkService.selectRemark(teacherInfo.getId(), 1));
		//该实验分配给班级下的学生信息
		model.setViewName("admin/submit_experiment_file_manage/submit_experiment_preview");
		return model;
	}
	
	*//**
	 * 修改学生实验报告（批阅）
	 * @param submitExperimentFile
	 * @return
	 *//*
	@RequestMapping("updateSubmitReportById")
	@ResponseBody
	public SysResult updateSubmitReportById(SubmitExperimentFile submitExperimentFile,
			String ids,
			String studentScore,String standardId){
		try {
			if(StringUtils.isNotEmpty(ids)){
				ids = ids+","+submitExperimentFile.getSubmitExperimentFileId();
			}else{
				ids = String.valueOf(submitExperimentFile.getSubmitExperimentFileId());
			}
			Double sum = studentExperimentSocreService.insertStudentScore(studentScore,standardId,ids,1);
			submitExperimentFile.setScore(sum);
			submitExperimentFileService.updateSubmitReportById(submitExperimentFile,ids);
			return SysResult.ok();
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202,e.getMessage());
		}
	}
	@RequestMapping("deleteSubmitReportById/{submitId}")
	@ResponseBody
	public SysResult deleteSubmitReportById(@PathVariable("submitId") Integer submitId){
		try {
			submitExperimentFileService.deleteSubmitReportById(submitId);
			return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202,e.getMessage());
		}
	}
	
	*//**
	 * 导出学生实验报告？
	 * @param idStr
	 * @param response
	 * @return
	 *//*
	@RequestMapping("exportStudentSubmitExperimentFile")
	@ResponseBody
	public SysResult exportStudentSubmitExperimentFile(String idStr,HttpServletResponse  response){
	  	  if(!StringUtils.isNotEmpty(idStr)){
			  return SysResult.build(202, "获取信息失败，请重新操作!");
		  }
	  	  try {
	  		  submitExperimentFileService.exportStudentSubmitExperimentFile(response,idStr);
	  		  return SysResult.ok();
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	}
	
	*//**
	 * 批量导出实验报告
	 * @param idStr
	 * @param response
	 * @return
	 *//*
	@RequestMapping("exportStudentSubmitExperimentFileReport")
	@ResponseBody
	public SysResult exportStudentSubmitExperimentFileReport(@CookieValue(required=false) String vcoocUserId,Integer[] idStr,HttpServletResponse  response,HttpServletRequest request){
	  	
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId); 
		if(teacherInfo==null){
			  return SysResult.build(202, "由于您长时间未操作，请登录后操作");
		}
		
		if(idStr.length<=0){
			  return SysResult.build(202, "获取学生id失败，请重新操作");
		  }
	  	  try {
	  		  submitExperimentFileService.exportStudentSubmitExperimentFileReport(response,request,idStr,teacherInfo);
	  		  return SysResult.ok();
		} catch (Exception e) {
			e.printStackTrace();
			return SysResult.build(202, "导出失败："+e.getMessage());
		}
	}
	
	
	
	
	*//**
	 * 生成实验报告文档
	 * @param report 实验报告
	 * @param fileName 文件名称
	 * @param submitId 提交id
	 * @param exportType 导出类型  0.文档格式  1.pdf格式
	 * @param request 
	 * @param response
	 * @return
	 *//*
	@RequestMapping("report2World")
	@ResponseBody
	public SysResult report2World(String report,String fileName,Integer submitId,HttpServletRequest request,HttpServletResponse response){
		if(!StringUtils.isNotEmpty(report)){
			return SysResult.build(202,"参数错误");
		}
		try {
			Html2WorldUtils.html2World(request, response, report, fileName);
			if(submitId!=null){
				SubmitExperimentFile submitExperimentFile = new SubmitExperimentFile();
				submitExperimentFile.setSubmitExperimentFileId(submitId);
				submitExperimentFile.setOtherFile("1");
				submitExperimentFileService.updateSelective(submitExperimentFile);
			}
			return SysResult.ok();
		} catch (IOException e) {
			e.printStackTrace();
			return SysResult.build(202, "转换失败");
		}
	}
	*//**
	 * 生成实验报告PDF
	 * @param report 实验报告
	 * @param fileName 文件名称
	 * @param submitId 提交id
	 * @param exportType 导出类型  0.文档格式  1.pdf格式
	 * @param request 
	 * @param response
	 * @return
	 *//*
	@RequestMapping("report2PDF/{submitId}")
	public ModelAndView report2PDF(@PathVariable("submitId")Integer submitId,HttpServletResponse response,Map<String,Object> map){
		SubmitExperimentFile sub=submitExperimentFileService.seleteStudentSubmitReportById(submitId);
		map.put("submitExperimentFile",sub);
		if(sub!=null && sub.getExperiment()!=null && sub.getExperiment().getStandardIdentify()!=null){
			List<ExperimentStandard> experimentStandards = studentExperimentSocreService.selectExperimentStandardStudentscoreByWhere(Long.valueOf(submitId), sub.getExperiment().getStandardIdentify(),1);
			map.put("experimentStandards",experimentStandards);
		}
		return new ModelAndView("admin/submit_experiment_file_manage/submit_preview",map);
	}
}
*/