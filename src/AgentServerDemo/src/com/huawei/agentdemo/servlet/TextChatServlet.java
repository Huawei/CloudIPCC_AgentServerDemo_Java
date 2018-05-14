package com.huawei.agentdemo.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.agentdemo.service.TextChatService;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.FileUtil;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * <p>Title: text chat interface servlet </p>
 * <p>Description: text chat interface servlet </p>
 */
public class TextChatServlet extends HttpServlet
{
    private static final long serialVersionUID = 1L;

    private static final Logger LOG = LoggerFactory.getLogger(TextChatServlet.class);
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TextChatServlet()
    {
        super();
    }

    /**
     * @throws UnsupportedEncodingException 
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)  
    {
        try
        {
            String filePath = request.getParameter("filePath");
            String identifyMark = request.getParameter("identityMark");
            if (null == filePath || "".equals(filePath)) 
            {
                LOG.error("filePath is null or empity.");
                return;
            }
            filePath = Request.getProjectPath()+"/"+"file"+"/"+identifyMark+"/"+filePath;
            String prefix = Request.getProjectPath() + "/file";
            if (!FileUtil.isSafePath(filePath)&&filePath.startsWith(prefix)) 
            {
                LOG.info("filePath is invalid.");
                return;
            }
            filePath = FileUtil.checkFile(filePath);
            File file = new File(filePath);
                
            try
            {
                file = file.getCanonicalFile();
            }
            catch (IOException e)
            {
                LOG.error("IOException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                return;
            }
            if (file.exists())
            {
                FileInputStream in = null;
                ServletOutputStream out = null;
                try
                {
                    in = new FileInputStream(file);
                    response.addHeader("Cache-Control", "public");
                    response.addHeader("Pragma", "public");
                    String filename = java.net.URLEncoder.encode(file.getName(),"utf-8");
                    response.addHeader("Content-Disposition","attachment;filename=" + filename);
                    out = response.getOutputStream();
                    byte[] bt = new byte[1024];
                    int count;
                    while ((count = in.read(bt)) > 0)
                    {
                        out.write(bt, 0, count);
                    }
                }
                catch(FileNotFoundException e)
                {
                    LOG.error("FileNotFoundException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
                catch(UnsupportedEncodingException e)
                {
                    LOG.error("UnsupportedEncodingException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
                catch(IOException e)
                {
                    LOG.error("IOException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
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
                            LOG.error("Close ServletOutputStream error");
                        }
                    }
                    if (null != in)
                    {
                        try
                        {
                            in.close();
                        }
                        catch(Exception e)
                        {
                            LOG.error("Close PrintWriter error");
                        }
                    }
                }
            }
        }
        catch(Throwable throwable)
        {
            LOG.error("catch throwable at TextChatServlet: ",throwable);
        }
    	
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
            String callId = request.getParameter("callId"); 
            String content = request.getParameter("content"); 
            String called = request.getParameter("called");
            String addresstype = request.getParameter("addresstype");
            String destaddr = request.getParameter("destaddr");
            String mode = request.getParameter("mode");
            String filePath = request.getParameter("filePath");
            
            String skillId = request.getParameter("skillId");
            String chatId = request.getParameter("chatId");
            String chatReceiver = request.getParameter("chatReceiver");
            String jauIP = request.getParameter("jauIP");
            String jauPort = request.getParameter("jauPort");
            
            
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
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    result = TextChatService.textAnswer(workNo, callId);
                    break;
                    
                case "REJECT":
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    result = TextChatService.textReject(workNo, callId);
                    break;
                    
                case "RELEASE":
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    result = TextChatService.textDrop(workNo, callId);
                    break;
                    
                case "SENDMESSAGE":                
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(content))
                    {
                        LOG.warn("content is null or blank");
                        return;
                    }
                    result = TextChatService.textSendmessage(workNo, callId, content);
                    break;
               
                case "CALLINNER":
                    if (StringUtils.isNullOrBlank(called))
                    {
                        LOG.warn("called is null or blank");
                        return;
                    }
                    result = TextChatService.textCallinner(workNo,called);
                    break;
                    
                case "TRANSFER":
                    if (StringUtils.isNullOrBlank(addresstype))
                    {
                        LOG.warn("addresstype is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(destaddr))
                    {
                        LOG.warn("destaddr is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    if (StringUtils.isNullOrBlank(mode))
                    {
                        LOG.warn("mode is null or blank");
                        return;
                    }
                    result = TextChatService.textTransfer(workNo,addresstype,destaddr,callId,mode);
                    break;
                    
                case "FILEUPLOAD":
                    if (StringUtils.isNullOrBlank(callId))
                    {
                        LOG.warn("callId is null or blank");
                        return;
                    }
                    ServletRequestContext requestContext = new ServletRequestContext(request);
                    InputStream is = null;
                    byte[] mediaData = null;
                    FileItem item = null;
                    try {
                        DiskFileItemFactory factory = new DiskFileItemFactory();
                        ServletFileUpload fileUpload = new ServletFileUpload(factory);          
                        List<FileItem> items = fileUpload.parseRequest(requestContext);
                        if (items.size() != 1)
                        {
                            result = "file upload failed, because FileItem is over one.";
                            break;
                        }
                        item = items.get(0);
                        if (item.isFormField())
                        {
                            result = "FileItem is form field.";
                            break;
                        }
                        
                        String name = item.getName();
                        
                        is = item.getInputStream();
                        mediaData = FileUtil.inputStreamToByte(is);
                        if (null != mediaData)
                        {
                            result = TextChatService.uploadFile(workNo, callId,mediaData,name);
                        }
                        else
                        {
                            result = "input stream to byte failed";
                        }
                    } 
                    catch (FileUploadException e) 
                    {
                        LOG.error("catch FileUploadException");
                    }
                    catch (IOException e)
                    {
                        LOG.error("catch IOException");
                    }
                    finally
                    {
                        if (null != is)
                        {
                            try
                            {
                                is.close();
                            }
                            catch (IOException e)
                            {
                                LOG.error("close inputstream failed");
                            }
                        }
                        if (null != item)
                        {
                            item.delete();
                        }
                    }
                    break;
                    
                case "FILEDOWNLOAD":
                    if (StringUtils.isNullOrBlank(filePath))
                    {
                        LOG.warn("filePath is null or blank");
                        return;
                    }                
                    result = TextChatService.downloadFile(workNo, filePath);                
                    if (StringUtils.isNullOrBlank(result))
                    {
                        return;
                    }
                    break;
                    
                    
                    /****************************全量接口示例开始************************/
                    //无呼叫发送内容给用户
                case "DISCONNECT":
                    if (StringUtils.isNullOrBlank(skillId))
                    {
                        LOG.warn("skillId is null or blank");
                        return;
                    } 
                    if (StringUtils.isNullOrBlank(chatId))
                    {
                        LOG.warn("chatId is null or blank");
                        return;
                    } 
                    if (StringUtils.isNullOrBlank(chatReceiver))
                    {
                        LOG.warn("chatReceiver is null or blank");
                        return;
                    } 
                    if (StringUtils.isNullOrBlank(content))
                    {
                        LOG.warn("content is null or blank");
                        return;
                    } 
                    if (StringUtils.isNullOrBlank(jauIP))
                    {
                        LOG.warn("jauIP is null or blank");
                        return;
                    } 
                    if (StringUtils.isNullOrBlank(jauPort))
                    {
                        LOG.warn("jauPort is null or blank");
                        return;
                    } 
                    result = TextChatService.sendMessageWithoutCall(workNo, skillId, chatId, 
                            chatReceiver, content, jauIP, jauPort);
                    break;
                    
                    
                    
                    
                    
                    
                    /****************************全量接口示例结束************************/
                default:
                    break;
            }
            PrintWriter out = null;
            try 
            {
                out = response.getWriter();
                out.println(encodeHtml(result));
               // out.println(result);
            } 
            catch (IOException e)
            {
                LOG.error("catch IOException");
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
            LOG.error("catch throwable at TextChatServlet: ",throwable);
        }
    }
    
    
    private String encodeHtml(String result) 
    {  
           String normalize = Normalizer.normalize(result, Form.NFKC);
           return normalize;
     }  
 

    
}
