package com.huawei.agentdemo.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.ServiceUtil;
import com.huawei.demo.config.ConfigProperties;
import com.huawei.demo.request.Request;

/**
 * 
 * <p>Title: </p>
 * <p>Description: Description: Listener for initialization</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月13日
 */
public class InitServletListener implements ServletContextListener
{
	private static final Logger LOG = LoggerFactory.getLogger(InitServletListener.class);

	@Override
    public void contextDestroyed(ServletContextEvent arg0)
    {
		
    }

	@Override
    public void contextInitialized(ServletContextEvent arg0)
    {      
        boolean loadConfig = ConfigProperties.loadConfig();
        if (!loadConfig)
        {
            LOG.error("load config failed");
        }
        
        ServiceUtil.serviceInit();
        Request.init();	    
		
		LOG.info("contextInitialized detected.");
    }	
}
