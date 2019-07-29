var docW = $(document).width();
var color = new Array('#e7f7ff','#fff3f4','#eeffe8','#fdf8e4');
var sign = 1;

//ctrMr();
$(window).resize(function(){
	docW = $(document).width();
	//eachcourseMr();
	//ctrMr();
	//teacherAvatarLayout();
})

function ctrMr(){
	var boxW = $(".experimentCenterCtrIcon").width()-10;
	var mrW = (boxW-245)/8;
	$(".experimentCenterCtrIcon li").css({'margin-left':mrW,'margin-right':mrW});
}

$(".departmentNav li").each(function(index){
	$(this).on('click',function(){
		$(this).addClass('checked');
		$(".eachDepartment").eq(index).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(".eachDepartment").eq(index).siblings().removeClass('checked');
	})
})

$('.experimentCenterStuDynamics li').each(function(index){
	if(index%2==1){
		$(this).addClass('even');
	}else{
		$(this).addClass('odd');
		}
	})


$(".experimentCenterStuDynamics li i").each(function(){
	var num = $(this).html().indexOf('分');
	if(num!=-1){
		var scroe = $(this).html().substring(0,num);
		if(scroe>=0&&scroe<60){
			$(this).css('background','#d66868');
		}else if(scroe>=60&&scroe<70){
			$(this).css('background','#ff9320');
		}else if(scroe>=70&&scroe<80){
			$(this).css('background','#d8bb74');
		}else if(scroe>=80&&scroe<90){
			$(this).css('background','#abbb6f');
		}else{
			$(this).css('background','#7fbb6c');
		}
	}else{
	$(this).css('background','#ccc');
	}
});
	
	
/*提交笔记*/
$("#noteForm").Validform({
	btnSubmit : ".noteAddSubBtn",
	tiptype : 2,
	ignoreHidden : false,
	dragonfly : false,
	tipSweep : false,
	label : ".label",
	showAllError : false,
	postonce : true,
	ajaxPost : true,
	datatype : {

	},
	usePlugin : {
		swfupload : {},
		datepicker : {},
		passwordstrength : {},
		jqtransform : {
			selector : "select,input"
		}
	},
	beforeCheck : function(curform) {
		//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话将不会继续执行验证操作;	
	},
	beforeSubmit : function(curform) {
		//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话表单将不会提交;	
	},
	callback : function(data) {
		if (data.status == "200") {
			var index = parent.layer.getFrameIndex(window.name);
			var times = data.data.createTime;
			times = parseInt(times, 10);//转为整形
			var date = new Date(times);//正确
			var content = '<li class="clearfix mb-15"><p class="noteAddedTime"><span class="span2 f-20">'
					+ date.getDate()
					+ '</span>'
					+ '<span class="span1">'
					+ date.getFullYear()
					+ "-"
					+ (date.getMonth() + 1)
					+ '</span></p>'
					+ '<p class="noteContain pt-5 pb-5 f-12">'
					+ data.data.notesContent
					/*+ '</p><p style="position:absolute;top:-2px;right:-7px;"><img src="${ctx }/staticfile/images/noteBg.png"/></p>'*/
					+ '</p>'
					+ '</li>';
			$(".welcomePageNoteList ul").prepend(content);
			var text = '';
			$('#notesContent').val(text);

			layer.msg('添加成功!', {
				icon : 1,
				time : 1500
			});
			parent.layer.close(index);
		} else {
			layer.msg(data.msg, {
				icon : 1,
				time : 1500
			});
			/* window.location.reload(); */
		}
	}
});
/*实验笔记*/
function teachnote(title, url) {
	var index = layer.open({
		type : 2,
		title : title,
		content : url,
		area : [ '100%', '100%' ],
		fix : true,
		maxmin : false,
		shade : 0.4,
		scrollbar : false,
		resize : true,
	});
}
/*提示消息弹出方法  */
function alertMsg(msg) {
	layer.alert(msg, {
		title : '温馨提示'
	});
}

$("#Validform_msg").addClass("hide_Validform");


//进行异步获取所有实验室具有网关id 的实验室。进行循环轮询
$(function () {
	$.ajax({
		type:'GET',
		url: PEXPERIMENTOPEN+'/experimentLabController/getGatewayList',
		dataType: 'JSON',
		success: function(sysresult){
			if(sysresult.status == 200){
				var data = sysresult.data;
				for(var i in data){
					//console.log(data);
					run(data[i].mainframeId,data[i].mainframeKey);
				}
				//layer.msg('请求成功!');
			}else{
				console.log("检查网关密码设备是否为空？");

			}
		},
		error:function(sysresult){
			console.log("请系统是否正常运行？redis 是否宕机？");
		}
	})	
	
})

function run(gwId,pwd) {
	console.log("开始访问物联");
	$.ajax({
		type:'GET',
		url: WISDOMLAB+'/euqipment/getEuqToCovertor/'+gwId+'/'+pwd,
		dataType: 'JSON',
		success: function(sysresult){
			if(sysresult.status == 200){
				console.log("访问物联系统成功");
				//layer.msg('请求成功!');
			}else{
				console.log("访问物联系统出现故障");
			}
		},
		error:function(sysresult){
			console.log("请检查物联系统是否正常运行？redis 是否宕机？");
		}
	})
}
