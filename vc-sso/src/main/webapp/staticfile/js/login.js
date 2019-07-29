
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
    tiptype:2,
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