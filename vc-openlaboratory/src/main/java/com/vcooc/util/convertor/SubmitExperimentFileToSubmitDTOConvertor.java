package com.vcooc.util.convertor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.vcooc.base.pojo.SubmitExperimentFile;
import com.vcooc.common.util.CookieUtils;
import com.vcooc.experiment.dto.SubmitDTO;
/**
 * 转换工具 将 SubmitExperimentFile 转换为 SubmitDTO
 * @author Administrator
 *
 */
public class SubmitExperimentFileToSubmitDTOConvertor {
	
	
	public static List<SubmitDTO> convertor(List<SubmitExperimentFile> submitExperimentFiles,Map<String,String> map,Integer menuParam,HttpServletRequest request){
		List<SubmitDTO> submitDTOs = new ArrayList<>();
		String prefixUrl = CookieUtils.getCookieValue(request, "VS_EXPERIMENT");
		if(prefixUrl==null){
			prefixUrl = (String) request.getSession().getAttribute("VS_EXPERIMENT");
		}
		
		switch (menuParam) {
		case 1://所有成绩
			if(map.get("批阅学生实验成绩(所有)")!=null && map.get("删除学生实验成绩(所有)") !=null ){
				submitDTOs = convertor1(submitExperimentFiles,prefixUrl);
			}else if(map.get("批阅学生实验成绩(所有)") !=null){
				submitDTOs = convertor2(submitExperimentFiles,prefixUrl);
			}else if(map.get("删除学生实验成绩(所有)") !=null){
				submitDTOs = convertor3(submitExperimentFiles,prefixUrl);
			}else{
				submitDTOs = convertor4(submitExperimentFiles);
			}
			break;
		case 2://院系成绩
			if(map.get("批阅学生实验成绩(院系)")!=null && map.get("删除学生实验成绩(院系)") !=null ){
				submitDTOs = convertor1(submitExperimentFiles,prefixUrl);
			}else if(map.get("批阅学生实验成绩(院系)") !=null){
				submitDTOs = convertor2(submitExperimentFiles,prefixUrl);
			}else if(map.get("删除学生实验成绩(院系)") !=null){
				submitDTOs = convertor3(submitExperimentFiles,prefixUrl);
			}else{
				submitDTOs = convertor4(submitExperimentFiles);
			}
			 break;
		case 3:	//我的学生成绩
			if(map.get("批阅学生实验成绩(个人)")!=null && map.get("删除学生实验成绩(个人)") !=null ){
				submitDTOs = convertor1(submitExperimentFiles,prefixUrl);
			}else if(map.get("批阅学生实验成绩(个人)") !=null){
				submitDTOs = convertor2(submitExperimentFiles,prefixUrl);
			}else if(map.get("删除学生实验成绩(个人)") !=null){
				submitDTOs = convertor3(submitExperimentFiles,prefixUrl);
			}else{
				submitDTOs = convertor4(submitExperimentFiles);
			}
			 break;
		}
		return submitDTOs;
	}
	
	
	
	
	
