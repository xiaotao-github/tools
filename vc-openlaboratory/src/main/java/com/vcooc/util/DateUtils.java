package com.vcooc.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DateUtils {
	//当前时间
	private static Calendar rightNow    =     null;
	

	/**
	 * 将年、月、日、时、分、秒拼成一个字符串
	 * @return
	 */
	public static String getTimeStr() {
		
		rightNow = Calendar.getInstance(); 
		
		StringBuffer sb = new StringBuffer();
		//年
		String year = rightNow.get(Calendar.YEAR)+"";   
        //月
		String month = rightNow.get(Calendar.MONTH)+1+""; //第一个月从0开始，所以得到月份＋1  
       //日
		String day = rightNow.get(rightNow.DAY_OF_MONTH)+"";  
        //时
		String hour24 = rightNow.get(rightNow.HOUR_OF_DAY)+"";  
        //分
		String minute = rightNow.get(rightNow.MINUTE)+"";  
        //秒
		String second = rightNow.get(rightNow.SECOND)+"";  
		
		sb.append(year+month+day+hour24+minute+second);
		return sb.toString();
	}
	/**
     * 查询一个时间段的总周数和查询当前时间是第几周
     * @param start
     * @param end
     * @return
     */
    public  static int[] selectWeekNum(Date start,Date end){
        java.util.Calendar now = java.util.Calendar.getInstance();
        java.util.Calendar c_total = java.util.Calendar.getInstance();
        java.util.Calendar c_begin =  java.util.Calendar.getInstance();
        java.util.Calendar c_end = java.util.Calendar.getInstance();
        int count = 0;
        int weekTotal = 0;
        try {
            c_begin.setTime(start);
            c_end.setTime(end);
            now.setTime(strYMDToDate(dateToStrYMD(new Date())));
            int begin = c_begin.get(java.util.Calendar.WEEK_OF_YEAR);
            int over =c_end.get( java.util.Calendar.WEEK_OF_YEAR);
            int z = now.get( java.util.Calendar.WEEK_OF_YEAR);
            //判断两个日期是否在同一年星期中
            if (c_begin.getWeekYear() != c_end.getWeekYear()) {
                Date totalYear = new SimpleDateFormat("yyyy-MM-dd").parse(c_begin.getWeekYear() + "-12-31");
                c_total.setTime(totalYear);
                int x = c_total.get(java.util.Calendar.WEEK_OF_YEAR);
                System.out.println(c_total.get(java.util.Calendar.WEEK_OF_YEAR));
                while(x==1){
                    c_total.add(java.util.Calendar.DAY_OF_MONTH, -1);
                    x = c_total.get(java.util.Calendar.WEEK_OF_YEAR);
                }
                //如果结束时间刚好是星期天则不加1
                int weekNum  = DateUtils.dayForWeek(new SimpleDateFormat("yyyy-MM-dd").format(end));
                System.out.println(weekNum);
                int duoyu = 0;
                if(weekNum==7) {
                     duoyu = x - begin+1;
                }else{
                    duoyu = x - begin + 1+1;
                }
                weekTotal = over + duoyu;
            } else {
                //如果结束时间刚好是星期天则不加1
                int weekNum  = DateUtils.dayForWeek(new SimpleDateFormat("yyyy-MM-dd").format(end));
                if(weekNum==7){
                    weekTotal = over - begin ;
                }else{
                    weekTotal = over - begin + 1;
                }
            }
            if (c_begin.getWeekYear() != now.getWeekYear()) {
                //计算总周数
                int x = c_total.get(java.util.Calendar.WEEK_OF_YEAR);
                while(x==1){
                    c_total.add(java.util.Calendar.DAY_OF_MONTH, -1);
                    x = c_total.get(java.util.Calendar.WEEK_OF_YEAR);
                }
                int weekNum  = DateUtils.dayForWeek(new SimpleDateFormat("yyyy-MM-dd").format(start));
                int duoyu =0;
                if(weekNum==7){
                    duoyu = x - begin + 1+1;
                }else{
                    duoyu = x - begin + 1;
                }
                count = duoyu + z;
            } else {
                int weekNum  = DateUtils.dayForWeek(new SimpleDateFormat("yyyy-MM-dd").format(start));
                if(weekNum==7){
                    count = (z - begin + 1)+1;
                }else{
                    count = (z - begin + 1);
                }
            }
            if (c_end.getTime().getTime() < now.getTime().getTime() || count < 0) {
                //如果当前时间大于学期结束时间，默然显示第一周
                count = 1;
            }
        }  catch (Exception e) {
              e.printStackTrace();
        }
        return new int[]{count,weekTotal+1};
    }
    
   
   /**
    * 获取一段时间的总周数
    * @param begin
    * @param end
    * @return
    */
   public static long weekNum(String  begin,String  end)  {
	   
	   Long totalWeek = 0l;
       int ss = 1000;
       int mi = ss * 60;
       int hh = mi * 60;
       int dd = hh * 24;
       Long beginTime =strYMDToDate(begin).getTime();
       Long endTime =strYMDToDate(end).getTime();
       
       //得到总共的天数，因为开始时间没有计算进去故加1
       Long totalDay = (endTime-beginTime)/ dd;
       
	   Calendar cal = Calendar.getInstance();
       cal.setTime(strYMDToDate(begin));
       int sDate = cal.get(Calendar.DAY_OF_WEEK);
       
       Calendar cal1 = Calendar.getInstance();
       cal1.setTime(strYMDToDate(end));
       int eDate = cal1.get(Calendar.DAY_OF_WEEK);
       
	   if(sDate==eDate) {
		   totalWeek =(totalDay/7)+1;
	   }else if(sDate ==1) {
		   totalWeek = (totalDay/7)+2;  
	   }
	   else if(eDate==2) {
		   totalWeek = (totalDay/7)+2;  
	   }else if(eDate<sDate) {
		   totalWeek =(totalDay/7)+2;
	   }else {
		   totalWeek =(totalDay/7)+1;
	   }
	   
	   return totalWeek;
      
    }
 	public static Date strYMDToDate(String dateStr)  {
 		try {
			return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
 	}
 	
 	
 	 /**
     * 判断当前日期是星期几
     *
     * @param pTime 修要判断的时间
     * @return dayForWeek 判断结果
     * @Exception 发生异常
     */
    public static int dayForWeek(String pTime)  {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        java.util. Calendar c =  java.util. Calendar.getInstance();
        int dayForWeek = 0;
        try {
			c.setTime(format.parse(pTime));
			if(c.get( java.util. Calendar.DAY_OF_WEEK) == 1){
			    dayForWeek = 7;
			}else{
			    dayForWeek = c.get( java.util. Calendar.DAY_OF_WEEK) - 1;
			}
			return dayForWeek;
		} catch (ParseException e) {
			e.printStackTrace();
			return 0;
		}
    }
 	public static String dateToStrYMD (Date date)  {
 		return new SimpleDateFormat("yyyy-MM-dd").format(date);
 	}
 	/**
     * 当前时间所在一周的周一和周日时间
     * @param time 当前时间
     * @return
     */
    public static Map<String,String> getWeekDate(Date date) {
        Map<String,String> map = new HashMap();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
 
         Calendar cal = Calendar.getInstance();  
         cal.setTime(date);
         cal.setFirstDayOfWeek(Calendar.MONDAY);// 设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一  
         int dayWeek = cal.get(Calendar.DAY_OF_WEEK);// 获得当前日期是一个星期的第几天  
         if(dayWeek==1){
             dayWeek = 8;
         }
         System.out.println("要计算日期为:" + sdf.format(cal.getTime())); // 输出要计算日期  
 
         cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - dayWeek);// 根据日历的规则，给当前日期减去星期几与一个星期第一天的差值  
         Date mondayDate = cal.getTime();
         String weekBegin = sdf.format(mondayDate);  
         System.out.println("所在周星期一的日期：" + weekBegin);  
 
 
         cal.add(Calendar.DATE, 4 +cal.getFirstDayOfWeek());
         Date sundayDate = cal.getTime();
         String weekEnd = sdf.format(sundayDate);  
         System.out.println("所在周星期日的日期：" + weekEnd);
 
         map.put("mondayDate", weekBegin);
         map.put("sundayDate", weekEnd);
        return map;
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
	 	
 	
}
