var thisArgs;
var date = new Date();
var aaa = date.getDate()/1-date.getDay()/1+1;
var time = date.getFullYear()+"-"+("0"+(date.getMonth()/1+1*1)).slice(-2)+"-"+('0'+date.getDate()/1).slice(-2)+"T00:00:00";
var sday = date.getFullYear()+"-"+("0"+(date.getMonth()/1+1*1)).slice(-2)+"-"+('0'+(date.getDate()/1-date.getDay()/1+1)).slice(-2)+"T00:00:00";

var dp = new DayPilot.Scheduler("dp");
dp.cssClassPrefix = "dayPilot-blue";
if(jumpType==0){
	dp.startDate = sday;
}else{
	dp.startDate = sDate;
}
dp.cellGroupBy = "Month";
dp.days = 7;
dp.scale = "Day";
dp.cellWidthSpec = "Auto";
dp.timeHeaders = [
    {groupBy: "Month"},
    {groupBy: "Day", format: "dddd(d 日)"}
];
dp.eventHeight = 70;
dp.locale = "zh-cn";
dp.resources = [
             { name: "第1、2 节", id: "A" },
             { name: "第3、4 节", id: "B" },
             { name: "午休", id: "C" },
             { name: "第5、6 节", id: "D" },
             { name: "第7、8 节", id: "E" },
             { name: "第9、10 节", id: "F" },
            ];


dp.onBeforeCellRender = function(args) {
	if(args.cell.start.value == time){
		args.cell.backColor = "#ffffd5";
	}
}

dp.onBeforeEventRender = function(args) {
	//console.log(args)
	args.e.bubbleHtml = "<div><b>" + args.e.text + "</b></div>";
};
var number = 1;
dp.contextMenu = new DayPilot.Menu({
    cssClassPrefix: "menu_default",
    items: [
         {text:"删除排课", onclick: function(){
        	 var source = this.source;
        	 var scheduceId = source.data.schedule.scheduleId;
        	 var courseName = source.data.schedule.experimentCourse.courseName;
        	 var operatorId = source.data.schedule.operatorId;
        	 if(operatorId == teacherInfoId){
        		  var title='';
             	 if(source.data.schedule.type==1 && source.data.schedule.tbClassList!=null){
             		 title='确认要删除该排课吗(一旦删除,该课程下所有班级的学生实验成绩都会被删除)?';
             	 }else{
             		 title='确认要删除该排课吗?';
             	 }
             	  
             	 layer.confirm(title,{title:'删除'},function(index){
             		   layer.close(index);
             		   $.ajax({
             			   url:ctx+"/courseScheduleController/delete/"+scheduceId+'/'+courseName+'/'+schooltime+'/'+slice+'/'+type+'/'+number,
             			   type:"post",
             			   dataType:"json",
             			   success:function(result){
             				   if(result.status == 200){
             					   dp.events.remove(source);
             					   layer.msg('删除成功',{icon:1,time:1000});
             				   }else{
             					   layer.msg(result.msg,{icon:2,time:1000});
             				   }
             			   }
             		   })
             	 });
        	 }else{
       	      layer.msg("<span style='color:#CAE1FF'>"+'该课程不属于你，不能进行操作！'+"</span>",{tips:[3,'#6CA6CD']});

        	 }
        
        	}
         }
      
    ]});


dp.eventMoveHandling = "Disabled";
dp.eventResizeHandling = "Disabled";


//
function checkSeatNum(obj){
	var value = $(obj).val();
	value = value.replace(/[^\d]/g,'')
	if(value!=''){
		value = value/1 > seatsNum ? seatsNum : value;
	}
	$(obj).val(value);
}

//初始化表格
function initForm(){
    $("#layer_add input[name='types'][value=1]").click();
    $("#layer_add input[name='type']").val(1);
    $("#layer_add input[name='seats']").val('');
    $("#layer_add textarea").val('');
    $("#layer_add input[name='tbClassId']").prop("checked",false);
    $("#experiment_course_select").val(-1);
    $('#add_class_select').html('');
    $('#add_class_select').css('display','none');
    getExperiment($("#experiment_course_select").val(),"experimentSelect","add_class_select");
}

