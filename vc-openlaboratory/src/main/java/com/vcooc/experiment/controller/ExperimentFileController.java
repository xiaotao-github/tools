package com.vcooc.experiment.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentFile;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.ResourceLibrary;
import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.ExperimentFileService;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ResourceFileService;
import com.vcooc.experiment.service.ResourceLibraryService;
import com.vcooc.experiment.service.TeacherLogInformationService;
import com.vcooc.experiment.service.web.StudentHomeService;

@Controller
@RequestMapping("experimentFileController")
public class ExperimentFileController {
	@Autowired
	private ExperimentFileService experimentFileService;
	@Autowired
	private ExperimentService experimentService;
	@Autowired
	private RedisSessionService redisSessionService;
	@Autowired
	private ResourceFileService resourceFileService;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	@Autowired
	private ResourceLibraryService resourceLibraryService;
	@Autowired
	private StudentHomeService studentHomeService;
	/**
	 * 1.查询已存在的资源文件信息
	 * 2.查询我上传的资源文件信息
	 * 3.查询我收藏的资源文件信息
	 * @param experimentId
	 * @param vcoocUserId
	 * @param model
	 * @return
	 */
	@RequestMapping("selectFileToDistribute/{experimentId}/{vcoocUserId}")
	public ModelAndView selectFileToDistribute(
			@PathVariable("experimentId") Integer experimentId,
			@PathVariable("vcoocUserId")String vcoocUserId,
			ModelAndView model){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			model.addObject("msg", "由于您长时间未操作，请登录后操作");
			model.setViewName("error");
			return model;
		}
		//实验信息
		Experiment experiment = experimentService.queryById(experimentId);
		//查询已经在该实验下的资源文件信息
		List<ResourceFile> hasFileList = experimentFileService.selectExperimentFileByExperimentFileId(experimentId);
		//根据实验ID，查询实验指导书ID
		Integer instructorId = experimentFileService.seletInstructorIdByExperimentFileId(experimentId);
		//查询用户上传的资源文件信息，根据传入的资源文件进行筛选
		List<ResourceFile> myFileList = experimentFileService.selectFilesByAuthorIdAndFiltByInputFiles(teacherInfo.getId(),hasFileList,experiment.getExperimentName());
		//查询用户收藏的资源文件信息，根据传入的资源文件进行筛选.（根据教师id 获取教师收藏的）
		//List<ResourceFile> collectedFileList = experimentFileService.selectCollectFilesByAuthorIdAndFiltByInputFiles(teacherInfo.getId(),hasFileList,experiment.getExperimentName());
		//获取校内开放的资源
		List<ResourceFile> collectedFileList = experimentFileService.selectCollectFilesByOpenFiles(2,3);
		if(teacherInfo.getDepartment()!=null && teacherInfo.getDepartment().getId()!=null ){
			List<ResourceLibrary> resourceLibraries = resourceLibraryService.selectResourceLibrariesByDepartmentId(teacherInfo.getDepartment().getId());
			model.addObject("resourceLibraries", resourceLibraries);
		}
		String ids="";
		for(ResourceFile rf:hasFileList){
			ids+=rf.getFileId()+",";
		}
		if(ids != "") ids=ids.substring(0, ids.length()-1);
		//封装数据
		model.addObject("experiment", experiment);
		model.addObject("hasFileList", hasFileList);
		model.addObject("myFileList", myFileList);
		model.addObject("ids", ids);
		model.addObject("collectedFileList", collectedFileList);
		model.addObject("instructorId", instructorId);
		/*if(1==experiment.getExperimentType() || 3==experiment.getExperimentType()){
			model.setViewName("admin/experiment_manage/experiment_edit_resources");
		}else{
			model.setViewName("admin/experiment_manage/visit_experiment_add_file");
		}*/
		//强制为实物实验类型
		if(3==experiment.getExperimentType()){
			model.setViewName("admin/experiment_manage/experiment_edit_resources");
		}else{
			model.addObject("msg", "错误类型，请联系管理员解决!");
			model.setViewName("error");
		}
		return model;
	}
	/**
	 * 分配资源，将资源分配给实验
	 * 1.将原先实验下的资源删除
	 * 2.将新的资源分配到实验中
	 * @param experimentId
	 * @param resourceFileIds
	 * @return
	 */
	@RequestMapping("distributeFilesToExperiment/{vcoocUserId}/{experimentId}")
	public String distributeFilesToExperiment(@PathVariable String vcoocUserId,
			@PathVariable Integer experimentId,
			Integer[] resourceFileIds,
			Integer instructorId,
			ResourceFile resourceFile,
			@RequestParam(value="otherFiles",required=false)MultipartFile[] otherFiles,
			@RequestParam(value="instructorFiles",required=false)MultipartFile[] instructorFiles,
			@RequestParam(value="standardAnswer",required=false)MultipartFile[] standardAnswer,
			RedirectAttributes attr,
			HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			attr.addFlashAttribute("msg", "由于您长时间未操作，请登录后操作");
			attr.addFlashAttribute("status", 203);
			return "error";
		}
		//资源文件数组
		List<Integer> fileIds = new ArrayList<Integer>();
		Experiment experiment = experimentService.queryById(experimentId);
		try {
			//资源附件
			//添加资源附件,得到附件资源文件ID
			if(otherFiles.length>0){
				//资源信息
				resourceFile.setAuthorId(teacherInfo.getId());
				List<Integer> resourceFileIdList = resourceFileService.addFile(otherFiles,resourceFile,teacherInfo,experiment.getExperimentName());
				if(resourceFileIdList!=null &&!resourceFileIdList.isEmpty()){
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,0);
					fileIds.addAll(resourceFileIdList);
				}
			}
			if(standardAnswer.length>0){
				//实验标准答案
				resourceFile.setAuthorId(teacherInfo.getId());
				List<Integer> resourceFileIdList = resourceFileService.addFile(standardAnswer,resourceFile,teacherInfo,experiment.getExperimentName());
				if(resourceFileIdList!=null &&!resourceFileIdList.isEmpty()){
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,5);
					fileIds.addAll(resourceFileIdList);
				}
			}
			//实验指导书
			if(instructorFiles.length>0){
				if(instructorFiles[0].getSize()>0){
					if(instructorId!=null){
						attr.addFlashAttribute("msg", "上传失败,请先取消原先的实验指导书，再上传新的实验指导书");
						attr.addFlashAttribute("status","202");
						return "redirect:/experimentFileController/selectFileToDistribute/"+experimentId+"/"+vcoocUserId;
					}
					//上传资源文件，封装资源文件路径
					String fileAllName = instructorFiles[0].getOriginalFilename();//原始文件名
					String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".")+1);//文件后缀名
					if(!("doc".equals(extFileName) || "docx".equals(extFileName))){
						throw new RuntimeException("实验指导书上传失败,实验指导书只能是doc、docx格式");
					}
					//添加实验指导书
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> instructorFileIdList = resourceFileService.addFile(instructorFiles,resourceFile, teacherInfo,experiment.getExperimentName());
					if(instructorFileIdList!=null&&!instructorFileIdList.isEmpty()){
						experimentFileService.addFilesToExperiment(experimentId,instructorFileIdList,1);
						fileIds.addAll(instructorFileIdList);
					}
				}
			}
			fileIds.addAll(Arrays.asList(resourceFileIds));
			//分配实验资源附件
			experimentFileService.distributeFilesToExperiment(experimentId,fileIds,0);
			//日志：
			TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, teacherInfo.getId(), "为设计实验《"+experiment.getExperimentName()+"》分配了资源", 5);
			teacherLogInformationService.saveSelective(teacherLogInformation);
		} catch (Exception e) {
			e.printStackTrace();
			attr.addFlashAttribute("msg", e.getMessage());
			attr.addFlashAttribute("status", 202);
			return "redirect:/experimentFileController/selectFileToDistribute/"+experimentId+"/"+vcoocUserId;
		}
		attr.addFlashAttribute("msg", "分配成功");
		attr.addFlashAttribute("status","200");
		return "redirect:/experimentFileController/selectFileToDistribute/"+experimentId+"/"+vcoocUserId;
	}
	/**
	 * 设置实验指导书：
	 * 1.判断原先是否有实验指导书
	 * 	有，去除掉
	 * 	无，添加实验指导书
	 * @param experimentId
	 * @param fileId
	 * @param type 改变的状态
	 * @return
	 */
	@RequestMapping("setInstructorToExperiment/{experimentId}/{type}")
	@ResponseBody
	public SysResult setInstructorToExperiment(@PathVariable Integer experimentId ,@PathVariable Integer type,Integer fileId){
		try {
			experimentFileService.updateInstructorToExperiment(experimentId,type,fileId);
			return SysResult.ok();
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());
		}
	}
	/**
	 * 修改实验文件类型
	 * @param experimentId
	 * @param fileId
	 * @param fileType
	 * @return
	 */
	@RequestMapping("updateExperimentFileType/{experimentId}")
	@ResponseBody
	public SysResult updateExperimentFileType(@PathVariable Integer experimentId,Integer fileId,Integer fileType){
		try {
			ExperimentFile experimentFile = new ExperimentFile();
			experimentFile.setExperimentId(experimentId);
			experimentFile.setResourceFileId(fileId);
			experimentFile.setIsInstructor(fileType);
			experimentFileService.updateExperimentFileType(experimentFile);
			return SysResult.ok();
		} catch (RuntimeException e) {
			e.printStackTrace();
			return SysResult.build(202,e.getMessage());
		}
	}
	
	/**
	 * 添加实验指导书、实验标准答案
	 */
	@RequestMapping("setExperimentAnswerAndInstrutor/{experimentId}/{menuParam}")
	public ModelAndView setExperimentAnswerAndInstrutor(@PathVariable("experimentId") Integer experimentId
			,@PathVariable("menuParam") Integer menuParam
			,MultipartFile instructorFile
			,MultipartFile answerFile){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new TeacherInfo());
		
		if(instructorFile.getSize()==0 && answerFile.getSize()==0){
			throw new RuntimeException("【设置修改实验指导书和标准答案】资源数据错误，experimentId="+experimentId);
		}
		experimentFileService.setExperimentAnswerAndInstrutor(teacherInfo,experimentId,instructorFile,answerFile);
		return new ModelAndView("forward:/experimentController/selectExperimentToEditPage/"+experimentId+"/"+menuParam+"?status=200");
	}
	
	
	
	
	
	/**
	 * 分配资源，将资源分配给参考实验
	 * 1.将原先实验下的资源删除
	 * 2.将新的资源分配到实验中
	 * @param experimentId
	 * @param resourceFileIds
	 * @return
	 */
	@RequestMapping("distributeFilesToVisitExperiment/{vcoocUserId}/{experimentId}")
	public String distributeFilesToVisitExperiment(@PathVariable String vcoocUserId,@PathVariable Integer experimentId,
			@RequestParam(value="resourceFileIds",required=false)String resourceFileIds,
			ResourceFile resourceFile,
			@RequestParam(value="otherFiles",required=false)MultipartFile[] otherFiles,
			@RequestParam(value="instructorFiles",required=false)MultipartFile[] instructorFiles,
			@RequestParam(value="gifFiles") MultipartFile[] gifFiles,
			@RequestParam(value="projetFiles") MultipartFile[] projetFiles,
			@RequestParam(value="experimentReport") MultipartFile[] experimentReport,
			@RequestParam(value="standardAnswer") MultipartFile[] standardAnswer,
			RedirectAttributes attr,
			HttpServletRequest req){
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			attr.addFlashAttribute("msg", "由于您长时间未操作，请登录后操作");
			attr.addFlashAttribute("status", 203);
			return "redirect:/page/error";
		}
		Experiment experiment = experimentService.queryById(experimentId);
		//日志：
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, teacherInfo.getId(), "为参考实验《"+experiment.getExperimentName()+"》分配了资源", 5);
		teacherLogInformationService.saveSelective(teacherLogInformation);
		
		//资源文件数组
		List<Integer> fileIds = new ArrayList<Integer>();
		try {
			//添加资源附件,得到附件资源文件ID
			if(otherFiles.length>0){
				if(otherFiles[0].getSize()>0){
					//实验信息
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(otherFiles,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,0);
				}
			}
			System.out.println("++++++++++++."+instructorFiles.length);

			//添加实验指导书
			if(instructorFiles.length>0){
				if(instructorFiles[0].getSize()>0){
					//实验信息
				System.out.println("---------------."+instructorFiles.length);
					String fileAllName = instructorFiles[0].getOriginalFilename();//原始文件名
					String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".")+1);//文件后缀名
					if(!("doc".equals(extFileName) || "docx".equals(extFileName))){
						throw new RuntimeException("设置失败,实验指导书只能是doc、docx格式");
					}
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(instructorFiles,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,1);
				}
			}
			//添加GIF动态图
			if(gifFiles.length>0){
				if(gifFiles[0].getSize()>0){
					String fileAllName = gifFiles[0].getOriginalFilename();//原始文件名
					String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".")+1);//文件后缀名
					if((!"gif".equals(extFileName))){
						throw new RuntimeException("设置失败,GIF动态图只能是gif格式");
					}
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(gifFiles,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,2);
				}
			}
			//添加实验工程文件
			if(projetFiles.length>0){
				if(projetFiles[0].getSize()>0){
					//实验信息
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(projetFiles,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,3);
				}
			}
			//添加实验实验报告文件
			if(experimentReport.length>0){
				if(experimentReport[0].getSize()>0){
					//实验信息
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(experimentReport,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,4);
				}
			}
			//添加标准答案
			if(standardAnswer.length>0){
				if(standardAnswer[0].getSize()>0){
					//实验信息
					resourceFile.setAuthorId(teacherInfo.getId());
					List<Integer> resourceFileIdList = resourceFileService.addFile(standardAnswer,resourceFile,teacherInfo,experiment.getExperimentName());
					fileIds.addAll(resourceFileIdList);
					experimentFileService.addFilesToExperiment(experimentId,resourceFileIdList,5);
				}
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
			attr.addFlashAttribute("msg", e.getMessage());
			attr.addFlashAttribute("status", 202);
			return "redirect:/experimentFileController/selectFileToDistribute/"+experimentId+"/"+vcoocUserId;
		}
		//分配实验资源附件
		if(StringUtils.isNotEmpty(resourceFileIds)){
			String ids[] = resourceFileIds.split(",");
			Integer[] resourceId = new Integer[ids.length];
			for(int i=0; i<ids.length; i++){
				resourceId[i] = Integer.parseInt(ids[i]);
			}
			fileIds.addAll(Arrays.asList(resourceId));
		}
		experimentFileService.distributeFilesToExperiment(experimentId,fileIds,0);
		attr.addFlashAttribute("msg", "分配成功");
		attr.addFlashAttribute("status","200");
		return "redirect:/experimentFileController/selectFileToDistribute/"+experimentId+"/"+vcoocUserId;
	}
	
	
	/**
	 * 判断文件是否存在
	 * 
	 * @param fileId
	 * @return
	 */
	@RequestMapping("fileExistsById/{fileId}")
	@ResponseBody
	public SysResult fileExistsById(@PathVariable Integer fileId) {
		if (studentHomeService.fileExistsById(fileId)) {
			return SysResult.ok();
		} else {
			return SysResult.build(202, "该资源文件不存在,请联系管理员解决");
		}
	}
	
	/**
	 * 下载文件
	 * 
	 * @param request
	 * @param response
	 * @param fileId
	 * @return
	 */
	@RequestMapping("downLoad")
	public SysResult downLoad(HttpServletRequest request, HttpServletResponse response, Integer fileId) {
		studentHomeService.downLoadFile(request, response, fileId);
		return SysResult.ok();
	}
	
	
	/**
	 * 删除文件
	 * 
	 * @param request
	 * @param response
	 * @param fileId
	 * @return
	 */
	@RequestMapping("DelectResources/{id}")
	@ResponseBody
	public SysResult DelectResources(@CookieValue(required = false) String vcoocUserId,@PathVariable("id")Integer fileId,HttpServletRequest req) {
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		resourceFileService.delectFile(fileId,req,teacherInfo);
		return SysResult.ok();
	}
	
	/**
	 * 删除已经勾选资源文件
	 * 
	 * @param request
	 * @param response
	 * @param fileId
	 * @return
	 */
	@RequestMapping("delectExperimentResources/{id}/{experimentId}")
	@ResponseBody
	public SysResult delectExperimentResources(@CookieValue(required = false) String vcoocUserId,@PathVariable("id")Integer fileId,@PathVariable("experimentId")Integer experimentId,HttpServletRequest req) {
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		experimentFileService.delectExperimentResources(fileId,experimentId,req,teacherInfo);
		return SysResult.ok();
	}
	
}