	//所有权限 convertor1
	private static List<SubmitDTO> convertor1(List<SubmitExperimentFile> submitExperimentFiles,String  prefixUrl){
		List<SubmitDTO> submitDTOs = new ArrayList<>();
		if(!CollectionUtils.isEmpty(submitExperimentFiles)){
			for (SubmitExperimentFile temp : submitExperimentFiles) {
				SubmitDTO submitDTO = packageConverter(temp);
				//批阅、删除
				StringBuilder sb = new StringBuilder();
				sb.append("<a style='text-decoration: none;' data-href='"+prefixUrl+"/submitExperimentFileController/selectStudentSubmitReportById/"+temp.getSubmitExperimentFileId()+"' data-title='批阅("+temp.getStudentSubmitter().getName()+")' onclick='Hui_admin_tab(this);' title='批阅'><i class='experimentFont'>&#xe672;</i></a>")
				 .append("<a style='text-decoration: none;' href='#'  onclick='itemReport_uploadOne("+temp.getSubmitExperimentFileId()+");' title='生成实验报告'><i class='experimentFont'>&#xe639;</i></a>")
				.append("<a	style='text-decoration: none;color:#9a4346' onclick=\"submitter_file_del(this,'"+prefixUrl+"/submitExperimentFileController/deleteSubmitReportById/"+temp.getSubmitExperimentFileId()+"')\" title='删除'><i class='experimentFont'>&#xe627;</i></a>");
				submitDTO.setOperation(sb.toString());
				submitDTOs.add(submitDTO);
			}
		}
		return submitDTOs;
	}
	//批阅权限 convertor2
	private static List<SubmitDTO> convertor2(List<SubmitExperimentFile> submitExperimentFiles,String prefixUrl){
		List<SubmitDTO> submitDTOs = new ArrayList<>();
		if(!CollectionUtils.isEmpty(submitExperimentFiles)){
			for (SubmitExperimentFile temp : submitExperimentFiles) {
				SubmitDTO submitDTO = packageConverter(temp);
				//批阅、删除
				StringBuilder sb = new StringBuilder();
				sb.append("<a style='text-decoration: none;' data-href='"+prefixUrl+"/submitExperimentFileController/selectStudentSubmitReportById/"+temp.getSubmitExperimentFileId()+"' data-title='批阅("+temp.getStudentSubmitter().getName()+")' onclick='Hui_admin_tab(this);' title='批阅'><i class='experimentFont'>&#xe672;</i></a>")
				 .append("<a style='text-decoration: none;' href='#'  onclick='itemReport_uploadOne("+temp.getSubmitExperimentFileId()+");' title='生成实验报告'><i class='experimentFont'>&#xe639;</i></a>");
				submitDTO.setOperation(sb.toString());
				submitDTOs.add(submitDTO);
			}
		}
		return submitDTOs;
	}
	//删除权限 convertor3
	private static List<SubmitDTO> convertor3(List<SubmitExperimentFile> submitExperimentFiles,String prefixUrl){
		List<SubmitDTO> submitDTOs = new ArrayList<>();
		if(!CollectionUtils.isEmpty(submitExperimentFiles)){
			for (SubmitExperimentFile temp : submitExperimentFiles) {
				SubmitDTO submitDTO = packageConverter(temp);
				//批阅、删除
				StringBuilder sb = new StringBuilder();
				sb.append("<a	style='text-decoration: none;color:#9a4346' onclick=\"submitter_file_del(this,'"+prefixUrl+"/submitExperimentFileController/deleteSubmitReportById/"+temp.getSubmitExperimentFileId()+"')\" title='删除'><i class='experimentFont'>&#xe627;</i></a>")
				 .append("<a style='text-decoration: none;' href='#'  onclick='itemReport_uploadOne("+temp.getSubmitExperimentFileId()+");' title='生成实验报告'><i class='experimentFont'>&#xe639;</i></a>");
				submitDTO.setOperation(sb.toString());
				submitDTOs.add(submitDTO);
			}
		}
		return submitDTOs;
	}
	
	//无权限 convertor4
	private static List<SubmitDTO> convertor4(List<SubmitExperimentFile> submitExperimentFiles){
		List<SubmitDTO> submitDTOs = new ArrayList<>();
		if(!CollectionUtils.isEmpty(submitExperimentFiles)){
			for (SubmitExperimentFile temp : submitExperimentFiles) {
				SubmitDTO submitDTO = packageConverter(temp);
				//批阅、删除
				StringBuilder sb = new StringBuilder();
				sb.append(" ");
				submitDTO.setOperation(sb.toString());
				submitDTOs.add(submitDTO);
			}
		}
		return submitDTOs;
	}
	
	
	private static SubmitDTO packageConverter(SubmitExperimentFile temp ){
		SubmitDTO submitDTO = new SubmitDTO();
		//选择框
		submitDTO.setCheckBox("<input type='checkbox' name='checkbox' thisid='"+temp.getSubmitExperimentFileId()+"'>");
		//学生学号(姓名)
		submitDTO.setStudentNumberName(temp.getStudentSubmitter().getUsername()+"("+temp.getStudentSubmitter().getName()+")");
		//所属院系
		submitDTO.setDepartmentName(temp.getStudentSubmitter().getDepartmentName());
		//所属班级
		submitDTO.setClassName(temp.getStudentSubmitter().getClassName());
		//所属课程
		submitDTO.setCourseName(temp.getExperimentCourse().getCourseName());
		//实验名称
		submitDTO.setExperimentName(temp.getExperiment().getExperimentName());	
		//小组名称
		submitDTO.setGroupName(temp.getExperimentGroup().getGroupName());
		//实验状态
		switch (temp.getExperimentGroup().getExperimentStatus()) {
		case 1:
			submitDTO.setExperimentStatus("即将开始");
			break;
		case 2:
			submitDTO.setExperimentStatus("进行中");
			break;
		default:
			submitDTO.setExperimentStatus("已过期");
			break;
		}
		//批改状态
		switch (temp.getSubmitStatus()) {
		case 1:
			submitDTO.setCheckStatus("进行中");
			break;
		case 2:
			submitDTO.setCheckStatus("待批改");
			break;
		case 3:
			submitDTO.setCheckStatus("已完成("+temp.getScore()+"分)");
			break;
		case 4:
			submitDTO.setCheckStatus("重做中...");
			break;
		}				
		//导出状态
		if(StringUtils.isNotEmpty(temp.getOtherFile())){
			submitDTO.setExportStatus("已导出");
		}else{
			submitDTO.setExportStatus("未导出");
		}
		//指导老师
		if(temp.getTeacherInfo()!=null){
			submitDTO.setInstructor(temp.getTeacherInfo().getName());
		}
		return submitDTO;
	}
	
	
	 /**
     * 将实验报告转换为字符串类型的html格式
     * @return
     */
    
