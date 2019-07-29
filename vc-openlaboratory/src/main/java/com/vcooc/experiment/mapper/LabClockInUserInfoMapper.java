package com.vcooc.experiment.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.LabClockInUserInfo;
import com.vcooc.base.pojo.LabClockInUserInfoWithBLOBs;
import com.vcooc.experiment.dto.LabClockUserInfoDTO;

public interface LabClockInUserInfoMapper {
    int deleteByPrimaryKey(Long id);

    int insert(LabClockInUserInfoWithBLOBs record);

    int insertSelective(LabClockInUserInfoWithBLOBs record);

    LabClockInUserInfoWithBLOBs selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(LabClockInUserInfoWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(LabClockInUserInfoWithBLOBs record);

    int updateByPrimaryKey(LabClockInUserInfo record);
    
    int batchInsert(HashMap<String,Object> paramMap);

	List<LabClockInUserInfo> selectByClassIdList(HashMap<String, Object> paramMap);

	List<LabClockUserInfoDTO> selectByDepartmentId(@Param("departmentId")Integer departmentId,@Param("iDisplayStart") int iDisplayStart,@Param("iDisplayLength")int iDisplayLength,
			@Param("sSearch")String sSearch);

	Integer selectCountByDepartmentId(Integer departmentId);

}