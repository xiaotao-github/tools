package com.vcooc.util.convertor;


public class SubmitExperimentFileDataTableUtils {
	public static String getSortCol(Integer col){
		switch (col) {
		case 1://学号
			return "username";
		case 2://学院	
			return "department_name";
		case 3://班级
			return "class_name";
		case 4://课程
			return "course_name";
		case 5://实验
			return "experiment_name";
		case 7://实验状态
			return "start_time";
		case 8://批改状态
			return "submit_status";
		case 9://导出状态
			return "other_file";
		case 10://导出状态
			return "teacher_name";	
			
		default:
			return "experiment_name";
		}
	}
	
	/*public static String searchConver(String search){
		if(StringUtil.isNotEmpty(search)){
			switch (search) {
			case "进行中":
				return "one";
			case "待批改":
				return "two";
			case "已完成":
				return "three";
			case "重做中":
				return "four";
			default:
				return search.replace(" ","");
			}
		}else{
			return search;
		}
	}*/
}
