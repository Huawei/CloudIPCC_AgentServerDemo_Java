
$(function() {
	
    $("#Login").click(function() {
        var workNo = $("#workNo").val();
        var password = $("#password").val();
        var phonenum = $("#phonenumber").val();

        var isAutoanswer;
        var agenttype;
        if ($("#AutoAnswer").attr("checked"))
        {
        	isAutoanswer = true;
        }
        else 
        {
        	isAutoanswer = false;
        }
        if ($("#isVideoAgent").attr("checked"))
        {
        	agenttype = 11;
        }
        else 
        {
        	agenttype = 4;
        }
        
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        
        if (!isValidPhoneNum(phonenum))
        {
        	return;
        }

        forceLogin(workNo, password, phonenum,isAutoanswer,agenttype);
    });
    
    $("#Logout").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        logout(workNo);
    });    
            
    $("#SayIdle").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        ready(workNo);
    });
   
    $("#SayBusy").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        busy(workNo);
    });
    
    $("#EnterWork").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        work(workNo);
    });
    
    $("#CancelWork").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        outwork(workNo);
    });
    
    $("#Rest").click(function() {
        var workNo = global_workNo;        
        var restInfo = openRestInfoDialog(workNo);
        if (IsNullOrBlank(restInfo))
        {
        	return;
        }
        var restTime = restInfo.restTime;
        var restReason = restInfo.restReason;
        if (!isValidWorkNo(workNo) || IsNullOrBlank(restTime) || IsNullOrBlank(restReason))
        {
            return;
        }
        rest(workNo,restTime,restReason);
    });
    
    $("#CancelRest").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        cancelRest(workNo);
    });
    
    $("#publishNotice").click(function() {
        var workNo = global_workNo;        
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        var noticeInfo = openNoticeInfoDialog(workNo);
        if (IsNullOrBlank(noticeInfo))
        {
        	return;
        }
        var noticeType = noticeInfo.noticeType;
        var targetName = noticeInfo.targetName;
        var noticeContent = noticeInfo.noticeContent;
        publishNotice(workNo,noticeType,noticeContent,targetName);
    });
    
    $("#sendNote").click(function() {
        var workNo = global_workNo;
        if (!isValidWorkNo(workNo))
        {
        	return;
        }
        var noteInfo = openNoteInfoDialog();
        if (IsNullOrBlank(noteInfo))
        {
        	return;
        }
        var receiver = noteInfo.receiver;
        var content = noteInfo.content;
        sendNote(workNo,receiver,content);
    });
        
    //Clear Log Button
    $("#clearLog").click(function()
    {
    	 $("#LogInfo").val("");
    });
    
    //Clear chat record Button
    $("#textChatClear").click(function()
    {
    	$("#ChatTextBox").val("");
    });
});


/*
 * Agent forceLogin
 */
function forceLogin(workNo, password, phonenum,isAutoanswer,agenttype)
{
	$.post("/"+WEB_NAME+"/online.do",
	{
		identityMark : workNo,
        password : password,
        phonenum : phonenum,
        isAutoanswer : isAutoanswer,
        agenttype : agenttype,
        type : "FORCELOGIN"
	},
	function(data){
		writeLog("[ForceLogin]"+data);
		var ret = JSON.parse(data);
		switch(ret.retcode)
		{
		case global_resultCode_SUCCESSCODE:
            global_workNo = workNo;
            setTimeout('getEventLisnter()', 500);//Start a thread to get agent event
            
            var result = ret.result;
            if ("true" == result.isForceChange)//need change passWord
            {
            	var pwdInfo = openModPwdDialog();
            	modifyPwd(global_workNo, pwdInfo.oldPwd, pwdInfo.newPwd);
            }
            else
        	{
            	resetSkill(global_workNo); //reset skills
        	}
            if ($("#voicePhone").attr("checked"))
        	{
            	voiceLogin(); //phone login
        	}        	
            break;
		}
	});
}

/*
 * Agent logout 
 */
function logout(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "LOGOUT"
    },
    function(data){ 
    	writeLog("[Logout]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
        	$("#status").html("Not login");
            $("#status").css('color','black');
            $("#password_tr").hide();
            global_workNo = "";
            if ($("#voicePhone").attr("checked"))
        	{
        		voiceLogout(); //Phone logout
        	}         	
            break;
        }
    });
}

/*
 * Agent forceLogout 
 */
function forceLogout(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "FORCELOGOUT"
    },
    function(data){ 
    	writeLog("[ForceLogout]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
        	$("#status").html("Not login");
            $("#status").css('color','black');
            global_workNo = "";
            if ($("#voicePhone").attr("checked"))
        	{
        		voiceLogout(); //Phone logout
        	}
            alert("please reLogin");
            break;
        }
    });
}

/*
 * modify Pwd
 */
function modifyPwd(workNo,oldPwd,newPwd)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
    	oldPassword : oldPwd,
    	newPasswork : newPwd,
        type : "MODIFYPWD"
    },
    function(data){
    	writeLog("[Modify Pwd]"+data);
    	forceLogout(workNo);
    });
}

/*
 * Idle(Ready)
 */
function ready(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "READY"
    },
    function(data){
    	writeLog("[Idle]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * Busy(Not Ready)
 */
function busy(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "BUSY"
    },
    function(data){
    	writeLog("[Busy]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * Enter Work State
 */
function work(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "WORK"
    },
    function(data){
    	writeLog("[Enter Work State]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * Exit Work State
 */
function outwork(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "OUTWORK"
    },
    function(data){
    	writeLog("[Exit Work State]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * Rest
 */
function rest(workNo,restTime,restReason)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        restTime : restTime,
        restReason : restReason,
        type : "REST"
    },
    function(data){
    	writeLog("[Rest]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * Cancel Rest
 */
function cancelRest(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "CANCELREST"
    },
    function(data){
    	writeLog("[CancelRest]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

/*
 * resetSkill
 */
function resetSkill(workNo)
{
    $.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
        type : "RESETSKILL"
    },
    function(data){
    	writeLog("[resetSkill]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

function publishNotice(workNo,noticeType,noticeContent,targetName)
{
	$.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
    	targettype : noticeType,
    	bulletindata : noticeContent,
    	targetname : targetName,
        type : "PUBLISHNOTICE"
    },
    function(data){
    	writeLog("[PublishNotice]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

function sendNote(workNo,receiver,content)
{
	$.post("/"+WEB_NAME+"/online.do", 
    {
    	identityMark : workNo,
    	receiver : receiver,
    	content : content,
        type : "SENDNOTE"
    },
    function(data){
    	writeLog("[SendNote]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            break;
        }
    });
}

function initVoiceTransfer()
{
	$('#addressVoice').hide();
	$("#addressVoiceChoose").show();
}

