package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentFile;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.enums.ExperimentFileTypeEnum;
import com.vcooc.experiment.mapper.ExperimentFileMapper;
import com.vcooc.experiment.mapper.ExperimentMapper;
import com.vcooc.experiment.mapper.ResourceFileMapper;

@Service
public class ExperimentFileService  extends BaseService<ExperimentFile>{
	@Autowired
	private ExperimentFileMapper experimentFileMapper;
	@Autowired
	private ResourceFileService resourceFileService;
	@Autowired
	private ExperimentMapper experimentMapper;
	@Autowired
	private ResourceFileMapper resourceFileMapper;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;

	
	
	/**
	 * 根据实验ID，查询实验下的资源文件信息
	 * @param experimentId
	 * @return
	 */
	public List<ResourceFile> selectExperimentFileByExperimentFileId(Integer experimentId) {
		List<ResourceFile> resourceFileList = experimentFileMapper.selectExperimentFileByExperimentFileId(experimentId);
		return resourceFileList;
	}
	/**
	 * 1.根据传入的用户ID，查询该用户上传的资源文件信息
	 * 2.根据hasFileList筛选出已经分配给
	 * @param authorId 作者ID 
	 * @param hasFileList 资源文件信息
	 */
	public List<ResourceFile> selectFilesByAuthorIdAndFiltByInputFiles(Integer authorId, List<ResourceFile> hasFileList,String experimentName) {
		//添加新条件，library不为-1
		//List<ResourceFile> myFileList = resourceFileMapper.selectFilesByAuthorId(authorId, 2);
		PageData pd = new PageData();
		pd.put("authorId", authorId);
		pd.put("stealth", 2);
		StringBuffer mysql=new StringBuffer(" rf.stealth = 2 AND (rf.library_id !='-1' or rf.library_id is null ) "); 
		if(StringUtils.isNotEmpty(experimentName)) {
			mysql.append("order by rf.file_name LIKE '%"+experimentName+"%' or rf.file_tag LIKE '%"+experimentName+"%' or rf.file_title LIKE '%"+experimentName+"%' desc");
		}
		
		pd.put("keyword", mysql);
		List<ResourceFile> myFileList = resourceFileService.selectFilesByAuthorIds(pd);
		if(hasFileList!=null && hasFileList.size()>0){
			for (ResourceFile resourceFile : myFileList) {
				for (ResourceFile temp : hasFileList) {
					if(temp.getFileId()!=null &&temp.getFileId().equals(resourceFile.getFileId())){
						resourceFile.setIsSelected(1);
						resourceFile.setIsInstructor(temp.getIsInstructor());
						continue;
					}
				}
			}
		}
		return  myFileList;
	}
	/**
	 * 
	 * @param teacherInfoId 教师ID
	 * @param hasFileList 
	 * @return
	 */
	public List<ResourceFile> selectCollectFilesByAuthorIdAndFiltByInputFiles(Integer teacherInfoId,
			List<ResourceFile> hasFileList,String experimentName) {
		List<ResourceFile> myCollectedFileList =  resourceFileService.selectCollectionFilesByAuthorId(teacherInfoId, 2,experimentName);
		if(hasFileList!=null && hasFileList.size()>0){
			for (ResourceFile resourceFile : myCollectedFileList) {
				if(hasFileList.contains(resourceFile)){
					for (ResourceFile temp : hasFileList) {
						if(temp.getFileId()!=null && temp.getFileId().equals(resourceFile.getFileId())){
							resourceFile.setIsSelected(1);;
							resourceFile.setIsInstructor(temp.getIsInstructor());
						}
					}
				}
			}
		}
		return  myCollectedFileList;
	}
	/**
	 * 根据实验ID，查询实验指导书资源文件ID
	 * @param experimentId
	 * @return
	 */
	public Integer seletInstructorIdByExperimentFileId(Integer experimentId) {
		ExperimentFile record = new ExperimentFile();
		record.setExperimentId(experimentId);
		record.setIsInstructor(1);
		List<ExperimentFile> experimentFileList = experimentFileMapper.select(record);
		if(!experimentFileList.isEmpty()){
			return experimentFileList.get(0).getResourceFileId();
		}
		return null;
	}
	/**
	 * 实验分配资源：
	 * 1.将实验下原来的资源删除
	 * 2.将新的资源分配给实验
	 * @param experimentId
	 * @param resourceFileIds
	 * @param fileType 文件类型  1.是实验指导书   2.不是实验指导书
	 */
	public void distributeFilesToExperiment(Integer experimentId, List<Integer> resourceFileIds,Integer fileType) {
		if(resourceFileIds!=null && resourceFileIds.size()>0){
			//删除旧文件,原先存在的不删除
			experimentFileMapper.deleteOldFile(experimentId,resourceFileIds);
			//2.删除集合中旧的资源文件id
			List<Integer> oldFileIds = experimentFileMapper.selectOldFileId(experimentId);
			if(!oldFileIds.containsAll(resourceFileIds)){
				List<Integer> temp = new ArrayList<Integer>();
				temp.addAll(resourceFileIds);
				temp.removeAll(oldFileIds);
				//2.将新的资源添加进实验中，已经存在的不需要添加
				if(temp!=null && temp.size()>0){
 					experimentFileMapper.distributeFilesToExperiment(experimentId,temp,fileType);
				}
			}
		}else{
			ExperimentFile experimentFile = new ExperimentFile();
			experimentFile.setExperimentId(experimentId);
			experimentFileMapper.delete(experimentFile);
		}
	}
	/**
	 * 将资源文件分配给实验
	 * @param experimentId 实验id
	 * @param resourceFileIds 资源文件ID
	 * @param fileType
	 */
	public void addFilesToExperiment(Integer experimentId, List<Integer> resourceFileIds,Integer fileType) {
		if(resourceFileIds!=null && resourceFileIds.size()>0){
			experimentFileMapper.distributeFilesToExperiment(experimentId,resourceFileIds,fileType);
		}
	}
	/**
	 * 修改实验文件类型
	 * 1.若文件类型是实验指导书，判断该实验中是否已经有实验指导书
	 * @param experimentFile
	 */
	public void updateExperimentFileType(ExperimentFile experimentFile) {
		Integer fileType = experimentFile.getIsInstructor();
		switch (fileType) {//判断是否是实验指导书、若是，单独处理
		case 1://若是实验指导书
			//判断，该文件的文件是否为文档
			ResourceFile rf = resourceFileService.selectById(experimentFile.getResourceFileId());
			if(rf.getFileType()!=null && !("doc".equals(rf.getFileType()) || "docx".equals(rf.getFileType()))){
				throw new RuntimeException("设置失败,实验指导书只能是doc、docx格式");
			}
			Integer selectCount = experimentFileMapper.selectCount(new ExperimentFile(null, experimentFile.getExperimentId(),null,1));
			//判断是否已经存在该试验中，若存在，直接修改状态
			if(selectCount!=0){
				throw new RuntimeException("该实验下已经有实验指导书！");  
			}
			break;
		case 2://GIF动态图
			//判断，该文件的文件是否为GIF动态图
			ResourceFile rf2 = resourceFileService.selectById(experimentFile.getResourceFileId());
			if(rf2.getFileType()!=null && !("gif".equals(rf2.getFileType()))){
				throw new RuntimeException("设置失败,GIF动态图只能是gif格式");
			}
			break;
		case 5://标准答案
			Integer selectCount5 = experimentFileMapper.selectCount(new ExperimentFile(null, experimentFile.getExperimentId(),null,5));
			//判断是否已经存在实验指导书
			if(selectCount5!=0){
				throw new RuntimeException("该实验下已经有标准答案！");  
			}
			break;
		}
		if(experimentFileMapper.updateExperimentInstructorFileToOtherFile(experimentFile.getExperimentId(),experimentFile.getResourceFileId(),experimentFile.getIsInstructor())==0){
			experimentFileMapper.insertSelective(experimentFile);
		}
	}
	/**
	 * 设置实验指导书：
	 * 1.判断原先是否有实验指导书
	 * 	有，去除掉
	 * 	无，添加实验指导书
	 * @param experimentId
	 * @param type
	 * @param fileId
	 */
	public void updateInstructorToExperiment(Integer experimentId, Integer type, Integer fileId) {
		if(type==2){
			//将原先的实验指导书设置为其他资源文件附件
			experimentFileMapper.updateExperimentInstructorFileToOtherFile(experimentId,fileId,0);
		}else{
			//判断资源文件类型，必须为office文档格式
			//判断，该文件的文件是否为文档
			ResourceFile rf = resourceFileService.selectById(fileId);
			if(rf.getFileType()!=null && !("doc".equals(rf.getFileType()) || "docx".equals(rf.getFileType()))){
				throw new RuntimeException("设置失败,实验指导书只能是doc、docx格式");
			}
			//添加新的实验指导书
			if(experimentFileMapper.updateExperimentInstructorFileToOtherFile(experimentId,fileId,1)==0){
				ExperimentFile record2 = new ExperimentFile();
				record2.setExperimentId(experimentId);
				record2.setResourceFileId(fileId);
				record2.setIsInstructor(1);
				experimentFileMapper.insertSelective(record2);
			}
		}
	}
	
