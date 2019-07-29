package com.vcooc.experiment.enums;

public enum KemiCmdEnum {
	
	//新增考勤机用户
	SET_USER_INFO("SET_USER_INFO"),
	//删除考勤机用户
	DELETE_USER("DELETE_USER"),
	//删除考勤机
	DELETE_MACHINE("deleteMachine"),
	//标识通过考勤机录入用户总表删除
	DELETE_USER_BY_USERINFOLIST("deleteUserByUserInfoList"), 
	//标识通过考勤机下用户列表删除
	DELETE_USER_BY_MACHINE("deleteUserByMachine");   
	
	private String msg;
	
	private KemiCmdEnum(String msg) {
		this.msg =msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
}