package com.vcooc.experiment.websocket;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.vcooc.base.pojo.OWRequest;
import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.net.DatagramPacket;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class ChatServer {

    public static void main(String[] args) {
        try {// 建立服务器连接
            ServerSocket server = new ServerSocket(1999);//创建  ServerSocket类
            System.out.println("服务器准备启动");
            Socket socket = server.accept();// 等待客户连接
            System.out.println("等待连接");
            try {
                DataInputStream in = new DataInputStream(socket
                        .getInputStream());// 读取客户端传过来信息的DataInputStream


                DataOutputStream out = new DataOutputStream(socket
                        .getOutputStream());// 向客户端发送信息的DataOutputStream

                OWRequest owRequest = new OWRequest();
                Map map = new HashMap();
                map.put("username","888tt");
                map.put("password","888tt");
                owRequest.setArgument(map);
                owRequest.setSequence(1017);
                owRequest.setType("login");
                JSON json = JSONUtil.parse(owRequest);
                out.writeUTF(String.valueOf(json));
//                System.out.println("服务端发送："+json);

                Scanner scanner = new Scanner(System.in);//从键盘接受数据
                while (true) {
                    String accpet = in.readUTF();// 读取来自客户端的信息
                    System.out.println(accpet);
                    System.out.println(accpet);//输出来自客户端的信息

                    String send = scanner.nextLine();//nextLine方式接受字符串
                    System.out.println("服务器：" + send);//输出提示信息
                    out.writeUTF("服务器：" + send);//把服务器端的输入发给客户端
                }
            } finally {// 建立连接失败的话不会执行socket.close();
                socket.close();//关闭连接
                server.close();//关闭
            }
        } catch (IOException e) {//捕获异常
            e.printStackTrace();
        }
    }




//    public static void main(String[] args) {//主程序方法
//        ServerSocket server = null;
//        Socket sc = null;
//        DataInputStream din = null;
//        DataOutputStream dout = null;
//        try{
//            server=new ServerSocket(9999);
//            System.out.println("开始对端口9999进行监听");
//            while(true) {
//                System.out.println("===================服务器即将启动，等待客户端的连接===============");
//                sc = server.accept();
//                System.out.println(new Date());
//                System.out.println("连接成功");
//
//                System.out.println("客户端IP为："+sc.getInetAddress().getHostAddress()+"****端口为："+sc.getPort());
//
//                /**********************************服务端接收客户端消息开始*************************************/
//                InputStream is = sc.getInputStream();
////                InputStreamReader isr = new InputStreamReader(is);
////                BufferedReader br = new BufferedReader(isr);
//
////                byte[] b = new byte[is.available()];
//                byte[] b = new byte[1024];
//                int len ;
//                /**
//                 * readLine（）这个方法本身有一个注意点，它读取的是一整行，遇见‘\n’或 ‘ \r’ 代表读取结束。因为用的是网络助手作为客户端 ，
//                 * 每次发送消息时并不会添加‘\n’，而用控制台作为客户端进行发送时，按下回车的时候就已经添加了‘\n’，所以服务器端进行接收的时候就是实时显示的。
//                 */
//                while ((len = is.read(b)) != -1) {
//
//                    String message = new String(b, "UTF-8").trim();
//                    System.out.println(message);
//                    //
//
////                    hexString =  hexString.replace( " ","" );//去除空格
////
////                    String asc = HexConvert.convertHexToString(hexString);//转为ASCII,如：*00007VERSION\n1$
////
////                    System.out.println("收到 " + sc.getInetAddress().getHostAddress() + " 发来的消息：" + asc);
//
////                    System.out.println("收到客户端信息时间为"+new Date());
////                    String str = new String(b, 0, len);
////                    System.out.println("原始数据为"+str);
////                    //将字节数组转换为16进制字符串
////                    String hexString = bytes2HexStr(b);
////                    System.out.println("解密数据为"+hexString);
////
////                    //获取当前字符串编码格式
////                    String encode = getEncoding(str);
////                    System.out.println(encode);
////                    //测试转换之后的字符串是否与没转换的一致
////                    String encodeTest = new String(str.getBytes("UTF-8"),"GB2312");
////                    System.out.println("******************1我是服务器端，客户端说：" + encodeTest+"********************");
////                    String encode2 = getEncoding(encodeTest);
////                    System.out.println("测试编码"+encode2);
////
////                    //转换字符串编码格式
////                    byte[] utf8Bytes = str.getBytes("GBK");
////                    String utf8Str = new String(utf8Bytes, "UTF-8");
////
//////                    String s = new String(str.getBytes("UTF-16"),"UTF-8");
////
////                    System.out.println("******************我是服务器端，客户端说：" + utf8Str+"********************");
//////                    System.out.println("/******************我是服务器端，客户端说：" + s+"********************/");
//
//
//
//                    /**********************************服务端发送消息开始*************************************/
////                    DataOutputStream out = new DataOutputStream(sc
////                            .getOutputStream());// 向客户端发送信息的DataOutputStream
//
////                    out.writeUTF("http://www.baidu.com");
//                    /**********************************服务端发送消息结束*************************************/
////                        OutputStream os = sc.getOutputStream();
////                        OutputStreamWriter osw = new OutputStreamWriter(os);
////                        BufferedWriter bw = new BufferedWriter(osw);
////                        HeartResultBean heartResultBean = new HeartResultBean();
////                        heartResultBean.setDescription("heart success");
////                        heartResultBean.setResult("true");
////                        heartResultBean.setSession("");
////                        bw.write("0x02"+JSONUtil.parse(heartResultBean)+"0x03");
////                        System.out.println("0x02"+JSONUtil.parse(heartResultBean)+"0x03");
//                /**********************************服务端接收客户端消息结束*************************************/
//                    //每次读取信息的时候 检查是否还是连接状态
//                    //使用available()方法， 返回大于0的表示连接，小于等于0 的是关闭连接
//                    if(is.available()<=0)
//                        System.out.println("连接已关闭");
//                        break;
//                }
//
//            }
//        }catch(Exception e){
//            e.printStackTrace();
//        }finally {
//            try {
//                din.close();
//                dout.close();
//                sc.close();
//                server.close();//可以注释掉
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
////        new ChatServer().service();//调用 service方法
//    }


    public static String getEncoding(String str) {
        String encode = "GB2312";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s = encode;
                return s;
            }
        } catch (Exception exception) {
        }
        encode = "ISO-8859-1";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s1 = encode;
                return s1;
            }
        } catch (Exception exception1) {
        }
        encode = "UTF-8";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s2 = encode;
                return s2;
            }
        } catch (Exception exception2) {
        }
        encode = "GBK";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s3 = encode;
                return s3;
            }
        } catch (Exception exception3) {
        }
        return "";
    }


    //byte转为hex串
    public static String bytes2HexStr(byte[] byteArr) {
        if (null == byteArr || byteArr.length < 1) return "";
        StringBuilder sb = new StringBuilder();
        for (byte t : byteArr) {
            if ((t & 0xF0) == 0) sb.append("0");
            sb.append(Integer.toHexString(t & 0xFF));  //t & 0xFF 操作是为去除Integer高位多余的符号位（java数据是用补码表示）
        }
        return sb.toString();
    }

    //hex串转为byte
    public static byte[] hexStr2Bytes(String hexStr) {
        if (null == hexStr || hexStr.length() < 1) return null;

        int byteLen = hexStr.length() / 2;
        byte[] result = new byte[byteLen];
        char[] hexChar = hexStr.toCharArray();
        for(int i=0 ;i<byteLen;i++){
            result[i] = (byte)(Character.digit(hexChar[i*2],16)<<4 | Character.digit(hexChar[i*2+1],16));
        }

        return result;
    }

        /**
        public static void main(String[] args) {
            // TODO 自动生成的方法存根
            int port = 4404;
            // 首先直接创建serversocket
            ServerSocket serverSocket = null;
            Socket socket = null;
            try {
                serverSocket = new ServerSocket(port);
                System.out.println("启动socketServer成功,等待客户端的连接");
                while (true) {
                    socket = serverSocket.accept();
                    System.out.println("有新的客户端请求连接");
                    //                //获取客户端信息
                    BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                    String clientContent = input.readLine();
                    System.out.println(clientContent);
                    System.out.println("不触发了吗?");
                    SocketThread st = new SocketThread(socket);
                    st.start();
                    ChatManager.getChatManager().add(st);


                    //启动定时任务，如果10s内没有进程
                /*Runnable runnable = new Runnable() {
                    int clientNum = 0;
                    public void run() {
                        // task to run goes here
                        clientNum = ChatManager.getChatManager().vector.size();
                        System.out.println("剩余客户端数量:"+clientNum);
                        if(clientNum ==0 ){
                            System.out.println("连接超时，或者无客户端连接，关闭serverSocket");
                            //关闭socket
                            //.....
                        }
                    }
                };
                ScheduledExecutorService service = Executors
                        .newSingleThreadScheduledExecutor();
                // 第二个参数为首次执行的延时时间，第三个参数为定时执行的间隔时间
                service.scheduleAtFixedRate(runnable, 2, 10, TimeUnit.SECONDS);  */


    /**
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            System.out.println("出现异常了");
        } finally {
            System.out.println("serverSocket已超时");
            try {
                socket.close();
                serverSocket.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
    */
}
