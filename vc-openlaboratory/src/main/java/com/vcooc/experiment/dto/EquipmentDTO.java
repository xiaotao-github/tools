package com.vcooc.experiment.dto;

public class EquipmentDTO implements Comparable<EquipmentDTO> {

    private Integer equId; //主键id 自增
    private String gwId;//网关id  非空
    private String devId;//设备id
    private String ep;//端口 默认14
    private String epType;//设备类型
    private String epName;//设备名称
    private int seatNum;//座位序号
    private Integer labEpType;//自定义类型  0.其他（默认） 1.灯控 2.红外 3.工位 4.插座 5.摄像头 6.窗户 7.窗帘 8.门 9.电源总开关 10.传感设备
    private String  equIdentify;//设备标识   网关id+设备id+端口
    
	public Integer getEquId() {
		return equId;
	}
	public void setEquId(Integer equId) {
		this.equId = equId;
	}
	public String getGwId() {
		return gwId;
	}
	public void setGwId(String gwId) {
		this.gwId = gwId;
	}
	public String getDevId() {
		return devId;
	}
	public void setDevId(String devId) {
		this.devId = devId;
	}
	public String getEp() {
		return ep;
	}
	public void setEp(String ep) {
		this.ep = ep;
	}
	public String getEpType() {
		return epType;
	}
	public void setEpType(String epType) {
		this.epType = epType;
	}
	public String getEpName() {
		return epName;
	}
	public void setEpName(String epName) {
		this.epName = epName;
	}
	public int getSeatNum() {
		return seatNum;
	}
	public void setSeatNum(int seatNum) {
		this.seatNum = seatNum;
	}
	public Integer getLabEpType() {
		return labEpType;
	}
	public void setLabEpType(Integer labEpType) {
		this.labEpType = labEpType;
	}
	public String getEquIdentify() {
		return equIdentify;
	}
	public void setEquIdentify(String equIdentify) {
		this.equIdentify = equIdentify;
	}
	@Override
	public int compareTo(EquipmentDTO o) {
		if(this.getSeatNum()==o.getSeatNum()){
			return 0;
		}
		return this.getSeatNum()>o.getSeatNum()?1:-1;
	}
}
