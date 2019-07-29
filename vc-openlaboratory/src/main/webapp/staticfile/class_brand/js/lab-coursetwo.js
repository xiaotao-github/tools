var getLabInfoIntervalTime = 6000*30;//实验室信息30分钟请求一次
var getScheduleInfoIntervalTime = 6000*10;//课程信息和课程表信息  10分钟请求一次 6051*10
var getClockInfoInfoIntervalTime = 6000*10;//考勤信息1分钟请求一次
var getClockInfoInfoInterval = null;
var normalNum,delayNum,noneNum; //考勤人数
var preShceduleId;//课程id
//获取实验室信息
var getLabInfo = function(){
	$.ajax({
		type:'GET',
		url: ctx+'/blank/findLabById/'+labId,
		success:function(result){
		if(result.status==200){
			var data = result.data;
			if(data.mainframeId!=null&&data.mainframeKey!=null){
				getEquData(data.mainframeId,data.mainframeKey);
			}
			getLabNotice(labId);
			//实验室状态
			$('#labStatus').html(data.labStatus==1?'使用中':'维护中');
			//实验室总工位数
			$('#labSeats').html(data.labSeat);
			//实验室名称
			$('#labName').html(data.labName);
			$("#lab_title").html(data.labName);
			//实验室编号
			$('#labNumber').html('(编号: '+data.labNumber+')');
			//实验室负责教师
			var dutyTeachers = data.dutyTeachers;
			var teachers = '';
			for(var i=0;i<dutyTeachers.length;i++){
				teachers +=dutyTeachers[i].name+' ';
			}
			$('#labManager').html(teachers);
			//所属院系
			if(data.departmentName == '' || data.departmentName==null){
				$(".logoTitle").html('通用实验室');
			}else{
				$(".logoTitle").html(data.departmentName);
			}
		}else{
			console.log(data);
			alert(data);
		}	
		},
		error:function(data){
			console.log(data);
		}
	});
}
//获取当前课程当前上课班级
var getNowCourseSchedule = function(){
	$.ajax({
		type:'GET',
		url:ctx+'/blank/findNowCourseByLabId/'+labId,
		success:function(result){
			console.log(result);
			if(result.status==200){
				console.log(123123);
				window.location.href=ctx+'/page/class_brand/index?labId='+labId;
			}else{ //当前无课程安排  --查询本周课程安排信息 跳转到课表页
				getLabSchedule(labId);
			}
		},
		error:function(data){
			console.log(data);
		}
	});
}

//课表信息
var getLabSchedule = function(labId){
	$.ajax({
		type:'GET',
		url:ctx+'/blank/selectLabSchedule/'+labId,
		success:function(result){
			console.log(result)
			if(result.status==200){
				var data = result.data;
				initSchedule(data);
			}
		},
		error:function(result){
			console.log('无法连接网络');
		}
	});
}

//根据 实验室网关id 和网关密码 获取设备的温湿度和光照强度
var getEquData = function(gatewayId,gatewayPass){
	if(gatewayId==null || gatewayPass==null || gatewayId=='' || gatewayPass==''){
		console.log('无法获取物联网关id和网关密码,无法获取设备信息');
	}else{
		var url = WISDOMLAB+'/euqipment/getSenseEqu/'+gatewayId+'/'+gatewayPass;
		$.getJSON(url,function(result){
			if(result.status==200){
				var data = result.data;	
				for(var temp in data){
					switch(data[temp].type){
						case "17"://温湿度
							if(data[temp].epData!=null && data[temp].epData!=''){
								var split = data[temp].epData.split(",");
								 $("#myTemperature").html(split[0]+'℃');
								 $("#myHumidity").html(split[1]+"%");
							}
							break;
						case "19": //光照强度
							if(data[temp].epData!=null && data[temp].epData!=''){
								$("#myIllumination").html(data[temp].epData+'Lux');
							}
							break;
						case "42"://空气质量
							if(data[temp].epData!=null && data[temp].epData!=''){
								var epData = (data[temp].epData.split("P")[0])/1;
								if(epData<1000){
									$('#myAirQuality').html('空气清新');
								}else if(epData>=1000 && epData<2000){
									$('#myAirQuality').html('空气浑浊');
								}else if(epData>=2000){
									$('#myAirQuality').html('严重污染');
								}
							}
						}
					}
				}
			}
		);
	}
}

// 获取实验室公告信息 
getLabNotice = function(labId){
	$.ajax({
		type:'GET',
		url:ctx+'/labNoticeWebController/selectByLabId/'+labId,
		success:function(result){
			if(result.status==200){
				if(result.data != null && result.data.length!=0){
					messageData.messages = result.data;
				}
			}
		},
		error:function(result){
			console.log(result);
		}
	});
}

getLabInfo();
getNowCourseSchedule();


//定时轮询
$(function(){
	window.setInterval('getLabInfo('+labId+')',getLabInfoIntervalTime);
	window.setInterval('getNowCourseSchedule()',getScheduleInfoIntervalTime);
})



