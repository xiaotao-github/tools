package com.vcooc.base.pojo.clockIn;

public class EnrollData {
	
	private Integer backup_number;
	
	private String enroll_data ;
	
	public EnrollData() {
		super();
	}

	public EnrollData(Integer backup_number, String enroll_data) {
		super();
		this.backup_number = backup_number;
		this.enroll_data = enroll_data;
	}

	public Integer getBackup_number() {
		return backup_number;
	}

	public void setBackup_number(Integer backup_number) {
		this.backup_number = backup_number;
	}

	public String getEnroll_data() {
		return enroll_data;
	}

	public void setEnroll_data(String enroll_data) {
		this.enroll_data = enroll_data;
	}

	@Override
	public String toString() {
		return "EnrollData [backup_number=" + backup_number + ", enroll_data=" + enroll_data + "]";
	}
	
	
}
