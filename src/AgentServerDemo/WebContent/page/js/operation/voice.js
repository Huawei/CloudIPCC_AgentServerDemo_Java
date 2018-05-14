/*
 * voice.ocx Interface
 */
var VoiceCtl;
var VideoWndUi; //Window control(Non-commercial product,ISV needs to develop on demand)
var videoWndMap; //key:conf member;value:hwnd

function init_voice()
{
	VoiceCtl = document.getElementById("VoiceOcx");
	SetConfig();
    SetSipInfo();
    SetLocalInfo();
    init_video();
}

function init_video()
{
	VideoWndUi = document.getElementById("WndUiOcx");
	videoWndMap = new HashMap();
	var localHwndInfo = VideoWndUi.CreateWnd("坐席侧本地视频");		
	var localHwnd = JSON.parse(localHwndInfo).hWnd;
	videoWndMap.put("坐席侧本地视频", localHwnd);
	var remoteHwndInfo = VideoWndUi.CreateWnd("坐席侧对端视频");		
	var remoteHwnd = JSON.parse(remoteHwndInfo).hWnd;
	videoWndMap.put("坐席侧对端视频", remoteHwnd);

	var result = VoiceCtl.SetVideoWindow('{"localVideoWindow":"'+localHwnd+'","remoteVideoWindow":"'+remoteHwnd+'"}');
}

function SetConfig()
{
	VoiceCtl.SetConfig("CALL_D_CFG_SIP_SESSIONTIMER_ENABLE","1");
	VoiceCtl.SetConfig("CALL_D_CFG_AUDIO_AEC","1");
	VoiceCtl.SetConfig("CONFIG_AUTO_REGISTER_ENABLE","0");
	VoiceCtl.SetConfig("CALL_D_CFG_SIP_SESSIONTIME","3600");
}

function SetSipInfo()
{
    var result = VoiceCtl.SetSipServerInfo(global_SipServerIP, global_SipServerPort, "");
    if (0 != result)
	{
    	writeLog("VOICE_OCX-SetSipInfo() : " + result);
	}    
}

function SetLocalInfo()
{
    var result = VoiceCtl.SetLocalInfo(global_LocalIP, global_LocalSipPort, global_LocalAudioPort);
    if (0 != result)
	{
    	writeLog("VOICE_OCX-SetLocalInfo() : " + result);
	}    
}

function voiceLogin()
{
	var passwd = $("#Phonepassword").val();
	var Account = $("#phonenumber").val();
	var Mode = "1";
	var result = VoiceCtl.Register(Account, passwd, Mode);
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Register() : " + result);
	} 
}

function voiceLogout()
{
	var result = VoiceCtl.Deregister();
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Deregister() : " + result);
	} 
}

function AnonymousCall(Callee,isVideo)
{
    if ($("#isVideoAgent").attr("checked"))
	{
    	var str = '{"anonymousCard":"'+global_AnnonymousCard+'","callee":"'+Callee+'","isVideo":"'+isVideo+'"}';
		var result = VoiceCtl.AnonymousCallEx(str);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnonymousCallEx("+ Callee +") : " + result);
		}    
	}
	else
	{
		var result = VoiceCtl.AnonymousCall(global_AnnonymousCard,Callee);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnonymousCall("+ Callee +") : " + result);
		}  
	}
}

function phoneAnswer(callId,isVideo)
{
	var str = '{"callid":"'+callId+'",'+'"isVideo":"'+isVideo+'"}';
	
	if ($("#isVideoAgent").attr("checked"))
	{
		var result = VoiceCtl.AnswerEx(str);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnswerEx() : " + result);
		}    
	}
	else
	{
		var result = VoiceCtl.Answer(callId);
		if (0 != result)
		{
			writeLog("VOICE_OCX-Answer() : " + result);
		}  
	}
}

function phoneRelease(callId)
{
	var result = VoiceCtl.Release(callId);
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Release() : " + result);
	} 
}

function showMemberVideo()
{
	var members = videoWndMap.keys();
	var videoWndHwnds = videoWndMap.values();
	for(var i=0;i<members.length;i++)
	{
		VideoWndUi.ShowWnd(videoWndHwnds[i],352,288);
	}
	
}

function stopVideo()
{
	var members = videoWndMap.keys();
	var videoWndHwnds = videoWndMap.values();
	for(var i=0;i<members.length;i++)
	{
		VideoWndUi.HideWnd(videoWndHwnds[i]);
	}
}