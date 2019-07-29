package com.vcooc.experiment.service.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.ExportExcelUtil;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.ExperimentLabStatisticsWebMapper;

@Service
public class ExperimentLabStatisticsWebService {

	@Autowired
	private ExperimentLabStatisticsWebMapper experimentLabStatisticsWebMapper;

	@Autowired
	private ExperimentLabMapper experimentLabMapper;
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;

	@PropertyConfig
	private String sliceHours;

	@Autowired
	private ClockinConfig clockinConfig;

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd ");// 格式化时间

	/**
	 * @param labId
	 *            实验室Id
	 * @return 实验室
	 */
	public ExperimentLab finallById(Integer labId) {

		ExperimentLab exLab = experimentLabMapper.selectByPrimaryKey(labId);

		return exLab;
	}

	/**
	 * 统计上课的总数
	 * 
	 * @param labId
	 *            实验室Id
	 * @param type
	 *            上课类型
	 * @return
	 */
	public int finallCount(Integer labId, Integer type) {

		CourseSchedule course = new CourseSchedule();
		//不为空才进行拼接
		if (type != null & type.SIZE != 0) {
			course.setType(type);
		}
		course.setStealth(2);
		course.setLabId(labId);
		int courseCoun = courseScheduleMapper.selectCount(course);
		return courseCoun;
	}

	/**
	 * 统计实验室上课的时间
	 * 
	 * @param labId
	 *            实验室Id
	 * @param sliceHours
	 *            节数时间
	 * @return typeCountTime 时间总数（时）
	 */
	public String finallCountTime(Integer labId, Integer type) {
		Integer courseCount = courseScheduleMapper.selectCountTime(labId, type);
		double typeTime = courseCount * Double.valueOf(sliceHours);
		String typeCountTime = String.valueOf(typeTime);
		return typeCountTime;
	}

	/**
	 * 获取该实验室详细情况
	 * 
	 * @param labId
	 *            实验室Id
	 * @return
	 */
	public List<CourseSchedule> finAllStatistics(Integer labId) {

		List<CourseSchedule> ListAll = courseScheduleMapper.selectfinAllTeacherCourseTypeCalssList(labId);
		for (CourseSchedule courseSchedule : ListAll) {
			// 将标识符转换为详细字节
			if (courseSchedule.getSlice().equals("A")) {
				courseSchedule.setSliceByte("1-2节");
			} else if (courseSchedule.getSlice().equals("B")) {
				courseSchedule.setSliceByte("3-4节");
			} else if (courseSchedule.getSlice().equals("C")) {
				courseSchedule.setSliceByte("午休");
			} else if (courseSchedule.getSlice().equals("D")) {
				courseSchedule.setSliceByte("5-6节");
			} else if (courseSchedule.getSlice().equals("E")) {
				courseSchedule.setSliceByte("7-8节");
			} else if (courseSchedule.getSlice().equals("F")) {
				courseSchedule.setSliceByte("9-10节");
			}
			// 将 字节[A...]转换为时间
			String time = clockinConfig.getTime(courseSchedule.getSlice());
			courseSchedule.setSlice(time);
		}

		return ListAll;
	}

	/**
	 * 获取上课时长
	 * 
	 * @return
	 */
	public String getClassTime() {

		return sliceHours;
	}

	/**
	 * 统计某一个班级某一种类型 实验室上课的时间
	 * 
	 * @param labId
	 *            实验室Id
	 * @param type
	 *            类型
	 * @param sliceHours
	 *            节数时间
	 * @return typeCountTime 时间总数（时）
	 */
	public String finallCountClassTypeTime(Integer classId, Integer type) {
		Integer courseCount = courseScheduleMapper.selectCountClassTypeTime(classId, type);
		double typeTime = courseCount * Double.valueOf(sliceHours);
		String typeCountTime = String.valueOf(typeTime);
		return typeCountTime;
	}

	/**
	 * 根据实验室Id查询数据导出数据
	 * @param thId 
	 * 
	 * @param fileName：文件名
	 * @throws Exception
	 */

	public boolean exportData(HttpServletResponse response, HttpServletRequest request, Integer labId, Integer thId) throws Exception {
		List<CourseSchedule> cs = null ;
		//教师为空 导出全部
		if(thId==null){
			cs = courseScheduleMapper.selectfinAllTeacherCourseTypeCalssList(labId);
			//否则导出教师跟实验室同等条件的数据
		}else{
			cs = courseScheduleMapper.selectFinMyCourseTypeCalssList(labId,thId);
		}
		//预约课程批量导出公共方法
		publicDataCourseList(response,request,cs);
		
		return true;
	}
	
