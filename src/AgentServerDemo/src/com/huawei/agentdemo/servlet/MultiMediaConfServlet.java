package com.huawei.agentdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.MultiMediaConfService;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月13日
 */
public class MultiMediaConfServlet extends HttpServlet {
	
    /**
     * log
     */
	private static final Logger LOG = LoggerFactory.getLogger(MultiMediaConfServlet.class);

	private static final long serialVersionUID = 1L;
	
	public MultiMediaConfServlet() {
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
            String type = request.getParameter("type");
            String callid = request.getParameter("callid");
            
            
            String addressinfo = request.getParameter("addressInfo");
            String confid = request.getParameter("confid");
            String confresult = request.getParameter("confresult");
            
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
                case "JOINCONFRESULT":
                    if (StringUtils.isNullOrBlank(confid))
                    {
                        LOG.warn("confid is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(confresult))
                    {
                        LOG.warn("confresult is null or blank");
                        return;
                    }
                    result = MultiMediaConfService.joinConfResult(workNo,confid,confresult);
                    break;
                    
                case "REQUESTCONF":
                    if (StringUtils.isNullOrBlank(addressinfo))
                    {
                        LOG.warn("addressinfo is null or blank");
                        return;
                    }
                    result = MultiMediaConfService.requestConf(workNo,addressinfo,callid);
                    break;
                    
                case "INVITECONF":
                    if (StringUtils.isNullOrBlank(confid))
                    {
                        LOG.warn("confid is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(addressinfo))
                    {
                        LOG.warn("addressinfo is null or blank");
                        return;
                    }
                    result = MultiMediaConfService.inviteConf(workNo,confid,addressinfo);
                    break;
                    
                case "STOPCONF":
                    if (StringUtils.isNullOrBlank(confid))
                    {
                        LOG.warn("confid is null or blank");
                        return;
                    }
                    result = MultiMediaConfService.stopConf(workNo,confid);
                    break;
                default:
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
                if(null != out)
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
            LOG.error("catch throwable at MultiMediaConfServlet: ",throwable);
        }
    }
}
