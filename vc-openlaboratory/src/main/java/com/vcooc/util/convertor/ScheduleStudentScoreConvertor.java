package com.vcooc.util.convertor;


import java.util.ArrayList;
import java.util.List;

import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.experiment.enums.ScheduleTypeEnum;
import com.vcooc.experiment.enums.SubmitStatusEnum;
import cn.hutool.core.date.DateUtil;
	public class ScheduleStudentScoreConvertor{
		
		
		public static  List<String> convert(List<ScheduleStudentScore> sssList){

			List<String> datas = new ArrayList<>();
			for (ScheduleStudentScore sss : sssList) {
				StringBuilder sb = new StringBuilder();
					sb.append(sss.getUsername())
					.append(",")
					.append(sss.getStudentName())
					.append(",")
					.append(sss.getClazzName())
					.append(",")
					.append(sss.getCourseName())
					.append(",")
					.append(sss.getExperimentName())
					.append(",");
					ScheduleTypeEnum type = ScheduleTypeEnum.getType(sss.getCourseSchedule().getType());
					if(type == null){
						sb.append("---");
					}else{
						sb.append(type.getTip());
					}
					sb.append(",");
					
					if(sss.getCourseSchedule().getSchooltime() ==  null){
						sb.append("---");
					}else{
						String dateStr = DateUtil.format(sss.getCourseSchedule().getSchooltime(),"yyyy-MM-dd");
						if(sss.getCourseSchedule().getSlice()!=null){
							sb.append(new StringBuilder(dateStr).append(" ").append(coverter(sss.getCourseSchedule().getSlice())).toString());
						}
					}
					sb.append(",");
					if(sss.getSubmitTime() ==null){
						sb.append("---");
					}else{
						sb.append(DateUtil.format(sss.getSubmitTime(),"yyyy-MM-dd HH:mm:ss.SSS"));
					}
					sb.append(",")
					.append(String.valueOf(sss.getScore()))
					.append(",");
					SubmitStatusEnum se = SubmitStatusEnum.getStatus(sss.getSubmitStatus());
					if(se==null){
						sb.append("---");
					}else{
						sb.append(se.getMsg());
					}
					sb.append(",")
					.append(sss.getTeacherName()==null?"---":sss.getTeacherName());
					datas.add(sb.toString());
				}
				return datas;
			}
			
	private static String coverter(String slice){
		switch(slice){
		 case "A":
			return "1-2节";
		 case "B":
				return "3-4节";
		 case "C":
				return "中午";
		 case "D":
				return "5-6节";
		 case "E":
				return "7-8节";
		 case "F":
				return "9-10节";
		default:
			return "---";
		}
}
	
	
	
	
	
}
