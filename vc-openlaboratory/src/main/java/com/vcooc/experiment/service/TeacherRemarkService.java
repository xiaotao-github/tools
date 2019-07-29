package com.vcooc.experiment.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherRemark;
import com.vcooc.experiment.mapper.TeacherRemarkMapper;
@Service
public class TeacherRemarkService extends BaseService<TeacherRemark>{
       @Autowired
       private TeacherRemarkMapper teacherRemarkMapper;
       
       //删除评语
       public void deleetRemark(Integer id){
    	   teacherRemarkMapper.deleteByPrimaryKey(id);
       }
       
       
       //添加评语
       public TeacherRemark addRemark(TeacherRemark remark,TeacherInfo teacherInfo){
    	   if(!StringUtils.isNotEmpty(remark.getRemark())){
    		   throw new RuntimeException("教师评语不能为空！");
    	   }
    	   remark.setTeacherInfoId(teacherInfo.getId());
    	   if(remark.getType()==null) {
    		   remark.setType(1);
    	   }
    	   //评语是否存在
    	   List<TeacherRemark> list= teacherRemarkMapper.select(remark);
    	   //存在，不需要存入到数据库
    	   if(list!=null && list.size()>0){
    		   throw new RuntimeException("该评语已存在！");
    	   }
    	   remark.setCreateTime(new Date());
    	   remark.setCreateTime(remark.getCreateTime());
    	   
    	   teacherRemarkMapper.insertSelective(remark);
    	   return remark;
       }
       
       /**
        * 查询教师评价
        * @param teacher
        * @param type
        * @return
        */
       public List<TeacherRemark> selectRemark(Integer teacherId,Integer type){
   		TeacherRemark record = new TeacherRemark();
   		record.setTeacherInfoId(teacherId);
   		record.setType(type);
   		return teacherRemarkMapper.select(record);
       }
       
}
