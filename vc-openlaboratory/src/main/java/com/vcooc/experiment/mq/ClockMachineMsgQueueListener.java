package com.vcooc.experiment.mq;

import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.WebSocketSession;

import com.vcooc.experiment.websocket.MyWebSocketHandler;

public class ClockMachineMsgQueueListener implements MessageListener {
	
	@Autowired
	private MyWebSocketHandler myWebSocketHandler;
	
	@Override
	public void onMessage(Message message) {
		if(message instanceof TextMessage){
        	String str = null;
			try {
				/*
				 * str 组成：通过","分隔，   长度为4 
				 * 第一个： cmd 考勤机指令
				 * 第二个：userId
				 * 第三个：cmdValue
				 * 第四个： msg  返回的显示的内容
				 */
				str = ((TextMessage) message).getText();
			} catch (JMSException e) {
				e.printStackTrace();
			}
			//
        	if(!StringUtils.isEmpty(str)){
        		try {
					//推送消息
        			String[] strArray = str.split(",");
        			String cmd = strArray[0];
        			String userId = strArray[1];
        			String vcoocUserId  =strArray[2];
        			String msg =strArray[3];
        			String cmdValue = str.replaceAll(","+msg, "");
        			ConcurrentHashMap<String,Object[]> sessionIdMap = MyWebSocketHandler.CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId);
					if(sessionIdMap !=null && !sessionIdMap.isEmpty()) {
						Set<Entry<String, Object[]>> cmdMapAndSessionSet = sessionIdMap.entrySet();
						
						for (Entry entry : cmdMapAndSessionSet) {
							String key = (String) entry.getKey();
							Object[] cmdMapAndSession = (Object[]) entry.getValue();
							ConcurrentHashMap< String, String> sessionCmdMap = (ConcurrentHashMap<String, String>) cmdMapAndSession[0];
							if(sessionCmdMap.containsKey(cmd)&& cmdValue.equals(sessionCmdMap.get(cmd))) {
								WebSocketSession session =(WebSocketSession) cmdMapAndSession[1];
								myWebSocketHandler.sendMsgToUser(msg, session);
							}
						}
					}
        			//使用WebSocket 进行消息推送
				}catch(Exception ex){
					ex.printStackTrace();
				}
        	}
           // System.out.println("consumer get msg:"+((TextMessage) message).getText());
        }

	}

}
