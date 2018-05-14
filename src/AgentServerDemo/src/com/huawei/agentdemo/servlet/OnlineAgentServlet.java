package com.huawei.agentdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.OnlineAgentService;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.StringUtils;

/**
 * <p>Title: online agent interface servlet </p>
 * <p>Description: online agent interface servlet </p>
 */
public class OnlineAgentServlet extends HttpServlet
{
	/**
	 * log
	 */
	private static final Logger LOG = LoggerFactory.getLogger(OnlineAgentServlet.class);

	private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public OnlineAgentServlet()
    {
        super();
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
            String isAuto = request.getParameter("isAutoanswer");
            
            String password = request.getParameter("password");
            String phonenum = request.getParameter("phonenum");
            String agenttype = request.getParameter("agenttype");
            String restTime = request.getParameter("restTime");
            String restReason = request.getParameter("restReason");
            String oldPassword = request.getParameter("oldPassword");
            String newPasswork = request.getParameter("newPasswork");
            String targettype = request.getParameter("targettype");
            String bulletindata = request.getParameter("bulletindata");
            String targetname = request.getParameter("targetname");
            String receiver = request.getParameter("receiver");
            String content = request.getParameter("content");
            
            String qWorkNo = request.getParameter("qWorkNo");
            String autoIdleFlag = request.getParameter("autoIdleFlag");
            String logoutReason = request.getParameter("logoutReason");
            
            
            String result = StringUtils.EMPTY_STRING;
            boolean isAutoanswer = true;
            if ("false".equals(isAuto))
            {
                isAutoanswer = false;
            }
            
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
            case "FORCELOGIN":
                if (StringUtils.isNullOrBlank(phonenum))
                {
                    LOG.warn("pnonenum is null or blank");
                    return;
                } 
                if (GlobalObjects.COOKIE_MAP.containsKey(workNo))
                {
                    GlobalObjects.COOKIE_MAP.remove(workNo);
                }
                result = OnlineAgentService.forceLogin(workNo, password, phonenum,isAutoanswer,agenttype);
                
                Map<String, Object> forceLoginRes = StringUtils.jsonToMap(result);
                if ("0".equals(forceLoginRes.get("retcode")))
                {
                    HttpSession session = request.getSession();
                    String sessionId = session.getId();
                    GlobalObjects.COOKIE_MAP.put(workNo, sessionId);
                }
                break;
                
            case "LOGOUT":
                result = OnlineAgentService.logout(workNo);
                Map<String, Object> res1 = StringUtils.jsonToMap(result);
                if ("0".equals(res1.get("retcode")))
                {
                    HttpSession session = request.getSession();
                    session.invalidate();
                }
                break;
                
            case "FORCELOGOUT":
                result = OnlineAgentService.forceLogout(workNo);
                Map<String, Object> res2 = StringUtils.jsonToMap(result);
                if ("0".equals(res2.get("retcode")))
                {
                    HttpSession session = request.getSession();
                    session.invalidate();
                }
                break;
                
            case "MODIFYPWD":
                if (StringUtils.isNullOrBlank(newPasswork))
                {
                    LOG.warn("newPasswork is null or blank");
                    return;
                }
                result = OnlineAgentService.modifyPwd(workNo,oldPassword,newPasswork);
                break;
                
            case "READY":
                result = OnlineAgentService.ready(workNo);
                break;
                
            case "BUSY":
                result = OnlineAgentService.busy(workNo);
                break;
            
            case "WORK":
                result = OnlineAgentService.work(workNo);
                break;
                
            case "OUTWORK":
                result = OnlineAgentService.outWork(workNo);
                break;
                
            case "REST":
                if (StringUtils.isNullOrBlank(restTime))
                {
                    LOG.warn("restTime is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(restReason))
                {
                    LOG.warn("restReason is null or blank");
                    return;
                }
                result = OnlineAgentService.rest(workNo,restTime,restReason);
                break;
                
            case "CANCELREST":
                result = OnlineAgentService.cancelRest(workNo);
                break;
                
            case "RESETSKILL":
                result = OnlineAgentService.resetSkills(workNo);
                break;
                
            case "PUBLISHNOTICE":
                if (StringUtils.isNullOrBlank(targettype))
                {
                    LOG.warn("targettype is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(bulletindata))
                {
                    LOG.warn("bulletindata is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(targetname))
                {
                    LOG.warn("targetname is null or blank");
                    return;
                }
                result = OnlineAgentService.publishNotice(workNo,targettype,bulletindata,targetname);
                break;
                
            case "SENDNOTE":
                if (StringUtils.isNullOrBlank(receiver))
                {
                    LOG.warn("receiver is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(content))
                {
                    LOG.warn("content is null or blank");
                    return;
                }
                String[] agentIds = receiver.split(";");
                
                result = OnlineAgentService.sendNote(workNo,agentIds,content);
                break;
                
            /****************************全量接口示例开始************************/
            //坐席登录
            case "LOGIN":
                if (StringUtils.isNullOrBlank(phonenum))
                {
                    LOG.warn("pnonenum is null or blank");
                    return;
                } 
                
                result = OnlineAgentService.login(workNo, password, phonenum,isAutoanswer,agenttype);
                
                Map<String, Object> loginRes = StringUtils.jsonToMap(result);
                if ("0".equals(loginRes.get("retcode")))
                {
                    if (GlobalObjects.COOKIE_MAP.containsKey(workNo))
                    {
                        GlobalObjects.COOKIE_MAP.remove(workNo);
                    }
                    HttpSession session = request.getSession();
                    String sessionId = session.getId();
                    GlobalObjects.COOKIE_MAP.put(workNo, sessionId);
                }
                break;
                
            //查询配置技能队列   
            case "SLEFSKILLS":
                result = OnlineAgentService.querySelfSkills(workNo);
                break;
                
            //查询指定坐席配置的技能队列
            case "WORKNOSKILLS":
                if (StringUtils.isNullOrBlank(qWorkNo))
                {
                    LOG.warn("qWorkNo is null or blank");
                    return;
                }
                result = OnlineAgentService.querySkillsByWorkNo(workNo,qWorkNo);
                break;
                
            //设置是否自应答
            case "AUTOANSWER":
                if (StringUtils.isNullOrBlank(isAuto))
                {
                    LOG.warn("isAuto is null or blank");
                    return;
                }
                result = OnlineAgentService.autoanswerSet(workNo,isAuto);
                break;
                
            //设置是否进入空闲态
            case "AUTOENTERIDLE":
                if (StringUtils.isNullOrBlank(autoIdleFlag))
                {
                    LOG.warn("workNo is null or blank");
                    return;
                }
                result = OnlineAgentService.autoEnterIdle(workNo,autoIdleFlag);
                break;
                
            //强制签出带原因码    
            case "LOGOUTWITHREASON":
                if (StringUtils.isNullOrBlank(logoutReason))
                {
                    LOG.warn("workNo is null or blank");
                    return;
                }
                result = OnlineAgentService.logoutWithReason(workNo,logoutReason);
                break;
                
            //获取当前座席的状态    
            case "QUERYAGENTSTATUS":
                result = OnlineAgentService.queryAgentStatus(workNo);
                break;
                
            /****************************全量接口示例结束************************/
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
            LOG.error("catch throwable at OnlineAgentServlet: ",throwable);
        }
    }

}
