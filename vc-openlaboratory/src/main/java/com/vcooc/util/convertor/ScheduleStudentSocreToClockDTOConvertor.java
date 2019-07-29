package com.vcooc.util.convertor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.experiment.dto.ClockingInDTO;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DateUtil;

public class ScheduleStudentSocreToClockDTOConvertor {
	
	public static Map<String,List<ClockingInDTO>> convertor(List<ScheduleStudentScore> list){
		if(CollectionUtil.isEmpty(list)){
			return null;
		}
		List<ClockingInDTO> normal = new ArrayList<>();
		List<ClockingInDTO> delay = new ArrayList<>();
		List<ClockingInDTO> none = new ArrayList<>();
		for (ScheduleStudentScore temp : list) {
			ClockingInDTO dto = new ClockingInDTO(); 
			dto.setSigin(temp.getSignin()==null?0:temp.getSignin());
			dto.setStudentName(temp.getStudentName());
			dto.setStudentNumber(temp.getUsername());
			dto.setImagePath(temp.getImagePath());
			if(temp.getSigninTime()!=null){
				dto.setSiginTime(DateUtil.format(temp.getSigninTime(), "yyyy-MM-dd HH:mm"));
			}
			switch (temp.getSignin()==null?0:temp.getSignin()) {
			case 0:
				none.add(dto);
				break;
			case 1:
				normal.add(dto);
				break;
			case 2:
				delay.add(dto);
				break;
			}
		}
		Map<String,List<ClockingInDTO>> map = new HashMap<>();
		map.put("normal", normal);
		map.put("delay", delay);
		map.put("none", none);
		return map;
		
	}
	
	

}