// event creating
dp.timeRangeSelectedHandling = "JavaScript";
dp.onTimeRangeSelected = function (args) {
	$("input[name='slice']").val(args.resource);//节数
	$("input[name='schooltime']").val(getFormateDate(args.start));//上课时间
	if(labStatus == 2){
		layer.msg('该实验室正在维护中，不能预约',{icon:2,time : 2000});
		return false;
	}
	initForm();
	var index = layer.open({
      type: 1,
      content: $('#layer_add'),
      title:labName+'预约',
      area: ['600px','450px'],
      end:function(){
    	  layer.closeAll();
    	  initForm();
      }
    });
};

dp.eventClickHandling = "JavaScript";
dp.onEventClick = function (args){
  thisArgs = args;//
  //添加
  $("input[name='slice']").val(args.e.data.schedule.slice);//节数
  $("input[name='schooltime']").val(args.e.data.schedule.schooltimeToString);//上课时间
  if(labStatus == 2){
		layer.msg('该实验室正在维护中，不能预约',{icon:2,time : 2000});
		return false;
	}
  	var operatorId = args.e.data.schedule.operatorId
  if(operatorId == teacherInfoId){
	  var	url = ctx+'/courseScheduleController/toScheduleDetailPage/'+args.e.data.schedule.scheduleId+'/'+menuParam;
	  
 
  	
  	var button='';
  //	var courseNames  = $('#experiment_course_select option:selected').text();
  	var courseNames = args.e.data.schedule.experimentCourse.courseName;
  	if(args.e.data.schedule.type== 1 || args.e.data.schedule.type==2){
  		
  		 button = '<span class="toDetailPage" onclick="Hui_admin_tab(this);" data-href="'+url+'" data-title="排课详情('+courseNames+')"></span>';
  	}else{
 		 button = '<span class="toDetailPage" onclick="Hui_admin_tab(this);" data-href="'+url+'" data-title="排课详情('+courseNames+')"></span>';
  	}
	$('.jumpBtn').html(button);
	$('.toDetailPage').click();
  }else{
	  //layer.msg('该课程不属于你，不能进行操作！',{icon:1,time:3000});
      layer.msg("<span style='color:#CAE1FF'>"+'该课程不属于你，不能进行操作！'+"</span>",{tips:[3,'#6CA6CD']});

  }
	 /*	var index = layer.open({
    type: 1,
    content: $('#layer_add'),
    title: '预约',
    area: ['600px','450px'],
    end:function(){
  	  layer.closeAll();
    }
  });*/
	
	
  /*layer.confirm('您是要编辑内容还是预约呢?', {
    btn: ['编辑','新增'] //按钮
  }, function(){
	  var value = thisArgs.e.data.schedule;
	  if(value.type == 1 || value.type == 3){
			//整班上课+自主预约
			$("#edit_class_select").parent().parent().parent().removeClass("hide");
			$("#experimentSelect2").parent().parent().parent().removeClass("hide");
		}else if(value.type == 2 || value.type == 4){
			//小组协作+私人课程
			$("#edit_class_select").parent().parent().parent().addClass("hide");
			$("#experimentSelect2").parent().parent().parent().addClass("hide");
		}
	  
	  
      $("#layer_edit input[name='scheduleId']").val(value.scheduleId);
      $("#experiment_course_select2").val(value.courseId);
      //实验
      $.ajax({
			 url:ctx+"/experimentController/selectExperimentByExperimentCourseId/"+ $("#experiment_course_select2").val(),
			 type:"post",
			 dataType:"json",
			 success:function(result){
				 if(result.status==200){
					 var data = result.data;
					 var html = "";
					 for(var i=0; i<data.length; i++){
						 html += "<option value='"+data[i].experimentId+"'>"+data[i].experimentName+"</option>";
					 }
					 if(html == ""){
						 html += "<option disabled>该课程下没有分配实验</option>";
					 }
					 $("#experimentSelect2").html(html);
					 $("#experimentSelect2").val(value.experimentId);
					 //根据实验id找班级
					 $.ajax({
							async: true,
							type: 'GET',
							url: ctx+'/experimentCourseClassController/selectClassByExperimentCourseId/'+value.experimentId,
							dataType: 'json',
							success: function(sysresult){
								if(sysresult.status == 202||sysresult.status == 400){
									$("#edit_class_select").html("<option disabled selected>"+sysresult.msg+"</option>");
								}else{
									var optioncontent = '';
									for(var i=0;i<sysresult.data.length;i++){
										optioncontent += '<input type="checkbox" name="tbClassId" value="'+(sysresult.data[i]).id+'">'+(sysresult.data[i]).name+'('+sysresult.data[i].majorName+')<br/>';
									}
									$("#edit_class_select").html(optioncontent);
									$("#edit_class_select").val(value.classId);
									var tblassCheck = value.tbClassList;
									for(var j=0; j<tblassCheck.length; j++){
										$("#layer_edit input[name='tbClassId'][value='"+tblassCheck[j].id+"']").prop("checked",true);
									}
								}
							},
							error:function(data) {
							}
						})
				 }
			 }
		});
      
      $("#classId").val(value.classId);
      $("#layer_edit textarea[name='presentation']").val(value.presentation);
      $("#layer_edit input[name='type'][value="+value.type+"]").attr("checked","checked");
    
      var index = layer.open({
	      type: 1,
	      content: $('#layer_edit'),
	      title: '编辑',
	      area: ['600px','450px'],
	      end:function(){
	    	  layer.closeAll();
	      }
	  });
  }, function(){
	    if(labStatus == 2){
			layer.msg('该实验室正在维护中，不能预约',{icon:2,time : 2000});
			return false;
		}
    	var index = layer.open({
          type: 1,
          content: $('#layer_add'),
          title: '预约',
          area: ['600px','450px'],
          end:function(){
        	  layer.closeAll();
          }
        });
  });*/
    
}
//查询这个学期所有的排课
function initDp(){
	getSemesterSchedule($("#semesterSelect").val())
}
//var courseName;
var slice;
var schooltime;
var type ;
//获取学期的安排
function getSemesterSchedule(semesterId){
	if(semesterId != null && semesterId != "")
		$.ajax({
			url: ctx+'/courseScheduleController/getSemesterSchedule/'+labId+"/"+semesterId,
			type:'post',
			dataType: 'json',
			success: function(result){
				var data = result.data;
				if(data!=null){
					//thisWeekNum = data.weekNum; /* thisWeekNum 重定义 始终查询结果为 1 */
					var value = data.scheduleList;
					for(var i=0; i<value.length; i++){
						//console.log(data);
						//获取该课程操作者作为判断参数
						var operatorId =  value[i].operatorId;
						schooltime = value[i].schooltime;
						type = value[i].type;
						var startTime=value[i].schooltimeToString;
						startTime = startTime.replace("  ","T");
				         slice=value[i].slice;
				         //课程名称
				         var  courseName=value[i].experimentCourse.courseName;
				        var experimentName= value[i].experiment;
				        if(experimentName==null){
				        	experimentName='';
				        }else{
				        	experimentName=experimentName.experimentName
				        }
				        var teacherName = value[i].teacherInfo.name;
				        dp.events.add(setDayPilot(startTime,startTime,slice,courseName,experimentName,teacherName,value[i]));
				        dp.clearSelection();
					}
				}
			},
			error:function(){
				layer.msg('请求失败!')
			}
		})
}



