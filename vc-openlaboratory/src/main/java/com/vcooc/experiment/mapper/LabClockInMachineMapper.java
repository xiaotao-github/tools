package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabClockInMachine;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.mapper.SysMapper;

public interface LabClockInMachineMapper extends SysMapper<LabClockInMachine> {

	List<ExperimentLab> selectAddMachieLabList(TeacherInfo teacherInfo);
	

	List<LabClockInMachine> selectMachineList(TeacherInfo teacherInfo);
	
	LabClockInMachine selectMachineByClockinId(@Param("clockinId")String clockinId);

	List<String> selectAddMachieClockinIdList();

	int updateForAddMachine(@Param("machine")LabClockInMachine machine);

	List<ExperimentLab> selectEditMachieLabList(@Param("departmentId")Integer departmentId,@Param("clockinId")String clockinId);

	@Select("select * from lab_clock_in_machine where lab_id = #{labId} ")
	LabClockInMachine seleceLabMachine(@Param("labId")Integer labId);
	
}