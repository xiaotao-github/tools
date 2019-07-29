package com.vcooc.experiment.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;

@Component
public class ClockinConfig {
    private static final String  FORMAT= "HH:mm";

    @Value("${course.A}")
    private String A; //1-2节
    @Value("${course.B}")
    private String B; //3-4节
    @Value("${course.C}")
    private String C; //午休
    @Value("${course.D}")
    private String D;//5-6节
    @Value("${course.E}")
    private String E; //7-8节
    @Value("${course.F}")
    private String F; //9-10节

    private Long startA;
    private Long endA;
    private Long startB;
    private Long endB;
    private Long startC;
    private Long endC;
    private Long startD;
    private Long endD;
    private Long startE;
    private Long endE;
    private Long startF;
    private Long endF;

    public Long getStartA() {
        if(startA==null){
            String time =  A.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startA =  dateTime.getTime();
        }
        return startA;
    }
    public Long getEndA() {
        if(endA==null){
            String time =  A.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endA =  dateTime.getTime();
        }
        return endA;
    }

    public Long getStartB() {
        if(startB==null){
            String time =  B.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startB =  dateTime.getTime();
        }
        return startB;
    }

    public Long getEndB() {
        if(endB==null){
            String time =  B.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endB =  dateTime.getTime();
        }
        return endB;
    }

    public Long getStartC() {
        if(startC==null){
            String time =  C.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startC =  dateTime.getTime();
        }
        return startC;
    }

    public Long getEndC() {
        if(endC==null){
            String time =  C.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endC =  dateTime.getTime();
        }
        return endC;
    }

    public Long getStartD() {
        if(startD==null){
            String time =  D.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startD =  dateTime.getTime();
        }
        return startD;
    }

    public Long getEndD() {
        if(endD==null){
            String time =  D.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endD =  dateTime.getTime();
        }
        return endD;
    }

    public Long getStartE() {
        if(startE==null){
            String time =  E.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startE =  dateTime.getTime();
        }
        return startE;
    }

    public Long getEndE() {
        if(endE==null){
            String time =  E.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endE =  dateTime.getTime();
        }
        return endE;
    }

    public Long getStartF() {
        if(startF==null){
            String time =  F.split("-")[0];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            startF =  dateTime.getTime();
        }
        return startF;
    }

    public Long getEndF() {
        if(endF==null){
            String time =  F.split("-")[1];
            DateTime dateTime = DateUtil.parse(time, FORMAT);
            endF =  dateTime.getTime();
        }
        return endF;
    }
    /**
     * 获取每一节课的开始时间 
     * @param prefix  每一节课的前缀 A B C D E F
     * @return 返回对应时间的long值
     */
    public String getStart(String prefix){
    	switch (prefix) {
		case "A":
			return A.split("-")[0];
		case "B":
			return B.split("-")[0];
		case "C":
			return C.split("-")[0];
		case "D":
			return D.split("-")[0];
		case "E":
			return E.split("-")[0];
		case "F":
			return F.split("-")[0];
		default:
			return null;
		}
    }
    
    public String getTime(String prefix){
    	switch (prefix) {
		case "A":
			return A;
		case "B":
			return B;
		case "C":
			return C;
		case "D":
			return D;
		case "E":
			return E;
		case "F":
			return F;
		default:
			return null;
		}
    }
    
    /**
     * 获取当前是第几节课
     * @return  {@link}Map<String,String>  slice:节数  isNow : 是否在当前课程  0.否 1.是         
     */
    public Map<String,String> getNowSlice(){
    	Map<String,String> map = new HashMap<String,String>();
    	String now = DateUtil.now().split(" ")[1];
    	Long nowLong = DateUtil.parse(now).getTime();
    	//若当天最后一节课结束，则无课 返回none
    	if(nowLong>getEndF())return null;
    	//判断当前时间是第几节
    	if(nowLong>getStartA() && nowLong<getEndA()){
    		map.put("slice","A");
    		if(nowLong<getStartA()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	if(nowLong>getEndA() && nowLong<getEndB()){
    		map.put("slice","B");
    		if(nowLong<getStartB()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	if(nowLong>getEndB() && nowLong<getEndC()){
    		map.put("slice","C");
    		if(nowLong<getStartC()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	if(nowLong>getEndC() && nowLong<getEndD()){
    		map.put("slice","D");
    		if(nowLong<getStartD()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	if(nowLong>getEndD() && nowLong<getEndE()){
    		map.put("slice","E");
    		if(nowLong<getStartE()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	if(nowLong>getEndE() && nowLong<getEndF()){
    		map.put("slice","F");
    		if(nowLong<getStartF()){
    			map.put("isNow", "0");
    		}else{
    			map.put("isNow", "1");
    		}
    	}
    	//若无 则返回null
    	return map;
    }
}

