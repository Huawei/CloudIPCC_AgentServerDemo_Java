var global_cloudIPCC_SDK;
var global_userPhoneNumber;
var global_tupDeamonIsOk;
var global_isCanReConnectToDeamon = true;
var global_isInitTupLogin = false;
var global_isInitTupCall = false;
var global_TupDeamonReadyTime;

function onTupDeamonReady() {
    console.info(new Date());
    console.info(new Date() + "TUP Deamon is Ready");
    global_tupDeamonIsOk = true;
    global_isCanReConnectToDeamon = false;
    setTimeout(function(){
    	//做一个保护，防止出现TupDeamon启动了，而没有收到serviceStartUp导致不连接TupCall和TupLogin
    	if (!global_isInitTupLogin && !global_isInitTupCall)
		{
    		console.error(new Date() + "Call doServiceStartUp");
    		global_cloudIPCC_SDK.tupDeamon.doServiceStartUp();
		}
    }, 4000);
}


function onTupDeamonClose() {
	
	if (global_isCanReConnectToDeamon)
	{
		console.error(new Date() + "TUP Deamon Connect Failed, reConnect to http");
		writeLog('TUP Deamon Connect Failed, reConnect to http');
		global_isCanReConnectToDeamon = false;
		global_cloudIPCC_SDK = new CloudIPCC_SDK({
			onTupDeamonReady: onTupDeamonReady,
			onTupDeamonClose: onTupDeamonClose,
			serviceStartUp: serviceStartUp,
			serviceShutDown: serviceShutDown,
			onTupLoginReady: onTupLoginReady,
			onTupLoginClose: onTupLoginClose,
			onTupCallReady: onTupCallReady,
			onTupCallClose: onTupCallClose,
			onVersionInfoNotify : onVersionInfoNotify,
			isHttp : true
		});
		return;
	}
	global_tupDeamonIsOk = false;
    console.error(new Date() + "TUP Deamon is Closed,please restart it");
    writeLog('TUP Deamon is Closed,please restart it');
   
}


function serviceStartUp() {
    console.info(new Date() + "TUP Service StartUp");
    writeLog('TUP Service StartUp'); 
}

function serviceShutDown() {
    console.error(new Date() + "TUP Service is shutdown,please restart it");
    writeLog('TUP Service is shutdown,please restart it'); 
}


/**
 * TupCall的连接断开了
 */
function onTupCallClose() {
    console.error(new Date() + "onTupCallClose");
}


function onTupCallReady() {
    console.info(new Date() + "onTupCallReady");
    global_isInitTupCall = true;
    if (global_isInitTupCall && global_isInitTupLogin)
    {
    	initTupCall();
    }
}



function initTup() {
	global_cloudIPCC_SDK = new CloudIPCC_SDK({
		onTupDeamonReady: onTupDeamonReady,
		onTupDeamonClose: onTupDeamonClose,
		serviceStartUp: serviceStartUp,
		serviceShutDown: serviceShutDown,
		onTupLoginReady: onTupLoginReady,
		onTupLoginClose: onTupLoginClose,
		onTupCallReady: onTupCallReady,
		onTupCallClose: onTupCallClose,
		onVersionInfoNotify : onVersionInfoNotify
	});
}

var h5PhoneCall_version = "TUP V600R006C10B010";

function onVersionInfoNotify(data)
{
	if(h5PhoneCall_version != data) {
		$("#home_update").css("display", "inline");
	}
	console.info("version is");
	console.info(data);
}

function onTupLoginReady() {
    console.info(new Date() + "onTupLoginReady");
    global_isInitTupLogin = true;
    if (global_isInitTupCall && global_isInitTupLogin)
    {
    	initTupCall();
    }
}


function onTupLoginClose() {
    console.info(new Date() + "onTupLoginClose");
}

