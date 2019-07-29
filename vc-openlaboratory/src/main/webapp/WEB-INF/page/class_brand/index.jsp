<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title id="lab_title">Document</title>
	<link rel="stylesheet" href="${ctx }/staticfile/class_brand/css/reset.css">
	<link rel="stylesheet" href="${ctx }/staticfile/class_brand/css/index2.css">
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
					<div class="cell_row cell_row1">
						<div class="attendance">
							<p class="attendance-title"><span id="clockinTitle">考勤记录</span><span style="float: right;font-size: 14px;font-weight: normal;padding: 6px 10px;" id="numberOfClass">上课人数: 暂无</span></p>
							<div class="attendance-list">
								<ul>
									<!-- 整班上课考勤表 -->
									<!--  <li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="msg"><span>赵大鼠</span>打卡成功!</p>
											<p class="time"><span>2018-06-21 13:58</span></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="msg"><span>赵大鼠</span>打卡成功!</p>
											<p class="time"><span>2018-06-21 13:58</span></p>
										</div>
									</li>  -->
									<!-- 自主预约以及小组协作考勤表 -->
									<!--  <li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											已出勤
											<p class="checked"><i class="iconfont icon-checked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li>
									<li class="clearfix">
										<div class="stu-avatar">
											<img src="images/avatar.png" alt="">
										</div>
										<div class="stu-attendance">
											<p class="stu_msg"><span class="name">赵大鼠</span><span class="num">3116003691</span></p>
											<p class="checked"><i class="iconfont icon-unchecked"></i></p>
										</div>
									</li> -->
								</ul>
							</div>
						</div>
						<div id="chart1"></div>
					</div>

					<div class="cell_row cell_row2">
						<div class="postWrapper">
							<!-- <div class="classRoom-post" style="background:url('images/coursePost.png')no-repeat top center;background-size: 100%;"></div>
							<div class="classRoom-post" style="background:url('images/coursePost.png')no-repeat top center;background-size: 100%;"></div>
							<div class="classRoom-post" style="background:url('images/coursePost.png')no-repeat top center;background-size: 100%;"></div>
							<div class="post-button">
								<ul>
								    <li class="on"></li>
									<li></li>
									<li></li>
								</ul>
							</div> -->
							<div class="video"><video src="images/four.mp4"></video></div>
						</div>
						<div class="courseMsg clearfix">
							<div class="classRoom-course">
								<p class="course-title"><span  id="nowCourseTitle">当前课程</span></p>
								<div class="course-box">
									<p class="course-name">
										<span id="nowCourseName">无线局域网安全</span>
									</p>
									<p class="course-experiment">
										<span>实验名称: </span>
										<span id="nowExperimentName">74LS164串入并出移位实验</span>
									</p>
									<div class="course-description">
										<span>课程简介: </span>
										<div class="experiment-description"><div id="nowExperimentDescription">这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍这里是实验的的简单说明和介绍</div></div>
									</div>
								</div>
							</div>
							<div class="classRoom-member">
								<p class="member-classes">
									<span>开放班级: </span>
									<span>电子信息安全与技术1班 </span>
									<span>电子信息安全与技术1班 </span>
								</p>
								<p class="member-teacher">
									<span>上课教师: </span>
									<span id="attendClassTeacher">王大鹅</span>
								</p>
								<p class="member-courseTime">
									<span>上课时间: </span>
									<span id="attendClassTime">16:10 ~ 18:00</span>
								</p>
							</div>
						</div>
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
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript">
var labId = '${param.labId}'; //实验室id
var preShceduleId = '';//课程表id
var ctx = '${ctx}';
var resourceway = '${RESOURCE_WAY}';
var WISDOMLAB = '${WISDOMLAB}';
var index_null = 0;
</script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/highcharts.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/data.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/index.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/lab-course.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/el_clock_moment.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/class_brand/js/el_clock_script.js"></script>
</html>