
function getKey(){
	var keydata;
	$.ajax({
		url : ctx+"/userController/getUserKey",
		type : "post",
		dataType : "json",
		async : false ,
		success : function(data){
			if(data.status=200){
				keydata = data.data;
			}
			return keydata;
		}
	});
	return keydata;
}

function loginPassword(keywords){
    var loginPwd = $(" input[name='password']").val();
    password = encrypt(loginPwd,keywords);
    $("input[name='password']").val(password);
}


function encrypt(data,keywords) {
    var key  = CryptoJS.enc.Latin1.parse(keywords.key);
    var iv   = CryptoJS.enc.Latin1.parse(keywords.IV);
    return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
}


$(".voocloginform").Validform({
	btnSubmit:"#subBtn",
    tiptype:function(msg,o,cssctl){
        //msg：提示信息;
        //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
        //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
    	if(o.type == 2){
        	$(o.obj).parent().siblings().removeClass('wrong').addClass('right').html('<span class="Validform_checktip"></span>');
		}else if(o.type == 3){
        	$(o.obj).parent().siblings().removeClass('right').addClass('wrong').html('<span class="Validform_checktip"></span>');			
		}else{
        	$(o.obj).parent().siblings().removeClass('wrong').removeClass('right').html('<span class="Validform_checktip"></span>');			
		}
		var objtip = $(o.obj).parent().siblings().children('.Validform_checktip'); 
		cssctl(objtip,o.type);
		objtip.text(msg);
        
    },
    ajaxPost: false,
    beforeSubmit:function(curform){
    	loginPassword(getKey());
    },
    callback:function(data){
    	console.log(data.status);
    	//$('.verification').attr('src',ctx+'/validateCodeController/getImage?'+Math.round(new Date().getTime()));
    }
});

		
 /** 回车键事件  
 event :事件源,代表按下的那个按键 
 */
 $(function(){
	$(".verification").on('click',function(){
		$(this).attr('src',ctx+'/validateCodeController/getImage?'+Math.round(new Date().getTime()));
	})

})