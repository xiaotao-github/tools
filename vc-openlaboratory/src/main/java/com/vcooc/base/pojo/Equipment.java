package com.vcooc.base.pojo;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer equId; //主键id 自增
    @Column(name = "gw_id")
    private String gwId;//网关id  非空
    @Column(name = "dev_id",unique = true)
    private String devId;//设备id
    @Column(name = "ep")
    private String ep;//端口 默认14
    @Column(name = "ep_type")
    private String epType;//设备类型
    @Column(name = "ep_name")
    private String epName;//设备名称
    @Column(name = "seat_num")
    private int seatNum;//座位序号
    @Column(name = "lab_ep_type")
    private Integer labEpType;//自定义类型  0.其他（默认） 1.灯控 2.红外 3.工位 4.插座 5.摄像头 6.窗户 7.窗帘 8.门 9.电源总开关 10.传感设备
    @Column(name = "stealth")
    private Integer stealth;//伪删除
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
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
}
