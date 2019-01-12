
$(function(){
	
	$("#voicecallAnswer").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		voiceAnswer(workNo);
	});
	
	$("#voicecallRelease").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }	
		voiceRelease(workNo);    	
   });
	
	$("#voicecallHold").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		voiceHold(workNo);
	});
	
	$("#voicecallUnHold").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		sessionStorage.setItem("HoldList","voicecallUnHold");
		openHoldListDialog(workNo);
	});
	
	$("#voicecallMute").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		voiceMute(workNo);
	});
	
	$("#voicecallUnMute").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		voiceCancleMute(workNo);
	});
	
	$("#voicecallInner").click(function(){
		var workNo = global_workNo;
		sessionStorage.setItem("Innercall","voice");
		openInnerCallDialog(workNo);
	});
	
	$("#voicecallThreePart").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		sessionStorage.setItem("HoldList","voicecallThreePart");
		openHoldListDialog(workNo);
	});
	
	$("#releaseTheCall").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
	    {
	        return;
	    }
		openCallInfoDialog(workNo);
	});
	
	$("#voiceInnerHelp").click(function(){
		var workNo = global_workNo;
		openInnerHelpInfoDialog(workNo);
	});
	
	$("#voicecallOut").click(function(){
		var workNo = global_workNo;
		var called = openCallOutDialog();
	});
		
	$("#voicecallTransfer").click(function(){
		var workNo = global_workNo;
		
		if (!isValidWorkNo(workNo))
        {
        	return;
        }
		openVoiceTransDialog(workNo);
	});
	
	$("#setCalldata").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
        {
        	return;
        }
		openSetCallDataDialog(workNo);
	});
	
	$("#queryCalldata").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
        {
        	return;
        }
		queryCallData(workNo);
	});
	
	$("#textChatAnswer").click(function() {
        var workNo = global_workNo;
        var callId = global_callId;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(callId))
	    {
	        return;
	    }
        textChatAnswer(workNo,callId);
    });
	
	$("#textChatReject").click(function() {
        var workNo = global_workNo;
        var callId = global_callId;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(callId))
	    {
	        return;
	    }
        textChatReject(workNo,callId);
    });

    $("#textChatDrop").click(function() {
        var workNo = global_workNo;
        var callId = global_clickCallId;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(callId))
	    {
	        return;
	    }
        drop(workNo,callId);
    });
    
    $("#textChatInner").click(function() {
        var workNo = global_workNo; 
        sessionStorage.setItem("Innercall","text");
        openInnerCallDialog(workNo);

    });
    
    $("#textChatTransfer").click(function() {
        var workNo = global_workNo;        
        openTransDialog(workNo);

    });
        
    $("#textChatSend").click(function()
    {
        var content = $("#ChatMessage").val();
        var workNo = global_workNo;
        var callId = global_clickCallId;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(content) || IsNullOrBlank(callId))
	    {
	        return;
	    }
        sendMessage(workNo, callId, content);
    });
    
    $("#fileUpload").click(function()
    {
        var workNo = global_workNo;
        var callId = global_clickCallId;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(callId))
	    {
	        return;
	    }
        fileUpload(workNo, callId);
    });
    
    $("#fileDownload").click(function()
    {
    	var filePath = $("#filePath").val();
        var workNo = global_workNo;
        if (IsNullOrBlank(filePath) || !isValidWorkNo(workNo))
	    {
	        return;
	    }
        fileDownload(workNo,filePath);
    });
    
    
});

/*
 * VoiceAnswer
 */
function voiceAnswer(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
	    identityMark : workNo,
		type : "ANSWER"
	},function(data){
		writeLog("[VoiceAnswer]"+data);		
	});
}

/*
 * VoiceRelease
 */
function voiceRelease(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		type : "RELEASE"
	},function(data){
		writeLog("[VoiceRelease]"+data);
		var retcode = (JSON.parse(data)).retcode;
		switch(retcode)
		{
	    case global_resultCode_SUCCESSCODE:
	    	
	    	  break;
		}
	});
}

/*
 * Hold
 */
function voiceHold(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
	    type : "HOLD"
	},function(data){
		writeLog("[Hold]"+data);
	});
}

/*
 * query hold list
 */
