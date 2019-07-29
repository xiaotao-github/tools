package com.vcooc.experiment.service;


import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentStep;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.dto.ExperimentStepDTO;
import com.vcooc.experiment.mapper.ExperimentMapper;
import com.vcooc.experiment.mapper.ExperimentStepMapper;

@Service
public class ExperimentStepService {
         @Autowired
         private ExperimentStepMapper experimentStepMapper;
         @Autowired
         private ExperimentMapper experimentMapper;
         @PropertyConfig
         private String FILE_PATH;
         @PropertyConfig
         private String VS_EXPERIMENT;
         
         /**
          * 创建实验步骤资源路径
          * @param experimentId
          * @param teacherInfo
          * @return
          */
         public String createExperimentStepFilePath(Integer experimentId,TeacherInfo teacherInfo){
        	 String filePath="";
        	 Experiment experiment = experimentMapper.selectByPrimaryKey(experimentId);
             filePath=VS_EXPERIMENT+"/实验资源/"+teacherInfo.getName()+"/"+experiment.getExperimentName()+"/实验步骤资源/"+System.currentTimeMillis()+"/"+RandomUtils.nextInt(0,999)+"".replaceAll(" ", "").trim();
             return filePath;
         }
         
         
         /**
          * 添加实验步骤
          * @param record
          * @param teacherInfo
          */
         public void addStep(ExperimentStep record){
        	 checkStep(record);
        	 record.setCreateTime(new Date());
        	 record.setUpdateTime(record.getCreateTime());
        	 experimentStepMapper.insertSelective(record);
         }
         /**
          * 批量添加实验步骤
          */
         public void addSteps(List<ExperimentStep> steps,Integer experimentId,String filePath){
        	 if(CollectionUtils.isEmpty(steps)){
        		 throw new RuntimeException("【添加实验步骤】 实验步骤不能为空");
        	 }
	    	for (ExperimentStep experimentStep : steps) {
	    		 experimentStep.setExperimentId(experimentId);
	    		 experimentStep.setFilePath(filePath);
	    		 checkStep(experimentStep);
	    		 experimentStep.setStealth(2);
			}
	    	experimentStepMapper.addSteps(steps);
         }
         
         /**
          * 修改实验步骤信息
          * @param record
          */
         public void modifyStep(ExperimentStep record){
        	 checkStep(record);
        	 record.setUpdateTime(new Date());
        	 experimentStepMapper.updateByPrimaryKeySelective(record);
         }
         /**
          * 校验实验步骤信息是否正确,不正确抛出异常
          * @param experimentStep
          */
         public void checkStep(ExperimentStep experimentStep){
        	 if(StringUtil.isEmpty(experimentStep.getTitle())){
        		 throw new RuntimeException("【实验步骤】步骤标题不能为空");
        	 }
        	 if(StringUtil.isEmpty(experimentStep.getContent())){
        		 throw new RuntimeException("【实验步骤】步骤内容不能为空");
        	 }
        	 if(StringUtil.isEmpty(experimentStep.getContentText())){
        		 throw new RuntimeException("【实验步骤】步骤内容纯文本不能为空");
        	 }
        	 if(StringUtil.isEmpty(experimentStep.getExperimentId()+"")){
        		 throw new RuntimeException("【实验步骤】实验ID不能为空");
        	 }
         }
         
         /**
          * 修改实验步骤伪删除字段
          * @param record
          */
         public void modifyStepStealth(ExperimentStep record){
        	 if(record.getStepId()==null || record.getStealth()==null){
        		 throw new RuntimeException("获取信息失败,请重新操作！");
        	 }
        	 record.setUpdateTime(new Date());
        	 experimentStepMapper.updateByPrimaryKeySelective(record);
         }
         
         /**
          * 根据id查询步骤信息
          * @param id
          * @return
          */
         public ExperimentStep selectStepById(Integer id){
        	 return experimentStepMapper.selectByPrimaryKey(id);
         }
         
         
         /**
          * 根据实验室和步骤编号,验证步骤编号
          * @param experimentId
          * @param stepNum  步骤编号不能为null,可传入0或者-1
          * @return
          */
         public boolean ValidateStepNum(Integer experimentId, Integer stepNum){
        	 ExperimentStep experimentStep = new ExperimentStep();
        	 experimentStep.setExperimentId(experimentId);
        	 experimentStep.setStepNum(stepNum);
        	 List<ExperimentStep> list = experimentStepMapper.select(experimentStep);
        	 return list != null && list.size()>0 ?  false:true;
         }

         /**
          * 根据实验id，查询实验下的步骤信息
          * @param experimentId
          * @return
          */
		public List<ExperimentStep> selectExperimentStepByExperimentId(Integer experimentId) {
			if(experimentId==null){
				throw new RuntimeException("【查询实验下的步骤】实验id不能为空");
			}
			return experimentStepMapper.selectByExperimentId(experimentId);
		}

		/**
		 * 批量修改实验下的实验步骤
		 * @param stepDTO
		 * @param experimentId
		 */
		public void updateExperimentStepByExperimentId(List<ExperimentStep> experimentSteps
				, Integer experimentId
				,String filePath) {
			//1.校验实验id不能为空
			if(experimentId==null){
				throw new RuntimeException("【修改实验步骤】实验id为空");
			}
			if(filePath==null){
				throw new RuntimeException("【修改实验步骤】资源存放路径为空");
			}
			//2.校验实验步骤数据
			for (ExperimentStep experimentStep : experimentSteps) {
				experimentStep.setExperimentId(experimentId);
				experimentStep.setStealth(2);
				experimentStep.setFilePath(filePath);
				checkStep(experimentStep);
			}
			//3.删除原先的实验步骤
			experimentStepMapper.deleteByExperimentId(experimentId);
			//4.将新的实验步骤插入到实验中
			experimentStepMapper.addSteps(experimentSteps);
		}
         
}
