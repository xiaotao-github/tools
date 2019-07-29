var getLabInfoIntervalTime = 6000*30;//实验室信息30分钟请求一次
var getScheduleInfoIntervalTime = 6000*10;//课程信息和课程表信息  10分钟请求一次 6051*10
var getClockInfoInfoIntervalTime = 6000*10;//考勤信息1分钟请求一次
var getCodeInfoTime = 6000*10   //获取显示图片还是视频的标识码！1分钟请求一次 6051*10
var getClockInfoInfoInterval = null;
var normalNum,delayNum,noneNum; //考勤人数
var preShceduleId;//课程id
var labPost = '';
var shceduleId = null ;
var type = null;
//获取实验室信息
var getLabInfo = function(labId){
	$.ajax({
		type:'GET',
		url: ctx+'/blank/findLabById/'+labId,
		success:function(result){
		if(result.status==200){
			var data = result.data;
			if(data.mainframeId!=null&&data.mainframeKey!=null){
				getEquData(data.mainframeId,data.mainframeKey);
			}
			labPost = data.labImg;
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
		}	
		},
		error:function(data){
			console.log(data);
		}
	});
}
//获取当前课程当前上课班级
var getNowCourseSchedule = function(lanId){
	$.ajax({
		type:'GET',
		url:ctx+'/blank/findNowCourseByLabId/'+labId,
		success:function(result){
			if(result.status==200){
				//考勤标题
				$('#clockinTitle').html(result.data.type==1?'上课对象（整班上课）':(result.data.type==2?'上课对象（小组协作）':'上课对象（自主预约）'));
				//是否正在上课课程
				$('#nowCourseTitle').html(result.data.isNow==0?' <span style="color: #ff2626" >下节课程</span> ':'当前课程 ');
				//当前课程名称
				$('#nowCourseName').html(result.data.experimentCourse.courseName);
				//当前实验名称
				$('#nowExperimentName').html(result.data.experiment.experimentName);
				//课程简介
				$('#nowExperimentDescription').html(result.data.experimentCourse.presentation);
				//上课班级
				var tbClassList = result.data.tbClassList;
				var clazzList = '<span>开放班级: </span>';
				for(var i = 0;i<tbClassList.length;i++){
					clazzList +='<span>'+tbClassList[i].name+' </span>';
				}
				$(".member-classes").html(clazzList);
				//上课教师
				$('#attendClassTeacher').html(result.data.teacherInfo.name);
				//上课时间
				$('#attendClassTime').html(result.data.attendTime);
				scheduleId = result.data.scheduleId;
				type = result.data.type;
				getClockInfo(result.data.scheduleId,result.data.type);
				if(getClockInfoInfoInterval!=null){
					clearInterval(getClockInfoInfoInterval);
				}
				getClockInfoInfoInterval = window.setInterval(getClockInfo(scheduleId,result.data.type),getClockInfoInfoIntervalTime);
				
			}else{ //当前无课程安排  --查询本周课程安排信息 跳转到课表页
				console.log('当前无课程安排')
				window.location.href=ctx+'/page/class_brand/course_schedule?labId='+labId;
			}
		},
		error:function(data){
			console.log(data);
		}
	});
}
//考勤信息
var getClockInfo = function(shceduleId,type){
	$.ajax({
		type:'GET',
		url:ctx+'/blank/selectClockInByScheduleId/'+shceduleId,
		success:function(result){
			
			if(result.status==200){
				var normalData = result.data.normal;
				var delayData = result.data.delay;
				var noneData = result.data.none;
				//上课人数
				if(normalNum != normalData.length || delayNum != delayData.length || noneNum != noneData.length){
					normalNum = normalData.length;
					delayNum = delayData.length;
					noneNum = noneData.length;
					$('#numberOfClass').html('上课人数:'+(normalNum+delayNum+noneNum));
					//封装考勤统计数据
					chartData.chart1[0].y = noneNum;
					chartData.chart1[1].y = delayNum;
					chartData.chart1[2].y = normalNum;
					setCharts('chart1',chartData.chart1,'出勤情况统计图');
				}
				if(preShceduleId==shceduleId){//原来课程
					var dataArray = $.merge(normalData,delayData);
					for(var temp in dataArray){
						$(".attendance-list ul").find('.checked').each(function(index){
							var stuId =  $(".attendance-list ul").find('.checked').eq(index).attr('stuId')
							if(temp.studentNumber == stuId){
								if($(this).children('i').hasClass('icon-unchecked')){
									$(this).children('i').removeClass('icon-unchecked').addClass('icon-checked');
								}
							}
							
						})
					}
				}else{
					var normal = '';
					for(var i=0;i<normalNum;i++){
						normal+='<li class="clearfix" stuId="'+normalData[i].studentNumber+'"><div class="stu-avatar">'
						if(normalData[i].imagePath !='' && normalData[i].imagePath != null){
							normal+='<img src="'+resourceway+'/'+normalData[i].imagePath+'" alt=""></div>';
						}else{
							normal+='<img src="'+resourceway+'/system_file/img/student_touxiang.jpg" alt=""></div>';
						}
						normal+='<div class="stu-attendance"><p class="stu_msg"><span class="name">'+normalData[i].studentName+'</span>';
						normal+='<span class="num">'+normalData[i].studentNumber+'</span></p>';
						normal+='<p class="checked"><i class="iconfont icon-checked"></i></p></div></li>';
					}
					//迟到
					for(var i=0;i<delayNum;i++){
						normal+='<li class="clearfix" stuId="'+delayData[i].studentNumber+'"><div class="stu-avatar">'
							if(delayData[i].imagePath !='' && delayData[i].imagePath != null){
								normal+='<img src="'+resourceway+'/'+delayData[i].imagePath+'" alt=""></div>';
							}else{
								normal+='<img src="'+resourceway+'/system_file/img/student_touxiang.jpg" alt=""></div>';
							}
							normal+='<div class="stu-attendance"><p class="stu_msg"><span class="name">'+delayData[i].studentName+'</span>';
							normal+='<span class="num">'+delayData[i].studentNumber+'</span></p>';
							normal+='<p class="checked"><i class="iconfont icon-checked"></i></p></div></li>';
					}
					//缺勤
					for(var i=0;i<noneNum;i++){
						normal+='<li class="clearfix" stuId="'+noneData[i].studentNumber+'"><div class="stu-avatar">'
							if(noneData[i].imagePath !='' && noneData[i].imagePath != null){
								normal+='<img src="'+resourceway+'/'+noneData[i].imagePath+'" alt=""></div>';
							}else{
								normal+='<img src="'+resourceway+'/system_file/img/student_touxiang.jpg" alt=""></div>';
							}
							normal+='<div class="stu-attendance"><p class="stu_msg"><span class="name">'+noneData[i].studentName+'</span>';
							normal+='<span class="num">'+noneData[i].studentNumber+'</span></p>';
							normal+='<p class="checked"><i class="iconfont icon-unchecked"></i></p></div></li>';
					}
					$(".attendance-list").children("ul").html(normal);
				}
			}else{
				var url=ctx+'/staticfile/class_brand/images/null.png';
				var imgObj = $('<img>');
				imgObj.attr('src',url).css({'dispaly':'block','width':'100%','height':'100%'});
				$(".attendance-list").html(imgObj);
				chartData.chart1[0].y = 0;
				chartData.chart1[1].y = 0;
				chartData.chart1[2].y = 0;
				setCharts('chart1',chartData.chart1,'出勤情况统计图');
			}
		},
		error:function(data){
			console.log(data);
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



getLabInfo(labId);
getNowCourseSchedule(labId);


//获取图片
 var getLabPic = function(labId){
	$.ajax({
		type:'GET',
		url:ctx+'/labClassCardPicWebController/selectByLabIdPic/'+labId,
		success:function(result){
			//console.log(result);
			var classImagesData = result.data; 
			if(classImagesData.length==0){
				var jsonStr = new Array(); 
				jsonStr.push({'filePath':labPost});
				classImagesData = jsonStr;
				console.log(classImagesData)
			}
			getImages(classImagesData);
			console.log(classImagesData)
		},
		error:function(result){
			//数据为空加载空的提示的资源
			console.log(result);
		}
	});
}

//获取视频
 var getLabVideo = function(labId){
	$.ajax({
		type:'GET',
		url:ctx+'/labClassCardWebVideoController/selectByLabIdvideo/'+labId,
		success:function(result){
			//console.log(result);
			var data = result.data[0];
			//console.log(url);
			if(result.data.length == 0){
				$('.video').html('<div style="width:100%;height:100%;overflow:hidden;"><img style="dispaly:block;width:100%;height:100%;" src="'+resourceway+'/'+labPost+'" alt=""></div>')
			}else{
				var url = data.filePath;
				initVideo(url);
			}
		},
		error:function(result){
			//数据为空加载空的资源
			console.log(result);
		}
	});
}

//获取状态码
var falseCode = null;
var getLabCode = function(labId){
	$.ajax({
		type:'GET',
		url:ctx+'/experimentLabStatisticsWebController/getStateCode/'+labId,
		success:function(result){
			var code = result.data;
			if(falseCode != code.pvStatus){
				//0 图片轮播
				if(code.pvStatus == 0){
					falseCode = 0;
					getLabPic(code.labId);
				}else {
					falseCode = 1;
					//1 视频轮播
					getLabVideo(code.labId);
				}
			}
			
		},
		error:function(result){
			console.log(result);
		}
	});

}
	

//定时轮询
$(function(){
	window.setInterval('getLabInfo('+labId+')',getLabInfoIntervalTime);
	window.setInterval('getNowCourseSchedule()',getScheduleInfoIntervalTime);
	window.setInterval('getLabCode('+labId+')',getCodeInfoTime);
	window.setInterval('getClockInfo('+shceduleId+',+'+type+')',getClockInfoInfoIntervalTime);
})



