package com.vcooc.util.convertor;

import java.util.ArrayList;
import java.util.List;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.experiment.dto.ScheduleDTO;

import cn.hutool.core.date.DateUtil;

public class CourseScheduleToScheduleDTO {
	
	public static List<ScheduleDTO> convertor(List<CourseSchedule> list){
		List<ScheduleDTO> result = new ArrayList<>();
		for (CourseSchedule courseSchedule : list) {
			try{
				ScheduleDTO scheduleDTO = new ScheduleDTO();
				scheduleDTO.setCourseName(courseSchedule.getExperimentCourse().getCourseName());
				scheduleDTO.setExperimentName(courseSchedule.getExperiment().getExperimentName());
				scheduleDTO.setSchooltimeString(DateUtil.format(courseSchedule.getSchooltime(),"yyyy-MM-dd"));
				scheduleDTO.setSlice(courseSchedule.getSlice());
				scheduleDTO.setTeacherName(courseSchedule.getTeacherInfo().getName());
				scheduleDTO.setType(courseSchedule.getType());
				result.add(scheduleDTO);
			}catch(Exception e){
				e.printStackTrace();
				continue;
			}
		
		}
		return result;
	}

}
