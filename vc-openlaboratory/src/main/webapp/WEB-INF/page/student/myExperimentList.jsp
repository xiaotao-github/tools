<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${PEXPERIMENTOPEN}" />
<!-- <!DOCTYPE html> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD sHTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
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
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/myExperimentList.css">
	<title>Document</title>
</head>
<body>
	<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>>我的实验
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="å·æ°">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>
	<div class="laboratory-container">
		<div class="inner clearfix box-shadow boxBorder">
			<div class="pd-20 pb-30" style="padding-top: 70px;">
				<div class="boxBorder box-shadow clearfix pos-r bc-white">
					<div class="myExperimentList-sel" studentId ="${studentId }">
						<ul class="nav text-r f-14 fw-bold pt-10 pb-10 pr-15">
							<li myExperimentListType="0" class="selected"><span>全部( ${freedoCcount + allCount} )</span></li>
							<li myExperimentListType="10"><span>已提交</span><span>( ${ freedoCcountOne} )</span></li>
							<li myExperimentListType="20"><span>已批改</span><span>( ${ freedoCcountTwo} )</span></li>
							<li myExperimentListType="30"><span>未提交</span><span>( ${ freedoCcountThree} )</span></li>
							<li myExperimentListType="40"><span>已保存</span><span>( ${ freedoCcountFour} )</span></li>
							<li myExperimentListType="50"><span>重做</span><span>( ${ freedoCcountFive} )</span></li>
							<li myExperimentListType="3"><span>自主预约</span><span>( ${freedoCcount } )</span></li>
							<li myExperimentListType="1"><span>整班上课</span><span>( ${ allCount} )</span></li>
						</ul>
					</div>
					<div class="myExperimentList-list mt-30">
						<ul class="clearfix">
							<li class="col-lg-6 col-sm-6 mb-30">
								<div class="boxBorder radius mr-10 ml-10">
									<div class="top pl-10 pr-10 pt-5 pb-5 fw-bold">
										<p class="f-20"><i class="stuEx-icon stuEx-icon-xiangmu fc-objYellow pr-5 fw-normal"></i><span class="fc-objGreen experiment_name">这里是实验的名称</span>    <span class="experiment_updateType fw-normal f-14">未提交</span></p>
									</div>
									<div class="center pl-10 pr-10 pb-10 fw-bold">
										<div class="pl-25 pr-25 mt-10">
											<div class="clearfix mb-5">
												<p class="f-l"><span class="pr-15">所属课程: </span><span class="courseName">${allCount}</span></p>
												<p class="f-r"><span class="pr-15">实验难度: </span><span class="experiment_difficult">适中</span></p>
											</div>
											<p class="mb-5"><span class="pr-15">实验类型: </span><span class="course_type">整班上课</span></p>
											<div class="clearfix">
												<span class="pr-15 f-l">任课教师: </span>
												<ul class="f-l teachers_list">
													<li class="clearfix">
														<div class="teacherAvatar f-l">
															<img src="${ctx}/staticfile/student/images/avatar.png" alt="" class="teacher_avatar">
														</div>
														<div class="f-l teacherMsg pl-10">
															<p class="f-12 teacher_belong">计算机学院</p>
															<p class="f-14 teacher_name">王大鹅</p>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="bottom pt-5 pb-5 pl-15 pr-15">
										<p class="mb-5"><i class="stuEx-icon stuEx-icon-yuan2 fc-objYellow pr-5 fw-normal f-12"></i><span class="fw-bold">实验地址: </span><span class="c-999 pl-20 lab_name">这里是实验室的名称</span></p>
										<p><i class="stuEx-icon stuEx-icon-yuan2 fc-objYellow pr-5 fw-normal f-12"></i><span class="fw-bold experiment_time_title">上课时间: </span><span class="c-999 pl-20 experiment_time">2018-07-25 下午第5、6节</span></p>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="paging text-c mt-20">
						<span class="c-white fw-bold radius prevPageBtn" onclick="paging(this);" pageOrder="0">上一页</span>
						<ul>
							<li onclick="paging(this);" pageOrder="1" class="selected">1</li><li onclick="paging(this);" pageOrder="2">2</li><li onclick="paging(this);" pageOrder="3">3</li><li onclick="paging(this);" pageOrder="4">4</li><li onclick="paging(this);" pageOrder="5">5</li>
						</ul>
						<span class="c-white fw-bold radius nextPageBtn" onclick="paging(this);" pageOrder="2">下一页</span>
					</div>

					<div class="myExperimentList-count pos-a text-c fw-bold c-333 box-shadow">
						<p class="count"><span>${freedoCcount + allCount}</span></p>
						<p class="countTitle">我的实验</p>
					</div>
				</div>
			</div>
		</div>
	</div>
  <%@include file="../footer.jsp"%>

</body>
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript">
var ctx ='${ctx}';
var RESOURCE_WAY ='${RESOURCE_WAY}';
</script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/myExperimentList.js"></script>
</html>