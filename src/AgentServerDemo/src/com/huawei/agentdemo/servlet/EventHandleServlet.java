package com.huawei.agentdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.bean.ProcessMessageQueue;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: get event servlet</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月13日
 */
public class EventHandleServlet extends HttpServlet
{
    private static final long serialVersionUID = 1L;
    
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(EventHandleServlet.class);

    /**
     * 无事件等待次数
     */
    private static final int EVENTPULLWAITTIMES = 100;
    
    /**
     * 无事件每次等待时间
     */
    private static final long EVENTPULLWAITINTERVAL = 100;
    
    
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EventHandleServlet()
    {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) 
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
            if (StringUtils.isNullOrBlank(workNo))
            {
                LOG.warn("workNo is null or blank");
                return;
            }
            if (!GlobalObjects.LOGINED_MAP.containsKey(workNo))
            {
                LOG.warn(LogUtils.encodeForLog(workNo)+" has not logged in");
                return;
            }
            
            String result = StringUtils.EMPTY_STRING;
            for (int i = 0; i < EVENTPULLWAITTIMES; i++)
            {
            	ProcessMessageQueue eventQueue = GlobalObjects.LOGINED_MAP.get(workNo);
                if (null == eventQueue)
                {
                	Thread.sleep(EVENTPULLWAITINTERVAL);
                	continue;
                }
                result = eventQueue.getMessage();
                if (null == result)
                {
                	Thread.sleep(EVENTPULLWAITINTERVAL);
                	continue;
                }
                else
                {
                	break;
                }
            }            
            
            if (StringUtils.isNullOrBlank(result))
            {
                result = "{\"message\":\"\",\"retcode\":\"0\"}";
            }
            else 
            {
                LOG.info(LogUtils.encodeForLog(result));
            }
            
            PrintWriter out = null;
            try
            {
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
                    try
                    {
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
            LOG.error("catch throwable at EventHandleServlet: ",throwable);
        }
        
        
    }

}
