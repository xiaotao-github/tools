function dateToTimeStamp(t){
	var date = new Date(t);
	var sday = date.getFullYear()+"-"+("0"+(date.getMonth()/1+1*1)).slice(-2)+"-"+('0'+(date.getDate()/1)).slice(-2);
	return sday;
}

function dateToGMT(strDate){
    var dateStr=strDate.split(" ");  
    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";  
    var date = new Date(Date.parse(strGMT));
    return date;
}

function getThisMonday(sMonday,weekNum){
	var t = new Date(sMonday)
	var thisMonday = t.valueOf() + (weekNum-1)*7*24*60*60*1000;
	return new Date(thisMonday);
}

function getSelectedDate(tMonday,tDay){
	var t = new Date(tMonday);
	var thisDate = t.valueOf() + (tDay-1)*24*60*60*1000;
	return new Date(thisDate);
}

function _selLab(obj){
	var labId = $(obj).val();
	/*$.ajax({
		type: 'GET',
		url: '',
		dataType: 'JSON',
		success: function(sysresult){*/
			var weekList = new Array();
			for(var num = 0;num<total_weekNum;num++){
				weekList.push(num);
			}
			var content = '';
			for(var i in weekList){
				var s_time = getThisMonday(termStartTime,(i/1+1));
				var e_time = new Date(getThisMonday(termStartTime,(i/1+2))-(24*60*60*1000-1000));
				if(i/1+1 == selectedWeekNum){					
					content += '<option selected="selected" value="'+(selectedWeekNum/1)+'">第'+(selectedWeekNum/1)+'周 &emsp;(&nbsp;'+dateToTimeStamp(s_time)+'&nbsp;~&nbsp;'+dateToTimeStamp(e_time)+'&nbsp;)</option>';
				}else{					
					content += '<option value="'+(i/1+1)+'">第'+(i/1+1)+'周&emsp;(&nbsp;'+dateToTimeStamp(s_time)+'&nbsp;~&nbsp;'+dateToTimeStamp(e_time)+'&nbsp;)</option>';
				}
			}
			$('#weekChange').html(content);
			_selWeek($('#weekChange'));
		/*},
		error: function(sysresult){
			
		}
	})*/
}

function _selWeek(obj){
	selectedWeekNum  = $(obj).val();
	var labId = $('#labChange').val();
	$('.classesList').children('li').eq(0).children('span').html('第'+selectedWeekNum+'周');
	var thisSelectedMonday = dateToTimeStamp(getThisMonday(termStartTime,selectedWeekNum));
	
	$.ajax({
		type: 'GET',
		url: ctx + '/courseScheduleController/getConreNameClassList/'+labId+'/'+thisSelectedMonday,
		dataType: 'JSON',
		success: function(sysresult){
			initSchedule(sysresult.data);
		},
		error: function(sysresult){
			
		}
	})
}

function initSchedule(classMsg){
	$('.schedule-row').children('.schedule-col').html('').removeClass('colColor-1 colColor-2 colColor-3').removeAttr('clickType');
	for(var i in classMsg){
		var dateArray = classMsg[i].schooltimeToString.split(" ");
		dateArray = dateArray[0].split("-");
		var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
		var row_num = date.getDay()/1-1;
		if(row_num<0){
			row_num = 6;
		}
		var col_Str = ['A','B','C','D','E','F'];
		var col_num;
		for(j in col_Str){
			if(col_Str[j] == classMsg[i].slice){
				col_num = j;
			}
		}
		var colColor;
		switch (classMsg[i].type){
			case 1 :
				colColor = 'colColor-1';
				break;
			case 2 :
				colColor = 'colColor-2';
				break;
			case 3 :
				colColor = 'colColor-3';
				break;
			default :
				break;

		}
		var content = '<p style="font-weight:bold;font-size:14px;">'+'课程：'+classMsg[i].experimentCourse.courseName+'</p><p>'+'实验：'+classMsg[i].experiment.experimentName+'</p><p>'+'操作人：'+classMsg[i].teacherInfo.name+'</p>';
		//var content = '<p class="pd-10 pt-15 pb-15 f-14" style="margin-bottom:0;color:#999;">该时段已安排课程!</p>';
		$('.schedule-row').eq(row_num).children('.schedule-col').eq(col_num).html(content).addClass(colColor).attr('clickType',1);
	}
}

function resetCourseTime(slice,dateNum){
	var timeString = getSelectedDate(getThisMonday(termStartTime,selectedWeekNum),dateNum);
	var courseTime_arr = ['A','B','C','D','E','F'];
	var courseTime;
	for(var i in courseTime_arr){
		if((i/1+1) == (slice/1)){
			courseTime = courseTime_arr[i];
			break;
		}
	}
	var thisData = {'schooltimeToString' : dateToTimeStamp(timeString),'slice' : courseTime,'labId' : $('#labChange').val() , scheduleId : scheduleId };
	$.ajax({
		type: 'POST',
		url: ctx + '/courseScheduleController/changeCourse',
		data: thisData,
		dataType: 'JSON',
		success: function(){
			layer.msg('调课成功',{'time': 1500},function(){
				window.parent.location.reload()
			});
		},
		error: function(){
			
		}
	})
}

$(function(){
/*	$('#labChange').onchange(function(){
		_selLab($('#labChange'));
	})
	*/
	$('.schedule-col').each(function(index){
		$('.schedule-col').eq(index).off().on('click',function(){
			var slice = $(this).prevAll('.schedule-col').index()+2;
			var dateNum = $(this).parent('.schedule-row').index()+1;
			if($(this).attr('clickType') != 1){
				layer.confirm('是否把课程调至此时段?',{btn: ['确定','取消']},
				function(){
					resetCourseTime(slice,dateNum);
				})
			}else{
				layer.msg("此时段已有课程安排!");
			}
		})
	})
})

