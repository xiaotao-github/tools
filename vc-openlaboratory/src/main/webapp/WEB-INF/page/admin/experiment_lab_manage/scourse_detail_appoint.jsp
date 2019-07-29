<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
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
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/public.css">
<link rel="stylesheet" type="text/css"
	href="${ctx }/staticfile/css/eventDetail.css">
	<style>
		.table_head{border: 1px solid #ddd;border-top: 0;border-left: 0;}
		.table_head th{padding: 8px; border: 1px solid #ddd;border-right: 0;border-bottom: 0;}
		.klassName:hover{text-decoration:underline;}
	</style>
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>课程表详情</title>
<body>
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		<span class="c-gray en">&gt;</span> ${experimentLab.labName }实验室 <span
			class="c-gray en">&gt;</span>${scheduleInfo.experimentCourse.courseName}:排课详情 <a class="btn btn-success radius r"
			style="line-height: 1.6em; margin-top: 3px"
			href="javascript:location.replace(location.href);" title="刷新"> <i
			class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="contain">
			<div class="row cl radius box-shadow pd-10" style="border:1px solid #ddd;margin:0 0 20px 0;background-color:#f5f5f5;">
				<div class="col-md-4 col-xs-12 col-sm-4 col-lg-3">
					<c:if test="${empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath }">
						<img src="${ctx }/staticfile/images/coursedefaultpic.png"
							class="col-sm-12" style="display: block;" />
					</c:if>
					<c:if test="${not empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath}">
						<img src="${RESOURCE_WAY }/${scheduleInfo.experimentCourse.resourceFile.fileFormatPath}" class="col-sm-12" style="display: block;" />
					</c:if>
				</div>
				<div class="col-md-8 col-sm-12 col-sm-8 col-lg-9">
					<div class="cl">
						<p class="f-l">
							<i class="Hui-iconfont">&#xe639;</i>
							<span>所属课程: ${scheduleInfo.experimentCourse.courseName}</span>
						</p>
						<p class="f-l pl-30">
							<i class="Hui-iconfont">&#xe70a;</i>
							<span> 实验名称: 
								<c:choose>
									<c:when test="${empty scheduleInfo.experiment.experimentName }">未指定具体实验</c:when>
									<c:otherwise>${scheduleInfo.experiment.experimentName }</c:otherwise>
								</c:choose>
							</span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i class="Hui-iconfont">&#xe62d;</i>
							<span> 任课教师: 
								<c:choose>
									<c:when test="${empty scheduleInfo.experimentCourse.teacherInfoList}">暂未分配任何教师</c:when>
									<c:otherwise>
										<c:forEach items="${scheduleInfo.experimentCourse.teacherInfoList }" var="t">${t.name } &nbsp;</c:forEach>
									</c:otherwise>
								</c:choose>
							</span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i class="Hui-iconfont">&#xe606;</i>
							<span> 上课时间: <fmt:formatDate value="${scheduleInfo.schooltime}" pattern="yyyy-MM-dd" />
								<c:choose>
									<c:when test="${ scheduleInfo.slice eq 'A'}">上午 1-2节</c:when>
									<c:when test="${ scheduleInfo.slice eq 'B'}">上午 3-4节</c:when>
									<c:when test="${ scheduleInfo.slice eq 'C'}">午休</c:when>
									<c:when test="${ scheduleInfo.slice eq 'D'}">下午 5-6节</c:when>
									<c:when test="${ scheduleInfo.slice eq 'E'}">下午 7-8节</c:when>
									<c:otherwise>晚上  9-10节</c:otherwise>
								</c:choose>
							</span>
						</p>
					</div>
						<div class="cl">
							<p class="f-l">
							<i class="Hui-iconfont">&#xe606;</i>
								<span>预约类型 :<c:if test="${scheduleInfo.type == 1}">整班上课</c:if>
											  <c:if test="${scheduleInfo.type == 3}">自主预约</c:if>
								</span>
							
							</p>
						</div>
					<div class="cl">
						<p class="f-l">
							<i class="experimentFont">&#xe60e;</i><span>可预约工位: ${data.seats} </span>
						</p>
						<p class="f-l pl-30">
							<i class="experimentFont">&#xe60e;</i><span>已预约人数: ${data.studentSize} </span>
						</p>
						<p class="f-l pl-30">
							<i class="experimentFont">&#xe60e;</i><span>剩余工位: ${data.remainSeats} </span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i class=""></i>
							<span>预约说明: 
								<c:choose>
									<c:when test="${empty scheduleInfo.presentation }">暂无预约说明</c:when>
									<c:otherwise>${scheduleInfo.presentation}</c:otherwise>
								</c:choose>
							</span>
						</p>
					</div>
					<p class="text-r">
						<a href="##" title="编辑" onclick="schedule_edit('预约编辑','${ctx}/courseScheduleController/toEdit/${scheduleId}')">
							<i class="iconfont icon-bianji"></i>
						</a> 
						<a class="ml-5" onClick="delete_schedule()" href="javascript:;" title="删除">
							<i class="experimentFont c-red">&#xe627;</i></a>
					</p>
				</div>
			</div>

			<div class="row cl mt-20">
				<div class="col-sm-12 col-xs-12">
					<div class="pd-5 bg-1 bk-gray mb-20">
						 <a onclick="class_add()" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont"></i>添加班级
						</a> 
						<a onclick="exportScore()" title="导出成绩" class="btn radius btn-primary" style="position: absolute; top: 5px; right: 25px;">
							<i class="Hui-iconfont">&#xe644;</i>导出成绩
						</a>
					</div>
					<div class="bg-1 bk-gray mb-20">
						<p class="fw-bold pl-20 pr-20 pt-20">预约名单: </p>
							
						<div class="cl pl-20 pr-20">
							<div class="col-sm-2 col-xs-2" style="border: 1px solid #ddd;border-right: 0;">
								<p class="text-c fs-12 fw-bold pb-5 pt-5 mr-0" style="padding:8px;">班级名称</p>
							</div>
							<table class="col-sm-10 col-xs-10 table_head">
								<thead>
									<tr>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">学生姓名</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">学生学号</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">实验情况</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">预约工位</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="120">预约时间</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">考勤状态</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">报告提交时间</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="80">学生成绩</th>
										<th class="text-c pb-5 pt-5 fw-bold" width="160">是否加入黑名单</th>
									</tr>
								</thead>
							</table>
						</div>
						<c:forEach items="${data.classList }" var="tbclass" varStatus="i">
							<div class="classTable pd-20 clearfix">
								<dl class="cl eachGroupMemberList">
									<dt class="col-sm-2 col-xs-2">
										<p class="klassName">${tbclass.name }</p>
										<span class="Hui-iconfont c-red" onclick="removeClass(this,'${tbclass.id }','${scheduleInfo.scheduleId}')"title="移除班级">&#xe706; </span>
									</dt> 
									<dd class="col-sm-10 col-xs-10">
										<c:choose>
											<c:when test="${empty  tbclass.studentInfoList }">
												<p class="hp">暂无学生预约</p>
											</c:when>
											<c:otherwise>
												<p class="hp">${tbclass.name }</p>
											</c:otherwise>
										</c:choose>
										<table class="eventTable3 table table-border table-bordered table-bg table-sort table-hover">
											<tbody>
												<c:choose>
													<c:when test="${empty  tbclass.studentInfoList}">
														<tr>
															<td>暂无学生预约</td>
														</tr>
													</c:when>
													<c:otherwise>
														<c:forEach items="${tbclass.studentInfoList  }"
															var="member">
															<input type="hidden" name="scheduleId"
																value="${member.scheduleStudentScore.scheduleStudentScoreId }" />
															<tr>
																<td class="text-c" width="80">${member.name }</td>
																<td class="text-c" width="80">${member.user.username }</td>
																<td class="text-c" width="80">
																	<!-- 自主预约没有初始化课程成绩表 只要有预约，就是进行中 -->
																	<%-- <c:if test="${ empty member.scheduleStudentScore.submitStatus }">
																	进行中
																	</c:if> --%>
																	<c:if
																		test="${member.scheduleStudentScore.submitStatus==1}">进行中</c:if>
																	<c:if
																		test="${member.scheduleStudentScore.submitStatus==2}">待批改</c:if>
																	<c:if
																		test="${member.scheduleStudentScore.submitStatus==3}">已批改</c:if>
																	<c:if test="${member.scheduleStudentScore.submitStatus==4}">重做中</c:if>
																	<c:if test="${member.scheduleStudentScore.submitStatus ==5}">只提交了图片</c:if>
																	<c:if test="${member.scheduleStudentScore.submitStatus ==6}">已保存报告</c:if>
																</td>
																<td class="text-c" width="80">${member.scheduleStudentScore.labMyseat }</td>
																<td class="text-c" width="120"><fmt:formatDate  value="${member.scheduleStudentScore.timeOfAppointment}" pattern="yyyy-MM-dd hh:mm:ss" /></td>
																<td class="text-c" width="80">
																	<c:if test="${not empty member.scheduleStudentScore.signin}">
	<%-- 																	<c:if test="${member.scheduleStudentScore.signin == 0 }">未考勤<fmt:formatDate  value="${ member.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if> --%>
																		<c:if test="${member.scheduleStudentScore.signin == 1 }">正常考勤/<fmt:formatDate  value="${ member.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if>
																		<c:if test="${member.scheduleStudentScore.signin == 2 }">迟到/<fmt:formatDate  value="${ member.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if>
																		
																	</c:if>
																	<c:if test="${not empty experimentLab.mainframeKey}">
																		<c:if test="${member.scheduleStudentScore.signin eq null}">
																		未考勤
																		</c:if>
																	</c:if>
																	
																</td>
															
																<c:if test="${empty experimentLab.mainframeKey}">
																<td class="text-c" width="80">免考勤</td>
																</c:if>
																<c:if test="${not empty  member.scheduleStudentScore.submitTime  }">
																<td class="text-c"width="80"><fmt:formatDate  value="${member.scheduleStudentScore.submitTime }" pattern="yyyy-MM-dd hh:mm:ss" /></td>
																</c:if>
																<c:if test="${ empty  member.scheduleStudentScore.submitTime  }">
																<td class="text-c"width="80">未提交</td>
																</c:if>
																<td class="text-c" width="80"><span>${member.scheduleStudentScore.score }</span> <i
																	class="experimentFont fc-darkGreen pl-10" title="查看详情"
																	style="cursor: pointer;"
																	onclick="openScoreDetail('${member.name}(成绩批改)','${ctx }/scheduleStudentScoreController/selectById/${member.scheduleStudentScore.scheduleStudentScoreId }')">&#xe672;</i>
																</td>
																<td class="text-c" width="160">
																	<c:if test="${not empty member.blacklistId}">
																		<span class="fc-999">黑名单</span>
																	</c:if>
																	<c:if test="${empty member.blacklistId}">
																		<a class="label label-success radius" href="javascript:void(0);" onclick="addBlacklist('${ctx }/lab/black/add',${member.id },'${member.name }','${member.user.username }',this)">加入黑名单 </a>
	<!-- 																	<a onclick="class_add()" title="添加" class="btn btn-warning radius" > -->
	<!-- 																		加入黑名单 -->
	<!-- 																	</a>  -->
																	</c:if>
																</td>
															</tr>
														</c:forEach>
													</c:otherwise>
												</c:choose>
											</tbody>
										</table>
									</dd>
								</dl>
							</div>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>
	<form id="layer_add_class" class="form hide" name="" action="">
		<div class="row cl">
			<label class="col-sm-3 text-r"><span>班级： </span></label>
			<div class="col-sm-8">
				<div id="add_class_select">
					<!-- <select name="classId" id="add_class_select">
		    		</select> -->
					<!-- <input type="checkbox" name="tbClassId" value="1">商软二班 -->
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-12 col-sm-12 text-c">
				<button type="button" class="btn btn-primary radius"
					id="layer_add_class_btn">
					<i class="Hui-iconfont">&#xe600;</i> 添加
				</button>
				<button type="button" class="btn btn-secondary radius"
					id="layer_add_class_cancle">
					<i class="iconfont icon-zhongzhi2"></i> 取消
				</button>
			</div>
			<div class="col-xs-12 col-sm-12 text-c c-red">
				<i class="pdr-10"></i><span></span>
			</div>
		</div> 
	</form>
	<form action="${ctx}/scheduleStudentScoreController/exportScore" method="post" id="fas">
		<input type="hidden" name="ids" value="" id="ids">
	</form>
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp"%>
	<script type="text/javascript"
		src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript">
		var number = 0;
		var experimentCourseName= '${scheduleInfo.experimentCourse.courseName}';
		var schooltime = '${scheduleInfo.schooltime}';
		var slice = '${ scheduleInfo.slice}';
		var type = '${scheduleInfo.type }';
		//预约编辑
		function schedule_edit(title, url) {
			var index = layer.open({
				type : 2,
				title : title,
				content : url,
				area : [ '600px', '450px' ]
			});
			// layer.full(index);
		}
		//删除预约
		function delete_schedule() {
			layer.confirm('确认要删除该预约吗!(一旦删除,该预约下所有数据都会被删除?)',{title : '确实删除吗？'},
				function(index) {
					layer.close(index);
					$.ajax({
						url : "${ctx}/courseScheduleController/delete/${scheduleInfo.scheduleId}"+'/'+'${scheduleInfo.experimentCourse.courseName}'+'/'+'${scheduleInfo.schooltime}'+'/'+'${ scheduleInfo.slice}'+'/'+'${scheduleInfo.type }'+'/'+number,
						type : "post",
						dataType : "json",
						success : function(result) {
							if (result.status == 200) {
								layer.msg('删除成功', {
									icon : 1,
									time : 1000
								});
								removeIframe();
							} else {
								layer.msg(result.msg, {
									icon : 2,
									time : 1000
								});
							}
						}
					})
				});
		}
		function classTableSlide(obj) {
			var $o = $(obj).parent();
			if ($o.siblings('.classTable').is(':hidden')) {
				$o.siblings('.classTable').slideDown();
				$o.children('span').children('i').html('▲');
			} else {
				$o.siblings('.classTable').slideUp();
				$o.children('span').children('i').html('▼');
			}
		}
		//获取可添加的班级
		var classAddLayer;
		function class_add() {
			$.ajax({
					url :"${ctx}/courseScheduleController/addAllowTbClass/"+'${scheduleInfo.newSchooltime}'+'/'+'${scheduleInfo.slice}'+'/'+'${scheduleId}',
					type : "POST",
					/* 	data : {
							scheduleId : '${scheduleId}'
						}, */
						dataType : "json",
						success : function(result) {
							if (result.status == 200) {
								var value = result.data;
								var optioncontent = '';
								for (var i = 0; i < value.length; i++) {
									optioncontent += '<input type="checkbox" name="tbClassId" value="'
											+ (value[i]).id
											+ '">'
											+ (value[i]).name
											+ '('
											+ value[i].majorName
											+ ',班级总人数：'
											+ value[i].memberNum + ')<br/>';
								}
								if (optioncontent == "") {
									optioncontent += "暂无可添加班级";
								}
								$("#add_class_select").html(optioncontent);
								// $("#layer_add_class").removeClass("hide");
								classAddLayer = layer.open({
									type : 1,
									scrollbar : false,
									title : '添加班级',
									content : $("#layer_add_class"),
									area : [ '600px', '450px' ],
									maxmin : true,
									scrollbar : false,
									resize : true
								});
							} else {
								layer.msg(result.msg, {
									icon : 2,
									time : 2000
								});
							}
						}
				});
			}
		//添加班级
		 $("#layer_add_class_btn").bind(
				"click",
				function() {
					var date = new Array();
					$("#add_class_select input[name='tbClassId']:checked")
							.each(function() {
								date.push($(this).val());
							});
					if (date.length <= 0) {
						layer.msg('请选择要添加的班级', {
							icon : 2,
							time : 2000
						});
						return false;
					}
					$.ajax({
						url : "${ctx}/courseScheduleController/addClass",
						type : "post",
						data : {
							scheduleId : '${scheduleId}',
							classIds : date + "",
							  type : '${scheduleInfo.type}'
						},
						dataType : "json",
						success : function(result) {
							if (result.status == 200) {
								layer.close(classAddLayer);
								layer.msg('添加成功', {
									icon : 1,
									time : 1000
								});
								setTimeout(function() {
									window.location.reload();
								}, 1500);

							} else {
								layer.msg(result.msg, {
									icon : 1,
									time : 2000
								});
							}
						}
					})
				}); 
		//取消
		$("#layer_add_class_cancle").bind("click", function() {
			layer.close(classAddLayer);
		});
		var scheduleId = '${scheduleId}';
		var ctx = '${ctx}';
	</script>
	<!--导出学生实验成绩-->
	<script type="text/javascript">
		//导出成绩
		function exportScore(){
			var ids = [];
			$("input[name='scheduleId']").each(function(){
				ids.push($(this).val())
			});
			if(ids.length!=0){
				layer.confirm('确认要批量导出吗？',{title:'导出项目成绩'},function(index){
					$('#ids').val(ids);
		 			$("#fas").submit();
		 			layer.close(index)
				})
			}else{
				layer.msg('找不到需要导出的学生成绩!',{icon:2,time:1000});
			}
		}
		//加入黑名单
		function addBlacklist(url,id,name,username,obj){
			layer.confirm('确认要加入黑名单吗!(一旦加入黑名单,该学生将不能进行自主预约!若需解除黑名单,可以到 实验室管理->实验室黑名单管理 进行解除黑名单操作)',{title : '确定加入吗？'},
				function(index) {
					$.ajax({
					 	type: 'POST',
					 	url: url,
					 	dataType: 'json',
					 	data: {
							 'studentId':id,
							 'name':name,
							 'username':username
						 },
					 	success: function(data){
					 		if(data.status=200){
					 			var parent = $(obj).parent()
					 			$(obj).remove();
					 			parent.append('<span class="f-ccc">黑名单</span>');
					 			layer.msg('已加入黑名单!',{icon:1,time:1000},{icon:1,time:1000});
		// 				 		if(status==1){
		// 				 			layer.msg('已启用!',{icon:1,time:1000},{icon:1,time:1000});
		// 				 		}else if(status==2){
		// 				 			layer.msg('已停用!',{icon:1,time:1000},{icon:1,time:1000});
		// 				 		}
					    	}
					 	},
					 	error:function(data) {
					 		layer.msg("系统异常，请联系工程师！",{icon:2,time:1500});    
					 	},
					 });
			});
		}

	</script>
	<script type="text/javascript"
		src="${ctx }/staticfile/js/eventDetail.js"></script>
</body>
</html>