<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">

<style>
	.addResourcesContain{font-size:16px;padding: 20px 25px 0 25px;}
	.cl:after,.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.cl,.clearfix{zoom:1}
	.head{padding:10px;}
	.head .p1{font-size:16px;color:#51848a;font-weight:bold;}
	.head .p1 .span1{font-size:18px;padding:0 10px;}
	.head .p1 .span2{font-size:12px;font-weight:normal;color:#8c8c8c;}
	.coursesArraign{display:block;margin:0 auto;display:none;}
	.coursesArraign.checked{display:block;}
	.theFirstStage{padding:10px;}
	.theFirstTitle{height:21px;background:#51848a;line-height:21px;cursor:pointer; color:#fff;padding:8px;}
	.theFirstTitle span{display:block;float:left;font-size:16px;}
	.theFirstTitle .drop{float:right;}
	.theFirstTitle .drop img{height:21px;}
	.theSecondStage{display:block;}
	/* .coursesArraign .theFirstStage:first-child .theSecondStage{display:block;} */
	.theSecondTitle{cursor: pointer;height: 21px;padding: 8px 0;line-height: 20px;background-color: #f0f0f0;border-bottom: 1px solid #d9d9d9;}
	.theSecondTitle span.drop{padding:0 10px;}
	.theSecondTitle span{display:block;float:left;}
	.theSecondTitle span.ctrBtn{float:right;}
	.theSecondTitleP{float:left;}
	.theSecondTitle .drop img{display:block;height:20px;}
	.theThirdStage{margin-bottom:5px;border-top: 1px solid #d9d9d9;display:none;}
	.theThirdStage dt{display:block;padding: 5px 10px;border-bottom: 1px solid #ddd;font-size: 16px;}
	.theThirdStage dl{padding: 0 30px;background:#f5f5f5;}
	.theThirdStage dl dd{display:block;float:left;padding:0 20px; height:30px; line-height:30px;}
	.theThirdStage dl .groupName{font-size:14px;font-weight:bold;color:#1e6269;padding-right:20px;}
	.theThirdStage dl .groupName.dataNull{color:#999;}
	.theThirdStage dl .teacherName{font-size:12px;}
	.theThirdStage dl .experimentTime{font-size:12px;padding-left:20px;color:#888}
	.theThirdStage dl .experimentTime .greenicon{color:green;}
	.theThirdStage dl .experimentTime .redicon{color:red}
	.btnGroup{padding:40px 0;}
	.departmentNav{padding:10px;}
	.departmentNav .eachDepartment{float: left;display: block;padding: 5px 10px;color: #1e6269;cursor:pointer;}
	.departmentNav .eachDepartment.checked {background: #1e6269;color: #fff;}
	.ctrBtn{font-size:12px;color:#999;padding: 0 5px;float:right;float: right;background: #51848a;margin: 0 5px;line-height: 1.5em;border-radius: 3px;}
	.ctrBtn a{color:#fff;}
	.ctrBtn:hover{background:#1e6269;}
	.ctrBtn.remove{background:#ca5050;}
	.ctrBtn.remove:hover{background:#9a2424;}
	.ctrBtn .Hui-iconfont{padding:0 2px;}
</style>

</head>
<body>
	
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验管理 <span class="c-gray en">&gt;</span>
		${experimentCourse.courseName }<span class="c-gray en">&gt;</span>
		${experiment.experimentName }<span class="c-gray en">&gt;</span> 
		小组详情
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	
	<div class="addResourcesContain">
		 <p class="p1">课程：《<span class="span1" data-title="课程下的实验" data-href="${ctx}/experimentCourseController/selectCourseExperimentByIdToPreviewPage/${experimentCourse.experimentCourseId }/${menuParam }" onclick="Hui_admin_tab(this);">${experimentCourse.courseName }</span>》下的
		《<span class="span1">${experiment.experimentName }</span>》 实验的小组信息
	</div>
	<div class="page-container clearfix">
		<ul class="departmentNav clearfix">
			<c:forEach items="${departmentList }" var="department" varStatus="vs">
			<c:choose>
				<c:when test="${vs.index != 0 }">
					<li class="eachDepartment"><span>${department.name}</span></li>
				</c:when>
				<c:otherwise>
					<li class="eachDepartment checked"><span>${department.name}</span></li>
				</c:otherwise>
			</c:choose>
			</c:forEach>
		</ul>
		<c:forEach items="${departmentList }" var="department" varStatus="de">
			<c:choose>
				<c:when test="${de.index != 0 }">
				<ul class="coursesArraign">
					<c:forEach items="${department.majorList }" var="major">
						<li class="theFirstStage clearfix">
							<dl>
								<dt class="theFirstTitle"><span>${major.name }</span><span class="drop"><img src="${ctx }/staticfile/images/up1.png"></span></dt>
								<c:forEach items="${major.gradeList }" var="grade">
									<c:forEach  items="${grade.tbClassList }" var="tbClass">
										<dd class="theSecondStage">
											<dl>
												<dt class="theSecondTitle clearfix">
													<p class="theSecondTitleP clearfix">
														<span class="drop"><img src="${ctx}/staticfile/images/drop.png"></span>
														<span><strong>${tbClass.name }</strong>&emsp;&emsp;[${grade.name }]</span>
													</p>
													<p class="ctrBtn" title="为该班级创建小组"><a onclick="addGroup('添加小组','${ctx}/experimentGroupController/selectNotGroupStudentInfoAndOtherInfoByData/${experimentCourse.experimentCourseId}/${experiment.experimentId}/${tbClass.id }/${department.id}');"><i class="experimentFont">&#xe625;</i>添加</a></p>
													<c:if test="${empty tbClass.experimentGroupList}">
														<p class="ctrBtn" title="为该班级挑选历史实验小组"><a onclick="assignAsHistoryGroup('挑选历史小组','${ctx}/courseExperimentController/selectClassOtherExperimentToAddPage/${experimentCourse.experimentCourseId}/${experiment.experimentId}/${tbClass.id }/${department.id}');"><i class="experimentFont">&#xe70a;</i>分配</a></p>
													</c:if>
												</dt>
												<c:if test="${empty tbClass.experimentGroupList}">
													<dd class="theThirdStage">
														<dl>
															<dt>
																<span class="groupName dataNull">暂未分配小组</span>
															</dt>
														</dl>
													</dd>
												</c:if>							
												<c:forEach items="${tbClass.experimentGroupList }" var="tbGroup">
													<dd class="theThirdStage">
														<dl class="clearfix">
															<dt>
																<span class="groupName">${tbGroup.groupName }</span>
																<span class="teacherName">指导老师: ${tbGroup.teacherInfo.name }</span>
																<span class="experimentTime"><i class="Hui-iconfont greenicon">&#xe6e6;</i>${tbGroup.startTimeToString }<i style="padding:0 5px;">~</i><i class="Hui-iconfont redicon">&#xe6e4;</i>${tbGroup.endTimeToString }</span>
																<span class="ctrBtn remove" title="解散此小组"><a onclick="group_del(this,${tbGroup.experimentGroupId})"><i class="Hui-iconfont">&#xe706;</i>解散</a></span>
																<span class="ctrBtn" title="修改小组信息"><a onclick="group_edit('小组修改', '${ctx}/experimentGroupController/selectGroupAndStudentToEditPage/${tbGroup.experimentGroupId}')"><i class="Hui-iconfont">&#xe647;</i>编辑</a></span>
															</dt>
															<c:if test="${empty tbGroup.studentInfoList }">
																<dd><span>该小组下无小组成员</span></dd>
															</c:if>
															<c:forEach items="${tbGroup.studentInfoList }" var="stu" >
																<dd><span>${stu.name }</span></dd>
															</c:forEach>
														</dl>
													</dd>
												</c:forEach>
											</dl>
										</dd>
									</c:forEach>
								</c:forEach>
							</dl>
						</li>
					</c:forEach>
				</ul>
				</c:when>
				<c:otherwise>
				<ul class="coursesArraign checked">
					<c:forEach items="${department.majorList }" var="major">
						<li class="theFirstStage clearfix">
							<dl>
								<dt class="theFirstTitle"><span>${major.name }</span><span class="drop"><img src="${ctx }/staticfile/images/up1.png"></span></dt>
								<c:forEach items="${major.gradeList }" var="grade">
									<c:forEach  items="${grade.tbClassList }" var="tbClass">
										<dd class="theSecondStage">
											<dl>
												<dt class="theSecondTitle clearfix">
													<p class="theSecondTitleP clearfix">
														<span class="drop"><img src="${ctx}/staticfile/images/drop.png"></span>
														<span><strong>${tbClass.name }</strong>&emsp;&emsp;[${grade.name }]</span>
													</p>
													<p class="ctrBtn" title="为该班级创建小组"><a onclick="addGroup('添加小组','${ctx}/experimentGroupController/selectNotGroupStudentInfoAndOtherInfoByData/${experimentCourse.experimentCourseId}/${experiment.experimentId}/${tbClass.id }/${department.id}');"><i class="experimentFont">&#xe625;</i>添加</a></p>
													<c:if test="${empty tbClass.experimentGroupList}">
														<p class="ctrBtn" title="为该班级挑选历史实验小组"><a onclick="assignAsHistoryGroup('挑选历史小组','${ctx}/courseExperimentController/selectClassOtherExperimentToAddPage/${experimentCourse.experimentCourseId}/${experiment.experimentId}/${tbClass.id }/${department.id}');"><i class="experimentFont">&#xe70a;</i>分配</a></p>
													</c:if>
												</dt>
												<c:if test="${empty tbClass.experimentGroupList}">
													<dd class="theThirdStage">
														<dl>
															<dt>
																<span class="groupName dataNull">暂未分配小组</span>
															</dt>
														</dl>
													</dd>
												</c:if>							
												<c:forEach items="${tbClass.experimentGroupList }" var="tbGroup">
													<dd class="theThirdStage">
														<dl class="clearfix">
															<dt>
																<span class="groupName">${tbGroup.groupName }</span>
																<span class="teacherName">指导老师: ${tbGroup.teacherInfo.name }</span>
																<span class="experimentTime"><i class="Hui-iconfont greenicon">&#xe6e6;</i>${tbGroup.startTimeToString }<i style="padding:0 5px;">~</i><i class="Hui-iconfont redicon">&#xe6e4;</i>${tbGroup.endTimeToString }</span>
																<span class="ctrBtn remove" title="解散此小组"><a onclick="group_del(this,${tbGroup.experimentGroupId})"><i class="Hui-iconfont">&#xe706;</i>解散</a></span>
																<span class="ctrBtn" title="修改小组信息"><a onclick="group_edit('小组修改', '${ctx}/experimentGroupController/selectGroupAndStudentToEditPage/${tbGroup.experimentGroupId}')"><i class="Hui-iconfont">&#xe647;</i>编辑</a></span>
															</dt>
															<c:if test="${empty tbGroup.studentInfoList }">
																<dd>
																	<span>该小组下无小组成员</span>
																</dd>
															</c:if>
															<c:forEach items="${tbGroup.studentInfoList }" var="stu" >
																<dd><span>${stu.name }</span></dd>
															</c:forEach>
														</dl>
													</dd>
												</c:forEach>
											</dl>
										</dd>
									</c:forEach>
								</c:forEach>
							</dl>
						</li>
					</c:forEach>
				</ul>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</div>
</body>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript">

$(".theFirstTitle").toggle(function(){
	 $(this).siblings('.theSecondStage').slideUp();
	 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop1.png">');
},function(){
	 $(this).siblings('.theSecondStage').slideDown();
	 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/up1.png">');
});

$(".theSecondTitleP").toggle(function(){
	 $(this).parent().siblings('.theThirdStage').slideDown();
	 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/up.png">');
},function(){
	 $(this).parent().siblings('.theThirdStage').slideUp();
	 $(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop.png">');
});

$(".eachDepartment").each(function(index){
	$(".eachDepartment").eq(index).on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		var i = index;
		$(".coursesArraign").each(function(){
			$(".coursesArraign").eq(i).addClass('checked');
			$(".coursesArraign").eq(i).siblings().removeClass('checked');
		})
	})
});


//小组修改
function group_edit(title, url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '450px' ]
	});
	//layer.full(index);
}
//实验删除
function group_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
		 	type: 'POST',
		 	url: '${ctx}/experimentGroupController/deleteGroup/'+id,
		 	dataType: 'json',
		 	success: function(data){
		 		if(data.status=="200"){
			 		layer.msg('已删除!',{icon:1,time:1200});
			 		setTimeout("window.location.reload()",1200);
		 		}else{
		 			layer.msg(data.msg,{icon:1,time:1500});
		 	}},
		 	error:function(data) {
		 		console.log(data.msg);
		 	},
		 });
	});
}

//分配历史小组
function assignAsHistoryGroup(title, url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '450px' ],
		maxmin:true
	});
	//layer.full(index);
}

//添加小组
function addGroup(title, url) {
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '450px' ]
	});
}


</script>
</html>