package com.huawei.agentdemo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.config.ConfigList;
import com.huawei.demo.config.ConfigProperties;

public class ServiceUtil 
{
    private static final Logger LOG = LoggerFactory.getLogger(ServiceUtil.class);
    
    private static final String SSLENABLE = "1";
    
    private static final String SSLUNABLE = "0";
    
	private static String ip;
	
	private static String port;
	
	private static boolean isPullFromAgw = false;
	
	private static String prefix = "";
	
	private static String pushURL = "";
	
	
	public static String getPrefix()
	{
	    return prefix;
	}
	
	
	public static String getPushURL()
	{
	    return pushURL;
	}
	
	/**
	 * init ip/port/url/eventmode
	 */
	public static void serviceInit()
	{
		ip = ConfigProperties.getKey(ConfigList.CONFIG, "AgentGateway_IP");
		port = ConfigProperties.getKey(ConfigList.CONFIG, "AgentGateway_PORT");
		pushURL = ConfigProperties.getKey(ConfigList.CONFIG, "PushURL");
		
		if ("PULL".equalsIgnoreCase(ConfigProperties.getKey(ConfigList.CONFIG, "GETEVENT_WAY")))
		{
			setPullFromAgw(true);
		}
		else if ("PUSH".equalsIgnoreCase(ConfigProperties.getKey(ConfigList.CONFIG, "GETEVENT_WAY")))
		{
			setPullFromAgw(false);
		}
		else
		{
		    LOG.error("wrong GETEVENT_WAY value, GETEVENT_WAY must be PULL or PUSH");
		}
		
		if (SSLENABLE.equals(ConfigProperties.getKey(ConfigList.CONFIG, "SSLEable")))
		{
			prefix = "https://"+ip+":"+port+"/agentgateway/resource/";
		}
		else if (SSLUNABLE.equals(ConfigProperties.getKey(ConfigList.CONFIG, "SSLEable")))
		{
			prefix = "http://"+ip+":"+port+"/agentgateway/resource/";
		}
		else
		{
		    LOG.error("wrong SSLEable value, SSLEable must be SSLENABLE or SSLUNABLE");
		}
		
	}
	
	
     /**
      * resource clear
      * @param workNo agentID
      */
    public static void clearResourse(String workNo)
    {
    	if (GlobalObjects.COOKIE_MAP.containsKey(workNo))
    	{
    		GlobalObjects.COOKIE_MAP.remove(workNo);
    	}
    	
    	if (GlobalObjects.EVENT_THREAD_MAP.containsKey(workNo))
    	{
    		GetEventThread thread = GlobalObjects.EVENT_THREAD_MAP.get(workNo);
    		thread.end();
    		GlobalObjects.EVENT_THREAD_MAP.remove(workNo);
    	}
    	
    	if (GlobalObjects.EVENT_HEART_MAP.containsKey(workNo))
    	{
    		HeartBeatThread thread = GlobalObjects.EVENT_HEART_MAP.get(workNo);
    		thread.end();
    		GlobalObjects.EVENT_HEART_MAP.remove(workNo);
    	}
    	

    	if (GlobalObjects.GUID_MAP.containsKey(workNo))
    	{
    		GlobalObjects.GUID_MAP.remove(workNo);
    	}
    	
    	if (GlobalObjects.GATEWAY_COOKIE_MAP.containsKey(workNo))
        {
            GlobalObjects.GATEWAY_COOKIE_MAP.remove(workNo);
        }
    	
    	if (GlobalObjects.LOGINED_MAP.containsKey(workNo))
    	{
    		GlobalObjects.LOGINED_MAP.remove(workNo);
    	}
    }
    
    public static boolean isPullFromAgw()
	{
		return isPullFromAgw;
	}

	public static void setPullFromAgw(boolean isPullFromAgw)
	{
		ServiceUtil.isPullFromAgw = isPullFromAgw;
	}
}
