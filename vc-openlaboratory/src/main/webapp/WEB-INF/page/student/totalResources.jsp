
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/footer.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>资源页面</title>
	
<body>
	<div class="breadcrumb">
		<div class="inner clearfix">
			<i class="Hui-iconfont">&#xe67f;</i>系统首页<i class="c-gray en">&gt;</i>>在线资源
			<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px;color:#fff;" href="javascript:location.replace(location.href);" title="刷新">
				<i class="iconfont icon-shuaxin"></i>
			</a>
		</div>
	</div>

	<div class="laboratory-container">
		<div class="inner clearfix box-shadow boxBorder">
			<div class="pd-20 pt-30 pb-30 clearfix pos-r" style="padding-bottom:40px;">
				<div class="mt-20 pd-10 boxBorder box-shadow bc-white radius" style="padding-bottom:60px;">
					<p class="f-20 fw-bold c-orange">在线资源</p>
					<p class="pb-20">您所看到的资源是系统教师用户开放共享的资源</p>
					<table class="table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr class="text-c">
								<th width="60">所属课程</th>
								<th width="60">所属实验</th>
								<th width="60">资源文件明细</th>
								<th width="80">创建作者</th>
								<th width="40">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
						  <c:forEach items="${totalResources }" var="t">
							<tr class="text-c">
								<td class="text-c">${t.experimentCourse.courseName }</td>
								<td class="text-c">${t.experiment.experimentName }</td>
								<td class="text-c">${t.fileName}.${t.fileType}</td>
								<td class="text-c">${t.author.name}</td>
								<td class="text-c f-14">
									<a data-href="${ctx }/studentController/preview/${t.fileId}/${t.experiment.experimentId}" data-title="资源预览" onclick="Hui_admin_tab(this);" href="javascript:void(0);"><i title="预览资源" class="Hui-iconfont Hui-iconfont-yanjing"></i></a>
									<c:if test="${t.isDownload==1}">
									<a class="downLoadFileBtn" fileId="${t.fileId}" href="javascript:void(0);"><i title="下载资源" class="Hui-iconfont Hui-iconfont-down"></i></a>
									</c:if>
								</td>
							</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<!-- 下载的链接 -->
	<form action="${ctx }/studentController/downLoad" method="get" id="downLoadFile">
		<input type="hidden" name="fileId" value="" id="fileId"/>
	</form>
	<!--_footer 作为公共模版分离出去-->
	<script type="text/javascript"	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--请在下方写此页面业务相关的脚本-->
	<script id="javascript_datatable" type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript">
	var ctxUrl = "${PEXPERIMENTOPEN}";//当前项目路径
	var srcUrl= '${RESOURCE_WAY}';
	var ctx = '${ctx}';
		$('.table-sort').dataTable({
			"aaSorting": [[0, "desc" ]],//默认第几个排序
			"bStateSave": false,//状态保存
			"aoColumnDefs": [
			  {"orderable":false,"aTargets":[4]}// 制定列不参与排序
			],
			"language": {
		       "emptyTable": "没有开放共享的资源",
		       "infoEmpty": "没有开放共享的资源"
		     }
		});
		
		function term_edit(id){
			console.log(id);
		}
		
		function download(id){
		    //判断该文件是否存在
		    $.ajax({
		        type:'GET',
		        dataType:'json',
		        url:ctx+'/studentController/fileExistsById/'+id,
		        success: function(sysresult){
		            if(sysresult.status==200){
		                //下载资源
		                $('#fileId').val(id);
		                $('#downLoadFile').submit();
		                //获取下载量
		                var num =$('.downloadNum').html()/1;
		                num+=1;
		                $('.downloadNum').html(num);
		            }else{
		                layer.msg(sysresult.msg,{icon:2,time:1500});
		            }
		        },
		        error: function(data){
		            console.log(data)
		        }
		    })
		}
		
		$('.downLoadFileBtn').each(function(index){
			$('.downLoadFileBtn').eq(index).on('click',function(){
				download($(this).attr('fileId'))
			})
		})
	</script>
 <%@include file="../footer.jsp"%>
</body>
</html>