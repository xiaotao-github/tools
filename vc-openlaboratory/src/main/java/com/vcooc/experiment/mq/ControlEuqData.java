package com.vcooc.experiment.mq;
import java.io.Serializable;
/**
 * Created by Administrator on 2018/5/16.
 */
public class ControlEuqData implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -4253773493557874616L;
	/**
     * 需要
     * gwID	网关ID
     devID	设备ID
     ep	设备端口
     epType	端口类型 设备类型
     epData	设备控制命令
     */

    private String gwId;
    private String devId;
    //默认14
    private String ep;
    private String epType;
    private int epData; //0开 1.关

    public String getGwId() {
        return gwId;
    }

    public void setGwId(String gwId) {
        this.gwId = gwId;
    }

    public String getDevId() {
        return devId;
    }

    public void setDevId(String devId) {
        this.devId = devId;
    }


    public String getEp() {
        return ep;
    }

    public void setEp(String ep) {
        this.ep = ep;
    }

    public String getEpType() {
        return epType;
    }

    public void setEpType(String epType) {
        this.epType = epType;
    }

    public int getEpData() {
        return epData;
    }

    public void setEpData(int epData) {
        this.epData = epData;
    }
}
