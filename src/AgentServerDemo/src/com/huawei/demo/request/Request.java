package com.huawei.demo.request;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.OutputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.net.SocketException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.nio.file.attribute.AclEntry;
import java.nio.file.attribute.AclEntryPermission;
import java.nio.file.attribute.AclEntryType;
import java.nio.file.attribute.FileAttribute;
import java.nio.file.attribute.PosixFilePermission;
import java.nio.file.attribute.PosixFilePermissions;
import java.nio.file.attribute.UserPrincipal;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLHandshakeException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpRequest;
import org.apache.http.HttpStatus;
import org.apache.http.NoHttpResponseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.conn.ssl.X509HostnameVerifier;
import org.apache.http.entity.FileEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.util.FileUtil;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;
/**
 * 
 * <p>Title: </p>
 * <p>Description: http request method</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月13日
 */
public class Request {
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(Request.class);
    
	/*
	 * Max connections of connection pool,unit:millisecond
	 */
	private static final int MAXCONNECTION = 2000;
	/*
	 * Connections of every route,unit:millisecond
	 */
	private static final int MAXPERROUTE = 2000;
	/*
	 * Max request time of getting a connection from connection pool,unit:millisecond
	 */
	private static final int REQUESTTIMEOUT = 2000;
	/*
	 * Max time of a request,unit:millisecond
	 */
	private static final int CONNECTIMEOUT = 2000;
	/*
	 * Max time of waiting for response message,unit:millisecond
	 */
	private static final int SOCKETIMEOUT = 11*000;
	/*
	 * the chars to generate fileName 
	 */
	private static final String[] CHARS = new String[] { "a", "b", "c", "d", "e", "f",  
            "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",  
           "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",  
            "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",  
            "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",  
           "W", "X", "Y", "Z" }; 
	
	private static PoolingHttpClientConnectionManager connManager = null;
	
	private static CloseableHttpClient client = null;
	
