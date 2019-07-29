function addSwiperNav(){	
	var a = new Array();
	$('.swiper-slide').each(function(){
		a.push($(this).find(".eachExm-title").children('span').html())
	})
	var l = $(".swiper-slide").length;
	var content = '<li title="'+a[0]+'" class="checked"></li>';
	for(var i= 0;i<l-1;i++){
		content +='<li title="'+a[i+1]+'"></li>';
	}
	$('.swiper-nav').html(content);
}
addSwiperNav();

function slider(){
	var mySwiper = new Swiper('.exmListSwiper',{
		loop: false,
		// simulateTouch : false,
		mode : 'vertical',
		onSlideChangeStart : function(swiper){
			// console.log(swiper);
			if(swiper.activeIndex == 0){
				$(".page-prev").css('display','none');
				$(".page-next").css('display','block');
			}else if(swiper.activeIndex == $(".swiper-slide").length-1){
				$(".page-next").css('display','none');
				$(".page-prev").css('display','block');
			}else{
				$(".page-next").css('display','block');
				$(".page-prev").css('display','block');
			}
			$('.swiper-nav li').eq(swiper.activeIndex).addClass('checked');
			$('.swiper-nav li').eq(swiper.activeIndex).siblings().removeClass('checked');
		}
	});

	$(".page-prev").on('click',function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	})

	$(".page-next").on('click',function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	})

	$(".swiper-wrapper").css('height','auto');
	$(".ul").css('height','auto');

	$('.swiper-nav li').each(function(index){
		var i = index;
		$(this).off().on('click',function(){
			mySwiper.swipeTo(i, 1000, false);
			$('.swiper-nav li').eq(i).addClass('checked');
			$('.swiper-nav li').eq(i).siblings().removeClass('checked');
		})
	})
}
slider();

$(".eachExperiment-left span").off().on('click',function(){
	var num = $(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-title').attr('slideType');
	if(num==0){
		$(this).children('img').attr('src','images/slide-open.png');
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-div').stop().slideDown();
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-title').removeClass('bc-f2');
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-title').attr('slideType',1);
	}else{
		$(this).children('img').attr('src','images/slide.png');
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-div').stop().slideUp();
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-title').addClass('bc-f2');
		$(this).parent().siblings('.eachExperiment-right').children('.eachExperiment-title').attr('slideType',0);
	}
})


$(".eachExperiment-title .span").each(function(){
	var num = $(this).html().indexOf('分');
	if(num!=-1){
		var scroe = $(this).html().substring(0,num);
		if(scroe>=0&&scroe<60){
			$(this).css('background','#ff2020');
		}else if(scroe>=60&&scroe<70){
			$(this).css('background','#ff9320');
		}else if(scroe>=70&&scroe<80){
			$(this).css('background','#eac366');
		}else if(scroe>=80&&scroe<90){
			$(this).css('background','#c8de73');
		}else{
			$(this).css('background','#8dde73');
		}
	}else{
		$(this).css('background','#bbb');
	}
});


$('.type').off().on('click',function(){
	if($(this).parent('div').siblings('ul').is(':hidden')){
		$(this).parent('div').siblings('ul').stop().slideDown();
	}else{
		$(this).parent('div').siblings('ul').stop().slideUp();
	}
})