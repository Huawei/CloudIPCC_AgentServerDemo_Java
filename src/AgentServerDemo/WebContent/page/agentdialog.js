function openDialog(workNo,dialogType)
{
	var arg = new Object();
	arg.win = window;
	arg.str = dialogType;
	arg.workNo = workNo;
	var ret = window.showModalDialog("page/agentdialog.html",arg,"dialogWidth=320px;dialogHeight=240px;status=yes;help=no;");
	return ret;
}

function openRestInfoDialog(workNo)
{
	return openDialog(workNo,'Rest');
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
















