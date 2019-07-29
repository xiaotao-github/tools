function swiperBtnSite(){
	var h = $('.courseSwiper').height();
	$('.swiper-btn').css('top',(h/2)+30);
}

function reserve(obj){
	var orderId = $(obj).attr('ids')
    //点击预约 - 确认 - 预约addPersonalOrder();
    layer.confirm('确定要预约该实验室？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            url : '/pexperiment/ScheduleStudentController/subscribeSchedule/'+ studentId + '/'+ orderId,
            type : 'get',
            dataType : 'json',
            success: function(sysresult){
                if(sysresult.status == 200){
                    layer.msg('预约成功!',{icon:1,time : 2000});
                    var newEvent = setDayPilot(sysresult.data);//data --课程表需要的参数list;具体参考方法内容(timetable.js中的setDayPilot())
                    dp.events.add(newEvent);
                    dp.clearSelection();
                    var url = '/pexperiment/student/studentExperimentController/studentToExperimentPage/'+studentId+'/'+orderId;
                    $(obj).addClass('reserved').attr({'onclick':'Hui_admin_tab(this)','data-title':'实验详情','data-href':url}).html('已预约');
                }else{
                    layer.msg(sysresult.msg,{icon:2,time : 2000});
                }
            },
            error: function(msg){
                layer.msg('无法连接!',{icon:2,time : 2000});
            }
        })
    }, function(){
        layer.close();
    });
}


var thisdata = [
	{'lab_num': '这里是实验室的编号','seatNum':'12','experiment_name': '这里是实验的名称','experiment_course' : '这里是课程的名称','experiment_difficult' : '适中','teachers':[{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'},{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'}],'id' : '','reserve_btn' : '预约实验','seat_totle' : '56','seat_last' : '32','lab_name' : '这里是实验室的名称','experiment_time' : '2018-07-25 下午第5、6节'},
	{'lab_num': '这里是实验室的编号','seatNum':'16','experiment_name': '这里是实验的名称','experiment_course' : '这里是课程的名称','experiment_difficult' : '适中','teachers':[{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'}],'id' : '','reserve_btn' : '预约实验','seat_totle' : '56','seat_last' : '32','lab_name' : '这里是实验室的名称','experiment_time' : '2018-07-25 下午第5、6节'}
]

function reserveModel(){
	this.lab_num ='',
	this.seatNum ='',
	this.experiment_name = '',
	this.experiment_course  = '',
	this.experiment_difficult  = '',
	this.teachersMsg  = '',
	this.id  = '',
	this.reserve_btn  = '',
	this.seat_totle  = '',
	this.seat_last  = '',
	this.lab_name  = '',
	this.experiment_time = ''
}

var obj = $('.reservation-list-ul').children('li').eq(0).clone();
$('.reservation-list-ul').children('li').eq(0).remove();

function initReserveBox(data){
	var o = obj.clone();
	o.find('.lab_num').html(data.lab_num);
	o.find('.seatNum').children('i').html(data.seatNum);
	o.find('.experiment_name').html(data.experiment_name);
	o.find('.courseName').html(data.experiment_course);
	o.find('.experiment_difficult').html(data.experiment_difficult);
	o.find('.reserve_btn').html(data.reserve_btn);
	o.find('.seat_totle').html(data.seat_totle);
	o.find('.seat_last').html(data.seat_last);
	o.find('.lab_name').html(data.lab_name);
	o.find('.experiment_time').html(data.experiment_time);
	o.find('.teachers_list').html(data.teachersMsg);

	$('.reservation-list-ul').append(o);
}

function setMsg(data) {
	var teachersMsg = '';
	for(var i in data.teachers){
		teachersMsg +=  '<li class="clearfix">'+
							'<div class="teacherAvatar f-l">'+
								'<img src="'+data.teachers[i].teacherAvatar+'" alt="" class="teacher_avatar">'+
							'</div>'+
							'<div class="f-l teacherMsg pl-10">'+
								'<p class="f-12 teacher_belong">'+data.teachers[i].teacherDepartment+'</p>'+
								'<p class="f-14 teacher_name">'+data.teachers[i].teacherName+'</p>'+
							'</div>'+
						'</li>';
	}

	var m =  new reserveModel()
	m.lab_num= data.lab_num;
	m.seatNum= data.seatNum;
	m.experiment_name= data.experiment_name;
	m.experiment_course = data.experiment_course;
	m.experiment_difficult = data.experiment_difficult;
	m.teachersMsg = teachersMsg;
	m.id = data.id;
	m.reserve_btn = data.reserve_btn;
	m.seat_totle = data.seat_totle;
	m.seat_last = data.seat_last;
	m.lab_name = data.lab_name;
	m.experiment_time = data.experiment_time;
	return m;
}


function setPaging(order,maxLength){
	var content= '';
	if(order>0&&order<=maxLength){
		$('.prevPageBtn').attr('pageOrder',order-1);
		$('.nextPageBtn').attr('pageOrder',order+1);
		pageOrder = order;
		if(order<5){
			for(var i = 1;i<=5;i++){
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
	var type = $('.reservation-typeSel').children('.nav').children('.selected').attr('reserveType');
	_ajax_getData(order,type);
}

function _ajax_getData(order,type){
	/*$.ajax({
		type: '',
		data: '',
		dataType: '',
		url: '',
		success: function(data){*/
			$('.reservation-list-ul').html('');
			for(var i in thisdata){
				initReserveBox(setMsg(thisdata[i]));
			}
			setPaging(order,10);
		/*},
		error: function(data){

		}
	})*/
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
	initDp(sday); //static test
    getSemesterSchedule(semesterId,'/pexperiment/student/course/schedule/getCourseSchedule/'+studentId+'/'+semesterId);
//	initDp();
	dp.init();
	weekNum(thisWeekNum);
	swiperBtnSite();
	_ajax_getData(1,0);
})