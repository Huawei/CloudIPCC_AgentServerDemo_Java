package com.huawei.demo.util;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * <p>Title: String Processing Tools</p>
 * <p>Description: String Processing Tools</p>
 * <pre>  </pre>
 * <p>Copyright: Copyright (c) 2005</p>
 * <p>Company: Huawei Technologies Co.</p>
 * @version V1.0 2014年9月2日
 * @since
 */
public class StringUtils
{
	
	public static final String EMPTY_STRING = "";
	
	public static final String CONNECT_ERROR = "{\"message\":\"request to server failed\", \"retcode\":\"NETWORKERROR\"}";
	
	public static final String HAND_SHAKE_ERROR = "{\"message\":\"server refuse\", \"retcode\":\"HANDSHAKEERROR\"}";
	
	public static final String SOCKET_TIMEOUT = "{\"message\":\"socket time out\", \"retcode\":\"SOCKETTIMEOUT\"}";
	
	public static final String ENTITY_BLANK = "{\"message\":\"entity is null\", \"retcode\":\"ENTITYBLANK\"}";
	
	public static final String SUCCESS = "0";
    
    public static final String NETWORKERROR = "NETWORKERROR";
    
    public static final String AGENTNOTLOG = "100-006";
    
    public static final String SOCKETTIMEOUT = "SOCKETTIMEOUT";
	
    public static final String HANDSHAKEERROR = "HANDSHAKEERROR";
    
    private static final Logger LOG = LoggerFactory.getLogger(StringUtils.class);
    /**
     * Determine whether the string is null or empty string (no spaces).
     * @param str String input
     * @return true/false
     */
    public static boolean isNullOrEmpty(String str)
    {
        return str == null || str.isEmpty();
    }
    
    /**
     * Determine whether the string is null or empty string (including spaces).
     * @param str String Input
     * @return true/false
     */
    public static boolean isNullOrBlank(String str)
    {
        return str == null || str.trim().isEmpty();
    }
    
    /**
     * json to map method
     * @param json
     * @return map
     */
    @SuppressWarnings("unchecked")
	public static HashMap<String, Object> jsonToMap(String json)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        HashMap<String, Object> result;
        try
        {
            result = objectMapper.readValue(json, HashMap.class);
            return result;
        }
        catch (JsonParseException e)
        {
            LOG.error("catch JsonParseException");
            return null;
        }
        catch (JsonMappingException e)
        {
            LOG.error("catch JsonMappingException");
            return null;
        }
        catch (IOException e)
        {
            LOG.error("catch IOException");
            return null;
        }
    }
    
    
    /**
     * Object to json
     * @param object object
     * @return json Json String
     * @throws IOException 
     */
    public static String beanToJson(Object object)
    {
        ObjectMapper mapper = new ObjectMapper();
        StringWriter writer = new StringWriter();
        JsonGenerator gen = null;
        String json = StringUtils.EMPTY_STRING;
        try 
        {
            gen = new JsonFactory().createJsonGenerator(writer);
        
            mapper.writeValue(gen, object);
            json = writer.toString();
        } 
        catch (IOException e) 
        {
            LOG.error("object to json string failed");
        }
        finally
        {
            if(gen != null)
            {
                try 
                {
                    gen.close();
                } 
                catch (IOException e) 
                {
                    LOG.error("close Json generator failed");
                }
            }
            try {
                writer.close();
            } catch (IOException e) {
                LOG.error("close StringWriter failed");
            }
            
        }
        return json;
    }
    
}
