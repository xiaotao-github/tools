package com.vcooc.base.pojo;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "proteus_data")
public class ProteusData extends BaseBean{
	private static final long serialVersionUID = -4920540228741482242L;
	
	@Id
	private Long sid;  //唯一标识    实验成绩表id  非空
	private String startTime;  //开始截取时间  非空
	private String endTime;  //结束截取时间 非空
	private String frequency; //截取的频率  非空
	private String data; //截取的数据 非空
	
	public Long getSid() {
		return sid;
	}
	public void setSid(Long sid) {
		this.sid = sid;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
}
