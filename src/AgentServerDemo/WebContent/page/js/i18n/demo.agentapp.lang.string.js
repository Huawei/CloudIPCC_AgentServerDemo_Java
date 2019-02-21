﻿// language string definition file
// Copyright Huawei Technologies Co., Ltd. 2016. All rights reserved.
/*
 * this file defines the language strings of diference language , 
 * the LangugePageClass has a public interface which returns the language string define page of specified language for self attributed element. 
 *
 * Notice:
 * To Add a new language you need to as following
 * 1. In the LANGUGE_SUPPORT object , add a new member like LANGUAGE_SUPPORT_XXX:"XXX", NOTE That the javascript object members sperated by ","
 * 2. Copy the Language.English object definition, changes to Languge.XXX . Modify the member value to the string of specified string for language XXX
 * 3. In the GetLanguagePage method of LanguagePageClass, add an else if branch which enables the function to return the languagepage of specified language xxx.
 * 4. Done.
 */
//language supported  
LANGUAGE_SUPPORT = {
	LANGUAGE_SUPPORT_CHINESE:"Chinese",
	LANGUAGE_SUPPORT_ENGLISH:"English"
}

//LanguagePageClass
function LanguagePageClass()
{
	// function
	// desc: the function reture the language string define page for specified language
	// params：
	// [IN] language : string of language
	// return： void
	this.GetLanguagePage = function(language){
		if (language === LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_CHINESE){
			return LanguageString.Chinese;
		}
		else if (language === LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_ENGLISH){
			return LanguageString.English;
		}
		else{
			return LanguageString.English;
		}
	}
}

