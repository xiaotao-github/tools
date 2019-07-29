package com.vcooc.experiment.websocket;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.PongMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisService;
import com.vcooc.experiment.service.deviceService.IndexService;

@Component
public class ReciverImgWebsocketHandler implements WebSocketHandler {

	private static final Logger log = Logger.getLogger(ReciverImgWebsocketHandler.class);

	// 保存所有的用户session
	private static final ArrayList<WebSocketSession> users = new ArrayList<WebSocketSession>();

	private static final String USER_OPERATE_WORK_KEY = "userOperateWorkKey";
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private IndexService indexService;

	// 储存学生session 点对点发送数据
	private final static Map<String, WebSocketSession> sessionMap;

	static {
		sessionMap = new ConcurrentHashMap<String, WebSocketSession>(30000);
	}

	// 连接 就绪时
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {

		log.info("connect websocket success.......");

		URI data = session.getUri();
		String d = String.valueOf(data);
		// 如果没有sid 即判是否在硬件报告页面，否进行点对点发送 是 进行其他操作
		if (d.contains("sid")) {

			String[] a = d.split("sid");
			String[] t = a[1].split("=");
			String key = t[1];
			sessionMap.put(key, session);
			System.out.println("lianjie--------"+key);
		} else {

			users.add(session);
			Map<String, Object> attributes = session.getAttributes();
			Principal principal = session.getPrincipal();
			HttpHeaders handshakeHeaders = session.getHandshakeHeaders();
			String id = session.getId();
		}

	}

	// 处理信息
	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		/** zhangfengtang **/
		URI data = session.getUri();
		String d = String.valueOf(data);
		// 如果没有sid
		String userId ="";
		if (d.contains("sid")) {
			String[] a = d.split("sid");
			String[] t = a[1].split("=");
			userId = t[1];
		} else return;
	
		
		String imgData = message.getPayload().toString();
		ObjectMapper om = new ObjectMapper();
		String str = om.writeValueAsString(message.getPayload());
		System.out.println("处理图片数据--------"+imgData+"  "+message.getPayloadLength()+"  "+message.getPayload());
		if (imgData.equals("&") || StringUtils.isEmpty(imgData)) {
			return;
		}else {
			imgData = imgData.substring(1);
		}
		
		/*********************** 硬件实验数据websocket ***********************/
		String sessionId = session.getId();

		//硬件数据处理
		indexService.receiveImgData(userId, imgData);

	}

	// 处理传输时异常
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		// TODO Auto-generated method stub
	}

	// 关闭 连接时
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {

		log.info("connect websocket closed.......");

		// 关闭连接清空。
		URI data = session.getUri();
		String d = String.valueOf(data);
		// 如果没有sid 即判是否在硬件报告页面，否进行点对点发送 是 进行其他操作
		if (d.contains("sid")) {
			String[] a = d.split("sid");
			String[] t = a[1].split("=");
			String key = t[1];
			sessionMap.remove(key);
		}

		users.remove(session);
	}

	@Override
	public boolean supportsPartialMessages() {
		// TODO Auto-generated method stub
		return false;
	}

	/**
	 * 给所有用户发送 信息
	 * 
	 * @param message
	 *            消息对象
	 * @throws Exception
	 */
	public void sendMsgToAllUsers(WebSocketMessage<?> message) throws Exception {
		for (WebSocketSession user : users) {
			user.sendMessage(message);
		}
	}

	/**
	 * 给所有用户发送信息
	 * 
	 * @param str
	 *            json串
	 * @throws IOException
	 */
	public void sendMsgToAllUsers(String str) throws IOException {
		TextMessage message = new TextMessage(str, true);
		for (WebSocketSession user : users) {
			user.sendMessage(message);
		}
	}

	public void sendMsgToUser(String str, WebSocketSession user) throws IOException {
		TextMessage message = new TextMessage(str, true);
		user.sendMessage(message);
	}

	/**
	 * 指定用户发信息
	 * 
	 * @param str
	 *            json
	 * @param userId
	 *            用户id学号
	 * @throws IOException
	 */
	public void sendMsgToUser(String str, String userId) throws IOException {
		TextMessage message = new TextMessage(str, true);

		WebSocketSession session = sessionMap.get(userId);
		if (session != null && session.isOpen()) {
			try {
				session.sendMessage(message);
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}

}
