package com.vcooc.base.pojo.owbean;

public class SwitchgearInfo {
    String ieee;
    int ep;
    String switchgear;
    int cache;


    public SwitchgearInfo(){

    }

    public SwitchgearInfo(String ieee, int ep, int cache) {
        this.ieee = ieee;
        this.ep = ep;
        this.cache = cache;
    }

    public SwitchgearInfo(String switchgear, int cache) {
        this.switchgear = switchgear;
        this.cache = cache;
    }

    public SwitchgearInfo(int ep, String switchgear) {
        this.ep = ep;
        this.switchgear = switchgear;
    }

    public SwitchgearInfo(String ieee, int ep, String switchgear) {
        this.ieee = ieee;
        this.ep = ep;
        this.switchgear = switchgear;
    }

    public String getIeee() {
        return ieee;
    }

    public void setIeee(String ieee) {
        this.ieee = ieee;
    }

    public int getEp() {
        return ep;
    }

    public void setEp(int ep) {
        this.ep = ep;
    }

    public String getSwitchgear() {
        return switchgear;
    }

    public void setSwitchgear(String switchgear) {
        this.switchgear = switchgear;
    }

    public int getCache() {
        return cache;
    }

    public void setCache(int cache) {
        this.cache = cache;
    }
}