	public static void init()
	{
		SSLContext sslContext;
		try {
			sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				
				@Override
				public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
					return true;
				}
			}).build();
		
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext
					, new X509HostnameVerifier(){
				public boolean verify(String arg0, SSLSession arg1) {
			        return true;
			    }
			    public void verify(String host, SSLSocket ssl)
			            throws IOException {
			    }
			    public void verify(String host, X509Certificate cert)
			            throws SSLException {
			    }
			    public void verify(String host, String[] cns,
			            String[] subjectAlts) throws SSLException {
			    }
			});
			
			Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
					.register("http", PlainConnectionSocketFactory.getSocketFactory())
					.register("https", sslsf)
					.build();
			
			connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
			connManager.setMaxTotal(MAXCONNECTION);
			connManager.setDefaultMaxPerRoute(MAXPERROUTE);
			
		} 
		catch (RuntimeException e) 
		{
            throw e;
		}
		catch (Exception e)
        {
            LOG.error("init connection pool failed \r\n {}: ", LogUtils.encodeForLog(e.getMessage()));
            return;
        }
		
		client = getConnection();
	}
	

    private static CloseableHttpClient getConnection()
    {
    	RequestConfig restConfig = RequestConfig.custom().setConnectionRequestTimeout(REQUESTTIMEOUT)
    			.setConnectTimeout(CONNECTIMEOUT)
    			.setSocketTimeout(SOCKETIMEOUT).build();
    	HttpRequestRetryHandler retryHandler = new HttpRequestRetryHandler()
        {
            
            
            public boolean retryRequest(IOException exception, int executionCount,
                    HttpContext context)
            {
                if (executionCount >= 3)
                {
                   return false; 
                }
                if (exception instanceof NoHttpResponseException) 
                {
                    return true;  
                } 
                if (exception instanceof InterruptedIOException) 
                {
                    return false;
                }
                if (exception instanceof SSLHandshakeException) 
                {
                    return false;  
                }  
                if (exception instanceof UnknownHostException) 
                {
                    return false;  
                }  
                if (exception instanceof ConnectTimeoutException) 
                {
                    return false;  
                }  
                if (exception instanceof SSLException) 
                {
                    return false;  
                }
                
                HttpClientContext clientContext = HttpClientContext.adapt(context);  
                HttpRequest request = clientContext.getRequest();  
                if (!(request instanceof HttpEntityEnclosingRequest)) 
                {  
                    return true;  
                }  
                return false;  
            }
        };
    	CloseableHttpClient httpClient = HttpClients.custom()
    			.setConnectionManager(connManager).setDefaultRequestConfig(restConfig).setRetryHandler(retryHandler).build();
    	return httpClient;
    }
    
	/**
     * Send http's GET request
     * @param url:the address of the request
     * @param headers:the field is used to set the header of http request
     * @return
     * @throws IOException 
     * @throws ClientProtocolException 
     */
    public static Map<String, Object> delete(String identityMark, String url, Map<String, Object> entityParams)
    {

    	CloseableHttpResponse response = null;
    	MyHttpDelete delete = null;
    	Map<String, Object> result = null;
    	try 
		{
    		url = Normalizer.normalize(url, Form.NFKC);
			delete = new MyHttpDelete(url);
			if (null != entityParams)
	    	{	    		
				String jsonString = beanToJson(entityParams);
				HttpEntity entity = new StringEntity(jsonString);
				delete.setEntity(entity);
	    	}
			setHeaders(identityMark, delete);	
			delete.setHeader("Content-Type", "application/json;charset=UTF-8");
			response = client.execute(delete);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
	    	{
			    HttpEntity entity = response.getEntity();
                if (null != entity)
                {
                    String entityContent = EntityUtils.toString(entity,"UTF-8");
                    result = StringUtils.jsonToMap(entityContent);                    
                }
                else
                {
                    result = StringUtils.jsonToMap(StringUtils.ENTITY_BLANK);
                }
                
                try 
                {
                    EntityUtils.consume(entity);
                } 
                catch (IOException e) 
                {
                    LOG.error("release entity failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
	    	}
		}
    	catch (UnsupportedEncodingException e)
    	{
    	    result = returnConnectError(e);
        } 
    	catch (ClientProtocolException e) 
    	{
    	   result =  returnConnectError(e);
        }
    	catch (IOException e) 
    	{
    	    result = returnConnectError(e);
        }
    	finally
		{
    		if (null != response)
    		{
				try
				{
					EntityUtils.consume(response.getEntity());
					response.close();
				} 
				catch (IOException e) 
				{
					LOG.error("release response failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
    		
		}
    	return result;
    	
    }
	
    /**
     * Send http's GET request
     * @param url:the address of the request
     * @param headers:the field is used to set the header of http request
     * @return
     * @throws IOException 
     * @throws ClientProtocolException 
     */
    public static Map<String, Object> get(String identityMark,String url)
    {
    	CloseableHttpResponse response = null;
    	HttpGet get = null;
    	Map<String, Object> result = null;
    	try 
		{
    		url = Normalizer.normalize(url, Form.NFKC);
			get = new HttpGet(url);
			
			setHeaders(identityMark,get);
            
			get.setHeader("Content-Type", "application/json;charset=UTF-8");
			response = client.execute(get);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
	    	{
			    HttpEntity entity = response.getEntity();
                if (null != entity)
                {
                    String entityContent = EntityUtils.toString(entity,"UTF-8");
                    result = StringUtils.jsonToMap(entityContent);                   
                }
                else
                {
                    result = StringUtils.jsonToMap(StringUtils.ENTITY_BLANK);
                }
                
                try 
                {
                    EntityUtils.consume(entity);
                } 
                catch (IOException e) 
                {
                    LOG.error("release entity failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
	    	}
		}
    	catch (SSLHandshakeException | SocketException | NoHttpResponseException e)
    	{
    	    result = StringUtils.jsonToMap(StringUtils.HAND_SHAKE_ERROR);
    	    LOG.error("request to server failed: \r\n {}",  LogUtils.encodeForLog(e.getMessage()));
    	}
    	catch (Exception e)
        {
    	    result = returnConnectError(e);
        }
    	finally
		{
    		if (null != response)
    		{
				try
				{
					EntityUtils.consume(response.getEntity());
					response.close();
				} 
				catch (IOException e) 
				{
					LOG.error("release response failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
		}
		
    	return result;
    }

    
    /**
     * Send http's POST request
     * @param url:the address of the request
     * @param entityParams:the paramters of entity
     * @param headers:the field is used to set the header of http request
     * @return
     */
    public static Map<String, Object> post(String identityMark,String url, Map<String, Object> entityParams)
    {
    	Map<String, Object> result = null;
    	HttpPost post = null;
    	CloseableHttpResponse response = null;
    	try 
    	{
    		url = Normalizer.normalize(url, Form.NFKC);
    		post = new HttpPost(url);
	    	if (null != entityParams)
	    	{	    		
				String jsonString = beanToJson(entityParams);
				HttpEntity entity = new StringEntity(jsonString);
				post.setEntity(entity);
	    	}
	    	
	    	if (!url.contains("login"))
            {
	    	    setHeaders(identityMark,post);
            }
            
	    	post.setHeader("Content-Type", "application/json;charset=UTF-8");
	    	response = client.execute(post);
	    	if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
	    	{
	    	    HttpEntity entity = response.getEntity();
                if (null != entity)
                {
                    String entityContent = EntityUtils.toString(entity,"UTF-8");
                    result = StringUtils.jsonToMap(entityContent);
                }
                else
                {
                    result = StringUtils.jsonToMap(StringUtils.ENTITY_BLANK);
                }
                if (url.contains("login"))
                {
                    dealGuid(identityMark,response);
                    dealCookie(identityMark,response);
                }
                
                try 
                {
                    EntityUtils.consume(entity);
                } 
                catch (IOException e) 
                {
                    LOG.error("release entity failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
	    	}
    	}
    	catch (UnsupportedEncodingException e) 
    	{
            result = returnConnectError(e);
        } catch (ClientProtocolException e)
    	{
            result = returnConnectError(e);
        }
    	catch (IOException e) 
    	{
    	    result =  returnConnectError(e);
        }
    	finally
    	{
    		if (null != response)
    		{
				try
				{
					EntityUtils.consume(response.getEntity());
					response.close();
				} 
				catch (IOException e) 
				{
					LOG.error("release response failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
    	}
    	return result;
    }
    
    /**
     * Send http's PUT request
     * @param url:the address of the request
     * @param entityParams:the paramters of entity 
     * @param headers:the field is used to set the header of http request
     * @return
     */
    public static Map<String, Object> put(String identityMark,String url, Map<String, Object> entityParams)
    {
    	CloseableHttpResponse response = null;
    	HttpPut put = null;
    	Map<String, Object> result = null;
    	try 
    	{
    		url = Normalizer.normalize(url, Form.NFKC);
	    	put = new HttpPut(url);
	    	if (null != entityParams) {
	    		String jsonString = beanToJson(entityParams);
                HttpEntity entity = new StringEntity(jsonString);
                put.setEntity(entity);
            }
	    	
	    	if (!url.contains("forcelogin"))
	    	{
	    	    setHeaders(identityMark,put);
	    	}
				    	
	    	put.setHeader("Content-Type", "application/json;charset=UTF-8");
	    	response = client.execute(put);	    	
	    	if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
	    	{
	    	    HttpEntity entity = response.getEntity();
	    	    if (null != entity)
	    	    {
	    	        String entityContent = EntityUtils.toString(entity,"UTF-8");
	    	        result = StringUtils.jsonToMap(entityContent);
	    	    }
	    	    else
	    	    {
	    	        result = StringUtils.jsonToMap(StringUtils.ENTITY_BLANK);
	    	    }
                if (url.contains("forcelogin"))
                {
                    dealGuid(identityMark, response);
                    dealCookie(identityMark, response);
                }
                
                try 
    	        {
    	            EntityUtils.consume(entity);
    	        } 
    	        catch (IOException e) 
    	        {
    	            LOG.error("release entity failed \r\n{} ", LogUtils.encodeForLog(e.getMessage()));
    	        }
	    	}
    	}
    	catch (UnsupportedEncodingException e)
    	{
    	    result = returnConnectError(e);
        } 
    	catch (ClientProtocolException e)
    	{
    	    result =  returnConnectError(e);
        } 
    	catch (IOException e)
    	{
    	    result = returnConnectError(e);
        }
    	finally
    	{
    		if (null != response)
    		{
				try
				{
					EntityUtils.consume(response.getEntity());
					response.close();
				} 
				catch (IOException e) 
				{
					LOG.error("release response failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
    	}
    	return result;
    }    
    
    /**
     * 
     * @param url:the address of the request
     * @param mediaData:file byte
     * @param fileName
     * @return
     */
    public static Map<String,Object> postMedia(String identityMark,String url,byte[] mediaData,String fileName)
    {
       
    	CloseableHttpResponse response = null;
    	HttpPost post = null;
    	Map<String, Object> result = null;
    	String boundary = "Boundary---" + new Date().getTime();
    	OutputStream os = null;
        File tempFile = null;
        
        try 
        {
            String  tempFileName=getStringRandom()+fileName.substring(fileName.lastIndexOf("."));
            tempFile = new File(tempFileName);
            os = new FileOutputStream(tempFile);
			os.write(("--" + boundary + "\r\n").getBytes("utf-8"));
            os.write(("Content-Disposition: form-data; name=\"media\"; filename=\"" + fileName + "\"\r\n").getBytes("utf-8"));
            os.write("Content-Type: application/octet-stream\r\n\r\n".getBytes("utf-8"));
            os.write(mediaData);
            os.write(("\r\n--" + boundary + "--\r\n").getBytes("utf-8"));
            url = Normalizer.normalize(url, Form.NFKC);
            post = new HttpPost(url);
            FileEntity reqEntity = new FileEntity(tempFile);
            reqEntity.setContentEncoding("UTF-8");
            reqEntity.setContentType("multipart/form-data;charset=UTF-8; boundary=" + boundary);
            post.setEntity(reqEntity);  
            
            setHeaders(identityMark,post);
            response = client.execute(post);
            if (HttpStatus.SC_OK == response.getStatusLine().getStatusCode())
        	{
                HttpEntity entity = response.getEntity();
                if (null != entity)
                {
                    String entityContent = EntityUtils.toString(entity,"UTF-8");
                    result = StringUtils.jsonToMap(entityContent);
                }
                else
                {
                    result = StringUtils.jsonToMap(StringUtils.ENTITY_BLANK);
                }
                try 
                {
                    EntityUtils.consume(entity);
                } 
                catch (IOException e) 
                {
                    LOG.error("release entity failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
        	}            
		} 
        catch (IOException e) 
        {
            LOG.error("request to server failed: " + LogUtils.encodeForLog(e.getMessage()));
		}
        finally
        {
        	if (null != response)
    		{
				try
				{
					EntityUtils.consume(response.getEntity());
					response.close();
				} 
				catch (IOException e) 
				{
					LOG.error("release response failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
        	
            if (null != os)
            {
                try
                {
                    os.close();
                }
                catch (IOException e)
                {
                    LOG.error("Close OutputStream failed : \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
            }
            if (null != tempFile)
            {
                if (!tempFile.delete())
                {
                    LOG.warn("Clean tempFile failed, The path is \r\n {}", LogUtils.encodeForLog(tempFile.getAbsolutePath()));
                }
            }
        }
    	return result;
    }
    
    
  
    /**
     * 
     * @param url:the address of the request
     * @param suffix
     * @return
     */
    public static String getMedia(String identityMark, String url, String suffix)
    {
        CloseableHttpResponse response = null;
        HttpGet get = null;
        InputStream in = null;
        OutputStream out = null;
        byte[] bytes = null;
        StringBuffer filePathSB = new StringBuffer();
        filePathSB.append(getProjectPath()).append("file/");
        filePathSB.append(identityMark);
        String fileName = getStringRandom() + suffix;
        try 
        {
        	url = Normalizer.normalize(url, Form.NFKC);
            get = new HttpGet(url);
            setHeaders(identityMark,get);
            response = client.execute(get);
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK)
            {
                HttpEntity entity = response.getEntity();
                if (entity != null)
                {
                    in = entity.getContent();
                    String dirPath = filePathSB.toString();
                    if (!FileUtil.isSafePath(dirPath)) 
                    {
                        LOG.error("filePath is invalid . ");
                        return "";
                    }
                    dirPath = FileUtil.checkFile(dirPath);
                    File file = new File(dirPath);
                    if (!file.exists())
                    {
                        boolean mkdirs = file.mkdirs();
                        if (!mkdirs)
                        {
                        	 LOG.error("make directory failed . ");
                             return "";
                        }
                    }
                    
                    String filePath = filePathSB.toString()+"/"+fileName;
                    if (!FileUtil.isSafePath(filePath)) 
                    {
                        LOG.error("filePath is invalid . ");
                        return "";
                    }
                    filePath = FileUtil.checkFile(filePath);
                    out = new FileOutputStream(new File(filePath));
                    byte[] buffer = new byte[2048];
                    int readLength = 0;
                    while ((readLength = in.read(buffer)) > 0)
                    {
                        bytes = new byte[readLength];
                        System.arraycopy(buffer, 0, bytes, 0, readLength);
                        out.write(bytes);
                    }
                }
                try
                {
                    EntityUtils.consume(entity);
                }
                catch (IOException e) 
                {
                    LOG.error("release entity failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
            }
        }
        catch (FileNotFoundException e) 
        {
            LOG.error("request to server failed: \r\n {}" ,LogUtils.encodeForLog(e.getMessage()));
            return "";
        } 
        catch (IOException e) {
            LOG.error("request to server failed: \r\n {}" ,LogUtils.encodeForLog(e.getMessage()));
            return "";
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
            if (null != response)
            {
                try 
                {
                    EntityUtils.consume(response.getEntity());
                    response.close();
                } 
                catch (IOException e) 
                {
                    LOG.error("release connection failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
            }
            
            if (null != out)
            {
                try
            	{
			        out.close();
			    }
            	catch (IOException e)
            	{
            		 LOG.error("release outputstream failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
				}
			}
        }
        return fileName;
    }    
    
    
    /**
     * get guid for authentication
     * @param identityMark
     * @param response
     */
	private static void dealGuid(String identityMark,CloseableHttpResponse response) 
	{
		Header[] allHeaders = response.getAllHeaders();
		if (allHeaders == null || allHeaders.length == 0)
		{
		    return;
		}
		for (Header header : allHeaders)
        {
            if (!header.getName().equals("Set-GUID"))
            {
                continue;
            }   
            
            String setGuid = header.getValue();
            if (setGuid != null)
            {
                GlobalObjects.GUID_MAP.put(identityMark, setGuid.replace("JSESSIONID=", ""));
            }
            break;
        }
	}
	
	private static void dealCookie(String identityMark,CloseableHttpResponse response) 
	{
		Header[] allHeaders = response.getAllHeaders();		
		
		if (allHeaders == null || allHeaders.length == 0)
		{
		    return;
		}
		
		StringBuffer list = new StringBuffer();
		String setCookie;
		for (Header header : allHeaders)
        {
            if (!header.getName().equals("Set-Cookie"))
            {
                continue;
            }   
            
            setCookie = header.getValue();
            if (setCookie != null)
            {
                list.append(setCookie).append(";");
            }
        }
		GlobalObjects.GATEWAY_COOKIE_MAP.put(identityMark, list.toString());
	}
	
	/**
	 * 
	 * @return project root path
	 */
	public static String getProjectPath()
    {
        String p1;
        String rootPath = StringUtils.EMPTY_STRING;
        try
        {
            ClassLoader classLoader = Request.class.getClassLoader();
            URL urlResource = null;
            if (null != classLoader)
            {
                urlResource = classLoader.getResource("");
            }
            if (null != urlResource)
            {
                p1 = urlResource.toURI().getPath();
                rootPath = p1.substring(0, p1.indexOf("WEB-INF"));
            }
        }
        catch (URISyntaxException e)
        {
            LOG.error("get project root path failed, \r\n {}", LogUtils.encodeForLog(e.getMessage()));
            return "";
        }
        return rootPath;
    }
	
	/**
	 * 
	 * @return random string
	 */
	public static String getStringRandom()
	{  
	    StringBuffer shortBuffer = new StringBuffer();  
	    String uuid = UUID.randomUUID().toString().replace("-", "");  
	    for (int i = 0; i < 8; i++) 
	    {  
	       String str = uuid.substring(i * 4, i * 4 + 4);  
	       int x = Integer.parseInt(str, 16);  
	       shortBuffer.append(CHARS[x % 0x3E]);  
	    }  
	    return shortBuffer.toString();  
	}  
	
    /**
     * Change object to json-string
     * @param object
     * @return
     * @throws IOException
     */
    public static String beanToJson(Object object)
    {
        ObjectMapper mapper = new ObjectMapper();
        StringWriter writer = new StringWriter();
        JsonGenerator gen = null;
        String json = null;
        try {
            gen = new JsonFactory().createJsonGenerator(writer);
            mapper.writeValue(gen, object);
            json = writer.toString();
            writer.close();
        } catch (IOException e) {
            LOG.error("change object to json String failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
        } 
        finally
        {
            if (null != gen)
            {
                try
                {
                    gen.close();
                }
                catch (IOException e)
                {
                    LOG.error("change object to json String failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
            }
            try
            {
                writer.close();
            }
            catch (IOException e)
            {
                LOG.error("change object to json String failed \r\n {}", LogUtils.encodeForLog(e.getMessage()));
            }
        }
        return json;
    }
    
    /**
     * header set mothed abstract 
     * 
     * @param identityMark
     * @param httpMethod
     */
    private static void setHeaders(String identityMark, HttpRequestBase httpMethod)
    {
        if (!StringUtils.isNullOrBlank(identityMark) && GlobalObjects.GUID_MAP.containsKey(identityMark))
        {
            String guid = GlobalObjects.GUID_MAP.get(identityMark);
            guid = checkHeader(guid);
            httpMethod.setHeader("guid", guid);
        }
        if (!StringUtils.isNullOrBlank(identityMark) && GlobalObjects.GATEWAY_COOKIE_MAP.containsKey(identityMark))
        {
            String cookie = GlobalObjects.GATEWAY_COOKIE_MAP.get(identityMark);
            cookie = checkHeader(cookie);
            httpMethod.setHeader("Cookie", cookie);
        }
    }
  
    
  //返回ConnectotError信息 
    private static HashMap<String, Object>  returnConnectError(Exception e)
    {
        LOG.error("request to server failed: \r\n {}", LogUtils.encodeForLog(e.getMessage()));
        String  returnString = StringUtils.CONNECT_ERROR;
        return StringUtils.jsonToMap(returnString);
    }
    
    
    //不能包含 \r \n
    public static String checkHeader (String header)
    {
       header = Normalizer.normalize(header, Form.NFKC);
       String replaceAll = header.replaceAll("\r", "")
             .replaceAll("\n", "")
             .replaceAll(":", "")
             .replaceAll("=", "");
       return replaceAll;
    }
  

}