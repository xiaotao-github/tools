package com.vcooc.util;


import java.util.UUID;

/**
 * Created by Administrator on 2018/4/18.
 */
public class UUIDUtils{

    /**
     * 获取32位UUID
     * @return
     */
    public static String get32UUID(){
        return UUID.randomUUID().toString().replace("-", "");
    }
}
