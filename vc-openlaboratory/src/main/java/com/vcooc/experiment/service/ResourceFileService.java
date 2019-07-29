package com.vcooc.experiment.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mysql.jdbc.StringUtils;
import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileFormatUtil;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.common.util.JavaCallOpenoffice;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.mapper.ResourceFileMapper;

@Service
public class ResourceFileService {
		
	@Autowired
	private ResourceFileMapper resourceFileMapper;
	@PropertyConfig
	private String SWF_PATH; //swf转换工具路径
	@PropertyConfig
	private String FILE_FORMAT;//允许上传的文件格式
	@PropertyConfig
	private String FILE_PATH;//文件保存的磁盘路径前缀
	@PropertyConfig
	private String VS_EXPERIMENT;//文件保存的项目路径前缀
	 //openoffice配置
	@PropertyConfig
	private String OPENOFFICEPATH;
	@PropertyConfig
	private String OPENOFFICEDICK;
	@PropertyConfig
	private String PROGRAMPATH;
	@PropertyConfig
	private String OPENOFFICEHOST;
	@PropertyConfig
	private String OPENOFFICEPORT;
	
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	/**
	 * 添加资源文件
	 * @param files ：资源文件
	 * @param resourceFile :资源文件信息
	 * @param teacherInfo ： 用户信息
	 */
	/**
	 * @param files
	 * @param resourceFile
	 * @param teacherInfo
	 */
	public List<Integer> addFile(MultipartFile[] files,ResourceFile resourceFile, TeacherInfo teacherInfo,String experimentName) throws RuntimeException {
		FileFormatUtil fileFormatUtil = FileFormatUtil.getFileFormatUtil(SWF_PATH,OPENOFFICEPATH);
		//判断上传的文件格式是否正确
		if(!FileOperateUtils.checkFilepattern(files, FILE_FORMAT)){
			throw new RuntimeException("添加失败，请上传正确格式的文件");
		}
		List<Integer> fileIds = new ArrayList<Integer>();
		for (MultipartFile file : files) {
			if(file.getSize()>0){
				//封装资源文件信息
				String fileAllName = file.getOriginalFilename();//原始文件名
				String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".")+1);//文件后缀名
				String fileName = fileAllName.substring(0,fileAllName.lastIndexOf("."));//文件名
				//封装数据
				resourceFile.setHandlersId(teacherInfo.getId());
				resourceFile.setFileId(null);
				resourceFile.setFileName(fileName);
				resourceFile.setFileType(extFileName);
				resourceFile.setCreateTime(new Date());
				resourceFile.setUpdateTime(resourceFile.getCreateTime());
				resourceFile.setStealth(2);
				resourceFile.setFileSize(file.getSize());
				resourceFile.setAuthorId(teacherInfo.getId());
				resourceFile.setAuthorType(1);
				resourceFile.setFileSize(file.getSize());
				resourceFile.setIsDownload(resourceFile.getIsDownload());
				resourceFile.setOpenStatus(resourceFile.getOpenStatus());
				resourceFile.setDownloadNum(0);
				//保存资源文件
				try {
				//上传资源文件，封装资源文件路径
				String targetPath = VS_EXPERIMENT+"/实验资源/"+experimentName+"/"+teacherInfo.getName()+"/";
				String filePath = FileOperateUtils.upload(FILE_PATH, targetPath, file);
				resourceFile.setFilePath(filePath);
				//封装格式化后的资源文件
				if (extFileName.matches("^.*(asx|asf|mpg|wmv|3gp|mp4|mov|avi)$")) { // 视频格式
					String previewtPath = filePath.substring(0, filePath.lastIndexOf(".")) + ".flv";
					resourceFile.setFileFormatPath(previewtPath);
					fileFormatUtil.addFilePath(FILE_PATH+"/"+filePath);
				}else if(extFileName.matches("^.*(ppt|pptx|xls|xlsx)$")){//文档格式
					JavaCallOpenoffice.Openoffice(OPENOFFICEPATH, OPENOFFICEDICK, PROGRAMPATH, OPENOFFICEHOST,OPENOFFICEPORT);
					String previewtPath = filePath.substring(0, filePath.lastIndexOf(".")) + ".swf";
					resourceFile.setFileFormatPath(previewtPath);
					fileFormatUtil.addFilePath(FILE_PATH+"/"+filePath);
				}else if(extFileName.matches("^.*(doc|docx)$")){//doc|docx| doc转换为html文档格式
					String previewtPath = filePath.substring(0, filePath.lastIndexOf(".")) + ".html";
					resourceFile.setFileFormatPath(previewtPath);
					fileFormatUtil.addFilePath(FILE_PATH+"/"+filePath);
				}else{//其他格式
					resourceFile.setFileFormatPath(filePath);
				}
				//插入文件信息
				resourceFileMapper.insertSelective(resourceFile);
				fileIds.add(resourceFile.getFileId());
				} catch (IOException e) {
					e.printStackTrace();
					throw new RuntimeException("文件上传失败,请重新上传");
				}
			}
		}
		fileFormatUtil.run();
		return fileIds;
	}
	
	
	public ResourceFile selectById(Integer fileId){
		ResourceFile file  = resourceFileMapper.selectById(fileId);
		if(org.apache.commons.lang.StringUtils.isNotEmpty(file.getFileFormatPath())){
			String path=FILE_PATH+file.getFileFormatPath();
			if(new File(path).exists()){
				file.setIsExist(1);
			}else{
				file.setIsExist(2);
			}
			
		}else{
			file.setIsExist(2);
		}
		
		return file;
	}


	public List<ResourceFile> selectFilesByAuthorIds(PageData pd) {
		return resourceFileMapper.selectFilesByAuthorIds(pd);
	}


	public List<ResourceFile> selectCollectionFilesByAuthorId(Integer teacherInfoId, int i,String experimentName) {
		return resourceFileMapper.selectCollectionFilesByAuthorId(teacherInfoId,i,experimentName);
	}

	/**
	 * 伪删除资源
	 * @param teacherInfo 
	 * @param req 
	 * @param experimentId
	 * @return
	 */
	public void delectFile(Integer fileId, HttpServletRequest req, TeacherInfo teacherInfo) {
		ResourceFile rs = new ResourceFile();
		rs.setFileId(fileId);
		rs.setStealth(1);
		resourceFileMapper.updateByPrimaryKeySelective(rs);
		ResourceFile res = resourceFileMapper.selectByPrimaryKey(fileId);
		TeacherLogInformation teacherLogInformation = TeacherLogInformation.bildInfo(req, teacherInfo.getId(), "删除了《"+res.getFileName()+"》资源文件", 7);
		teacherLogInformationService.saveSelective(teacherLogInformation);
	}


	
	
}
