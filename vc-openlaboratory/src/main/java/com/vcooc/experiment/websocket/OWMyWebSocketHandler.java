package com.vcooc.experiment.websocket;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

/****
 * 实现Websocket建立连接、发送消息、断开连接等时候的处理类
 */
@Component
public class OWMyWebSocketHandler implements WebSocketHandler {

	private static final Logger log = Logger.getLogger(MyWebSocketHandler.class);
	
    /**连接 就绪时*/
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    	log.info("connect websocket success...**********************************************************************....");
    }

    /**处理信息*/
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

    }

    /**处理传输时异常*/
    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    /**关闭 连接时*/
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

    }

    /***/
    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
