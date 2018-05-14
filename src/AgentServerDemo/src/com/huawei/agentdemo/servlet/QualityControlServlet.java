package com.huawei.agentdemo.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.QualityControlService;
import com.huawei.agentdemo.service.QueryAgentGroupService;
import com.huawei.demo.util.StringUtils;

public class QualityControlServlet extends HttpServlet {

	/**
	 * log
	 */
	private static final Logger LOG = LoggerFactory.getLogger(QualityControlServlet.class);
	private static final long serialVersionUID = 1L;
	
	public QualityControlServlet() 
	{
	}
	
	/**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
        try
        {
            request.setCharacterEncoding("utf-8");
            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html");
            
            String workNo = request.getParameter("identityMark");
            if (StringUtils.isNullOrBlank(workNo))
            {
                LOG.warn("workNo is null or blank");
                return;
            }
            
            String type = request.getParameter("type");
            if (StringUtils.isNullOrBlank(type))
            {
                LOG.warn("type is null or blank");
                return;
            }
            
            String monitoredWorkNo = request.getParameter("monitoredWorkNo");
            String switchType = request.getParameter("swithType");
            String result = StringUtils.EMPTY_STRING;
            String whisperWorkNo = request.getParameter("whisperWorkNo");
            
            switch (type) {
            case "INSERT":
                result = QualityControlService.qualityControlInsert(workNo,monitoredWorkNo);
                break;
                
            case "SUSPERVISE":
                result = QualityControlService.qualityControlSurspervise(workNo,monitoredWorkNo);
                break;
                
            case "INTERCEPT":
                result = QualityControlService.qualityControlIntercept(workNo,monitoredWorkNo);
                break;
                
            case "SWITCHTYPE":
                result = QualityControlService.qualityControlSwitchType(workNo,monitoredWorkNo,switchType);
                break;
                
            case "CANCELLINSERTORLISTEN":
                result = QualityControlService.qualityControlCancelInsert(workNo,monitoredWorkNo);
                break;
                
            case "REQUESTWHISPER":
                result = QualityControlService.qualityControlRequestWhisper(workNo,whisperWorkNo);
                break;
                
            case "STOPWHISPER":
                result = QualityControlService.qualityControlStopWhisper(workNo,whisperWorkNo);
                break;
                
            case "SEARCHALLAGENTS":
                result = QueryAgentGroupService.queryOnlineAgent(workNo);
                break;
                
            default:
                result = "无法匹配对应的type属性";
                break;
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
            LOG.error("catch throwable at QualityControlServlet: ",throwable);
        }
	}
}
