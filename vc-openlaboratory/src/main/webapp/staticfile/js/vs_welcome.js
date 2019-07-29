function addSwiperNav(){	
	var a = new Array();
	$('.swiper-slide').each(function(index){
		a.push(index+1);
	})
	var l = $(".swiper-slide").length;
	var content = '<li title="第'+a[0]+'页" class="checked"></li>';
	for(var i= 0;i<l-1;i++){
		content +='<li title="第'+a[i+1]+'页"></li>';
	}
	$('.swiper-nav').html(content);
}

function slider(){
	var mySwiper = new Swiper('.courseSwiper',{
		loop: false,
		// simulateTouch : false,
		//mode : 'vertical',
		onSlideChangeStart : function(swiper){
			// console.log(swiper);
			$('.swiper-nav li').eq(swiper.activeIndex).addClass('checked');
			$('.swiper-nav li').eq(swiper.activeIndex).siblings().removeClass('checked');
		}
	});

	$('.swiper-slide').css('height','auto');

	$(".swiper-prev").on('click',function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	})

	$(".swiper-next").on('click',function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	})

	$(".swiper-wrapper").css('height','auto');
	$(".ul").css('height','auto');

	$('.swiper-nav li').each(function(index){
		var i = index;
		$(this).off().on('click',function(){
			mySwiper.swipeTo(i, 500, false);
			$('.swiper-nav li').eq(i).addClass('checked');
			$('.swiper-nav li').eq(i).siblings().removeClass('checked');
		});
	})
}

function swiperBtnSite(){
	var h = $('.courseSwiper').height();
	$('.swiper-btn').css('top',(h/2)-20);
}

function getColor(w){
	var color = new Array('#d85100','#d88300','#d8b500','#64b36e','#eee');
	var c='';
	if(w>0&&w<=25){
		c = color[0];
	}else if(w>26&&w<=50){
		c = color[1];
	}else if(w>51&&w<=75){
		c = color[2];
	}else if(w>76&&w<=100){
		c = color[3];
	}else{
		c = color[4];
	}
	return c;
}

function getPercent(obj){
	var totalNum = $(obj).parents('.courseContainer').siblings('.coursePost').find('span').html();
	var num = $(obj).attr('doneNum');
	console.log(totalNum);
	if(totalNum==0){
		var percent = 0;
	}else{
		var percent = (num/totalNum)*100;
	}
	return percent.toFixed(1);
}

function documentInit(){
	addSwiperNav();
	slider();
	swiperBtnSite();
}

$(function(){
	documentInit();
	$(".coursePercent").each(function(){
		var w = getPercent(this);
		var c = getColor(w);
		$(this).find('.courseProgress').css({'width':w+'%','background':c});
		if(w<=100&&w>0){
			$(this).children('.percentNum').children('span').html(w).css('color',c);
		}else{
			$(this).children('.percentNum').children('span').html(w).css('color','#666');
		}
	});

	$('.eachChangenav').each(function(index){
		$('.eachChangenav').eq(index).on('click',function(){
			$(this).children('.selectSign').show();
			$(this).siblings().children('.selectSign').hide();
			$('.eachChangebox').eq(index).show();
			$('.eachChangebox').eq(index).siblings().hide();
		})
	})
})