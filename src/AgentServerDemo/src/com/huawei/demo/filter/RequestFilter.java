package com.huawei.demo.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.LogUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: request filter</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月10日
 */
public class RequestFilter implements Filter {
	private static final Logger LOG = LoggerFactory.getLogger(RequestFilter.class);
	
	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
	     if (!(response instanceof HttpServletResponse)) 
	     {
	         return;
         }
	     HttpServletResponse res = (HttpServletResponse) response;
	     if (!(request instanceof HttpServletRequest)) 
	     {
	         return;
         }
	     HttpServletRequest req = (HttpServletRequest) request;
	     
	     String workNo = req.getParameter("identityMark");
	     String requestType = req.getParameter("type");
	     
		 if ("LOGIN".equals(requestType) || "FORCELOGIN".equals(requestType))
		 {			 
			 chain.doFilter(req, res);
			 return;
		 }
		
		Cookie[] cookies = req.getCookies();
		if (null == cookies || 0 == cookies.length)
		{
			LOG.debug("no cookie of "+LogUtils.encodeForLog(workNo)+"'s request.");
			return;
		}
		
		String sessionId = null;
		for (Cookie cookie : cookies)
		{
			sessionId = cookie.getValue();
			if (null == sessionId)
			{
				return;
			}
			if (GlobalObjects.COOKIE_MAP.containsKey(workNo))
			{
				if (sessionId.equals(GlobalObjects.COOKIE_MAP.get(workNo)))
				{
					chain.doFilter(req, res);
					return;
				}
				else
				{
					PrintWriter out = null;
					try
					{
						out = response.getWriter();
						out.println("{\"message\":\"RELOGIN\",\"retcode\":\"0\"}");
						return;
					}
					catch(Exception e)
					{
						LOG.error("PrintWriter println Error");
						return;
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
			}
			else
			{
				PrintWriter out = null;
				try
				{
					out = response.getWriter();
					out.println("{\"message\":\"RELOGIN\",\"retcode\":\"0\"}");
					return;
				}
				catch(Exception e)
				{
					LOG.error("PrintWriter println Error");
					return;
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
		}
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