//跳转到某一周
function jump_week(obj){
	var num = $(obj).siblings('input').val()*1;
	if((!isNaN(num)) && (num>0) && (num <= eWeek) && (num%1===0)){
		var jumpNum = num - thisWeekNum;
		dp.startDate = dp.startDate.addDays(jumpNum*7);
		var thisStartDate = dp.startDate.value;
		dp.update()
		thisWeekNum = thisWeekNum + jumpNum;
		weekNum(num);
	}else{
		layer.msg('请跳转到存在周!');
	}
}


//上一周
function previousBtn_week(){
	if((thisWeekNum-1)<=0){
        layer.msg("已经是第一周了!");
	    return;
	}
	dp.startDate = dp.startDate.addDays(-7);
	var thisStartDate = dp.startDate.value;//上一周周一时间
	dp.update();
	weekNum(--thisWeekNum);
}


//下一周
function nextBtn_week(){
	if((thisWeekNum+1)>eWeek){
		layer.msg("已经是最后一周了!");
		return;
	}
	dp.startDate = dp.startDate.addDays(7);
	var thisStartDate = dp.startDate.value;//下一周周一时间
	dp.update();
	weekNum(++thisWeekNum);
}

function weekNum(num){
  var firstCorner = $('.dayPilot-blue_corner');
  firstCorner.html('第 '+num+' 周');
  if(num<=sWeek){
	  $('.lastWeek').attr('href','javascript:layer.msg("已经是第一周了!");');
  }else{
	  $('.lastWeek').attr('href','javascript:previousBtn_week();');
  }
  
  if(num>=eWeek){
	  $('.nextWeek').attr('href','javascript:layer.msg("已经是最后一周了!");');
  }else{
	  $('.nextWeek').attr('href','javascript:nextBtn_week();');
  }
  
  $('.dayPilot-blue_corner').css({'color':'#fff','font-size':'14px','line-height':'40px','text-align':'center'});
}


