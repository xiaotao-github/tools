package com.vcooc.common.vo;


import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 京淘商城自定义响应结构
 */
public class SysResult {

    // 定义jackson对象
    private static final ObjectMapper MAPPER = new ObjectMapper();

    // 响应业务状态
    /*
     * 200	成功
     * 201	错误
     * 400	参数错误
     */
    private Integer status;

    // 响应消息
    private String msg;

    // 响应中的数据
    private Object data;
    
    // 响应中的数据2
    private Integer data2;
    // 响应中的数据3
    private Object data3;
    
    public static SysResult build(Integer status, String msg, Object data, Integer data2, Object data3) {
        return new SysResult(status, msg, data,data2,data3);
    }

    public static SysResult build(Integer status, String msg, Object data) {
        return new SysResult(status, msg, data);
    }

    public static SysResult ok(Object data) {
        return new SysResult(data);
    }

    public static SysResult ok() {
        return new SysResult(null);
    }

    public SysResult() {

    }

    public static SysResult build(Integer status, String msg) {
        return new SysResult(status, msg, null);
    }

    public SysResult(Integer status, String msg, Object data, Integer data2, Object data3) {
        this.status = status;
        this.msg = msg;
        this.data = data;
        this.data2 = data2;
        this.data3 = data3;
    }
    
    public SysResult(Integer status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public SysResult(Object data) {
        this.status = 200;
        this.msg = "OK";
        this.data = data;
    }

    public Boolean isOK() {
        return this.status == 200;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Integer getData2() {
		return data2;
	}

	public void setData2(Integer data2) {
		this.data2 = data2;
	}

	public Object getData3() {
		return data3;
	}

	public void setData3(Object data3) {
		this.data3 = data3;
	}

	/**
     * 将json结果集转化为SysResult对象
     * 
     * @param jsonData json数据
     * @param clazz SysResult中的object类型
     * @return
     */
    public static SysResult formatToPojo(String jsonData, Class<?> clazz) {
        try {
            if (clazz == null) {
                return MAPPER.readValue(jsonData, SysResult.class);
            }
            JsonNode jsonNode = MAPPER.readTree(jsonData);
            JsonNode data = jsonNode.get("data");
            Object obj = null;
            if (clazz != null) {
                if (data.isObject()) {
                    obj = MAPPER.readValue(data.traverse(), clazz);
                } else if (data.isTextual()) {
                    obj = MAPPER.readValue(data.asText(), clazz);
                }
            }
            return build(jsonNode.get("status").intValue(), jsonNode.get("msg").asText(), obj);
        } catch (Exception e) {
        	e.printStackTrace();
            return null;
        }
    }

    /**
     * 没有object对象的转化
     * 
     * @param json
     * @return
     */
    public static SysResult format(String json) {
        try {
            return MAPPER.readValue(json, SysResult.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * Object是集合转化
     * 
     * @param jsonData json数据
     * @param clazz 集合中的类型
     * @return
     */
    public static SysResult formatToList(String jsonData, Class<?> clazz) {
        try {
            JsonNode jsonNode = MAPPER.readTree(jsonData);
            JsonNode data = jsonNode.get("data");
            Object obj = null;
            if (data.isArray() && data.size() > 0) {
                obj = MAPPER.readValue(data.traverse(),
                        MAPPER.getTypeFactory().constructCollectionType(List.class, clazz));
            }
            return build(jsonNode.get("status").intValue(), jsonNode.get("msg").asText(), obj);
        } catch (Exception e) {
        	e.printStackTrace();
            return null;
        }
    }

}
