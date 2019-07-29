package com.vcooc.experiment.websocket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;

public class GetMess extends Thread {
    Socket socket = null;



    public GetMess(Socket socket) {

        super();

        this.socket = socket;

    }



    @Override

    public void run() {

        // TODO Auto-generated method stub

        BufferedReader socketIn = null;

        try {

            InputStream is = socket.getInputStream();

            InputStreamReader isr = new InputStreamReader(is);

            socketIn = new BufferedReader(isr);

            String inTemp = null;

            while(true){

                inTemp = socketIn.readLine();

                if(inTemp != null && !"bye".equals(inTemp) ){

                    System.out.println("好友:\n"+inTemp);

                }else{

                    System.out.println("好友:\n已下线，关闭当前回话");

                    break;

                }

            }

        } catch (IOException e) {

            // TODO Auto-generated catch block

            e.printStackTrace();

        }finally {

            try {

                Thread.currentThread().interrupt();

                socketIn.close();

            } catch (IOException e) {

                // TODO Auto-generated catch block

                e.printStackTrace();

            }



        }



    }
}
