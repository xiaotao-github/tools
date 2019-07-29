package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.TbClass;
import com.vcooc.common.mapper.SysMapper;

public interface TbClassMapper extends SysMapper<TbClass> {
	/**
	 * 查询班级信息
	 * MAX_COUNT:最大查询数
	 * departmentId：所属院系，若无，查询所有班级
	 * stealth：伪删除字段 1：删除  2：未删除
	 * @return
	 */
	List<TbClass> selectAllClasses(@Param("MAX_COUNT")Integer MAX_COUNT,@Param("departmentId")Integer departmentId,@Param("stealth")Integer stealth);


	public TbClass AselectById(Integer classId);
}
