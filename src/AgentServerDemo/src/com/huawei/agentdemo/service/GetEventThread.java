package com.huawei.agentdemo.service;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: obtain event</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017-10-10
 */
public class GetEventThread extends Thread 
{
    /**
     * log
     */
	private static final Logger LOG = LoggerFactory.getLogger(GetEventThread.class);
	
	//pause 500ms before invoking next eventget interface
	private static final int SLEEPTIME = 500;
	
	// 80*1.5 = 120s . if net error, after 2 minute do clear resource.	
	private static final int COUNT = 80;
    
    private boolean isAlive = true;
    
    private String workNo;
    //连续断连次数
    private int netWorkErrorCount = 0;
    
    /**
	 * @param workNo
	 */
	public GetEventThread(String workNo) 
	{
		super();
		this.workNo = workNo;
	}	
	
    @SuppressWarnings("unchecked")
	@Override
    public void run()
    {        
        Map<String, Object> map;
        String retcode;
        Map<String, Object> event;
        String url = ServiceUtil.getPrefix() + "agentevent/" + workNo;
        while (isAlive)
        {
        	/*
        	 * get event request
        	 */
            map = Request.get(workNo,url);
            
            if (null != map)
            {
                retcode = String.valueOf(map.get("retcode"));
                switch(retcode)
                {
                /*
                 * request successfully
                 */
                case StringUtils.SUCCESS:
                    netWorkErrorCount = 0;
                	event = (Map<String, Object>) map.get("event");
                	if (null == event)
                	{
                		pause();
                	}
                	else if (!GlobalObjects.LOGINED_MAP.containsKey(event.get("workNo")))  //get logged in agent event only
                	{
                		pause();
                	}
                	else
                	{
                		weccEventHandle(event);
                	}
                	break;
                
                	/*
                	 * if agent was forced logout by monitor, agent receive retcode 100-006
                	 */
                case StringUtils.AGENTNOTLOG:
                    netWorkErrorCount = 0;
                	ServiceUtil.clearResourse(workNo);
                	break;
                	
                case StringUtils.NETWORKERROR:
                	netWorkErrorCount++;
                	if (netWorkErrorCount <= COUNT)
                	{
                		LOG.error("Event pull mode net error---" + LogUtils.encodeForLog(new Date()));
                		pause();
                	}
                	else
                	{
                		ServiceUtil.clearResourse(workNo);
                	}
                	break;
                	
                case StringUtils.HANDSHAKEERROR:
                    LOG.error("agw refuse connect,logout the agent: " + LogUtils.encodeForLog(workNo));
                    ServiceUtil.clearResourse(workNo);
                    break;
                    
            	default:
            		map = null;
            		break;
                }                
            }
            else 
            {
                pause(); 
            }
        } 
    }    
    
    /**
     * put event object to event queue
     * @param event
     */
    private void weccEventHandle(Map<String, Object> event)
    {
        String workNo = (String)event.get("workNo");        
        String message = StringUtils.beanToJson(event);
        GlobalObjects.LOGINED_MAP.get(workNo).putMessage(message);
    }
    
    /**
     * pause get event thread
     */
    private void pause()
    {
    	try
        {
            Thread.sleep(SLEEPTIME);
        }
        catch (InterruptedException e)
        {
            LOG.error(LogUtils.encodeForLog(e.getMessage()));
        }
    }
    
    /**
     * start get event thread
     */
    public void begin()
    {        
        isAlive = true;
        this.start();
    }
    
    /**
     * stop get event thread
     */
    public void end()
    {
        isAlive = false;
    }
}
    