package com.vcooc.base.pojo.clockIn;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class ClockInUserInfo {
	//{"user_id":"1","user_name":"张三","user_privilege":"user"} 注意用户名要转成unicode码；
	private String user_id ;
	private String user_name;
	private String user_privilege;
	
	private List<EnrollData> enroll_data_array;  
	
	private String user_photo;
	
	private String card_enroll_time;
	
	private String face_enroll_time;
	
	private String fp_enroll_time;
	
	private String password_enroll_time;
	
	public ClockInUserInfo () {
		
		super();
	}
	
	public ClockInUserInfo(String user_id, String user_name, String user_privilege, List<EnrollData> enroll_data_array,
			String user_photo, String card_enroll_time, String face_enroll_time, String fp_enroll_time,
			String password_enroll_time) {
		super();
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_privilege = user_privilege;
		this.enroll_data_array = enroll_data_array;
		this.user_photo = user_photo;
		this.card_enroll_time = card_enroll_time;
		this.face_enroll_time = face_enroll_time;
		this.fp_enroll_time = fp_enroll_time;
		this.password_enroll_time = password_enroll_time;
	}

	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_privilege() {
		return user_privilege;
	}

	public void setUser_privilege(String user_privilege) {
		this.user_privilege = user_privilege;
	}
	
	public List<EnrollData> getEnroll_data_array() {
		return enroll_data_array;
	}

	public void setEnroll_data_array(List<EnrollData> enroll_data_array) {
		this.enroll_data_array = enroll_data_array;
	}



	public String getUser_photo() {
		return user_photo;
	}

	public void setUser_photo(String user_photo) {
		this.user_photo = user_photo;
	}

	public String getCard_enroll_time() {
		return card_enroll_time;
	}

	public void setCard_enroll_time(String card_enroll_time) {
		this.card_enroll_time = card_enroll_time;
	}

	public String getFace_enroll_time() {
		return face_enroll_time;
	}

	public void setFace_enroll_time(String face_enroll_time) {
		this.face_enroll_time = face_enroll_time;
	}

	public String getFp_enroll_time() {
		return fp_enroll_time;
	}

	public void setFp_enroll_time(String fp_enroll_time) {
		this.fp_enroll_time = fp_enroll_time;
	}

	public String getPassword_enroll_time() {
		return password_enroll_time;
	}

	public void setPassword_enroll_time(String password_enroll_time) {
		this.password_enroll_time = password_enroll_time;
	}
	
}
