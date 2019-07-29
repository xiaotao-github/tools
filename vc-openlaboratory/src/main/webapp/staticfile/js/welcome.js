/*var unit,size,bw;
unit = "px";
size =300;
bw = 4;

	var i =0,le=0;

$(".caseNav .navPre").unbind('click');
$(".caseNav .navPre").bind('click',function(){
	casepre();
	i--;
});

$(".caseNav .navNext").unbind('click');
$(".caseNav .navNext").bind('click',function(){
	casenext();
	i++;
});

$(".caseNav .navMiddle").unbind('click');
$(".caseNav .navMiddle").bind('click',function(){
	casemiddle();
});

function casepre(){		
	var z=i;
	if(z<=1){
		z=0;
		le=0;
		i=0;
	}
	else{
		le = le+size;
	}
	$(".casePic").css('margin-left',le+unit);
}

function casenext(){		
	var j=i;
	if(j>=$(".casePicBody1").length-(bw+1)){
		//往右滑动
		le = -($(".casePicBody1").length-bw)*size;
		i=$(".casePicBody1").length-(bw+1);
	}
	else{
		//往左滑动
		le = le -size;
	}
	$(".casePic").css('margin-left',le+unit);
}

function casemiddle(){
	i=0;
	le=0;
	$(".casePic").css('margin-left',le+unit);
}*/


//slidePositionLayer  swiper
	if($(".swiper-slide").length>=8){
		var a = 8;
		setSlider(a);
	}else if($(".swiper-slide").length>5&&$(".swiper-slide").length<8){
		var b = $(".swiper-slide").length;
		setSlider(b-1)
	}else{
		$(".swiper-slide").css('margin','0 40px')
	}
	function setSlider(num){
		var mySwiper = new Swiper('.slidePositionLayer',{
		  slidesPerView: num,
		  loop: false
		});
		$(".slidePositionLayer .slidePositionLayer").hover(function(){
			$(this).children(".swiperBtn-preBtn").show();
			$(this).children(".swiperBtn-nextBtn").show();
		},function(){
			$(this).children(".swiperBtn-preBtn").hide();
			$(this).children(".swiperBtn-nextBtn").hide();
		})

		$(".swiperBtn-preBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipePrev();
		})

		$(".slidePositionLayer .swiperBtn-nextBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipeNext();
		})
	}

    var chapterNum = new Array();
	var chapterTotalNum = new Array();
	var percent = new Array();
	var positionTop = new Array();
	$(".swiperEachLi").each(function(){
		var aNum = $(this).attr('aNum');
		var bNum = $(this).attr('bNum');
		chapterNum.push(aNum);
		chapterTotalNum.push(bNum);
	})
	for(var i = 0;i<$('.swiperEachLi').length;i++){
		var a = 0;
		if(chapterTotalNum[i]==0){
			a=0;
		}else{
			a = (chapterNum[i]/chapterTotalNum[i])*100;
		}
		percent.push(a.toFixed(2));
		if(chapterTotalNum[i]==0){
			positionTop.push(100);
		}else{
			positionTop.push(100-(chapterNum[i]/chapterTotalNum[i])*100);
		}
	}

	$(".percentBar").each(function(index){
		$(".percentBar").eq(index).css('top',positionTop[index]);
		$(".percentBar").eq(index).siblings('.percentNum').children("span").html(percent[index]);
		if((100-positionTop[index])<25&&(100-positionTop[index])>0){
			$(".percentBar").eq(index).siblings('.percentNum').css('top',100-25);
		}else if((100-positionTop[index])==0){
			$(".percentBar").eq(index).siblings('.percentNum').css({'top':100/2-12,'color':'#e60000'});
		}else{
			$(".percentBar").eq(index).siblings('.percentNum').css('top',positionTop[index]+(100-positionTop[index])/2-12);
		}
	})

	$(".swiperEachLi").each(function(index){
		var a = 0;
		if(chapterTotalNum[index]==0){
			a =0;
		}else{
			a = chapterNum[index]/chapterTotalNum[index];
		}
		if(a>0){
			$(".swiperEachLi").eq(index).hover(function(){
				$(this).find(".percentBar").attr('src',realPath+'/staticfile/images/percentBar_hover.png');
				$(this).find(".percentNum").css('color','#806b4b');
			},function(){
				$(this).find(".percentBar").attr('src',realPath+'/staticfile/images/percentBar.png');
				$(this).find(".percentNum").css('color','#fff');
			})
		}else if(a==0){
			$(this).find(".percentUnder").attr('src',realPath+'/staticfile/images/percentUnder_zero.png');
			$(this).hover(function(){
				$(this).find(".percentNum").html('开始学习');
				$(this).find(".percentNum").css({'color':'#fff','background':'#666'});
			},function(){
				$(this).find(".percentNum").html('0.00%');
				$(this).find(".percentNum").css({'color':'#e60000','background':'none'});
			})
		}
	})


