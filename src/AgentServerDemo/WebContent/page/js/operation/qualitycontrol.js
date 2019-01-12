$(function(){	
	
	$("#searchAllAgentstatus").click(function(){
		var workNo = global_workNo;
		if (!isValidWorkNo(workNo))
		{
			return;
		}
		
		searchAllAgentstatus(workNo);
	});	
	
	
	/*	停止耳语 */
	
	$("#stopWhisper").click(function(){
		var workNo = global_workNo;
		var whisperWorkNo = global_choosedAgent;
		if (!isValidWorkNo(workNo))
		{
			return;
		}
		if (IsNullOrBlank(whisperWorkNo))
		{
			return;
		}
	    stopWhisper(workNo,whisperWorkNo);
		
	});	
	
	/*	请求耳语 */
	$("#requestWhisper").click(function(){
		
		var workNo = global_workNo;
		var whisperWorkNo = global_choosedAgent;		
		if (!isValidWorkNo(workNo))
		{
			return;
		}
		if (IsNullOrBlank(whisperWorkNo))
		{
			return;
		}
		requestWhisper(workNo,whisperWorkNo);
		
	});	
	
	/*	耳语,侦听，插入切换 */
	$("#qualityControlSwitch").click(function(){
		
		var workNo = global_workNo;
		openSwithTypeDialog(workNo);
	});	
	
	
	/*	质检坐席拦截指定坐席*/
	$("#qualityControlIntercept").click(function(){
		var workNo = global_workNo;
		var monitoredWorkNo = global_choosedAgent;
		if (!isValidWorkNo(workNo))
		{
			return;
		}
		
		if (monitoredWorkNo == undefined || monitoredWorkNo == null || monitoredWorkNo == "")
		{
			return;
		}
		
		Intercept(workNo,monitoredWorkNo);
		
	});	
	
    /*	质检坐席插入*/
	$("#qualityControlInsert").click(function(){
		var workNo = global_workNo;
		var monitoredWorkNo = global_choosedAgent;
		if (!isValidWorkNo(workNo))
    	{
        	return;
    	}
		if (monitoredWorkNo == undefined || monitoredWorkNo == null || monitoredWorkNo == "")
    	{
        	return;
    	}
		
		qualityControlInsert(workNo,monitoredWorkNo);
	  
	});	
	
	/*	质检坐席侦听*/
	$("#qualityControlSupervise").click(function(){
		var workNo = global_workNo;
		var monitoredWorkNo = global_choosedAgent;
		if (!isValidWorkNo(workNo))
		{
			return;
		}
		if (monitoredWorkNo == undefined || monitoredWorkNo == null || monitoredWorkNo == "")
		{
			return;
		}
		
		supervise(workNo,monitoredWorkNo);
		
	});	
	
	/*质检坐席取消插入或者侦听*/
	$("#CancellInsertOrListen").click(function(){
		var workNo = global_workNo;
		var monitoredWorkNo = global_choosedAgent;
		if (!isValidWorkNo(workNo))
    	{
        	return;
    	}
		if (monitoredWorkNo == undefined || monitoredWorkNo == null || monitoredWorkNo == "")
    	{
        	return;
    	}
		cancellInsetOrListen(workNo,monitoredWorkNo);
	});	
	
});


/*	质检坐席插入*/
function qualityControlInsert(workNo,monitordWorkNo)
{
    $.post("/"+WEB_NAME+"/qualitycontrol.do",
    {
    	"identityMark" : workNo,
    	"monitoredWorkNo" : monitordWorkNo ,
    	type : "INSERT"
    	
    },function(data){
    	writeLog("INSERT"+data);
    	var res=JSON.parse(data);
    	//插入成功
    	if (res.retcode == "0") {
    		global_agentStatus= "1";
			showAgentStatus(global_agentStatus);
		}
    });
}

/*	质检坐席取消插入或者监听  */
function cancellInsetOrListen(workNo,monitordWorkNo)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
			{
		"identityMark" : workNo,
		"monitoredWorkNo" : monitordWorkNo ,
		type : "CANCELLINSERTORLISTEN"
			
			},function(data){
				writeLog("CANCELLINSERTORLISTEN"+data);
				var res=JSON.parse(data);
		    	//插入成功
		    	if (res.retcode == "0") {
		    		global_agentStatus="";
					showAgentStatus(global_agentStatus);
				}
			});	
}

/*	质检坐席侦听  */
function supervise(workNo,monitordWorkNo)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
			{
		"identityMark" : workNo,
		"monitoredWorkNo" : monitordWorkNo ,
		 type : "SUSPERVISE"
			
			},function(data){
				writeLog("SUSPERVISE"+data);
				var result = JSON.parse(data);
				switch (result.retcode){
				case "0" :
					global_agentStatus="0";
					showAgentStatus(global_agentStatus);
					break;
				}
				
			});	
	
}


/*	质检坐席拦截 指定坐席 */
function Intercept(workNo,monitordWorkNo)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
			{
		"identityMark" : workNo,
		"monitoredWorkNo" : monitordWorkNo ,
		type : "INTERCEPT"
			
			},function(data){
				writeLog("INTERCEPT"+data);
				global_agentStatus="";
				showAgentStatus(global_agentStatus);
			});	
}

