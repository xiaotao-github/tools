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
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisService;

/**
 * 此处请谨慎修改，此处涉及考勤机 websocke 页面session 的使用，和南京物联设备控制页面  websocke 页面session 的使用，以及2019-1-20 学生前端实时获取到图片数据的能使用。
 * 关于考勤机使用请先查看 吴楚斌交接文档 \考勤机项目说明[不清楚请先询问张工] 
 * 关于南京物联请先查看林文龙交接资料（关于南京物联方面）  [不清楚请先询问张工] 
 * 关于学生前端实时获取到图片数据的能使用 请查看 叶洁涛交接资料\ 智慧实验室项目框架技术介绍文档包含物联设备、考勤机、以及示波器介绍
 * @author ITcast
 *
 */
@Component
public class MyWebSocketHandler implements WebSocketHandler {

	private static final Logger log = Logger.getLogger(MyWebSocketHandler.class);

	// 保存所有的用户session
	private static final ArrayList<WebSocketSession> users = new ArrayList<WebSocketSession>();

	private static final String USER_OPERATE_WORK_KEY = "userOperateWorkKey";
	@Autowired
	private RedisService redisService;

	// 储存学生session 点对点发送数据
	private final static Map<String, WebSocketSession> sessionMap;

	static {
		sessionMap = new ConcurrentHashMap<String, WebSocketSession>(30000);
	}

	/**
	 * 保存用户控制考勤机的session</br>
	 * 一个用户 可以同时登陆多个浏览器 ，一个WebsocketSession有多个指令操作，具体数据结构如下</br>
	 * ConcurrentHashMap<String,ConcurrentHashMap<String,Object[]>>
	 * 外部key为userId</br>
	 * 内部Map保存同个userId的多个session，key为sessionId,value为Object[]</br>
	 * Object[]
	 * 长度为2，Obect[0]是一个Map,保存指令，key为指令名，value为指令名+cookie的vcoocuserId</br>
	 * Object[1]保存WebsocketSession</br>
	 */
	public static final ConcurrentHashMap<String, ConcurrentHashMap<String, Object[]>> CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP = new ConcurrentHashMap<>();

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
		/** wucb **/

		String msg = message.getPayload().toString();
		if (msg.equals("&") || StringUtils.isEmpty(msg)) {
			return;
		}
		/*********************** 考勤机websocket ***********************/
		String[] msgArray = msg.split(",");
		if (msgArray.length != 3) {
			return;
		}
		String cmd = msgArray[0];
		String userId = msgArray[1];
		String vcoocUserId = msgArray[2];

		String sessionId = session.getId();

		// 存在userIdSessionMap
		boolean existUserIdSessionMap = CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.containsKey(userId);
		// 存在
		boolean existUserSession = existUserIdSessionMap ? !CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId).isEmpty()
				: false;

		ConcurrentHashMap<String, Object[]> sessionIdMap = new ConcurrentHashMap<>();
		if (existUserSession) {
			sessionIdMap = CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId);
		}

		boolean existCmdMapAndSession = existUserSession ? !sessionIdMap.isEmpty() : false;
		Object[] cmdMapAndSession = new Object[2];
		ConcurrentHashMap<String, String> sessionCmdMap = new ConcurrentHashMap<>();
		if (existCmdMapAndSession) {
			cmdMapAndSession = sessionIdMap.get(sessionId);
			sessionCmdMap = (ConcurrentHashMap<String, String>) cmdMapAndSession[0];
		}
		// boolean existSessionCmdMap =
		// existCmdMapAndSession?!sessionCmdMap.isEmpty():false;

		String cmdvalue = msg;
		sessionCmdMap.put(cmd, cmdvalue);
		cmdMapAndSession[0] = sessionCmdMap;
		cmdMapAndSession[1] = session;
		sessionIdMap.put(sessionId, cmdMapAndSession);
		CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.put(userId, sessionIdMap);

		/*********************** 考勤机websocket ***********************/
		/** wucb **/
		// Gson gson = new Gson();
		//
		// // 将消息JSON格式通过Gson转换成Map
		// // message.getPayload().toString() 获取消息具体内容
		// Map<String, Object> msg =
		// gson.fromJson(message.getPayload().toString(),
		// new TypeToken<Map<String, Object>>() {}.getType());
		//
		// log.info("handleMessage......."+message.getPayload()+"..........."+msg);
		//
		//// session.sendMessage(message);
		//
		// // 处理消息 msgContent消息内容
		// TextMessage textMessage = new
		// TextMessage(msg.get("msgContent").toString(), true);
		// // 调用方法（发送消息给所有人）
		// sendMsgToAllUsers(textMessage);

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

		Map<String, Object> attributesMap = session.getAttributes();
		TeacherInfo teacherInfo = (TeacherInfo) attributesMap.get("teacherInfo");
		if (teacherInfo == null) {
			return;
		}
		String id = session.getId(); // sessionId
		String userId = String.valueOf(teacherInfo.getId());
		if (CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.containsKey(userId)
				&& !CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId).isEmpty()) {
			if (CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId).size() == 1) {
				// 移除redis的key
				CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.remove(userId);
			} else {
				CLOCKIN_USER_WEBWEBSOCKET_SESSION_MAP.get(userId).remove(id);
				// 移除所有key
			}
		}
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
