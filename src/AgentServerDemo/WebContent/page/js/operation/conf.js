
$(function(){
	
	//会议
	
	$("#requestConf").click(function(){
		var workNo = global_workNo;
		var addressInfo = prompt("Input addressInfo as '9,vdnNo,agentId;'","");
		if (workNo == undefined || workNo == null || workNo == "")
    	{
        	return;
    	}
		if (addressInfo == undefined || addressInfo == null || addressInfo == "")
    	{
        	return;
    	}
		RequestConf(workNo,addressInfo);
	});
	
	$("#inviteConf").click(function(){
		var workNo = global_workNo;
		var confId = global_confId;
		var addressInfo = prompt("Input addressInfo as '9,vdnNo,agentId;'","");
		if (workNo == undefined || workNo == null || workNo == "")
    	{
        	return;
    	}
		if (confId == undefined || confId == null || confId == "")
    	{
        	return;
    	}
		if (addressInfo == undefined || addressInfo == null || addressInfo == "")
    	{
        	return;
    	}
		InviteConf(workNo,confId,addressInfo);
	});
	
	$("#joinConf").click(function(){
		joinConf();
	});
	
	$("#leaveConf").click(function(){
		var workNo = global_workNo;
		var confId = global_confId;
		if (workNo == undefined || workNo == null || workNo == "")
		{
			return;
		}
		if (confId == undefined || confId == null || confId == "")
		{
			return;
		}
		stopVideo();
		leaveConf();
	});
	
	$("#stopConf").click(function(){
		var workNo = global_workNo;
		var confId = global_confId;
		if (workNo == undefined || workNo == null || workNo == "")
    	{
        	return;
    	}
		if (confId == undefined || confId == null || confId == "")
    	{
        	return;
    	}
		stopVideo();
		terminateConf();
		stopConf(workNo,confId);
	});
	
	$("#openVideoDevice").click(function(){
		openVideoDevice();		
	});
	
	$("#showMemberVideo").click(function(){
		showMemberVideo();		
	});
	
	$("#startShareScreen").click(function(){
		startShareScreen();		
	});
	
	$("#stopShareScreen").click(function(){
		stopShareScreen();		
	});
	
	$("#requestControl").click(function(){
		requestControl();		
	});
	
	$("#addOperationPrivilege").click(function(){
		if ("" == meetingAgentId) {
		var requester = prompt("The one you add operation privilege:","");
			addOperationPrivilege(requester);		
		} else {
			addOperationPrivilege(meetingAgentId);		
		}
	});
	
	$("#deleteOperationPrivilege").click(function(){
		var requester = meetingAgentId;
		deleteOperationPrivilege(requester);
	});
	
	$("#refuseControl").click(function(){
		var requester = meetingAgentId;
		refuseControl(requester);
	});
	
	//文档共享
	$("#startShareFile").click(function(){
		startShareFile();		
	});
	
	$("#stopShareFile").click(function(){
		stopShareFile();		
	});
	
	$("#storeShareFile").click(function(){
		var addressInfo = prompt("please input the local path","");
		storeShareFile(addressInfo);		
	});
	
	$("#previousPage").click(function(){
		previousPage();		
	});
	
	
	
	
	$("#nextPage").click(function(){
		nextPage();		
	});
});


/*
 * Report join conf result
 */
function JoinConfResult(confid,resultcode)
{
	$.post("/"+WEB_NAME+"/conf.do",
	{
		identityMark : global_workNo,
		confid : confid,
		confresult: resultcode,
		type: "JOINCONFRESULT"
	},
	function(data){
		writeLog("[JoinConfResult]"+data);
		var retcode = (JSON.parse(data)).retcode;
		switch(retcode)
		{
		case global_resultCode_SUCCESSCODE:
            
		}
	});
}

/*
 * Request conf
 */
function RequestConf(workNo,addressInfo,callid)
{
	$.post("/"+WEB_NAME+"/conf.do",
	{
		identityMark : workNo,
		addressInfo: addressInfo,
		callid : global_callId,
		type: "REQUESTCONF"
	},
	function(data){
		writeLog("[RequestConfResult]"+data);
		var retcode = (JSON.parse(data)).retcode;
	});
}

/*
 * Invite an agent to join conf
 */
function InviteConf(workNo,confId,addressInfo)
{
	$.post("/"+WEB_NAME+"/conf.do",
	{
		identityMark : workNo,
		confid : confId,
		addressInfo: addressInfo,
		type: "INVITECONF"
	},
	function(data){
		writeLog("[InviteConfResult]"+data);
		var retcode = (JSON.parse(data)).retcode;
		switch(retcode)
		{
		case global_resultCode_SUCCESSCODE:
			
		}
	});
}

/*
 * stop conf
 */
function stopConf(workNo,confId)
{
	$.post("/"+WEB_NAME+"/conf.do",
	{
		identityMark : workNo,
		confid : confId,
		type: "STOPCONF"
	},
	function(data){
		writeLog("[StopConfResult]"+data);
	});
}


/****************************conferenceOCX method***********************************************/
var ConferenceOcx; //Multimedia control
var WndUiOcx; //Window control(Non-commercial product,ISV needs to develop on demand)
var screenShareWndMap; //key:window describe;value:hwnd
var fileShareWndMap;
var shareFileId;
var shareFileName;
var meetingAgentId;


