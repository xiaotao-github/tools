package com.vcooc.common.vo;


/**
 * HUI数据校验唯一性响应结构
 * 
 * @author admin
 *
 */
public class HuiValidateResult {

    // 响应业务状态
    /*
     * y	通过
     * n	不通过
     */
    private String status;

    // 响应消息
    private String info;

    
    public static  HuiValidateResult ok(String info){
    	return new HuiValidateResult("y", info);
    }
    
    public static HuiValidateResult no(String info){
    	return new HuiValidateResult("n", info);
    }
    
	public HuiValidateResult() {
		super();
	}

	public HuiValidateResult(String status, String info) {
		super();
		this.status = status;
		this.info = info;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
}
