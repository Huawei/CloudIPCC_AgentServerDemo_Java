package com.huawei.demo.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtils {
	private static final Logger LOG = LoggerFactory.getLogger(LogUtils.class);
	
	/**
     * Encode the contents of the log,log cannot have \r \n  
     * @param obj obj
     * @return    result
     */
    public static String encodeForLog(Object obj)
    {
        if (obj == null)
        {
            return "null";
        }
        String msg = obj.toString();
        int length = msg.length();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++)
        {
            char ch = msg.charAt(i);
            // Replace \ r \ n with ' _ '
            if (ch == '\r' || ch == '\n')
            {
                ch = '_';
            }
            sb.append(Character.valueOf(ch));
        }
        return sb.toString();
    }

}