//实验室修改
function experiment_lab_edit(url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : '修改',
		content : url,
		area : [ '600px', '450px' ],
		maxmin:true,
		scrollbar: false,
		resize: true
	});
	//layer.full(index);
}


//实验室删除
function experiment_lab_del(obj, id) {
	layer.confirm('删除该实验室会将所属的实验数据一并删除!',{title:'删除实验室'},function(index) {
		$.ajax({
			type : 'POST',
			url : ctx+'/experimentLabController/delete/'+id+'/'+labName,
			dataType : 'json',
			success : function(data) {
				if(data.status==200){
					$(obj).parents("tr").remove();
					layer.msg('已删除!', {
						icon : 1,
						time : 1000
					});
					setTimeout('removeIframe()',1500);
					/* window.location.reload(); */
				}else{
					layer.msg(data.msg, {
						icon : 2,
						time : 2000
					});													
				}
			},
			error : function(data) {
				console.log(data.msg);
			},
		});
	});
}


/*格式化日期*/
function getFormateDate(date){
	var str = date+"";
	return str.replace("T"," ");  
}

$(function(){
	//initDp(sDate);
	initDp();
	dp.init();
	weekNum(thisWeekNum);
	$("#layer_edit").Validform({
		btnSubmit:"#layer_edit_submit", 
		btnReset:"",
		tiptype:2, 
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:true,
		postonce:true,
		ajaxPost:true,
		datatype:{
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"n-en" : /[0-9a-zA-Z]{1,23}/,
			"ch"   : /[\u4E00-\u9FA5]+$/,
			"number":/^[0-9]{1,3}$/
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		},
		callback:function(result){
			if(result.status == 200){
				layer.msg('修改成功',{icon:1,time:1000});
				setTimeout('window.location.reload()',1500);
			}else{
				layer.msg(result.msg,{icon:2,time:1000});
			}
		}
	});
	
	$("#layer_add").Validform({
		btnSubmit:"#layer_add_submit", 
		btnReset:"",
		tiptype:2, 
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:true,
		postonce:true,
		ajaxPost:true,
		datatype:{
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"n-en" : /[0-9a-zA-Z]{1,23}/,
			"ch"   : /[\u4E00-\u9FA5]+$/,
			"number":/^[0-9]{1,3}$/
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
			//判断type,这里默认是私人课程的
			$("#layer_add").attr("action",ctx+"/courseScheduleController/appointment");
			var typeValue = $("#layer_add input[name='types']:checked").val()/1;//1 --整班上课	2 --小组协作	3 --自主预约
			//是否选择了课程
			if($("#experiment_course_select").val() == null || $("#experiment_course_select").val() == -1){
				layer.msg('请选择实验课程',{icon:2,time:1500});
				return false;
			}
			//是否选择了实验
			if($("#experimentSelect").val() == null){
				/*if(typeValue!=3){*/
					layer.msg('请选择实验',{icon:2,time:1500});
					return false;
				/*}*/
			}
			//是否徐选择了班级
			var classIds = new Array();
			if(checkClassesIsChecked()==1){
				layer.msg('请选择班级！',{icon:2,time:1500});
				return false;
			}else{
				$("#add_class_select input[name='tbClassId']:checked").each(function(index){
					classIds.push($(this).val());
				});
			}
			//是否填写了座位数
			if(typeValue==3){
				var seats = $("input[name='seats']").val()/1;
				if(seats==null || seats==''){
					layer.msg('预约座位数不能为空！',{icon:2,time:1500});
					return false;
				}
			}
			$("#layer_add input[name='type']").val(typeValue);
			$("#layer_add input[name='classIds']").val(classIds+"");
			
			
			//初始化表格
			$("#layer_add input[name='types'][value=1]").attr("checked","checked");
			$("#add_class_select").parent().parent().removeClass("hide");
			$("#experimentSelect").parent().parent().parent().removeClass("hide");
			$("#add_class_select").parent().parent().removeClass("hide");
			
		},
		beforeSubmit:function(curform){},
		callback:function(result){
			if(result.status == 200){
		        var startTime=$("#layer_add input[name='schooltime']").val();
		        var slice=$("#layer_add input[name='slice']").val();
		        var exprimentName=$('#experimentSelect option:selected').text();
		        var courseName  = $('#experiment_course_select').children('option:selected').text();
		        startTime = startTime.replace("  ","T").replace(" ","T");
		        dp.events.add(setDayPilot(startTime,startTime,slice,courseName,exprimentName,result.data.teacherName,result.data.schedule));
		        layer.msg('添加成功',{icon:1,time:1000});
		        var typeValue = $("#layer_add input[name='types']:checked").val()/1;//1 --整班上课	2 --小组协作	3 --自主预约
		
		        var	url = ctx+'/courseScheduleController/toScheduleDetailPage/'+result.data.schedule.scheduleId+'/'+menuParam;
		       
		        var button = '<span class="aboutDetail" onclick="Hui_admin_tab(this);" data-href="'+url+'" data-title="排课详情"></span>';
		        $('.aboutDetail').click();
		        layer.closeAll();
		        initForm();
			}else{
				layer.msg(result.msg,{icon:2,time:1000});
			}
		}
	});
	
	//判断是否选中班级
	function checkClassesIsChecked(){
		var isChecked = 1;
		$('#add_class_select').children('input[name="tbClassId"]').each(function(index){
			var a = $('#add_class_select').children('input[name="tbClassId"]').eq(index).prop('checked');
			if(a==true){
				isChecked = isChecked*0;
			}else{
				isChecked = isChecked*1;
			}
		})
		return isChecked;
	}
	
	//默认整班上课，初始化实验和班级
	getExperiment($("#experiment_course_select").val(),"experimentSelect","add_class_select");
	/*getExperiment($("#experiment_course_select2").val(),"experimentSelect2","edit_class_select");*/
	getExperimentTbClass($("#experiment_course_select").val(),"add_class_select");
	getExperimentTbClass($("#experiment_course_select").val(),"edit_class_select");
	//实验onchange事件,当改变实验时，更换班级
	/*$("#experimentSelect").bind("change",function(){
		getExperimentTbClass($(this).val(),"add_class_select");
	});
	$("#experimentSelect2").bind("change",function(){
		getExperimentTbClass($(this).val(),"edit_class_select");
	});*/
	
	
	//实验课程onchange事件，根据课程换实验，换班级
	$("#experiment_course_select").bind("change",function(){
		//console.log($(this).children('option:selected').text())
		getExperiment($(this).val(),"experimentSelect","add_class_select");
		getExperimentTbClass($(this).val(),"add_class_select");
	});
	$("#experiment_course_select2").bind("change",function(){
		getExperiment($(this).val(),"experimentSelect2","edit_class_select");
		getExperimentTbClass($(this).val(),"edit_class_select");
	});
	
	//预约类型切换
	$(".selectType input").each(function(index){
		var typeValue = $(this).val();//1 --整班上课	2 --小组协作	3 --自主预约
		$(".selectType input").eq(index).unbind().bind("change",function(){
			if(typeValue == 1 || typeValue == 2){
				$(".seats").attr("style","display:none");
				/*var obj = $('#experimentSelect').children('option').eq(0);
				$(obj).html('请选择实验');
				$(obj).attr('disabled','disabled');
				$(obj).removeAttr('selected');
				$('#experimentSelect').children('option').eq(1).attr('selected','selected');*/
			}else if(typeValue == 3){
				$(".seats").removeAttr("style");
				/*var obj = $('#experimentSelect').children('option').eq(0);
				$(obj).html('无实验安排');
				$(obj).removeAttr('disabled');
				$(obj).attr('selected','selected');*/
			}
			$("#layer_add input[name='type']").val(typeValue);
		});
	})
	//预约类型切换
/*	$("#layer_add input[name='types']").bind("change",function(){
		var typeValue = $(this).val();
		if(typeValue == 1 ||   typeValue==2 ){
			//整班上课+自主预约
			$("#add_class_select").parent().parent().removeClass("hide");
			$("#experimentSelect").parent().parent().parent().removeClass("hide");
		}else if(typeValue == 4){
			//小组协作+私人课程
			$("#add_class_select").parent().parent().addClass("hide");
			$("#experimentSelect").parent().parent().parent().addClass("hide");
		}else if(typeValue == 3){
			//小组协作+私人课程
		    alert(1111)
		}
		$("#layer_add input[name='type']").val(typeValue);
	});
	$("#layer_edit input[name='type']").bind("change",function(){
		var typeValue = $(this).val();
		if(typeValue == 1 || typeValue == 3){
			//整班上课+自主预约
			$("#edit_class_select").parent().parent().removeClass("hide");
			$("#experimentSelect2").parent().parent().parent().removeClass("hide");
		}else if(typeValue == 2 || typeValue == 4){
			//小组协作+私人课程
			$("#edit_class_select").parent().parent().addClass("hide");
			$("#experimentSelect2").parent().parent().parent().addClass("hide");
		}
	});
	
	*/
	
	
	/*关闭layer*/
	$("#layer_add_cancle").bind("click",function(){
		layer.closeAll();
	})
	$("#layer_edit_cancel").bind("click",function(){
		layer.closeAll();
	})
})
	/**
	 * 开始时间/结束时间/第几节/实验名称/任课教师
	 */
