package com.vcooc.experiment.enums;

public enum ScheduleTypeEnum {
	CALZZ(1,"整班上课"),
	GROUP(2,"小组协作"),
	OPTION(3,"自助预约")
	;
	
	private Integer code;
	private String tip;
	
	private ScheduleTypeEnum(Integer code, String tip) {
		this.code = code;
		this.tip = tip;
	}
	public Integer getCode() {
		return code;
	}
	public void setCode(Integer code) {
		this.code = code;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	
	public static ScheduleTypeEnum getType(Integer type){
		if(type==null){
			return null;
		}
		switch (type) {
		case 1:
			return CALZZ;
		case 2:
			return GROUP;
		case 3:
			return OPTION;
		}
		return null;
	}
}
