package com.vcooc.base.pojo.owbean;

import java.util.Map;

/**
 * 修改网关账号密码
 */
public class RequestBean {
    String session;
    String type;
    String command;
    int sequence;
    Map argument;

    public RequestBean(){

    }

    public RequestBean(String type, int sequence, Map argument) {
        this.type = type;
        this.sequence = sequence;
        this.argument = argument;
    }

    public RequestBean(String session, String type, String command) {
        this.session = session;
        this.type = type;
        this.command = command;
    }


    public RequestBean(String session, String type, String command, int sequence) {
        this.session = session;
        this.type = type;
        this.command = command;
        this.sequence = sequence;
    }

    public RequestBean(String session, String type, String command, int sequence, Map argument) {
        this.session = session;
        this.type = type;
        this.command = command;
        this.sequence = sequence;
        this.argument = argument;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
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

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public Map getArgument() {
        return argument;
    }

    public void setArgument(Map argument) {
        this.argument = argument;
    }
}
