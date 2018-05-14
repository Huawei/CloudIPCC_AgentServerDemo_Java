package com.huawei.agentdemo.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class QueryQueueDeviceService {
	
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(QueryQueueDeviceService.class);
	
    /**
     * query configured skill queue information
     * @param workNo
     * @return
     */
    public static String queryAgentSkillByWorkNo(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "queuedevice/" + workNo + "/agentvdnskill";
        
        Map<String,Object> result = Request.get(workNo, url);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * query the IVR information of the home VDN of the agent that has logged in
     * @param workNo
     * @return
     */
    public static String queryIvr(String workNo) {
        String url = ServiceUtil.getPrefix() + "queuedevice/" + workNo + "/ivrinfo";
        
        Map<String,Object> result = Request.get(workNo, url);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * query the access code information of the home VDN of the agent that has logged in.
     * @param workNo
     * @return
     */
    public static String queryAccessCode(String workNo) {
        String url = ServiceUtil.getPrefix() + "queuedevice/" + workNo + "/innoinfo";
        
        Map<String,Object> result = Request.get(workNo, url);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
}
