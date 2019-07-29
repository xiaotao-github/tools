package com.vcooc.base.pojo.owbean;

public class Switchgear {
    String result;
    String ieee;
    int ep;
    String description;
    Object response;
    String session;
    int sequence;

    @Override
    public String toString() {
        return "Switchgear{" +
                "result='" + result + '\'' +
                ", ieee='" + ieee + '\'' +
                ", ep=" + ep +
                ", description='" + description + '\'' +
                ", response=" + response +
                ", session='" + session + '\'' +
                ", sequence=" + sequence +
                '}';
    }

    public Switchgear(){

    }

    public Switchgear(String result, String ieee, int ep, String description, Object response, String session, int sequence) {
        this.result = result;
        this.ieee = ieee;
        this.ep = ep;
        this.description = description;
        this.response = response;
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

    public Object getResponse() {
        return response;
    }

    public void setResponse(Object response) {
        this.response = response;
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
}
