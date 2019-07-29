
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
<style>
.selectScreenManageType{display:none;}
.selectScreenManageType p{background: #4cacea;cursor:pointer;letter-spacing:2px;}
.selectScreenManageType p:hover{background: #6ab9ec;}
</style>
<title>实验室管理</title>
</head>
	
<body>
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	实验室管理  <span class="c-gray en">&gt;</span>
	<c:if test="${menuParam==1}">
	所有实验室
	</c:if>
	<c:if test="${menuParam==2}">
	院系实验室
	</c:if>
	<c:if test="${menuParam==3}">
	我的实验室
	</c:if>
	<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin"></i>
	</a>
	</nav>

	<div class="page-container clearfix">
		<div class="clearfix editbarcl pd-5 bg-1 bk-gray">
			<c:choose>
			 <c:when test="${menuParam eq 1 }">
			<shiro:hasPermission name="添加通用实验室(所有)"></shiro:hasPermission>	
			<a href="javascript:;" onClick="experiment_lab_add('添加实验室','${ctx}/experimentLabController/toAddPage/${menuParam }');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验室</a>

			</c:when>
			<c:when test="${menuParam eq 2 }">
			 <shiro:hasPermission name="添加实验室(院系)">
			<a href="javascript:;" onClick="experiment_lab_add('添加实验室','${ctx}/experimentLabController/toAddPage/${menuParam }');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验室</a>
		
			</shiro:hasPermission>
			</c:when>
			<c:otherwise>
	 		 <shiro:hasPermission name="添加实验室(所有) or 添加实验室(院系)">
			<a href="javascript:;" onClick="experiment_lab_add('添加实验室','${ctx}/experimentLabController/toAddPage/${menuParam }');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验室</a>
			</shiro:hasPermission> 
	 		</c:otherwise>
			</c:choose> 
			 <shiro:hasPermission name="批量导入预约排课(通用)">
			 <a href="javascript:;" onClick="coursea_ddlist('批量导入实验课程','${ctx }/experimentLabController/importLabCourse');"
						title="批量添加" class="btn radius btn-primary">
			<i class="iconfont icon-tianjiayonghu1"></i>导入课程排课数据</a>
			 </shiro:hasPermission>
			
		</div>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">实验室所属</th>
						<th width="60">负责人</th>
						<th width="60">实验室编号</th>
						<th width="30">实验室名称</th>
					    <th width="40">实验室状态</th>
						<th width="40">座位数量</th>
						<th width="60">实验室封面</th>
						<th width="60">实验室创建人</th>
						<th width="40">创建时间</th>
						<th width="40">更新时间</th>
						<th width="40">智慧实验室管理</th>
						<th width="40">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${experimentLabList }" var="lab">
						<tr class="text-c">
							<%-- <c:if test="${not empty lab.mainframeId}"></c:if> --%>
								<c:if test="${not empty lab.departmentName }">
								<td class="text-c">${lab.departmentName }</td>
								</c:if>
								<c:if test="${empty lab.departmentName }">
									<td class="text-c">通用实验室</td>
								</c:if>
							<!-- 实验室负责人 -->
							<td class="text-c">
								<c:forEach items="${lab.dutyTeachers}" var="labth">
								${labth.name}
							</c:forEach>
							</td>
							<td class="text-c">${lab.labNumber }</td>
							<c:if test="${not empty lab.mainframeId}">
							<td class="text-c">${lab.labName }</td>
							</c:if>
							
							<c:if test="${empty lab.mainframeId}">
							<td class="text-c">${lab.labName }</td>
							</c:if>
						    <td class="text-c">
						    <c:if test="${lab.labStatus==1}">
						    	可用
						    </c:if>
						     <c:if test="${lab.labStatus==2}">
						    	维护中
						    </c:if>
						    </td>
						    <td class="text-c">${lab.labSeat }</td>
							<td class="text-c">
								<c:choose>
									<c:when test="${empty lab.labImg}">
										请给我默认实验室图片
									</c:when>
									<c:otherwise>
										<img src="${cookie.RESOURCE_WAY.value}/${lab.labImg}"  class="avatar radius size-L" />
									</c:otherwise>								
								</c:choose>
							</td>
							<td class="text-c">${lab.operator.name }</td>
							<td class="text-c">${lab.createTimeToString }</td>
							<td class="text-c">${lab.updateTimeToString }</td>
							<td class="text-c">
								<c:if test="${empty lab.mainframeId}">
									<span class="c-999 f-14">(普通实验室)</span>
								</c:if>
								<c:if test="${not empty lab.mainframeId}">
								<shiro:hasPermission name="实验室管理(通用)">
 						<!-- 放开注释即可实验室设备管理看到页面 -->
  							<a class="btn btn-warning radius" href="javascript:void(0);" onclick="Hui_admin_tab(this)" data-href="${ctx }/equipment/toEquControlPage/${lab.mainframeId }/${lab.labId}/${menuParam}" data-title="${lab.labName }实验室管理" title="实验室管理"><i class="iconfont icon-quanxian1"></i>管理实验室</a>
 						<!-- 不显示实验室设备管理页面 -->
 					<!-- 	 <p class="btn btn-warning radius" ><i class="iconfont icon-quanxian1"></i>智慧实验室</p> -->
								</shiro:hasPermission>
								</c:if>
							</td>
							<td class="text-c">
								<%-- <a style="text-decoration: none;" href="##" title="修改" onclick="experiment_lab_edit('${ctx}/experimentLabController/toEditPage/${menuParam }/${lab.labId}')"><i class="iconfont icon-bianji"></i></a>
								<a style="text-decoration: none" class="ml-5" onClick="experiment_lab_del(this,'${lab.labId}','${ lab.labName}')" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
								 --%>
								 
								<c:if test="${menuParam eq 1 }">
								<shiro:hasPermission name="修改实验室内容(所有)">
								<a href="##" title="编辑" onclick="experiment_lab_edit('${ctx}/experimentLabController/toEditPage/${menuParam }/${lab.labId}/${lab.departmentId }')"><i class="iconfont icon-bianji"></i></a>
								</shiro:hasPermission>
										
								<shiro:hasPermission name="删除实验室(所有)">
									<a class="ml-5" onClick="experiment_lab_del(this,'${lab.labId}','${lab.labName }')" href="javascript:;" title="删除"><i class="experimentFont">&#xe627;</i></a>
								</shiro:hasPermission>
										
								</c:if>
									
								<c:if test="${menuParam eq 2 }">
								<shiro:hasPermission name="删除实验室(院系)">
									<a class="ml-5" onClick="experiment_lab_del(this,'${lab.labId}','${lab.labName }')" href="javascript:;" title="删除"><i class="experimentFont">&#xe627;</i></a>
								</shiro:hasPermission>
										
								<shiro:hasPermission name="修改实验室内容(院系)">
									<a href="##" title="编辑" onclick="experiment_lab_edit('${ctx}/experimentLabController/toEditPage/${menuParam }/${lab.labId}/${lab.departmentId }')"><i class="iconfont icon-bianji"></i></a>
								</shiro:hasPermission>
								</c:if>
										
								<c:if test="${menuParam eq 3 }">
									<shiro:hasPermission name="修改实验室内容(个人) or 修改实验室内容(所有) or 修改实验室内容(院系) ">
										<a href="##" title="编辑" onclick="experiment_lab_edit('${ctx}/experimentLabController/toEditPage/${menuParam }/${lab.labId}/${lab.departmentId }')"><i class="iconfont icon-bianji"></i></a>
									</shiro:hasPermission>
										
									<shiro:hasPermission name="删除实验室(个人) or 删除实验室(院系) or 删除实验室(所有)">
										<a class="ml-5" onClick="experiment_lab_del(this,'${lab.labId}','${lab.labName }')" href="javascript:;" title="删除"><i class="experimentFont">&#xe627;</i></a>
									</shiro:hasPermission>
									</c:if> 
								 
								
								<shiro:hasPermission name="实验室统计(通用)">
									<a href="javascript:void(0);" onclick="Hui_admin_tab(this)" data-href="${ctx }/experimentLabStatisticsWebController/lab_used_count/${lab.labId}/${lab.labName }/${menuParam}" data-title="${lab.labName }实验室详情统计" title="实验室详情统计"><i class="Hui-iconfont Hui-iconfont-tongji-bing"></i></a>
								</shiro:hasPermission>
								
								<c:if test="${not empty lab.mainframeId}">
								<c:if test="${menuParam eq 2 }">
									<shiro:hasPermission name="实验室电子班牌管理(院系)">
										<a href="javascript:void(0);" onclick="openManagesel(this);" title="电子班牌内容管理" labId="${lab.labId }"><i class="Hui-iconfont">&#xe72b;</i></a>
									 </shiro:hasPermission>
								</c:if>
								
								<c:if test="${menuParam eq 1 }">
									<shiro:hasPermission name="实验室电子班牌管理(所有)">
										<a href="javascript:void(0);" onclick="openManagesel(this);" title="电子班牌内容管理" labId="${lab.labId }"><i class="Hui-iconfont">&#xe72b;</i></a>
									</shiro:hasPermission>
								</c:if>
								<c:if test="${menuParam eq 3 }">
									<shiro:hasPermission name="实验室电子班牌管理(个人) or 实验室电子班牌管理(所有) or 实验室电子班牌管理(院系) ">
										<a href="javascript:void(0);" onclick="openManagesel(this);" title="电子班牌内容管理" labId="${lab.labId }"><i class="Hui-iconfont">&#xe72b;</i></a>
									</shiro:hasPermission>
								</c:if> 
								</c:if>
								
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		
		<div class="text-c pd-30 f-20 c-white selectScreenManageType">
			<div class="mr-20 ml-20 mt-20 mb-20 pd-20" style="background: #f2f2f2;">
				<p class="screenManageBtn pd-10 mb-30 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌轮播图管理" data-href=""><span>电子班牌轮播图管理</span></p>
				<p class="screenManageBtn pd-10 mb-30 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌视频管理" data-href=""><span>电子班牌视频管理</span></p>
				<p class="screenManageBtn pd-10 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌公告管理" data-href=""><span>电子班牌公告管理</span></p>
			</div>
			<div class="mr-20 ml-20 text-r"><a class="screenShow" href="" target="_blank" style="color: #4ca3bc;font-size:14px;"><i class="Hui-iconfont">&#xe72b;</i>查看电子班牌</a></div>
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
	
	//选择管理项目
	var dataHref = ['${ctx }/labClassCardPicWebController/Piclist',
	                '${ctx }/labClassCardWebVideoController/Videolist',
	                '${ctx }/labNoticeController/selectByLabIdToPage/']
	function openManagesel(obj){
		var labId = $(obj).attr('labId');
		$('.screenShow').attr('href','${ctx}/page/class_brand/index?labId='+labId);
		 $('.screenManageBtn').each(function(index){
			 $('.screenManageBtn').eq(index).attr('data-href',dataHref[index]+'/'+labId) 
		}) 
		var index = layer.open({
			type : 1,
			scrollbar : false,
			title : '电子班牌内容管理',
			content : $(".selectScreenManageType"),
			area : [ '600px', '450px' ],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
	}
	
	
	//课程批量添加
	function coursea_ddlist(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','220px'],
			scrollbar: false,
			resize : false
		});
		// layer.full(index);
	}

		//实验室添加
		function experiment_lab_add(title,url) {
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
		
		
		//实验室修改
		function experiment_lab_edit(url) {
			var index = layer.open({
				type : 2,
				scrollbar : false,
				title : '修改',
				content : url,
				area : [ '600px', '450px' ],
				maxmin:true,
				scrollbar: false,
				resize: true
			});
			//layer.full(index);
		}
		

		//实验室删除
		function experiment_lab_del(obj, id,labName) {
			layer.confirm('确认要删除吗?会将所属的实验室数据一并删除！',{title:'删除实验室'},function(index) {
				$.ajax({
					type : 'POST',
					url : '${ctx}/experimentLabController/delete/'+id+'/'+labName,
					dataType : 'json',
					success : function(data) {
						if(data.status==200){
							$(obj).parents("tr").remove();
							layer.msg('已删除!', {
								icon : 1,
								time : 1000
							});
							/* window.location.reload(); */
						}else{
							layer.msg(data.msg, {
								icon : 2,
								time : 2000
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
			$('.table-sort').dataTable({
				"aaSorting": [[0, "desc" ]],//默认第几个排序
				"bStateSave": false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[1,6,7,11]}// 制定列不参与排序
				]
			});
		});
	</script>
</body>
</html>