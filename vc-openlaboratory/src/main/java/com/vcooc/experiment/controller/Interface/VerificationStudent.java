package com.vcooc.experiment.controller.Interface;

import com.vcooc.base.pojo.StudentInfo;
import com.vcooc.common.vo.SysResult;

public interface VerificationStudent {

	/**
	 * 学生
	 * @param studentInfo
	 * @param sysResult
	 * @return
	 */
	public SysResult success(StudentInfo  studentInfo,SysResult sysResult);

}
