package com.vcooc.experiment.enums;

public enum StealthEnum {
	SHOW(2,"显示"),
	HIDE(1,"隐藏");
	
	private int code;
	private String msg;
	private StealthEnum(int code, String msg) {
		this.code = code;
		this.msg = msg;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
