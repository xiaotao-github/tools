package com.vcooc.experiment.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.base.pojo.Semester;
import com.vcooc.base.pojo.TbClass;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.config.ClockinConfig;
import com.vcooc.experiment.enums.StealthEnum;
import com.vcooc.experiment.mapper.CourseScheduleMapper;
import com.vcooc.experiment.mapper.ExperimentCourseMapper;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.ScheduleStudentScoreMapper;
import com.vcooc.util.DateUtils;

@Service
public class CourseScheduleService {
	@Autowired
	private CourseScheduleMapper courseScheduleMapper;
	@Autowired
	private SemesterService semesterService;
	@Autowired
	private ExperimentLabService experimentLabService;
	@Autowired
	private ScheduleClassService scheduleClassService;
	@Autowired
	private ClockingInService clockingInService;
	@Autowired
	private ExperimentLabMapper experimentLabMapper;
	@Autowired
	private ExperimentCourseMapper experimentCourseMapper;
	@Autowired
	private ScheduleStudentScoreMapper scheduleStudentScoreMapper;
	
	@Autowired
	private TeacherLogInformationService teacherLogInformationService;
	
	private static final SimpleDateFormat SDF = new SimpleDateFormat("yyyyMMdd ");// 格式化时间
	
	@Autowired
	private ClockinConfig clockinConfig; // 转换时间工具
	/**
	 * 根据实验室id和周一的日期获取一周的课程
	 * @param monday          周一日期,传进来的时分秒会被清掉,建议传进来String类型
	 * @param exprimentLabId  实验室id
	 * @return
	 * 		关联查询任课教师，课程
	 */
	/*public List<CourseSchedule> AselectByLabId(Object monday,Integer exprimentLabId){
		Date date = null;
		if(monday instanceof String)    date = parseByString((String)monday);
		else if(monday instanceof Date) date = ParseDate((Date)monday);
		
		Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DAY_OF_MONTH, 7);// 今天+7天
        //只查询非伪删除的
		return courseScheduleMapper.AselectByLabId(date, c.getTime(), exprimentLabId,2);
	}*/
	
	
	/**
     * 查询所有学期信息
     * @param stealth
     * @return
     */
    public List<Semester> selectSemester(Integer stealth){
    	List<Semester> result = semesterService.selectSemester(2);
    	for(Semester i : result){
    		/*i.setMondayTime(new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss").format(getMonday(i.getStartTime())).replace(" ", "T"));*/
    		i.setMondayTime(new SimpleDateFormat("yyyy-MM-dd").format(getMonday(i.getStartTime())));
    	}
        return result;
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
	 * 根据实验室id和一学期的id，查询所有的排课记录
	 * @param exprimentLabId   实验室id
	 * @param semesterId       学期id
	 * @return
	 * 		关联查询任课教师，课程
	 */
	public Map<String, Object> getSemesterSchedule(Integer exprimentLabId,Integer semesterId,String type){
		//关联查询班级
		Semester semester = semesterService.selectSemesterById(semesterId);
		if(semester != null){
			//判断一下,是否是当前这个学期,如果是,返回第几周，不是,则返回第一周
			Map<String, Object> map = new HashMap<String, Object>();
  		    long dayCount=CountDay(semester.getStartTime(),semester.getEndTime());   //这个学期的共计天数
  		    if(dayCount>0){
    		   map.put("dayCount", dayCount);  //学期总天数
    		   map.put("weekCount", Surplus(dayCount,7));//总周数
    		   long current = CountDay(semester.getStartTime(),new Date());//学期开始过了多少天
    		   //现在第几周/第1周,如果总的天数小于已过天数，说明并不是当前这个学期
    		   if(current>0 && CountDay(semester.getEndTime(),new Date())<0) //map.put("weekNum", Surplus(current,7));
    			   map.put("weekNum",com.vcooc.util.DateUtils.selectWeekNum(semester.getStartTime(), semester.getEndTime())[0]);
    		   else {
    			   //周数
    			   map.put("weekNum", 1);
    			   //第一周的周一
    			   map.put("monday", new SimpleDateFormat("yyyy-MM-dd").format(getMonday(semester.getStartTime())));
    		   }
		   }
  		   //查询排课记录,因为第一周的日期不一定是周一，有可能用户会误操作，
  		   //将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
  		  Calendar atart = Calendar.getInstance();
  		  atart.setTime(semester.getStartTime());
  		  atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天
          
          //只查出来预约实验室的
  		  map.put("scheduleList", courseScheduleMapper.
  				  AselectByLabId(atart.getTime(), semester.getEndTime(), exprimentLabId,2,type));
  		  return map;
		}
		return null;
	}
	/**
	 * 根据实验室id和一学期的id，查询所有的排课记录
	 * @param exprimentLabId   实验室id
	 * @param semesterId       学期id
	 * @return
	 * 		关联查询任课教师，课程
	 */
	public Map<String, Object> getSemesterSchedule2(Integer exprimentLabId,Integer semesterId,String type){
		//关联查询班级
		Semester semester = semesterService.selectSemesterById(semesterId);
		if(semester != null){
			//判断一下,是否是当前这个学期,如果是,返回第几周，不是,则返回第一周
			Map<String, Object> map = new HashMap<String, Object>();
  		    long dayCount=CountDay(semester.getStartTime(),semester.getEndTime());   //这个学期的共计天数
  		    if(dayCount>0){
    		   map.put("dayCount", dayCount);  //学期总天数
    		   map.put("weekCount",DateUtils.weekNum(DateUtils.dateToStrYMD(semester.getStartTime()), DateUtils.dateToStrYMD(semester.getEndTime())));//总周数
    		   long current = CountDay(semester.getStartTime(),new Date());//学期开始过了多少天
    		   //现在第几周/第1周,如果总的天数小于已过天数，说明并不是当前这个学期
    		   if(current>0 && CountDay(semester.getEndTime(),new Date())<0) //map.put("weekNum", Surplus(current,7));
    			   map.put("weekNum",com.vcooc.util.DateUtils.selectWeekNum(semester.getStartTime(), semester.getEndTime())[0]);
    		   else {
    			   //周数
    			   map.put("weekNum", 1);
    			   //第一周的周一
    			   map.put("monday", new SimpleDateFormat("yyyy-MM-dd").format(getMonday(semester.getStartTime())));
    		   }
		   }
  		   //查询排课记录,因为第一周的日期不一定是周一，有可能用户会误操作，
  		   //将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
  		  Calendar atart = Calendar.getInstance();
  		  atart.setTime(semester.getStartTime());
  		  atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天
          
          //只查出来预约实验室的
  		  map.put("scheduleList", courseScheduleMapper.
  				  AselectByLabId(atart.getTime(), semester.getEndTime(), exprimentLabId,2,type));
  		  return map;
		}
		return null;
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
    public  long Surplus(long dividends,long divisor){
  	  if(dividends == 0 || divisor == 0)return 0;
  	  return dividends%divisor == 0 ? dividends/divisor:dividends/divisor+1;
    }
    
	
	/**
	 * 插入记录,调用前将操作人id放进来
	 * 		格式化一下传过来的数据
	 *      做一层保险，维护中的实验室不能添加
	 * @param record
	 */
	public CourseSchedule insert(CourseSchedule record,String classIds){
		//通过实验室id 获取实验室详情
		ExperimentLab labList = experimentLabMapper.selectById(record.getLabId());
		if(labList.getLabStatus() == 2) {
			 throw new RuntimeException("该实验室正在维护中,暂时不能预约和排课!"); 
		}
		//工位不能超过总工位
		if(record.getType()==3){
			if(record.getSeats()>labList.getLabSeat()){
				 throw new RuntimeException("预约的工位不能超过当前实验室的总工位!"); 
			}	
		}
		
		record.setCreateTime(new Date());
		record.setUpdateTime(record.getCreateTime());
		record.setSchooltime(ParseDate(record.getSchooltime()));
		record.setStealth(2);
		record.setRemainingSeats(record.getSeats());//将老师输入的自主预约数写入剩余工位数
		//清理没用的数据
		/*if( record.getType() == 4){
			record.setExperimentId(null);
		}*/
		
		courseScheduleMapper.insertSelective(record);
		
		//关联班级  1.整班上课      2.	小组协作       3.自主预约   
		if(record.getType() != 4 && classIds != null && classIds.length()>0){
			if(record.getType() != 3) {
				scheduleClassService.insert(record.getScheduleId(), classIds,record.getType());
			}
			String[] temp = classIds.split(",");
			List<TbClass> tbclassList = new ArrayList<TbClass>();
			for(String i:temp){
				TbClass tbclass = new TbClass();
				tbclass.setId(Integer.parseInt(i));
				tbclassList.add(tbclass);
			}
			record.setTbClassList(tbclassList);
			
			//批量插入关联信息
            if(record.getType().equals(2) || record.getType().equals(3)){
                     if(StringUtil.isNotEmpty(classIds)){
                               Integer[] arr = new Integer[classIds.split(",").length];
                               String[] str = classIds.split(",");
                                for (int i = 0; i < temp.length; i++) {
									arr[i]=Integer.parseInt(str[i]);
								}
                                scheduleClassService.insertByArray(record.getScheduleId(), arr, new Date());
                     }
            }
			//初始化考勤----整班上课或者自主预约 不再初始化考勤表  直接由考勤机写入到课程成绩表！
 		  /*  if(record.getType() != 2 && tbclassList.size()>0){
 		    	for(TbClass i:tbclassList)
 		    	clockingInService.addclockingInForClass(i.getId(), record.getScheduleId());
 		    }*/
           //获取课程id 课程名称
            
            ExperimentCourse ex= experimentCourseMapper.selectByPrimaryKey(record.getCourseId());
            record.setExperimentCourse(ex);
            
		}
		return record;
	}
	
	
	
	/**
	 * 将日期格式化为年月日
	 * @param date
	 * @return
	 * 
	 */
	public Date ParseDate(Date date){
		if(date == null) return null;
		return parseByString(formatByDate(date));
	}
	
	
	/**
	 * 将String类型转化为日期类型
	 * 		写固定格式了，如需要，重载
	 * @param date
	 * @return
	 */
	public Date parseByString(String date){
		try {
			return new SimpleDateFormat("yyyy-MM-dd").parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}  
	}
	
	
	/**
	 * 将日期类型转化为String
	 * 		写固定格式了，如需要，重载
	 * @param date
	 * @return
	 */
	public String formatByDate(Date date){
		return new SimpleDateFormat("yyyy-MM-dd").format(date);
	}
	
	
	
	/**
	 * 根据条件查询
	 * @param record
	 * @return
	 */
	public List<CourseSchedule> select(CourseSchedule record){
		return courseScheduleMapper.select(record);
	}
	
	
	/**
	 * 根据实验室id，某天，某节的排课(多表关联),只查询非伪删除的数据
	 * 		特定业务接口!
	 * @param exprimentLabId
	 * @param slice
	 * @param schooltime
	 * @param type   类型，如  "4","1,2,3"
	 * @return
	 * 		关联实验课程
	 * 		关联任课教师
	 * 		通过关联type关联班级或者小组
	 * 			如果是1或者2,班级关联该班级下的学生
	 * 			如果是2,关联小组及小组下的学生
	 * 			如果是3,关联预约了该实验室的学生
	 */
	/*public List<CourseSchedule> selectByLabIdAndSliceAndSchooltimeAndType(
			Integer exprimentLabId,String slice,String  schooltime){
		List<CourseSchedule> result = courseScheduleMapper.
				selectByLabIdAndSliceAndSchooltimeAndType
				(exprimentLabId, slice, parseByString(schooltime), "1,2,3", 2);
		for(CourseSchedule i:result){
			if(i.getType()!= null && i.getClassId() != null){
				if(i.getType() == 1){
					
				}else if(i.getType() == 2){
					
				}else if(i.getType() == 3){
					
				}
			}
		}
		return result;
	}*/
	
	
	/**
	 * 伪删除课表
	 * @param scheduleId
	 * @param type 
	 * @param slice 
	 * @param experimentCourseName 
	 * @param req 
	 * @param teacherInfo 
	 * @param number 
	 * @param slice2 
	 */
	public void deleteById(Integer scheduleId, String experimentCourseName, String schooltime, String slice, Integer type, HttpServletRequest req, TeacherInfo teacherInfo, Integer number){
		CourseSchedule record = new CourseSchedule();
		record.setUpdateTime(new Date());
		record.setScheduleId(scheduleId);
		record.setStealth(1);
		courseScheduleMapper.updateByPrimaryKeySelective(record);
		
		//伪删除课程表进行真删除成绩表
		List<ScheduleStudentScore> scList =  scheduleStudentScoreMapper.selectkey(scheduleId);
		if(scList.size()!=0){
			for (int i = 0; i < scList.size(); i++) {
				scheduleStudentScoreMapper.deleteByPrimaryKey(scList.get(i));
			}
		}
		
		
		//updateByPrimaryKeySelective(record);
		String schooltimeToString  = null;
		if(number == 1){
			Long time =  Long.valueOf(schooltime);
			Date date = new Date(time);
			schooltimeToString  = SDF.format(date);	
		}else{
			//时间转换
			Date date = new Date(schooltime);
			 schooltimeToString  = SDF.format(date);	
		}

		//将字节转换为时间
		// 将 字节[A...]转换为时间
		String time = clockinConfig.getTime(slice);
		//指出类型
		String typeString = null;
		if(type==1){
			 typeString = "整班上课";
		}else if(type == 3){
			 typeString = "自主预约";
		}
		//7指定为开放预约实验(接口写死)
		TeacherLogInformation recordLog = TeacherLogInformation.bildInfo(req, teacherInfo.getId(),"删除了《"+ experimentCourseName +"》"+ schooltimeToString+":"+time+"类型为"+typeString+"的排课以及所属的学生成绩信息和预约记录", 7);
		teacherLogInformationService.saveSelective(recordLog);
	}
	
	
	/**
	 * 根据id,修改不为null的字段
	 * @param record
	 */
	public void updateByPrimaryKeySelective(CourseSchedule record){
		record.setUpdateTime(new Date());
		CourseSchedule cs = courseScheduleMapper.selectByPrimaryKey(record.getScheduleId());
		ExperimentLab exLab = experimentLabMapper.selectByPrimaryKey(cs.getLabId());
		if(cs.getSeats()>exLab.getLabSeat()){
			throw new RuntimeException("预约的工位不能超过实验室总工位");
		}
		courseScheduleMapper.updateByPrimaryKeySelective(record);
	}
	
	
	/**
	 * 根据id单表查询
	 * @param scheduleId
	 * @return
	 */
	public CourseSchedule selectById(Integer scheduleId){
		return courseScheduleMapper.selectByPrimaryKey(scheduleId);
	}
	
	public CourseSchedule selectByIdAndSeats(Integer scheduleId){
		CourseSchedule courseSchedule = courseScheduleMapper.selectByPrimaryKey(scheduleId);
		if(courseSchedule!=null)
		{
			Integer appointStudentSize = courseScheduleMapper.getAppointStudentSize(scheduleId);
			courseSchedule.setAppoinNum(appointStudentSize==null?0:appointStudentSize);
		}
		return courseSchedule;
	}
	
	
	/**
	 * 根据课程表id获取课程安排
	 * @param scheduleId
	 * 		courseSchedule 课程表
	 * 		tbclass   班级--学生(账号|考勤|成绩)
	 * 				     班级--小组--实验--组员(账号|考勤|成绩)
	 * @return
	 */
	public Map<String, Object> getStudentOfTbclassOrGroup(Integer scheduleId){
		Map<String, Object> map  = new HashMap<String, Object>();
		//获取课程表
		CourseSchedule cs = selectById(scheduleId);
		//判断类型
		if(cs != null && cs.getType() != null){
			if(cs.getType() == 1){
				//整班上课 
				map.put("classList", courseScheduleMapper.getTbClassAndStudent(scheduleId));
				//查询实验,整班上课是要先选实验的,所以实验不为null
				map.put("experiment", courseScheduleMapper.getExperimentByScheduleId(scheduleId));
			}else if(cs.getType() == 2){
				//小组协作
/*				map.put("classList", scheduleClassMapper.selectScheduleClassByScheduldeId(scheduleId));
*/			//	map.put("classList", courseScheduleMapper.getGroupStudent(scheduleId));
			}else if(cs.getType() == 3){
				//1.预约了的学生信息数量
				//2.可预约班级
				List<TbClass> classList =  scheduleClassService.getExitedTbClass(scheduleId);
				List<TbClass> studentClassList = courseScheduleMapper.getAppointStudent(scheduleId);
				//已经预约的
				int studentSize = 0;
				if(!CollectionUtils.isEmpty(studentClassList)){//如果预约的学生不为空
					Set<TbClass> resultClassSet = new HashSet<>(studentClassList);
					resultClassSet.addAll(classList);
					for (TbClass temp : studentClassList) {
						if(temp.getStudentInfoList()!=null){
							studentSize +=temp.getStudentInfoList().size();
						}
					}
					map.put("classList", resultClassSet);
				}else{
					map.put("classList", classList);
				}
				//剩余工位
				//map.put("remainSeats",  (cs.getSeats()==null?0:cs.getSeats())-studentSize);
				map.put("remainSeats",cs.getRemainingSeats());
				//已经预约人数
				map.put("studentSize",  studentSize);
				//3.可预约工位
				map.put("seats",  cs.getSeats());
				//5.实验  可以为空
				map.put("experiment", courseScheduleMapper.getExperimentByScheduleId(scheduleId));
			}
			map.put("type", cs.getType());
		}
		map.put("courseSchedule", cs);
		return map;
	}
	
	/**
	 * 根据 课程表id 类型 获取 关联的班级
	 * @param scheduleId  课程表id 
	 * @param type  类型  1.整班上课   2.小组协作  3.自主预约
	 * @return
	 */
	public List<TbClass> getClassListByScheduleId(Integer scheduleId,Integer type){
		switch (type) {
		case 1:
			return courseScheduleMapper.getTbClassAndStudent(scheduleId);
		case 2:
			return courseScheduleMapper.getGroupStudent(scheduleId);
		case 3:
			return scheduleClassService.getExitedTbClass(scheduleId);
		default:
			return null;
		}
	}
	
	
	/**
	 * 获取个人课表
	 * @param teacherInfoId
	 * @return
	 */
	public List<CourseSchedule> myCourseSchedule(Integer teacherInfoId){
		return courseScheduleMapper.myCourseSchedule(teacherInfoId);
	}
	
	
	
	/**
	 * 根据实验室id和一学期的id，查询个人的排课记录
	 * @param exprimentLabId   实验室id
	 * @param semesterId       学期id
	 * @return
	 * 		关联查询任课教师，课程
	 */
	public Map<String, Object> getPersonSchedule(Integer exprimentLabId,Integer semesterId,Integer teacherId){
		//关联查询班级
		Semester semester = semesterService.selectSemesterById(semesterId);
		if(semester != null){
			//判断一下,是否是当前这个学期,如果是,返回第几周，不是,则返回第一周
			Map<String, Object> map = new HashMap<String, Object>();
  		    long dayCount=CountDay(semester.getStartTime(),semester.getEndTime());   //这个学期的共计天数
  		    if(dayCount>0){
    		   map.put("dayCount", dayCount);  //学期总天数
    		   map.put("weekCount", Surplus(dayCount,7));//总周数
    		   long current = CountDay(semester.getStartTime(),new Date());//学期开始过了多少天
    		   //现在第几周/第1周,如果总的天数小于已过天数，说明并不是当前这个学期
    		   if(current>0 && CountDay(semester.getEndTime(),new Date())<0) map.put("weekNum", Surplus(current,7));
    		   else {
    			   //周数
    			   map.put("weekNum", 1);
    			   //第一周的周一
    			   map.put("monday", new SimpleDateFormat("yyyy-MM-dd").format(getMonday(semester.getStartTime())));
    		   }
		   }
  		   //查询排课记录,因为第一周的日期不一定是周一，有可能用户会误操作，
  		   //将排课操作在学期之前，这样就找不到记录了，所以以防万一，查出来前7天的和后七天的
  		  Calendar atart = Calendar.getInstance();
  		  atart.setTime(semester.getStartTime());
  		  atart.add(Calendar.DAY_OF_MONTH, -7);// 开始时间-7天
          
  		  map.put("scheduleList", courseScheduleMapper.
  				  AselectMyScheduleByLabId(atart.getTime(), semester.getEndTime(), exprimentLabId,2,teacherId));
  		  return map;
		}
		return null;
	}
	
	/**
	 * 查询实验室使用次数
	 * @param labId
	 * @return
	 */
	public int selectLabUseCount(Integer labId){
		return courseScheduleMapper.selectLabUseCountByLabId(labId);
	}
	
	/**
	 * 查询课程详情
	 * @param scheduleId
	 * @return
	 */
	public CourseSchedule selectCourseScheduleInfo(Integer scheduleId){
		CourseSchedule cs = courseScheduleMapper.selectScheduleInfoById(scheduleId);
		String newSchooltime = SDF.format(cs.getSchooltime());
		cs.setNewSchooltime(newSchooltime);//进行排课时间转换作为判断
		//将节数转换为时间
		String time = clockinConfig.getTime(cs.getSlice());
		cs.setSliceByte(time);
		return cs;
	}
	/**
	 * 根据时间段 查询该实验室的排课记录
	 * @param beginTime 开始时间
	 * @param endTime 结束时间
	 * @param labId 实验室id
	 * @return
	 */
	public List<CourseSchedule> selectLabScheduleByDate(Date beginTime,Date endTime,Integer labId){
		return courseScheduleMapper.selectScheduleByLabIdAndTime(beginTime,endTime,labId,StealthEnum.SHOW.getCode());
	}
	
	/**
	 * 获取教师个人课表 明细
	 * @param id
	 * @return
	 */
	public List<CourseSchedule> myCourseScheduleList(Integer teacherInfoId) {
		// TODO Auto-generated method stub
		List<CourseSchedule> cs = courseScheduleMapper.myCourseScheduleList(teacherInfoId);
		for (int i = 0; i < cs.size(); i++) {
			//将节数转换为时间
			String time = clockinConfig.getTime(cs.get(i).getSlice());
			cs.get(i).setSliceByte(time);
			//将上课时间戳转换
			String newSchooltime = SDF.format(cs.get(i).getSchooltime());
			cs.get(i).setNewSchooltime(newSchooltime);
			//将上课时间保存为时间戳
			cs.get(i).setTimeStamp(cs.get(i).getSchooltime().getTime());
		}
		return cs;
	}

	/**
	 * 根据实验室 时间 获取 排课记录
	 * @param labId
	 * @param thisSelectedMonday
	 * @return
	 * @throws ParseException 
	 */
	@SuppressWarnings("static-access")
	public List<CourseSchedule> getConreNameClassList(Integer labId, String thisSelectedMonday) throws ParseException {
		String timeSlot = SDF.format((DateFormat.getDateInstance().parse(thisSelectedMonday)));
		//开始时间周一
		Date StartTime = SDF.parse(timeSlot);  
		//一周的最后一天周日
		Date dateStart = addDate(StartTime, 6);
		String  endToString = SDF.format(dateStart);
		
		Date endTime = SDF.parse(endToString);
		System.out.println(dateStart);
		
		List<CourseSchedule> courseScheduleList = this.selectLabScheduleByDate(StartTime,endTime,labId);
         return courseScheduleList;
	}

	 /* 指定日期加上天数后的日期
	     * @param num 为增加的天数
	     * @param newDate 创建时间
	     * @return
	     * @throws ParseException 
	     */
	public static Date addDate(Date date, long day) throws ParseException {
		long time = date.getTime(); // 得到指定日期的毫秒数
		day = day * 24 * 60 * 60 * 1000; // 要加上的天数转换成毫秒数
		time += day; // 相加得到新的毫秒数
		return new Date(time); // 将毫秒数转换成日期
	}

	/**更改排课
	 * 
	 * @param schooltimeToString 日期
	 * @param slice 第几节 
	 * @param labId 实验室id
	 * @param scheduleId 
	 * @return
	 * @throws ParseException 
	 */
	public CourseSchedule setchangeCourse(String schooltimeToString, String slice, Integer labId, Integer scheduleId) throws ParseException {
		String timeSlot = SDF.format((DateFormat.getDateInstance().parse(schooltimeToString)));
		//装换成为时间
		Date schooltime = SDF.parse(timeSlot);  
		CourseSchedule cs =  new CourseSchedule();
		cs.setScheduleId(scheduleId);
		cs.setLabId(labId);
		cs.setSchooltime(schooltime);
		cs.setSlice(slice);
		cs.setUpdateTime(new Date());
		courseScheduleMapper.updateByPrimaryKeySelective(cs);
		
		CourseSchedule c = courseScheduleMapper.selectByPrimaryKey(scheduleId);
		
		return c;
	}

	/**
	 * 设置学生为课代表
	 * @param studentId
	 * @param scheduleId
	 * @return
	 */
	public CourseSchedule addDeputy(Integer studentId, Integer scheduleId) {
		CourseSchedule cs = courseScheduleMapper.selectByPrimaryKey(scheduleId);
		if(cs.getDeputy()!=0&& !cs.getDeputy().equals("")){
			throw new RuntimeException("该课程已有课代表，请删除再设置！");
		}
		
		CourseSchedule c = new CourseSchedule();
		c.setScheduleId(scheduleId);
		c.setDeputy(studentId);
		courseScheduleMapper.updateByPrimaryKeySelective(c);
		CourseSchedule s = courseScheduleMapper.selectByPrimaryKey(scheduleId);
		return s;
	}

	/**删除课代表
	 * @param studentId
	 * @param scheduleId
	 * @return
	 */
	public void delectDeputy(Integer studentId, Integer scheduleId) {
		CourseSchedule c = new CourseSchedule();
		c.setScheduleId(scheduleId);
		c.setDeputy(0);
		courseScheduleMapper.updateByPrimaryKeySelective(c);
	//	CourseSchedule s = courseScheduleMapper.selectByPrimaryKey(scheduleId);
	}


	
}
