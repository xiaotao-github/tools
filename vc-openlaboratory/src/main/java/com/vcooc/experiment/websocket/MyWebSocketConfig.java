package com.vcooc.experiment.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebMvc
@EnableWebSocket
public class MyWebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {


        @Override
        public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

            //前台 可以使用websocket环境
            registry.addHandler(myWebSocketHandler(),"/websocket").addInterceptors(new HandshakeInterceptor());
            
            	//前台 可以使用websocket环境，硬件实验图片传输
            registry.addHandler(reciverImgWebsocketHandler(),"/reciverImgWebsocket").addInterceptors(new HandshakeInterceptor());

          //前台 不可以使用websocket环境，则使用sockjs进行模拟连接
            registry.addHandler(myWebSocketHandler(), "/sockjs/websocket").addInterceptors(new HandshakeInterceptor())
                    .withSockJS();
        }


        // reciverImgWebsocket 处理类
        @Bean
        public ReciverImgWebsocketHandler reciverImgWebsocketHandler(){
            return new ReciverImgWebsocketHandler();
        }
        
        // websocket 处理类
        @Bean
        public WebSocketHandler myWebSocketHandler(){
            return new MyWebSocketHandler();
        }


}
