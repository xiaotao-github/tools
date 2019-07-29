package com.vcooc.experiment.mq;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 控制设备指令消息  生产者
 * @author Administrator
 */
@Service("activeMQProducer")
public class ActiveMQProducer {
	@Autowired
	private JmsTemplate jmsTemplate;
	public static final ObjectMapper MAPPER = new ObjectMapper();
	
	public void sendMessage(final ControlEuqData controlEuqData){
		jmsTemplate.send(new MessageCreator() {
			@Override
			public Message createMessage(Session session) throws JMSException {
				String str;
				try {
					str = MAPPER.writeValueAsString(controlEuqData);
					return session.createTextMessage(str);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
				return session.createTextMessage();
			}
		});
	}
}
