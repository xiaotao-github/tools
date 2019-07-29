package com.vcooc.experiment.websocket;


public class HeartResultBean {
    String description;
    String result;
    String session;

    public HeartResultBean(String description, String result, String session) {
        this.description = description;
        this.result = result;
        this.session = session;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }
}
