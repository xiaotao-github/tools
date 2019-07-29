package com.vcooc.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class StringUtils {
	
	/**
	 * Integer类型的数组字符串，转换为List《Integer》,去重</br>
	 * @param arrayStr Integer类型的数组字符串 </br>
	 * @return
	*/
	public static List<Integer> intArrayStrToDistinctList(String arrayStr){
		List<String> list = new ArrayList<>();
		String[] ids =arrayStr.split(",");
	   	if(ids.length==0){
	   		return new ArrayList<Integer>();
	   	}
	   	list = Arrays.asList(ids);
	   	 
	   	Set<String> set = new HashSet<String>();
	   	for (String temp : list) {
			set.add(temp);
		}
	   	ids = set.toArray(new String[0]);
	   	 
	   	List<Integer> idList = new ArrayList<>();
		for (int i = ids.length-1; i >=0; i--){
			idList.add(Integer.parseInt(ids[i]));
		}
		return idList;
	}
	
	/**
	 * Integer类型的数组字符串，转换为List《Integer》</br>
	 * @param arrayStr Integer类型的数组字符串 </br>
	 * @return
	*/
	public static List<Integer> intArrayStrToList(String arrayStr){
		
		String[] ids =arrayStr.split(",");
	   	if(ids.length==0){
	   		return new ArrayList<Integer>();
	   	}
	   	 
	   	List<Integer> idList = new ArrayList<>();
		for (int i =0; i <ids.length; i++){
			idList.add(Integer.parseInt(ids[i]));
		}
		return idList;
	}
	
}
