<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD sHTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" /> -->
<!-- <meta name="viewport" content="initial-scale=0.28"/> -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/footer.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/welcome.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/js/daypilot/themes/dayPilot-blue.css"> 

<style>
	.navbar-slogan{font-size:22px;}
</style>
</head>
<body>
<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="刷新">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>

	<div class="laboratory-container">
		<div class="inner clearfix box-shadow boxBorder">
			<div class="pd-20 pt-30 pb-30 clearfix">
				<!-- top start -->
				<div class="col-lg-12 col-sm-12 stuMsg box-shadow">
				<div class="col-lg-2 col-sm-2">
						<div class="text-c stu-avatar"><img src="${RESOURCE_WAY }/${studentInfo.imagePath}" alt=""></div>
					</div>
					<div class="col-lg-10 col-sm-10">
						<p class="f-16 fw-bold c-white pb-5">${studentInfo.tbClass.grade.major.department.name }</p>
						<p class="f-16 c-white pb-10"><span class="f-22 fw-bold">${studentInfo.name }</span>&emsp;<span>[学号:${studentInfo.user.username }&nbsp;&nbsp;班级:${studentInfo.tbClass.name }]</span><span class="pl-15">同学</span><span class="pl-20">欢迎你 !</span></p>
						<p class="pl-20 pr-20 pt-5 pb-5 bg-1 f-l">这是你的第<span class="c-orange fw-bold pl-5 pr-5">${studentInfo.loginNumber }</span>登录,上次登录时间为 <span class="c-orange fw-bold pl-5 pr-5"><fmt:formatDate value="${studentInfo.preTime}" pattern="yyyy-MM-dd HH:mm:ss" /></span></p>
					</div>
				</div>
				<!-- top end -->

				<!-- schedule start -->
				<div class="col-lg-12 col-sm-12 schedule box-shadow mt-20 boxBorder">
					<div class="pos-r">
						<p class="text-c f-20 pt-10 fw-bold fc-objBlue">我的课表(<span id="semester_name"></span>)</p>
						<div class="courseSwiper"><div id="dp"></div></div>
						<a class="swiper-btn swiper-prev" href="javascript:previousBtn_week();" title="上一周"></a>
						<a class="swiper-btn swiper-next" href="javascript:nextBtn_week();" title="下一周"></a>
					</div>
					<div class="clearfix pb-20 mb-10" style="width:950px;margin: 0 auto;">
						<p class="f-l pr-20"><span class="pl-20 pr-20" style="background-color: #f2f2f2;border: 1px solid #ccc;"></span>&nbsp;整班上课</p>
						<!-- <p class="f-l pr-20"><span class="pl-20 pr-20" style="background-color: #fff8e4;border: 1px solid #ccc;"></span>&nbsp;小组协作</p> -->
						<p class="f-l pr-20"><span class="pl-20 pr-20" style="background-color: #e4ffe6;border: 1px solid #ccc;"></span>&nbsp;自主预约</p>
					</div>
				</div>
				<!-- schedule end -->
				
				<!-- count start -->
		<%-- 		<div class="col-lg-12 col-sm-12 count box-shadow mt-20 bk-gray box-shadow bc-f2 clearfix pd-5">
					<div class="col-lg-4 col-sm-4 clearfix fw-bold">
						<p class="f-l count-num text-c f-22">${scourseStudent }</p>
						<div class="f-l count-text"><span>我的预约总数</span></div>
					</div>
					<div class="col-lg-4 col-sm-4 clearfix fw-bold">
						<p class="f-l count-num text-c f-22">${experimenTcourse }</p>
						<div class="f-l count-text"><span>我的课程总数</span></div>
					</div>
					<div class="col-lg-4 col-sm-4 clearfix fw-bold">
						<p class="f-l count-num text-c f-22">${experimentList} </p>
						<div class="f-l count-text"><span>我的实验总数</span></div>
					</div>
				</div> --%>
				<!-- count end -->

				<!-- jump start -->
				<div class="col-lg-12 col-sm-12 jump box-shadow mt-20 bc-white clearfix boxBorder">
					<div class="col-lg-6 col-sm-6 mt-10 mb-10">
						<p class="p1"style="text-align:center; font-size:35px"data-href="${ctx }/studentController/toExperimentReservationPage?semesterId=${semester.semester.semesterId}" data-title="我的预约" onclick="Hui_admin_tab(this);" ></p>
					</div>
					<div class="col-lg-6 col-sm-6 mt-10 mb-10">
						<p class="p2" style="text-align:center; font-size:35px" data-href="${ctx }/studentController/toMyExperimentListPage/${studentInfo.id}" data-title="我的实验" onclick="Hui_admin_tab(this);"></p>
					</div>
					<div class="col-lg-6 col-sm-6 mt-10 mb-10">
						<p class="p4" style="text-align:center; font-size:35px" data-href="${ctx }/studentController/totalResources/${studentInfo.tbClass.grade.major.department.id }" data-title="在线资源" onclick="Hui_admin_tab(this);"></p>
					</div>
					<div>
					</div>
					<div class="col-lg-6 col-sm-6 mt-10 mb-10">
						<%-- <p class="p3"style="text-align:center; font-size:35px" data-href="${DISCUSSION_URL}/invitationWebController/toStudentInvitationMainPage" data-title="交流中心" onclick="Hui_admin_tab(this);"></p> --%>
						<p class="p3"style="text-align:center; font-size:35px"><a href="${DISCUSSION_URL}/page/studentInfo/index" title="交流中心" target="_blank" style="display:block;width:100%;height:100%;""></a></p>
					</div>
				</div>
				<!-- jump end -->
			</div>
		</div>
	</div>
	<%@include file="../footer.jsp"%>
	<div class="jumpBtn" style="display:none;"><span class="toDetailPage" onclick="Hui_admin_tab(this);" data-href="experiment.html" data-title="排课详情"></span></div>
