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
<title>课程管理</title>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
</head>
	
<body>
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	课程管理  <span class="c-gray en">&gt;</span>
	<c:if test="${menuParam==1}">
	所有课程
	</c:if>
	<c:if test="${menuParam==2}">
	院系课程
	</c:if>
	<c:if test="${menuParam==3}">
	我的课程
	</c:if>
	<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin"></i>
	</a>
	</nav>

	<div class="page-container clearfix">
		<c:choose>
			<c:when test="${menuParam eq 1 }">
				<shiro:hasPermission name="开放与预约添加课程">
					<div class="editbarcl pd-5 bg-1 bk-gray">
						<a href="javascript:;" onClick="course_add('添加课程','${ctx}/page/admin/experiment_course_manage/course_manage_add.html?menuParam=${menuParam}');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加课程</a>
					</div>
				</shiro:hasPermission>
			</c:when>
			<c:when test="${menuParam eq 2 }">
				<shiro:hasPermission name="开放与预约添加院系课程">
					<div class="editbarcl pd-5 bg-1 bk-gray">
						<a href="javascript:;" onClick="course_add('添加课程','${ctx}/page/admin/experiment_course_manage/course_manage_add.html?menuParam=${menuParam}');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加课程</a>
					</div>
				</shiro:hasPermission>
			</c:when>
			<c:otherwise>
				<shiro:hasPermission name="开放与预约添加院系课程  or 开放与预约添加所有课程">
					<div class="editbarcl pd-5 bg-1 bk-gray">
						<a href="javascript:;" onClick="course_add('添加课程','${ctx}/page/admin/experiment_course_manage/course_manage_add.html?menuParam=${menuParam}');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加课程</a>
					</div>
				</shiro:hasPermission>
			</c:otherwise>
		</c:choose>
	
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">课程编号</th>
						<th width="60">课程名字</th>
					    <th width="80">所属院系</th>
						<th width="80">任课教师</th>
						<th width="30">课程图片</th>
						<th width="60">学期</th>
						<%-- <th width="60" class="<c:if test="${menuParam==3}">hide</c:if>" >开课管理</th>
						<th width="50">排课管理</th>
						<th width="50">分配实验</th> --%>
						<c:if test="${menuParam != 3}"><th width="40">排课管理</th></c:if>
						<th width="40">实验管理</th>
						<th width="40">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${experimentCourseList }" var="c">
						<tr class="text-c">
							<td class="text-c">${c.number }</td>
							<td class="text-c">${c.courseName }</td>
						    <td class="text-c">${c.department.name }</td>
							<td>
								<c:if test="${empty c.teacherInfoList }">暂无分配教师</c:if>
								<c:forEach items="${c.teacherInfoList }" var="t">
									${t.name }&nbsp; 
								</c:forEach>
							</td>
							<td class="text-c">
								<c:choose>
									<c:when test="${empty c.resourceFile.fileFormatPath}">
										<img src="${cookie.RESOURCE_WAY.value}/system_file/img/experiment_course_default.jpg"  class="avatar radius size-L" />
									</c:when>
									<c:otherwise>
										<img src="${cookie.RESOURCE_WAY.value}/${c.resourceFile.fileFormatPath}"  class="avatar radius size-L" />
									</c:otherwise>								
								</c:choose>
							</td>
							<td class="text-c">
						        <c:choose>
						             <c:when test="${c.semester eq '1' }">上学期</c:when>
						             <c:when test="${c.semester eq '2' }">下学期</c:when>
                                        <c:otherwise>${c.semester }</c:otherwise>
						        </c:choose>
							</td>
					 		<c:choose>
							<c:when test="${menuParam eq 1}">
								<td class="text-c">
									<shiro:hasPermission name="开放与预约所有排课">
										<a onclick="course_teacher('${c.courseName }', '${ctx}/experimentCourseTeacherController/selectTeacherCourseByCourseIdToDistributePage/${c.experimentCourseId}/${menuParam }')"><i class="experimentFont" title="分配教师">&#xe64a;</i></a>
									</shiro:hasPermission>
									
									<shiro:hasPermission name="开放与预约所有开课">
										<a onclick="class_choice('实验开课','${ctx}/experimentCourseClassController/selectCourseClassByCourseIdToDistributePage/${c.experimentCourseId }/${menuParam }')"><i class="experimentFont" title="实验开课">&#xe615;</i></a>
									</shiro:hasPermission>
								</td>
							</c:when>
							<c:when test="${menuParam eq 2 }">
								<td class="text-c">
									<shiro:hasPermission name="开放与预约院系排课">
										<a onclick="course_teacher('${c.courseName }', '${ctx}/experimentCourseTeacherController/selectTeacherCourseByCourseIdToDistributePage/${c.experimentCourseId}/${menuParam }')"><i class="experimentFont" title="实验排课">&#xe64a;</i></a>
									</shiro:hasPermission>
										<shiro:hasPermission name="开放与预约院系开课">
										<a onclick="class_choice('实验开课','${ctx}/experimentCourseClassController/selectCourseClassByCourseIdToDistributePage/${c.experimentCourseId }/${menuParam }')"><i class="experimentFont" title="实验开课">&#xe615;</i></a>
									</shiro:hasPermission>
								</td>
							</c:when>
							<c:otherwise>
								
							</c:otherwise> 
							</c:choose> 
							</td>
							<td>
								<%-- <a href="javascript:void(0);" data-href="${ctx}/experimentCourseController/selectCourseExperimentByIdToPreviewPage/${c.experimentCourseId }/${menuParam }/${cookie.systemIdentify.value}?courseName=${c.courseName}" data-title="${c.courseName}下的实验" onclick="Hui_admin_tab(this);" class="btn-warning radius pd-5"><i class="experimentFont" title="查看课程实验">&#xe60c;</i>实验管理</a> --%>
								<a href="javascript:void(0);" data-href="${ctx}/experimentCourseController/selectCourseExperimentByIdToPreviewPage/${c.experimentCourseId }/${menuParam }?courseName=${c.courseName}" data-title="${c.courseName}下的实验" onclick="Hui_admin_tab(this);" class="btn-warning radius pd-5"><i class="experimentFont" title="查看课程实验">&#xe60c;</i>实验管理</a>
							</td>
							<td>
								<a	style="text-decoration: none;" onclick="previewCourse('实验课程预览','${ctx}/experimentCourseController/selectExperimentCourseByIdToPreviewPage/${c.experimentCourseId }/${menuParam }')"><i class="experimentFont">&#xe64e;</i></a>
								 <c:choose>
									<c:when test="${menuParam eq 1 }">
										<shiro:hasPermission name="开放与预约所有修改课程">
											<a style="text-decoration: none;" href="##" title="修改" onclick="course_edit('修改课程', '${ctx}/experimentCourseController/selectExperimentCourseByIdToEditPage/${c.experimentCourseId }/${menuParam }')"><i class="iconfont icon-bianji"></i></a>
										</shiro:hasPermission>
										<shiro:hasPermission name="开放与预约所有删除课程">
											<a style="text-decoration: none" class="ml-5" onClick="course_del(this,${c.experimentCourseId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</shiro:hasPermission>
									</c:when>
									<c:when test="${menuParam eq 2 }">
										<shiro:hasPermission name="开放与预约院系修改课程">
											<a style="text-decoration: none;" href="##" title="修改" onclick="course_edit('修改课程', '${ctx}/experimentCourseController/selectExperimentCourseByIdToEditPage/${c.experimentCourseId }/${menuParam }')"><i class="iconfont icon-bianji"></i></a>
										</shiro:hasPermission>
										<shiro:hasPermission name="开放与预约院系删除课程">
											<a style="text-decoration: none" class="ml-5" onClick="course_del(this,${c.experimentCourseId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</shiro:hasPermission>
									</c:when>
									<c:otherwise>
										<shiro:hasPermission name="开放与预约添加院系课程  or 开放与预约添加所有课程">
											<a style="text-decoration: none;" href="##" title="修改" onclick="course_edit('修改课程','${ctx}/experimentCourseController/selectExperimentCourseByIdToEditPage/${c.experimentCourseId }/${menuParam }')"><i class="iconfont icon-bianji"></i></a>
										</shiro:hasPermission>
										<shiro:hasPermission name="开放与预约添加院系课程  or 开放与预约添加所有课程">
											<a style="text-decoration: none" class="ml-5" onClick="course_del(this,${c.experimentCourseId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</shiro:hasPermission>
									</c:otherwise>
								</c:choose>
							</td>
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

		//课程添加
		function course_add(title, url) {
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
		
		
		//修改课程
		function course_edit(title, url) {
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
		
		//选择任课教师
		function course_teacher(title, url) {
			var index = layer.open({
				type : 2,
				scrollbar : false,
				title : '为《'+title+'》分配任课教师',
				content : url,
				area : [ '600px', '450px' ],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			//layer.full(index);
		}
		//排课管理
		function class_choice(title, url) {
			var index = layer.open({
				type : 2,
				scrollbar : false,
				title :title,
				content : url,
				area : [ '600px', '450px' ],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			//layer.full(index);
		}
		//分配实验
		function experiment_edit(title,url){
			var index = layer.open({
				type: 2,
				title: title,
				content: url,
				area: ['600px','450px'],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			layer.full(index);
		}

		//课程删除
		function course_del(obj, id) {
			layer.confirm('确认要删除吗？',{title:'删除课程'},function(index) {
				$.ajax({
					type : 'POST',
					url : '${ctx}/experimentCourseController/updateExperimentCourseStealth/'+ id+'/1',
					dataType : 'json',
					success : function(data) {
						if(data.status==200){
							$(obj).parents("tr").remove();
							layer.msg('已删除!', {
								icon : 1,
								time : 1000
							});
							window.location.reload();
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
		
		function previewCourse(title,url){
			var index = layer.open({
				type: 2,
				title: title,
				content: url,
				area: ['600px','450px'],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
		}
		
		$(function(){
			var menuParam = '${menuParam}';
			var colShow = null;
			if(menuParam == 3){
				colShow = [{"orderable":false,"aTargets":[1,4,6,7]}]
			}else{
				colShow = [{"orderable":false,"aTargets":[1,4,6,7,8]}]
			}
			var table = $('.table-sort').dataTable({
				"aaSorting": [[0, "desc" ]],//默认第几个排序
				"bStateSave": false,//状态保存
				"aoColumnDefs": colShow
			});
		});
	</script>
</body>
</html>