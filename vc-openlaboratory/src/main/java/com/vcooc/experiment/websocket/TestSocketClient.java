package com.vcooc.experiment.websocket;

import java.io.*;
import java.net.Socket;
import java.util.Scanner;

/**
 * socket客户端
 */
public class TestSocketClient {
//    public static void main(String[] args) {
//        BufferedReader bufferedReader=null;
//        InputStreamReader inputStreamReader=null;
//        InputStream inputStream=null;
//        OutputStreamWriter writer=null;
//        OutputStream outputStream=null;
//        Socket socket=null;
//        try {
//            socket = new Socket("192.168.100.10", 10068);
//            outputStream = socket.getOutputStream();//得到一个输出流，用于向服务器发送数据
//            writer=new OutputStreamWriter(outputStream,"UTF-8");//将写入的字符编码成字节后写入一个字节流
//            while (true) {
//                System.out.println("请输入数据：");
//                Scanner sc = new Scanner(System.in);
//                String data = sc.nextLine();
//                writer.write(data);
//                writer.flush();//刷新缓冲
//                socket.shutdownOutput();//只关闭输出流而不关闭连接
//                //获取服务器端的响应数据
//
//
//                inputStream = socket.getInputStream();//得到一个输入流，用于接收服务器响应的数据
//                inputStreamReader = new InputStreamReader(inputStream,"UTF-8");//将一个字节流中的字节解码成字符
//                bufferedReader = new BufferedReader(inputStreamReader);//为输入流添加缓冲
//                String info = null;
//                System.out.println("客户端IP地址:"+socket.getInetAddress().getHostAddress()+"   端口为："+socket.getPort());
//
//                //输出服务器端响应数据
//                while ((info = bufferedReader.readLine()) != null) {
//                    System.out.println("客户端接收：" + info);
//                }
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }finally {
//            //关闭资源
//            try {
//                bufferedReader.close();
//                inputStreamReader.close();
//                inputStream.close();
//                writer.close();
//                outputStream.close();
//                socket.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//    }

    public static void main(String[] args) {
        try {
            System.out.println("开始");
            // 连接到服务器
            Socket socket = new Socket("192.168.100.10", 9999);//创建Socket类对象
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
                    out.writeUTF(send);//将客户端的信息传递给服务器

                    //客户端发送消息给服务器
                    InputStream is = socket.getInputStream();
                    byte[] b = new byte[1024 * 10];
                    int len;
                    while ((len = is.read(b)) != -1) {
                        String message = new String(b, 0, len, "UTF-8").trim();
//                        String accpet = in.readUTF();// 读取来自服务器的信息
                        System.out.println(message);//输出来自服务器的信息
                    }

                }
            } finally {
                socket.close();//关闭Socket监听
            }
        } catch (IOException e) {//捕获异常
            e.printStackTrace();
        }
    }
}