var LanguageString = {};
LanguageString.Chinese = {
    I18N_AGENTAPPDEMO_INITIAL_INTERFACE:"初始化接口:",
    I18N_AGENTAPPDEMO_AGENT_ID:"工号: ",
    I18N_AGENTAPPDEMO_AGENT_PWD:"密码: ",
    I18N_AGENTAPPDEMO_AGENT_STATUS:"座席状态: ",
    I18N_AGENTAPPDEMO_PHONE_NO:"电话号码: ",
    I18N_AGENTAPPDEMO_PHONE_PWD:"密码: ",
    I18N_AGENTAPPDEMO_AGENT_LOGIN:"签入",
    I18N_AGENTAPPDEMO_AGENT_LOGOUT:"签出",
    I18N_AGENTAPPDEMO_AUTO_PICKUP:"自动接听",
    I18N_AGENTAPPDEMO_VIDEO_ABILITY:"视频能力",
    
    I18N_AGENTAPPDEMO_INFO_STATCTRL:"状态管理:",
    I18N_AGENTAPPDEMO_BUSY:"示忙",
    I18N_AGENTAPPDEMO_IDLE:"示闲",
    I18N_AGENTAPPDEMO_WORK:"进入工作态",
    I18N_AGENTAPPDEMO_EXITWORK:"退出工作态",
    I18N_AGENTAPPDEMO_REST:"休息",
    I18N_AGENTAPPDEMO_EXITREST:"退出休息",
    I18N_AGENTAPPDEMO_PUBLISH_NOTICE:"发布公告",
    I18N_AGENTAPPDEMO_SEND_NOTE:"发送便签",
    
    
    I18N_AGENTAPPDEMO_CALLCTRL:"呼叫管理:",
    I18N_AGENTAPPDEMO_VOICE_ANSWER:"呼叫应答",
    I18N_AGENTAPPDEMO_VOICE_RELEASE:"呼叫挂断",
    I18N_AGENTAPPDEMO_AGENT_HOLD:"呼叫保持",
    I18N_AGENTAPPDEMO_AGENT_UNHOLD:"取消保持",
    I18N_AGENTAPPDEMO_PHONE_STATUS:"电话状态",
    I18N_AGENTAPPDEMO_AGENT_MUTE:"静音",
    I18N_AGENTAPPDEMO_AGENT_UNMUTE:"取消静音",
    I18N_AGENTAPPDEMO_AGENT_INNERCALL:"内部呼叫",
    I18N_AGENTAPPDEMO_AGENT_PARTYCALL:"三方通话",
    I18N_AGENTAPPDEMO_AGENT_INNERHELP:"内部求助",
    I18N_AGENTAPPDEMO_AGENT_CALLOUT:"语音外呼",
    I18N_AGENTAPPDEMO_AGENT_TRANSFER:"呼叫转移",
    I18N_AGENTAPPDEMO_AGENT_CALLDATA_SET:"设置随路数据",
    I18N_AGENTAPPDEMO_AGENT_CALLDATA_GET:"查询随路数据",
    
    I18N_AGENTAPPDEMO_WEBCHAT_RELATED:"文字交谈相关:",
    I18N_AGENTAPPDEMO_WEBCHAT_ANSWER:"文字交谈应答:",
    I18N_AGENTAPPDEMO_WEBCHAT_REFUSE:"拒接文字交谈:",
    I18N_AGENTAPPDEMO_WEBCHAT_CLOSE:"关闭文字交谈:",
    I18N_AGENTAPPDEMO_WEBCHAT_INNER:"内部文字交谈:",
    I18N_AGENTAPPDEMO_WEBCHAT_TRANSFER:"转移文字交谈:",
    I18N_AGENTAPPDEMO_WEBCHAT_MESSAGE:"消息:",
    I18N_AGENTAPPDEMO_WEBCHAT_SEND_MESSAGE:"发送",
    I18N_AGENTAPPDEMO_WEBCHAT_CLEAR_HISTORY:"清除聊天记录",
    I18N_AGENTAPPDEMO_ICP20:"ICP2.0特性",
    I18N_AGENTAPPDEMO_UPLOAD_FILE:"上传文件",
    I18N_AGENTAPPDEMO_FILE_PATH:"文件路径",
    I18N_AGENTAPPDEMO_DOWNLOAD_FILE:"下载文件",
    
    I18N_AGENTAPPDEMO_MULTIMEDIA_RELATED:"多媒体相关",
    I18N_AGENTAPPDEMO_CONFERENCE_MEMBERS:"会议成员",
    I18N_AGENTAPPDEMO_CONFERENCE_CREATE:"创建会议",
    I18N_AGENTAPPDEMO_CONFERENCE_INVITE:"邀请加入会议",
    I18N_AGENTAPPDEMO_CONFERENCE_JOIN:"加入会议",
    I18N_AGENTAPPDEMO_CONFERENCE_LEAVE:"离开会议",
    I18N_AGENTAPPDEMO_CONFERENCE_STOP:"结束会议",
    I18N_AGENTAPPDEMO_SHARE_DESKTOP:"桌面共享",
	I18N_AGENTAPPDEMO_SHARE_APPLICATION:"程序共享",
	I18N_AGENTAPPDEMO_START_DESKTOP_SHARE:"开始桌面共享",
	I18N_AGENTAPPDEMO_STOP_DESKTOP_SHARE:"结束桌面共享",
	I18N_AGENTAPPDEMO_ASK_REMOTE_CTRL:"请求远程控制",
	I18N_AGENTAPPDEMO_ALLOW_REMOTE_CTRL:"赋予控制权限",
	I18N_AGENTAPPDEMO_STOP_REMOTE_CTRL:"收回控制权限",
	I18N_AGENTAPPDEMO_REFUSE_REMOTE_CTRL:"拒绝远程控制",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_PATH:"共享文档绝对路径: ",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_START:"发起文档共享",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_SAVE:"保存共享文档",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_STOP:"关闭文档共享",
	I18N_AGENTAPPDEMO_DOCUMENT_LAST_PAGE:"上一页",
	I18N_AGENTAPPDEMO_DOCUMENT_NEXT_PAGE:"下一页",
	
	I18N_AGENTAPPDEMO_INSPECTION_RELATED:"质检相关",
	I18N_AGENTAPPDEMO_INSPECTION_INSPECTEE:"被质检座席:",
	I18N_AGENTAPPDEMO_INSPECTION_INSPECTOR_STATUS:"质检座席状态:",
	I18N_AGENTAPPDEMO_INSPECTION_INSERT:"插入",
	I18N_AGENTAPPDEMO_INSPECTION_SUPERVISE:"侦听",
	I18N_AGENTAPPDEMO_INSPECTION_STOP_INSERT_LISTEN:"取消插入/侦听",
	I18N_AGENTAPPDEMO_INSPECTION_MODE_SWITCH:"插入/侦听/耳语切换",
	I18N_AGENTAPPDEMO_INSPECTION_WHISPER:"请求耳语",
	I18N_AGENTAPPDEMO_INSPECTION_STOP_WHISPER:"停止耳语",
	I18N_AGENTAPPDEMO_INSPECTION_INTERCEPT:"拦截",
	I18N_AGENTAPPDEMO_INSPECTION_AGENT_STATUS:"查看坐席状态",

	I18N_AGENTAPPDEMO_LOG:"日志",
	I18N_AGENTAPPDEMO_LOG_CLEAR:"清空",
	I18N_AGENTAPPDEMO_PHONE_MODE:"话机模式: ",
	I18N_AGENTAPPDEMO_PHONE_MODE1: "外置话机",
	I18N_AGENTAPPDEMO_PHONE_MODE2: "内置VoiceOcx话机",
	I18N_AGENTAPPDEMO_PHONE_MODE3: "内置H5 JS SDK",
	
	
	I18N_AGENTAPPDEMO_TBMODPWD_PASSWORD:"旧密码:",
	I18N_AGENTAPPDEMO_TBMODPWD_NEWPASSWORD:"新密码:",
	I18N_AGENTAPPDEMO_TBMODPWD_CONFIRMPWD:"确认:",										
	I18N_AGENTAPPDEMO_TBMODPWD_OK:"OK",
	I18N_AGENTAPPDEMO_TBRESTINFO_RESTTIME:"休息时间：",
	I18N_AGENTAPPDEMO_TBRESTINFO_RESTREASON:"休息原因：",
	I18N_AGENTAPPDEMO_TBRESTINFO_NOREASON:"无原因",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_TYPE:"公告类型:",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_GROUP:"班组",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_SKILL:"技能队列",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_NAME:"名称:",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_CONTENT:"公告内容:",
	I18N_AGENTAPPDEMO_TBNOTEINFO_RECEIVER:"接收者:",
	I18N_AGENTAPPDEMO_TBNOTEINFO_CONTENT:"便签内容:",
	I18N_AGENTAPPDEMO_TBHOLDLIST_HOLDLIST:"被保持的:",
	I18N_AGENTAPPDEMO_TBHOLDLIST_OK:"OK",
	I18N_AGENTAPPDEMO_TBCALLINFO_CALLINFO:"呼叫信息:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_TYPE:"设备类型:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_WORKNO:"坐席工号",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_SKILL:"技能队列",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_OBJECT:"求助对象:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE:"求助模式:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE_TWO:"两方",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE_THREE:"三方",
	I18N_AGENTAPPDEMO_TBCALLOUTINFO_CALLED:"被叫号码:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE:"设备类型:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_ADDRESS:"转移地址:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE:"转移模式:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE_RELEASE:"释放转",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE_SUCCESS:"成功转",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE:"设备类型:",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_SKILL:"技能队列",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_WORKNO:"业务代表",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_IVR:"IVR",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_ACCESSCODE:"系统接入码",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_CALLOUTNUMBER:"外呼号码",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TRANSFERTYPE:"转移地址",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TRANSFERMODE:"转移模式:",
	I18N_AGENTAPPDEMO_TBINNERCALLINFO_WORKNO:"坐席工号:",
	I18N_AGENTAPPDEMO_TBSETCALLDATA_CALLINFO:"呼叫信息:",
	I18N_AGENTAPPDEMO_TBSETCALLDATA_CALLDATA:"设置随路数据:",
	I18N_AGENTAPPDEMO_TBCALLDATARESULT_CALLDATA:"随路数据:",
	I18N_AGENTAPPDEMO_TBSWITCHTYPEINFO_SWITCHTYPE:"转换状态:",
	
	
	I18N_AGENTAPPDEMO_TRANSFER_RELEASE:"释放转",
    I18N_AGENTAPPDEMO_TRANSFER_HOLD:"挂起转",
    I18N_AGENTAPPDEMO_TRANSFER_SUCCESS:"成功转",
    I18N_AGENTAPPDEMO_TRANSFER_THREE:"三方转",
    I18N_AGENTAPPDEMO_TRANSFER_TALKING:"通话转",
    I18N_AGENTAPPDEMO_TRANSFER_CERTAIN:"指定转",
    
    I18N_AGENTAPPDEMO_QUALITY_INSERT:"插入",
    I18N_AGENTAPPDEMO_QUALITY_MONITOR:"侦听",
    I18N_AGENTAPPDEMO_QUALITY_WHISPER:"耳语",
    
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE_WORKNO:"业务代表",
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE_SKILL:"技能队列",
	
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_UNKNOWN:"未知",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SIGNIN:"签入状态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SIGNOUT:"签出状态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_BUSY:"示忙状态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_IDLE:"空闲状态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_WORKING:"整理态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SAME_IDE:"同空闲态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_TALKING:"通话态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_REST:"休息状态",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_INSERT:"插入",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_MONITOR:"侦听",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_WHISPER:"耳语",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS:"质检座席状态：",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_MONITORED_AGENTSTATUS:"被质检座席状态：",
	
	I18N_AGENTAPPDEMO_PAGE_CURRENTPAGE:"当前页数：",
	I18N_AGENTAPPDEMO_PAGE_TOTALPAGES:"总页数：",
	
	I18N_AGENTAPPDEMO_ICP20_CHOOSEFILE:"浏览",
    I18N_AGENTAPPDEMO_ICP20_UPLOAD:"上传文件",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_WORKNO:"座席工号",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_NAME:"名称",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS:"座席状态",

    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SUPERVISE:"侦听",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_INSERT:"插入",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_WHISPER:"耳语",
    
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_UNKNOW:"未知",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNIN:"签入状态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNOUT:"签出状态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_BUSY:"示忙态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_IDLE:"示闲态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_ACW:"整理态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SAMEASIDLE:"同空闲态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_TALKING:"通话态",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_REST:"休息状态",
	
}
LanguageString.English = {
    I18N_AGENTAPPDEMO_INITIAL_INTERFACE:"Initialize Interface",
    I18N_AGENTAPPDEMO_AGENT_ID:"AgentID: ",
    I18N_AGENTAPPDEMO_AGENT_PWD:"AgentPwd: ",
	I18N_AGENTAPPDEMO_AGENT_STATUS:"Agent Status: ",
	I18N_AGENTAPPDEMO_PHONE_NO:"PhoneNo",
    I18N_AGENTAPPDEMO_AGENT_LOGIN:"Login",
    I18N_AGENTAPPDEMO_AGENT_LOGOUT:"Logout",
    I18N_AGENTAPPDEMO_PHONE_PWD:"PhonePwd",
    I18N_AGENTAPPDEMO_AUTO_PICKUP:"Auto Answer",
    I18N_AGENTAPPDEMO_VIDEO_ABILITY:"Video Ability",
    
    I18N_AGENTAPPDEMO_INFO_STATCTRL:"Status Management:",
    I18N_AGENTAPPDEMO_BUSY:"Busy",
    I18N_AGENTAPPDEMO_IDLE:"Idle",
    I18N_AGENTAPPDEMO_WORK:"Work",
    I18N_AGENTAPPDEMO_EXITWORK:"ExitWork",
    I18N_AGENTAPPDEMO_REST:"Rest",
    I18N_AGENTAPPDEMO_EXITREST:"ExitRest",
    I18N_AGENTAPPDEMO_PUBLISH_NOTICE:"Publish Notice",
    I18N_AGENTAPPDEMO_SEND_NOTE:"Send Note",
    
    I18N_AGENTAPPDEMO_CALLCTRL:"Call Management:",
    I18N_AGENTAPPDEMO_VOICE_ANSWER:"Answer",
    I18N_AGENTAPPDEMO_VOICE_RELEASE:"Hangup",
    I18N_AGENTAPPDEMO_AGENT_HOLD:"Hold",
    I18N_AGENTAPPDEMO_AGENT_UNHOLD:"Unhold",
    I18N_AGENTAPPDEMO_AGENT_MUTE:"Mute",
    I18N_AGENTAPPDEMO_AGENT_UNMUTE:"UnMute",
    I18N_AGENTAPPDEMO_AGENT_INNERCALL:"Inner Call",
    I18N_AGENTAPPDEMO_AGENT_PARTYCALL:"Third Party Call",
    I18N_AGENTAPPDEMO_AGENT_INNERHELP:"Inner Help",
    I18N_AGENTAPPDEMO_AGENT_CALLOUT:"Call Out",
    I18N_AGENTAPPDEMO_AGENT_TRANSFER:"Transfer",
    I18N_AGENTAPPDEMO_AGENT_CALLDATA_SET:"Set Call Data",
    I18N_AGENTAPPDEMO_AGENT_CALLDATA_GET:"Get Call Data",
    
    I18N_AGENTAPPDEMO_WEBCHAT_RELATED:"WebChat-related:",
    I18N_AGENTAPPDEMO_WEBCHAT_ANSWER:"Answer WebChat",
    I18N_AGENTAPPDEMO_WEBCHAT_REFUSE:"Refuse WebChat",
    I18N_AGENTAPPDEMO_WEBCHAT_CLOSE:"Close WebChat",
    I18N_AGENTAPPDEMO_WEBCHAT_INNER:"Inner WebChat",
    I18N_AGENTAPPDEMO_WEBCHAT_TRANSFER:"Transfer WebChat",
    I18N_AGENTAPPDEMO_WEBCHAT_MESSAGE:"Message:",
    I18N_AGENTAPPDEMO_WEBCHAT_SEND_MESSAGE:"SendMessage",
    I18N_AGENTAPPDEMO_WEBCHAT_CLEAR_HISTORY:"ClearChatHistory",
    I18N_AGENTAPPDEMO_ICP20:"ICP2.0 Speciality",
    I18N_AGENTAPPDEMO_UPLOAD_FILE:"Upload File",
    I18N_AGENTAPPDEMO_FILE_PATH:"File Path:",
    I18N_AGENTAPPDEMO_DOWNLOAD_FILE:"Download File",
    
    I18N_AGENTAPPDEMO_MULTIMEDIA_RELATED:"Multimedia-Related:",
	I18N_AGENTAPPDEMO_CONFERENCE_MEMBERS:"Conf MemberList:",
    I18N_AGENTAPPDEMO_CONFERENCE_CREATE:"Create Conference",
    I18N_AGENTAPPDEMO_CONFERENCE_INVITE:"Invite Conference",
    I18N_AGENTAPPDEMO_CONFERENCE_JOIN:"Join Conference",
    I18N_AGENTAPPDEMO_CONFERENCE_LEAVE:"Leave Conference",
    I18N_AGENTAPPDEMO_CONFERENCE_STOP:"Stop Conference",
	I18N_AGENTAPPDEMO_SHARE_DESKTOP:"Share Desktop",
	I18N_AGENTAPPDEMO_SHARE_APPLICATION:"Share Application",
	I18N_AGENTAPPDEMO_START_DESKTOP_SHARE:"Start DesktopShare",
	I18N_AGENTAPPDEMO_STOP_DESKTOP_SHARE:"Stop DesktopShare",
	I18N_AGENTAPPDEMO_ASK_REMOTE_CTRL:"Ask RemoteCtrl",
	I18N_AGENTAPPDEMO_ALLOW_REMOTE_CTRL:"Authorize RemoteCtrl",
	I18N_AGENTAPPDEMO_STOP_REMOTE_CTRL:"Revoke RemoteCtrl",
	I18N_AGENTAPPDEMO_STOP_REMOTE_CTRL:"Refuse RemoteCtrl",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_PATH:"Absolute Document Path For Sharing: ",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_START:"Start Document Sharing",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_SAVE:"Save Document",
	I18N_AGENTAPPDEMO_DOCUMENT_SHARE_STOP:"Stop Document Sharing",
	I18N_AGENTAPPDEMO_DOCUMENT_LAST_PAGE:"Last Page",
	I18N_AGENTAPPDEMO_DOCUMENT_NEXT_PAGE:"Next Page",
	
	I18N_AGENTAPPDEMO_INSPECTION_RELATED:"Inspection-Related",
	I18N_AGENTAPPDEMO_INSPECTION_INSPECTEE:"Inspectee:",
	I18N_AGENTAPPDEMO_INSPECTION_INSPECTOR_STATUS:"Inspector Status:",
	I18N_AGENTAPPDEMO_INSPECTION_INSERT:"Insert",
	I18N_AGENTAPPDEMO_INSPECTION_SUPERVISE:"Supervise",
	I18N_AGENTAPPDEMO_INSPECTION_STOP_INSERT_LISTEN:"Stop Insert/Supervise",
	I18N_AGENTAPPDEMO_INSPECTION_MODE_SWITCH:"Switch Insert/Supervise/Whisper",
	I18N_AGENTAPPDEMO_INSPECTION_WHISPER:"Whisper",
	I18N_AGENTAPPDEMO_INSPECTION_STOP_WHISPER:"Stop Whisper",
	I18N_AGENTAPPDEMO_INSPECTION_INTERCEPT:"Intercept",
	I18N_AGENTAPPDEMO_INSPECTION_AGENT_STATUS:"Agent Status",
	
	I18N_AGENTAPPDEMO_LOG:"LOG",
	I18N_AGENTAPPDEMO_LOG_CLEAR:"Clear Log",
	I18N_AGENTAPPDEMO_PHONE_MODE:"PhoneMode: ",
	I18N_AGENTAPPDEMO_PHONE_MODE1: "External Phone",
	I18N_AGENTAPPDEMO_PHONE_MODE2: "Use VoiceOcx",
	I18N_AGENTAPPDEMO_PHONE_MODE3: "Use H5_JS_SDK",
		
	I18N_AGENTAPPDEMO_TBMODPWD_PASSWORD:"Old Password:",
	I18N_AGENTAPPDEMO_TBMODPWD_NEWPASSWORD:"New Password:",
	I18N_AGENTAPPDEMO_TBMODPWD_CONFIRMPWD:"Confirm:",										
	I18N_AGENTAPPDEMO_TBMODPWD_OK:"OK",
	I18N_AGENTAPPDEMO_TBRESTINFO_RESTTIME:"RestTime：",
	I18N_AGENTAPPDEMO_TBRESTINFO_RESTREASON:"RestReason：",
	I18N_AGENTAPPDEMO_TBRESTINFO_NOREASON:"NoReason",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_TYPE:"NoticeType:",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_GROUP:"Group",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_SKILL:"Skill",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_NAME:"Name:",
	I18N_AGENTAPPDEMO_TBNOTICEINFO_CONTENT:"NoticeContent:",
	I18N_AGENTAPPDEMO_TBNOTEINFO_RECEIVER:"Receiver:",
	I18N_AGENTAPPDEMO_TBNOTEINFO_CONTENT:"Content:",
	I18N_AGENTAPPDEMO_TBHOLDLIST_HOLDLIST:"HoldList:",
	I18N_AGENTAPPDEMO_TBHOLDLIST_OK:"OK",
	I18N_AGENTAPPDEMO_TBCALLINFO_CALLINFO:"CallInfo:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_TYPE:"Type:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_WORKNO:"WorkNo",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_SKILL:"Skill",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_OBJECT:"Help Object:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE:"Help Type:",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE_TWO:"Two",
	I18N_AGENTAPPDEMO_TBINNERHELPINFO_HELP_TYPE_THREE:"Three",
	I18N_AGENTAPPDEMO_TBCALLOUTINFO_CALLED:"Called:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE:"Device Type:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_ADDRESS:"TransferAddress:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE:"TransferMode:",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE_RELEASE:"Release",
	I18N_AGENTAPPDEMO_TBTRANSINFO_MODE_SUCCESS:"Success",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE:"Device Type:",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_SKILL:"Skill",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_WORKNO:"WorkNo",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_IVR:"IVR",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_ACCESSCODE:"AccessCode",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TYPE_CALLOUTNUMBER:"CallOutNumber",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TRANSFERTYPE:"TransferType",
	I18N_AGENTAPPDEMO_TBVOICETRANSINFO_TRANSFERMODE:"TransferMode:",
	I18N_AGENTAPPDEMO_TBINNERCALLINFO_WORKNO:"WorkNo:",
	I18N_AGENTAPPDEMO_TBSETCALLDATA_CALLINFO:"CallInfo:",
	I18N_AGENTAPPDEMO_TBSETCALLDATA_CALLDATA:"CallData:",
	I18N_AGENTAPPDEMO_TBCALLDATARESULT_CALLDATA:"CallData:",
	I18N_AGENTAPPDEMO_TBSWITCHTYPEINFO_SWITCHTYPE:"SwitchType:",
	
	I18N_AGENTAPPDEMO_TRANSFER_RELEASE:"Release Transfer",
    I18N_AGENTAPPDEMO_TRANSFER_HOLD:"Blocked Transfer",
    I18N_AGENTAPPDEMO_TRANSFER_SUCCESS:"Success Transfer",
    I18N_AGENTAPPDEMO_TRANSFER_THREE:"Three-party Transfer",
    I18N_AGENTAPPDEMO_TRANSFER_TALKING:"Consultation transfer",
    I18N_AGENTAPPDEMO_TRANSFER_CERTAIN:"Designated transfer",
    
    I18N_AGENTAPPDEMO_QUALITY_INSERT:"Insert",
    I18N_AGENTAPPDEMO_QUALITY_MONITOR:"Supervise",
    I18N_AGENTAPPDEMO_QUALITY_WHISPER:"Whisper",
    
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE_WORKNO:"WorkNo",
	I18N_AGENTAPPDEMO_TBTRANSINFO_TYPE_SKILL:"Skill",
	
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_UNKNOWN:"Unkown",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SIGNIN:"Login",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SIGNOUT:"Logout",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_BUSY:"Busy",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_IDLE:"Idle",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_WORKING:"Working",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_SAME_IDE:"Same as idle",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_TALKING:"Talking",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_REST:"Rest",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_INSERT:"Insert",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_MONITOR:"Monitor",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS_WHISPER:"Whisper",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_AGENTSTATUS:"Monitor agent status：",
	I18N_AGENTAPPDEMO_QUALITYCONTROL_MONITORED_AGENTSTATUS:"Monitored agent status：",
	
	I18N_AGENTAPPDEMO_PAGE_CURRENTPAGE:"Currentpage：",
	I18N_AGENTAPPDEMO_PAGE_TOTALPAGES:"Totalpages：",
	
	I18N_AGENTAPPDEMO_ICP20_CHOOSEFILE:"Browse",
    I18N_AGENTAPPDEMO_ICP20_UPLOAD:"Upload",
    
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_WORKNO:"workNo",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_NAME:"Name",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS:"Status",
    
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SUPERVISE:"supervise",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_INSERT:"insert",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_WHISPER:"whisper",
    
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_UNKNOW:"unknown",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNIN:"sign-in",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SIGNOUT:"sign-out ",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_BUSY:"busy",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_IDLE:"idle",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_ACW:"acw",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_SAMEASIDLE:"same as idle",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_TALKING:"talking",
    I18N_AGENTAPPDEMO_QUALITY_AGENTSTATUS_STATUS_REST:"rest",

}