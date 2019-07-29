package com.vcooc.experiment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.ExperimentStep;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.dto.ExperimentStepDTO;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ExperimentStepService;

@Controller
@RequestMapping("experimentStepController")
public class ExperimentStepController extends BaseController{
          @Autowired
          private ExperimentStepService experimentStepService;
          @Autowired
          private ExperimentService experimentService;
	
          /**
           * 跳转到添加步骤页面
           * @param mv
           * @param experimentId
           * @return
           */
          @RequestMapping("toAddStepPage/{experimentId}")
          public ModelAndView toAddStepPage(final @PathVariable("experimentId") Integer experimentId){
                  
         	    return VerificationUserModel(new VerificationUserModel() {
 					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
 						mv.addObject("experiment", experimentService.selectById(experimentId));
 						mv.addObject("filePath",experimentStepService.createExperimentStepFilePath(experimentId, teacherInfo));
 						//实验信息
 						mv.setViewName("admin/experiment_step_manage/");
 						return mv;
 					}
 				});
          }
          
          
          /**
           * 添加步骤信息
           * @param semester
           * @return
           */
             @RequestMapping("addStep")
             @ResponseBody
             public SysResult addStep(final ExperimentStep experimentStep){
            	 
            	 return VerificationUser(new VerificationUser() {
    				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
    					experimentStepService.addStep(experimentStep);
    					return sysResult;
    				}
    			});
           }
          
             /**
              * 跳转到步骤修改页面
              * @param mv
              * @param experimentId
              * @return
              */
             @RequestMapping("toModifyStepPage/{stepId}")
             public ModelAndView toModifyStepPage(final @PathVariable("stepId") Integer stepId){
                     
            	    return VerificationUserModel(new VerificationUserModel() {
    					
    					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
    						//步骤信息
    						ExperimentStep step = experimentStepService.selectStepById(stepId);
    						mv.addObject("stepInfo", step);
    						//实验信息
     						mv.addObject("experiment", experimentService.selectById(step.getExperimentId()));
    						
    						mv.setViewName("admin/experiment_step_manage/");
    						return mv;
    					}
    				});
             }
             /**
              * 修改步骤信息
              * @param mv
              * @param step
              * @return
              */
             @RequestMapping("modifyStep")
             @ResponseBody
             public SysResult modifyStep(final ExperimentStep step){
                     
            	 return VerificationUser(new VerificationUser() {
    				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
    					experimentStepService.modifyStep(step);
    					return sysResult;
    				}
    			});
             }
          /**
           * 伪删除步骤信息
           * @param semester
           * @return
           */
             @RequestMapping("updateStepStealth")
             @ResponseBody
             public SysResult updateStepStealth(final ExperimentStep experimentStep){
            	 
            	 return VerificationUser(new VerificationUser() {
    				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
    					experimentStepService.modifyStepStealth(experimentStep);
    					return sysResult;
    				}
    			});
           }
         /**
          * 根据实验室和步骤编号,验证步骤编号
          * @param experimentId
          * @param stepNum  步骤编号不能为null,可传入0或者-1
          * @return
          */
         @RequestMapping("validateStepNum/{experimentId}/{stepNum}")
         @ResponseBody
         public HuiValidateResult ValidateStepNum(final @PathVariable("experimentId") Integer experimentId,
        		 final @PathVariable("stepNum") Integer stepNum){
        	 return experimentStepService.ValidateStepNum(experimentId, stepNum) == true ?
        			 HuiValidateResult.ok("步骤编号可用"):HuiValidateResult.no("该步骤编号已存在");	 
         }
         /**
          * 修改实验下的实验步骤 
          * @return
          */
         @RequestMapping("updateExperimentStepByExperimentId/{menuParam}/{experimentId}")
         public String updateExperimentStepByExperimentId(ExperimentStepDTO stepDTO
        		 ,@PathVariable("experimentId")Integer experimentId
        		 ,@PathVariable("menuParam")Integer menuParam
        		 ,@RequestParam("filePath")String filePath){
        	 if(stepDTO==null){
        		 throw new RuntimeException("【修改实验步骤】步骤不能为空");
        	 }
        	 experimentStepService.updateExperimentStepByExperimentId(stepDTO.getHasData(),experimentId,filePath);
     		return "forward:/experimentController/selectExperimentToEditPage/"+experimentId+"/"+menuParam+"?status=200";
         }
}
