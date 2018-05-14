
function loadInnerCall(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "ONLINEAGENTONVDN"
	},function(data){
		writeLog("[QueryOnlineAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#agentID").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				if (infoList[i].workno == workNo)
				{
					continue;
				}
				document.getElementById("agentID").options.add(new Option(infoList[i].workno,infoList[i].workno));
			}
			break;
		}
	});
}

function loadHoldList(workNo)
{
	$.post("/AgentServerDemo/calldata.do",
	{
		identityMark : workNo,
		type : "HOLDLIST"
	},function(data){
		writeLog("[Query Hold List]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#holdList").empty();
			var infoList = res.result;			
			for(var i=0;i<infoList.length;i++)
			{
				if (infoList[i].callfeature == 7 || infoList[i].callfeature == 6)
				{
					document.getElementById("holdList").options.add(new Option(infoList[i].called,infoList[i].callid));
				}
				else
				{
					document.getElementById("holdList").options.add(new Option(infoList[i].caller,infoList[i].callid));
				}				
			}
		break;
		case "400-003":			
			$("#holdList").empty();			
		break;
		}
	});
}

function loadCallInfo(workNo)
{
	$.post("/AgentServerDemo/calldata.do",
	{
		identityMark : workNo,
		type : "CALLINFO"
	},function(data){
		writeLog("[Query CallInfo]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#callInfo").empty();
			var ret = res.result;
			document.getElementById("callInfo").options.add(new Option("caller:"+ret.caller+";"+"called:"+ret.called,ret.callid));								
		break;
		}
	});
}

function loadCallInfo(workNo,tab)
{
	$.post("/AgentServerDemo/calldata.do",
	{
		identityMark : workNo,
		type : "CALLINFO"
	},function(data){
		writeLog("[Query CallInfo]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$('#'+tab).empty();
			var ret = res.result;
			if (null == ret)
			{
				return;
			}
			document.getElementById(tab).options.add(new Option("caller:"+ret.caller+";"+"called:"+ret.called,ret.callid));								
		break;
		}
	});
}

function queryInnerHelpAgent(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "ONLINEAGENTONVDN"
	},function(data){
		writeLog("[QueryOnlineAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#innerHelpAddress").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				if (infoList[i].workno == workNo)
				{
					continue;
				}
				document.getElementById("innerHelpAddress").options.add(new Option(infoList[i].workno,infoList[i].workno));
			}
			
			break;
		}
	});
}

function queryInnerHelpSkillQ(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "AGENTSKILLBYWORKNO"
	},function(data){
		writeLog("[QuerySkillByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#innerHelpAddress").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("innerHelpAddress").options.add(new Option(infoList[i].name,infoList[i].id));
			}
			break;
		}
	});
}

function queryGroupByAgent(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "AGENTGROUPBYWORKNO"
	},function(data){
		writeLog("[QueryGroupByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#targetName").empty();
			var info = res.result;			
			document.getElementById("targetName").options.add(new Option(info.name,info.name));			
			break;
		}
	});
}

function querySkillByAgent(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "AGENTSKILLBYWORKNO"
	},function(data){
		writeLog("[QuerySkillByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#targetName").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("targetName").options.add(new Option(infoList[i].name,infoList[i].name));
			}
			break;
		}
	});
}


function loadSkillQueue(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "AGENTSKILLBYWORKNO"
	},function(data){
		writeLog("[QuerySkillByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#addressVoiceChoose").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("addressVoiceChoose").options.add(new Option(infoList[i].name,infoList[i].id));
			}
			break;
		}
	});
}

/*
 * query other online agent besides the agent himself
 */
function queryAgent(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "ONLINEAGENTONVDN"
	},function(data){
		writeLog("[queryAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#addressVoiceChoose").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				if (infoList[i].workno == workNo)
				{
					continue;
				}
				document.getElementById("addressVoiceChoose").options.add(new Option(infoList[i].workno,infoList[i].workno));
			}
			break;
		}
	});
}

function queryIvrByAgent(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "QUERYIVR"
	},function(data){
		writeLog("[queryIvrByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#addressVoiceChoose").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("addressVoiceChoose").options.add(new Option(infoList[i].description,infoList[i].access));
			}
			break;
		}
	});
}

function queryAccessCodeByAgent(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "QUERYACCESSCODE"
	},function(data){
		writeLog("[queryIvrByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#addressVoiceChoose").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("addressVoiceChoose").options.add(new Option(infoList[i].inno,infoList[i].inno));
			}
			break;
		}
	});
}

function loadSkillQueueText(workNo)
{
	$.post("/AgentServerDemo/queuedevice.do",
	{
		identityMark : workNo,
		type : "AGENTSKILLBYWORKNO"
	},function(data){
		writeLog("[QuerySkillByAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#address").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("address").options.add(new Option(infoList[i].name,infoList[i].id));
			}
			break;
		}
	});
}

/*
 * query other online agent besides the agent himself
 */
function queryAgentText(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "ONLINEAGENTONVDN"
	},function(data){
		writeLog("[queryAgent]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			$("#address").empty();
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				if (infoList[i].workno == workNo)
				{
					continue;
				}
				document.getElementById("address").options.add(new Option(infoList[i].workno,infoList[i].workno));
			}
			break;
		}
	});
}


function queryRestReason(workNo)
{
	$.post("/AgentServerDemo/agentgroup.do",
	{
		identityMark : workNo,
		type : "AGENTRESTREASON"
	},function(data){
		writeLog("[QueryRestReason]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0":
			var infoList = res.result;
			for(var i=0;i<infoList.length;i++)
			{
				document.getElementById("restReason").options.add(new Option(infoList[i].restReason,infoList[i].restReasonId));
			}
			break;
		}
	});
}