    public static List<Map<String, Object>> toHtml(List<SubmitExperimentFile> list){
    	List<Map<String, Object>> strList = new ArrayList<Map<String, Object>>();
    	
    	for (SubmitExperimentFile per : list) {
    		String goodReport="";
    		if(per.getGoodReport()==null){
    			goodReport="";
    		}else if(per.getGoodReport().equals(0)){
    			goodReport="否";
    		}else if(per.getGoodReport().equals(1)){
    			goodReport="是";
    		}
    		
    		String score  = per.getScore()==null?"":Double.toString(per.getScore());
    		String remark = per.getRemark()==null?"":per.getRemark();
			Map<String, Object> map = new HashMap<String, Object>();
    		String str=
    				"<table border='1' class='stuInfoTable'>"+
			"<tbody><tr>"+
				"<td>学院</td>"+
				"<td>"+per.getStudentSubmitter().getDepartmentName()+"</td>"+
				"<td>班级</td>"+
				"<td>"+per.getStudentSubmitter().getClassName()+"</td>"+
			"</tr>"+
			"<tr>"+
				"<td>姓名</td>"+
				"<td>"+per.getStudentSubmitter().getName()+"</td>"+
				"<td>学号</td>"+
				"<td>"+per.getStudentSubmitter().getUsername()+"</td>"+
		  " </tr>"+
			"<tr>"+
				"<td>课程</td>"+
				"<td>"+per.getExperimentCourse().getCourseName()+"</td>"+
				"<td>实验名称</td>"+
				"<td>"+per.getExperiment().getExperimentName()+"</td>"+
			"</tr>"+
			"<tr>"+
				"<td>指导教师</td>"+
				"<td>"+per.getTeacherInfo().getName()+"</td>"+
				"<td>提交时间</td>"+
				"<td>"+per.getUpdateTimeToString() +"</td>"+
				"</tr>"+
				"<tr>"+
					"<td>评分</td>"+
					"<td>"+score+"</td>"+
					"<td>是否优秀</td>"+
					"<td>"+(goodReport==""?"未知":goodReport)+"</td>"+
					"</tr>"+
					"<tr>"+
					"<td>评语</td>"+
					"<td colspan='3'>"+(remark==""?"暂无":remark)+"</td>"+
					"</tr>"+
		"</tbody>"+
	"</table>"+
		"<p></p>"+
		per.getLabReport();
		 /*"<p class='secondTitle' style='text-align:left;'><span>是否优秀:"+goodReport+"</span></p>"+
		 "<p class='secondTitle' style='text-align:left;'><studentsubmit-edit-subspan>评分："+score+"</studentsubmit-edit-subspan></p>"+
		 "<p class='secondTitle ' style='text-align:left;'><span>评语："+remark+"</span></p>";*/
    		map.put("report", str);
    		map.put("fileName", per.getStudentSubmitter().getMajorName()+per.getStudentSubmitter().getClassName()+"-"+per.getStudentSubmitter().getUsername()+per.getStudentSubmitter().getName()+"《"+per.getExperiment().getExperimentName()+"》");
    		strList.add(map);
    	}
    	return strList;
    }
    
	
}
