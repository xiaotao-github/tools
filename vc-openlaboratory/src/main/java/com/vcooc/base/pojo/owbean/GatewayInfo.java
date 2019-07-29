package com.vcooc.base.pojo.owbean;

import lombok.Data;


/***
 * 查询网关信息参数
 */
@Data
public class GatewayInfo {
    String session;
    String type;
    String command;
    int sequence;
}