function initTupCall() {
	if (null == global_cloudIPCC_SDK.tupCall)
	{
		console.error(new Date() + "TUP Service startfailed");
		return;
	}
    global_cloudIPCC_SDK.tupCall.setBasicCallEvent({
        onCallIncoming: onCallIncoming,
        onAudioDeviceChanged: onAudioDeviceChanged
    });
    startLog();
    getLocalIp();
 
}



var currentMicIndex = 0;
function onAudioDeviceChanged(data) {
	console.info(data);
    if (data.param.input_array && data.param.input_num > 1) {
    	var defaultInput = data.param.input_array[0];
    	var currentIndex = 0;
    	var sameNameDevice = 0;
    	for (var i = 1; i < data.param.input_num; i++) {
    		if (defaultInput.name == ("default: " + data.param.input_array[i].name)) {
    			currentIndex = data.param.input_array[i].index;
    			sameNameDevice ++;
    		}
    	}
    	if (sameNameDevice == 1)
    	{
    		if (currentMicIndex == 0)
    		{
    			global_cloudIPCC_SDK.tupCall.setMicIndex(currentIndex);
    			console.info("set mic. The Index is " + currentIndex);
    			currentMicIndex = 1;
    		}
    		else 
    		{
    			global_cloudIPCC_SDK.tupCall.setMicIndex(0);
    			console.info("set mic. The Index is " + 0);
    			currentMicIndex = 0;
    		}
    	}
    }
    
    if (data.param.output_array && data.param.output_num > 1) {
    	var defaultInput = data.param.output_array[0];
    	var currentIndex = 0;
    	var sameNameDevice = 0;
    	for (var i = 1; i < data.param.output_num; i++) {
    		if (defaultInput.name == ("default: " + data.param.output_array[i].name)) {
    			currentIndex = data.param.output_array[i].index;
    			sameNameDevice ++;
    		}
    	}
    	if (sameNameDevice == 1) {
    		global_cloudIPCC_SDK.tupCall.setSpeakIndex(currentIndex);
    		console.info("set speak. The Index is " + currentIndex);
    	}
    }
    
}



function startLog() {
    global_cloudIPCC_SDK.tupCall.logStart(
        3, 10240, 5, "../../tuplog", { response: logStartResponse });
}

function logStartResponse(data) {
    if (data.result == 0) {
        console.info("logStart Success");
    } else {
        console.error("logStart Failed");
        console.error(data);
    }
}

/**
 * 获取本地IP
 */
function getLocalIp() {
    global_cloudIPCC_SDK.tupLogin.setGetBestLocalIp(global_SipServerIP.split("|")[0], {
        response: getLocalIpResponse
    });
}

function getLocalIpResponse(data) {
    console.info(data);
    if (data.result == 0) {
        console.info("GetLocalIp success");
    } else {
        console.error("GetLocalIp failed");
    }
    sipBasicCfg(data.local_ip);
    
}

function sipBasicCfg(local_ip) {
	var localIP = local_ip;
	if (localIP == undefined)
	{
		localIP = '127.0.0.1';
	}
    global_cloudIPCC_SDK.tupCall.config({
        sip: {
            user_type: 0,      
            tls_anonymous_enable: 1,   
            trans_mode: 0   
        },
        call: {
            call_ipcall_enable: 0,
            sip_keepalive_time : 300 // UDP老化时长
        },
        account: {
            account_pwd_type: 0
        },
        network: {
            sip_svr_addr: global_SipServerIP.split("|")[0],
            sip_svr_port: Number(global_SipServerPort),
            local_ipv4: localIP,
            local_sip_port: Number(global_LocalSipPort),
            user_agent: "Huawei TE Desktop",
            proxy_addr: global_SipServerIP.split("|")[0],
            proxy_port: Number(global_SipServerPort)
        },
        media: {
            srtp_mode: 1
        },
        audio: {
            audio_codec: "112,98,18,9,8,0" ,         
            dtmf_mode: 0,
            audio_anr:4,
            audio_aec:1
        }
    }, { response: configResponse });
}



/**
 * 配置结果
 * @param {*} data 
 */
