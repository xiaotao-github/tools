package com.vcooc.base.pojo.owbean;

public class GatewayMessage {
    String mac;
    String apptoken;
    String session;
    String softversion;
    String softversionnum;
    String protocol;
    String protocolversion;
    String deviceType;
    String devModel;
    String chiptype;
    String wifitype;
    String dst;
    String timezone;
    String area;
    String agentid;

    //账号
    String username;
    //密码
    String password;


    public GatewayMessage(){

    }

    @Override
    public String toString() {
        return "GatewayMessage{" +
                "mac='" + mac + '\'' +
                ", apptoken='" + apptoken + '\'' +
                ", session='" + session + '\'' +
                ", softversion='" + softversion + '\'' +
                ", softversionnum='" + softversionnum + '\'' +
                ", protocol='" + protocol + '\'' +
                ", protocolversion='" + protocolversion + '\'' +
                ", deviceType='" + deviceType + '\'' +
                ", devModel='" + devModel + '\'' +
                ", chiptype='" + chiptype + '\'' +
                ", wifitype='" + wifitype + '\'' +
                ", dst='" + dst + '\'' +
                ", timezone='" + timezone + '\'' +
                ", area='" + area + '\'' +
                ", agentid='" + agentid + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public GatewayMessage(String mac, String apptoken, String session, String softversion, String softversionnum, String protocol, String protocolversion, String deviceType, String devModel, String chiptype, String wifitype, String dst, String timezone, String area, String agentid, String username, String password) {
        this.mac = mac;
        this.apptoken = apptoken;
        this.session = session;
        this.softversion = softversion;
        this.softversionnum = softversionnum;
        this.protocol = protocol;
        this.protocolversion = protocolversion;
        this.deviceType = deviceType;
        this.devModel = devModel;
        this.chiptype = chiptype;
        this.wifitype = wifitype;
        this.dst = dst;
        this.timezone = timezone;
        this.area = area;
        this.agentid = agentid;
        this.username = username;
        this.password = password;
    }

    public GatewayMessage(String mac, String apptoken, String session, String softversion, String softversionnum, String protocol, String protocolversion, String deviceType, String devModel, String chiptype, String wifitype, String dst, String timezone, String area, String agentid) {
        this.mac = mac;
        this.apptoken = apptoken;
        this.session = session;
        this.softversion = softversion;
        this.softversionnum = softversionnum;
        this.protocol = protocol;
        this.protocolversion = protocolversion;
        this.deviceType = deviceType;
        this.devModel = devModel;
        this.chiptype = chiptype;
        this.wifitype = wifitype;
        this.dst = dst;
        this.timezone = timezone;
        this.area = area;
        this.agentid = agentid;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getApptoken() {
        return apptoken;
    }

    public void setApptoken(String apptoken) {
        this.apptoken = apptoken;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getSoftversion() {
        return softversion;
    }

    public void setSoftversion(String softversion) {
        this.softversion = softversion;
    }

    public String getSoftversionnum() {
        return softversionnum;
    }

    public void setSoftversionnum(String softversionnum) {
        this.softversionnum = softversionnum;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getProtocolversion() {
        return protocolversion;
    }

    public void setProtocolversion(String protocolversion) {
        this.protocolversion = protocolversion;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getDevModel() {
        return devModel;
    }

    public void setDevModel(String devModel) {
        this.devModel = devModel;
    }

    public String getChiptype() {
        return chiptype;
    }

    public void setChiptype(String chiptype) {
        this.chiptype = chiptype;
    }

    public String getWifitype() {
        return wifitype;
    }

    public void setWifitype(String wifitype) {
        this.wifitype = wifitype;
    }

    public String getDst() {
        return dst;
    }

    public void setDst(String dst) {
        this.dst = dst;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAgentid() {
        return agentid;
    }

    public void setAgentid(String agentid) {
        this.agentid = agentid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
