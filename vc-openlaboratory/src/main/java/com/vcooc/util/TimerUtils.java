package com.vcooc.util;

import java.util.Timer;
import java.util.TimerTask;
/**
 * 任务工具类
 * @author Administrator
 *
 */
public class TimerUtils {
	
	public static  boolean isRun = false;
	private static Timer timer = new Timer(true);
	
	private TimerUtils() {
	}
	//开始任务 间隔时间 10分钟
	public static void startRun(TimerTask tt) {
		if(!isRun) {
			timer.schedule(tt,10*60*1000);
			isRun = true;
		}
	}
	//中断任务
	public static void cancel() {
		timer.cancel();
		isRun = true;
	}
}