</body>
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/daypilot/daypilot-all.js"></script>
<script>
	var ctx = '${ctx}';
	var sWeek = '1',                      //第1周
		eWeek = '',                       //最后一周
		sDate = '',                       //这是第几周的开始的周一。比如:现在第14周，这个是第十四周的周一
		jumpType = '0';                   //* 0 从当前周开始  * 1 从指定周开始
		thisWeekNum = '1';                 //当前周
		var semesterId = '${semester.semester.semesterId}'; //学期id
		//当前学期id
		 studentId = '${studentInfo.id}', //学生id
         classId = '${studentInfo.tbClassId}';//学生所在班级
         semesterName = '${semester.semester.semesterName}';//当前学期名称
         week = '${semester.weekCount}';
         thisMonday = '${semester.thisMonday}';//
	
	if( '${semester}'!= "" && '${semester}' != null){
	    $("#semester_name").html(semesterName);
	
	    eWeek = '${semester.weekCount}'/1;
		sDate = '${semester.thisMonday}';
		thisWeekNum = '${semester.weekNum}'/1;

	}else{
		semesterListOne = '${semesterList.get(0).semesterName}';//第一学期
		semesterListId = '${semesterList.get(0).semesterId}';//第一学期的Id
		//$('#semester_name').html('休假中');
		//console.log(semesterListId);
		semesterId = semesterListId;
		//获取第一条学期
        $("#semester_name").html(semesterListOne);
		//console.log(semesterListOne)
		//日期间隔
		jumpType = '1';
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
		var sDateChange = new Date('${semesterList[0].startTime }');
		sDate = sDateChange.getFullYear()+'-'+("0"+(sDateChange.getMonth()/1+1*1)).slice(-2)+'-'+('0'+(sDateChange.getDate()/1-sDateChange.getDay()/1+1)).slice(-2)+'T00:00:00';//第一个学期的起始时间
		//console.log(sDate)
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
   <script type="text/javascript" src="${ctx}/staticfile/student/js/timetable.js"></script>
   <script type="text/javascript" src="${ctx}/staticfile/student/js/welcome.js"></script>
   </html>