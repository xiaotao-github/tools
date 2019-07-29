package com.vcooc.experiment.enums;
/**
 * 实验室设备类型枚举
 * @author Administrator
 *
 */
public enum LabEpTypeEnum {
	OTHER(0,"其他"),
	LAMPCONTROL(1,"灯控"),
	INFRARED(2,"红外"),
	STATION(3,"工位"),
	SOCKET(4,"插座"),
	CAMERA(5,"摄像头"),
	CURTAIN(6,"窗帘"),
	DOOR(7,"门"),
	POWER(8,"总电源开关"),
	SENSOR(9,"传感设备"),
	SECURITY(10,"报警设备");
	;
	
	
	
	private Integer code;//设备类型编号
	private String msg;//说明
	
	private LabEpTypeEnum(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}
	
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
	
	
	
	

}
