package com.huawei.agentdemo.servlet;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.ServiceUtil;
import com.huawei.demo.bean.ProcessMessageQueue;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * <p>Title: </p>
 * <p>Description: get push event from gateway </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2018-01-01
 */
public class AgentEventServlet extends HttpServlet 
{	
	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LoggerFactory.getLogger(AgentEventServlet.class);
	//读取io流字节数组的最大长度
	private static final int BYTE_ARRAY_LENGTH = 1024;
	
	public AgentEventServlet()
	{
		super();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
    {
		doPost(request, response);
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
    {
		try
		{
		    if (ServiceUtil.isPullFromAgw())
		    {
		        response.setStatus(403);
		        LOG.error("agentServerDemo pull event from agentgateway");
		        return;
		    }
		
		    String ip = request.getRemoteHost();
		    String eventContent = null; 
		    ServletInputStream in = null;
		    try
		    {
		        in = request.getInputStream();
		        StringBuffer stringBuffer = new StringBuffer();
		        int len = request.getContentLength() < BYTE_ARRAY_LENGTH?request.getContentLength():BYTE_ARRAY_LENGTH;
		        byte[] readByte = new byte[len];
		        int readLength;
		        while ((readLength = in.read(readByte))>0) 
		        {
		            String string = new String(readByte, 0, readLength, "utf-8");
		            stringBuffer.append(string);
		        }
		        eventContent = stringBuffer.toString();
		     
		    }
		    catch (IOException e)
		    {
		        LOG.error("Read requestContent fail, \r\n {}", LogUtils.encodeForLog(e.getMessage()));
		    }
		    finally
		    {
		        if (null != in) 
		        {
		            try 
		            {
		                in.close();
		            }
		            catch (IOException e) 
		            {
		                LOG.error("release inputstream failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
		            }
		        }
		    }
        
		    if (null == eventContent || eventContent.equals(""))
		    {
		        response.setStatus(403);
		        LOG.error("receive a null event from " + LogUtils.encodeForLog(ip));
		        return;
		    }
        
		    Map<String, Object> eventMap = StringUtils.jsonToMap(eventContent);
		    if (null != eventMap)
		    {
		        response.setStatus(200);
		        String retcode = String.valueOf(eventMap.get("retcode"));
		        switch (retcode)
		        {
		            /*
		             * request successfully
		             */
		            case StringUtils.SUCCESS:
		                @SuppressWarnings("unchecked")
		                Map<String, Object> event = (Map<String, Object>) eventMap.get("event");
		                if (null == event)
		                {
		                    LOG.error("event is null");
		                    return;
		                }
                	
		                String workNo = (String)event.get("workNo");
		                String message = StringUtils.beanToJson(event);
		                if (!GlobalObjects.LOGINED_MAP.containsKey(workNo))  //get logged in agent event only
		                {
		                    GlobalObjects.LOGINED_MAP.put(workNo, new ProcessMessageQueue());
		                    GlobalObjects.LOGINED_MAP.get(workNo).putMessage(message);
		                }
		                else
		                {
		                    GlobalObjects.LOGINED_MAP.get(workNo).putMessage(message);
		                }
		                break;
                
		            default:
		                break;
		        }
		    }
		}
		catch(Throwable throwable)
		{
		    LOG.error("catch throwable at AgentEventServlet ",throwable);
		}
    }
}
