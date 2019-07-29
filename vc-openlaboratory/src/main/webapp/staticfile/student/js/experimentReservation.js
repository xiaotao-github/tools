function swiperBtnSite(){
	var h = $('.courseSwiper').height();
	$('.swiper-btn').css('top',(h/2)+30);
}

function reserve(obj){
	var scheduleId = $(obj).parents('li').attr('scheduleId');
	//var labseat = $(obj).parents('li').find('.seat_last').html();//剩余工位
	//获取该课程上课的时间/ 节 
	var schooltime = $(obj).parents('li').attr('schoolTime');//排课时间
	var sliceNmber = $(obj).parents('li').attr('sliceNmber');//排课字节

    layer.confirm('确定要预约该实验室？', {
        btn: ['确定','取消'] //按钮
    }, function(index){
        $.ajax({
            url : ctx+'/studentController/subscribeSchedule/'+ studentId +'/'+ scheduleId+'/'+schooltime+'/'+sliceNmber,
            type : 'get',
            dataType : 'json',
            success: function(sysresult){
                if(sysresult.status == 200){
                    layer.msg('预约成功!',{icon:1,time : 2000});
                    //window.location.reload();
                    /*以下是返回课程表信息后 ajax重置当前分页 并动态添加已预约的课程表信息*/
					var newEvent = setDayPilot(sysresult.data.studentsCourseSchedule);//data --课程表需要的参数list;具体参考方法内容(timetable.js中的setDayPilot())
					dp.events.add(newEvent);
					dp.clearSelection();
					$('.nav li').find('span.canToBeReservated').html($('.nav li').find('span.canToBeReservated').html()/1-1)
					$('.nav li').find('span.myReservation').html($('.nav li').find('span.myReservation').html()/1+1)
					$('.nav li').find('span.myHistoryReservation').html($('.nav li').find('span.myHistoryReservation').html()/1+1)
					$('.nav li').eq(1).click();
					
                }
                if(sysresult.status == 203){
                	layer.msg(sysresult.msg,{icon:2,time : 2000});
                }else if(sysresult.status == 202){
                    layer.msg(sysresult.msg,{icon:2,time : 2000});
                }else{
                	
                }
            },
            error: function(sysresult){
                layer.msg('无法连接!',{icon:2,time : 2000});
            }
        })
    }, function(){
        layer.close();
    });
}

function reserveModel(){
	this.orderId = '',
	this.lab_num ='',
	this.seatNum ='',
	this.experiment_name = '',
	this.experiment_course  = '',
	this.experiment_difficult  = '',
	this.schedule_Id = '',
	this.teachersMsg  = '',
	this.id  = '',
	this.reserve_btn  = '',
	this.seat_totle  = '',
	this.seat_last  = '',
	this.lab_name  = '',
	this.experiment_time = '',
	this.school_time = '',
	this.slice = '', 
	this.lab_myseat =''
}

var obj = $('.reservation-list-ul').children('li').eq(0).clone();
$('.reservation-list-ul').children('li').eq(0).remove();

