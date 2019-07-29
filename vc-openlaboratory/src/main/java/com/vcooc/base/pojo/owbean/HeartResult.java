package com.vcooc.base.pojo.owbean;


import java.util.Map;

/***
 * 服务器心跳
 */

public class HeartResult {
    String result;
    String type;
    String command;
    Map response;

    public HeartResult(){

    }

    public HeartResult(String result, String type, String command) {
        this.result = result;
        this.type = type;
        this.command = command;
    }

    public HeartResult(String result, String type, String command, Map response) {
        this.result = result;
        this.type = type;
        this.command = command;
        this.response = response;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Map getResponse() {
        return response;
    }

    public void setResponse(Map response) {
        this.response = response;
    }
}
