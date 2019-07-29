package com.vcooc.util;

import org.springframework.util.StringUtils;

import com.vcooc.experiment.datatable.AoData;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class DataTableUtils {
	
	public static AoData getAoData(String aoDataStr) {
		
		JSONArray jsonarray = JSONArray.fromObject(aoDataStr);
		AoData aoData = new AoData();
	    for (int i = 0; i < jsonarray.size(); i++) {
	        JSONObject obj = (JSONObject) jsonarray.get(i);
	        if (obj.get("name").equals("sEcho")) {
	        	aoData.setsEcho(obj.get("value").toString());
	        }
	 
	        if (obj.get("name").equals("iDisplayStart")) {
	        	aoData.setiDisplayStart(obj.getInt("value"));
	        }
	 
	        if (obj.get("name").equals("iDisplayLength")) {
	        	aoData.setiDisplayLength(obj.getInt("value"));
	        }
	        
	        if (obj.get("name").equals("sSearch")) {
	        	
	        	if(!StringUtils.isEmpty(obj.get("value").toString())) {
	    	    	aoData.setsSearch(obj.get("value").toString().trim());
	    	    }
	        }
	        
	        if (obj.get("name").equals("iSortCol_0")) {
	        	aoData.setSortCol(obj.getInt("value"));
	        }
	        
	        if (obj.get("name").equals("sSortDir_0")) {
	        	aoData.setSortDir(obj.get("value").toString());
	        }
	    }
		return aoData;
		
	}
}
