package com.huawei.agentdemo.service;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: maintain heartbeat </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2018-01-01
 */
public class HeartBeatThread extends Thread 
{
    /**
     * log
     */
	private static final Logger LOG = LoggerFactory.getLogger(HeartBeatThread.class);
	
	//every 60s to invoke the heartbeat interface. unit:millisecond               
	private static final int SLEEPTIME = 60000;
	
	// Network error times,if the heartbeat failed twice,then clear Resourse,logout users
	private static final int COUNT = 2;
	
	private boolean isAlive = true;
	    
	private String workNo;
	//连续断连次数
	private int netWorkErrorCount = 0;
	
	public HeartBeatThread(String workNo)
	{
		super();
		this.workNo = workNo;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public void run()
	{
		Map<String, Object> map;
		Map<String, Object> result;
        String retcode;
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/heartbeat";
        while (isAlive)
        {
        	map = Request.put(workNo,url,null);
        	if (null != map)
        	{
        		retcode = String.valueOf(map.get("retcode"));
        		switch(retcode)
        		{
        		case StringUtils.SUCCESS:
        		    netWorkErrorCount = 0;
        			result = (Map<String, Object>) map.get("result");
        			if (null == result)
        			{
        				continue;
        			}
        			else
        			{
        				LOG.info("HeartBeatAlive: workNo[" + LogUtils.encodeForLog(workNo) + "],loginTime: " + LogUtils.encodeForLog(result.get("loginTime")) );
        			}
        			break;
        			
        			/*
                	 * if agent was forced logout by monitor, after 1 minute, agent receive retcode 100-006
                	 */
                case StringUtils.AGENTNOTLOG:
                    netWorkErrorCount = 0;
                	ServiceUtil.clearResourse(workNo);
                	break;
                	
                case StringUtils.NETWORKERROR:
                	netWorkErrorCount++;
                	if (netWorkErrorCount <= COUNT)
                	{   
                		LOG.error("Event push mode net error---" + LogUtils.encodeForLog(new Date()));
                	}
                	else
                	{
                		ServiceUtil.clearResourse(workNo);
                	}
                	break;
        			
        		default:
        			map = null;
        			break;
        		}
        	}        	
        	pause();
        }
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
