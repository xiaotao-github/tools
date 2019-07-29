package com.vcooc.common.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.vcooc.common.spring.exetend.PropertyConfig;

@Service
public class IpService {
	//从配置文件中读取到个各个系统的ip地址
		@PropertyConfig(required=false)
		private String MANAGE_URL;//平台基础管理子系统路径
		@PropertyConfig(required=false)
		private String SSO_URL;//单点登录子系统路径
		@PropertyConfig(required=false)
		private String RESOURCE_URL;//资源管理子系统路径
		@PropertyConfig(required=false)
		private String RESOURCE_WAY;//资源文件获取路径
		@PropertyConfig(required=false)
		private String CLASSROOM_URL;//网络课题子系统
		@PropertyConfig(required=false)
		private String EXPERIMENT_URL;//仿真实验子系统
		@PropertyConfig(required=false)
		private String DISCUSSION_URL;//交流中心
		@PropertyConfig(required=false)
		private String TEACHER_SPACE_URL;//教师空间
		@PropertyConfig(required=false)
		private String FILE_PATH;//资源文件存放路径
		@PropertyConfig(required=false)
		private String WEB_SITE_URL;//官网
		@PropertyConfig(required=false)
		private String EXAM_URL;//考试中心
		@PropertyConfig(required=false)
		private String PEXPERIMENT;//#开放与预约管理学生系统
		@PropertyConfig(required=false)
		private String TEAMBITION_URL;
		@PropertyConfig(required=false)//#开放与预约管理后台系统
		private String PEXPERIMENTOPEN;
		@PropertyConfig(required=false)//物联系统
		private String WISDOMLAB;
		
		
		public Map<String, String> getAllServerIP() {
			Map<String,String> ipMap = new HashMap<String,String>();
			ipMap.put("MANAGE_URL", MANAGE_URL);
			ipMap.put("SSO_URL", SSO_URL);
			ipMap.put("RESOURCE_URL", RESOURCE_URL);
			ipMap.put("RESOURCE_WAY", RESOURCE_WAY);
			ipMap.put("CLASSROOM_URL", CLASSROOM_URL);
			ipMap.put("DISCUSSION_URL", DISCUSSION_URL);
			ipMap.put("TEACHER_SPACE_URL", TEACHER_SPACE_URL);
			ipMap.put("VS_EXPERIMENT", EXPERIMENT_URL);
			ipMap.put("WEB_SITE_URL", WEB_SITE_URL);
			ipMap.put("EXAM_URL", EXAM_URL);
			ipMap.put("PEXPERIMENT", PEXPERIMENT);
			ipMap.put("TEAMBITION_URL", TEAMBITION_URL);
			ipMap.put("PEXPERIMENTOPEN", PEXPERIMENTOPEN);
			ipMap.put("WISDOMLAB", WISDOMLAB);
			return ipMap;
		}
		public Map<String,String> getParam(){
			Map<String,String> param = new HashMap<String,String>();
			param.put("FILE_PATH", FILE_PATH);
			return param;
			
		}
		


		public String getMANAGE_URL() {
			return MANAGE_URL;
		}


		public void setMANAGE_URL(String mANAGE_URL) {
			MANAGE_URL = mANAGE_URL;
		}


		public String getSSO_URL() {
			return SSO_URL;
		}


		public void setSSO_URL(String sSO_URL) {
			SSO_URL = sSO_URL;
		}


		public String getRESOURCE_URL() {
			return RESOURCE_URL;
		}


		public void setRESOURCE_URL(String rESOURCE_URL) {
			RESOURCE_URL = rESOURCE_URL;
		}


		public String getRESOURCE_WAY() {
			return RESOURCE_WAY;
		}


		public void setRESOURCE_WAY(String rESOURCE_WAY) {
			RESOURCE_WAY = rESOURCE_WAY;
		}


		public String getCLASSROOM_URL() {
			return CLASSROOM_URL;
		}


		public void setCLASSROOM_URL(String cLASSROOM_URL) {
			CLASSROOM_URL = cLASSROOM_URL;
		}


		public String getEXPERIMENT_URL() {
			return EXPERIMENT_URL;
		}


		public void setEXPERIMENT_URL(String eXPERIMENT_URL) {
			EXPERIMENT_URL = eXPERIMENT_URL;
		}


		public String getDISCUSSION_URL() {
			return DISCUSSION_URL;
		}


		public void setDISCUSSION_URL(String dISCUSSION_URL) {
			DISCUSSION_URL = dISCUSSION_URL;
		}


		public String getTEACHER_SPACE_URL() {
			return TEACHER_SPACE_URL;
		}


		public void setTEACHER_SPACE_URL(String tEACHER_SPACE_URL) {
			TEACHER_SPACE_URL = tEACHER_SPACE_URL;
		}


		public String getFILE_PATH() {
			return FILE_PATH;
		}


		public void setFILE_PATH(String fILE_PATH) {
			FILE_PATH = fILE_PATH;
		}


		public String getWEB_SITE_URL() {
			return WEB_SITE_URL;
		}


		public void setWEB_SITE_URL(String wEB_SITE_URL) {
			WEB_SITE_URL = wEB_SITE_URL;
		}


		public String getEXAM_URL() {
			return EXAM_URL;
		}
		public void setEXAM_URL(String eXAM_URL) {
			EXAM_URL = eXAM_URL;
		}
		public String getPEXPERIMENT() {
			return PEXPERIMENT;
		}
		public void setPEXPERIMENT(String pEXPERIMENT) {
			PEXPERIMENT = pEXPERIMENT;
		}
		public String getTEAMBITION_URL() {
			return TEAMBITION_URL;
		}
		public void setTEAMBITION_URL(String tEAMBITION_URL) {
			TEAMBITION_URL = tEAMBITION_URL;
		}
		public String getPEXPERIMENTOPEN() {
			return PEXPERIMENTOPEN;
		}
		public void setPEXPERIMENTOPEN(String pEXPERIMENTOPEN) {
			PEXPERIMENTOPEN = pEXPERIMENTOPEN;
		}
		
	
		
		
}
