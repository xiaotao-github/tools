package com.vcooc.base.pojo.owbean;

public class EpList {
    String ieee;
    int ep;
    int netDeviceType;
    boolean linkStatus;
    int deviceType;
    int IASZoneType;
    int ProfileId;
    String name;

    public EpList(){

    }

    public EpList(String ieee, int ep, int netDeviceType, boolean linkStatus, int deviceType, int IASZoneType, int profileId, String name) {
        this.ieee = ieee;
        this.ep = ep;
        this.netDeviceType = netDeviceType;
        this.linkStatus = linkStatus;
        this.deviceType = deviceType;
        this.IASZoneType = IASZoneType;
        ProfileId = profileId;
        this.name = name;
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

    public int getNetDeviceType() {
        return netDeviceType;
    }

    public void setNetDeviceType(int netDeviceType) {
        this.netDeviceType = netDeviceType;
    }

    public boolean isLinkStatus() {
        return linkStatus;
    }

    public void setLinkStatus(boolean linkStatus) {
        this.linkStatus = linkStatus;
    }

    public int getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(int deviceType) {
        this.deviceType = deviceType;
    }

    public int getIASZoneType() {
        return IASZoneType;
    }

    public void setIASZoneType(int IASZoneType) {
        this.IASZoneType = IASZoneType;
    }

    public int getProfileId() {
        return ProfileId;
    }

    public void setProfileId(int profileId) {
        ProfileId = profileId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "EpList{" +
                "ieee='" + ieee + '\'' +
                ", ep=" + ep +
                ", netDeviceType=" + netDeviceType +
                ", linkStatus=" + linkStatus +
                ", deviceType=" + deviceType +
                ", IASZoneType=" + IASZoneType +
                ", ProfileId=" + ProfileId +
                ", name='" + name + '\'' +
                '}';
    }
}
