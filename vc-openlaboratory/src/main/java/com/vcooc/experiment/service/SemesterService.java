package com.vcooc.experiment.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.Semester;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.experiment.mapper.SemesterMapper;
import com.vcooc.util.DateUtils;

@Service
public class SemesterService {
      @Autowired
      private SemesterMapper semesterMapper;
      
      private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd ");// 格式化时间
      /**
       * 查询所有学期信息
       * @param stealth
       * @return
       */
      public List<Semester> selectSemester(Integer stealth){
    	  
    	  return semesterMapper.selectAllSemesters(stealth);
    	  
      }
      
      /**
       * 添加学期信息
       */
      public void addSemester(Semester record ,TeacherInfo teacher){
    	  if(!StringUtils.isNoneEmpty(record.getSemesterName())
      			|| record.getStartTime()== null || record.getEndTime()==null){
      		      throw new RuntimeException("信息获取失败，请重新操作！");
      	  }
    	  
    	  List<Semester> list = semesterMapper.selectAllSemseters(null);
    	  validateSemester(record, list);
    	  
    	  record.setCreateTime(new Date());
    	  record.setUpdateTime(record.getCreateTime());
    	  record.setOperatorId(teacher.getId());
    	  record.setStealth(2);
    	  
    	  semesterMapper.insertSelective(record);
      }
	
      
      /**
       * 修改学期
       * @param record
       * @param teacher
       */
      public void updateSemester(Semester record ,TeacherInfo teacher){
    	  if(record.getSemesterId()==null || !StringUtils.isNoneEmpty(record.getSemesterName())
    			|| record.getStartTime()== null || record.getEndTime()==null){
    		      throw new RuntimeException("信息获取失败，请重新操作！");
    	  }
    	  List<Semester> list = semesterMapper.selectAllSemseters(record.getSemesterId());
    	  validateSemester(record, list);
    	  
    	  record.setUpdateTime(new Date());
    	  record.setOperatorId(teacher.getId());
    	  
    	  semesterMapper.updateByPrimaryKeySelective(record);
      }
      
      /**
       * 设置伪删除字段
       * @param record
       * @param teacher
       */
      public void updateSemesterStealth(Semester record ,TeacherInfo teacher){
    	  if(record.getSemesterId()==null || record.getStealth()== null ){
    		      throw new RuntimeException("信息获取失败，请重新操作！");
    	  }
    	  
    	  record.setUpdateTime(new Date());
    	  record.setOperatorId(teacher.getId());
    	  
    	  semesterMapper.updateByPrimaryKeySelective(record);
      }
      
      
      
      /**
       * 根据id查询学期信息,关联查询班级
       * @param id
       * @return
       */
      
      public Semester selectSemesterById(Integer id){
    	return   semesterMapper.selectByPrimaryKey(id);
      }
      
      
      /**
       * 校验名称是否重复  true 可以使用 fales 不可以使用
       * @param name
       * @param id
       * @return
       */
      public boolean validateSemesterName(String name,Integer id){
    	    Integer count= semesterMapper.validateSemesterName(name, id);
    	    
    	    if(count==null || count.equals(0)){
    	    	return true;
    	    }else{
    	    	return false;
    	    }
      }
      
      /**
       * 校验：学期时间是否重叠
       * @param semester
       * @param list
       */
      public void validateSemester(Semester record,List<Semester> list){
    	  
     	  for (Semester semester : list) {
    		  //添加的时间
			long newStartTime =record.getStartTime().getTime();
			long newEdnTime = record.getEndTime().getTime();
			//数据库中的时间
			long oldStartTime =semester.getStartTime().getTime();
			long oldEdnTime = semester.getEndTime().getTime();
			
			
  		  
  		  if(newStartTime<=oldStartTime && (newEdnTime>oldStartTime  && newEdnTime> oldStartTime)){
  			  throw new RuntimeException("添加失败，原因：您添加的学期时间与【"+semester.getSemesterName()+"】学期重叠");
  			  
  		  }
  		  
  		  if(newStartTime>=oldStartTime &&  newEdnTime<=oldEdnTime){
  			  throw new RuntimeException("添加失败，原因：您添加的学期时间与【"+semester.getSemesterName()+"】学期重叠");
  			  
  		  }
  		  if((newStartTime>oldStartTime && newStartTime<= oldEdnTime ) && newEdnTime>=oldEdnTime){
  			  throw new RuntimeException("添加失败，原因：您添加的学期时间与【"+semester.getSemesterName()+"】学期重叠");
  			  
  		  }
    		  
		}
    	  
      }
      
