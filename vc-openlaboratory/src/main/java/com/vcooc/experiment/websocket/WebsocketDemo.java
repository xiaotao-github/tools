package com.vcooc.experiment.websocket;




import cn.hutool.json.JSONObject;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.HashMap;
import java.util.Map;

@ServerEndpoint("/owwebsockettest")
public class WebsocketDemo {

//    private Logger logger = LoggerFactory.getLogger(WebsocketDemo.class);

    @OnOpen
    public void onOpen(Session session) {
//        logger.info("开始连接");
        System.out.println("开始连接");
    }

    @OnMessage
    public void OnMessage(String message) {
//        logger.info("开始接收数据"+message);
        System.out.println("开始接收数据"+message);
    }

    @OnClose
    public void onClose(){
//        logger.info("关闭连接");
        System.out.println("关闭连接");
    }

}
