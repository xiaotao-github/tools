package com.fengbiaoedu.njwl;
import cc.wulian.ihome.wan.NetSDK;
import cc.wulian.ihome.wan.entity.RegisterInfo;
import cc.wulian.ihome.wan.util.MD5Util;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
/**
 * Created by Administrator on 2018/5/15.
 */
public class ConnectThreadPool {
    private static ConnectThreadPool connectThreadPool = null;
    private  ScheduledThreadPoolExecutor scheduledThreadPool;
    private  Map<String,ConnectTask>  connectTaskMap;

    private  ConnectThreadPool(Integer poolSize){
        scheduledThreadPool = new ScheduledThreadPoolExecutor(poolSize);
        connectTaskMap = new HashMap<>();
    }

    public static ConnectThreadPool getThreadPool(){
        ConnectThreadPool inst = connectThreadPool;
        if(inst==null){
            synchronized (ConnectThreadPool.class){
                inst = connectThreadPool;
                if(inst==null){
                    inst = new ConnectThreadPool(500);
                    connectThreadPool = inst;
                }
            }
        }
        return inst;
    }

    /**
     * 添加链接任务
     * @param connectTask  任务信息
     * @return false添加失败  true 添加成功
     */
    public synchronized void addTask(final ConnectTask connectTask){
        if(connectTaskMap.get(connectTask.getWgId())==null){
            connectTaskMap.put(connectTask.getWgId(),connectTask);
        }
        //每15秒执行一次
        if(!NetSDK.isConnecting(connectTask.getWgId()) && !NetSDK.isConnected(connectTask.getDeviceId())){
            scheduledThreadPool.scheduleAtFixedRate(()->{
                if (NetSDK.isConnecting(connectTask.getWgId()) || NetSDK.isConnected(connectTask.getDeviceId())){
                    NetSDK.sendRefreshDevListMsg(connectTask.getWgId(), connectTask.getDeviceId());
                }else{
                    RegisterInfo mRegisterInfo = null;
                    if(StringUtils.isEmpty(connectTask.getDeviceId())){
                       mRegisterInfo = new RegisterInfo("862630030713128");
                    }else{
                        mRegisterInfo = new RegisterInfo(connectTask.getDeviceId());
                    }
                    if(StringUtils.isEmpty(connectTask.getPwd())){
                        connectTask.setPwd(connectTask.getWgId().substring(connectTask.getWgId().length()-6));
                    }
                    NetSDK.connect(connectTask.getWgId(), MD5Util.encrypt(connectTask.getPwd()), mRegisterInfo);
                    NetSDK.sendRefreshDevListMsg(connectTask.getWgId(), connectTask.getDeviceId());
                }
            },1,15, TimeUnit.SECONDS);
        }
    }
    /**
     * 停止运行
     */
    public void stop(){
        connectTaskMap.clear();
        scheduledThreadPool.shutdown();
    }
}

