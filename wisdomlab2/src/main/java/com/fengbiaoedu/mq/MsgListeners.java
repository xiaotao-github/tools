package com.fengbiaoedu.mq;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;

import javax.jms.Queue;
import javax.jms.Topic;

/**
 * Created by Administrator on 2018/7/18.
 */
@Configuration
@EnableJms
public class MsgListeners {
    @Value("${activemq.listenequmsg}")
    private String listenequmsg;
    @Value("${activemq.quecontrlqueue}")
    private String quecontrlqueue;
    
    @Value("${activemq.clockInMsgQueue}")
    private String clockInMsgQueue;
    
    @Value("${activemq.enrollDataQueue}")
    private String enrollDataQueue;
    
    @Value("${activemq.clockMachineRequestResultQueue}")
    private String clockMachineRequestResultQueue;
    @Value("${activemq.operateClockMachineResultQueue}")
    private String operateClockMachineResultQueue;
    
    @Bean
    public Queue queControllQueue(){
        return new ActiveMQQueue(quecontrlqueue);
    }
    @Bean
    public Topic queMsgTopic(){
        return new ActiveMQTopic(listenequmsg);
    }
    
    //用于考勤信息的队列
    @Bean
    public Queue clockInMsgQueue() {
    	return new ActiveMQQueue(clockInMsgQueue);
    }
    
    //操作考勤机指令的队列
    @Bean
    public Queue enrollDataQueue() {
    	return new ActiveMQQueue(enrollDataQueue);
    }
    
    @Bean
    public Queue clockMachineRequestResultQueue() {
    	return new ActiveMQQueue(clockMachineRequestResultQueue);
    }
    @Bean
    public Queue operateClockMachineResultQueue() {
    	return new ActiveMQQueue(operateClockMachineResultQueue);
    }
}
