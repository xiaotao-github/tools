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
	wordlimit('courseList-courseName',10,0)

	function slider(){
		var mySwiper = new Swiper('.courseListSwiper',{
		  loop: false
		});

		$(".swiperBtn-preBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipePrev();
		})

		$(".swiperBtn-nextBtn").on('click',function(e){
			e.preventDefault();
			mySwiper.swipeNext();
		})

		$(".swiper-wrapper").css('height','auto');
		$(".courseListSlider").css('height','auto');
	}

	$(".courseListSlider li").hover(function(){
		$(this).css({'background':'#f2f2f2','border-right':'1px solid #ddd','border-bottom':'1px solid #ddd','border-top':'1px solid #eee','border-left':'1px solid #eee'});
		$(this).children().children('.courseShadown').show();
		$(this).children().children('.chapterTotalNumP').show();
	},function(){
		$(this).css({'background':'none','border-right':'1px solid #fff','border-bottom':'1px solid #fff','border-top':'1px solid #fff','border-left':'1px solid #fff'});
		$(this).children().children('.courseShadown').hide();
		$(this).children().children('.chapterTotalNumP').hide();
	})

	if($(".courseListSlider li").length<15){
		$('.courseListSwiperBtn').hide();
	}

	slider();