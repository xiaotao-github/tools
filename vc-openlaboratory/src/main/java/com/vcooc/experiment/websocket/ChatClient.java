package com.vcooc.experiment.websocket;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONUtil;
import com.vcooc.base.pojo.OWRequest;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class ChatClient {
    public static void main(String[] args) {
        try {
            System.out.println("开始");
            // 连接到服务器
            Socket socket = new Socket("192.168.100.10", 1999);//创建Socket类对象
            try {
                DataInputStream in = new DataInputStream(socket
                        .getInputStream());// 读取服务器端传过来信息的DataInputStream

                DataOutputStream out = new DataOutputStream(socket
                        .getOutputStream());// 向服务器端发送信息的DataOutputStream

                Scanner scanner = new Scanner(System.in);// 装饰标准输入流，用于从控制台输入

                while (true) {
                    String send = scanner.nextLine();//读取控制台输入的内容
                    System.out.println("客户端：" + send);//输出键盘输出内容提示 ，也就是客户端向服务器端发送的消息
                    // 把从控制台得到的信息传送给服务器
                    out.writeUTF("客户端：" + send);//将客户端的信息传递给服务器


                    String accpet = in.readUTF();// 读取来自服务器的信息
                    System.out.println(accpet);//输出来自服务器的信息

//                    OWRequest owRequest = new OWRequest();
//                    Map map = new HashMap();
//                    map.put("username","888tt");
//                    map.put("password","888tt");
//                    owRequest.setArgument(map);
//                    owRequest.setSequence(1017);
//                    owRequest.setType("login");
//                    JSON json = JSONUtil.parse(owRequest);
//                    out.writeUTF(String.valueOf(json));

//                    byte[]arr=new byte[1024];
//                    int len=in.read(arr);
//                    System.out.println(new String(arr,0,len));

                    System.out.println("连接成功了吗？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？");
                }
            } finally {
                socket.close();//关闭Socket监听
            }
        } catch (IOException e) {//捕获异常
            e.printStackTrace();
        }
    }


//    public static void main(String[] args) {//主程序方法
//        Socket sc=null;
//        DataInputStream din = null;
//        DataOutputStream dout = null;
//        try{
//            while(true) {
//                sc = new Socket(InetAddress.getLocalHost(), 9999);
//                System.out.println("===================客户端即将启动，等待服务器的连接===============");
//                din = new DataInputStream(sc.getInputStream());
//                dout = new DataOutputStream(sc.getOutputStream());
//
//
////            dout.writeUTF("hao");
//                /**发送给服务端消息**/
//
//                String encodeTest = new String("njkbkbkbjkbjk".getBytes("GB2312"),"UTF-8");
//                dout.writeUTF(encodeTest);
//
//                Scanner scanner = new Scanner(System.in);//从键盘接受数据
//                String send = scanner.nextLine();//nextLine方式接受字符串
//                System.out.println("服务器：" + send);//输出提示信息
//                dout.writeUTF("服务器：" + send);//把服务器端的输入发给客户端
//
//                /**读取服务端发送的消息*/
////                DataInputStream in = new DataInputStream(sc
////                        .getInputStream());// 读取服务器端传过来信息的DataInputStream
////                String accpet = in.readUTF();// 读取来自服务器的信息
////                System.out.println(accpet);//输出来自服务器的信息
//
//
//                InputStream is = sc.getInputStream();
//                byte[] b = new byte[1024 * 5];
//                int len;
//                while ((len = is.read(b)) != -1) {
//                    System.out.println("收到服务端信息时间为" + new Date());
//                    String message = new String(b, "UTF-8").trim();
//                    System.out.println("服务端端发送的内容为：" + message);
//                }
////            InputStream is = sc.getInputStream();
////            byte[] b = new byte[200];
////            int len;
////            while ((len = is.read(b)) != -1) {
////                System.out.println(new Date());
////                String str = new String(b, 0, len);
////                System.out.println("我是客户端，服务端说：" + str);
////            }
////            System.out.println(din.readUTF());
//            }
//        }catch(Exception e){
//            e.printStackTrace();
//        }finally {
//            try {
//                din.close();
//                dout.close();
//                sc.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
////        new ChatClient().chat();//调用chat方法
//    }

    /***
    public static void main(String[] args) {
        try {

            //初始化客户端

            Socket socket = new Socket("127.0.0.1", 4404);

            BufferedReader readline = new BufferedReader(new InputStreamReader(System.in));

            //获取输出打印流

            PrintWriter socketOut = new PrintWriter(socket.getOutputStream());

            String outTemp = null;

            System.out.println("开始准备向服务器端发起请求---\n自己:");

            // 已启动连接socket服务器，准备实时接收来自其他客户端的消息

            GetMess getMess = new GetMess(socket);

            getMess.start();

            // 通过控制台发送消息给其他客户端，以“bye”为结束语

            while ((outTemp = readline.readLine()) != null) {

                //发送信息

                socketOut.println(outTemp);

                socketOut.flush();

                if("bye".equals(outTemp)){

                    break;

                }

            }

            getMess.currentThread().interrupt();

            //依次关闭各种流

            readline.close();

            socketOut.close();

            socket.close();

        } catch (UnknownHostException e) {

            // TODO Auto-generated catch block

            e.printStackTrace();

        } catch (IOException e) {

            // TODO Auto-generated catch block

            e.printStackTrace();

        }
    }

    */

}
