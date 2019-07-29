package com.vcooc.experiment.websocket;


import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSONObject;
import com.vcooc.base.pojo.owbean.GatewayMessage;
import com.vcooc.base.pojo.owbean.RequestBean;
import com.vcooc.util.JSONUtils;
import net.sf.json.JSONArray;


import java.io.DataInputStream;
import java.io.InputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {
//    public static void main(String[] args) {
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("type","123");
//        Map map = new HashMap();
//        map.put("mac","12");
//        map.put("session","12");
//        jsonObject.put("argument",map);
//        System.out.println(jsonObject);
//
//        GatewayMessage gatewayMessage = jsonObject.getObject("argument",GatewayMessage.class);
//        System.out.println(gatewayMessage);
//        System.out.println(gatewayMessage.getMac());
//    }


//
//    public static void main(String[] args) {
////        String json = "[{\"OnLineGap\":\"60000\"}]";
////        JSONArray array = JSONArray.fromObject(json);
////        net.sf.json.JSONObject jsonObject = array.getJSONObject(0);
////        System.out.println(jsonObject.get("OnLineGap"));
//
//        List list = new ArrayList();
////        list.add("{\"type\":\"server\",\"command\":\"connect\",\"argument\":{\"mac\":\"00606EFFFEC0E1A3\",\"name\":\"888tt\",\"version\":\"X3_N_HA_V1.1.6_Beta_20190329\",\"country\":\"China\",\"state\":\"Fujian\",\"zipcode\":\"361000\"}}");
////        list.add("{\"type\":\"server\",\"command\":\"getTimeZonePar\",\"argument\":{\"TimeArea\":\"China/ShangHai\"}}");
////        list.add("{\"type\":\"update\",\"command\":\"epList\",\"argument\":{\"total\":0,\"start\":0,\"count\":0,\"epList\":[]}}");
////        JSONArray array = JSONArray.fromObject(list);
////        System.out.println(array);
////        for (int i=0;i<array.size();i++) {
////            net.sf.json.JSONObject jsonObject = array.getJSONObject(i);
////            System.out.println(jsonObject.get("type"));
////            System.out.println(jsonObject.get("argument"));
////        }
//
//        list.add("{\"type\":\"server\",\"command\":\"GWAuth\",\"argument\":{\"mac\":\"00606EFFFEC0E1A3\",\"apptoken\":\"4122D062FCF76CE7C25C2BD142AFD6146D716627\",\"session\":\"jnphlHc4b19TQtG\",\"softversion\":\"X3_N_HA_V1.1.6_Beta_20190329\",\"softversionnum\":10106,\"protocol\":\"tcp\",\"protocolversion\":\"1\",\"deviceType\":1,\"devModel\":\"X3_N\",\"chiptype\":\"MTK7687F\",\"wifitype\":7687,\"dst\":false,\"timezone\":0,\"area\":\"China/ShangHai\",\"agentid\":\"\"}}");
//        JSONArray array = JSONArray.fromObject(list);
////        System.out.println(array);
//        for (int i=0;i<array.size();i++) {
//            net.sf.json.JSONObject jsonObject = array.getJSONObject(i);
//            System.out.println(jsonObject.get("argument"));
//            System.out.println(jsonObject.get("argument").toString());
//            GatewayMessage gatewayMessage1 = JSONObject.parseObject(jsonObject.get("argument").toString(),GatewayMessage.class);
////            GatewayMessage gatewayMessage = (GatewayMessage) jsonObject.get("argument");
////            JSONUtil.parseObj(s);
////            System.out.println(gatewayMessage);
//            System.out.println(gatewayMessage1);
//        }
//    }

    public static void main(String[] args) {
        Socket socket = null;
        DataInputStream dis = null;
        InputStream is = null;
        try {
            socket = new Socket("192.168.100.10",9999);
            is = socket.getInputStream();
            dis = new DataInputStream(is);
            while(true){
                System.out.println("receive_msg:"+dis.readUTF());
            }
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
