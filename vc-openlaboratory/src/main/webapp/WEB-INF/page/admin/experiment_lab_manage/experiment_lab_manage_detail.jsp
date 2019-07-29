
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>实验室管理</title>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experimentManage.css">

<!-- daypilot css -->
<link rel="stylesheet" href="${ctx }/staticfile/lib/daypilot/themes/dayPilot-blue.css">   
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<style type="text/css">
	#Validform_msg{display:none !important;}
</style>
</head>
<body>
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>

	${experimentLab.labName }
	<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin"></i>
	</a>
	</nav>

	<div class="page-container clearfix">
		<div class="contain">
			<div class="row cl radius box-shadow pd-10" style="border:1px solid #ddd;margin:0 0 20px 0;background-color:#f5f5f5;">
				<div class="col-md-4 col-xs-12 col-sm-4 col-lg-3">
					<c:if test="${empty experimentLab.labImg }">
						<img src="${ctx }/staticfile/images/coursedefaultpic.png" class="col-sm-12" style="display:block;"/>
					</c:if>
					
					<c:if test="${not empty experimentLab.labImg }">
						<img src="${RESOURCE_WAY }/${experimentLab.labImg}" class="col-sm-12" style="display:block;"/>			
					</c:if>
				</div>
				<div class="col-md-8 col-sm-12 col-sm-8 col-lg-9">
					<p class="cl f-18">
						<i class="experimentFont">&#xe70e;</i>
						<span>NO.${experimentLab.labNumber }</span>
						<span>${experimentLab.labName }</span>
					</p>
					<div class="cl">
						<p class="f-l">
							<i class="experimentFont">&#xe60e;</i>
							<span>座位数: ${experimentLab.labSeat }(位)</span>
						</p>
						<p class="f-l pl-30">
							<i class="Hui-iconfont">&#xe705;</i>
							<span>
								负责人: 
								<c:forEach items="${experimentLab.dutyTeachers }" var="teacher">
									${teacher.name }
								</c:forEach>
							</span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i class="Hui-iconfont">&#xe68c;</i>
							<span>所属: ${experimentLab.departmentName }
							<c:if test="${empty experimentLab.departmentName }">通用实验室</c:if>
							<%-- 	<c:if test="${empty experimentLab.mainframeKey }">通用实验室</c:if>
								<c:if test="${not empty experimentLab.mainframeKey }">智慧实验室</c:if> --%>
							</span>
						</p>
						<p class="f-l pl-30">
							<i class="experimentFont">&#xe60d;</i>
							<span>实验室状态: 
								<c:if test="${experimentLab.labStatus eq 1}">
									<span class="c-green">可用</span>
								</c:if>
								
								<c:if test="${experimentLab.labStatus eq 2}">
									<span class="c-red">维护中</span>
								</c:if>
							
							</span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i class="Hui-iconfont">&#xe61a;</i>
							<shiro:hasPermission name="实验室统计(通用)">
							<span>使用次数: <a href="javascript:;" class="radius btn-warning pl-5 pr-5" onclick="Hui_admin_tab(this);" data-href="${ctx }/experimentLabStatisticsWebController/lab_used_count/${experimentLab.labId }/${experimentLab.labName }/${menuParam}" data-title="${lab.labName }实验室详情统计">${useCount} 次</a></span>
							</shiro:hasPermission>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">介绍: </p>
						<div class="pl-30">
							<p>
							   <c:choose>
							      <c:when test="${empty experimentLab.labDescription }">暂无实验室介绍</c:when>
							      <c:otherwise>${ experimentLab.labDescription}</c:otherwise>
							   </c:choose>
							</p>
						</div>
					</div>
					<p class="text-r">
				
					</p> 
				</div>
			</div>
		</div>
		
		
		<div class="cl">
			<div class="space f-l">
				<select class="select select-box" id="semesterSelect">
					<c:forEach items="${semesterList }" var="semester">
						<option value="${semester.semesterId }">${semester.semesterName }</option>
					</c:forEach>
				</select>
			</div>
			<div class="space f-l clearfix ml-20">
				<input type="text" value="" name="" style="border:1px solid #ccc;padding:2px;line-height:26px;" placeholder="请输入要查找的周数"/>
				<span class="btn btn-warning pl-15 pr-15 radius" onclick="jump_week(this);">跳转</span>
				<span class="totalWeekNum">总周数: ${semester.weekCount}</span>
			</div>
			<div class="space f-20 f-r mb-10">
				<a href="javascript:previousBtn_week();" class="lastWeek btn radius"><i class="Hui-iconfont" title="上一周">&#xe6d4;</i></a>
				<a href="javascript:nextBtn_week();" class="nextWeek btn radius"><i class="Hui-iconfont" title="下一周">&#xe6d7;</i></a>
			</div>
		</div>
	  	
	  	<div>
	  		<div id="dp"></div>
	  	</div>
	  	<div id="print"></div>
	
	
	  <!-- 添加课程表 -->
	  <form id="layer_add" style="display: none;" class="form" name="" action="">
	  	<input type="hidden" value="${experimentLab.labId}" name="labId"/>
	  	<input type="hidden" value="" name="slice"/>
	  	<input type="hidden" value="" name="schooltime"/>
	  	<input type="hidden" name="classIds">
	  	<input type="hidden" name="type" value="1">
	  	<input type="hidden" name="endTime" value="${semester.semester.endTimeToString}">
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>实验课程： </span></label>
		    <div class="col-sm-8">
		    	<div>
		    		<select name="courseId" id="experiment_course_select" class="select select-box">
				        <option value="-1">-请选择实验课程-</option>
						<c:choose>
					            <c:when test="${empty experiemntCourseList  }">
    		                	<option value="">暂未给您分配实验课程</option>
		    		           </c:when>
		    		           <c:otherwise>
					    		    <c:forEach items="${experiemntCourseList }" var="course">
							          <option value="${course.experimentCourseId }">${course.courseName }</option>
									</c:forEach>
		    		           </c:otherwise>
		    		   </c:choose>		    			
		    		</select>
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>预约类型： </span></label>
		    <div class="col-sm-8">
		    	<div class="selectType">
		    		<input type="radio" name="types" value="1" checked="checked">整班上课
		    		<!-- <input type="radio" name="types" value="2" >小组协作 -->
	    		 	<input type="radio" name="types" value="3" >自主预约
		    		<!--<input type="radio" name="types" value="4" >私人日程 -->
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		
		<div class="row cl seats" style="display:none">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>预约座位数： </span></label>
		    <div class="col-sm-8">
		    	<div class="selectType">
		    		<input type="text" name="seats" value="" onblur="checkSeatNum(this);" class="input-text">
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>实验： </span></label>
		    <div class="col-sm-8">
		    	<div>
		    		<select name="experimentId" id="experimentSelect" class="select select-box">
    					<option value="-1">请选择实验</option>
		    		</select>
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		
		
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>班级： </span></label>
		    <div class="col-sm-8">
		    	<div class="add_class_select_btn" style="padding:4px 10px; border:1px solid #ddd;cursor:pointer;">请选择班级</div>
		    	<div id="add_class_select" style="display:none;border:1px solid #ccc;" class="pd-10">
		    	
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		<!-- <input  name="type" value="4" type="hidden"/> -->
		
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span><span class="c-red pr-5">*</span>预约说明： </span></label>
		    <div class="col-sm-8">
		    	<div>
		    		<textarea rows="8" cols="40" name="presentation" class="textarea" onkeyup="$.Huitextarealength(this,500)" ></textarea>
		    		<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
		
		
	    <div class="row cl">
	    	<div class="col-xs-12 col-sm-12 text-c">
				<button onClick="" class="btn btn-primary radius" type="button" id="layer_add_submit">
				<i class="Hui-iconfont">&#xe600;</i>
				 添加</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="layer_add_cancle">
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				取消</button>
			</div>
			<div class="col-xs-12 col-sm-12 text-c c-red">
				<i class="pdr-10"></i><span></span>
			</div>
	    </div>
	  </form>
