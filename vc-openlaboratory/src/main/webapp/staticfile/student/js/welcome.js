function swiperBtnSite(){
	var h = $('.courseSwiper').height();
	$('.swiper-btn').css('top',(h/2)+30);
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

$(function(){
	//initDp(sday); //static test
    getSemesterSchedule(semesterId,'/studentController/getCourseSchedule/'+classId+'/'+studentId+'/'+semesterId);
    getSemesterSchedule(semesterId,'/studentController/getCourseScheduleAppointment/'+classId+'/'+studentId+'/'+semesterId);
//	initDp();
	dp.init();
	weekNum(thisWeekNum);
	swiperBtnSite();
})