var shareFileDisplaySize = {
		"sWidth" : 1000,
        "sHeight" : 1000
};

function init_conf()
{
	ConferenceOcx = document.getElementById("ConferenceOcx");
	WndUiOcx = document.getElementById("WndUiOcx");
	
	if (IsNullOrBlank(global_logLevel))
	{
	    return;
	}
	if (IsNullOrBlank(global_logSaveDays))
	{
		return;
	}
	ConferenceOcx.SetLogLevel(global_logLevel);
	ConferenceOcx.SetLogSaveDays(global_logSaveDays);
	
	screenShareWndMap = new HashMap();
	fileShareWndMap = new HashMap();
	
	var screenShareHwndInfo = WndUiOcx.CreateWnd("屏幕共享窗口坐席");
	var screenShareHwnd = JSON.parse(screenShareHwndInfo).hWnd;
	screenShareWndMap.put("屏幕共享窗口坐席",screenShareHwnd);
	
	var fileShareHwndInfo = WndUiOcx.CreateWnd("文档共享窗口坐席");
	var fileShareHwnd = JSON.parse(fileShareHwndInfo).hWnd;
	fileShareWndMap.put("文档共享窗口坐席",fileShareHwnd);
	
	ConferenceOcx.SetDisplayShareScreenWnd(screenShareHwnd);
	
    ConferenceOcx.ShareFileSetDisplayWnd(fileShareHwnd);
	
	 
}

function leaveConf()
{
	
	ConferenceOcx.LeaveConf();
}

function joinConf()
{
	ConferenceOcx.JoinConf(global_confInfo);
}

function terminateConf()
{
	ConferenceOcx.TerminateConf();
}

function showDesktopShareScreen()
{
	WndUiOcx.ShowWnd(screenShareWndMap.get("屏幕共享窗口坐席"),"820","490");
}

function showApplication(hwnd)
{
	var result = ConferenceOcx.AddApplicationToShare(hwnd);
}

function showShareFileWnd()
{	
	var result = ConferenceOcx.ShareFileSetDisplaySize(1000,1000);
	WndUiOcx.ShowWnd(fileShareWndMap.get("文档共享窗口坐席"),1020,1040);
	
}

function closeDesktopShareScreen()
{
	WndUiOcx.HideWnd(screenShareWndMap.get("屏幕共享窗口坐席"));
}

function startShareScreen()
{
	var screenShareType = $("#screenShareType").val();
	ConferenceOcx.StartShareScreen(screenShareType);
}

function stopShareScreen()
{
	ConferenceOcx.StopShareScreen();
}

function requestControl()
{
	var result = ConferenceOcx.RequestOperationPrivilege("remotectl");
}

function addOperationPrivilege(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Add");
	if (0 != result) 
	{
		meetingAgentId ="";
	}
	else
	{
		meetingAgentId = requester;
	}
}

function deleteOperationPrivilege(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Delete");
	if (0 == result) 
	{
		meetingAgentId ="";
	}
}

function refuseControl(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Reject");
	if (0 == result) {
		meetingAgentId ="";
	}
}

//文档共享
function startShareFile()
{
	var sFileName = $("#shareFilePath").val();
	if ("" == sFileName)
	{
		alert("shareFilePath is empty");
		return;
	}
	var result = ConferenceOcx.ShareFileSetDisplaySize(shareFileDisplaySize.sWidth,shareFileDisplaySize.sHeight);
	WndUiOcx.ShowWnd(fileShareWndMap.get("文档共享窗口坐席"),1020,1040);
	var result = ConferenceOcx.ShareFileOpen(sFileName);
}

function clearConfResource(){
	WndUiOcx.HideWnd(screenShareWndMap.get("屏幕共享窗口坐席"));
	WndUiOcx.HideWnd(fileShareWndMap.get("文档共享窗口坐席"));
}

function closeShareFileWnd(){
	shareFileId="";
	shareFileName="";
	WndUiOcx.HideWnd(fileShareWndMap.get("文档共享窗口坐席"));
}


function stopShareFile()
{
	var result = ConferenceOcx.ShareFileClose(shareFileId);
	$("#currentPage").empty();
	$("#totalPage").empty();
	closeShareFileWnd();
}

function storeShareFile(addressInfo)
{
	var result = ConferenceOcx.ShareFileSave (shareFileId, addressInfo);
}

function previousPage()
{
	var result = ConferenceOcx.ShareFilePreviousPage(shareFileId,1);
}

function nextPage()
{
	var result = ConferenceOcx.ShareFileNextPage(shareFileId,1);
}

function SpecifiedPage(sPageNo)
{
	var result = ConferenceOcx.ShareFileSpecifiedPage(shareFileId,sPageNo,0);
}
/**************************conferenceOCX method*********************************************/



/*
 * the member list in conference
 */
function addToMemberList(userId)
{
	var member = "<a href=\"#\" id=\"member_"+userId+"\">"+userId+"&nbsp;</a>";
	document.getElementById("memberList").innerHTML += member;
}

/*
 * remove from list
 */
function removeFromMemberList(userId)
{
	var elem = document.getElementById("member_"+userId);
	elem.parentNode.removeChild(elem);
}

/*
 * clear member list
 */
function clearMemberList()
{
	document.getElementById("memberList").innerHTML = "会议成员：";
}