</div>
	<div style="display:none;" class="jumpBtn"></div>
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript"	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->
	<!--请在下方写此页面业务相关的脚本-->

	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<!-- daypilot libraries -->
	<script src="${ctx }/staticfile/lib/daypilot/daypilot-all.js" type="text/javascript"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
	<script>
	var labName = '${experimentLab.labName }';
	 var teacherInfoId = '${teacherInfo.id }';
	// var identify ='${systemIdentify}'; 
	//指定为实物实验  
	var  identify = 2;
		var ctx = '${ctx}',
		    labId = '${experimentLab.labId}',
		    labName = '${experimentLab.labName }',
		    labNumber = '${experimentLab.labNumber }',
		    menuParam = '${menuParam}',
		    labStatus = '${experimentLab.labStatus}',
		    seatsNum = '${experimentLab.labSeat }';
	
		var sWeek = '1',                      //第1周
			eWeek = '',                       //最后一周
			sDate = '',                       //这是第几周的开始的周一。比如:现在第14周，这个是第十四周的周一
			jumpType = '1';                   //
			thisWeekNum = '1';                 //当前周
			
		if('${semester}' != "" && '${semester}' != null){
			//改变学期
			$("#semesterSelect").val('${semester.semester.semesterId}');
			eWeek = '${semester.weekCount}'/1;
			sDate = '${semester.thisMonday}';
			thisWeekNum = '${semester.weekNum}'/1;
		}else{
			$("#semesterSelect").val('${semesterList[0].semesterId}');
			//获取第一条学期
			var dayCount = DateDiff('${semesterList[0].startTime }','${semesterList[0].endTime }');
			var sd = new Date(dateToGMT('${semesterList[0].startTime }')).getDay();
			var ed = new Date(dateToGMT('${semesterList[0].endTime }')).getDay();
			if(sd != 1 && ed != 0){
				if(sd != 0){
					eWeek = parseInt((dayCount - ((8-sd) + ed))/7)+2;
				}else{
					eWeek = parseInt((dayCount - (8-7) - ed)/7)+2;
				}
			}else if(sd != 1 || ed != 0){
				eWeek = parseInt(dayCount/7)+1;
			}else{
				eWeek = parseInt(dayCount/7);
			}
			$('.totalWeekNum').html('总周数: '+eWeek)
			sDate = '${semesterList[0].mondayTime }';
			thisWeekNum = 1;
		}
			
			
		//计算天数差的函数，通用  
	   function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
	       var  aDate,  oDate1,  oDate2,  iDays  
	       /* aDate  =  sDate1.split("-")  
	       oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式  
	       aDate  =  sDate2.split("-")  
	       oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  */
	       oDate1 = new Date(dateToGMT(sDate1));
	       oDate2 = new Date(dateToGMT(sDate2));
	       iDays  =  parseInt(Math.abs(oDate2  -  oDate1)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
	       return  iDays+1; 
	   }
	   function dateToGMT(strDate){
		    var dateStr=strDate.split(" ");  
		    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";  
		    var date = new Date(Date.parse(strGMT));
		    return date;
		}
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/js/experiment_lab_manage_detail.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
		    var url = window.location.href;
		    var filename = url.substring(url.lastIndexOf('/')+1);
		    if (filename === "") filename = "index.html";
		    $(".menu a[href='" + filename + "']").addClass("selected");
		    
		    $('.add_class_select_btn').on('click',function(){
		    	if($("#add_class_select").is(':hidden')){
		    		$("#add_class_select").slideDown();
		    	}else{
		    		$("#add_class_select").slideUp();
		    	}
		    })
		    
		});
		if($('#edit_class_select').val()==''){
			$('#edit_class_select').append('<span>暂无班级</span>')
		}
		if($('#add_class_select').html()==''){
			$('#add_class_select').append('<span>暂无班级</span>')
		}
	</script>
</body>
</html>