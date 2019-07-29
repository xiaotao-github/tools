package com.vcooc.experiment.websocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketThread extends Thread {
    ServerSocket serverSocket = null;

    Socket socket = null;

    public SocketThread(ServerSocket serverSocket,Socket socket) {
        super();
        this.serverSocket = serverSocket;
        this.socket = socket;
    }

    public SocketThread(Socket socket) {
        super();
        this.socket = socket;
    }

    public void out(String out) {
        try {
            socket.getOutputStream().write(out.getBytes("utf-8"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void publish(String out){
        ChatManager.getChatManager().publish(this, out);
    }
    @Override
    public void run() {
        // TODO Auto-generated method stub
        BufferedReader socketIn = null;
        PrintWriter socketOut = null;
        String inMess = null;
        try {
            socketIn = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            socketOut = new PrintWriter(socket.getOutputStream());
            while (true) {
                inMess = socketIn.readLine();
                publish(inMess);
                if("bye".equals(inMess)){
                    ChatManager.getChatManager().remove(this);
                }
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            try {
                System.out.println("已结束当前会话");
                socketOut.close();
                socketIn.close();
                socket.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }
}