/*	耳语、侦听、插入切换  */
function swithType(workNo,monitoredWorkNo,switchtype)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
	{
		"identityMark" : workNo,
		"monitoredWorkNo" : monitoredWorkNo ,
		"swithType" : switchtype,
		 type : "SWITCHTYPE"
			
	},function(data)
	    {
		    writeLog("SWITCHTYPE"+data);
		    var result = JSON.parse(data);
			switch (result.retcode){
			case "0" :
				global_agentStatus = switchtype;
				showAgentStatus(global_agentStatus);
				break;
			}
	    })	;
	
}

/*	请求耳语  */
function requestWhisper(workNo,whisperWorkNo)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
	{
		"identityMark" : workNo,
		"whisperWorkNo" : whisperWorkNo ,
		 type : "REQUESTWHISPER"
			
	},function(data)
	{
		writeLog("REQUESTWHISPER"+data);
		var result = JSON.parse(data);
		switch (result.retcode){
		case "0" :
			global_agentStatus="2";
			showAgentStatus(global_agentStatus);
			break;
		}
	})	;
}


/*	停止耳语  */

function stopWhisper(workNo,whisperWorkNo)
{
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
		{
		    "identityMark" : workNo,
		    "whisperWorkNo" : whisperWorkNo ,
		    type : "STOPWHISPER"
		},function(data)
		{
			writeLog("STOPWHISPER"+data);
			var result = JSON.parse(data);
			switch (result.retcode){
			case "0" :
				global_agentStatus="";
				showAgentStatus(global_agentStatus);
				break;
			}
		});	
}

function getLanguage()
{
	 var browerLanguage =(navigator.language || navigator.browserLanguage).toLowerCase();
     var LanguagePage = new LanguagePageClass();
     if (browerLanguage.indexOf('zh') >= 0)
     {
         global_language = LanguagePage.GetLanguagePage(LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_CHINESE);
     }
     else
     {
         global_language = LanguagePage.GetLanguagePage(LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_ENGLISH);
     }
     var langObj = global_language;
     return langObj;
}

/*	查询所有坐席状态  */
function searchAllAgentstatus(workNo)
{
	var langObj = getLanguage();
	$.post("/"+WEB_NAME+"/qualitycontrol.do",
	{
	    "identityMark" : workNo,
		 type : "SEARCHALLAGENTS"
	},function(data)
	{
	    writeLog("SEARCHALLAGENTS"+data);
	    var res = JSON.parse(data);
	    switch (res.retcode) {
		case "0":
			
			
			//页面显示查询结果  agentss,border,"0",cellpadding,"0",cellspacing,"6"
			var agents =res.result;
			$("#agentsTab").empty();
			var html = "";

			html += "<tr ><td>"+langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_WORKNO+"</td>" +
			             "<td>"+langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_NAME+"</td>" +
			             "<td>"+langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS+"</td>" +
			       "</tr>";
			for(var i=0 ; i<agents.length ; i++ ){
				if (global_workNo != agents[i].workno) {
					html += "<tr ><td><button onclick='chooseAgentWorkNo("+agents[i].workno+")'>"+agents[i].workno+"</botton></td>" +
					"<td>"+agents[i].name+"</td>" +
					"<td>"+showMonitoredAgentStatus(agents[i].status)+"</td>" +
					"</tr>";
				}
			}
			$("#agentsTab").append(html);
			break;
		default:
			break;
		}
	    
	});	
}

function showMonitoredAgentStatus(status){
    var langObj = getLanguage();
	var agentStatus = "" ;
	switch (status) {
	case "0":
		    agentStatus = langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_UNKNOW;
		    return agentStatus;
		    break;
	case "1":
		    agentStatus = langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNIN;
		    return agentStatus;
		    break;
	case "2":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNOUT;
		    return agentStatus;
		    break;
	case "3":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_BUSY;
		    return agentStatus;
		    break;
	case "4":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_IDLE;
		    return agentStatus;
		    break;
	case "5":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_ACW;
		    return agentStatus;
		    break;
	case "6":
		    agentStatus = 	langObj. I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SAMEASIDLE;
		    return agentStatus;
		    break;
	case "7":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_TALKING;
		    return agentStatus;
		    break;
	case "8":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_REST;
		    return agentStatus;
		    break;
	default:
		    return agentStatus;
		    break;
	}
}


function showAgentStatus(global_agentStatus)
{
    var langObj =  getLanguage();
	var agentStatus = global_agentStatus;
	switch (agentStatus) {
	case "0":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SUPERVISE;
		    break;
	case "1":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_INSERT;
		    break;
	case "2":
		    agentStatus = 	langObj.I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_WHISPER;
		    break;
	default:
		   break;
	}
	var html=$("#agentStatus").html(langObj.I18N_AGENTAPPDEMO_INSPECTION_INSPECTOR_STATUS+agentStatus);
	
}

function chooseAgentWorkNo(workNo){
	//选择要侦听/插入的坐席号
	var langObj = getLanguage();
	global_choosedAgent = workNo;
	var html=$("#agentInfo").html(langObj.I18N_AGENTAPPDEMO_INSPECTION_INSPECTEE+global_choosedAgent);
}

function SwithType(switchtype)
{
	var workNo = global_workNo;
	var monitoredWorkNo = global_choosedAgent;
	if (!isValidWorkNo(workNo))
	{
		return;
	}
	//获取swithtype的值，可以采用下拉列表形式来设计转换类型
	if (IsNullOrBlank(switchtype)) {
		return;
	}
	if (monitoredWorkNo == undefined || monitoredWorkNo == null || monitoredWorkNo == "")
	{
		return;
	}
	swithType(workNo,monitoredWorkNo,switchtype);
}