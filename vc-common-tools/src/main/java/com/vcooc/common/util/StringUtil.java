package com.vcooc.common.util;

import org.apache.commons.lang3.StringUtils;

public class StringUtil extends StringUtils {
	
	public static boolean isEmpty(String cs) {
        return cs == null || cs.trim().length() == 0;
    }
	
	public static boolean isNotEmpty(String cs) {
		return !isEmpty(cs);
    }
}