      /**
       * 获取当前学期
       * 	返回这条学期的数据
       * @return
       */
      public Semester getCurrentSemester(){
    	  List<Semester> list = semesterMapper.getCurrentSemester();
    	  return list != null && list.size()>0 ? list.get(0):null;
      }
      
      
      /**
       * 获取当前学期
       * 	Semester  返回这条学期的数据
       * 	dayCount  开始时间和结束时间共多少天
       * 	weekCount 返回周数
       * 	weekNum   返回当前第几周
       * @return
       */
      public Map<String, Object> getCurrentSemesterWithWeek(){
    	  Semester result = getCurrentSemester();
    	  if(result != null && result.getStartTime() != null && result.getEndTime() != null){
    		  Map<String, Object> map = new HashMap<String, Object>();
    		  
    		  long dayCount=CountDay(result.getStartTime(),result.getEndTime());   //共计天数
    		  if(dayCount>0){
        		  map.put("dayCount", dayCount);  //学期总天数
        		  map.put("weekCount", Surplus(dayCount,7));//总周数
        		  long current = CountDay(result.getStartTime(),new Date());//学期开始过了多少天
        		  if(current>0) {
        			  int tempweekNum = (int)Surplus(current,7);
        			  map.put("weekNum", tempweekNum);//现在第几周
        			  //获取当前周的周一时间
        			  Date tempdate = getMonday(result.getStartTime());
        			  Calendar c = Calendar.getInstance();
    		          c.setTime(tempdate);
    		          c.add(Calendar.DAY_OF_MONTH, tempweekNum*7);// 第N周
            		  map.put("thisMonday", new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()));
        		  }
    		  }
    		  map.put("semester", result);
    		  return map;
    	  }
    	  return null;
      } /**
       * 获取当前学期
       * 	Semester  返回这条学期的数据
       * 	dayCount  开始时间和结束时间共多少天
       * 	weekCount 返回周数
       * 	weekNum   返回当前第几周
       * @return
     * @throws Exception 
       */
      public Map<String, Object> getCurrentSemesterWithWeek2() throws Exception{
    	  Semester result = getCurrentSemester();
    	  if(result != null && result.getStartTime() != null && result.getEndTime() != null){
    		  Map<String, Object> map = new HashMap<String, Object>();
    		  //当前学期的开始时间 /介绍时间
    		  map.put("startTime", SDF.format(result.getStartTime()));
    		  //学期的开始获取所在那一天的星期一
    		  Date da = SDF.parse(SDF.format(result.getStartTime()));
    		  Map  mp =  DateUtils.getWeekDate(da);
    		  map.put("startTimeMonday", mp.get("mondayDate"));
    		  
    		  map.put("endTime",SDF.format( result.getEndTime()));
    		  long dayCount=CountDay(result.getStartTime(),result.getEndTime());   //共计天数
    		  if(dayCount>0){
        		  map.put("dayCount", dayCount);  //学期总天数
        		  
        		  map.put("weekCount",DateUtils.weekNum(DateUtils.dateToStrYMD(result.getStartTime()), DateUtils.dateToStrYMD(result.getEndTime())));//总周数
        		  
        		  long current = CountDay(result.getStartTime(),new Date());//学期开始过了多少天
        		  if(current>0) {
        			  int tempweekNum = DateUtils.selectWeekNum(result.getStartTime(), result.getEndTime())[0];
        			  map.put("weekNum", tempweekNum);//现在第几周
        			  
        			  //获取当前周的周一时间
        			  Date tempdate = getMonday(result.getStartTime());
        			  Calendar c = Calendar.getInstance();
    		          c.setTime(tempdate);
    		          c.add(Calendar.DAY_OF_MONTH, (tempweekNum-1)*7);// 第N周
            		  map.put("thisMonday", new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()));
        		  }
    		  }
    		  map.put("semester", result);
    		  return map;
    	  }
    	  return null;
      }
      
      
      /**
       * 获取当前学期,如果semesterId不为null或者-1，则根据id查
       * 	Semester  返回这条学期的数据
       * 	dayCount  开始时间和结束时间共多少天
       * 	weekCount 返回周数
       * 	weekNum   返回当前第几周
       * 	thisMonday 当前周的周一
       * @return
       */
      public Map<String, Object> getCurrentSemesterWithWeek(Integer semesterId){
    	  if(semesterId == null || semesterId == -1) return getCurrentSemesterWithWeek();
    	  Semester semester = selectSemesterById(semesterId);
    	  if(semester != null  && semester.getStartTime() != null && semester.getEndTime() != null){
    		  Map<String, Object> map = new HashMap<String, Object>();
    		  long dayCount=CountDay(semester.getStartTime(),semester.getEndTime());   //共计天数
    		  if(dayCount>0){
        		  map.put("dayCount", dayCount);  //学期总天数
        		  map.put("weekCount", Surplus(dayCount,7));//总周数
        		  //这里应该判断是不是当前的学期
        		  //计算天数，如果结束时间到当前时间是大于0的，说明已经过了，否则则是当前学期
        		  long current = CountDay(semester.getEndTime(),new Date());
        		  if(current>0){
            		  map.put("weekNum", 1);//现在第几周
              		 //获取当前周的周一时间
          			  map.put("thisMonday", 
          					  new SimpleDateFormat("yyyy-MM-dd").
          					  format(getMonday(semester.getStartTime()).getTime()));
        		  }else{
          			//当前是第几周
  					  int tempweekNum = (int)Surplus(CountDay(semester.getStartTime(),new Date()) ,7);
          			  map.put("weekNum", tempweekNum);//现在第几周
          			  //这周的周一是什么时候
          			  Date tempdate = getMonday(semester.getStartTime());
          			  Calendar c = Calendar.getInstance();
      		          c.setTime(tempdate);
      		          c.add(Calendar.DAY_OF_MONTH, tempweekNum*7);// 第N周的周一
              		  map.put("thisMonday", new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()));
          		  }
      			  map.put("semester", semester);
      			  return map;
      		  }
    	  }
    	  return null;
      }
      
      
      

	/**
       * 获取周一时间
       * @param time
       * @return
       */
      public Date getMonday(Date time){
          Calendar cal = Calendar.getInstance();  
          cal.setTime(time);
         //判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了  
          int dayWeek = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天  
          if(1 == dayWeek)cal.add(Calendar.DAY_OF_MONTH, -1);  
          cal.setFirstDayOfWeek(Calendar.MONDAY);//设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一  
          int day = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天  
          cal.add(Calendar.DATE, cal.getFirstDayOfWeek()-day);//根据日历的规则，给当前日期减去星期几与一个星期第一天的差值   
          return cal.getTime(); //周一时间 
      }
      
      
      
      
      /**
       * 统计天数
       * @param startTime  开始时间
       * @param endTime    结束时间
       * @return
       */
      public long CountDay(Date startTime,Date endTime){
    	  return (endTime.getTime()-startTime.getTime())/(1000 * 60 * 60 * 24);
      }
      
      
      /**
       * 求余
       * 	整除的话直接相除
       * 	不整除，结果+1
       * @param dividends  被除数
       * @param divisor    除数
       * @return
       * 	异常参数处理，如果分子或者分母为0,,返回0
       */
      public long Surplus(long dividends,long divisor){
    	  if(dividends == 0 || divisor == 0)return 0;
    	  return dividends%divisor == 0 ? dividends/divisor:dividends/divisor+1;
      }


	public Object getCurrentSemesterWithWeek2(Integer semesterId) throws Exception {
		if(semesterId == null || semesterId == -1) return getCurrentSemesterWithWeek2();
  	    Semester semester = selectSemesterById(semesterId);
  	    
  	    if(semester != null  && semester.getStartTime() != null && semester.getEndTime() != null){
  		    Map<String, Object> map = new HashMap<String, Object>();
  		    long dayCount=CountDay(semester.getStartTime(),semester.getEndTime());   //共计天数
  		  
  		    if(dayCount>0){
      		    map.put("dayCount", dayCount);  //学期总天数
      		  
      		    map.put("weekCount",DateUtils.weekNum(DateUtils.dateToStrYMD(semester.getStartTime()), DateUtils.dateToStrYMD(semester.getEndTime())));//总周数
      		  
      		    //这里应该判断是不是当前的学期
      		    //计算天数，如果结束时间到当前时间是大于0的，说明已经过了，否则则是当前学期
      		    long current = CountDay(semester.getEndTime(),new Date());
      		    if(current>0){
          		    map.put("weekNum", 1);//现在第几周
            		    //获取当前周的周一时间
        			    map.put("thisMonday", 
        					  new SimpleDateFormat("yyyy-MM-dd").
        					  format(getMonday(semester.getStartTime()).getTime()));
      		    }else{
      			    //当前是第几周
      			    int tempweekNum = DateUtils.selectWeekNum(semester.getStartTime(), semester.getEndTime())[0];
      			    map.put("weekNum", tempweekNum);//现在第几周
      			  
      			  
      			    //这周的周一是什么时候
      			    Date tempdate = getMonday(semester.getStartTime());
      			    Calendar c = Calendar.getInstance();
  		            c.setTime(tempdate);
  		            c.add(Calendar.DAY_OF_MONTH, (tempweekNum-1)*7);// 第N周的周一
          		    map.put("thisMonday", new SimpleDateFormat("yyyy-MM-dd").format(c.getTime()));
      		    }
      		  
  			    map.put("semester", semester);
  			    return map;
  		  }
  	  }
  	  return null;
	}
	
	


	
	
      
}
