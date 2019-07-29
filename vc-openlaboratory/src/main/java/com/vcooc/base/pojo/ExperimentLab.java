package com.vcooc.base.pojo;

import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 实验室
 * @author ITcast
 *
 */
@Table(name="experiment_lab")
public class ExperimentLab extends BaseBean{
	
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer labId;              //实验室id
	private Integer departmentId;		//所属院系id
	private Integer operatorId;         //操作人ID
	private Integer labStatus;          //实验室状态;  1.可用      2.维护中
	private Integer labSeat;            //实验室座位数量
	private Integer stealth;            //1.隐藏       2.显示
	private String  labNumber;          //实验室编号
	private String  labName;            //实验名称
	private String  labDescription;     //实验室介绍
	private String  labImg;             //实验室封面
	private String  mainframeKey;       //主机key  --网关密码
	private String  mainframeId;        //主机id   --网关id
	private String  deviceId; 			//设备id
	private String 	clockinId;			//考勤机id
	private String  videoStream;        //视频流       
	private int  	pvStatus ;			//默认是图片轮播 0  1  是视频轮播
	
	public int getPvStatus() {
		return pvStatus;
	}
	public void setPvStatus(int pvStatus) {
		this.pvStatus = pvStatus;
	}
	@Transient
	private List<TeacherInfo> dutyTeachers;    //负责教师
	@Transient
	private TeacherInfo operator;    //操作人
	@Transient
	private String thManager;         //实验室管理员
	@Transient
	private String  departmentName;     //院系名称
	
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public List<TeacherInfo> getDutyTeachers() {
		return dutyTeachers;
	}
	public void setDutyTeachers(List<TeacherInfo> dutyTeachers) {
		this.dutyTeachers = dutyTeachers;
	}
	public Integer getLabId() {
		return labId;
	}
	public void setLabId(Integer labId) {
		this.labId = labId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public Integer getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(Integer operatorId) {
		this.operatorId = operatorId;
	}
	public Integer getLabStatus() {
		return labStatus;
	}
	public void setLabStatus(Integer labStatus) {
		this.labStatus = labStatus;
	}
	public Integer getLabSeat() {
		return labSeat;
	}
	public void setLabSeat(Integer labSeat) {
		this.labSeat = labSeat;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public String getLabNumber() {
		return labNumber;
	}
	public void setLabNumber(String labNumber) {
		this.labNumber = labNumber;
	}
	public String getLabName() {
		return labName;
	}
	public void setLabName(String labName) {
		this.labName = labName;
	}
	public String getLabDescription() {
		return labDescription;
	}
	public void setLabDescription(String labDescription) {
		this.labDescription = labDescription;
	}
	public String getLabImg() {
		return labImg;
	}
	public void setLabImg(String labImg) {
		this.labImg = labImg;
	}
	public String getMainframeKey() {
		return mainframeKey;
	}
	public void setMainframeKey(String mainframeKey) {
		this.mainframeKey = mainframeKey;
	}
	public String getMainframeId() {
		return mainframeId;
	}
	public void setMainframeId(String mainframeId) {
		this.mainframeId = mainframeId;
	}
	public String getVideoStream() {
		return videoStream;
	}
	public void setVideoStream(String videoStream) {
		this.videoStream = videoStream;
	}
	
	public TeacherInfo getOperator() {
		return operator;
	}
	public void setOperator(TeacherInfo operator) {
		this.operator = operator;
	}
	public List<TeacherInfo> getDutyTeacher() {
		return dutyTeachers;
	}
	public void setDutyTeacher(List<TeacherInfo> dutyTeacher) {
		this.dutyTeachers = dutyTeacher;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getClockinId() {
		return clockinId;
	}
	public void setClockinId(String clockinId) {
		this.clockinId = clockinId;
	}
	public String getThManager() {
		return thManager;
	}
	public void setThManager(String thManager) {
		this.thManager = thManager;
	}
	
	
}
