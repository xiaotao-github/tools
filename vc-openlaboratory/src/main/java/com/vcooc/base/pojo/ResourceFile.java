package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 资源文件
 * @author Administrator
 */
@Table(name= "resource_file")
public class ResourceFile extends BaseBean  {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer fileId; //文件id
	private Integer libraryId;
	private Integer authorId;
	private Integer authorType;
	private Integer handlersId;
	private String fileName;//文件名
	private String fileTitle;//资源标题
	private String fileTag;//资源标签
	private String filePresentation;//文件介绍
	private String fileType;//文件类型--后缀名
	private Long fileSize;//文件大小  kb
	private String filePath;//文件存放路径
	private String fileFormatPath;//资源预览路径
	private Integer openStatus;//开放状态  1.不开放  2.院内开发   3.完全开放
	private Integer isDownload; //是否允许下载  1.允许下载  2.不允许下载
	private Integer downloadNum;//下载次数
	private Integer stealth;//是否显示 1.隐藏 2.显示
	private String  link;//第三方链接
	
	@Transient
	private ResourceLibrary resourceLibrary;//所属资源库
	//自定义
	@Transient
	private TeacherInfo author;//作者
	@Transient
	private TeacherInfo handlers;//操作者
	@Transient
	private Integer isInstructor;//判断该资源文件在实验下的类型
	@Transient
	private Integer isSelected;//判断 资源/链接 是否存在 章节/课程 下 1.已经存在2.不存在
	@Transient
	private Integer type;//资源类型 1.图片 2.视频 3.文档 4.其他
	@Transient
	private Integer isExist;//文件是否存在 1:存在；2:不存在
	@Transient
	private ExperimentFile experimentFile;//实验资源中间表
	
	@Transient
	private ExperimentCourse experimentCourse ;//实验课程表课程表
	@Transient
	private Experiment experiment;//所属实验信息
	
	
	public ExperimentCourse getExperimentCourse() {
		return experimentCourse;
	}
	public void setExperimentCourse(ExperimentCourse experimentCourse) {
		this.experimentCourse = experimentCourse;
	}
	public Experiment getExperiment() {
		return experiment;
	}
	public void setExperiment(Experiment experiment) {
		this.experiment = experiment;
	}
	public Integer getIsSelected() {
		return isSelected;
	}
	public void setIsSelected(Integer isSelected) {
		this.isSelected = isSelected;
	}
	public Integer getFileId() {
		return fileId;
	}
	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}
	public ResourceLibrary getResourceLibrary() {
		return resourceLibrary;
	}
	public void setResourceLibrary(ResourceLibrary resourceLibrary) {
		this.resourceLibrary = resourceLibrary;
	}
	public TeacherInfo getAuthor() {
		return author;
	}
	public void setAuthor(TeacherInfo author) {
		this.author = author;
	}
	public TeacherInfo getHandlers() {
		return handlers;
	}
	public void setHandlers(TeacherInfo handlers) {
		this.handlers = handlers;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileTitle() {
		return fileTitle;
	}
	public void setFileTitle(String fileTitle) {
		this.fileTitle = fileTitle;
	}
	public String getFileTag() {
		return fileTag;
	}
	public void setFileTag(String fileTag) {
		this.fileTag = fileTag;
	}
	public String getFilePresentation() {
		return filePresentation;
	}
	public void setFilePresentation(String filePresentation) {
		this.filePresentation = filePresentation;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public Integer getOpenStatus() {
		return openStatus;
	}
	public void setOpenStatus(Integer openStatus) {
		this.openStatus = openStatus;
	}
	public Integer getIsDownload() {
		return isDownload;
	}
	public void setIsDownload(Integer isDownload) {
		this.isDownload = isDownload;
	}
	public Integer getDownloadNum() {
		return downloadNum;
	}
	public void setDownloadNum(Integer downloadNum) {
		this.downloadNum = downloadNum;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public String getFileFormatPath() {
		return fileFormatPath;
	}
	public void setFileFormatPath(String fileFormatPath) {
		this.fileFormatPath = fileFormatPath;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public Integer getAuthorId() {
		return authorId;
	}
	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}
	public Integer getHandlersId() {
		return handlersId;
	}
	public void setHandlersId(Integer handlersId) {
		this.handlersId = handlersId;
	}
	public Integer getIsInstructor() {
		return isInstructor;
	}
	public void setIsInstructor(Integer isInstructor) {
		this.isInstructor = isInstructor;
	}
	public Integer getAuthorType() {
		return authorType;
	}
	public void setAuthorType(Integer authorType) {
		this.authorType = authorType;
	}
	public Integer getLibraryId() {
		return libraryId;
	}
	public void setLibraryId(Integer libraryId) {
		this.libraryId = libraryId;
	}
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getIsExist() {
		return isExist;
	}
	public void setIsExist(Integer isExist) {
		this.isExist = isExist;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj==null){
			return false;
		}
		if(obj==this){
			return true;
		}
		if (obj instanceof ResourceFile) {
			ResourceFile resourceFile = (ResourceFile)obj;
			if(resourceFile.getFileId() !=null && resourceFile.getFileId().equals(this.getFileId())){
				return true;
			}
		}
		return false;	
	}
	@Override
	public int hashCode() {
		return (this.authorId==null?0:this.authorId)+(this.fileName==null?0:this.fileName.hashCode())+
				(this.fileId==null?0:this.fileId);
	}
	public ExperimentFile getExperimentFile() {
		return experimentFile;
	}
	public void setExperimentFile(ExperimentFile experimentFile) {
		this.experimentFile = experimentFile;
	}
	
}
