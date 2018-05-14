package com.huawei.agentdemo.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class QueryAgentGroupService {

   /**
    * log
    */
    private static final Logger LOG = LoggerFactory.getLogger(QueryAgentGroupService.class);
    
   /**
    * query the group information about a specified agent
    * @param workNo
    * @return
    */
    public static String queryAgentGroupByWorkNo(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "agentgroup/" + workNo + "/groupbyagent/" + workNo;
        
        Map<String,Object> result = Request.get(workNo, url);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
        
    }
    
    /**
     * qeury Online Agents
     * @param workNo
     * @return
     */
    public static String queryOnlineAgent(String workNo)
    {
    	String url = ServiceUtil.getPrefix() + "agentgroup/" + workNo + "/onlineagentonvdn";
    	
    	Map<String,Object> result = Request.get(workNo, url);
    	
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * qeury all the codes of restreason on the vdn where agent located   
     * @param workNo
     * @return
     */
    public static String queryRestReason(String workNo) {
    	String url = ServiceUtil.getPrefix() + "agentgroup/" + workNo + "/restreason";
    	
    	Map<String,Object> result = Request.get(workNo, url);
    	
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * qeury all the onlineAgents on the vdn where agent located  
     * @param workNo
     * @return
     */
    public static String queryAllAgents(String workNo) {
    	String url = ServiceUtil.getPrefix() + "agentgroup/" + workNo + "/allagentstatus";
    	
    	Map<String,Object> result = Request.get(workNo, url);
    	
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	return StringUtils.beanToJson(result);
    }
}
