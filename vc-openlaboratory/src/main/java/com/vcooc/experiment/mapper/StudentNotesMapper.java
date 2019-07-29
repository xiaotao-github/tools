package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.StudentNotes;
import com.vcooc.common.mapper.SysMapper;

public interface StudentNotesMapper extends SysMapper<StudentNotes>{
	/**
	 * 查询学生实验下的实验笔记
	 * @param relevanceId 逻辑外键、关联实验ID
	 * @param studentInfoId 学生ID
	 * @param noteType 2
	 * @return
	 */
    List<StudentNotes> selectNote(@Param("relevanceId")Integer relevanceId,@Param("studentInfoId")Integer studentInfoId,@Param("noteType")Integer noteType);
}