function queryHoldList(workNo)
{
	$.post("/"+WEB_NAME+"calldata.do",
	{
		identityMark : workNo,
		type : "HOLDLIST"
	},function(data){
		writelog("[Query hold list]"+data);
		var result = JSON.parse(data);
		switch (result.retcode){
		case "0" :
			
			break;
		}
		
	});
}

/*
 * Get hold
 */
function voiceGetHold(workNo,callid)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		callId : callid,
	    type : "GETHOLD"
	},function(data){
		writeLog("[Unhold]"+data);
	});
}

/*
 * Mute
 */
function voiceMute(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
	    type : "MUTE"
	},function(data){
		writeLog("[Mute]"+data);
	});
}

/*
 * UnMute
 */
function voiceCancleMute(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
	    type : "CANCLEMUTE"
	},function(data){
		writeLog("[UnMute]"+data);
	});
}

/*
 * InnerVoiceCall
 */
function voiceCallInner(workNo,called)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		called : called,
	    type : "CALLINNER"
	},function(data){
		writeLog("[InnerVoiceCall]"+data);
	});
}

/*
 * Voice Three part
 */
function voicecallThreePart(workNo,callid)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		callId : callid,
	    type : "THREEPART"
	},function(data){
		writeLog("[Voice Three Part]"+data);
	});
}

/*
 * Voice Inner Help
 */
function voicecallInnerHelp(workNo,dstaddress,devicetype,mode)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		address : dstaddress,
		deviceType : devicetype,
		mode : mode,
	    type : "INNERHELP"
	},function(data){
		writeLog("[Voice Inner Help]"+data);
	});
}

/*
 * VoiceCallout
 */
function voiceCallout(workNo,called)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		called : called,
	    type : "CALLOUT"
	},function(data){
		writeLog("[VoiceCallout]"+data);
	});
}


function destroyTheCall(workNo,callId)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		callId : callId,
	    type : "DESTROYTHECALL"
	},function(data){
		writeLog("[DESTROYTHECALL]"+data);
	});
}
/*
 * Voice Transfer
 */
function voicecallTransfer(workNo,deviceType,address,mode)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		deviceType : deviceType,
		address : address,
		mode : mode,
	    type : "TRANSFER"
	},function(data){
		writeLog("[VoiceTransfer]"+data);
	});
}

/*
 * VoiceTransToSkill
 */
function voicecallTranstoSkills(workNo,address)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		address : address,
	    type : "TRANSTOSKILLS"
	},function(data){
		writeLog("[VoiceTransToSkill]"+data);
	});
}

function setCallData(workNo,callId,callData)
{
	$.post("/"+WEB_NAME+"/calldata.do",{
		identityMark : workNo,
		callId : callId,
		callData : callData,
		type : "SETCALLDATA"
	},function(data){
		writeLog("[SetCallData]"+data);
	});
}

function queryCallData(workNo)
{
	$.post("/"+WEB_NAME+"/calldata.do",{
		identityMark : workNo,
		type : "QUERYCALLDATA"
	},function(data){
		writeLog("[QueryCallData]"+data);
		var ret = JSON.parse(data);
		if (ret.retcode == "0")
		{
			openQueryCallDataResult(workNo,ret.result);
		}
	});
}

/*
 * TextChatAnswer
 */
function textChatAnswer(workNo,callId)
{
    $.post("/"+WEB_NAME+"/textchat.do", 
    {
    	identityMark : workNo,
        callId : callId,
        type : "ANSWER"
    },function(data){ 
    	writeLog("[TextChatAnswer]"+data);        
    });
}

function textChatReject(workNo,callId)
{
	$.post("/"+WEB_NAME+"/textchat.do", 
    {
		identityMark : workNo,
        callId : callId,
        type : "REJECT"
    },function(data){ 
    	writeLog("[TextChatReject]"+data);        
    });
}

/*
 * TextChatRelease
 */
function drop(workNo,callId)
{
    $.post("/"+WEB_NAME+"/textchat.do", 
    {
    	identityMark : workNo,
        type : "RELEASE",
        callId : callId
    },
    function(data){
    	writeLog("[TextChatRelease]"+data);
    	var ret = JSON.parse(data);
		switch (ret.retcode){
		case "0" :
			DelChat(ret.result);
			break;
		}
    });
}

