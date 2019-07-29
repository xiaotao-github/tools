package com.vcooc.experiment.service.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.dto.ClockingInDTO;
import com.vcooc.experiment.dto.ScheduleDTO;
import com.vcooc.experiment.dto.ScheduleStudentScoreExcelDTO;
import com.vcooc.experiment.enums.StealthEnum;
import com.vcooc.experiment.mapper.ScheduleStudentScoreMapper;
import com.vcooc.experiment.service.CourseScheduleService;
import com.vcooc.experiment.service.ExperimentLabService;
import com.vcooc.experiment.service.ScheduleStudentScoreService;
import com.vcooc.util.convertor.CourseScheduleToScheduleDTO;
import com.vcooc.util.convertor.ScheduleStudentSocreToClockDTOConvertor;

import cn.hutool.Hutool;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;

@Service
public class ExperimentLabWebService {
	@Autowired
	private ExperimentLabService experimentLabService;
	@Autowired
	private ClockinConfig clockinConfig;
	@Autowired
	private CourseScheduleService courseScheduleService;
	@Autowired
	private ScheduleStudentScoreMapper scheduleStudentScoreMapper;
	
	
	//1.查询实验室信息  包括管理员信息
	//2.查询当前实验室今天  -- 当前课程信息 -- 任课教师  --上课班级  --
	
	
	/**
	 * 根据实验id 查询实验信息 包括实验室管理员  工位数等
	 * @param labId
	 * @return
	 */
	public ExperimentLab getExperimentLabById(Integer labId){
		ExperimentLab experimentLab = experimentLabService.AselectById(labId);
		if(experimentLab==null){
			throw new RuntimeException("无实验室信息");
		}
		return experimentLab;
	}
	/**
	 * 根据实验室id 查询当前实验室 当天 正在进行的课程
	 * @param labId
	 * @return
	 */
	public CourseSchedule findNowCourseByLabId(Integer labId) {
		//根据当前时间 得出ABCDEF具体第几节
		Map<String,String> MapData = clockinConfig.getNowSlice();
		if(MapData.get("slice")==null){
			throw new RuntimeException("当前无课程信息");
		}
		CourseSchedule record = new CourseSchedule();
		record.setSchooltime(DateUtil.parse(DateUtil.today()+" 00:00:00"));
		record.setLabId(labId);
		record.setSlice(MapData.get("slice"));
		record.setStealth(StealthEnum.SHOW.getCode());
		List<CourseSchedule> select = courseScheduleService.select(record);
		if(CollectionUtil.isEmpty(select)){
			throw new RuntimeException("当前无课程信息");
		}
		CourseSchedule courseSchedule = select.get(0);
		if(courseSchedule==null){
			throw new RuntimeException("当前无课程信息");
		}
		//查询当前课程表的课程信息 任课教师  上课班级
		CourseSchedule result = courseScheduleService.selectCourseScheduleInfo(courseSchedule.getScheduleId());
		result.setIsNow(Integer.parseInt(MapData.get("isNow")));
		if(result==null||result.getExperimentCourse()==null){
			throw new RuntimeException("当前无课程信息");
		}
		//格式化上课时间
		result.setAttendTime(clockinConfig.getTime(result.getSlice()));
		//获取上课班级
		result.setTbClassList(courseScheduleService.getClassListByScheduleId(result.getScheduleId(),result.getType()));
 		return result;
	}
	/**
	 * 根据课程表id查询学生考勤信息
	 * @param shceduleId
	 * @return
	 */
	public Map<String, List<ClockingInDTO>> selectClockInByScheduleId(Integer shceduleId) {
		List<ScheduleStudentScore> scoreList = scheduleStudentScoreMapper.selectScoreByScheduleId(shceduleId);
		if(scoreList==null || scoreList.isEmpty()){
			throw new RuntimeException("当前无课程考勤信息");
		}
		//转换
		Map<String, List<ClockingInDTO>> convertor = ScheduleStudentSocreToClockDTOConvertor.convertor(scoreList);
		return convertor;
	}
	/**
	 * 
	 * @param labId 实验室id
	 * @return
	 */
	public List<ScheduleDTO> selectLabSchedule(Integer labId) {
		DateUtil.beginOfWeek(DateUtil.date());
		List<CourseSchedule> courseScheduleList = courseScheduleService.selectLabScheduleByDate(DateUtil.beginOfWeek(DateUtil.date()),DateUtil.endOfWeek(DateUtil.date()),labId);
		if(CollectionUtil.isEmpty(courseScheduleList)){
			throw new RuntimeException("无课程安排信息");
		}else{
			//转换数据
			return CourseScheduleToScheduleDTO.convertor(courseScheduleList);
		}
	}
}
