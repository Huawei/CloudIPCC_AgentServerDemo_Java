package com.huawei.agentdemo.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class QualityControlService {
	
	/**
	 * log
	 */
    private static final Logger LOG = LoggerFactory.getLogger(QualityControlService.class);

    /**
     * agent addInsert  method
     * request method : PUT
     * @param workNo
     * @param moniteredWorkNo
     * @return 
     * @return
     *
     */
	public static String qualityControlInsert(String workNo, String monitoredWorkNo) 
	{
        String url =  ServiceUtil.getPrefix() + "qualitycontrol/" + workNo + "/addinsert/"+monitoredWorkNo;
    	Map<String,Object> result = Request.put(workNo,url, null);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"momitoredWorkNo = "+LogUtils.encodeForLog(monitoredWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	return StringUtils.beanToJson(result);
	}
	
	/**
     * agent cancell action of listening or addInsert method
     * request method : DELETE
     * @param workNo
     * @param moniteredWorkNo
     * @return 
     * @return
     *
     */
	public static String qualityControlCancelInsert(String workNo, String monitoredWorkNo)
	{
		String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/"+monitoredWorkNo;
	    Map<String,Object> result = Request.delete(workNo,url, null);
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"momitoredWorkNo = "+LogUtils.encodeForLog(monitoredWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
	}
    

    /**
     * agent addSupervise  method
     * request method : PUT
     * @param workNo
     * @param moniteredWorkNo
     * @return 
     */
	public static String qualityControlSurspervise(String workNo, String monitoredWorkNo)
	{
		String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/addsupervise/"+monitoredWorkNo;
	    Map<String,Object> result = Request.put(workNo,url, null);
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"momitoredWorkNo = "+LogUtils.encodeForLog(monitoredWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    
	    return StringUtils.beanToJson(result);
	}

    /**
	 * agent addSupervise  method
	 * request method : PUT
	 * @param workNo
	 * @param moniteredWorkNo
	 * @return 
	 */
	public static String qualityControlIntercept(String workNo, String monitoredWorkNo) 
	{
        String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/intercept/"+monitoredWorkNo;
	    Map<String,Object> result = Request.put(workNo,url,null);
	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"momitoredWorkNo = "+LogUtils.encodeForLog(monitoredWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
    }
	
	/**
     * agent request switch in insert whisper and supervise  method
     * request method : POST
     * @param workNo
     * @param moniteredWorkNo
     * @param swithType
     * @return 
     *
	 */	
	public static String qualityControlSwitchType(String workNo, String monitoredWorkNo, String switchType) 
	{    
		 String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/requestswitchinsertwhisperagent?whisperagentid="+monitoredWorkNo+"&switchtype="+switchType;
		 Map<String,Object> result = Request.post(workNo,url,null);
		 LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"momitoredWorkNo = "+LogUtils.encodeForLog(monitoredWorkNo)+"switchType="+LogUtils.encodeForLog(switchType)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
		    
		 return StringUtils.beanToJson(result);
	}
	
	
	/**
     * request whisper  method
  	 * request method : POST
     * @param workNo
     * @param whisperWorkNo
     * @return 
     *
     */	
	public static String qualityControlRequestWhisper(String workNo, String whisperWorkNo) 
	{          
		 String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/requestwhisperagent?whisperagentid="+whisperWorkNo;
		 Map<String,Object> result = Request.post(workNo,url,null);
		 LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"whisperWorkNo = "+LogUtils.encodeForLog(whisperWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
		 return StringUtils.beanToJson(result);
	}
	
	
    /**
     * stop whisper  method
	 * request method : POST
	 * @param workNo
	 * @param whisperWorkNo
	 * @return 
	 *
     */	
	public static String qualityControlStopWhisper(String workNo, String whisperWorkNo)
	{
		String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/requeststopwhisperagent?whisperagentid="+whisperWorkNo;
		Map<String,Object> result = Request.post(workNo,url,null);
		LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+"whisperWorkNo = "+LogUtils.encodeForLog(whisperWorkNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
		return StringUtils.beanToJson(result);
	}

	
    /**
     * query all the agents could be listented or monitored  method
	 * request method : GET
	 * @param workNo
	 * @return 
	 *
     */	
	public static String qualityControlSearchAllAgents(String workNo) 
	{    
		 String url = ServiceUtil.getPrefix()+"qualitycontrol/"+workNo+"/allagent";
		 Map<String,Object> result = Request.get(workNo,url);
		 LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return result:"+LogUtils.encodeForLog(Request.beanToJson(result)));
		 return StringUtils.beanToJson(result);
	}
}
