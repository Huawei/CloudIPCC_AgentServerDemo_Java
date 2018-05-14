//  get agent event
var getEventLisnter = function()
{
    if (global_workNo == "")
    {
        return;
    }
    
    $.post('/'+WEB_NAME+'/event.do', 
    {
        identityMark : global_workNo
    },
    function(data)
    {
        try
        {
        	if (data == null || data == "")
            {
                setTimeout("getEventLisnter()", 500);
                return;
            }
        	
            var event = JSON.parse(data);
            if (event == undefined || null == event || event.length == 0)
            {
                setTimeout("getEventLisnter()", 500);
                return;
            }
            /*
             * net work error or force logout by monitor, get RELOGIN mark.
             * next login request get net work error remind.
             */
            if ("RELOGIN"==event.message)
        	{
            	Process_ExceptionLogout();
        	}
            
            var eventType = event.eventType;
            if (eventType == undefined || null == eventType || eventType.length == 0)
            {
                setTimeout('getEventLisnter()', 500);
                return;
            }
            eventHandle(event);
            getEventLisnter();
        }
        catch(err)
        {
            setTimeout('getEventLisnter()', 500);
        }
    });    
};

//eventHandle
function eventHandle(event)
{
    var eventType = event.eventType;
    writeLog(JSON.stringify(event));
    switch(eventType)
    {
        case "AgentOther_InService":  //Login Success
            Process_IN_SERVER();
            break;
            
        case "AgentState_Ready":                   // Idle
        case "AgentState_Force_Ready":             // Force Idle
        case "AgentState_CancelNotReady_Success":  // Quitting the Busy State Successfully                
        case "AgentState_CancelRest_Success":      // Quitting the Rest State Successfully
        case "AgentState_CancelWork_Success":      // Quitting the Working State
            Process_READY();
            break;
          
        case "AgentState_Busy":                     // Busy
        case "AgentState_SetNotReady_Success":      // Indicating Busy Successfully
        case "AgentState_Force_SetNotReady":        // Forcing To Enter the Busy State Successfully   
            Process_notReady();
            break;    
            
        case "AgentState_SetWork_Success":          // Turning to the Working State
        case "AgentState_Work":                     // Working
            Process_Work();
            break;
            
        case "AgentState_SetRest_Success" :         // Indicates that an agent's rest request is approved
             Process_Rest();
        	break;
        	
        case "AgentChat_Ring":                      // Ringing Before a Text Chat
            Process_Ring(event.content);
            break;

        case "AgentChat_Connected":                 // Text Chat Session Connected
            Process_Connected(event.content);
            break;
            	
        case "AgentChat_DataRecved":                // Obtaining Messages During a Text Chat
            Process_RECEIVEDATA(event.content.sender,event.content.callId,event.content.chatContent);
            break;
        
        case "AgentChat_Disconnected":              // Text Chat Session Disconnected
            Process_Disconnected(event.content);
            break;        
        
        case "AgentEvent_Auto_Answer" :             // Automatic Answering a Call        
        case "AgentEvent_Ringing" :                 // Incoming Call Reminder
        	Process_Ringing(event.content);
        	break;
       
        case "AgentEvent_Talking" :                 // Turning to the Talking State
        	Process_Talking(event.content);
            break;
        case "AgentEvent_Hold" :                    // Holding a Call Successfully
        	Process_Hold();
        	break;
        case "AgentEvent_Call_Release" :            // Agent Exiting a Call
        	Process_Release(event.content);
        	break;
        case "AgentEvent_JoinConf" :                // This is a conference message notification event occurred after 
        	                                        //the conference resources are successfully applied.
        	Process_JoinConf(event.content);
        	break;
        default:
            break;        
    }

}







