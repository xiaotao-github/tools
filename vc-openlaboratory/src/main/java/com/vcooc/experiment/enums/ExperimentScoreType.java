package com.vcooc.experiment.enums;

public enum ExperimentScoreType {
	OLD(1,"旧的实验成绩"),
	NEW(2,"新的实验成绩");
	
	private Integer code;
	private String msg;
	private ExperimentScoreType(Integer code, String msg) {
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