	//预约课程批量导出公共方法
	public void publicDataCourseList(HttpServletResponse response, HttpServletRequest request,List<CourseSchedule> csList) throws Exception{
		// 设置excel表格头部
		String[] headers = { "实验室的使用类型", "上课教师", "上课课程", "上课时间", "使用对象", "班级人数", "使用时长" };
		List<String> courseScheduleInfo = new ArrayList<String>();
		// 将查询的信息放入集合中
		List<CourseSchedule> cs = csList ;
		// 调用相同的方法
		/*if(thId==null){
			cs = courseScheduleMapper.selectfinAllTeacherCourseTypeCalssList(labId);
			
		}else{
			cs = courseScheduleMapper.selectFinMyCourseTypeCalssList(labId,thId);
		}*/
		// 集合为空抛异常
		if (null == cs || cs.size() == 0) {
			throw new RuntimeException("导出结果为空");
		}
		String str = "";
		// 遍历集合
		for (int i = 0; i < cs.size(); i++) {
			// 校验对象中的信息是否为空
			validateExportStudentInfo(cs.get(i));
			// 将对象转换为字符串
			str = ObjToStr(cs.get(i));
			// 将字符串添加到courseScheduleInfo集合中
			courseScheduleInfo.add(str);
		}
		// 导出数据
		ExportExcelUtil.exportExcel(response, headers, courseScheduleInfo, "实验详情统计表");
		
	}


	// 校验批量导出的信息
	public void validateExportStudentInfo(CourseSchedule courseSchedule) throws Exception {
		if (courseSchedule == null || courseSchedule.getClass().getName() == null
				|| courseSchedule.getTeacherInfo().getName() == null
				|| courseSchedule.getExperimentCourse().getCourseName() == null || courseSchedule.getType() == null
				|| courseSchedule.getSchooltime() == null || courseSchedule.getSlice() == null) {
			throw new RuntimeException("导出数据异常，请检查后重新操作");
		}

	}

	// 将对象转换为字符串
	public String ObjToStr(CourseSchedule courseSchedule) {
		String type = "";
		if (courseSchedule.getType() == 1) {
			type = "整班上课";
		} else if (courseSchedule.getType() == 2) {
			type = "小组协作";
		} else if (courseSchedule.getType() == 3) {
			type = "自主预约";
		} else if (courseSchedule.getType() == 4) {
			type = "私人课程";
		} else {
			type = "数据错误";
		}
		// 时间转换
		String newSchooltime = "";
		if (courseSchedule.getSlice().equals("A")) {
			// 将 字节[A...]转换为时间 2018-02-13-08:30:00-10:00:00-1-2节
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "1-2节";
		} else if (courseSchedule.getSlice().equals("B")) {
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "3-4节";
		} else if (courseSchedule.getSlice().equals("C")) {
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "午休";

		} else if (courseSchedule.getSlice().equals("D")) {
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "5-6节";

		} else if (courseSchedule.getSlice().equals("E")) {
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "7-8节";

		} else if (courseSchedule.getSlice().equals("F")) {
			newSchooltime = sdf.format(courseSchedule.getSchooltime()) + " - "
					+ clockinConfig.getTime(courseSchedule.getSlice()) + " - " + "9-10节";
		} else {
			newSchooltime = "数据错误";
		}

		String courseScheduleList = "";
		courseScheduleList = type + "," + // 上课的类型
				courseSchedule.getTeacherInfo().getName() + "," + // 教师名称
				courseSchedule.getExperimentCourse().getCourseName() + "," + // 课程名称
				newSchooltime + // 上课时间
				","+
				courseSchedule.getTbClassList().get(0).getName() + ","// 班级名称
				+ courseSchedule.getTbClassList().get(0).getMemberNum()// 班级人数
				+"," + sliceHours;  // 上课时长
				
		
		return courseScheduleList;
	}

	/**
	 * 获取状态码，用户判断该实验室轮播图片还是视频
	 * 
	 * @param labId
	 *            实验室id 状态为可用 并且是显示的内容！
	 * @return
	 */
	public ExperimentLab getStateCode(Integer labId) {
		ExperimentLab exLab = new ExperimentLab();
		exLab.setLabId(labId);
		exLab.setStealth(2);
		exLab.setLabStatus(1);
		return experimentLabMapper.selectByPrimaryKey(exLab);
	}

	/**
	 * 统计当前操作者的课表总数
	 * @param labId
	 * @param thId
	 * @return
	 */
	public Integer selectCountMyCounrse(Integer labId, Integer thId) {
		Integer cs = courseScheduleMapper.selectFinMyCourseNumber(labId,thId);
		return cs;
	}

	/**
	 * 导出教师预约过的所有课程
	 * @param response
	 * @param request
	 * @param thId
	 * @throws Exception 
	 */
	public void exportMyAllLabdata(HttpServletResponse response, HttpServletRequest request, Integer thId) throws Exception {
		// TODO Auto-generated method stub
		List<CourseSchedule> cs = courseScheduleMapper.exportMyAllLabdata(thId);
		//预约课程批量导出公共方法
		publicDataCourseList(response,request,cs);
	}

}
