function  handleReturnValue(_return,dialogType,workNo)
{
	var arg  = JSON.parse( sessionStorage.getItem("arg"));
	var dialogType = arg.str;
	var workNo = arg.workNo;
	switch(dialogType)
	{
	case "Rest" : 
		Rest(_return);
		break;
	case "SwitchType" : 
		SwithType(_return);
		break;
	case "PublishNotice" : 
		PublishNotice(_return);
		break;
	case "SendNote" : 
		SendNote(_return);
		break;
	case "Transfer" : 
		Transfer(_return);
		break;
	case "VoiceTransfer" : 
		VoiceTransfer(_return);
		break;
	case "CallInfo" : 
		CallInfo(_return);
		break;
	case "CallOut" : 
		CallOut(_return);
		break;
	case "SetCallData" : 
		SetCallData(_return);
		break;
	case "ModPwd" : 
		ModPwd(_return);
		break;
	case "InnerHelp" : 
		InnerHelp(_return);
		break;
    case "InnerCall" : 
		var type = sessionStorage.getItem("Innercall");
		if("text" == type)
		{
			TextInnerCall(_return)
		}
		else
		{
			VoiceInnerCall(_return);
		}
	break;
    case "HoldList" : 
		var type = sessionStorage.getItem("HoldList");
		
		if("voicecallUnHold" == type)
		{
			voicecallUnHold(_return)
		}
		else
		{
			VoicecallThreePartCase(_return);
		}
	break;
	default: 
	break;
	}
	
}

function showdialogAdapter()
{
	/*if(!window.showModalDialog)
	{*/
		window.showModalDialog = function(url,name,option)
		{
	        if(window.hasOpenWindow)
	        {
		        window.newWindow.focus();
        	}
			var re = new RegExp(";", "g"); 
			var option  = option.replace(re, '","'); //把option转为json字符串
			var re2 = new RegExp(":", "g");
			option = '{"'+option.replace(re2, '":"')+'"}';
			option = JSON.parse(option);
			var openOption = 'width='+parseInt(option.dialogWidth)+',height='+parseInt(option.dialogHeight)+',left='+(window.screen.width-parseInt(option.dialogWidth))/2+',top='+(window.screen.height-30-parseInt(option.dialogHeight))/2;
			window.hasOpenWindow = true;
			window.newWindow = window.open(url,name,openOption);
		}
	//}	
}


function openDialog(workNo,dialogType)
{
	var arg = new Object();
	arg.str = dialogType;
	arg.workNo = workNo;
	var jsonstring = JSON.stringify(arg);
	sessionStorage.setItem("arg",jsonstring);
	window.returnValue = undefined;
	
	showdialogAdapter();
	window.showModalDialog("page/agentdialog.html","name","dialogHeight:240px;dialogWidth:320px");
}

function openRestInfoDialog(workNo)
{
	  openDialog(workNo,'Rest');
}

function openNoticeInfoDialog(workNo)
{
	return openDialog(workNo, "publishNotice");
}

function openNoteInfoDialog()
{
	return openDialog("", "sendNote");
}

function openHoldListDialog(workNo)
{
	return openDialog(workNo,'HoldList');
}

function openTransDialog(workNo)
{
	return openDialog(workNo,'Transfer');
}
function openVoiceTransDialog(workNo)
{
	return openDialog(workNo,'VoiceTransfer');
}

function openInnerCallDialog(workNo)
{
	return openDialog(workNo,'InnerCall');	
}

function openCallInfoDialog(workNo)
{
	return openDialog(workNo,'CallInfo');
}

function openInnerHelpInfoDialog(workNo)
{
	return openDialog(workNo, "InnerHelp");
}
function openCallOutDialog()
{
	return openDialog("", "CallOut");
}

function openSetCallDataDialog(workNo)
{
	return openDialog(workNo,"SetCallData");
}

function openQueryCallDataResult(workNo,result)
{
	var arg = new Object();
	arg.win = window;
	arg.str = "CallDataResult";
	arg.workNo = workNo;
	arg.result = result;
	window.showModalDialog("page/agentdialog.html",arg,"dialogWidth=320px;dialogHeight=240px;status=yes;help=no;");
}

function openModPwdDialog()
{
	return openDialog("","ModPwd");
}


function openSwithTypeDialog(workNo)
{
	return openDialog(workNo,"SwitchType");
}


function openLogLevelDialog(workNo)
{
	return openDialog(workNo,"LogLevel");
}


function openLogSaveDaysDialog(workNo)
{
	return openDialog(workNo,"LogSaveDays");
}
















