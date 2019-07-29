package com.vcooc.base.pojo.owbean;

import java.util.List;

/**
 * 网关连接的设备基本信息
 */
public class Equipment {
    int total;
    int start;
    int count;
    List epList;

    public Equipment(){

    }

    public Equipment(int total, List epList) {
        this.total = total;
        this.epList = epList;
    }

    public Equipment(int total, int start, int count, List epList) {
        this.total = total;
        this.start = start;
        this.count = count;
        this.epList = epList;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List getEpList() {
        return epList;
    }

    public void setEpList(List epList) {
        this.epList = epList;
    }

    @Override
    public String toString() {
        return "Equipment{" +
                "total=" + total +
                ", start=" + start +
                ", count=" + count +
                ", epList=" + epList +
                '}';
    }
}
