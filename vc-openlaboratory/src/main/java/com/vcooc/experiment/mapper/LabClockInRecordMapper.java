package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.LabClockInRecord;
import com.vcooc.experiment.dto.ClockInRecordDTO;
import com.vcooc.experiment.dto.ClockInRecordUserInfoDTO;

public interface LabClockInRecordMapper {
    int deleteByPrimaryKey(Long id);

    int insert(LabClockInRecord record);

    int insertSelective(LabClockInRecord record);

    LabClockInRecord selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(LabClockInRecord record);

    int updateByPrimaryKey(LabClockInRecord record);
    
    ClockInRecordUserInfoDTO selectUserInfoForClockInRecord(@Param("userId")Integer userId);
    
    List<ClockInRecordDTO> selectUserClockinRecordByClockinIdAndUserId(@Param("userId")Integer userId,@Param("clockinId")String clockinId, @Param("iDisplayStart") int iDisplayStart,@Param("iDisplayLength") int iDisplayLength,@Param("sSearch")String sSearch);
    
    List<ClockInRecordDTO> selectMachineClockinRecord(@Param("clockinId")String clockinId,@Param("iDisplayStart") int iDisplayStart,@Param("iDisplayLength") int iDisplayLength,@Param("sSearch")String sSearch);
    
    List<ClockInRecordDTO> selectUserClockinRecordByUserId(@Param("userId")Integer userId, @Param("iDisplayStart") int iDisplayStart,@Param("iDisplayLength") int iDisplayLength,@Param("sSearch")String sSearch);
   
    int selectCountByUserId(@Param("userId") Integer userId);
    
    int selectCountByClockinIdAndUserId(@Param("clockinId")String clockinId,@Param("userId") Integer userId);
    
    int selectCountByClockinId(@Param("clockinId")String clockinId);
    
    List<ClockInRecordDTO> selectByIdList(@Param("idList")List<Integer> idlist);
    List<ClockInRecordDTO> selectByClockinId(@Param("clockinId")String clockinId);
    List<ClockInRecordDTO> selectByTime(@Param("clockinId")String clockinId,@Param("startTime")String startTime,@Param("endTime")String endTime);
   
    List<ClockInRecordDTO> selectByUserIdAndClockinId(@Param("userId")Integer userId,@Param("clockinId")String clockinId);
    List<ClockInRecordDTO> selectByUserIdAndClockinIdAndTime(@Param("userId")Integer userId,@Param("clockinId")String clockinId,@Param("startTime")String startTime,@Param("endTime")String endTime);
    int countMachineClockinRecordByTime(@Param("clockinId")String clockinId,@Param("startTime")String startTime,@Param("endTime")String endTime);
    int countUserClockinRecordByTime(@Param("userId")Integer userId,@Param("clockinId")String clockinId,@Param("startTime")String startTime,@Param("endTime")String endTime);
    
}