package com.huawei.agentdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class VoiceCallService {
	
   /**
    * log
    */
    private static final Logger LOG = LoggerFactory.getLogger(VoiceCallService.class);
    
    /**
     * agent answer voice call method
     * request method : PUT
     * @param workNo
     * @return
     */
    public static String voiceAnswer(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/answer";
        
        Map<String, Object> result = Request.put(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
       return StringUtils.beanToJson(result);
    }
    
    /**
     * agent release voice call method
     * request method : DELETE
     * @param workNo
     * @return
     */
    public static String voiceRelease(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/release";
        
        Map<String,Object> result = Request.delete(workNo,url,null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent mute an ongoing call
     * request method : POST
     * @param workNo
     * @return
     */
    public static String mute(String workNo)
    {
    	String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/beginmute";
 	    
 	    Map<String,Object> result = Request.post(workNo,url, null);
 	   LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
 	    return StringUtils.beanToJson(result);
    }
    
    /**
     * agent cancel mute a muted call
     * request method : POST
     * @param workNo
     * @return
     */
    public static String cancleMute(String workNo)
    {
    	String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/endmute";
 	    
 	    Map<String,Object> result = Request.post(workNo,url, null);
 	   LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
 	    return StringUtils.beanToJson(result);
    }
    
    /**
     * agent hold voice call method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String hold(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/hold";
        
        Map<String,Object> result = Request.post(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent cancel hold voice call method
     * request method : POST
     * @param workNo
     * @param callId
     * @return
     */
    public static String getHold(String workNo ,String callId)
    {
	    String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/gethold?callid=" + callId;
	    
	    Map<String,Object> result = Request.post(workNo,url, null);
	   LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
	    return StringUtils.beanToJson(result);
    }
    
    /**
     * agent make an internal voice call method
     * request method : PUT
     * @param workNo
     * @param called
     * @return
     */
    public static String voicecallInner(String workNo,String called)
    {
    	String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/callinner";
 	    
    	Map<String,Object> callInnerParam = new HashMap<String,Object>();
 	    callInnerParam.put("called", called);  //called ID
 	    
 	    LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:callInnerParam:"+LogUtils.encodeForLog(Request.beanToJson(callInnerParam)));
 	    Map<String,Object> result = Request.put(workNo,url, callInnerParam);
 	   LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
 	    return StringUtils.beanToJson(result);
    }
    
    /**
     * agent make a three-party call based on a held call.
     * @param workNo
     * @param callId
     * @return
     */
    public static String voiceThreePart(String workNo, String callId)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/confjoin";
        
        Map<String,Object> threePartParam = new HashMap<String,Object>();
        threePartParam.put("callid", callId);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:threePartParam:"+LogUtils.encodeForLog(Request.beanToJson(threePartParam)));
        Map<String,Object> result = Request.post(workNo,url, threePartParam);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent ask for inner help
     * @param workNo
     * @param callId
     * @return
     */
    public static String voiceInnerHelp(String workNo, String dstaddress, String devicetype, String mode)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/innerhelp";
        
        Map<String,Object> innerHelpParam = new HashMap<String,Object>();
        innerHelpParam.put("dstaddress", dstaddress);
        innerHelpParam.put("devicetype", devicetype);
        innerHelpParam.put("mode", mode);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:innerHelpParam:"+LogUtils.encodeForLog(Request.beanToJson(innerHelpParam)));
        Map<String,Object> result = Request.post(workNo,url, innerHelpParam);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent make an outgoing voice call method
     * request method : PUT
     * @param workNo
     * @param called
     * @return
     */
    public static String voicecallOut(String workNo,String called)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/callout";
        
        Map<String,Object> callOutParam = new HashMap<String,Object>();
        callOutParam.put("called", called);// called NUM
        Map<String,Object> result = Request.put(workNo,url, callOutParam);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent transfer a voice call to another agent method
     * request method : POST
     * @param workNo
     * @param deviceType
     * @param address
     * @param mode
     * @return
     */
    public static String voiceTransfer(String workNo , String deviceType, String address, String mode)
    {
    	String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/transfer";
        
    	Map<String,Object> transferParam = new HashMap<String,Object>();
        transferParam.put("devicetype", deviceType);
        transferParam.put("mode", mode);
        transferParam.put("address", address);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:transferParam:"+LogUtils.encodeForLog(Request.beanToJson(transferParam)));
        Map<String,Object> result = Request.post(workNo,url, transferParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }   
    
    /**
     * agent drop a certain call by callid method 
     * request method POST
     * @param workNo
     * @param callId
     * @return
     */
    public static String destroyTheCall(String workNo, String callId) 
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/dropcall/" + callId;
        
        Map<String,Object> destroyCallParam = new HashMap<String,Object>();
        destroyCallParam.put("callid",callId);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:destroyCallParam:"+LogUtils.encodeForLog(Request.beanToJson(destroyCallParam)));
        Map<String, Object> result = Request.post(workNo,url, destroyCallParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }

    /********************************************全量接口示例**************************************************/
    
    /**
     * 取消转移
     * 座席对已经转移的通话进行取回
     * @param workNo
     * @return
     */
    public static String cancelTransfer(String workNo) 
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/canceltransfer";
        
        Map<String, Object> result = Request.post(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * 二次拨号
     * 座席对正在通话中的通话进行二次拨号，支持输入#。
     * @param workNo
     * @param number
     * @return
     */
    public static String secondDialEx(String workNo, String number) 
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/seconddialex?number=" + number;
        
        Map<String, Object> result = Request.post(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * 连接保持
     * 座席对正在通话中的通话和保持中的通话进行连接保持
     * @param workNo
     * @param callId
     * @return
     */
    public static String connectHold(String workNo, String callId) 
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/connecthold/" + callId;
        
        Map<String, Object> result = Request.post(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * 呼叫代答
     * 座席代答另一座席的语音呼叫
     * @param workNo
     * @param destWorkNo
     * @return
     */
    public static String snatchPickUp(String workNo, String destWorkNo)
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/snatchpickup?destWorkNo=" + destWorkNo;
        
        Map<String,Object> result = Request.put(workNo,url, null);
        LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);        
    }
    
    /**
     * 释放指定号码连接
     * 座席释放指定电话号码的连接
     * @param workNo
     * @param number
     * @return
     */
    public static String disconnect(String workNo, String number) 
    {
        String url = ServiceUtil.getPrefix() + "voicecall/" + workNo + "/disconnect/" + number;
        
        Map<String, Object> result = Request.post(workNo,url, null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /****************************全量接口示例结束************************/
}
