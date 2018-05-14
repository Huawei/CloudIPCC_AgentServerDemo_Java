package com.huawei.agentdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.VoiceCallService;
import com.huawei.demo.util.StringUtils;

/**
 * <p>Title: voice call interface servlet </p>
 * <p>Description: voice call interface servlet </p>
 */
public class VoiceCallServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LoggerFactory.getLogger(VoiceCallServlet.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public VoiceCallServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
	{
        try
        {
            try 
            {
                request.setCharacterEncoding("utf-8");
            } 
            catch (UnsupportedEncodingException e1) 
            {
                LOG.error("request set character encoding error");
            }
            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html");
            String workNo = request.getParameter("identityMark");
            String callId = request.getParameter("callId");
            String called = request.getParameter("called");
            String address = request.getParameter("address");
            String devicetype = request.getParameter("deviceType");
            String mode = request.getParameter("mode");
            String type = request.getParameter("type");
            String number = request.getParameter("number");
            String destWorkNo = request.getParameter("destWorkNo");
            
            String result = StringUtils.EMPTY_STRING;
            
            if (StringUtils.isNullOrBlank(workNo))
            {
                LOG.warn("workNo is null or blank");
                return;
            }
            if (StringUtils.isNullOrBlank(type))
            {
                LOG.warn("type is null or blank");
                return;
            }
            switch(type)
            {
                case "ANSWER":
                    result = VoiceCallService.voiceAnswer(workNo);
                    break;
                case "RELEASE":
                    result = VoiceCallService.voiceRelease(workNo);
                    break;
                case "HOLD":
                    result = VoiceCallService.hold(workNo);
                    break;
                case "GETHOLD":
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    result = VoiceCallService.getHold(workNo,callId);
                    break;
                case "MUTE":
                    result = VoiceCallService.mute(workNo);
                    break;
                case "CANCLEMUTE":
                    result = VoiceCallService.cancleMute(workNo);
                    break;
                case "DESTROYTHECALL":
                    result = VoiceCallService.destroyTheCall(workNo,callId);
                    break;
                case "CALLINNER":
                    if (StringUtils.isNullOrBlank(called))
                    {
                        LOG.warn("called is null or blank");
                        return;
                    }
                    result = VoiceCallService.voicecallInner(workNo,called);
                    break;
                case "THREEPART":
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    result = VoiceCallService.voiceThreePart(workNo,callId);
                    break;
                case "INNERHELP":
                    if (StringUtils.isNullOrBlank(address))
                    {
                        LOG.warn("address is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(devicetype))
                    {
                        LOG.warn("devicetype is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(mode))
                    {
                        LOG.warn("mode is null or blank");
                        return;
                    }
                    result = VoiceCallService.voiceInnerHelp(workNo,address,devicetype,mode);
                    break;
                case "CALLOUT":
                    if (StringUtils.isNullOrBlank(called))
                    {
                        LOG.warn("called is null or blank");
                        return;
                    }
                    result = VoiceCallService.voicecallOut(workNo,called);
                    break;
                case "TRANSFER":
                    if (StringUtils.isNullOrBlank(address))
                    {
                        LOG.warn("address is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(devicetype))
                    {
                        LOG.warn("devicetype is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(mode))
                    {
                        LOG.warn("mode is null or blank");
                        return;
                    }
                    result = VoiceCallService.voiceTransfer(workNo,devicetype,address,mode);
                    break;
                    
                    /****************************全量接口示例开始************************/
                    
                    //取消转移
                case "CANCELTRANSFER":
                    result = VoiceCallService.cancelTransfer(workNo);
                    break;
                    
                    //二次拨号
                case "SECONDDIAL":
                    result = VoiceCallService.secondDialEx(workNo, number);
                    break;
                    
                    //连接保持
                case "CONNECTHOLD":
                    result = VoiceCallService.connectHold(workNo, callId);
                    break;

                    //呼叫代答
                case "SNATCHPICKUP":
                    result = VoiceCallService.snatchPickUp(workNo, destWorkNo);
                    break;
                    
                  //释放指定号码连接
                case "DISCONNECT":
                    result = VoiceCallService.disconnect(workNo, number);
                    break;

                    /****************************全量接口示例结束************************/
                    
                default:
                    break;  
            }
            
            PrintWriter out = null;
            try{
                out = response.getWriter();
                out.println(result);
            }
            catch(Exception e)
            {
                LOG.error("PrintWriter println Error");
            }
            finally
            {
                if (null != out)
                {
                    try{
                        out.flush();
                        out.close();
                    }
                    catch(Exception e)
                    {
                        LOG.error("Close PrintWriter error");
                    }
                }
            }

        }
        catch(Throwable throwable)
        {
            LOG.error("catch throwable at VoiceCallServlet: ",throwable);
        }
	}

}
