
function slider(){
	var mySwiper = new Swiper('.swiper-slider',{
		loop: false,
		simulateTouch : false
	});

	$(".paging-prev").on('click',function(e){
		e.preventDefault();
		mySwiper.swipePrev();
	})

	$(".paging-next").on('click',function(e){
		e.preventDefault();
		mySwiper.swipeNext();
	})

	$(".swiper-wrapper").css('height','auto');
	$(".ul").css('height','auto');
}
slider();

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
	var totalNum = $(obj).parents('.experimentRight').siblings('.experimentLeft').children('.intro').find('em').html();
	var num = $(obj).children('i').attr('doneNum');
	if(totalNum==0){
		var percent = 0;
	}else{
		var percent = (num/totalNum)*100;
	}
	return percent.toFixed(1);
}

$(".experimentInButton .span2").each(function(){
	var w = getPercent(this);
	var c = getColor(w);
	$(this).children('em').css({'width':w+'%','background':c});
	if(w<=100&&w>0){
		$(this).children('i').html(w).css('color',c);
	}else{
		$(this).children('i').html(w).css('color','#666');
	}
});


$(".experiment-dynamic li").each(function(index){
	if(index%2==0){
		$(this).addClass('odd');
	}else{
		$(this).addClass('even');
	}
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings('li').removeClass('checked');
		$(".experiment-dynamic-box").children('ul').eq(index).addClass('checked');
		$(".experiment-dynamic-box").children('ul').eq(index).siblings().removeClass('checked');
	})
});


$(".ul2 i").each(function(){
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
		$(this).css('background','#ccc');
	}
});


$(".report-nav li").each(function(index){
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings('li').removeClass('checked');
		$(".report-detail").children('li').eq(index).addClass('checked');
		$(".report-detail").children('li').eq(index).siblings().removeClass('checked');
	})
});