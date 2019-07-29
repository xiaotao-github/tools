package com.vcooc.experiment.controller.Interface;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.SysResult;

public interface VerificationUser {
	/**
	 * 身份校验成功做的事
	 */
	public SysResult success(TeacherInfo teacherInfo,SysResult sysResult);
	


}