function configResponse(data) {
    if (data.result == 0) {
        console.info("Config Success");
    } else {
        console.error("Config Failed");
        console.error(data);
    }
}


/**
 * 注册
 */
function register(phoneNumber) {
	
	var phoneNumber = document.getElementById("phonenumber").value;
    var password = document.getElementById("Phonepassword").value;
	if (global_cloudIPCC_SDK && global_cloudIPCC_SDK.tupCall)
	{
	    var global_userPhoneNumber = phoneNumber + "@" + global_SipServerIP.split("|")[1];
	    global_cloudIPCC_SDK.tupCall.register(global_userPhoneNumber, global_userPhoneNumber, password, {
	        onRegStatusUpdate: onRegStatusUpdate,
	        onForceUnReg: onForceUnRegInfo,
	        response: registerResponse
	    });
	}
	else
	{
		console.error(new Date() + "TUP Service startfailed");
		writeLog("TUP Service startfailed");
	}
}

function onForceUnRegInfo(data) {
	console.error('The softPhone is unregistered forcely');
	writeLog('The softPhone is unregistered forcely');
}
/**
 * 注册结果
 * @param {*} data 
 */
function registerResponse(data) {
    if (data.result == 0) {
        console.info("Register Operation Success");
    } else {
        writeLog('Register Operation Failed');
        console.error(data);
        
    }

}

/**
 * 注销
 */
function deRegister() {
	if (this.global_cloudIPCC_SDK && this.global_cloudIPCC_SDK.tupCall) {
		this.global_cloudIPCC_SDK.tupCall.deRegister(global_userPhoneNumber, {
	        response: deRegisterResponse
	    });
	}
}

/**
 * 注销结果
 * @param {*} data 
 */
function deRegisterResponse(data) {
    if (data.result == 0) {
        console.info("DeRegister Success");
        writeLog('DeRegister Success');
        userPhoneNumber = "";
        tupCurrentCallId = "";
    } else {
        console.error("DeRegister Failed");
        writeLog('DeRegister Failed');
        console.error(data);
    }

}


/**
 * 注册结果上报
 * @param {*} data 
 */
function onRegStatusUpdate(data) {
	console.log("onRegStatusUpdate");
    console.log(data);
    var reason = data.param.reason_code;
    if (reason != 0) {
    	writeLog('The softPhone register failed. the status is ' + reason); 
    	console.error('The softPhone register failed. the status is ' + reason);
    } else {
    	if (data.param.register_state == 3) {
    		console.info('The softPhone register success. ' );
    		writeLog('The softPhone register success.'); 
    	}
    }
}

/**
 * 呼入事件
 * @param {*} data 
 */
function onCallIncoming(data) {
    var tupCurrentCallId = data.param.call_id;
    var tupCurrentCallType = data.param.call_type;
    global_cloudIPCC_SDK.tupCall.acceptCall(tupCurrentCallId, tupCurrentCallType, {response: onAcceptCallReponse });
}

function onAcceptCallReponse(data) {
    if (data.result == 0) {
        console.info("AcceptCall success. ");
    } else {
        console.error("AcceptCall failed. The ErrorCode is " + data.result);
        console.error(data);
    }
}


/**
 * 呼出事件
 * @param {*} data 
 */
function onCallOutGoing(data) {
    console.info(data);
}

/**
 * 本方发起呼叫后，本端收到回铃事件
 * @param {*} data 
 */
function onCallRingBack(data) {
    console.info(data);

}

/**
 * 呼叫建立事件
 * @param {*} data 
 */
function onCallConnected(data) {
    console.info(data);
}

/**
 * 呼叫结束事件
 * @param {*} data 
 */
function onCallEnded(data) {
    console.info(data);
}

/**
 * 呼叫失败事件
 * @param {*} data 
 */
function onCallEndedFailed(data) {
    console.info(data);
}

/**
 * RTP通道建立事件
 * @param {*} data 
 */
function onCallRtpCreated(data) {
    console.info(data);
}




