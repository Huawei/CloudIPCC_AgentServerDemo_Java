// universal module definition
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TUPDeamon = factory();
    }
}(this, function() {
    function TUPDeamon(opts) {
        this.notifyFuncs = new Array();
        this.sdk = opts.sdk;
        var callServiceAddr = "127.0.0.1";
        var pcol = "ws://";
        if (document.location.protocol.indexOf("https") != -1) {
        	if (opts.isHttp) {
        		callServiceAddr = "127.0.0.1";
                pcol = "ws://";
        	} else {
        		callServiceAddr = "localhost.cloudec.huaweicloud.com";
                pcol = "wss://";
        	}
        }
        this.serviceStatus = 2;
        
        this.notifyFuncs[1] = opts.sdk.serviceStartUp;
        this.notifyFuncs[2] = opts.sdk.serviceShutDown;
        this.notifyFuncs[3] = opts.sdk.serviceRecover;
        
        if (typeof MozWebSocket != "undefined") {
            this.wsocket = new MozWebSocket(pcol + callServiceAddr + ":7682", "protocol_ws_deamon_service");
        } else {
            try {
				this.wsocket = new WebSocket(pcol + callServiceAddr + ":7682", "protocol_ws_deamon_service");
			} catch (e) {
				opts.close();
				console.error(e);
				return;
			}
        }
        
        this.doServiceStartUp = function(){
        	if (this.serviceStatus != 1)
        	{
        		opts.sdk.serviceStartUp(this.sdk, "doServiceStartUp");
        	}
        }.bind(this);
        
        this.wsocket.onopen = opts.ready;
        this.wsocket.onclose = opts.close;
        this.wsocket.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            if (data.notify > 0) {
                data.notify = data.notify & 0x7fff;
                if (typeof this.notifyFuncs[data.notify] == "function") {
                    if (data.notify == 1 || data.notify == 2 || data.notify == 3) {
                    	console.log(new Date() + msg.data);
                    	if (this.serviceStatus != 1)
                    	{
                    		this.serviceStatus = data.notify;
                            this.notifyFuncs[data.notify](this.sdk, data);
                    	}
                    	
                    }
                }
            }
        }.bind(this);
    };
    return TUPDeamon;
}));
// universal module definition
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TUPLogin = factory();
    }
}(this, function() {
    function TUPLogin(opts) {
        this.rspFuncs = new Array();
        var callServiceAddr = "127.0.0.1";
        var pcol = "ws://";
        if (document.location.protocol.indexOf("https") != -1) {
        	if (opts.isHttp) {
        		callServiceAddr = "127.0.0.1";
                pcol = "ws://";
        	} else {
        		callServiceAddr = "localhost.cloudec.huaweicloud.com";
                pcol = "wss://";
        	}
        }
        if (typeof MozWebSocket != "undefined") {
            this.wsocket = new MozWebSocket(pcol + callServiceAddr + ":7684", "tup_login_service_protocol");
        } else {
            this.wsocket = new WebSocket(pcol + callServiceAddr + ":7684", "tup_login_service_protocol");
        }
        this.wsocket.onopen = opts.ready;
        this.wsocket.onclose = opts.close;
        this.wsocket.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            if (data.rsp > 0) {
                var rspIdx = data.rsp & 0x7fff;
                if (typeof this.rspFuncs[rspIdx] == "function") {
                    //console.log(msg.data);
                    if (data.result != 0) {
                        var offset_call = 100000000;
                        data.result = data.result + offset_call;
                    }
                    this.rspFuncs[rspIdx](data);
                }
            }
        }.bind(this);

    };

    TUPLogin.prototype.sendData = function(data) {
        var sendStr = JSON.stringify(data);
        this.wsocket.send(sendStr);
    };

    TUPLogin.prototype.setGetBestLocalIp = function(serverIp, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[24] = callbacks.response;
        }
        var data = {
            "cmd": 327704,
            "description": "tup_login_get_local_ip",
            "param": {
                server: serverIp
            }
        };
        this.sendData(data);
    };
    return TUPLogin;
}));


