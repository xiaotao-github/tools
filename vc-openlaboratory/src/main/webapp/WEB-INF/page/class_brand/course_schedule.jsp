<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Access-Control-Allow-Origin" content="*">
	<title id="lab_title">Document</title>
	<link rel="stylesheet" href="${ctx }/staticfile/class_brand/css/reset.css">
	<link rel="stylesheet" href="${ctx }/staticfile/class_brand/css/index_null.css">
	<link rel="stylesheet" href="${ctx }/staticfile/class_brand/font/iconfont.css">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col col1">

				<div class="cell cell4" id="labTitle">
					<div class="clearfix">
						<p class="p1"><span>实验室状态: </span><span id="labStatus">使用中</span></p>
						<p class="p2"><span>实验室管理员: </span><span id="labManager">王大鹅</span></p>
						<p class="p3"><span><i class="iconfont icon-circle"></i>总工位数: </span><span id="labSeats">12</span></p>
					</div>
					<h1><span id="labName">这里是实验室的名称</span><span style="padding-left: 20px;font-size: 40px;" id="labNumber">(编号: 3A-412)</span></h1>
				</div>

				<div class="cell cell1">
					<p class="p1">公告</p>
					<div class="p2"><p id="message">这里是公告的信息,可能很长,超出宽度,自动跑马灯播放...</p></div>
				</div>

				<div class="cell cell2">
					<ul class="classesList">
						<li><span>第 24 周</span></li>
						<li><span>第 1、2 节</span></li>
						<li><span>第 3、4 节</span></li>
						<li><span>午休</span></li>
						<li><span>第 5、6 节</span></li>
						<li><span>第 7、8 节</span></li>
						<li><span>第 9、10 节</span></li>
					</ul>
					<div class="classesContent">
						<ul class="weekList">
							<li><span>星期一</span></li>
							<li><span>星期二</span></li>
							<li><span>星期三</span></li>
							<li><span>星期四</span></li>
							<li><span>星期五</span></li>
							<li><span>星期六</span></li>
							<li><span>星期日</span></li>
						</ul>
						<div class="schedule">
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
							<div class="schedule-row">
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
								<div class="schedule-col"></div>
							</div>
						</div>
					</div>
					<div class="schedule-tips">
						<p><span class="color-part1"></span><span>整班上课</span></p>
						<!-- <p><span class="color-part2"></span><span>小组协作</span></p> -->
						<p><span class="color-part3"></span><span>自主预约</span></p>
					</div>
				</div>

			</div>

			<div class="col col3">

				<div class="cell cell1">
					<div class="clock" id="clo">
			            <div class="h"></div>
			            <div class="m"></div>
			            <div class="s"></div>
			        </div>
			        <div class="el_clock">
			        	<div id="el_clock" class="light">
							<div class="ampm">AM</div>
							<div class="alarm"></div>
							<div class="digits"></div>
						</div>
			        	<p class="day"></p>
			        	<p class="date"></p>
			        	<!-- <p class="time"></p> -->
			        </div>
			    </div>

		        <div class="cell cell2">
		        	<div class="temperature"><i class="iconfont icon-temperature"></i><p><i class="ch-t">室温</i><span id="myTemperature">31°C</span></p></div>
		        	<div class="wet"><i class="iconfont icon-wet"></i><p><i class="ch-t">湿度</i><span id="myHumidity">61%</span></p></div>
		        	<div class="light"><i class="iconfont icon-light"></i><p><i class="ch-t">光照</i><span id="myIllumination">适中</span></p></div>
		        	<div class="air"><i class="iconfont icon-air"></i><p><i class="ch-t">空气质量</i><span id="myAirQuality">空气清新</span></p></div>
		        </div>

		        <div class="cell cell3">
					<img src="${cookie.RESOURCE_WAY.value }/system_file/img/logo.png" alt="" class="logo">
					<p class="logoTitle">风标学院</p>
		        </div>

			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
 var labId = '${param.labId}';
 var ctx = '${ctx}';
 var index_null = 1;
 var WISDOMLAB = '${WISDOMLAB}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/highcharts.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/data.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/index_null.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/lab-coursetwo.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/el_clock_moment.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/el_clock_script.js"></script>
</html>