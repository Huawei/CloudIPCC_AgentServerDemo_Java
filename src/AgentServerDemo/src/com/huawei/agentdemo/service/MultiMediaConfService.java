package com.huawei.agentdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class MultiMediaConfService 
{
   /**
    * log
    */
    private static final Logger LOG = LoggerFactory.getLogger(MultiMediaConfService.class);
	  
    /**
     * Report a Multimedia Conference Joining Result
     * request method : POST
     * @param workNo
     * @param confid
     * @param confresult
     * @return
     */
    public static String joinConfResult(String workNo,String confid,String confresult)
    {
    	String url = ServiceUtil.getPrefix() + "multimediaconf/" + workNo + "/joinconfresult";
        
    	Map<String,Object> joinConfResultParam = new HashMap<String,Object>();
        joinConfResultParam.put("confid", confid);
        joinConfResultParam.put("confresult", confresult);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:joinConfResultParam:"+LogUtils.encodeForLog(Request.beanToJson(joinConfResultParam)));
        Map<String,Object> result = Request.post(workNo,url, joinConfResultParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);        
    }
    
    /**
     * Applying for a Multimedia Conference
     * request method : PUT
     * @param workNo
     * @param addressinfo
     * @return
     */
    public static String requestConf(String workNo,String addressinfo,String callid)
    {
    	String url = ServiceUtil.getPrefix() + "multimediaconf/" + workNo + "/requestconf";
        
    	Map<String,Object> requestConfParam = new HashMap<String,Object>();
        requestConfParam.put("addressinfo", addressinfo);
        requestConfParam.put("callid",callid);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:requestConfParam:"+LogUtils.encodeForLog(Request.beanToJson(requestConfParam)));
        Map<String,Object> result = Request.put(workNo,url, requestConfParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);        
    }
    
    /**
     * Invite an agent to join conf
     * request method : PUT
     * @param workNo
     * @param confid
     * @param addressinfo
     * @return
     */
    public static String inviteConf(String workNo,String confid,String addressinfo)
    {
    	String url = ServiceUtil.getPrefix() + "multimediaconf/" + workNo + "/inviteconf";
        
    	Map<String,Object> inviteConfParam = new HashMap<String,Object>();
        inviteConfParam.put("confid", confid);
        inviteConfParam.put("addressinfo", addressinfo);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:inviteConfParam:"+LogUtils.encodeForLog(Request.beanToJson(inviteConfParam)));
        Map<String,Object> result = Request.put(workNo,url, inviteConfParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);        
    }
    
    /**
     * Stop a conf
     * request method : DELETE
     * @param workNo
     * @param confid
     * @return
     */
    public static String stopConf(String workNo,String confid)
    {
    	String url = ServiceUtil.getPrefix() + "multimediaconf/" + workNo + "/stopconf";
        
    	Map<String,Object> stopConfParam = new HashMap<String,Object>();
        stopConfParam.put("confid", confid);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:stopConfParam:"+LogUtils.encodeForLog(Request.beanToJson(stopConfParam)));
        Map<String,Object> result = Request.delete(workNo,url, stopConfParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);        
    }
}