// universal module definition
/**
 * [en]This module is about audio and video call
 * [cn]音视频呼叫模块
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.TUPCall = factory();
    }
}(this, function() {
    function TUPCall(opts) {
        this.section_id = 0x10000;
        this.name = "Call";
        this.notifyFuncs = new Array();
        this.rspFuncs = new Array();
        var callServiceAddr = "127.0.0.1";
        var pcol = "ws://";
        if (document.location.protocol.indexOf("https") != -1) {
        	if (opts.isHttp) {
        		callServiceAddr = "127.0.0.1";
                pcol = "ws://";
        	} else {
        		callServiceAddr = "localhost.cloudec.huaweicloud.com";
                pcol = "wss://";
        	}
        }
        if (typeof MozWebSocket != "undefined") {
            this.wsocket = new MozWebSocket(pcol + callServiceAddr + ":7684", "tup_call_service_protocol");
        } else {
            this.wsocket = new WebSocket(pcol + callServiceAddr + ":7684", "tup_call_service_protocol");
        }
		this.onVersionInfoNotify = opts.onVersionInfoNotify;
        this.wsocket.onopen = opts.ready;
        this.wsocket.onclose = opts.close;
        this.wsocket.onerror = function(e) { console.log(e); }
        this.wsocket.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            //过滤掉“CALL_E_EVT_NET_QUALITY_CHANGE CALL_E_EVT_STATISTIC_NETINFO CALL_E_EVT_STATISTIC_LOCAL_QOS”等频繁上报消息
            /*if (((data.notify < 0x18011 || data.notify > 0x18015) && data.notify != 0x1801c) || data.rsp > 0) {
                console.log(msg.data);
            }*/
            this.msgProcessor(data);
        }.bind(this);


        this.sendNotifyMsg = opts.notify;
        this.sendRspMsg = opts.response;
    };

    TUPCall.prototype.msgProcessor = function(data) {
        if (data.notify > 0) {
            data.notify = data.notify & 0x7fff;
            if (typeof this.notifyFuncs[data.notify] == "function") {
                this.notifyFuncs[data.notify](data);
            }
        }
        if (data.rsp > 0) {
            var rspIdx = data.rsp & 0x7fff;
            if (typeof this.rspFuncs[rspIdx] == "function") {
                if (data.result != 0) {
                    var offset_call = 200000000;
                    data.result = data.result + offset_call;
                }
                this.rspFuncs[rspIdx](data);
                
                if (rspIdx == 1 && data.description == "tup_call_init"
					&& typeof this.onVersionInfoNotify == "function")
				{
					var newData = {};
					newData.description = "CALL_E_EVT_VERSION_INFO";
					newData.param = {};
					newData.param.compile_date = data.param.compile_date;
					newData.param.compile_time = data.param.compile_time;
					newData.param.version = data.param.version;
					this.onVersionInfoNotify(newData);
				}
                
				if (data.rsp == 65537 && data.description == "tup_call_config"
					&& typeof this.onVersionInfoNotify == "function")
				{
					if(data.param != null) {
						if(data.param.version != null) {
							this.onVersionInfoNotify(data.param.version);
						}
					}
				}
            }
        }
    }



    /**
     * [en]This function is used to send data to lower layer
     * [cn]发送数据给下层
     */
    TUPCall.prototype.sendData = function(data) {
        var sendStr = JSON.stringify(data);
        this.wsocket.send(sendStr);
    };

    /**
     * [en]This function is used to start the log
     * [cn]开启日志
     */
    TUPCall.prototype.logStart = function(log_level, max_size, file_count, log_path, callbacks) {
            if (callbacks && typeof callbacks.response == "function") {
                this.rspFuncs[0x4C] = callbacks.response;
            }
            var data = {
                "cmd": 0x1004C,
                "description": "tup_call_log_start",
                "param": {
                    "log_level": log_level,
                    "max_size": max_size,
                    "file_count": file_count,
                    "log_path": log_path
                }
            };
            this.sendData(data);
        }
        /**
         * [en]This function is used to set service configuration
         * [cn]设置业务配置
         */
    TUPCall.prototype.config = function(params, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x1] = callbacks.response;
        }
        var data = {
            "cmd": 0x10001,
            "description": "tup_call_config",
            "param": params
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to register VoIP account
     * [cn]注册VoIP账号
     */
    TUPCall.prototype.register = function(sip_num, sip_name, sip_pwd, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x2] = callbacks.response;
        }
        if (callbacks && typeof callbacks.onRegStatusUpdate == "function") {
            this.notifyFuncs[1] = callbacks.onRegStatusUpdate;
        }
        if (callbacks && typeof callbacks.onForceUnReg == "function") {
            this.notifyFuncs[131] = callbacks.onForceUnReg;
        }
        var data = {
            "cmd": 0x10002,
            "description": "tup_call_register",
            "param": {
                "name": sip_name,
                "number": sip_num,
                "pwd": sip_pwd
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to deregister sip
     * [cn]注销VoIP账号
     */
    TUPCall.prototype.deRegister = function(sip_num, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x3] = callbacks.response;
        }
        var data = {
            "cmd": 0x10003,
            "description": "tup_call_deregister",
            "param": {
                "number": sip_num
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set basic call event
     * [cn]设置基本呼叫事件
     */
    TUPCall.prototype.setBasicCallEvent = function(callbacks) {
        if (callbacks && typeof callbacks.onCallIncoming == "function") {
            this.notifyFuncs[3] = callbacks.onCallIncoming;
        }
        if (callbacks && typeof callbacks.onCallOutGoing == "function") {
            this.notifyFuncs[4] = callbacks.onCallOutGoing;
        }
        if (callbacks && typeof callbacks.onCallRingBack == "function") {
            this.notifyFuncs[5] = callbacks.onCallRingBack;
        }
        if (callbacks && typeof callbacks.onCallConnected == "function") {
            this.notifyFuncs[6] = callbacks.onCallConnected;
        }
        if (callbacks && typeof callbacks.onCallEnded == "function") {
            this.notifyFuncs[7] = callbacks.onCallEnded;
        }
        if (callbacks && typeof callbacks.onCallRtpCreated == "function") {
            this.notifyFuncs[9] = callbacks.onCallRtpCreated;
        }
        if (callbacks && typeof callbacks.onCallEndedFailed == "function") {
            this.notifyFuncs[43] = callbacks.onCallEndedFailed;
        }
        
        if (callbacks && typeof callbacks.onAudioDeviceChanged == "function") {
            this.notifyFuncs[240] = callbacks.onAudioDeviceChanged;
        }
    }


    /**
     * [en]This function is used to start call
     * [cn]发起呼叫
     */
    TUPCall.prototype.startCall = function(callee_num, is_video_call, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x4] = callbacks.response;
        }
        var data = {
            "cmd": 0x10004,
            "description": "tup_call_start_call",
            "param": {
                "callee_num": callee_num,
                "call_type": (is_video_call || 0)
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to accept call
     * [cn]接听呼叫
     */
    TUPCall.prototype.acceptCall = function(callid, is_video_call, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x5] = callbacks.response;
        }
        var data = {
            "cmd": 0x10005,
            "description": "tup_call_accept_call",
            "param": {
                "call_id": callid,
                "is_video": (is_video_call || 0)
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to end call
     * [cn]结束通话或者其他用户来电
     */
    TUPCall.prototype.endCall = function(callid, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x6] = callbacks.response;
        }
        var data = {
            "cmd": 0x10006,
            "description": "tup_call_end_call",
            "param": {
                "call_id": callid
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to send secondary call message during the call.
     * [cn]在通话中发送二次拨号信息
     */
    TUPCall.prototype.dtmf = function(callid, keyTone, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x7] = callbacks.response;
        }
        var tone;
        if (isNaN(keyTone)) {
            if (keyTone == "*") { tone = 10; }
            if (keyTone == "#") { tone = 11; }
        } else {
            tone = Number(keyTone);
        }
        var data = {
            "cmd": 0x10007,
            "description": "tup_call_dtmf",
            "param": {
                "call_id": callid,
                "dtmf_tone": tone
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set whether mute the microphone
     * [cn]设置(或取消)麦克风静音
     */
    TUPCall.prototype.operateMic = function(callid, to_mute, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x8] = callbacks.response;
        }
        var data = {
            "cmd": 0x10008,
            "description": "tup_call_media_mute_mic",
            "param": {
                "call_id": callid,
                "is_on": to_mute
            }
        };
        this.sendData(data);
    };


    /**
     * [en]This function is used to get microphone volume
     * [cn]获取麦克风音量
     */
    TUPCall.prototype.getMicVol = function(callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0xa] = callbacks.response;
        }

        var data = {
            "cmd": 0x1000a,
            "description": "tup_call_media_get_mic_volume"
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set microphone volume
     * [cn]设置麦克风音量
     */
    TUPCall.prototype.setMicVol = function(volume, device, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0xb] = callbacks.response;
        }
        var data = {
            "cmd": 0x1000b,
            "description": "tup_call_media_set_mic_volume",
            "param": {
                "device": device || 1,
                "volume": volume
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to get speaker volume
     * [cn]获取扩音器音量
     */
    TUPCall.prototype.getSpkVol = function(callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0xc] = callbacks.response;
        }

        var data = {
            "cmd": 0x1000c,
            "description": "tup_call_media_get_speak_volume"
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set speaker volume
     * [cn]设置扩音器音量
     */
    TUPCall.prototype.setSpkVol = function(volume, device, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0xd] = callbacks.response;
        }
        var data = {
            "cmd": 0x1000d,
            "description": "tup_call_media_set_speak_volume",
            "param": {
                "device": device || 0,
                "volume": volume
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to notify the other side that this side is ringing.
     * [cn]通知对方本方正在振铃
     */
    TUPCall.prototype.alertingCall = function(callid, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x10] = callbacks.response;
        }
        var data = {
            "cmd": 0x10010,
            "description": "tup_call_alerting_call",
            "param": {
                "call_id": callid
            }
        };
        this.sendData(data);
    };


    /**
     * [en]This function is used to play local audio file 
     * [cn]播放本地音频文件
     */
    TUPCall.prototype.startPlayMediaFile = function(path, loop_times, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x25] = callbacks.response;
        }
        var data = {
            "cmd": 0x10025,
            "description": "tup_call_media_startplay",
            "param": {
                "play_file": path,
                "loops": loop_times || 0 //播放次数，默认循环播放
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to stop play media file
     * [cn]停止铃音播放
     */
    TUPCall.prototype.stopPlayMediaFile = function(play_handle, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x27] = callbacks.response;
        }
        var data = {
            "cmd": 0x10027,
            "description": "tup_call_media_stopplay",
            "param": {
                "play_handle": play_handle
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to get media devices type
     * [cn]获取媒体设备类型
     */
    TUPCall.prototype.getMediaDevices = function(type, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x32] = callbacks.response;
        }
        var data = {
            "cmd": 0x10032,
            "description": "tup_call_media_get_devices",
            "param": {
                "device_type": type
            }
        };
        this.sendData(data);
    }


    /**
     * [en]This function is used to set whether pause the video device.
     * [cn]设置(或取消)暂停视频设备输入(视频采集)
     */
    TUPCall.prototype.mediaMuteVideo = function(callid, is_on, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x22] = callbacks.response;
        }
        var data = {
            "cmd": 0x10022,
            "description": "tup_call_media_mute_video",
            "param": {
                "call_id": callid,
                "is_on": is_on
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set microphone device index 
     * [cn]设置使用的麦克风设备序号
     */
    TUPCall.prototype.setMicIndex = function(idx, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x28] = callbacks.response;
        }
        var data = {
            "cmd": 0x10028,
            "description": "tup_call_media_set_mic_index",
            "param": {
                "index": idx
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to get microphone device index. 
     * [cn]获取使用的麦克风设备序号
     */
    TUPCall.prototype.mediaGetMicIndex = function(callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x2B] = callbacks.response;
        }
        var data = {
            "cmd": 0x1002B,
            "description": "tup_call_media_get_mic_index"
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to set speakerphone device index.
     * [cn]设置使用的扬声器设备序号
     */
    TUPCall.prototype.setSpeakIndex = function(idx, callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x29] = callbacks.response;
        }
        var data = {
            "cmd": 0x10029,
            "description": "tup_call_media_set_speak_index",
            "param": {
                "index": idx
            }
        };
        this.sendData(data);
    };

    /**
     * [en]This function is used to get speakerphone device index.
     * [cn]获取使用的扬声器设备序号
     */
    TUPCall.prototype.mediaGetSpeakIndex = function(callbacks) {
        if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x2C] = callbacks.response;
        }
        var data = {
            "cmd": 0x1002C,
            "description": "tup_call_media_get_speak_index"
        };
        this.sendData(data);
    };
    
    
    TUPCall.prototype.setAECParams = function(callbacks) {
    	if (callbacks && typeof callbacks.response == "function") {
            this.rspFuncs[0x2C] = callbacks.response;
        }
        var data = {
            "cmd": "0x1011A",
            "description": "tup_call_set_AEC_params",
            "param" : {
            	"call_s_audio_aec_params" : {
            		"cngmode":1	
            	}
            }
        };
        this.sendData(data);
    };



    return TUPCall;
}));

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.CloudIPCC_SDK = factory();
    }
}(this, function() {
    function CloudIPCC_SDK(opts) {
        this.SDK_OPTS = opts;
        this.tupLogin = null;
        this.tupCall = null;
        this.serverIsOk = false;
        this.tupDeamon = new TUPDeamon({
            sdk: this,
            isHttp : opts.isHttp,
            ready: opts.onTupDeamonReady,
            close: opts.onTupDeamonClose,
            serviceStartUp: this.serviceStartUp,
            serviceShutDown: this.serviceShutDown,
            serviceRecover: this.serviceRecover
        });
    }

    CloudIPCC_SDK.prototype.getVersion = function() {
        return {
            jsVersion: "6.19.0.0",
            name: "CloudIPCC SDK"
        }
    }

    CloudIPCC_SDK.prototype.serviceStartUp = function(sdk, data) {
        sdk.tupLogin = new TUPLogin({
        	isHttp : sdk.SDK_OPTS.isHttp,
            ready: sdk.SDK_OPTS.onTupLoginReady,
            close: sdk.SDK_OPTS.onTupLoginClose
        });

        sdk.tupCall = new TUPCall({
        	isHttp : sdk.SDK_OPTS.isHttp,
            ready: sdk.SDK_OPTS.onTupCallReady,
            close: sdk.SDK_OPTS.onTupCallClose,
			onVersionInfoNotify : sdk.SDK_OPTS.onVersionInfoNotify
        });

        if (sdk.SDK_OPTS.serviceStartUp && typeof sdk.SDK_OPTS.serviceStartUp == "function") {
            sdk.SDK_OPTS.serviceStartUp(data);
        }

    }

    CloudIPCC_SDK.prototype.serviceShutDown = function(sdk, data) {
        if (sdk.SDK_OPTS.serviceShutDown && typeof sdk.SDK_OPTS.serviceShutDown == "function") {
            sdk.SDK_OPTS.serviceShutDown(data);
        }
    }

    CloudIPCC_SDK.prototype.serviceRecover = function(sdk, data) {
        if (sdk.SDK_OPTS.serviceRecover && typeof sdk.SDK_OPTS.serviceRecover == "function") {
            sdk.SDK_OPTS.serviceRecover(data);
        }
    }

    CloudIPCC_SDK.prototype.unInit = function() {
        if (this.tupDeamon != null && this.tupDeamon.wsocket.readyState == 1) {
            this.tupDeamon.wsocket.close();
        }
        if (this.tupCall != null && this.tupCall.wsocket.readyState == 1) {
            this.tupCall.wsocket.close();
        }
        if (this.tupLogin != null && this.tupLogin.wsocket.readyState == 1) {
            this.tupLogin.wsocket.close();
        }
    }
    return CloudIPCC_SDK;
}));