package com.vcooc.experiment.enums;

public enum ExperimentFileTypeEnum {
	OTHER("其他文件",0),
	INSTRUCTOR("指导书",1),
	GIF("动态图",2),
	PROFILE("工程文件",3),
	REPORT("报告",4),
	ANSWER("答案",5);
	
	private String type;
	private int code;
	
	private ExperimentFileTypeEnum(String type, Integer code) {
		this.type = type;
		this.code = code;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
}
