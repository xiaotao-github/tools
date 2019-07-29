//wordlimit
function wordlimit(cname,wordlength,isOpen){
	var cname=$("."+cname);
	for(var i=0;i<cname.length;i++){
		var nowLength=cname[i].innerHTML.length;
		var content = cname[i].innerHTML;
		if(nowLength>wordlength){

			if(isOpen==0){
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
			}else if(isOpen==1){
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+'. . . . . . <a href="##" onClick="openMore(\''+content+'\');" style="color:#50a5be">[展开]</a>';
			}else if(isOpen==2){
				$(cname[i]).parent().append('<br/><span class="moreIntro"><a href="##" onClick="moreIntro(\''+content+'\');">查看更多+</a></span>');
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
			}
		}
	}
}

function openMore(content){
	layer.open({
		type:1,
		content: '<br><p class="pd-20 textIndent-2">'+content+'</p>',
		area:['500px','300px'],
		title: false
	})
}

wordlimit('chapterDetailTxt',150,1);

function showQRcode(){
	var index = layer.open({
		type:1,
		content:$(".QRCodeDetail"),
		title:false,
		area:['400px','400px']
	});
}

function showLink(){
	var index = layer.open({
		type:1,
		content:$(".linkDetail"),
		title:false,
		area:['400px','400px']
	});
}

$(".chapterDetailQRCode").off().on('click',function(){showQRcode();})

$(".chapterDetailLink").off().on('click',function(){showLink();})

/*var qrtips,linktips,resourcetips;
$(".theQRcode").hover(function(){qrtips = layer.tips('课程二维码', this, {tips: [3,'#50a5be']});},function(){layer.close(qrtips);});
$(".theLink").hover(function(){linktips = layer.tips('课程链接', this, {tips: [3,'#50a5be']});},function(){layer.close(linktips);});
$(".theResource").hover(function(){resourcetips = layer.tips('参考课程', this, {tips: [3,'#50a5be']});},function(){layer.close(resourcetips);});
*/


if($(".eachTeacher li").length<5){
	$(".eachTeacher").css('padding-left','330px');
}

function firstTabCheck(obj){
	var obj = $(obj);
	var type = obj.attr('tabType');
	obj.addClass('checked');
	obj.siblings('.check').removeClass('checked');
	$('.chapterResourceChangeBox .li').eq(type-1).addClass('checked');
	$('.chapterResourceChangeBox .li').eq(type-1).siblings().removeClass('checked');
}


$(".resourceOrderNav li").each(function(index){
	$(".resourceOrderNav li").eq(index).on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$('.resourceOrderChangeBox li').eq(index).addClass('checked');
		$('.resourceOrderChangeBox li').eq(index).siblings().removeClass('checked');
	})
})


function navResize(){
	if($('.resourceOrderNavEach').length>7&&$('.resourceOrderNavEach').length<=9){
		$('.resourceOrderNavEach').css('padding','0 6px');
	}else if($('.resourceOrderNavEach').length>9&&$('.resourceOrderNavEach').length<=11){
		$('.resourceOrderNavEach').css('padding','0 5px');
	}else if($('.resourceOrderNavEach').length>11){
		$('.resourceOrderNavEach').css('padding','0 5px');
		wordlimit('resourceOrderNavEachP',1,0);
	}
}

navResize();

function showPic(){
	var src = $(".chapterDetailHover").children('img').attr('src');
	$(".showPicDetail").children('img').attr('src',src);
}

showPic();

//图册
var unit,size,bw;
unit = "px";
size =60;
bw = 6;
var k = 0;
var le=0;

$(".chapterDetailPrevBtn").off().on('click',function(){
	if($('.casePicNav').length>bw){
		casepre();
		k--;
	}
});

$(".chapterDetailNextBtn").off().on('click',function(){
	if($('.casePicNav').length>bw){
		casenext();
		k++;
	}
});

function casepre(){	
	var z=k;
	if(z<=1){
		z=0;
		le=0;
		k=0;
	}
	else{
		le = le+size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".casePicNavList").stop(true,true).animate({marginTop:le+unit});
}

function casenext(){		
	var j=k;
	if(j>=$(".casePicNav").length-(bw+1)){
		le = -($(".casePicNav").length-bw)*size;
		k=$(".casePicNav").length-(bw+1);
	}
	else{
		le = le -size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".casePicNavList").animate({marginTop:le+unit});
}


$(".casePicNav").each(function(index){
	$('.casePicNav').eq(index).on('click',function(){
		$(this).css('border','5px solid #0569a2').addClass('chapterDetailHover');
		$(this).siblings().css('border','5px solid #eee').removeClass('chapterDetailHover');
		showPic();
	});

	$('.casePicNav').eq(index).hover(function(){
		$(this).css('border','5px solid #0569a2').addClass('chapterDetailHover');
		$(this).siblings().css('border','5px solid #eee').removeClass('chapterDetailHover');
		showPic();
	})
});


//check test
function correctTest(){
	$('.trueOption').show();
	$('.choiceTrueAnswer').show();
	$('.essayTrueAnswer').show();
	$('.fillBox').children('textarea').attr('disabled','disabled');
	$('.testSignUp').hide();
	$(".options").each(function(){
		$(this).find('span').each(function(){
			var $span = $(this).children().children('input');
			if($span.prop("checked")){
				$(this).attr('checkAnswer','1');
			}else{
				$(this).attr('checkAnswer','0');
			}
			$span.attr('disabled','disabled');
			var a = $(this).attr('trueAnswer')/1;
			var b = $(this).attr('checkAnswer')/1;
			if((a+b)==2){
				$(this).prepend('<i class="fs-12 iconfont icon-zhengque pdr-5 fc-green"></i>');
				$(this).addClass('fc-green');
			}else if((a+b)==1){
				$(this).prepend('<i class="fs-12 iconfont icon-cuowu20 pdr-5 fc-red"></i>');
				$(this).addClass('fc-red');
				$(this).parents('.eachChoiceQuestion').addClass('wrong');
			}else{
				$(this).prepend('<i class="fs-12 iconfont pdr-5" style="padding-left:12px;"></i>')
			}
		})
	})
}


$(".eachChoiceQuestion").each(function(index){
	if(index%2==0){
		$(this).addClass('odd');
	}else{
		$(this).addClass('even');
	}
	var answer = $(this).find('.trueOption').children('span').html();
	var answerData = new Array();
	answerData = answer.split('、');
	$(this).find('em').each(function(i){
		var a = $(this).html();
		console.log(a+'      '+answerData[i]);
		for(var i = 0;i<answerData.length;i++){
			if(a==answerData[i]){
				$(this).parents('span').attr('trueAnswer','1');
			}else{
				$(this).parents('span').attr('trueAnswer','0');
			}
		}
	});
});

$(".eachEssayQuestion").each(function(index){
	if(index%2==0){
		$(this).addClass('odd');
	}else{
		$(this).addClass('even');
	}
});

$('.testSubBtn').on('click',function(){
	correctTest();
});


$(".noteTextSub").click(function(){
	var content = $(".noteText").val();
	var relevanceId = $("input[name=relevanceId]").val();
	var chapterId = $("input[name=chapterId]").val();
	$.ajax({
		type:'POST',
		dataType:'json',
		url:'${ctx }/StudentNotesWebController/addStudentNotes/'+relevanceId+'/'+chapterId+'',
		data:{'content':content,'name':name},
		success:function(data){
			var index = layer.msg('保存成功！',{icon:1,time:1500});
		},
		error:function(data){
			var index = layer.msg('保存失败！',{icon:1,time:1500});
		}
	})
})
