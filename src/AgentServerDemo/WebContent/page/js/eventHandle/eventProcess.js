

// AgentOther_InService
function Process_IN_SERVER()
{
    $("#status").html("login");
    $("#status").css('color','blue');
}

// AgentOther_ShutdownService
function Process_SHUTDOWN()
{
    
}

// state_Ready
function Process_READY()
{
    $("#status").html("Idle");
    $("#status").css('color','green');
}

// state_SetNotReady_Success
function Process_notReady()
{
    $("#status").html("Busy");
    $("#status").css('color','red');
}


// state_SetWork_Success
function Process_Work()
{
    $("#status").html("working");
    $("#status").css('color','blue');
}

// State_SetRest_Success
function Process_Rest()
{
	$("#status").html("resting");
    $("#status").css('color','green');
}

// textChat Ringing 
function Process_Ring(content)
{
    $("#status").html("Alerting");
    $("#status").css('color','blue');
    global_callId = content.callId;

    if ($("#AutoAnswer").attr("checked"))
    {
    	textChatAnswer(global_workNo,global_callId);
    }
}

// textChat connected
function Process_Connected(content)
{
    $("#status").html("Talking");
    $("#status").css('color','blue');
    global_callId = content.callId;
    var isInnerCall = content.isInnerCall;
    
    if (isInnerCall)
	{
    	var caller = content.caller;
    	var called = content.called;
    	if (global_workNo == caller)
		{
    		addUserList(called,content.callId);		
		}
    	else
        {
   		 addUserList(caller, content.callId);
        }
   }
   else
   {
   	addUserList(content.caller, content.callId);
   }
   saveData(global_callId, "");

}

// textChat disconnected
function Process_Disconnected(content)
{
	deleteData(content.callId);
    global_callId = "";
    $("#chat_sel_"+ content.callId).css("color","gray");
    DelChat(content.callId);
}

// AgentChat_DataRecved
function Process_RECEIVEDATA(sender,callId,content) {
    var oldValue = getData(callId);
    $("#ChatTextBox").val(oldValue + sender + ": " + content + "\n");
    var newValue = $("#ChatTextBox").val();
    saveData(callId,newValue);
    var chatText = document.getElementById("ChatTextBox");
    chatText.scrollTop= chatText.scrollHeight * 12;
    var obj = JSON.parse(content);
    if (obj.filePath != null)
    {
    	$("#filePath").val(obj.filePath);
    }
}



// voiceCall Ringing
function Process_Ringing(content)
{
	$("#status").html(content.caller + "|Ringing");
	$("#status").css('color','blue');
}


// voiceCall Talking
function Process_Talking(content)
{
	 $("#status").html("Talking");
	 $("#status").css('color','blue');
}

// AgentEvent_Hold
function Process_Hold()
{
	$("#status").html("Hold");
	$("#status").css('color','red');
}

// voiceCall Release
function Process_Release(content)
{
//	phoneRelease(content);
}

function Process_JoinConf(content)
{
	global_confId = content.confid;
	global_confInfo = content.confinfo;
}

//Agent force logout by inspector
function Process_ExceptionLogout()
{
	$("#status").html("Not login");
    $("#status").css('color','black');            
    
    global_workNo = "";
    alert("Please reLogin.");
    if (global_phoneMode == 2)
	{
		voiceLogout(); //Phone logout
	}	
}


function process_LeaveConf(content)
{
	if (content.resultCode == 0 ) {
		// clear the conference resource
		ConferenceOcx.TeminateConf();
	}
	
}


function process_StopMultimediaConf(content)
{
	if (content.resultCode == 0 ) {
		// clear the menber
		$("#memberList").empty();
	}
	
}

