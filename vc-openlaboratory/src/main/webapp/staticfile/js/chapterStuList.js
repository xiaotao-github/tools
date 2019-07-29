//wordlimit
function wordlimit(cname,wordlength,isOpen){
	var cname=$("."+cname);
	for(var i=0;i<cname.length;i++){
		var nowLength=cname[i].innerHTML.length;
		console.log(nowLength);
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


wordlimit('courseTxt',150,1);
wordlimit('chapterTxt',150,1);
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

function showResource(){
	var index = layer.open({
		type:1,
		content:$(".resourceDetail"),
		title:false,
		area:['400px','400px']
	});
}

$(function(){
	$(".theQRcodeBtn").off().on('click',function(){showQRcode();})
	
	$(".theLinkBtn").off().on('click',function(){showLink();})
	
	$(".theResourceBtn").off().on('click',function(){showResource();})
	
	/*var qrtips,linktips,resourcetips;
	$(".theQRcode").hover(function(){qrtips = layer.tips('课程二维码', this, {tips: [3,'#50a5be']});},function(){layer.close(qrtips);});
	$(".theLink").hover(function(){linktips = layer.tips('课程链接', this, {tips: [3,'#50a5be']});},function(){layer.close(linktips);});
	$(".theResource").hover(function(){resourcetips = layer.tips('参考课程', this, {tips: [3,'#50a5be']});},function(){layer.close(resourcetips);});
	*/
	
	if($(".eachTeacher li").length<5){
		$(".eachTeacher").css('padding-left','330px');
	}
	
	$(".chapterLine").each(function(index){
		if((index+1)==$(".chapterLine").length){
			$(".chapterLine").eq(index).addClass('last');
		}
	})
})