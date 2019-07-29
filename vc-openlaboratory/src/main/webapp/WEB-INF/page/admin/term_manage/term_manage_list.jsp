
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>学期管理</title>
	
<body>
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	学期管理  <span class="c-gray en">&gt;</span>
	<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin"></i>
	</a>
	</nav>

	<div class="page-container clearfix">
		<shiro:hasPermission name="开放与预约学期管理">
			<shiro:hasPermission name="添加学期(所有)">
			<div class="editbarcl pd-5 bg-1 bk-gray">
				<a href="javascript:;" onClick="term_add('添加学期','${ctx }/page/admin/term_manage/term_manage_add')" title="添加学期" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加</a>
			</div>
			</shiro:hasPermission>
			<input type="hidden" value="1" id="menuParam">
		</shiro:hasPermission>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">学期名称</th>
						<th width="60">开始时间</th>
					    <th width="80">结束时间</th>
						<th width="80">创建教师</th>
						<th width="30">更新时间</th>
						<shiro:hasPermission name="开放与预约学期管理"><th width="40">操作</th></shiro:hasPermission>
					</tr>
				</thead>
				<tbody class="tbody">
				  <c:forEach items="${semesterList }" var="s">
					<tr class="text-c">
						<td class="text-c">${s.semesterName }</td>
						<td class="text-c">${s.startTimeToString}</td>
					    <td class="text-c">${s.endTimeToString}</td>
						<td class="text-c">${s.teacherInfo.name}</td>
						<td class="text-c">${s.updateTimeToString}</td>
						<shiro:hasPermission name="开放与预约学期管理">
							<td class="text-c">
							<shiro:hasPermission name="修改学期(所有)">
								<a onclick="term_edit('修改学期', '${ctx }/semesterController/selectSemesterById/${s.semesterId}')"><i title="修改学期信息" class="iconfont icon-bianji"></i></a>
								<a onclick="term_del(this,${s.semesterId})"><i class="experimentFont" style="color:#9a4346;" title="删除该学期" >&#xe627;</i></a>
							</shiro:hasPermission>
							<shiro:lacksPermission name="修改学期(所有)"><span style="color:#ccc;">(无权限)</span></shiro:lacksPermission>
							</td>
						</shiro:hasPermission>
						
					</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript"	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->
	<!--请在下方写此页面业务相关的脚本-->

	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script id="javascript_datatable" type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script id="javascript_laypage" type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript">

		//添加学期
		function term_add(title, url) {
			var index = layer.open({
				type : 2,
				scrollbar : false,
				title : title,
				content : url,
				area : [ '600px', '450px' ],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			// layer.full(index);
		}
		
		
		//修改学期信息
		function term_edit(title, url) {
			var index = layer.open({
				type : 2,
				scrollbar : false,
				title : title,
				content : url,
				area : [ '600px', '450px' ],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			//layer.full(index);
		}
		
		//删除学期
 		function term_del(obj, id) {
			layer.confirm('确认要删除吗？',{title:'删除学期'},function(index) {
				$.ajax({
					type : 'POST',
					url : "${ctx}/semesterController/updateSemesterStealth",
					dataType : 'json',
					data:{
						'semesterId':id,
						'stealth':1
					},
					success : function(data) {
						if(data.status==200){
							$(obj).parents("tr").remove();
							layer.msg('已删除!', {
								icon : 1,
								time : 1000
							});
						setTime(function(){window.location.reload()});
						}else{
							layer.msg(data.msg, {
								icon : 1,
								time : 1000
							});													
						}
					},
					error : function(data) {
						console.log(data.msg);
					},
				});
			});
		}
		 

		$(function(){
			var mp = $('#menuParam').val();
			if(mp/1 == 1){				
				$('.table-sort').dataTable({
					"aaSorting": [[0, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  {"orderable":false,"aTargets":[5]}// 制定列不参与排序
					]
				});
			}else{
				$('.table-sort').dataTable({
					"aaSorting": [[0, "desc" ]],//默认第几个排序
					"bStateSave": false//状态保存
				});
			}
		});
	</script>
</body>
</html>