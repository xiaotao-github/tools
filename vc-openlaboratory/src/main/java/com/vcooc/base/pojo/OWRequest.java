package com.vcooc.base.pojo;

import java.util.Map;

public class OWRequest {
    Map argument;
    String type;
    int sequence;

    public Map getArgument() {
        return argument;
    }

    public void setArgument(Map argument) {
        this.argument = argument;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    @Override
    public String toString() {
        return "OWRequest{" +
                "argument=" + argument +
                ", type='" + type + '\'' +
                ", sequence=" + sequence +
                '}';
    }
}
