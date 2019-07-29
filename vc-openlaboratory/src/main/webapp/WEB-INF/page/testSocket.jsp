<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
   <head>
   <meta charset="utf-8">
   <title>菜鸟教程(runoob.com)</title>
    
      <script type="text/javascript">
         function WebSocketTest()
         {
             var argument={
                 password:"888tt",
                 username:"888tt"
             };

             var message={
                 argument:argument,
                 type:"login",
                 sequence:1017
             };
             alert("0x02"+JSON.stringify(message)+"0x03");
            if ("WebSocket" in window)
            {
               alert("您的浏览器支持 WebSocket!");
               
               // 打开一个 web socket
                var ws = new WebSocket("ws://47.89.253.178:11500");
               /*var ws = new WebSocket("ws://localhost:1983"+"/owwebsocket");*/
               alert("开始了吗？");
               ws.onopen = function()
               {
                   var argument={
                       password:"888tt",
                       username:"888tt"
                   };

                   var message={
                       argument:argument,
                       type:"login",
                       sequence:1017
                   };
                   alert(0x02+JSON.stringify(message)+0x03);
                   ws.send(0x02+JSON.stringify(message)+0x03);
            	  alert("数据发送中");
               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }
      </script>
        
   </head>
   <body>
   
      <div id="sse">
         <a href="javascript:WebSocketTest()">运行 WebSocket</a>
      </div>
      
   </body>
</html>