//my optionCourses list percent
	var optionCoursesNum = new Array();
	var optionCoursesTotalNum = new Array();
	$(".eachOptionList").each(function(){
		var aNum = $(this).attr('aNum');
		var bNum = $(this).attr('bNum');
		optionCoursesNum.push(aNum);
		optionCoursesTotalNum.push(bNum);
	});
	var optionCoursesPercent = new Array();

	for(var i =0;i<$(".optionCourseShadown").length;i++){
		var b = 0;
		if(optionCoursesTotalNum[i]==0){
			b=0;
		}else{
			b = (optionCoursesNum[i]/optionCoursesTotalNum[i])*100;
		}
		optionCoursesPercent.push(b.toFixed(2));
	}

	$(".optionCourseShadown p").each(function(index){
		$(".optionCourseShadown p").eq(index).html(optionCoursesPercent[index]+'%');
		$(".optionCourseShadown p").eq(index).parent('.optionCourseShadown').siblings('.progressBar').children('.progressBar-percent').css('width',optionCoursesPercent[index]+'%');
	})



// courseStuding-r li
	for(var i = 0;i<$(".courseStuding-r li").length;i++){
		if((i%2)==0){
			$(".courseStuding-r li").eq(i).addClass('even');
		}else{
			$(".courseStuding-r li").eq(i).addClass('odd');
		}
	}


//record list
	function record(classname,url){
		var name = classname;
		var listname = name+'List';
	    // $.ajax({
	    //     type:'POST',
	    //     url:url,
	    //     dataType:'json',
	    //     success:function(data){
	            for(var i=2;i>0;i--){
	                var year,month;
	                if(i==1){year = '2016';}else{year = '2017';}
	                for(var j=12;j>0;j--){
	                    var recordDLName = name+i+j;
	                    var yearMonth = '<dl class="'+name+' '+recordDLName+'"><dt>'+year+'年'+j+'月</dt><dd><ul></ul></dd></dl>';
	                    $("."+listname).append(yearMonth);
	                    var date = '';
	                    for(var k=4;k>0;k--){
	                        if(k==1){
	                            date = '<li><span class="line last"><img src="'+realPath+'/staticfile/images/line.png" alt=""></span><span class="dot2"><img src="'+realPath+'/staticfile/images/dot2.png" alt=""></span><span style="padding: 0 10px;">'+j+'.'+k+'</span><span>收藏了《微机原理课件》 王大鹅</span><span style="display:block;text-align:right;width:40px;float:right;">16:47</span></li>';
	                        }else{
	                            date = '<li><span class="line"><img src="'+realPath+'/staticfile/images/line.png" alt=""></span><span class="dot2"><img src="'+realPath+'/staticfile/images/dot2.png" alt=""></span><span style="padding: 0 10px;">'+j+'.'+k+'</span><span>收藏了《微机原理课件》 王大鹅</span><span style="display:block;text-align:right;width:40px;float:right;">16:47</span></li>';
	                        }
	                        $("."+recordDLName).find("ul").append(date);
	                    }
	                }
	            }
	    //     },
	    //     error:function(data){

	    //     }
	    // })
	}

	var url = 1;

	record('courseStudedRecord',url);
	record('projectizedRecord',url);


//projectizedCourses swiper 
	if($(".projectized-slider").length>=3){
		var a = 3;
		setProjectizedCoursesSlider(a);
	}else{
		$(".projectized-slider").css('margin','0 40px')
	}
	function setProjectizedCoursesSlider(num){
		var mySwiper = new Swiper('.projectizedCoursesSwiper',{
		  slidesPerView: num,
		  loop: false,
		  slideClass : 'projectizedCoursesSlider',
		  wrapperClass :'projectizedCoursesSlideBox'
		});
		$(".projectizedCoursesSwiper").hover(function(){
			$(this).children(".swiperBtn-preBtn").show();
			$(this).children(".swiperBtn-nextBtn").show();
		},function(){
			$(this).children(".swiperBtn-preBtn").hide();
			$(this).children(".swiperBtn-nextBtn").hide();
		})

		$(".projectizedCoursesSwiper .swiperBtn-preBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipePrev();
		})

		$(".projectizedCoursesSwiper .swiperBtn-nextBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipeNext();
		})
	}


	// $(".projectized-slider a").hover(function(){
	// 	$(this).find(".projectizedCoursehShadown").slideDown();
	// 	$(this).find(".projectizedCoursesNum").show();
	// },function(){
	// 	$(this).find(".projectizedCoursehShadown").slideUp();
	// 	$(this).find(".projectizedCoursesNum").hide();
	// })



//
var h1 = $(".otherPart-left").height();
$(".courseStudedRecordList").height(h1-35);
var h2 = $(".projectizedCourses").height();
$(".projectizedRecordList").height(h2-35)