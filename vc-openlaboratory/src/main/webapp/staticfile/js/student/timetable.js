var thisArgs;
var date = new Date();
var aaa = date.getDate()/1-date.getDay()/1+1;
var time = date.getFullYear()+"-"+("0"+(date.getMonth()/1+1*1)).slice(-2)+"-"+('0'+date.getDate()).slice(-2)+"T00:00:00";
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

dp.contextMenu = new DayPilot.Menu({
    cssClassPrefix: "menu_default",
    items: [
		/* {text:"删除排课", onclick: function(){
        	 var source = this.source;
        	 var scheduceId = source.data.schedule.scheduleId;
        	  var title='';
        	 if(source.data.schedule.type==1 && source.data.schedule.tbClassList!=null){
        		 title='确认要删除该排课吗(一旦删除,该课程下所有班级的学生实验成绩都会被删除)?';
        	 }else{
        		 title='确认要删除该排课吗?';
        	 }
        	  
        	 layer.confirm(title,{title:'删除'},function(index){
        		   layer.close(index);
        		   $.ajax({
        			   url:ctx+"/courseScheduleController/delete/"+scheduceId,
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
        	}
         }*//*,
         {
        	 text:"查看详情",onclick:function(){
            	 var scheduceId = this.source.data.schedule.scheduleId;
            	 var type = this.source.data.schedule.type;
            	 if(type == 4){
            		 layer.msg('私人日程没有更多详情',{icon:2,time:1000});
            		 return false;
            	 }
        		 window.location.href=ctx+"/courseScheduleController/toScheduleDetailPage/"+scheduceId+"/"+menuParam;
        	 }
         }*/
    ]});

dp.onBeforeCellRender = function(args) {
  if(args.cell.start.value == time){
    args.cell.backColor = "#ffffd5";
  }
}

dp.onBeforeEventRender = function(args) {
    args.e.bubbleHtml = "<div><b>" + args.e.text + "</b></div>";
};

dp.eventMoveHandling = "Disabled";
dp.eventResizeHandling = "Disabled";

// event creating
dp.timeRangeSelectedHandling = "JavaScript";
dp.onTimeRangeSelected = function (args) {
	/*
	* 真实书调用方法 start
	*/
	/*$("input[name='slice']").val(args.resource);//节数
	$("input[name='schooltime']").val(getFormateDate(args.start));//上课时间
	if(labStatus == 2){
		layer.msg('该实验室正在维护中，不能预约',{icon:2,time : 2000});
		return false;
	}
	var index = layer.open({
      type: 1,
      content: $('#layer_add'),
      title:labName+'预约',
      area: ['600px','450px'],
      end:function(){
    	  layer.closeAll();
      }
    });*/
    /*
	* 真实数据调用方法 end
	*/

    return false; //static test
};

dp.eventClickHandling = "JavaScript";
dp.onEventClick = function (args){
  thisArgs = args;
    var schedule = args.e.data.schedule;
  //添加
  	var	url ='experiment.html';
  	var button='';
    /*postMessage(url,'排课详情');*/
	button = '<span class="toDetailPage" onclick="Hui_admin_tab(this);" data-href="'+url+'" data-title="排课详情"></span>';
	$('.jumpBtn').html(button);
	$('.toDetailPage').click();
    
}


//查询这个学期所有的排课
function initDp(){
	getSemesterSchedule($("#semesterSelect").val());
}

/*
*============= static test start ==============
*/
function initDp(sdate){
	var e = new DayPilot.Event({
          start: sdate,
          end: sdate,
          id: DayPilot.guid(),
          resource: "D",
          text: "<span class='fs-14 fw-bold'>这是实验名称</span><br><span class='fw-bold'>物理实验楼 2010 室</span><br>所属课程: XXX课程<br>指导老师: 王大鹅"
      });
  	dp.events.add(e);
    //dp.clearSelection();
}
/*
*============= static test end ==============
*/

//获取学期的安排
function getSemesterSchedule(semesterId,url){
	if(semesterId != null && semesterId != "")
		$.ajax({
			url: url,
			type:'get',
			dataType: 'json',
			success: function(map){
				//thisWeekNum = data.weekNum;
				var courseScheduleDTOS = map.courseScheduleDTOS;
				for(var i=0; i<courseScheduleDTOS.length; i++){
					console.log(courseScheduleDTOS[i]);
			        dp.events.add(setDayPilot(courseScheduleDTOS[i]));
			        dp.clearSelection();
				}
			}
		})
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
	  $('.lastWeek').attr('href','##');
	}else{
	  $('.lastWeek').attr('href','javascript:previousBtn_week();');
	}

	if(num>=eWeek){
	  $('.nextWeek').attr('href','##');
	}else{
	  $('.nextWeek').attr('href','javascript:nextBtn_week();');
	}

$('.dayPilot-blue_corner').css({'color':'#fff','font-size':'14px','line-height':'40px','text-align':'center'});
}


/*格式化日期*/
function getFormateDate(date){
	var str = date+"";
	return str.replace("T"," ");  
}

/**
 * 开始时间/结束时间/第几节/实验名称/任课教师
 */
function setDayPilot(schedule){
    var experimentName= schedule.experimentName;
    if(experimentName==null){
        experimentName='';
    }

    var content ="实验："+experimentName+
        "<br/>地址："+schedule.labName+
        "<br/>课程："+schedule.courseName+
        "<br/>教师："+schedule.teacherName;

	var type= schedule.type;
	var str='';
	var classS = '<div style="background:#fff8e4;color:#f2f2f2;">';
	var groupDivS = '<div style="background:#fff8e4;color:#3c817e;">';
	var personalOrderDivS = '<div style="background:#e4ffe6;color:#3c817e;">';
    var divE = '</div>';
	 if(type == 1){
		 str='整班上课';
         content = classS + content +divE;//若为小组协作,则改变背景颜色以区分;
	 }else if(type == 2) {
		 str ='小组协作';
         content = groupDivS + content +divE;//若为小组协作,则改变背景颜色以区分;
	 }else if(type == 3){
		 str ='自主预约';
		 content = personalOrderDivS + content +divE;//若为自主预约,则改变背景颜色以区分;
	 }else{
		 str='未知';
	 }

	return  new DayPilot.Event({
		start: schedule.schooltimeString,
		end: schedule.schooltimeString,
		id: DayPilot.guid(),
		resource: schedule.slice,
		text: content,
		schedule:schedule
	});
}

/*关闭layer*/
$("#layer_add_cancle").bind("click",function(){
	layer.closeAll();
})
$("#layer_edit_cancel").bind("click",function(){
	layer.closeAll();
})

/*$(function(){
	initDp(sday); //static test
    getSemesterSchedule(semesterId,'/pexperiment/student/course/schedule/getCourseSchedule/'+studentId+'/'+semesterId);
//	initDp();
	dp.init();
	weekNum(thisWeekNum);
})*/