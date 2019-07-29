package com.vcooc.base.pojo.owbean;

import java.util.Map;

public class SwitchgearResult {
    String result;
    String ieee;
    int ep;
    String description;
    String session;
    int sequence;

    //
    Map response;


    public SwitchgearResult(){

    }

    public SwitchgearResult(String result, String ieee, int ep, String description, String session, int sequence, Map response) {
        this.result = result;
        this.ieee = ieee;
        this.ep = ep;
        this.description = description;
        this.session = session;
        this.sequence = sequence;
        this.response = response;
    }

    public SwitchgearResult(String result, String ieee, int ep, String description, String session, int sequence) {
        this.result = result;
        this.ieee = ieee;
        this.ep = ep;
        this.description = description;
        this.session = session;
        this.sequence = sequence;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public Map getResponse() {
        return response;
    }

    public void setResponse(Map response) {
        this.response = response;
    }
}
