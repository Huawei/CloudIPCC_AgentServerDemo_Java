package com.huawei.agentdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class QueryCallDataService {
	
   /**
    * log
    */
    private static final Logger LOG = LoggerFactory.getLogger(QueryCallDataService.class);
    
    /**
     * agent query callinfo method
     * @param workNo
     * @return
     */
	public static String queryCallInfo(String workNo) 
	{
	    String url = ServiceUtil.getPrefix() + "calldata/" + workNo + "/callinfo?isNoContainLastCall=true";
	    Map<String,Object> result = Request.get(workNo, url);
	    
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
	}
    	
	/**
     * set calldata method 
     * @param workNo
     * @param callid
     * @param calldata
     * @return
     */
	public static String setCallData(String workNo, String callId, String callData) 
	{
	    String url = ServiceUtil.getPrefix() + "calldata/" + workNo + "/setcalldataex";
	    
	    Map<String,Object> setCallDataParam = new HashMap<String,Object>();
	    setCallDataParam.put("callid",callId);
	    setCallDataParam.put("calldata",callData);
	    
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:setCallDataParam:"+LogUtils.encodeForLog(Request.beanToJson(setCallDataParam)));
	    Map<String, Object> result = Request.put(workNo,url, setCallDataParam);
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
	}
	
    /**
     * query calldata method 
     * @param workNo
     * @return
     */
    public static String queryCallData(String workNo) 
    {
	    String url = ServiceUtil.getPrefix() + "calldata/" + workNo + "/appdata";
	    Map<String,Object> result = Request.get(workNo, url);
	    
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
	}
    
    /**
     *  query the list of held calls
     * @param workNo
     * @return
     */
    public static String queryHoldList(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "calldata/" + workNo + "/holdlist";
        Map<String,Object> result = Request.get(workNo, url);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
}
