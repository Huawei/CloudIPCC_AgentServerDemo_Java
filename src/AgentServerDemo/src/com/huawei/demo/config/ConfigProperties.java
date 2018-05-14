package com.huawei.demo.config;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: read configuration parameters</p>
 * <p>Description: </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017-10-10
 */
public final class ConfigProperties
{
	private static final Logger LOG = LoggerFactory.getLogger(ConfigProperties.class);
        
    /**
     * configuration parameters
     */
    private static Map<String, Properties> propsMap = new ConcurrentHashMap<String, Properties>();
    
    private ConfigProperties()
    {
        
    }
    
    /**
     * load config file
     * @return success or fail
     */
    public static boolean loadConfig()
    {
        Field[] configListFields = ConfigList.class.getFields();
        
        String filePath = getConfigFilePath();        
        
        try
        {
            for (Field field : configListFields)
            {
                /**
                 * file name
                 */
                String fileName;				
				fileName = String.valueOf(field.get(null));	
                File fileConf = new File(filePath + fileName);
                if (fileConf.exists())
                {
                    readFileProperties(fileConf);
                }
                else
                {
                    LOG.info("File:" + LogUtils.encodeForLog(fileConf.getAbsoluteFile())
                            + " not exist");
                    /**
                     * add an empty instantiated object if file not exist
                     */
                    propsMap.put(fileName, new Properties());
                }
                
            }
        }
        catch (IllegalArgumentException | IllegalAccessException e)
        {
            LOG.info("Load properties from config file has exception");
            return false;
        }

        return true;
    }
    
    /**
     * get config file path
     * @return file path
     */
    private static String getConfigFilePath()
    {
        /**
         * get classes dir
         */
    	ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
    	if (null == contextClassLoader) 
    	{
    		return StringUtils.EMPTY_STRING;
		}
    	URL url = contextClassLoader.getResource("");
    	if (null == url) 
        {
   			return StringUtils.EMPTY_STRING;
   		}
    	
        /**
         * get WEB-INF dir
         */
     
        
        String filePath = url.getPath().substring(0, url.getPath().lastIndexOf("/classes"));
        
        try
        {
            filePath = URLDecoder.decode(filePath, "UTF-8") + "/config/";
        }
        catch (UnsupportedEncodingException e)
        {
            filePath = StringUtils.EMPTY_STRING;
        }
        
        return filePath;
    }
    
    
    private static void readFileProperties(File file)
    {        
        InputStream inputFile = null;
        try
        {
            inputFile = new BufferedInputStream(new FileInputStream(
                    file.getAbsolutePath()));
            Properties props = new Properties();
            props.load(inputFile);
            propsMap.put(file.getName(), props);
        }
        catch ( IOException e)
        {
            LOG.error("Load config file failed.");
        }
        finally
        {
            closeFile(inputFile);
        }
    }
    
    /**
     * get config value
     * @param configFile
     * @param key
     * @return
     */
    public static String getKey(String configFile, String key)
    {
        if (propsMap.containsKey(configFile))
        {
            String result = propsMap.get(configFile).getProperty(key);
            if (result != null)
            {
                return result.trim();
            }
        }
        return "";
    }
    
    /**
     * set config value
     * @param configFile
     * @param key
     * @param value
     */
    public static void setKey(String configFile, String key, String value)
    {
        if (propsMap.containsKey(configFile))
        {
            if (value != null)
            {
                propsMap.get(configFile).setProperty(key, value);
            }
            else
            {
                propsMap.remove(key);
            }
        }
    }    
    
    public static Properties getProperties(String configFile)
    {
        if (propsMap.containsKey(configFile))
        {
            return propsMap.get(configFile);
        }
        return null;
    }    
    
    public static void setProperties(String configFile, Properties prop)
    {
        propsMap.put(configFile, prop);
    }
    
    /**
     * input stream close
     * @param inputFile
     */
    private static void closeFile(InputStream inputFile)
    {
        try
        {
            if (null != inputFile)
            {
                inputFile.close();
            }
        }
        catch (IOException e)
        {
            LOG.error("Close file failed.");
        }
    }
   
    public static void reLoadConfig(String configFile)
    {
        String filePath = getConfigFilePath() + configFile;
        
        File file = new File(filePath);
        if (!file.exists())
        {
            LOG.info("File " + LogUtils.encodeForLog(file.getAbsoluteFile()) + "is not exist");
            /**
             * add an empty instantiated object if file not exist
             */
            propsMap.put(configFile, new Properties());
            return;
        }
        
        InputStream inputFile = null;
        try
        {
            inputFile = new BufferedInputStream(new FileInputStream(file.getAbsolutePath()));
            Properties props = new Properties();
            props.load(inputFile);
            propsMap.put(configFile, props);
        }
        catch (IOException e)
        {           
            LOG.error("Load config file failed.");
        }
        finally
        {
            closeFile(inputFile);
        }
    }
}