/*
 * InnerTextChat 
 */
function interCall(workNo,called)
{
	$.post("/"+WEB_NAME+"/textchat.do",
    {
		identityMark : workNo,
		called : called,
		type : "CALLINNER"
    },function(data){
    	writeLog("[InnerTextChat]"+data);
    });
}



/*
 * TextTransfer
 */
function textTransfer(workNo,addresstype,destaddr,callId,mode)
{
	$.post("/"+WEB_NAME+"/textchat.do",
	{
		identityMark : workNo,
		addresstype : addresstype,
		destaddr : destaddr,
		callId : callId,
		mode : mode,
		type : "TRANSFER"
	},function(data){
		writeLog("[TextTransfer]"+data);
	});
}

/*
 * ChatContentSend
 */
function sendMessage(workNo, callId, content)
{
    $.post("/"+WEB_NAME+"/textchat.do", 
    {
    	identityMark : workNo,
        type : "SENDMESSAGE",
        callId : callId,
        content : content
    },
    function(data){
    	writeLog("[ChatContentSend]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            UpdateWhenChatContentSent($("#ChatMessage").val());
            break;
        }
    });
}

/*
 * file upload
 */

var input;
function fileUpload(workNo, callId)
{
	var fd = new FormData();
	var url = "/"+WEB_NAME+"/textchat.do?identityMark="+workNo+"&callId="+callId+"&type=FILEUPLOAD&timeStamp=" + new Date().getTime();
	var input = $("#upfile").get(0);
	if (!input.value)
	{
		return;
	}
    fd.append('file', input.files[0]);
    
    $.ajax({
    	url : url,
    	type : 'post',
    	data : fd,
    	processData : false,
    	contentType : false,
    	success : function(data)
    	{
    		writeLog("[file upload]"+data);
    	}
    });
	
	
	
}

/*
 * File Download 
 */
function fileDownload(workNo,filePath)
{
	//first : download file from agentgateway
    $.post("/"+WEB_NAME+"/textchat.do", 
    {
    	identityMark : workNo,
        filePath : filePath,
        type : "FILEDOWNLOAD"        
    },function(data)
    {
    	writeLog("[fileDownload]"+data);
    	//second :download file from tomcat 
    	window.location.href="/"+WEB_NAME+"/textchat.do?identityMark="+workNo+"&filePath="+data;
    	//downloadFile("/"+WEB_NAME+"/textchat.do?identityMark="+workNo+"&filePath="+data);
    	
    });
}

function downloadFile(url)
{
	window.open(url, "_blank" ,   "height=100, width=400, top=0, left=0, " +
			"toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");	
}


/*
 * Save call data callId
 */
function saveCallId(workNo,callId)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		callId : callId,
		type : "SAVECALLID"
	});
}

/*
 * Delete call data callId
 */
function deleteCallId(workNo)
{
	$.post("/"+WEB_NAME+"/voice.do",
	{
		identityMark : workNo,
		type : "DELETECALLID"
	});
}

/*
 * add textChat UserList
 */
function addUserList(userName,callId)
{
	var ccbDiv = "<div  id='" + "chat_ccb_" + callId + "' style='height:30px; line-height:30px; text-align:center;'>" +
    "<a style='color:blue' href='javascript:SelectChat(\"" + callId + "\")' id='chat_sel_" + callId + "'>" + userName + "</a></div>";
	document.getElementById("userList").innerHTML += ccbDiv;
}

//选择文字交谈用户节点   choose textChat user Node
function SelectChat(callId)
{
	global_clickCallId = callId;
	if ($("#chat_sel_" + callId).attr("style") == "color: gray;")
	{
		return;
	}
	$("div a").css("color","blue");
    // cancel highlight to tell the agent to notice
    var chatcontent = getData(callId);
	if (chatcontent === null)
	{
		chatcontent = "";
	}
    document.getElementById("ChatTextBox").value = chatcontent;
    if (document.getElementById("chat_sel_" + callId)) {
        document.getElementById("chat_sel_" + callId).style.color = "#FF00FF";
    }
}

