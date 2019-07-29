package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

public class LabClockInMachine implements Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  //主键id 自增

    private String clockinId;  //考勤机id

    private Long labId;   //实验室id

    private String fkName;  //考勤机名称

    private Integer operatorId;  //操作人id,对应user(id)

    private String supportedEnrollData;

    private Boolean isDeleted;

    private Short totalUserCount;

    private Short userCount;

    private Short managerCount;

    private Short fpCount;

    private Short faceCount;

    private Short passwordCount;

    private Short idcardCount;

    private Integer totalLogCount;

    private String firmware;

    private Date createTime;

    private Date updateTime;
    
    @Transient
    private String labName; //所属实验室名称
    
    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClockinId() {
        return clockinId;
    }

    public void setClockinId(String clockinId) {
        this.clockinId = clockinId == null ? null : clockinId.trim();
    }

    public Long getLabId() {
        return labId;
    }

    public void setLabId(Long labId) {
        this.labId = labId;
    }

    public String getFkName() {
        return fkName;
    }

    public void setFkName(String fkName) {
        this.fkName = fkName == null ? null : fkName.trim();
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    public String getSupportedEnrollData() {
        return supportedEnrollData;
    }

    public void setSupportedEnrollData(String supportedEnrollData) {
        this.supportedEnrollData = supportedEnrollData == null ? null : supportedEnrollData.trim();
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Short getTotalUserCount() {
        return totalUserCount;
    }

    public void setTotalUserCount(Short totalUserCount) {
        this.totalUserCount = totalUserCount;
    }

    public Short getUserCount() {
        return userCount;
    }

    public void setUserCount(Short userCount) {
        this.userCount = userCount;
    }

    public Short getManagerCount() {
        return managerCount;
    }

    public void setManagerCount(Short managerCount) {
        this.managerCount = managerCount;
    }

    public Short getFpCount() {
        return fpCount;
    }

    public void setFpCount(Short fpCount) {
        this.fpCount = fpCount;
    }

    public Short getFaceCount() {
        return faceCount;
    }

    public void setFaceCount(Short faceCount) {
        this.faceCount = faceCount;
    }

    public Short getPasswordCount() {
        return passwordCount;
    }

    public void setPasswordCount(Short passwordCount) {
        this.passwordCount = passwordCount;
    }

    public Short getIdcardCount() {
        return idcardCount;
    }

    public void setIdcardCount(Short idcardCount) {
        this.idcardCount = idcardCount;
    }

    public Integer getTotalLogCount() {
        return totalLogCount;
    }

    public void setTotalLogCount(Integer totalLogCount) {
        this.totalLogCount = totalLogCount;
    }

    public String getFirmware() {
        return firmware;
    }

    public void setFirmware(String firmware) {
        this.firmware = firmware == null ? null : firmware.trim();
    }

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

	public String getLabName() {
		return labName;
	}

	public void setLabName(String labName) {
		this.labName = labName;
	}

    
}