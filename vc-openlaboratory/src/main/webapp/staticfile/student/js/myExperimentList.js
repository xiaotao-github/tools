var thisdata = [
	{'lab_num': '这里是实验室的编号','experiment_name': '这里是实验的名称','experiment_course' : '这里是课程的名称','experiment_difficult' : '适中','teachers':[{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'},{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'}],'id' : '','course_type' : '整班上课','lab_name' : '这里是实验室的名称','experiment_time' : '2018-07-25 下午第5、6节'},
	{'lab_num': '这里是实验室的编号','experiment_name': '这里是实验的名称','experiment_course' : '这里是课程的名称','experiment_difficult' : '适中','teachers':[{'teacherName':'王大鹅','teacherAvatar':'images/avatar.png','teacherDepartment':'计算机学院'}],'id' : '','course_type' : '自主预约','lab_name' : '这里是实验室的名称','experiment_time' : '2018-07-25 下午第5、6节'}
]

function reserveModel(){
	this.scheduleId='',
	this.studentId='',
	this.experimentId='',
	this.labId='',
	this.lab_num ='',
	this.experiment_name = '',
	this.experiment_course  = '',
	this.course_type  = '',
	this.experiment_difficult  = '',
	this.teachersMsg  = '',
	this.id  = '',
	this.lab_name  = '',
	this.experiment_time = '',
	this.experimentCourseId=''
}

var obj = $('.myExperimentList-list').children('ul').children('li').eq(0).clone();
$('.myExperimentList-list').children('ul').children('li').eq(0).remove();

//初始化数据，添加相应的学生实验HTML
function initReserveBox(data){
	var o = obj.clone();
	o.attr('data-title',data.experiment_name)
	o.attr('data-href',ctx+'/studentController/getCourseScheduleList/'+data.scheduleId+'/'+data.studentId+'/'+data.experimentId+'/'+data.labId+'/'+data.experimentCourseId)
	o.attr('onclick','Hui_admin_tab(this)')
	//o.find('.lab_num').html(data.lab_num);
	o.find('.experiment_name').html(data.experiment_name);
	if(data.experiment_updateType == 2){
		o.find('.experiment_updateType').html('[已提交]');//实验提交状态               --已提交
	}else if(data.experiment_updateType == 3){
		o.find('.experiment_updateType').html('[已批改]');//实验提交状态	  --已批改	
	}else if(data.experiment_updateType == 5){
		o.find('.experiment_updateType').html('[已保存]');//实验提交状态	  --已保存			
	}else if(data.experiment_updateType == 1){
		o.find('.experiment_updateType').html('[未提交]');//实验提交状态	  --已批改	
	}else if(data.experiment_updateType == 4){
		o.find('.experiment_updateType').html('[重做]');//实验提交状态	  --已批改	
	}else{
		o.find('.experiment_updateType').html('[未提交]');//实验提交状态	  --未提交					
	}
	o.find('.courseName').html(data.experiment_course);
	if(data.course_type == '整班上课'){
		o.find('.course_type').addClass('fc-objBlue').html(data.course_type);
	}else{
		o.find('.course_type').addClass('c-success').html(data.course_type);	
		o.find('.experiment_time_title').html('开放时间:');
	}
	o.find('.experiment_difficult').html(data.experiment_difficult);
	o.find('.lab_name').html(data.lab_name+'('+data.lab_num+')');
	o.find('.experiment_time').html(data.experiment_time);
	o.find('.teachers_list').html(data.teachersMsg);

	$('.myExperimentList-list').children('ul').append(o);
}

//根据回调数据设置实验信息
function setMsg(data) {
	var teachersMsg = '';
	for(var i in data.teacherMsgList){
		teachersMsg +=  '<li class="clearfix">'+
							'<div class="teacherAvatar f-l">'+
								'<img src="'+RESOURCE_WAY+data.teacherMsgList[i].imagePath+'" alt="" class="teacher_avatar">'+
							'</div>'+
							'<div class="f-l teacherMsg pl-10">'+
								'<p class="f-12 teacher_belong">'+data.teacherMsgList[i].departMentName+'</p>'+
								'<p class="f-14 teacher_name">'+data.teacherMsgList[i].teacherName+'</p>'+
							'</div>'+
						'</li>';
	}

	var m =  new reserveModel()
	m.lab_num= data.labName;
	m.experiment_name= data.experimentName;
	m.experiment_updateType =data.submitStatus;//实验提交状态
	m.experiment_course = data.courseName;
	m.course_type = data.experimentType;
	m.experiment_difficult = data.level;
	m.teachersMsg = teachersMsg;
	m.id = data.id;
	m.lab_name = data.labName;
	m.experiment_time = data.schoolTime +" " +data.slice;
	m.scheduleId=data.scheduleId;
	m.studentId=data.studentId;
	m.experimentId=data.experimentId;
	m.labId=data.labId;
	m.experimentCourseId =data.experimentCourseId;
	return m
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
		$('.paging').show();
	}else{
		$('.paging').hide();
	}
	
}

function paging(obj){
	var order = $(obj).attr('pageOrder')/1;
	if(order<=maxPageNum && order>0){
		var type = $('.myExperimentList-sel').children('.nav').children('.selected').attr('myExperimentListType');
		_ajax_getData(order,type);
	}
}


var maxPageNum = 0;
function _ajax_getData(order,type){
	var studentId = $('.myExperimentList-sel').attr('studentId');
	$.ajax({
		type: 'POST',
		data: '',
		dataType: 'json',
		url: '/studentController/myExperimentList/'+studentId+'/'+type+'/'+order,
		success: function(data){
			$('.myExperimentList-list').children('ul').html('');
			for(var i in data.data.list){
				initReserveBox(setMsg(data.data.list[i]));
			}
			maxPageNum = data.data.pageNum;
			setPaging(order,data.data.pageNum);
		},
		error: function(data){

		}
	})
}

$('.nav li').each(function(index){
	$('.nav li').eq(index).on('click',function(){
		if(!$(this).hasClass('selected')){
			$(this).addClass('selected').siblings('li').removeClass('selected');
			//_ajax_getData(1,$(this).attr('reserveType'));
				_ajax_getData(1,$(this).attr('myExperimentListType'));
		}
	})
})

$(function(){
	_ajax_getData(1,0);
})