	/**
	 * 根据实验ID和类型，查询对应的资源文件ID
	 * @param experimentId
	 * @param type
	 * @return
	 */
	public List<ResourceFile> selectExperimentFileIdByExperimentIdAndType(Integer experimentId, int type) {
		return experimentFileMapper.selectExperimentFileIdByExperimentIdAndType(experimentId,type);
	}
	/**
	 * 添加实验资源
	 * @param file  资源文件信息
	 * @param experiment 实验信息
	 * @param teacherInfo 教师i洗脑洗
	 * @param regex 正则校验串 文件类型 
	 * @param type 类型 实验文件类型  1.参考实验  2.课程实验
	 */
	public synchronized void addExperimentFile(MultipartFile[] file, Experiment experiment, TeacherInfo teacherInfo,Integer type) {
		if(file==null || file.length<=0){
			throw new RuntimeException("【添加实验文件】文件不能为空");
		}
		ResourceFile resourceFile = new ResourceFile();
		switch (type) {
		case 1:
			if(!FileOperateUtils.checkFilepattern(file, "doc|docx")){
				throw new RuntimeException("【添加实验文件】实验指导书上传失败,实验指导书只能是doc、docx格式");
			}
			resourceFile.setFileTitle("《"+experiment.getExperimentName()+"》");
			break;
		case 2:
			resourceFile.setFileTitle("《"+experiment.getExperimentName()+"》");
			break;
		default:
			//resourceFile.setFileTitle("《"+experiment.getExperimentName()+"》辅助资源");
			//throw new RuntimeException("【添加实验文件名】文件不能为空");
			break;
		}
		List<Integer> fileIdList = resourceFileService.addFile(file, resourceFile, teacherInfo, experiment.getExperimentName());
		//关联资源文件
		for (Integer fileId : fileIdList) {
			ExperimentFile ef = new ExperimentFile();
			ef.setIsInstructor(0);//
			ef.setExperimentId(experiment.getExperimentId());//实验的ID
			ef.setResourceFileId(fileId);//资源的ID
			experimentFileMapper.insert(ef);
		}
	}
	
