package com.huawei.demo.filter;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.OnlineAgentService;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.LogUtils;



public class SessionListener implements HttpSessionListener{

	private static final Logger LOG = LoggerFactory.getLogger(SessionListener.class);
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		String sessionId = session.getId();
		Set<Entry<String, String>> entrySet = GlobalObjects.COOKIE_MAP.entrySet();
		for (Map.Entry<String, String> entry : entrySet)
		{
			if (sessionId.equals(entry.getValue()))
			{
				//签出坐席
				String workNo = entry.getKey();
				String result = OnlineAgentService.forceLogout(workNo);
				LOG.info("sessionDestroyed result: "+LogUtils.encodeForLog(result));
			}
		}
	}

}
