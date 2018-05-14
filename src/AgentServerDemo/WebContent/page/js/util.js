function IsNullOrBlank(obj)
{
	if (obj == undefined || obj == null)
	{
    	return true;
	}
	else if (typeof(obj) == "string")
	{
		if (trimStr(obj) == "")
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}

function trimStr(str)
{
	return str.replace(/(^[\s|　]*)|([\s|　]*$)/g, ""); 
}

//agent number validate 
function isValidWorkNo(input)
{
	if (IsNullOrBlank(input))
	{
		alert("Agent have not logged in!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[1-9][\\d]{0,3}|[1-5][\\d]{4}$");
	if (!v.test(input))
	{
		alert("Agent number format wrong!");
		return false;
	}
	return true;
}

//phone number validate 
function isValidPhoneNum(input)
{
	if (IsNullOrBlank(input))
	{
		alert("Phone number cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[0-9*#]{0,24}$");
	if (!v.test(input))
	{
		alert("Phone must be 0-24 digit number or * #!");
		return false;
	}
	return true;
}

//password validate 
function isValidPassword(input)
{
	var v = new RegExp();
	v.compile("^.{8,32}$");
	if (!v.test(input))
	{
		alert("Password length must be 0-32!");
		return false;
	}
	return true;
}

//devicetype validate, value: 1 or 2 
function isValidDeviceType(input)
{
	if (IsNullOrBlank(input))
	{
		alert("DeviceType cannot be null!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[1|2]$");
	if (!v.test(input))
	{
		alert("DeviceType must be 1 or 2 !");
		return false;
	}
	return true;
}

//help mode validate , value: 1 or 2 
function isValidMode(input)
{
	if (IsNullOrBlank(input))
	{
		alert("HelpMode cannot be null!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[1|2]$");
	if (!v.test(input))
	{
		alert("HelpMode must be 1 or 2 !");
		return false;
	}
	return true;
}


//transfer address validate
function isTransferAddress(input)
{
	if (IsNullOrBlank(input))
	{
		alert("transfer address cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[0-9*#]{0,24}$");
	if (!v.test(input))
	{
		alert("Phone must be 0-24 digit number or * #");
		return false;
	}
	return true;
}
//restTime validate
function isValidRestTime(input)
{
	if (IsNullOrBlank(input))
	{
		alert("rest time cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[0-9]*$");
	if (!(v.test(input) && input >= 1 && input <= 86399))
	{
		alert("RestTime should be Int between 1 and 86399");
		return false;
	}
	return true;
}

//log print
function writeLog(content)
{
    var oldValue = $("#LogInfo").val();
    var time = getNowTime();
    $("#LogInfo").val(oldValue + "["+time+"][" + global_workNo + "]: " + content + "\n\n");
}

//log clear
function clearLog()
{
    $("#LogInfo").val("");
}

function getNowTime()
{
	var date = new Date();
	return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}
