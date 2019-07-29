package com.vcooc.experiment.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ResourceCategory;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.experiment.mapper.ResourceCategoryMapper;
@Service
public class ResourceCategoryService {
           @Autowired
           private ResourceCategoryMapper resourceCategoryMapper;
           
           /**
            * 删除资源标签
            * @param id
            * @return
            */
           public void deleteResourceCategory(Integer id){
        	   resourceCategoryMapper.deleteByPrimaryKey(id);
           }
           
           /**
            * 添加标签
            * @param label
            */
           public List<ResourceCategory> addResourceCategory(String[] label,TeacherInfo teacherInfo){
        	   List<ResourceCategory> list = new ArrayList<ResourceCategory>();
        	   //存在的标签
        	   String exitName="";
        	   //校验该标签是否存在
        	   for (int i = 0; i < label.length; i++) {
        		   ResourceCategory record = new ResourceCategory();
        		   if(!StringUtils.isNotEmpty(label[i])) continue;
        		   record.setCategoryName(label[i]);
            	   record.setTeacherInfoId(teacherInfo.getId());
            	  List<ResourceCategory> rcs= resourceCategoryMapper.select(record);
            	  
            	  if(rcs==null || rcs.size()<=0){
               	   record.setCreateTime(new Date());
               	   list.add(record);
               	   
            	  }else{
            		  exitName+=label[i]+"、";
            		  
            	  }
			}
        	   if(StringUtils.isNotEmpty(exitName)){
        		   exitName=exitName.substring(0, exitName.length()-1);
        		   throw new RuntimeException("标签“"+exitName+"”已存在");
        	   }
        	   
        	   if(list!=null && list.size()>0){
        			  //插入数据库
              	  resourceCategoryMapper.addResourceCategories(list);
              	  //查询插入的标签信息
              	  return resourceCategoryMapper.queryNames(list, teacherInfo.getId());
        	   }else{
        		   throw new RuntimeException("标签不能为空！");
        	   }
        
           }
           
           /**
            * 查询该用户使用过的标签
            * @param teacherInfoId
            * @return
            */
           public List<ResourceCategory> selectResourceCategoryByTeacherInfoId(Integer teacherInfoId){
        	  
        	   return resourceCategoryMapper.selectResourceCategoriesTeacherInfoId(teacherInfoId);
           }
           
}
