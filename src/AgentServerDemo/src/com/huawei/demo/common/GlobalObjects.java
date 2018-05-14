
package com.huawei.demo.common;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.huawei.agentdemo.service.GetEventThread;
import com.huawei.agentdemo.service.HeartBeatThread;
import com.huawei.demo.bean.ProcessMessageQueue;

/**
 * 
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月10日
 */
public class GlobalObjects
{
    /**
     * Logged in agent or user 
     * key : agent ID or user name
     * value : event queue 
     */
    public static final Map<String, ProcessMessageQueue> LOGINED_MAP = new ConcurrentHashMap<String, ProcessMessageQueue>();
    
    /**
     * get event thread
     * key : agent ID or user name
     * value : thread
     */
    public static final Map<String, GetEventThread> EVENT_THREAD_MAP = new ConcurrentHashMap<String, GetEventThread>();
    
    /**keep heatbeat with agentgateway
     * key :agent workNo
     * value : HeartBeatThread
     */
    public static final Map<String, HeartBeatThread> EVENT_HEART_MAP = new ConcurrentHashMap<String, HeartBeatThread>();
    /**
     * guid for authentication
     * key : agent ID or user name
     * value : guid
     */
    public static final Map<String,String> GUID_MAP = new ConcurrentHashMap<String, String>();  
    
    /**
     * cookie
     * key : agent ID or user name
     * value : sessionID
     */
    public static final Map<String,String> COOKIE_MAP = new ConcurrentHashMap<String, String>();    
    
    /**
     * gateWaycookie
     * key : agent ID or user name
     * value : cookie
     */
    public static final Map<String,String> GATEWAY_COOKIE_MAP = new ConcurrentHashMap<String, String>();    
}
