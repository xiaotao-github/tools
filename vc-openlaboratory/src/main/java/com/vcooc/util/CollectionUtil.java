package com.vcooc.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;

public class CollectionUtil extends CollectionUtils{
	
	//获取两个集合的交集
	public static List<Integer> getIntersection(List<Integer> list1,
            List<Integer> list2) {
        List<Integer> result = new ArrayList<Integer>();
        for (Integer integer : list2) {//遍历list1
            if (list1.contains(integer)) {//如果存在这个数
                result.add(integer);//放进一个list里面，这个list就是交集
            }
        }
        return result;
    }
	
	

}