function setDayPilot(start,end,resource,courseName,experimentName,teacherName,schedule,operatorId){
	/*	var content = "实验室:"+labName+"(NO."+labNumber+")"+"<br />课程:"+experimentName+"<br />"+"任课教师: "+teacherName;
	*/
	var type= schedule.type;
	var str='';
	 if(type == 1){
		 str='整班上课';
	 }else if(type == 2) {
		 str ='小组协作';
	 }else if(type == 3){
		 str ='自主预约';
	 }else if(type==4){
		 str ='私人日程';
	 }else{
		 str='获取数据失败';
	 }
	 /*	 if(schedule.experiment==null || schedule.experiment==null){
		 	experimentName='1';
		 }else{
			 experimentName=schedule.experiment.experimentName;
		 }
	 
		 var courseName ='';
		 if(schedule.experimentCourse==null || schedule.experimentCourse.courseName==null){
			 courseName='1';
		 }else{
			 courseName=schedule.experimentCourse.courseName;
	 	}*/
	 var content ='';
	 if( type==4){
		 content = "课程: "+courseName+
	       "<br/>操作人: "+teacherName+
	       "<br/>预约类型: "+str;
	 }else{
		 content = "课程: "+courseName+
	       "<br />实验: "+(experimentName==null?"未指定":experimentName)+
	       "<br/>操作人: "+teacherName+
	       "<br/>预约类型: "+str;
	 }
	return  new DayPilot.Event({
        start: start,
        end: end,
        id: DayPilot.guid(),
        resource: resource,
        text: content,
        schedule:schedule
    });
}

	/*根据课程获取实验*/
	function getExperiment(id,exprimentSelectId,tbclassId){
		$.ajax({
			 url:ctx+"/experimentController/selectExperimentByExperimentCourseId/"+id+"/"+identify,
			 type:"post",
			 dataType:"json",
			 success:function(result){
				 var html = "<option selected disabled>请选择实验</option> ";
				 if(result.status==200){
					 var data = result.data;
					 for(var i=0; i<data.length; i++){
						 html += "<option value='"+data[i].experimentId+"'>"+data[i].experimentName+"</option>";
					 }
					 if(html == ""){
						 html += "<option disabled>该课程下没有分配实验</option>";
					 }
				 }else{
					 html += "<option seleted disabled>该课程下没有分配实验</option>";
				 }
				 $("#"+exprimentSelectId).html(html);
			 }
		});
	}
	
	
	/*根据实验课程ID查询课程下的班级*/
	function getExperimentTbClass(id,selectId){
		var courseTime = $("input[name='schooltime']").val();
		var courseSlice = $("input[name='slice']").val();
		//console.log(courseTime);
		//console.log(courseSlice);
		//课程开始时间 星期几-- 课程节数               
		$.ajax({
			async: true,
			type: 'GET', 
			url: ctx+'/experimentCourseClassController/selectClassByExperimentCourseId/'+id+'/'+courseTime+'/'+courseSlice,
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					$("#"+selectId).html(sysresult.msg);
				}else{
					var optioncontent = '';
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent += '<input type="checkbox" name="tbClassId" value="'+(sysresult.data[i]).id+'">'+(sysresult.data[i]).name+'(专业：'+sysresult.data[i].majorName+'，'+sysresult.data[i].memberNum+'人)<br/>';
					}
					$("#"+selectId).html(optioncontent);
				}
			},
			error:function(data) {
			}
		})
	}
	//改变学期
	$("#semesterSelect").bind("change",function(){
		window.location.href = ctx+'/courseScheduleController/toDetailPage/'+labId+"/"+$(this).val();
	});