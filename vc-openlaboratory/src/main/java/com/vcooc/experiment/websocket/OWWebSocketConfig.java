package com.vcooc.experiment.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/****
 * WebSocket配置类（这里也可以用配置文件来实现其实），实现接口来配置Websocket请求的路径和拦截器
 */
public class OWWebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //请求路径和拦截器
        registry.addHandler(myWebSocketHandler(),"/owwebsocket").addInterceptors(new HandshakeInterceptor());
    }

    @Bean
    public WebSocketHandler myWebSocketHandler(){
        return new MyWebSocketHandler();
    }
}
