package com.vcooc.experiment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.service.ClockingInService;

@Controller
@RequestMapping("clockIngInController")
public class ClockIngInController extends BaseController{
       @Autowired
       private ClockingInService clockingInService;
	
       
       /**
        * 添加班级下所有学生的考勤信息
        * @param semester
        * @return
        */
         @RequestMapping("addClockingInForClass")
          @ResponseBody
          public SysResult addClockingInForClass(final Integer  classId,final Integer scheduleId){
         	 
         	 return VerificationUser(new VerificationUser() {
 				
 				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {

 					try {
						
 						clockingInService.addclockingInForClass(classId, scheduleId);
					} catch (Exception e) {
						
						return	SysResult.build(202,e.getMessage());
					}
 					
 					return SysResult.ok();
 				}
 			});
        }
       
          /**
           *添加小组成员的考勤信息
           * @param semester
           * @return
           */
            @RequestMapping("addClockingInForGroup")
             @ResponseBody
             public SysResult addClockingInForGroup(final Integer  groupId,final Integer scheduleId){
            	 
            	 return VerificationUser(new VerificationUser() {
    				
    				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {

    					
    				   try {
   						
    						clockingInService.addclockingInForGroup(groupId, scheduleId);
    						
   					} catch (Exception e) {
   						
   						return	SysResult.build(202,e.getMessage());
   					}
    					
    					return SysResult.ok();
    				}
    			});
           }
             
   
         
             /**
              *添加学生考勤信息。
              * @param semester
              * @return
              */
               @RequestMapping("addClockingInForStudent")
                @ResponseBody
                public SysResult addClockingInForStudent(final Integer  studentId,final Integer  classId,final Integer scheduleId){
               	 
               	 return VerificationUser(new VerificationUser() {
       				
       				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {

       					try {
      						
       						clockingInService.addclockingInForStudentInfo(studentId, scheduleId,classId);
       						
      					} catch (Exception e) {
      						
      						return  SysResult.build(202,e.getMessage());
      					}
       					
       					return SysResult.ok();
       				}
       			});
              }
               
               
               /**
                *修改学生签到状态
                * @param semester
                * @return
                */
                 @RequestMapping("modifyStudentClocking")
                  @ResponseBody
                  public SysResult modifyStudentClocking(final Integer  studentId,final Integer  status,final Integer scheduleId){
                 	 
                 	 return VerificationUser(new VerificationUser() {
         				
         				public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {

         					try {
        						
         						clockingInService.modifyStudentClockingStatus(studentId, scheduleId,status);
         						
        					} catch (Exception e) {
        						
        						return  SysResult.build(202,e.getMessage());
        					}
         					
         					return SysResult.ok();
         				}
         			});
                }

}
