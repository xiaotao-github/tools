package com.vcooc.base.pojo;

import java.io.Serializable;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.servlet.http.HttpServletRequest;

import com.vcooc.common.util.IpUtil;

/**
 * 教师操作日志表
 * @author admin
 *
 */

@Table(name="teacher_log_information")
public class TeacherLogInformation implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//日志id
	private Integer teacherInfoId;//操作教师（teacherInfoId）
	private String operationIp;//操作ip
	private String filePath;//操作文件路径
	private Date operationTime;//操作时间
	private String message;//操作信息
	private Integer operationSystem;//操作系统 1.平台基础管理子系统 ，2.单点登录子系统 ，3.资源管理子系统
	
	@Transient
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");//格式化时间
	@Transient
	private TeacherInfo teacherInfo;//操作教师（teacherInfoId）
	public TeacherLogInformation() {
		super();
	}
	/**
	 * 自定义操作记录信息采集静态方法
	 * @param request：操作来源
	 * @param teacherInfoId:操作教师ID
	 * @param message：操作信息
	 * @param operationSystem :操纵子系统：1.平台基础管理子系统 ，2.单点登录子系统 ，3.资源管理子系统。。。
	 */
	public static TeacherLogInformation bildInfo(HttpServletRequest request,Integer teacherInfoId,String message,Integer operationSystem){
		//将此系统日志类型定死
		operationSystem = 7;
		TeacherLogInformation info = new TeacherLogInformation();
		//封装操作员信息
		info.setTeacherInfoId(teacherInfoId);
		info.setMessage(message);
		info.setOperationTime(new Date(System.currentTimeMillis()));
		info.setOperationIp(IpUtil.getClientIpAddr(request));
		info.setOperationSystem(operationSystem);
		return info;
	}
	/**
	 * 自定义操作记录信息采集静态方法
	 * @param request ：操作来源
	 * @param teacherInfo ：操作教师id
	 * @param message ：操作信息
	 * @param filePath ：操作的文件地址
	 * @param operationSystem :操纵子系统：1.平台基础管理子系统 ，2.单点登录子系统 ，3.资源管理子系统。。。
	 * @return
	 */
	public static TeacherLogInformation bildInfo(HttpServletRequest request,Integer teacherInfoId,String message,String filePath,Integer operationSystem){
		TeacherLogInformation info = new TeacherLogInformation();
		//封装操作员信息
		info.setTeacherInfoId(teacherInfoId);
		info.setFilePath(filePath);
		info.setMessage(message);
		info.setOperationTime(new Date(System.currentTimeMillis()));
		info.setOperationIp(IpUtil.getClientIpAddr(request));
		info.setOperationSystem(operationSystem);
		return info;
	}
	
	
	/**
	 * 自定义操作记录信息采集静态方法
	 * @param request ：操作来源
	 * @param teacherInfo ：操作教师id
	 * @param message ：操作信息
	 * @param filePath ：操作的文件地址
	 * @param operationSystem :操纵子系统：1.平台基础管理子系统 ，2.单点登录子系统 ，3.资源管理子系统。。。
	 * @return
	 */
	public static TeacherLogInformation bildInfo(Integer teacherInfoId,String message,Integer operationSystem){
		TeacherLogInformation info = new TeacherLogInformation();
		//封装操作员信息
		info.setTeacherInfoId(teacherInfoId);
		info.setMessage(message);
		info.setOperationTime(new Date(System.currentTimeMillis()));
		try {
			InetAddress addr = InetAddress.getLocalHost();
			info.setOperationIp(addr.getHostAddress().toString());
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		info.setOperationSystem(operationSystem);
		return info;
	}
	
	
	/**
	 *页面展示需要，优化效率，将时间转化为字符串格式
	 * @return
	 */
	public String getOperationTimeToString(){
		if(this.operationTime!=null){
			return sdf.format(operationTime);
		}
		return "";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public String getOperationIp() {
		return operationIp;
	}
	public void setOperationIp(String operationIp) {
		this.operationIp = operationIp;
	}
	public Date getOperationTime() {
		return operationTime;
	}
	public void setOperationTime(Date operationTime) {
		this.operationTime = operationTime;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Integer getOperationSystem() {
		return operationSystem;
	}
	public void setOperationSystem(Integer operationSystem) {
		this.operationSystem = operationSystem;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public Integer getTeacherInfoId() {
		return teacherInfoId;
	}
	public void setTeacherInfoId(Integer teacherInfoId) {
		this.teacherInfoId = teacherInfoId;
	}
}