function initReserveBox(data){
	var o = obj.clone();
	o.attr('scheduleId',data.schedule_Id);//课程表id
	o.attr('schoolTime',data.school_time);//排课时间
	o.attr('sliceNmber',data.slice);//排课节数
	var thisTime = null;
	if(data.lab_isPastTimes == 0){ // 1-- 已预约    0-- 可预约    2-- 历史预约
		o.find('.reservation-btn').children('.button').attr('onclick','reserve(this)')
	}else if(data.lab_isPastTimes == 1){
		o.find('.reservation-btn').children('.button').attr('data-title',data.experiment_name).addClass('reserved').children('span').html('进入实验');
		o.find('.reservation-btn').children('.button').attr('data-href',ctx+'/studentController/getCourseScheduleList/'+data.schedule_Id+'/'+studentId+'/'+data.experiment_Id+'/'+data.lab_Id+'/'+data.experimentCourse_Id)
		o.find('.reservation-btn').children('.button').attr('onclick','Hui_admin_tab(this)')
	}else if(data.lab_isPastTimes == 2){
		if(data.schoolTime > Date.parse(new Date())){			
			o.find('.reservation-btn').children('.button').addClass('history').attr('data-title',data.experiment_name).children('span').html('进入实验');
		}else{
			o.find('.reservation-btn').children('.button').attr('data-title',data.experiment_name).addClass('reserved').children('span').html('进入实验');
		}
		o.find('.reservation-btn').children('.button').attr('data-href',ctx+'/studentController/getCourseScheduleList/'+data.schedule_Id+'/'+studentId+'/'+data.experiment_Id+'/'+data.lab_Id+'/'+data.experimentCourse_Id)
		o.find('.reservation-btn').children('.button').attr('onclick','Hui_admin_tab(this)')
	}
	o.find('.seatNum').children('i').html(data.lab_myseat);
	//o.find('.lab_num').html(data.lab_num);
	o.find('.experiment_name').html(data.experiment_name);
	o.find('.courseName').html(data.experiment_course);
	o.find('.experiment_difficult').html(data.experiment_difficult);
	o.find('.reserve_btn').html(data.reserve_btn);
	o.find('.seat_totle').html(data.seat_totle);
	o.find('.seat_last').html(data.seat_last);
	o.find('.lab_name').html(data.lab_name+'('+data.lab_num+')');
	o.find('.experiment_time').html(data.experiment_time);
	o.find('.teachers_list').html(data.teachersMsg);

	$('.reservation-list-ul').append(o);
}

function setMsg(data) {
	var teachersMsg = '';
	for(var i in data.teacherInfo){}
		teachersMsg +=  '<li class="clearfix">'+
							'<div class="teacherAvatar f-l">'+
								'<img src="'+srcUrl+data.teacherInfo.imagePath+'" alt="" class="teacher_avatar">'+
							'</div>'+
							'<div class="f-l teacherMsg pl-10">'+
								'<p class="f-12 teacher_belong">'+data.teacherInfo.department.name+'</p>'+
								'<p class="f-14 teacher_name">'+data.teacherInfo.name+'</p>'+
							'</div>'+
						'</li>';
	
	
	var experimentLevel;
	if(data.experiment.level == 1){
		experimentLevel = '容易';
	}else if(data.experiment.level == 2){
		experimentLevel = '适中';
	}else{
		experimentLevel = '困难';
	}
	var experimentSlice;
	switch (data.slice){
		case 'A':
			experimentSlice = '1-2节';
			break;
		case 'B':
			experimentSlice = '3-4节';
			break;
		case 'C':
			experimentSlice = '午休';
			break;
		case 'D':
			experimentSlice = '5-6节';
			break;
		case 'E':
			experimentSlice = '7-8节';
			break;
		case 'F':
			experimentSlice = '9-10节';
			break;
			
	}
	
	var m =  new reserveModel()
	m.lab_isPastTimes = data.isPastTimes;//标识符 判断已经预约
	m.lab_num= data.experimentLab.labNumber;//实验室编号
	m.seatNum= data.experimentLab.seatNum;//座位号
	m.experiment_name= data.experiment.experimentName;//实验名称
	m.experiment_course = data.experimentCourse.courseName;//课程名称
	m.experimentCourse_Id = data.experimentCourse.experimentCourseId;//课程id
	m.schedule_Id = data.scheduleId;//课程表id
	m.experiment_Id = data.experiment.experimentId;//实验id
	m.lab_Id = data.experimentLab.labId//实验室id
	m.experiment_difficult = experimentLevel;//实验难度
	m.teachersMsg = teachersMsg;
	m.id = data.id;
	m.reserve_btn = data.reserve_btn;
	m.seat_totle = data.seats;//总工位
	m.seat_last = data.remainingSeats;//剩余工位上
	m.lab_name = data.experimentLab.labName;//实验室名称
	m.school_time = data.schooltime //排课时间 
	m.slice = data.slice //排课节数  
	if(data.scourseStudent){
		m.lab_myseat = data.scourseStudent.labMyseat;
	}else{
		m.lab_myseat = '--';
	}
	//我的预约的工位
	//m.experiment_time = data.schooltimeToString.slice(0,9) + data.sliceByte+'&emsp;'+experimentSlice
	m.experiment_time = data.schooltimeToString.split('00:00:00')[0] + data.sliceByte+'&emsp;'+experimentSlice
	return m;
}