	/**
	 * 根据实验id 和类型查询实验文件信息
	 * @param experimentId
	 * @param type 实验的文件类型 0.其他资源文件 1.实验指导书 2.GIF动态图 3.实验工程文件 4.实验报告  5.实验标准答案 多个类型用逗号(,)隔开
	 * @return
	 */
	public List<ResourceFile> selectFileByEperimentId(Integer experimentId,String type) {
		if(experimentId==null){
			throw new RuntimeException("【查询实验文件】 实验id不能为空");
		}
		return experimentFileMapper.selectFileByEperimentId(experimentId,type);
	}
	/**
	 * 修改设置实验的标准答案和指导书
	 * @param teacherInfo 教师信息
	 * @param experimentId 实验id
	 * @param instructorFile 实验标准答案
	 * @param answerFile 实验指导书
	 */
	//TODO
	public void setExperimentAnswerAndInstrutor(TeacherInfo teacherInfo, Integer experimentId,
			MultipartFile instructorFile, MultipartFile answerFile) {
		if((instructorFile!=null && instructorFile.getSize()>0) || (answerFile !=null && answerFile.getSize()>0)){
			Experiment experiment = experimentMapper.selectByPrimaryKey(experimentId);
			if(experiment == null){
				throw new RuntimeException("【添加修改实验指导书以及标准答案】 添加失败,无法获取实验信息,请重新操作");
			}
			if(instructorFile!=null && instructorFile.getSize()>0){//添加实验指导书
				ResourceFile resourceFile = new ResourceFile();
				resourceFile.setFileTitle("【"+experiment.getExperimentName()+"】指导书");
				List<Integer> fileIds = resourceFileService.addFile(new MultipartFile[]{instructorFile}, resourceFile, teacherInfo, experiment.getExperimentName());
				
				if(CollectionUtils.isNotEmpty(fileIds)){
					//删除旧实验指导书文件
					ExperimentFile record = new ExperimentFile();
					record.setExperimentId(experimentId);
					record.setIsInstructor(ExperimentFileTypeEnum.INSTRUCTOR.getCode());
					experimentFileMapper.delete(record);
					//加入新的实验指导书
					record.setResourceFileId(fileIds.get(0));
					experimentFileMapper.insert(record);
				}
			}
			if(answerFile !=null && answerFile.getSize()>0){//实验标准答案
				ResourceFile resourceFile = new ResourceFile();
				resourceFile.setFileTitle("【"+experiment.getExperimentName()+"】标准答案");
				List<Integer> fileIds = resourceFileService.addFile(new MultipartFile[]{answerFile}, resourceFile, teacherInfo, experiment.getExperimentName());
				
				if(CollectionUtils.isNotEmpty(fileIds)){
					//删除旧实验指导书文件
					ExperimentFile record = new ExperimentFile();
					record.setExperimentId(experimentId);
					record.setIsInstructor(ExperimentFileTypeEnum.ANSWER.getCode());
					experimentFileMapper.delete(record);
					//加入新的实验指导书
					record.setResourceFileId(fileIds.get(0));
					experimentFileMapper.insert(record);
				}
			}
				
		}
	}
	
	//获取校内开放的资源
	public List<ResourceFile> selectCollectFilesByOpenFiles(Integer stealth,Integer openStatus ) {
		 List<ResourceFile> listRes =  resourceFileMapper.selectOpenFiles(stealth,openStatus);
		return listRes;
	}
	
	
	//删除该实验下已经勾选的资源
	public void delectExperimentResources(Integer fileId, Integer experimentId, HttpServletRequest req, TeacherInfo teacherInfo) {
		ExperimentFile exf = new ExperimentFile();
		exf.setExperimentId(experimentId);
		exf.setResourceFileId(fileId);
		experimentFileMapper.delete(exf);
		Experiment ex = experimentMapper.selectByPrimaryKey(experimentId);
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, teacherInfo.getId(), "取消了《"+ex.getExperimentName()+"》分配的资源文件", 7);
		teacherLogInformationService.saveSelective(teacherLogInformation);
	}
	
}
