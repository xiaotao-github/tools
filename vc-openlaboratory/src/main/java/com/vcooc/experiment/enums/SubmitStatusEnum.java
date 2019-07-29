package com.vcooc.experiment.enums;

public enum SubmitStatusEnum {
	IN("进行中",1),
	WAIT("待批改",2),
	SUCCESS("已完成",3),
	FAIL("重做中",4);
	private String msg;
	private Integer code;
	
	private SubmitStatusEnum(String msg, Integer code) {
		this.msg = msg;
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	
	
	public static SubmitStatusEnum getStatus(Integer status){
		switch (status) {
		case 1:
			return IN;
		case 2:
			return WAIT;
		case 3:
			return SUCCESS;
		case 4:
			return FAIL;
		}
		return null;
	}
	
}
