package com.vcooc.experiment.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Semester;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.HuiValidateResult;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.service.SemesterService;


@Controller
@RequestMapping("semesterController")
public class SemesterController extends BaseController{
         @Autowired
         private SemesterService semesterService;
         
         /**
          * 查询所有学期信息
          * @param vcoocUserId
          * @param mv
          * @return
          */
         @RequestMapping("selectSemesters")
         public ModelAndView selectSemesters(ModelAndView mv){
                 
        	    return VerificationUserModel(new VerificationUserModel() {
					
					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
					
						mv.addObject("semesterList", semesterService.selectSemester(2));
						mv.setViewName("admin/term_manage/term_manage_list");
						return mv;
					}
				});
         }
         
         
         /**
          * 查询所有学期信息
          * @param vcoocUserId
          * @param mv
          * @return
          */
         @RequestMapping("selectAllSemesters")
         @ResponseBody
         public SysResult selectSemesters(){
                 
        	 
        	    return SysResult.ok(semesterService.selectSemester(2));
         }
         
         
         /**
          * 跳转到学期编辑页面
          * @param id
          * @param mv
          * @return
          */
         @RequestMapping("selectSemesterById/{id}")
         public ModelAndView selectSemesters(final @PathVariable("id")Integer id,ModelAndView mv){
                 
        	    return VerificationUserModel(new VerificationUserModel() {
					
					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
					
						mv.addObject("semester", semesterService.selectSemesterById(id));
						mv.setViewName("admin/term_manage/term_manage_modify");
						return mv;
					}
				});
         }
         
         /**
          * 添加学期信息
          * @param vcoocUserId
          * @param semester
          * @return
          */
         @RequestMapping("addSemester")
         @ResponseBody
         public ModelAndView addSemester(final Semester semester,ModelAndView mv){
        	 return VerificationUserModel(new VerificationUserModel() {
					
					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
					
						try {
							
							semesterService.addSemester(semester, teacherInfo);
						
						} catch (Exception e) {
							mv.addObject("status",202);
							mv.addObject("msg", e.getMessage());
							mv.setViewName("admin/term_manage/term_manage_add");
							return mv;
						}
					mv.setViewName("admin/term_manage/term_manage_add");
					mv.addObject("status",200);
					return mv;
				}
			});
         }
         
      /**
       * 修改学期信息
       * @param semester
       * @return
       */
         @RequestMapping("modifySemester")
         @ResponseBody
         public ModelAndView modifySemester(final Semester semester){
        	 
        	 return VerificationUserModel(new VerificationUserModel() {
					
					public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
					try {
						
						semesterService.updateSemester(semester, teacherInfo);
						mv.addObject("status",200);
					} catch (Exception e) {
						e.printStackTrace();
						mv.addObject("status",202);
						mv.addObject("msg", e.getMessage());
						
					}
					mv.setViewName("admin/term_manage/term_manage_modify");
					
					return mv;
				}
			});
         }
         
         /**
          * 删除学期信息
          * @param semester
          * @return
          */
            @RequestMapping("updateSemesterStealth")
            @ResponseBody
            public SysResult updateSemesterStealth(final Semester semester){
           	 
           	 return VerificationUser(new VerificationUser() {
   				
   				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
   				
   					semesterService.updateSemesterStealth(semester, teacherInfo);
   					return SysResult.ok();
   				}
   			});
          }
            
            /**
             * 校验学期名称是否存在
             * @param name
             * @param id
             * @param semester
             * @return
             */
            @RequestMapping("validateSemester/{id}")
            @ResponseBody
            public HuiValidateResult validateSemester(@PathVariable("id")Integer id,HttpServletRequest request){
                 String semesterName= request.getParameter("param");
                 
                 if(!StringUtils.isNotEmpty(semesterName)){
                	 return HuiValidateResult.no("学期名称不能为空！");
                 }
            
                 if(semesterService.validateSemesterName(semesterName, id)){
                	return HuiValidateResult.ok("可以使用");
                }else{
                	return HuiValidateResult.no("学期名称已存在，无法使用！");
                }

          }
            
}

