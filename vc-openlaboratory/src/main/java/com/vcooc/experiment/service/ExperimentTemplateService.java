package com.vcooc.experiment.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentTemplate;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.experiment.mapper.ExperimentMapper;
import com.vcooc.experiment.mapper.ExperimentTemplateMapper;

import cn.hutool.core.util.StrUtil;

@Service
public class ExperimentTemplateService {
	
	@Autowired
	private ExperimentTemplateMapper experimentTemplateMapper;
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	@Autowired
	private ExperimentMapper experimentMapper;
	@PropertyConfig
	private String  VS_EXPERIMENT;

	@PropertyConfig
	private String FRONT_URL;
	@PropertyConfig
	private String REPLACE_URL;
	
	
	/**添加模板
	 * @param ext
	 * @param teacherInfo 
	 * @param req 
	 */
	public void addTemplate(Integer exId, HttpServletRequest req, TeacherInfo teacherInfo) {
		
		ExperimentTemplate et = new ExperimentTemplate();

		//获取该实验是否存在模板，如果存在则不可再添加
		et.setExperimentalId(exId);
		List<ExperimentTemplate> ets = experimentTemplateMapper.select(et);
		if(ets.size()!=0){
			throw new RuntimeException("该实验已经存在模板，不可再添加！");
		}
		et.setExperimentalId(exId);
		et.setTeacherInfoId(teacherInfo.getId());
		et.setCreateTime(new Date());
		et.setUpdateTime(new Date());
		
		experimentTemplateMapper.insert(et);
		
		Experiment e = experimentMapper.selectByPrimaryKey(exId);
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),
				"启用了《" + e.getExperimentName() + "》的实验模板", 7);
		teacherLogInformationService.saveSelective(record);
	}


	/**
	 * 根据模板id查询模板数据
	 * @param etId
	 * @return
	 */
	public ExperimentTemplate UpdateTemplatePage(Integer etId) {
		ExperimentTemplate et = experimentTemplateMapper.selectByPrimaryKey(etId);
		return et;
	}
	
	/**
	 * 根据实验id查询模板数据
	 * @param etId
	 * @return
	 */
	public ExperimentTemplate getTemplatePage(Integer exId) {
		ExperimentTemplate et = new ExperimentTemplate();
		et.setExperimentalId(exId);
		List<ExperimentTemplate> ets = experimentTemplateMapper.select(et);
		//进行路径转换
		for (int i = 0; i < ets.size(); i++) {
			if(ets.get(i).getContent()!=null) {
				//获取到文本进行解析
				if(ets.get(i).getContent().contains(FRONT_URL)){
					//查找的字段 
					String A=FRONT_URL;
					 //替换的字段
					String B=REPLACE_URL;
					//替换前的字段
					String C = ets.get(i).getContent();
					//替换后的字段
					String D = StrUtil.replace(C, A, B);
					ets.get(i).setContent(D);
					et = this.returnObject(et,ets);
				}else {
					et = this.returnObject(et,ets);
				}
			}
			
		}
		return et = this.returnObject(et,ets);
	}


	/**
	 * 报存修改的模板
	 * @param ext
	 * @param teacherInfo 
	 * @param req 
	 */
	public void updateTemplate(ExperimentTemplate ext, HttpServletRequest req, TeacherInfo teacherInfo) {
		try {
			ExperimentTemplate et = new ExperimentTemplate();
			
			
			if(ext.getId()!=null){
				et.setId(ext.getId());
			}else{
				throw new RuntimeException("模板ID为空,请先添加！");
			}
			
			if(!ext.getContent().isEmpty()){
				
				et.setContent(ext.getContent());
			}else{
				throw new RuntimeException("模板内容不能为空");
			}
			if(ext.getExperimentalId()!=null){
				
				et.setExperimentalId(ext.getExperimentalId());
			}else{
				throw new RuntimeException("缺少实验ID数据");
			}
			if(teacherInfo.getId()!=null){
				
				et.setTeacherInfoId(teacherInfo.getId());
			}else{
				throw new RuntimeException("数据异常");
			}
			/*if(!ext.getTitle().isEmpty()){
				et.setTitle(ext.getTitle());
			}else{
				throw new RuntimeException("模板标题不能为空");
			}*/
			et.setUpdateTime(new Date());
			et.setCreateTime(new Date());
			
			
		experimentTemplateMapper.updateByPrimaryKey(et);	
		
		Experiment e = experimentMapper.selectByPrimaryKey(ext.getExperimentalId());
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),
				"修改了《" + e.getExperimentName() + "》的实验模板", 7);
		teacherLogInformationService.saveSelective(record);
		
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}


	/**
	 * 删除模板
	 * @param etId
	 */
	public void deleteTemplate(Integer etId) {
		try {
			experimentTemplateMapper.deleteByPrimaryKey(etId);
			
		} catch (Exception e) {
			throw new RuntimeException("删除模板异常");
		}
	}


	/**根据实验id获取到模板的内容
	 * @param experimentId
	 * @return
	 */
	public ExperimentTemplate gettemplateInfo(Integer experimentId) {
		ExperimentTemplate et = new ExperimentTemplate();
		et.setExperimentalId(experimentId);
		List<ExperimentTemplate> ets = experimentTemplateMapper.select(et);
		
		for (int i = 0; i < ets.size(); i++) {
			et = ets.get(i);
		}
		return et;
	}


	public String getTemplatePath(TeacherInfo teacherInfo) {
		// TODO Auto-generated method stub
		return VS_EXPERIMENT+"/resource/"+"/template/"+teacherInfo.getName()+"/"+RandomUtils.nextInt(100,99999);
	}


	/**
	 * 根据实验模板删除Id
	 * @param exId
	 * @param teacherInfo 
	 * @param req 
	 */
	public void deleteTemplateExId(Integer exId, HttpServletRequest req, TeacherInfo teacherInfo) {
		ExperimentTemplate et = new ExperimentTemplate();
		et.setExperimentalId(exId);
		List<ExperimentTemplate> ets = experimentTemplateMapper.select(et);
		for (int i = 0; i < ets.size(); i++) {
			et = ets.get(i);
		}
		experimentTemplateMapper.deleteByPrimaryKey(et.getId());	
		Experiment e = experimentMapper.selectByPrimaryKey(exId);
		// 7指定为开放预约实验(接口写死)
		TeacherLogInformation record = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),
				"删除了《" + e.getExperimentName() + "》的实验模板", 7);
		teacherLogInformationService.saveSelective(record);
		
	}
	//list 转换为对象返回
	public ExperimentTemplate returnObject(ExperimentTemplate et ,List<ExperimentTemplate> ets){
		for (int i = 0; i < ets.size(); i++) {
			if(ets.get(i).getExperimentalId()!=null){
				et.setExperimentalId( ets.get(i).getExperimentalId());
			}
			if(ets.get(i).getId()!=null){
				et.setId( ets.get(i).getId());
			}
			if(ets.get(i).getTitle()!=null){
				et.setTitle(ets.get(i).getTitle());
			}
			if(ets.get(i).getContent()!=null){
				et.setContent(ets.get(i).getContent());
			}
			if(ets.get(i).getCreateTime()!=null){
				et.setCreateTime(ets.get(i).getCreateTime());
			}
			if(ets.get(i).getTeacherInfoId()!=null){
				et.setTeacherInfoId(ets.get(i).getTeacherInfoId());	
			}
			if(ets.get(i).getUpdateTime()!=null){
				et.setUpdateTime(ets.get(i).getUpdateTime());	
			}			
		}
	
		return et;
	}
	

}
