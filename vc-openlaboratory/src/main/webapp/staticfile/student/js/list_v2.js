	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    return currentdate;
	}
	
	function imgBindClickEvent(){
		$('.dataGetting-img img').each(function(i){
			$('.dataGetting-img img').eq(i).off().on('click',function(){
				var $obj = $(this);
				var index = layer.confirm('你是要把该图片插入实验过程中或者查看该图片？', {
				  btn: ['插入图片','查看图片'] //按钮
				}, function(index){
					var urlStr = ""+$obj.attr('src')+"";
					send(urlStr);
					layer.closeAll();
					$obj.remove();
					//insertImg($obj);
				},function(index){
					showDataImg($obj);
				});
			})
		})
	}
	
	function insertImg(msg){
		var text = '<img src="'+RESOURCE_WAY+msg.picPath+'" />';
		ue.setContent(text,true);
		//obj.remove();
		//layer.closeAll(); 
	}
	
	function showDataImg(obj){
		$('.showDataImg').children('img').attr('src',obj.attr('src'));
		layer.open({
			type: 1,
			shadeClose: true,
			title: false, //不显示标题
			content: $('.showDataImg'),
			area: ['auto','80%']
		})
	}

	function initImg(data){
		var obj = $('<img />').attr('src',RESOURCE_WAY_VAL+data.picPath).addClass('mt-20 img');
		return obj;
	}
	
	var indexNum = 0;
	function initContainerBox(data){
		$('.dataGetting-img').append(initImg(data));
		imgBindClickEvent();
	}
	
	/*=============================================================================
	 * ===========================                       ==========================
	 * ===========================    web socket start   ==========================
	 * ===========================                       ==========================
	 * ============================================================================*/

	var heartflag = false;
	var webSocket = null;
	var tryTime = 0;

	
	function initSocket() {
		//var url = 'ws://http://127.0.0.1:1906//websocketJS';
	    if (!window.WebSocket) {
	        layer.msg(getNowFormatDate()+"  您的浏览器不支持ws<br/>",{'time':3000});
	        return false;
	    }
		//sid 学生id
	    webSocket = new WebSocket("ws://"+window.location.host+"/reciverImgWebsocket?sid="+Id);//路径
	   

	    // 收到服务端消息
	    webSocket.onmessage = function (msg) {
	    	var dataMsg = msg.data;
	       	var data = $.parseJSON(dataMsg);
	       	console.log(data)
	       	insertImg(data);
	    };

	    // 异常
	    webSocket.onerror = function (event) {
	        heartflag = false;
	        layer.msg(getNowFormatDate()+"  异常<br/>",{'time':3000});
	    };

	    // 建立连接
	    webSocket.onopen = function (event) {
	        heartflag = true;
	        heart();
	        layer.msg(getNowFormatDate()+"  建立连接成功<br/>");
	        tryTime = 0;
	    };

	    // 断线重连
	    webSocket.onclose = function () {
	        heartflag = false;
	        // 重试10次，每次之间间隔10秒
	        if (tryTime < 10) {
	            setTimeout(function () {
	                webSocket = null;
	                tryTime++;
	                initSocket();
	                layer.msg( getNowFormatDate()+"  第"+tryTime+"次重连<br/>");
	            }, 3*1000);
	        } else {
	            layer.msg("重连失败.");
	        }
	    };
	}

	function send(url){
	    webSocket.send(url);
	}

	function heart() {
	    if (heartflag){
	        webSocket.send("&");
	    }
	    setTimeout("heart()", 10*60*1000);

	}
	
	function repushTableData(){
		//console.log('repushTableData()方法进来了!');
		var dataTableArray_template = new Array();//原模板数据 table
		var dataTableArray_stuUpload = new Array();//学生保存或重做数据
		var dataTableArray_saveData = new Array();//获取学生编辑的数据
		
		$('.dataGetting td').each(function(index){
			if($('.dataGetting td').eq(index).text().replace(/\s*/g,"").length != 0){
				dataTableArray_template.push(index);
			}
		});
		
		$('.stuUploaded td').each(function(index){
			if($('.stuUploaded td').eq(index).text().replace(/\s*/g,"").length != 0){
				dataTableArray_stuUpload.push(index);
			}
		});
		
		for(var i = 0;i<dataTableArray_stuUpload.length;i++){
			var flag1 = 0;
			for(var j = 0;j<dataTableArray_template.length;j++){
				if(dataTableArray_stuUpload[i] == dataTableArray_template[j]){
					flag1 = 0;
					break;
				}else{
					flag1 = 1;
				}
			}
			if(flag1 == 1){
				dataTableArray_saveData.push(dataTableArray_stuUpload[i]);
			}
		}
		
		for(var i in dataTableArray_saveData){
			$('.dataGetting td').eq(dataTableArray_saveData[i]).html($('.stuUploaded td').eq(dataTableArray_saveData[i]).html());
		}
		console.log($('.stuUploaded'));
		$('.stuUploaded').remove();
	}
	
	function textPersonalData(){
		layer.open({
			type: 1,
			shadeClose: true,
			title: false, //不显示标题
			content: $('.personalData'),
			area: ['300px','110px'],
			end: function(){
				cancelPersonalDataInsert();
			}
		})
	}
	
	function cancelPersonalDataInsert(){
		layer.closeAll();
		$('#personalData').val("");
	}
	
	function insertPersonalData(){
		var StrText = $('#personalData').val();
		$('.Txting').html(StrText);
		//$('.Txting').html("##"+StrText);
		cancelPersonalDataInsert();
	}
	
	$(function(){
		imgBindClickEvent();
		
		$('.dataGetting td').each(function(index){
			if($('.dataGetting td').eq(index).text().replace(/\s*/g,"").length != 0){
				if($('.dataGetting td').eq(index).text() == '##'){
					$('.dataGetting td').eq(index).html('').addClass('personalTxt');
				}else{
					$('.dataGetting td').eq(index).addClass('selDefault');
				}
			}else{
				if(!$('.dataGetting td').eq(index).hasClass('personalTxt')){
					$('.dataGetting td').eq(index).on('click',function(){
						$('.dataGetting td').removeClass('selector').removeClass('Txting');
						$(this).addClass('selector');
					})
				}
			}
		});

		$('.personalTxt').each(function(index){
			$('.personalTxt').eq(index).on('click',function(){
				$('.dataGetting td').removeClass('selector').removeClass('Txting');
				$(this).addClass('Txting');
				textPersonalData();
			})
		})
		
		//console.log(reportUploadStatus)
		if(reportUploadStatus == '4' || reportUploadStatus == '6'){
			repushTableData();
		}
		
	})