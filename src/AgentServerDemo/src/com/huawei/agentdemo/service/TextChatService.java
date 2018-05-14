package com.huawei.agentdemo.service;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class TextChatService {
	
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(TextChatService.class);
	
    /**
     * agent answer a text chat method
     * request method : PUT
     * @param workNo
     * @param callId
     * @return
     */
    public static String textAnswer(String workNo,String callId)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/answer/" + callId;
    	
    	Map<String,Object> result = Request.put(workNo,url, null);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * agent reject a text chat method
     * request method : DELETE
     * @param workNo
     * @param callId
     * @return
     */
    public static String textReject(String workNo,String callId)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/reject/" + callId;
    	
    	Map<String,Object> result = Request.delete(workNo,url, null);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * agent terminate a text chat method
     * request method : DELETE
     * @param workNo
     * @param callId
     * @return
     */
    public static String textDrop(String workNo,String callId)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/drop/" + callId;
    	
    	Map<String,Object> result = Request.delete(workNo,url, null);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * agent send a text message method
     * request method : PUT
     * @param workNo
     * @param callId
     * @param content
     * @return
     */
    public static String textSendmessage(String workNo,String callId,String content)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/chatmessage/";
    	
    	Map<String,Object> chatMessage = new HashMap<String,Object>();
    	chatMessage.put("callId", callId);
    	chatMessage.put("content", content);
    	
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:chatMessage:"+LogUtils.encodeForLog(Request.beanToJson(chatMessage)));
    	Map<String,Object> result = Request.put(workNo,url, chatMessage);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * agent request an internal text chat method
     * request method : PUT
     * @param workNo
     * @param called
     * @return
     */
    public static String textCallinner(String workNo,String called)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/internalcall/" + called;
    	   	
    	Map<String,Object> result = Request.put(workNo,url, null);
    	LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
    	
    	return StringUtils.beanToJson(result);
    }
    
    /**
     * agent transfer a text chat to another agent or skill queue
     * request method : POST 
     * @param workNo
     * @param addesstype
     * @param destaddr
     * @param callId
     * @param mode
     * @return
     */
    public static String textTransfer(String workNo ,String addesstype,String destaddr,String callId,String mode)
    {
    	String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/transfer";
        
    	Map<String,Object> textTransferParam = new HashMap<String,Object>();
        textTransferParam.put("addesstype", addesstype);
        textTransferParam.put("destaddr", destaddr);
        textTransferParam.put("callid", callId);
        textTransferParam.put("mode", mode);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:textTransferParam:"+LogUtils.encodeForLog(Request.beanToJson(textTransferParam)));
        Map<String,Object> result = Request.post(workNo,url, textTransferParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }    

    /**
     * agent upload file method
     * request method : POST
     * @param workNo
     * @param callId
     * @param mediaData
     * @param fileName
     * @return
     */
    public static String uploadFile(String workNo,String callId,byte[] mediaData,String fileName)
    {
        String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/mediafile?callId=" + callId + "&isNeedConfirm=false"
        		+"&chatId=1&msgType=22&remark=test";
        
        Map<String, Object> result = Request.postMedia(workNo, url, mediaData, fileName);
        LOG.debug("userName = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    /**
     * user download file method
     * request method : POST
     * @param workNo
     * @param filePath
     * @return
     */
    public static String downloadFile(String workNo,String filePath)
    {
        String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/mediafile?filePath=" + filePath;
        filePath = Normalizer.normalize(filePath, Form.NFKC);
        int suffixBegin = filePath.lastIndexOf(".");
        String suffix = filePath.substring(suffixBegin);
        return Request.getMedia(workNo, url, suffix); 
    }
    
    /****************************全量接口示例开始************************/
    
    /**
     * 无呼叫发送内容给用户
     * 在没有呼叫的场景，向指定用户发送内容
     * @param workNo
     * @param skillId           选择发送的技能
     * @param chatId            本次发送内容的编号，需要用户自定义
     * @param chatReceiver      消息接收人，长度不能超过4000
     * @param content           消息内容，内容不能为空，长度不能超过6144
     * @param jauIP             JAU服务器IP，最大长度为100
     * @param jauPort           JAU服务器端口
     * @return
     */
    public static String sendMessageWithoutCall(String workNo ,String skillId, String chatId, 
            String chatReceiver, String content, String jauIP, String jauPort)
    {
        String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/sendmessagewithoutcall";
        
        Map<String,Object> sendMsgParamm = new HashMap<String,Object>();
        sendMsgParamm.put("skillId", skillId);
        sendMsgParamm.put("chatId", chatId);
        sendMsgParamm.put("chatReceiver", chatReceiver);
        sendMsgParamm.put("content", content);
        sendMsgParamm.put("jauIP", jauIP);
        sendMsgParamm.put("jauPort", jauPort);
        
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:sendMsgParamm:"+LogUtils.encodeForLog(Request.beanToJson(sendMsgParamm)));
        Map<String,Object> result = Request.post(workNo,url, sendMsgParamm);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }  
    
    
    /**
     * 确认接收非实时呼叫内容
     * 向用户发送确认消息，表示座席已经收到消息
     * @param workNo
     * @param skillId           选择发送的技能
     * @param chatId            本次发送内容的编号，需要用户自定义
     * @param chatReceiver      消息接收人，长度不能超过4000
     * @param content           消息内容，内容不能为空，长度不能超过6144
     * @param jauIP             JAU服务器IP，最大长度为100
     * @param jauPort           JAU服务器端口
     * @return
     */
    public static String confirmMessageWithoutCall(String workNo ,String skillId, String chatId, 
            String chatReceiver, String content, String jauIP, String jauPort)
    {
        String url = ServiceUtil.getPrefix() + "textchat/" + workNo + "/sendmessagewithoutcall";
            
        Map<String,Object> result = Request.put(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    /****************************全量接口示例结束************************/
}