//删除文字交谈用户节点    delete textChat user Node
function DelChat(callId)
{
    var elem = document.getElementById('chat_ccb_' + callId);
    if (elem) 
    {
    	elem.parentNode.removeChild(elem);
    }
}

/*
 * 文字交谈消息保存    textChat message save
 */
function saveData(callId,content)
{
	map.put(callId,content);
}

/*
 * 文字交谈消息获取   get textChat message
 */
function getData(callId)
{
	return map.get(callId);
}

/*
 * 文字交谈消息删除   delete textChat message
 */
function deleteData(callId)
{
	map.remove(callId);
}

/*
 * Show text chat message
 */
function UpdateWhenChatContentSent(content) {
	var oldValue = getData(global_clickCallId);
	$("#ChatTextBox").val(oldValue + global_workNo + ": " + content + "\n");
	var newValue = $("#ChatTextBox").val();
	saveData(global_clickCallId, newValue);
	$("#ChatMessage").val("");
	
	var chatText = document.getElementById("ChatTextBox");
	chatText.scrollTop= chatText.scrollHeight * 12;
}

function voicecallUnHold(callid)
{
	var workNo = global_workNo;
	if (IsNullOrBlank(callid))
	{
		return;
	}
	voiceGetHold(workNo,callid);
}

function VoiceInnerCall(called)
{
	var workNo = global_workNo;
	if (!isValidWorkNo(workNo) || IsNullOrBlank(called))
	{
		return;
	}		
	voiceCallInner(workNo,called);
}

function CallInfo(callId)
{
	var workNo = global_workNo;
	if (IsNullOrBlank(callId))
	{
		return;
	}
	destroyTheCall(workNo,callId);
}

function InnerHelp(innerHelpInfo)
{
	var workNo = global_workNo;
	if (IsNullOrBlank(innerHelpInfo))
	{
		return;
	}
	var dstaddress = innerHelpInfo.dstaddress;
	var devicetype = innerHelpInfo.devicetype;
	var mode = innerHelpInfo.mode;
	if (!isValidWorkNo(workNo))
	{
		return;
	}
	voicecallInnerHelp(workNo,dstaddress,devicetype,mode);
}

function CallOut(called)
{
	var workNo = global_workNo;
	if (!isValidWorkNo(workNo) || IsNullOrBlank(called))
	{
		return;
	}
	voiceCallout(workNo,called);
}

function VoiceTransfer(transInfo)
{
	var workNo = global_workNo;
	if (IsNullOrBlank(transInfo))
	{
		return;
	}
	var devicetype = transInfo.deviceType;
	var address = transInfo.address;
	var mode = transInfo.mode;
	if (!isValidWorkNo(workNo) || IsNullOrBlank(devicetype) || IsNullOrBlank(address) || IsNullOrBlank(mode))
	{
		return;
	}
	voicecallTransfer(workNo,devicetype,address,mode);
}

function SetCallData(callDataInfo)
{
	var workNo = global_workNo;
	if (null == callDataInfo)
	{
		return;
	}
	var callId = callDataInfo.callId;
	var callData = callDataInfo.callData;
	if (IsNullOrBlank(callId)||IsNullOrBlank(callData))
	{
		return;
	}
	setCallData(workNo,callId,callData);
}

function TextInnerCall(called)
{
	var workNo = global_workNo;
	if (!isValidWorkNo(workNo) || IsNullOrBlank(called))
	{
		return;
	}
	interCall(workNo,called);
}

function Transfer(transInfo)
{
    var callId = global_clickCallId;
	var workNo = global_workNo;
	if (IsNullOrBlank(transInfo))
	{
		return;
	}
	var addresstype = transInfo.deviceType;
	var destaddr = transInfo.address;
	var mode = transInfo.mode;
	
	if (!isValidWorkNo(workNo) || IsNullOrBlank(callId) 
			|| IsNullOrBlank(addresstype) || IsNullOrBlank(destaddr))
	{
		return;
	}
	textTransfer(workNo,addresstype,destaddr,callId,mode);
}

function VoicecallThreePartCase(callid)
{
	var workNo = global_workNo;
	if (IsNullOrBlank(callid))
	{
		return;
	}
	voicecallThreePart(workNo,callid);
}