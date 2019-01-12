



/**
 * 初始化SDK
 */
function initTupH5(){
	if (global_cloudIPCC_SDK == null)
	{
		global_cloudIPCC_SDK = new CloudIPCC_SDK({
			onTupDeamonReady: onTupDeamonReady,
            onTupDeamonClose: onTupDeamonClose,
            serviceStartUp: serviceStartUp,
            serviceShutDown: serviceShutDown,
            onTupLoginReady: onTupLoginReady,
            onTupLoginClose: onTupLoginClose,
            onTupCallReady: onTupCallReady,
            onTupCallClose: onTupCallClose,
            onVersionInfoNotify:onVersionInfoNotify
		});
	}
}

function onVersionInfoNotify(data)
{
	writeLog("version is " + data.param.version);
}


function onTupDeamonReady() {
	writeLog("TUP Deamon is Ready");
}

function onTupDeamonClose() {
    writeLog("TUP Deamon is Closed, please restart TUP Deamon it.");
    global_cloudIPCC_SDK = null;
}


function serviceStartUp() {
    writeLog("TUP Service StartUp");
}

function serviceShutDown() {
    writeLog("TUP Service is shutdown, please restart it.");
}

function onTupLoginReady(){
	writeLog("onTupLoginReady");
}


function onTupLoginClose(){
	writeLog("onTupLoginClose");
}


function onTupCallClose() {
	writeLog("onTupCallClose");
}


function onTupCallReady() {
	writeLog("onTupCallReady");
	getLocalIp(); 
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
    if (data.result == 0) {
        writeLog("GetLocalIp success");
        setBasicConfig()
        initTupCall(data.local_ip);
    } else {
        writeLog("GetLocalIp failed");
    }
}


function initTupCall(localIp)
{
	loadTupCallEvent();
	startLog();
	setBasicConfig();
	setSipConfig(localIp)
}

function loadTupCallEvent()
{
	global_cloudIPCC_SDK.tupCall.setBasicCallEvent({
        onCallIncoming: onCallIncoming
    });
}

//This function is used to start log, 
function startLog() {
    this.global_cloudIPCC_SDK.tupCall.logStart(
        3, 10240, 5, "./tuplog", { response: logStartResponse });
}

function logStartResponse(data) {
    if (data.result == 0) {
    	writeLog("logStart Success");
    } else {
        writeLog("logStart failed.");
    }
}

function setBasicConfig() { 
	global_cloudIPCC_SDK.tupCall.config({
        media: {
            srtp_mode: 1
        },
        audio: {
            audio_codec: "112,98,18,9,8,0",             
            dtmf_mode: 0,
            audio_anr:4,
            audio_aec:1
        },
        call: {
            call_ipcall_enable: 0 //it is used in test period, 0 means disenable        
        },
        account: {
            account_pwd_type: 1
        }
    }, {response: setBasicConfigResponse});
}

/**
 * 配置结果
 * @param {*} data 
 */
function setBasicConfigResponse(data) {
    if (data.result == 0) {
        writeLog("Set TUPCall Basic Config Success.");
    } else {
        writeLog("Set TUPCall Basic Config Failed.");
    }
}

function setSipConfig(localIp) {
	global_cloudIPCC_SDK.tupCall.config({
        network: {
            sip_svr_addr: global_SipServerIP.split("|")[0],
            sip_svr_port: Number(global_SipServerPort),
            local_ipv4: localIp,
            local_sip_port: Number(global_LocalSipPort),
            user_agent: "Huawei TE Desktop"

        }
    }, {response: setSipConfigResponse});
}

function setSipConfigResponse(data)
{
	if (data.result == 0) {
        writeLog("Set TUPCall Sip Config Success.");
        register();
    } else {
        writeLog("Set TUPCall Sip Config Failed.");
    }
	
}


/**
 * 注册
 */
function register() {
    var phoneNumber = document.getElementById("phonenumber").value;
    var password = document.getElementById("Phonepassword").value;
    global_userPhoneNumber = phoneNumber + "@" + global_SipServerIP.split("|")[1];
    global_cloudIPCC_SDK.tupCall.register(global_userPhoneNumber, global_userPhoneNumber, password, {
        onRegStatusUpdate: onRegStatusUpdate,
        onForceUnReg: onForceUnRegInfo,
        response: registerResponse
    });
}
/**
 * 注册结果
 * @param {*} data 
 */
function registerResponse(data) {
    if (data.result != 0) {
        writeLog("Phone Register Operation Failed.");
    }

}

/**
 * 注销
 */
function deRegister() {
	if (global_cloudIPCC_SDK != null && global_cloudIPCC_SDK.tupCall != null)
	{
		global_cloudIPCC_SDK.tupCall.deRegister(global_userPhoneNumber, {
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
        writeLog("Phone DeRegister Success.");
    } else {
        writeLog("Phone DeRegister Failed.");
    }

}



/**
 * 注册结果上报
 * @param {*} data 
 */
function onRegStatusUpdate(data) {
    var userNumber = data.param.user_number;
    var reason = data.param.reason_code; 
    if (reason != 0) {
    	writeLog("Phone register failed.");
    }
    if (data.param.register_state == 3) {
    	writeLog("Phone registered success.");
    }
}


function onForceUnRegInfo(data) {
    writeLog("onForceUnRegInfo.");
    alert("Phone has been loged out.");
}

function onCallIncoming(data) {
    var tupCurrentCallId = data.param.call_id;
    acceptCall(tupCurrentCallId);
}




/**
 * 接听呼叫
 */
function acceptCall(tupCurrentCallId) {
	global_cloudIPCC_SDK.tupCall.acceptCall(tupCurrentCallId, 0, { 
		response: onAcceptCallReponse });
}

function onAcceptCallReponse(data) {
    if (data.result == 0) {
        writeLog("AcceptCall success. ");
    } else {
        writeLog("AcceptCall failed. The ErrorCode is " + data.result);
        writeLog(data);
    }
}