<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/experiment_font/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/footer.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/experimentReservation.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/js/daypilot/themes/dayPilot-blue.css">
	<title>Document</title>
</head>
<body>
	<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>>我的预约实验课表
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="刷新">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>

	<div class="laboratory-container">
		<div class="inner clearfix box-shadow boxBorder">
			<div class="pd-20 pt-30 pb-30 clearfix">
				<div class="mySchedule col-lg-12 col-sm-12 box-shadow boxBorder">
					<div class="pos-r">
						<p class="text-c f-20 pt-10 fw-bold fc-objBlue">(<span id="semester_name"></span>)我的预约实验课表</p>
						<div class="courseSwiper"><div id="dp"></div></div>
						<a class="swiper-btn swiper-prev" href="javascript:previousBtn_week();" title="上一周"></a>
						<a class="swiper-btn swiper-next" href="javascript:nextBtn_week();" title="下一周"></a>
					</div>
				</div>
				<div class="reservation col-lg-12 col-sm-12 box-shadow boxBorder bc-white mt-20 pd-0">
					<div class="reservation-typeSel pos-r">
						<ul class="nav f-14 fw-bold pt-15 pb-10 ml-10">
							<!-- <li reserveType="0" class="selLeft selected"><span>全部</span></li> -->
							<li reserveType="1" class="selLeft selected"><span>可预约实验</span>( <span class="canToBeReservated">${MyReservation}</span> )</li>
							<li reserveType="2" class="selLeft"><span>已预约实验</span>( <span class="myReservation">${AlreadyReserved}</span>  )</li>
							<li reserveType="3" class="myReservation-history fw-bold pos-a f-14 mr-15">
								<span>我的所有预约记录: <span class="myHistoryReservation">${scourseStudent}</span> 次</span>
								<span class="span1 btn-warning">查看</span>
							</li>
						</ul>
					</div>
					<div class="reservation-list mt-20">
						<ul class="clearfix reservation-list-ul">
							<li class="col-lg-6 col-sm-6 mb-30">
								<div class="boxBorder radius mr-10 ml-10">
									<div class="top pl-15 pr-15 pt-5 pb-5">
										<!-- <p class="f-20 fw-bold pos-r"><span class="lab_num">这里是实验室的编号</span><span class="pos-a seatNum">预约工位: <i>12</i></span></p> -->
										<p class="f-20 fw-bold pos-r"><i class="stuEx-icon stuEx-icon-xiangmu fc-objYellow pr-5 fw-normal"></i><span class="fc-objGreen experiment_name">这里是实验的名称</span><span class="pos-a seatNum">我的工位: <i>12</i></span></p>
									</div>
									<div class="center pl-10 pr-10 pb-10 fw-bold pos-r">
										<!-- <p class="f-20 mb-5"><i class="stuEx-icon stuEx-icon-xiangmu fc-objYellow pr-5 fw-normal"></i><span class="fc-objGreen experiment_name">这里是实验的名称</span></p> -->
										<div class="pl-10 pr-10 mt-10">
											<p class="mb-5"><span class="pr-15">所属课程: </span><span class="courseName">这里是课程的名称</span></p>
											<p class="mb-5"><span class="pr-15">实验难度: </span><span class="experiment_difficult">适中</span></p>
											<div class="clearfix">
												<span class="pr-15 f-l">实验教师: </span>
												<ul class="f-l teachers_list">
													<li class="clearfix">
														<div class="teacherAvatar f-l">
															<img src="images/avatar.png" alt="" class="teacher_avatar">
														</div>
														<div class="f-l teacherMsg pl-10">
															<p class="f-12 teacher_belong">计算机学院</p>
															<p class="f-14 teacher_name">王大鹅</p>
														</div>
													</li>
												</ul>
											</div>
											<div class="reservation-btn pos-a">
												<p class="button text-c f-18 fw-bold"><span class="reserve_btn">我要预约</span></p>
												<p class="fc-objGreen f-12 fw-normal text-c">工位数: <span class="seat_last">32</span>/<span class="seat_totle">56</span> 位</p>
											</div>
										</div>
									</div>
									<div class="bottom pt-5 pb-5 pl-15 pr-15">
										<p class="mb-5"><i class="stuEx-icon stuEx-icon-yuan2 fc-objYellow pr-5 fw-normal f-12"></i><span class="fw-bold">实验地址: </span><span class="c-999 pl-20 lab_name">这里是实验室的名称</span></p>
										<p><i class="stuEx-icon stuEx-icon-yuan2 fc-objYellow pr-5 fw-normal f-12"></i><span class="fw-bold">开放时间: </span><span class="c-999 pl-20 experiment_time">2018-07-25 下午第5、6节</span></p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div class="paging text-c mt-30">
						<span class="c-white fw-bold radius prevPageBtn" onclick="paging(this);" pageOrder="0">上一页</span>
						<ul>
							<li onclick="paging(this);" pageOrder="1" class="selected">1</li><li onclick="paging(this);" pageOrder="2">2</li><li onclick="paging(this);" pageOrder="3">3</li><li onclick="paging(this);" pageOrder="4">4</li><li onclick="paging(this);" pageOrder="5">5</li>
						</ul>
						<span class="c-white fw-bold radius nextPageBtn" onclick="paging(this);" pageOrder="2">下一页</span>
					</div>
				</div>
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
var ctxUrl = "${PEXPERIMENTOPEN}";//当前项目路径
var srcUrl= '${RESOURCE_WAY}';
var ctx = '${ctx}';
var sWeek = '1',                      //第1周
	eWeek = '',                       //最后一周
	sDate = '',                       //这是第几周的开始的周一。比如:现在第14周，这个是第十四周的周一
	jumpType = '0';                   //* 0 从当前周开始  * 1 从指定周开始
	thisWeekNum = '1';                 //当前周
	var semesterId = '${semester.semester.semesterId}'; //学期id
	 studentId = '${studentInfo.id}', //学生id
     classId = '${studentInfo.tbClassId}';//学生所在班级
     semesterName = '${semester.semester.semesterName}';//学期名称
     week = '${semester.weekCount}';
     thisMonday = '${semester.thisMonday}';
	//console.log('${semester.semester.semesterName}')
	/* var semester = {'weekNum':25,'dayCount':174,'semester':{'dayNum':'174','endTime':'2018-07-30T11:03:28.000+08:00','operatorId':'15','semesterId':'15','semesterName':'2018\u5E74\u4E0A\u5B66\u671F','startTime':'2018-02-06T11:03:28.000+08:00','stealth':'2'},'weekCount':25,'thisMonday':'2018-07-30'}; */
	/* var semesterList = [{'dayNum':'174','endTime':'2018-07-30T11:03:28.000+08:00','operatorId':'15','semesterId':'15','semesterName':'2018\u5E74\u4E0A\u5B66\u671F','startTime':'2018-02-06T11:03:28.000+08:00','stealth':'2'}]; */
	semesterListOne = '${semesterList.get(0).semesterName}';//第一学期
	semesterListId = '${semesterList.get(0).semesterId}';//第一学期的Id
	//xx =DateDiff('${semesterList[0].startTime }','${semesterList[0].endTime }');//日期间隔
	//console.log(xx)
	//sDate = '${semesterList.get(0).startTime }';
if( semesterName!= "" && semesterName != null){
    $("#semester_name").html(semesterName);
	//改变学期
	//$("#semesterSelect").val('${semester.semester.semesterId}');
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
<script type="text/javascript" src="${ctx}/staticfile/student/js/timetableTwo.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/experimentReservation.js"></script>
</html>