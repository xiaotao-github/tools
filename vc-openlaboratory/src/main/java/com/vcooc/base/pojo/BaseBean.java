package com.vcooc.base.pojo;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 实体类的基类，
 * 封装了创建时间，更新时间
 * @author admin
 *
 */
public class BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");//格式化时间
	private Date createTime;
	private Date updateTime;
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	/**
	 *页面展示需要，优化效率，将时间转化为字符串格式
	 * @return
	 */
	public String getCreateTimeToString(){
		if(createTime!=null){
			return sdf.format(createTime);
		}
		return "";
	}
	/**
	 *页面展示需要，优化效率，将时间转化为字符串格式
	 * @return
	 */
	public String getUpdateTimeToString(){
		if(updateTime!=null){
			return sdf.format(updateTime);
		}
		return "";
	}
}