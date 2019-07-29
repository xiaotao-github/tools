	var docW = $(document).width();
	var color = new Array('#e7f7ff','#fff3f4','#eeffe8','#fdf8e4');
	var sign = 1;
	//teacherAvatarLayout();
	eachcourseMr();
	ctrMr();
	$(window).resize(function(){
		docW = $(document).width();
		eachcourseMr();
		ctrMr();
		//teacherAvatarLayout();
	})


	function eachcourseMr(){
		var boxWidth = $(".eachDepartment").parent().width();
		var mrW = 0;
		if(boxWidth<906){
			mrW = (boxWidth-(304*2))/4;
		}else if(boxWidth>=906&&boxWidth<1208){
			mrW = (boxWidth-(304*3))/6;
		}else{
			mrW = (boxWidth-(304*4))/8;
		}
		$(".eachcourse").css({'margin-left':mrW,'margin-right':mrW});
	}

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

	function dropAndUp(obj){
		var obj = $(obj);
		var a = obj.attr('slideType');
		if(a==0){
			obj.children().attr('src',realPath+'/staticfile/images/admin_main/up.png');
			obj.parent(".experimentCourseStyleTitle").siblings('.eachExperimentCourseList').slideUp();
			obj.attr('slideType',1);
		}else{
			obj.children().attr('src',realPath+'/staticfile/images/admin_main/drop.png');
			obj.parent(".experimentCourseStyleTitle").siblings('.eachExperimentCourseList').slideDown();
			obj.attr('slideType',0);
		}
	}


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
	
	
/*$(".experimentCenterCtrIcon a").off().on('click',function(){
	Hui_admin_tab(this);
})*/