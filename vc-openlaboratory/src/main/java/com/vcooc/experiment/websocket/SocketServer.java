package com.vcooc.experiment.websocket;


import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vcooc.base.pojo.owbean.*;
import com.vcooc.util.JSONUtils;
import net.sf.json.JSONArray;
import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;

public class SocketServer {
    public static void main(String[] args) {//主程序方法
        ServerSocket server = null;
        Socket sc = null;
//        DataInputStream din = null;
        DataOutputStream dout = null;
        try {
            server = new ServerSocket(9999);
            System.out.println("开始对端口9999进行监听");
            while (true) {
                System.out.println("===================服务器即将启动，等待客户端的连接===============");
                sc = server.accept();
                System.out.println(new Date());
                System.out.println("连接成功");
                System.out.println("客户端IP为：" + sc.getInetAddress().getHostAddress() + "****端口为：" + sc.getPort());
                /**********************************服务端接收客户端消息开始*************************************/

                /**本地测试客户端是否能够收到客户端发送的数据-------------Test类**/
//                dout = new DataOutputStream(sc.getOutputStream());
//                dout.writeUTF("027B22617267756D656E74223A7B2273776974636867656172223A226F6E222C226570223A312C2269656565223A2231464131393146454646364536303030227D2C22636F6D6D616E64223A2273657453776974636867656172222C2273657175656E6365223A313031372C2273657373696F6E223A2268726E68646558786E6564346D677A222C2274797065223A22736D617274506C7567227D03");
//                dout.flush();
//                System.out.println("向客户端发送消息了");



                InputStream is = sc.getInputStream();
                byte[] b = new byte[1024 * 10];
                int len;
                /**
                 * readLine（）这个方法本身有一个注意点，它读取的是一整行，遇见‘\n’或 ‘ \r’ 代表读取结束。因为用的是网络助手作为客户端 ，每次发送消息时并不会添加‘\n’
                 * 而用控制台作为客户端进行发送时，按下回车的时候就已经添加了‘\n’，所以服务器端进行接收的时候就是实时显示的。
                 */
                while ((len = is.read(b)) != -1) {
//                while (true){
//                    is.read(b);
                String message = new String(b, 0, len, "UTF-8").trim();

                System.out.println("收到客户端信息时间为" + new Date());
                    List list = new ArrayList();
                    //去除空格符号
//                    String message = new String(b, "UTF-8").trim().replaceAll(" +","");
//                    String message = new String(b, "UTF-8").trim();
//                    System.out.println("原始数据为："+message);
                    String [] arr = message.split("}}");
                    for (String s : arr){
                        String ss = s.trim()+"}}";
                        list.add(ss);
                    }
                    System.out.println("客户端发送的内容为：" + list);


//                    while (true) {
//                    if (message.contains("{")) {
                        //{}形式的数据，使用parseObject，获取JSONObject对象
//                        JSONObject jsonObject = JSONObject.parseObject(message);
                    JSONArray array = JSONArray.fromObject(list);
                    /**定义全局变量session**/
                    String session = "";
                    for (int i=0;i<array.size();i++){
                        net.sf.json.JSONObject jsonObject = array.getJSONObject(i);
                        if (!jsonObject.get("type").equals("")) {

                            //根据type和command来判断命令
                            if (jsonObject.get("type").equals("server") && jsonObject.get("command").equals("GWAuth")) {//网关刚连上服务器，获取网关基本信息
                                GatewayMessage gatewayMessage = JSONObject.parseObject(jsonObject.get("argument").toString(), GatewayMessage.class);
//                            GatewayMessage gatewayMessage = (GatewayMessage) jsonObject.get("argument");
                                //获取session
                                String mac = gatewayMessage.getMac();
                                session = gatewayMessage.getSession();
                                System.out.println("session的值为：" + session + "  " + "mac的值为" + mac);






                                RequestBean requestBean = new RequestBean();
                                /***/
                                requestBean.setSession(session);
                                requestBean.setType("smartPlug");
                                requestBean.setSequence(1017);
                                requestBean.setCommand("setSwitchgear");
                                Map map = new HashMap();
                                map.put("ieee", "1FA191FEFF6E6000");
                                map.put("ep", 1);
                                map.put("switchgear", "on");
                                requestBean.setArgument(map);
                                String requestData = bin2hex(JSONUtils.beanToJson(requestBean));

                                dout = new DataOutputStream(sc.getOutputStream());
//                                dout.writeUTF("02"+requestData+"03");
                                dout.writeBytes("02"+requestData+"03");
//                                dout.writeChars("02"+requestData+"03");
                                dout.flush();
//                                    dout.writeBytes("02"+requestData+"03");
//                                    dout.writeBytes(02+requestData+03);
//                                    dout.writeUTF("02"+requestData+"03");
//                                    dout.writeUTF(02+requestData+03);
//                                    dout.flush();
//                                oos.writeObject("02"+requestData+"03");
//                                oos.writeBytes("02"+requestData+"03");
//                                oos.writeUTF("02"+requestData+"03");

                                System.out.println("服务端向客户端发送打开插座指令："+"02"+requestData+"03");
//                                dout = new DataOutputStream(sc.getOutputStream());
//                                //登陆
//                                Map map = new HashMap();
//                                map.put("username","888tt");
//                                map.put("password","888tt");
//                                RequestBean requestBean = new RequestBean("login",1017,map);
//                                String data = JSONUtils.beanToJson(requestBean);
//                                String requestData = bin2hex(data);
//                                System.out.println("登陆命令发送："+"02"+requestData+"03");
////                                dout.writeBytes(data);
//                                dout.writeBytes("02"+requestData+"03");

//                                //获取插座信息
//                                RequestBean requestBean = new RequestBean();
//                                requestBean.setSession(session);
//                                requestBean.setType("smartPlug");
//                                requestBean.setSequence(1017);
//                                requestBean.setCommand("getSwitchgear");
//                                Map map = new HashMap();
//                                map.put("ieee","1FA191FEFF6E6000");
//                                map.put("ep",1);
//                                map.put("cache",1);
//                                requestBean.setArgument(map);
//                                String requestData2 = " "+JSONUtils.beanToJson(requestBean)+" ";
//                                dout.writeBytes(requestData2);
//                                dout.writeChars(requestData2);
//                                String requestData3 = str2HexStr(requestData2);
//                                dout.writeBytes(requestData3);
//                                dout.writeChars(requestData3);
//                                String requestData = toStringHex("Ox02"+JSONUtils.beanToJson(requestBean)+"Ox03");
//                                String sss = ("Ox02"+JSONUtils.beanToJson(requestBean)+"Ox03");
//                                byte[] bs = ("0x02"+JSONUtils.beanToJson(requestBean)+"0x03").getBytes();
//                                String requestData4 = toHexString(bs);
//                                dout.write(bs);
//                                dout.writeBytes(requestData4);
//                                dout.writeChars(requestData4);
//                                dout.writeBytes(requestData2);
//                                dout.writeBytes(requestData);
//                                dout.writeBytes(requestData);
//                                dout.writeBytes(sss);
//                                System.out.println("我给网关发送查询插座设备信息指令了："+requestData3+"******************");
//                                System.out.println("我给网关发送查询插座设备信息指令了："+requestData+"******************");
//                                System.out.println("我给网关发送查询插座设备信息指令了："+bs+"******************");
//                                System.out.println("我给网关发送查询插座设备信息指令了："+requestData4+"******************");
                            } else if (jsonObject.get("type").equals("server") && jsonObject.get("command").equals("setreg")) {//配置完网关账号密码
                                //获取网关账号和密码
//                            GatewayMessage gatewayMessage = (GatewayMessage) jsonObject.get("argument");
                                GatewayMessage gatewayMessage = JSONObject.parseObject(jsonObject.get("argument").toString(), GatewayMessage.class);
                                String username = gatewayMessage.getUsername();
                                String password = gatewayMessage.getPassword();
                                String mac = gatewayMessage.getMac();
                                System.out.println(gatewayMessage);
                                /**此处需要把用户名、密码、mac放到数据库中***/

                            } else if (jsonObject.get("type").equals("update") && jsonObject.get("command").equals("epList")) {//获取网关列表信息
                                Equipment equipment = JSONObject.parseObject(jsonObject.get("argument").toString(), Equipment.class);
//                            Equipment equipment = (Equipment) jsonObject.get("argument");
                                //获取设备总数与列表
                                equipment.getTotal();
                                equipment.getEpList();
                                System.out.println(equipment);
                            } else if (jsonObject.get("type").equals("update") && jsonObject.get("command").equals("energy")) {//插座电量上报
                                //  [{"type":"update","command":"energy","argument":{"ieee":"1FA191FEFF6E6000","ep":1,"activePower":0,"summation":0,"divisor":1000,"mutiplier":1,"summationFormatting":251,"demandFormatting":251,"meteringDeviceStatus":0,"unitOfMeasure":0}}]
                                System.out.println("获取到设备电量信息" + jsonObject.get("argument"));
                            } else if (jsonObject.get("type").equals("update") && jsonObject.get("command").equals("switchgear")) {
                                dout = new DataOutputStream(sc.getOutputStream());
                                SwitchgearInfo switchgearInfo = JSONObject.parseObject(jsonObject.get("argument").toString(), SwitchgearInfo.class);
                                if (switchgearInfo.getSwitchgear().equals("off")) {
                                    RequestBean requestBean = new RequestBean();
                                    /***/
                                    requestBean.setSession("v9YjXSelKRR103o");
                                    requestBean.setType("smartPlug");
                                    requestBean.setSequence(1017);
                                    requestBean.setCommand("setSwitchgear");
                                    Map map = new HashMap();
                                    map.put("ieee", switchgearInfo.getIeee());
                                    map.put("ep", switchgearInfo.getEp());
                                    map.put("switchgear", "on");
                                    requestBean.setArgument(map);
                                    String requestData = bin2hex(JSONUtils.beanToJson(requestBean));
                                    dout.writeBytes("02"+requestData+"03");
                                    System.out.println("我给网关发送开启插座指令了：" + "02"+requestData+"03");
                                } else {
                                    RequestBean requestBean = new RequestBean();
                                    /***/
                                    requestBean.setSession("v9YjXSelKRR103o");
                                    requestBean.setType("smartPlug");
                                    requestBean.setSequence(1017);
                                    requestBean.setCommand("setSwitchgear");
                                    Map map = new HashMap();
                                    map.put("ieee", switchgearInfo.getIeee());
                                    map.put("ep", switchgearInfo.getEp());
                                    map.put("switchgear", "off");
                                    String requestData = bin2hex(JSONUtils.beanToJson(requestBean));
                                    dout.writeBytes("02"+requestData+"03");
                                    System.out.println("我给网关发送关闭插座指令了：" + "02"+requestData+"03");
                                }
                            } else {
                                break;
                            }
                        }else {
                            System.out.println("网关回调数据显示为："+jsonObject.toString().replace("}}",""));
                        }
                    }
                    //清空list
                    list.clear();
                    /**
                    JSONObject jsonObject = JSONObject.parseObject(list);
                        //获取到网关基本信息
                        GatewayMessage gatewayMessage = jsonObject.getObject("argument", GatewayMessage.class);
//                        System.out.println("gatewayMessage为：" + gatewayMessage);
//                        //获取session
                        String session = gatewayMessage.getSession();

//                        System.out.println("session的值为" + session);

                     */
                        /**********************************服务端发送消息开始*************************************/

                        /**********************************服务端发送消息结束*************************************/

//                    dout = new DataOutputStream(sc.getOutputStream());
////                  //获取插座信息
//                    RequestBean requestBean = new RequestBean();
//                    requestBean.setSession(session);
//                    requestBean.setType("smartPlug");
//                    requestBean.setSequence(1017);
//                    requestBean.setCommand("getSwitchgear");
//                    Map map = new HashMap();
//                    map.put("ieee","1FA191FEFF6E6000");
//                    map.put("ep",1);
//                    map.put("cache",1);
//                    requestBean.setArgument(map);
//                    String requestData = bin2hex(JSONUtils.beanToJson(requestBean));
////                    String requestData2 = bin2hex("Ox02"+JSONUtils.beanToJson(requestBean)+"Ox03");
////                    String requestData3 = "02 "+bin2hex(JSONUtils.beanToJson(requestBean))+" 03";
////                    String requestData2 = str2HexStr("02"+JSONUtils.beanToJson(requestBean)+"03");
////                    String requestData3 = toStringHex(JSONUtils.beanToJson(requestBean));
////                    dout.writeBytes(requestData);
//                    dout.writeBytes(02+requestData+03);
//                    dout.writeBytes("02"+requestData+"03");
////                    dout.writeBytes(requestData3);
////                    dout.writeChars(requestData);
////                    dout.writeChars(requestData2);
//                    System.out.println("我给网关发送查询插座设备信息指令了："+02+requestData+03+"******************");
//                    System.out.println("我给网关发送查询插座设备信息指令了："+"02"+requestData+"03"+"******************");
////                    System.out.println("我给网关发送查询插座设备信息指令了："+requestData2+"******************");
////                    System.out.println("我给网关发送查询插座设备信息指令了："+requestData3+"******************");
////                        OutputStream os = sc.getOutputStream();
////                        OutputStreamWriter osw = new OutputStreamWriter(os);
////                        BufferedWriter bw = new BufferedWriter(osw);
//
//                        //session在前面获取到
////                        HeartResultBean heartResultBean = new HeartResultBean("heart success", "true", session);
////                        dout.writeUTF("ox02" + JSONUtils.beanToJson(heartResultBean) + "ox03");
////                        System.out.println("发送给客户端消息为：" + "ox02" + JSONUtils.beanToJson(heartResultBean) + "ox03");
////
////                        RequestBean requestBean = new RequestBean(session, "system", "getTime", 1024);
////                        dout.writeUTF("ox02" + JSONUtils.beanToJson(requestBean) + "ox03");
////                        System.out.println("服务器发送客户端消息：" + "ox02" + JSONUtils.beanToJson(requestBean) + "ox03");
//


                        /**********************************服务端接收客户端消息结束*************************************/
                        //每次读取信息的时候 检查是否还是连接状态
                        //使用available()方法， 返回大于0的表示连接，小于等于0 的是关闭连接

                    /***本地客户端***/
//                    } else {
//                        OutputStream os = sc.getOutputStream();
//                        OutputStreamWriter osw = new OutputStreamWriter(os);
//                        BufferedWriter bw = new BufferedWriter(osw);
//                        System.out.println("收到客户端发送的消息" + message);
//                        RequestBean requestBean = new RequestBean("123", "system", "getTime", 1024);
//                        bw.write("0x02" + JSONUtil.parse(requestBean) + "0x03");
//                        System.out.println("发送给客户端的消息" + "0x02" + JSONUtil.parse(requestBean) + "0x03");
//
//                        dout = new DataOutputStream(sc.getOutputStream());
//                        dout.writeUTF("544465");
////                        break;
//                    }
//                    }
                }
                if (is.available() <= 0)
                    System.out.println("连接已关闭");
                break;
                /********************注释结束*************************/
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
//                din.close();
                dout.close();
                sc.close();
                server.close();//可以注释掉
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//        new ChatServer().service();//调用 service方法
    }


    //获取当前字符的字符编码格式
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
        for (int i = 0; i < byteLen; i++) {
            result[i] = (byte) (Character.digit(hexChar[i * 2], 16) << 4 | Character.digit(hexChar[i * 2 + 1], 16));
        }

        return result;
    }

    //十六进制字符串转换字符串
    public static String toStringHex(String s) {
        byte[] baKeyword = new byte[s.length() / 2];
        for (int i = 0; i < baKeyword.length; i++) {
            try {
                baKeyword[i] = (byte) (0xff & Integer.parseInt(s.substring(
                        i * 2, i * 2 + 2), 16));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            s = new String(baKeyword, "utf-8");// UTF-16le:Not
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return s;
    }

    /**
     * 字符串转换成为16进制(无需Unicode编码)
     * @param str
     * @return
     */
    public static String str2HexStr(String str) {
        char[] chars = "0123456789ABCDEF".toCharArray();
        StringBuilder sb = new StringBuilder("");
        byte[] bs = str.getBytes();
        int bit;
        for (int i = 0; i < bs.length; i++) {
            bit = (bs[i] & 0x0f0) >> 4;
            sb.append(chars[bit]);
            bit = bs[i] & 0x0f;
            sb.append(chars[bit]);
            // sb.append(' ');
        }
        return sb.toString().trim();
    }

    /**
     * 字符串转换成十六进制值
     * @param bin String 我们看到的要转换成十六进制的字符串
     * @return
     */
    public static String bin2hex(String bin) {
        char[] digital = "0123456789ABCDEF".toCharArray();
        StringBuffer sb = new StringBuffer("");
        byte[] bs = bin.getBytes();
        int bit;
        for (int i = 0; i < bs.length; i++) {
            bit = (bs[i] & 0x0f0) >> 4;
            sb.append(digital[bit]);
            bit = bs[i] & 0x0f;
            sb.append(digital[bit]);
        }
        return sb.toString();
    }

    /**
     * 字节数组转成16进制表示格式的字符串
     *
     * @param byteArray
     *            需要转换的字节数组
     * @return 16进制表示格式的字符串
     **/
    public static String toHexString(byte[] byteArray) {
        if (byteArray == null || byteArray.length < 1)
            throw new IllegalArgumentException("this byteArray must not be null or empty");

        final StringBuilder hexString = new StringBuilder();
        for (int i = 0; i < byteArray.length; i++) {
            if ((byteArray[i] & 0xff) < 0x10)//0~F前面不零
                hexString.append("0");
            hexString.append(Integer.toHexString(0xFF & byteArray[i]));
        }
        return hexString.toString().toLowerCase();
    }


    //十进制
    private static boolean isOctNumber(String str) {
        boolean flag = false;
        for (int i = 0, n = str.length(); i < n; i++) {
            char c = str.charAt(i);
            if (c == '0' | c == '1' | c == '2' | c == '3' | c == '4' | c == '5' | c == '6' | c == '7' | c == '8' | c == '9') {
                flag = true;
            }
        }
        return flag;
    }

    //十六进制
    private static boolean isHexNumber(String str) {
        boolean flag = false;
        for (int i = 0; i < str.length(); i++) {
            char cc = str.charAt(i);
            if (cc == '0' || cc == '1' || cc == '2' || cc == '3' || cc == '4' || cc == '5' || cc == '6' || cc == '7' || cc == '8' || cc == '9' || cc == 'A' || cc == 'B' || cc == 'C' ||
                    cc == 'D' || cc == 'E' || cc == 'F' || cc == 'a' || cc == 'b' || cc == 'c' || cc == 'c' || cc == 'd' || cc == 'e' || cc == 'f') {
                flag = true;
            }
        }
        return flag;
    }

    private static boolean isOctNumberRex(String str) {
        String validate = "\\d+";
        return str.matches(validate);
    }

    private static boolean isHexNumberRex(String str) {
        String validate = "(?i)[0-9a-f]+";
        return str.matches(validate);
    }

}
