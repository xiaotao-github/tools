package com.vcooc.experiment.mq;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.vcooc.experiment.websocket.MyWebSocketHandler;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

/**
 * MQ消息监听者
 * Created by 80513 on 2018/7/14.
 */
public class MsgQueueMessageListener  implements MessageListener{
	
	@Autowired
	private MyWebSocketHandler myWebSocketHandler;
	

	@Override
	public void onMessage(Message message) {
		if(message instanceof TextMessage){
        	String str = null;
			try {
				str = ((TextMessage) message).getText();
			} catch (JMSException e) {
				e.printStackTrace();
			}
        	if(!StringUtils.isEmpty(str)){
        		try {
					//EquipmentDTO readValue = ActiveMQProducer.MAPPER.readValue(str, EquipmentDTO.class);
					//推送消息
					myWebSocketHandler.sendMsgToAllUsers(str);
					//使用WebSocket 进行消息推送
				}catch(Exception ex){
					ex.printStackTrace();
				}
        	}
           // System.out.println("consumer get msg:"+((TextMessage) message).getText());
        }
		
	}
}
