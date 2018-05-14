package com.huawei.demo.bean;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * <p>Title: event queue </p>
 * <p>Description: event queue </p>
 */
/**
 * <p>Title: event queue </p>
 * <p>Description: event queue </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version 
 * @since 2017年10月10日
 */
public class ProcessMessageQueue
{
    private Queue<String> messageQueue = new ConcurrentLinkedQueue<String>();

    public void putMessage(String message)
    {
       messageQueue.add(message);
    }

    public String getMessage()
    {
        
        if ( messageQueue.size() > 0)
        {
            return messageQueue.poll();
        }
        return null;
    }
    
    public int size()
    {
    	return messageQueue.size();
    }

}
