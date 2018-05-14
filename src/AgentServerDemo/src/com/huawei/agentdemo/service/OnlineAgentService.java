package com.huawei.agentdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.bean.ProcessMessageQueue;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class OnlineAgentService 
{
	/**
    * log
    */
	private static final Logger LOG = LoggerFactory.getLogger(OnlineAgentService.class);
    
    /**
     * send Notes
     * @param workNo
     * @param receiver
     * @param content
     * @return
     */
    public static String sendNote(String workNo,String[] agentIds,String content)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/sendnoteletex";
        
        Map<String, Object> noteParam = new HashMap<String, Object>();
        noteParam.put("agentIds",agentIds);
        noteParam.put("content",content);
        Map<String, Object> result = Request.post(workNo,url, noteParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent reset skill method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String resetSkills(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/resetskill/true";
        
        Map<String, Object> result = Request.post(workNo,url, null);
       
        return StringUtils.beanToJson(result);
    }
    
	 /**
     * agent force login method
     * request method : PUT
     * @param workNo
     * @param password
     * @param phonenum
     * @param isAutoanswer
     * @param agenttype
     * @return
     */
    public static String forceLogin(String workNo, String password, String phonenum,boolean isAutoanswer,String agenttype)
    {
    	String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/forcelogin";
    	String resp = StringUtils.EMPTY_STRING;
        
    	Map<String, Object> loginParam = new HashMap<String, Object>();
        loginParam.put("password",password);            // Indicates the password of an agent.
        loginParam.put("phonenum",phonenum);            // Indicates the phone number of an agent.
        loginParam.put("autoanswer",isAutoanswer);      // Indicates whether automatic answering is enabled. The default value is true.
        loginParam.put("autoenteridle",false);          // Indicates whether to enter the idle state automatically. The default value is true.
                                                        // if the value is false,the agent enter work state after login.
        loginParam.put("agenttype",agenttype);			// Indicates the type of an agent logged in.4: PC+phone agent  11: PC+phone video agent

        loginParam.put("status",4);                     // Indicates the status of an agent right after the agent is logged in.
                                                        // The default status is idle.4:idle 5:wrap-up
        loginParam.put("releasephone", true);           // Indicates whether an agent can receive a new call without hanging up when the last call 
        
        if (!ServiceUtil.isPullFromAgw())
        {        	

            loginParam.put("pushUrl", ServiceUtil.getPushURL());
        }
        
		Map<String, Object> result = Request.put(workNo, url, loginParam);
		resp = StringUtils.beanToJson(result);
		if ("0".equals(result.get("retcode")))
	    {
	    	if (!GlobalObjects.LOGINED_MAP.containsKey(workNo))
	    	{
	    		GlobalObjects.LOGINED_MAP.put(workNo, new ProcessMessageQueue());   // create a event queue for every logged in agent
	    	}
	    	if (ServiceUtil.isPullFromAgw())
	        {
	        	if (!GlobalObjects.EVENT_THREAD_MAP.containsKey(workNo))
		    	{
		    		GetEventThread thread = new GetEventThread(workNo);      // create a get event thread for every logged in agent
		    		thread.begin();
		    		GlobalObjects.EVENT_THREAD_MAP.put(workNo, thread);
		    	}
	        }
	        else
	        {
	        	if (!GlobalObjects.EVENT_HEART_MAP.containsKey(workNo))
				{
					HeartBeatThread thread = new HeartBeatThread(workNo);      // create a heat beat thread for every logged in agent
					thread.begin();
					GlobalObjects.EVENT_HEART_MAP.put(workNo, thread);
				}
	        }
	    	LOG.info(LogUtils.encodeForLog(workNo) + " forcelogin success");
	    }
	    else 
		{
	    	LOG.info(LogUtils.encodeForLog(workNo) + " forcelogin failed ---" + LogUtils.encodeForLog(resp));
    		ServiceUtil.clearResourse(workNo);
	    }
	    return resp;		
    }
    
    /**
     * agent logout method
     * request method : DELETE
     * @param workNo
     * @return
     */
    public static String logout(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/logout";
        String resp = StringUtils.EMPTY_STRING;
        
        Map<String, Object> result = Request.delete(workNo,url,null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        
        resp = StringUtils.beanToJson(result);
        
        if ("0".equals(result.get("retcode")))
        {
        	ServiceUtil.clearResourse(workNo);
            LOG.info(LogUtils.encodeForLog(workNo) + " logout success");
        }
        else 
        {
            LOG.info(LogUtils.encodeForLog(workNo) + " logout failed ---" + LogUtils.encodeForLog(resp));
        }
        return resp;
    }
    
    /**
     * agent forceLogout method
     * request method : DELETE
     * @param workNo
     * @return
     */
    public static String forceLogout(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/forcelogout";
        String resp = StringUtils.EMPTY_STRING;
        
        Map<String, Object> result = Request.delete(workNo,url,null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        
        resp = StringUtils.beanToJson(result);
        
        ServiceUtil.clearResourse(workNo);
       
        if ("0".equals(result.get("retcode")))
        {            
            LOG.info(LogUtils.encodeForLog(workNo) + " logout success");
        }
        else 
        {
            LOG.info(LogUtils.encodeForLog(workNo) + " logout failed ---" + LogUtils.encodeForLog(resp));
        }
        return resp;
    }
    
    /**
     * modify agent password
     * @param workNo
     * @param oldPassword
     * @param newPassword
     * @return
     */
    public static String modifyPwd(String workNo, String oldPassword, String newPassword)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/modifyaccountpwdex";

        Map<String, Object> modifyPwdParam = new HashMap<String, Object>();        
        modifyPwdParam.put("oldPassword",oldPassword);
        modifyPwdParam.put("newPassword",newPassword);

        Map<String, Object> result = Request.post(workNo,url, modifyPwdParam);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }

    /**
     * agent set ready method 
     * request method : POST
     * @param workNo
     * @return
     */
    public static String ready(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/sayfree";        
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent set busy method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String busy(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/saybusy";
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent enter working state method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String work(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/work";        
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
        
    }
    
    /**
     * agent quit working state method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String outWork(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/cancelwork";        
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent request for rest method
     * request method : POST
     * @param workNo
     * @param restTime
     * @param restReason
     * @return
     */
    public static String rest(String workNo,String restTime,String restReason)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/rest/" + restTime + "/" + restReason;
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * agent cancel rest method
     * request method : POST
     * @param workNo
     * @return
     */
    public static String cancelRest(String workNo)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/cancelrest";
        
        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    
    /**
     * publish Notice 
     * @param workNo
     * @param targettype
     * @param bulletindata
     * @param targetname
     * @return
     */
    public static String publishNotice(String workNo,String targettype,String bulletindata,String targetname)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/notifybulletin";
        Map<String, Object> noticeParam = new HashMap<String, Object>();
        noticeParam.put("targettype",targettype);
        noticeParam.put("bulletindata",bulletindata);
        noticeParam.put("targetname",targetname);
        Map<String, Object> result = Request.post(workNo,url, noticeParam);
        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    
   /********************************************全量接口示例**************************************************/

    
    
    /**
     * 坐席签入方法
     * 该接口实现通过座席的工号，密码登录座席的功能
     * @param workNo
     * @param password
     * @param phonenum
     * @param isAutoanswer
     * @param agenttype
     * @return
     */
    public static String login(String workNo, String password, String phonenum, boolean isAutoanswer, String agenttype)
    {
         
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo ;

        Map<String, Object> loginParam = new HashMap<String, Object>();        
        loginParam.put("password",password);
        loginParam.put("phonenum",phonenum);
        loginParam.put("autoanswer",isAutoanswer);
        loginParam.put("autoenteridle",true);
        loginParam.put("releasephone",true);
        loginParam.put("agenttype",agenttype);
        loginParam.put("status",4);
        loginParam.put("phonelinkage",false);
        loginParam.put("checkInWebm",true);
        loginParam.put("checkInMailm",false);
        loginParam.put("listenStatus",false);
        if (!ServiceUtil.isPullFromAgw())
        {           
            loginParam.put("pushUrl",ServiceUtil.getPushURL());
        }

        LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" received message:loginParam:"+LogUtils.encodeForLog(Request.beanToJson(loginParam)));
        Map<String, Object> result = Request.put(workNo,url, loginParam);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        String resp = StringUtils.beanToJson(result);
        if ("0".equals(result.get("retcode")))
        {
            if (!GlobalObjects.LOGINED_MAP.containsKey(workNo))
            {
                GlobalObjects.LOGINED_MAP.put(workNo, new ProcessMessageQueue());   // create a event queue for every logged in agent
            }
            if (ServiceUtil.isPullFromAgw())
            {
                if (!GlobalObjects.EVENT_THREAD_MAP.containsKey(workNo))
                {
                    GetEventThread thread = new GetEventThread(workNo);      // create a get event thread for every logged in agent
                    thread.begin();
                    GlobalObjects.EVENT_THREAD_MAP.put(workNo, thread);
                }
            }
            else
            {
                if (!GlobalObjects.EVENT_HEART_MAP.containsKey(workNo))
                {
                    HeartBeatThread thread = new HeartBeatThread(workNo);      // create a heat beat thread for every logged in agent
                    thread.begin();
                    GlobalObjects.EVENT_HEART_MAP.put(workNo, thread);
                }
            }
            LOG.info(LogUtils.encodeForLog(workNo) + " login success");
        }
        else 
        {
            LOG.info(LogUtils.encodeForLog(workNo) + " login failed ---" + LogUtils.encodeForLog(resp));
        }
        return resp;
    }
    
    /**
     * 查询配置技能队列
     * 座席登录后，查询自己拥有的的技能队列信息。
     * 
     * @param workNo
     * @return
     */
    public static String querySelfSkills(String workNo) 
    {    
         String url =ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/agentskills";
         Map<String,Object> result = Request.get(workNo,url);
         LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return result:" + LogUtils.encodeForLog(Request.beanToJson(result)));
         return StringUtils.beanToJson(result);
    }
    
    /**
     * 查询指定坐席配置的技能队列
     * 座席登录后，查询指定座席拥有的技能队列信息
     * 
     * @param agentid  坐席工号
     * @param workNo   待查询的坐席工号
     * @return
     */
    public static String querySkillsByWorkNo(String workNo, String qWorkNo) 
    {    
         String url =ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/agentskillsbyworkno/" + qWorkNo;
         Map<String,Object> result = Request.get(workNo,url);
         LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return result:" + LogUtils.encodeForLog(Request.beanToJson(result)));
         return StringUtils.beanToJson(result);
    }
    
    /**
     * 设置是否自应答
     * 座席设置是否自动应答
     * @param workNo 
     * @param isautoanswer 是否自动应答标志。true为自动应答，false为手动应答。
     * @return
     */
    public static String autoanswerSet(String workNo, String isautoanswer)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/autoanswer/" + isautoanswer;

        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * 设置是否进入空闲态
     * 座席设置释放通话后是否进入空闲态。
     * 
     * @param workNo
     * @param flag 是否进入空闲态标志位（true为自动进入空闲态，其他非true字符串为进入工作态 ，只能输入1-5位的字符串）
     * @return
     */
    public static String autoEnterIdle(String workNo, String autoIdleFlag)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/autoenteridle/" + autoIdleFlag;

        Map<String, Object> result = Request.post(workNo,url, null);
        LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * 强制签出带原因码
     * @param workNo
     * @param logoutReason 座席签出原因码(范围1-255),签出原因码非平台配置参数，在指定范围内可任意指定
     * @return
     */
    public static String logoutWithReason(String workNo, String logoutReason)
    {
        String url = ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/forcelogoutwithreason/" + logoutReason;
        String resp = StringUtils.EMPTY_STRING;
        
        Map<String, Object> result = Request.delete(workNo,url,null);
       LOG.debug("WorkNo = "+LogUtils.encodeForLog(workNo)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        resp = StringUtils.beanToJson(result);
        
        if ("0".equals(result.get("retcode")))
        {
            ServiceUtil.clearResourse(workNo);
            LOG.info(LogUtils.encodeForLog(workNo) + " forceLogoutWithReason success");
        }
        else 
        {
            LOG.info(LogUtils.encodeForLog(workNo) + " forceLogoutWithReason failed ---" + LogUtils.encodeForLog(resp));
        }
        return resp;
    }
    
    /**
     * 获取当前座席的状态
     * @param workNo
     * @return
     */
    public static String queryAgentStatus(String workNo) 
    {    
         String url =ServiceUtil.getPrefix() + "onlineagent/" + workNo + "/agentstatus";
         Map<String,Object> result = Request.get(workNo,url);
         LOG.debug("WorkNo = " + LogUtils.encodeForLog(workNo) + " return result:" + LogUtils.encodeForLog(Request.beanToJson(result)));
         return StringUtils.beanToJson(result);
    }
}
