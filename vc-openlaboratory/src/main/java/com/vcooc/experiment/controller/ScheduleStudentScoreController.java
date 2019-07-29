package com.vcooc.experiment.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.enums.SubmitStatusEnum;
import com.vcooc.experiment.service.ScheduleStudentScoreService;
import com.vcooc.experiment.service.TeacherRemarkService;
//import com.vcooc.experiment.service.web.ExperimentLogWebService;
import com.vcooc.util.Html2WorldUtils;

/**
 * 学生实物实验表
 * @author Administrator
 *
 */
@Controller
@RequestMapping("scheduleStudentScoreController")
public class ScheduleStudentScoreController {
	
	@Autowired
	private ScheduleStudentScoreService  scheduleStudentScoreService;
    @Autowired
	private TeacherRemarkService teacherRemarkService;
//	@Autowired
//	private ExperimentLogWebService experimentLogWebService;
    
    //导出学生成绩
    @RequestMapping("exportScore")
    public void exportScore(Integer[] ids,HttpServletResponse rep){
    	try{
    		
    		scheduleStudentScoreService.exportScore(ids,rep);
    	}catch(RuntimeException ex){
    		ex.printStackTrace();
    	}
    }
    
    //根据班级导出成绩
    /**
     * @param classIds 班级id
     * @param scheduleId 课程表id
     * @param rep
     */
    @RequestMapping("exportScoreClass")
    public void exportScoreClass(Integer[] classIds,Integer scheduleId, HttpServletResponse rep){
    	try{
    		/*Integer[] classIds = {20,21};
    		Integer scheduleId= 7;*/
    		scheduleStudentScoreService.exportScoreClass(classIds,scheduleId,rep);
    	}catch(RuntimeException ex){
    		ex.printStackTrace();
    	}
    }
	
	
	/**
	 * 根据实物实验成绩id查询 学生实验报告详情 跳转到实物实验  实验报告详情页面
	 */
	@RequestMapping("selectById/{id}")
	public ModelAndView selectById(@PathVariable("id")Long id,Map<String,Object> map){
		ScheduleStudentScore scheduleStudentScore = scheduleStudentScoreService.selectById(id);
		map.put("scheduleStudentScore", scheduleStudentScore);
		//教师评语
		try {
			map.put("remarks", teacherRemarkService.selectRemark(scheduleStudentScore.getCourseSchedule().getExperimentCourse().getTeacherInfoList().get(0).getId(), 1));
		} catch (Exception e) {
			e.printStackTrace();
		}
		//改实验下的其他学生的实验成绩 --已批改
		List<ScheduleStudentScore> ScoreSu =  scheduleStudentScoreService.selectOther(scheduleStudentScore.getScheduleId(),id,SubmitStatusEnum.SUCCESS.getCode());
		//未批改
		List<ScheduleStudentScore> ScoreWait =  scheduleStudentScoreService.selectOther(scheduleStudentScore.getScheduleId(),id,SubmitStatusEnum.WAIT.getCode());
		map.put("ScoreSu", ScoreSu);
		map.put("ScoreWait", ScoreWait);
		//实验日志信息
	//	map.put("experimentLog", experimentLogWebService.selectExperimentLog(id,1));
		return new ModelAndView("admin/schedule_student_score_manage/schedule_student_score_preview_v2",map);
	}
	
	/**
	 * 批改实验成绩
	 * @param scheduleStudentScore
	 * @param studentScore
	 * @param standardId
	 * @return
	 */
	@RequestMapping("update")
	@ResponseBody
	public SysResult update(ScheduleStudentScore scheduleStudentScore,
			String studentScore,String standardId,String ids){
		try {
			scheduleStudentScoreService.update(scheduleStudentScore, studentScore, standardId,ids);
			return SysResult.ok();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return SysResult.build(202, e.getMessage());

		}
	}
	/**
	 * 生成实验报告文档
	 * @param report 实验报告
	 * @param fileName 文件名称
	 * @param submitId 提交id
	 * @param exportType 导出类型  0.文档格式  1.pdf格式
	 * @param request 
	 * @param response
	 * @return
	 */
	@RequestMapping("report2World")
	@ResponseBody
	public SysResult report2World(String report,String fileName,Integer submitId,HttpServletRequest request,HttpServletResponse response){
		if(!StringUtils.isNotEmpty(report)){
			return SysResult.build(202,"参数错误");
		}
		try {
			Html2WorldUtils.html2World(request, response, report, fileName);
			/*SubmitExperimentFile submitExperimentFile = new SubmitExperimentFile();
			submitExperimentFile.setSubmitExperimentFileId(submitId);
			submitExperimentFile.setOtherFile("1");
			submitExperimentFileService.updateSelective(submitExperimentFile);*/
			return SysResult.ok();
		} catch (IOException e) {
			e.printStackTrace();
			return SysResult.build(202, "转换失败");
		}
	}
	/**
	 * 生成实验报告PDF
	 * @param report 实验报告
	 * @param fileName 文件名称
	 * @param submitId 提交id
	 * @param exportType 导出类型  0.文档格式  1.pdf格式
	 * @param request 
	 * @param response
	 * @return
	 */
	@RequestMapping("report2PDF/{submitId}")
	public ModelAndView report2PDF(@PathVariable("submitId")Long submitId,HttpServletResponse response,Map<String,Object> map){
		ScheduleStudentScore scheduleStudentScore = scheduleStudentScoreService.selectById(submitId);
		map.put("scheduleStudentScore", scheduleStudentScore);
		return new ModelAndView("admin/schedule_student_score_manage/schedule_student_preview",map);
	}	
}
