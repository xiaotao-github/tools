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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" href="${ctx }/staticfile/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/eventDetail.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>课程表详情</title>
<body>
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室管理 <span class="c-gray en">&gt;</span>
		<c:if test="${menuParam==1}">
		所有实验室
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验室
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验室
		</c:if>
		<span class="c-gray en">&gt;</span> ${experimentLab.labName }实验室
		 <span class="c-gray en">&gt;</span>排课详情 
		 <a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新"> <i
			class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="contain">
			<div class="row cl radius box-shadow pd-10" style="border:1px solid #ddd;margin:0 0 20px 0;background-color:#f5f5f5;">
				<div class="col-md-4 col-xs-12 col-sm-4 col-lg-3">
					<c:if test="${empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath }">
						<img src="${ctx }/staticfile/images/coursedefaultpic.png" class="col-sm-12" style="display: block;" />
					</c:if>
					<c:if test="${not empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath}">
						<img src="${RESOURCE_WAY }/${scheduleInfo.experimentCourse.resourceFile.fileFormatPath}" class="col-sm-12" style="display: block;" />
					</c:if>
				</div>
				<div class="col-md-8 col-sm-12 col-sm-8 col-lg-9">
					<p class="cl f-18"></p>
					<div class="cl">
						<p class="f-l">
							<i></i> <span>所属课程:
								${scheduleInfo.experimentCourse.courseName}</span>
						</p>
						<p class="f-l pl-20">
							<i></i> <span> 上课时间: <fmt:formatDate
									value="${scheduleInfo.schooltime}" pattern="yyyy-MM-dd" /> <c:choose>
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
						<c:if test="${not empty  scheduleInfo.experiment.experimentName }">
							<p class="f-l">
								<i></i> <span>实验名称:
									${scheduleInfo.experiment.experimentName } </span>
							</p>
						</c:if>
						<p class="f-l pl-20">
							<i></i> <span> 任课教师: <c:choose>
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
							<i></i> <span>创建时间: ${scheduleInfo.createTimeToString } </span>
						</p>
					</div>
					<div class="cl">
						<p class="f-l">
							<i></i> <span>预约说明: <c:choose>
									<c:when test="${empty scheduleInfo.presentation }">暂无预约说明</c:when>
									<c:otherwise>${scheduleInfo.presentation}</c:otherwise>
								</c:choose>
							</span>
						</p>
					</div>
					<%-- <div class="cl">
						<p class="f-l">介绍: </p>
						<div class="pl-30">
							<p>${experimentLab.labDescription}</p>
						</div>
					</div>--%>
					<p class="text-r">
						<a href="##" title="编辑" onclick="schedule_edit('预约编辑','${ctx}/courseScheduleController/toEdit/${scheduleId}')"><i class="iconfont icon-bianji"></i></a>
						<a class="ml-5" onClick="delete_schedule()" href="javascript:;" title="删除"><i class="experimentFont c-red">&#xe627;</i></a>
					</p>
				</div>
			</div>

			<div class="row cl mt-20">
				<div class="col-sm-12 col-xs-12">
					<div class="pd-5 bg-1 bk-gray mb-20">
						<a onclick="class_add()" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont"></i>添加班级
						</a>
					</div>
					<c:forEach items="${tbclassList.classList }" var="tbclass" varStatus="i">
						<li class="eachClassMemberList mb-20">
							<p class="className">
								<span onclick="classTableSlide(this);" class="c-white f-16 pl-20">
									<i class="Hui-iconfont pr-10 f-12">▲</i>${tbclass.name }(${tbclass.majorName },${tbclass.memberNum }人):
								</span>
								<a onclick="exportScore(${i.index})" class="btn radius btn-primary" style="right: 112px;"><i class="Hui-iconfont">&#xe644;</i>导出成绩</a>
								<a onclick="removeClass(this,'${tbclass.id }','${scheduleInfo.scheduleId}')" title="移除班级" class="btn radius btn-danger"><i class="Hui-iconfont">&#xe706;</i>删除班级</a>
							</p>
							<div class="classTable pd-20 clearfix">
								<a onclick="group_add('添加小组','/page/admin/experiment_group_manage/group_manage_add?menuParam=1','${tbclass.id}','${scheduleInfo.experiment.experimentId }')" title="添加" class="btn radius btn-primary">
									<i class="Hui-iconfont"></i>创建小组
								</a>
								<a
									onclick="group_add_history('添加小组','/page/admin/experiment_group_manage/group_manage_assign?menuParam=1','${tbclass.id}','${scheduleInfo.experiment.experimentId }')"
									title="添加" class="btn radius btn-primary"> <i
									class="Hui-iconfont"></i>添加历史实验小组
								</a>
								<div class="cl">
									<div class="col-sm-2 col-xs-2"></div>
									<table class="col-sm-10 col-xs-10">
										<thead>
											<tr>
												<th class="text-c pb-5 pt-5 fw-bold" width="80">学生姓名</th>
												<th class="text-c pb-5 pt-5 fw-bold" width="80">学生学号</th>
												<th class="text-c pb-5 pt-5 fw-bold" width="80">实验情况</th>
												<th class="text-c pb-5 pt-5 fw-bold" width="80">学生成绩</th>
											</tr>
										</thead>
									</table>
								</div>
								<c:forEach items="${tbclass.scourseGroup }" var="scourseGroup"
									varStatus="j">
									<dl class="cl eachGroupMemberList">
										<dt class="col-sm-2 col-xs-2">
											<%-- <p>第${i.index*(j.index+1)+1 }组</p> --%>
											<p>小组名称：${scourseGroup.groupName}</p>
											<span class="Hui-iconfont c-red"
												onclick="removeGroup(this,'${scourseGroup.groupId }');">&#xe706;</span>
											<%-- 													<span onclick="editGroup('${scourseGroup.groupId }')">修改小组</span>
                                                         <span>创建时间：${scourseGroup.createTimeToString} </span>
 --%>
										</dt>
										<dd class="col-sm-10 col-xs-10">
											<p class="hp">${scourseGroup.groupName }</p>
											<table
												class="eventTable3 table table-border table-bordered table-bg table-sort table-hover">
												<tbody>
													<c:forEach items="${scourseGroup.groupMember }"
														var="member">
														<input type="hidden" name="scheduleId"
															class="clazz_${i.index }"
															value="${member.scheduleStudentScore.scheduleStudentScoreId }" />
														<tr>
															<td class="text-c" width="80">${member.name }</td>
															<td class="text-c" width="80">${member.username }</td>
															<td class="text-c" width="80"><c:if
																	test="${member.scheduleStudentScore.submitStatus==1}">进行中</c:if>
																<c:if
																	test="${member.scheduleStudentScore.submitStatus==2}">待批改</c:if>
																<c:if
																	test="${member.scheduleStudentScore.submitStatus==3}">已批改</c:if>
																<c:if
																	test="${member.scheduleStudentScore.submitStatus==4}">重做中</c:if>
															</td>
															<td class="text-c" width="80"><span> </span> <i
																class="experimentFont fc-darkGreen pl-10" title="查看详情"
																style="cursor: pointer;"
																onclick="openScoreDetail('${member.name}(成绩批改)','${ctx }/scheduleStudentScoreController/selectById/${member.scheduleStudentScore.scheduleStudentScoreId }')">&#xe672;</i>
															</td>
														</tr>
													</c:forEach>
												</tbody>
											</table>
										</dd>
									</dl>
								</c:forEach>
							</div>
						</li>
					</c:forEach>
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

	<form action="${ctx}/scheduleStudentScoreController/exportScore"
		method="post" id="fas">
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
	
	//预约编辑
	function schedule_edit(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px']
		});
		// layer.full(index);
	}
	//删除预约
	function delete_schedule(){
		layer.confirm('删除预约',{title:'删除'},function(index){
 		   layer.close(index);
 		   $.ajax({
 			   url:"${ctx}/courseScheduleController/delete/${scheduleInfo.scheduleId}",
 			   type:"post",
 			   dataType:"json",
 			   success:function(result){
 				   if(result.status == 200){
 					   layer.msg('删除成功',{icon:1,time:1000});
 					  removeIframe();
 				   }else{
 					   layer.msg(result.msg,{icon:2,time:1000});
 				   }
 			   }
 		   })
 	 });
	}
	function classTableSlide(obj){
		var $o = $(obj).parent();
		if($o.siblings('.classTable').is(':hidden')){
			$o.siblings('.classTable').slideDown();
			$o.children('span').children('i').html('▲');
		}else{
			$o.siblings('.classTable').slideUp();
			$o.children('span').children('i').html('▼');
		}
	}
	
		function group_add(title,url,classId,experimentId){
			layer.open({
				type : 2,    //1、是div，2、是链接
				content : "${ctx}/courseScheduleController/toAddGroupPage/${scheduleId}/${menuParam}/"+classId+"/"+experimentId,
				area : ['600px','450px'],
				resize : true,
				maxmin:true,//放大放小
		        resize: false,
		        title:'添加小组'
			})
		}
		
		
		function group_add_history(title,url,classId,experimentId){
			layer.open({
				type : 2,    //1、是div，2、是链接
				content : "${ctx}/courseScheduleController/toAddHistoryGroupPage/${scheduleId}/${menuParam}/"+classId+"/"+experimentId,
				area : ['600px','450px'],
				resize : true,
				maxmin:true,//放大放小
		        resize: false,
		        title:'添加历史小组'
			})
		}
		

		var classAddLayer;
		function class_add(){
			$.ajax({
				 url:"${ctx}/courseScheduleController/addAllowTbClass",
				 type:"POST",
				 data:{scheduleId:'${scheduleId}'},
				 dataType:"json",
				 success:function(result){
					 if(result.status == 200){
						 var value = result.data;
						 var optioncontent = '';
						 for(var i=0; i<value.length; i++){
							 optioncontent += '<input type="checkbox" name="tbClassId" value="'+(value[i]).id+'">'+(value[i]).name+'('+value[i].majorName+',班级总人数：'+value[i].memberNum+')<br/>';
						 }
						 if(optioncontent == ""){
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
								maxmin:true,
								scrollbar: false,
								resize: true
							});
					 }else{
						 layer.msg(result.msg,{icon:2,time:2000});
					 }
				 }
			});
		}
		
		//添加班级
		$("#layer_add_class_btn").bind("click",function(){
			 var date = new Array();
			 $("#add_class_select input[name='tbClassId']:checked").each(function(){
				 date.push($(this).val());
			 });
			 if(date.length<=0){
				 layer.msg('请选择要添加的班级',{icon:2,time:2000});
				 return false;
			 }
			 $.ajax({
				  url:"${ctx}/courseScheduleController/addClass",
				  type:"post",
				  data:{
					  scheduleId : '${scheduleId}',
					  classIds   : date+"",
					  type : '${scheduleInfo.type}'
				  },
				  dataType:"json",
				  success:function(result){
					  if(result.status == 200){
						  layer.close(classAddLayer);
						  layer.msg('添加成功',{icon:1,time:1000});
						setTimeout(function(){window.location.reload();},1500);

					  }else{
						  layer.msg(result.msg,{icon:1,time:2000});
					  }
				  }
			 })
		});
		
		//取消
		$("#layer_add_class_cancle").bind("click",function(){
			layer.close(classAddLayer);
		});
		var scheduleId = '${scheduleId}';
		var ctx = '${ctx}';
	</script>
	<!--导出学生实验成绩-->
	<script type="text/javascript">
		//导出成绩
		function exportScore(indexId){
			var classname = "clazz_"+indexId;
			var ids = [];
			$("input[class='"+classname+"']").each(function(){
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
	</script>
	<script type="text/javascript"
		src="${ctx }/staticfile/js/eventDetail.js"></script>
</body>
</html>