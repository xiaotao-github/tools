package com.vcooc.base.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Table(name="resource_collection")
public class ResourceCollection {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;// 收藏表id
	private ResourceFile resourceFile;// 所属文件
	private TeacherInfo teacherInfo;// 操作员
	private Date createTime;// 收藏时间
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss "); 
	public ResourceFile getResourceFile() {
		return resourceFile;
	}

	public void setResourceFile(ResourceFile resourceFile) {
		this.resourceFile = resourceFile;
	}

	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}

	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Integer getId() {
		return id;
	}
	
	public String getCreateTimeToString(){
		if(createTime!=null){
			return sdf.format(createTime);
		}
		return "";
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