function setPaging(order,maxLength){
	var content= '';
	if(order>0&&order<=maxLength){
		$('.prevPageBtn').attr('pageOrder',order-1);
		$('.nextPageBtn').attr('pageOrder',order+1);
		pageOrder = order;
		if(order<5 && order<=maxLength){
			for(var i = 1;i<=maxLength;i++){
				if(i==order){
					content += '<li onclick="paging(this);" pageOrder="'+i+'" class="selected">'+i+'</li>';
				}else{
					content += '<li onclick="paging(this);" pageOrder="'+i+'">'+i+'</li>'
				}
			}
		}else if(order>=maxLength-2){
			for(var i = maxLength-4;i<=maxLength;i++){
				if(i==order){
					content += '<li onclick="paging(this);" pageOrder="'+i+'" class="selected">'+i+'</li>';
				}else{
					content += '<li onclick="paging(this);" pageOrder="'+i+'">'+i+'</li>'
				}
			}
		}else{
			for(var i = order-2;i<=order+2;i++){
				if(i==order){
					content += '<li onclick="paging(this);" pageOrder="'+i+'" class="selected">'+i+'</li>';
				}else{
					content += '<li onclick="paging(this);" pageOrder="'+i+'">'+i+'</li>'
				}
			}
		}
		$('.paging ul').html(content)
	}
}

function paging(obj){
	var order = $(obj).attr('pageOrder')/1;
	if(order<=maxPageNum && order>0){
		var type = $('.reservation-typeSel').children('.nav').children('.selected').attr('reserveType');
		_ajax_getData(order,type);
	}
}


var maxPageNum = 0;
function _ajax_getData(order,type){
	var loadIndex = layer.load();
	$.ajax({
		type: 'POST',
		data: '',
		dataType: 'json',//学生id  学期id 班级id 类型  页码数
		url: '/studentController/myReservableExperimentList/'+studentId+'/'+semesterId+'/'+classId+'/'+type+'/'+order,
		success: function(data){
			$('.reservation-list-ul').html('');
			if(data.data.list.length != 0){
				for(var i in data.data.list){
					initReserveBox(setMsg(data.data.list[i]));
				}
			}else{
				var msg = '';
				if(type == 1){
					msg = '没有可预约的实验!';
				}else if(type == 1){
					msg = '你还没有预约过实验!';
				}else{
					msg = '暂无已预约的记录!';
				}
				$('.reservation-list-ul').html('<li class="col-lg-12 col-sm-12 mb-20 text-c f-16 mt-20" style="color:#b9c2c9;">————————————  '+msg+'  ————————————</li>');
			}
			maxPageNum = data.data.pageNum;
			//data.schooltimeToString.split('00:00:00')[0] + data.sliceByte+'&emsp;'+experimentSlice判断超时
			//isPastTimes判断已预约标识
			//${StrudentLabBlacklist}  判断是不是上了黑名单 
			setPaging(order,maxPageNum);
			layer.close(loadIndex);
		},
		error: function(data){
			layer.msg('请求失败!',{time:2000},function(){				
				layer.close(loadIndex);
			})
		}
	})
}
				
$('.nav li').each(function(index){
	$('.nav li').eq(index).on('click',function(){
		if(!$(this).hasClass('selected')){
			$(this).addClass('selected').siblings('li').removeClass('selected');
			_ajax_getData(1,$(this).attr('reserveType'));
		}
	})
})


$(function(){
	//initDp(sday); //获取我的预约课程
    getSemesterSchedule(semesterId,'/studentController/getCourseScheduleAppointment/'+classId+'/'+studentId+'/'+semesterId);
    //	initDp();
	dp.init();
	weekNum(thisWeekNum);
	swiperBtnSite();
	_ajax_getData(1,1);
})