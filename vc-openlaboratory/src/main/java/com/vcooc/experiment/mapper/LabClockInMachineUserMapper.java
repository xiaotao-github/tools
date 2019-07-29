package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.LabClockInMachineUser;
import com.vcooc.experiment.dto.ClockInMachineUserDTO;

public interface LabClockInMachineUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(LabClockInMachineUser record);

    int insertSelective(LabClockInMachineUser record);

    LabClockInMachineUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(LabClockInMachineUser record);

    int updateByPrimaryKeyWithBLOBs(LabClockInMachineUser record);

    int updateByPrimaryKey(LabClockInMachineUser record);
    
    int selectMachineUserCountByClockinId(@Param("clockinId")String clockinId);
    
    List<ClockInMachineUserDTO>  selectMachineUserList(@Param("clockinId")String clockinId,@Param("iDisplayStart") int iDisplayStart,
    		@Param("iDisplayLength")int iDisplayLength, @Param("sSearch")String sSearch);
}