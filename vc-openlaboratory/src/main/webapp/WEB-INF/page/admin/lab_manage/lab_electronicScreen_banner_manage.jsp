<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/lab_electronicScreen_manage.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experimentManage.css">

	
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室管理</title>
</head>
<body>

	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室管理>电子班牌轮播图管理 <a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新"> <i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="pd-10 bk-gray bg-1">
			<p class="f-20" style="margin-bottom: 0;">
				<span>${exLab.labName }</span>--<span>电子班牌轮播图管理</span>
			</p>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mt-20">
		
			<a href="javascript:;" onclick="openAddPage('${ctx }/labClassCardPicWebController/uploadBanner','添加 轮播 图','${labId}');" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont"></i>添加</a>
			<div class="activeBtnBox f-r">
				<div sign="${pvStatus.pvStatus}" onclick="screen_center_play(this,${labId},${pvStatus.pvStatus});" class="activeBtn">
					<div class="line"></div>
					<div class="circle"></div>
				</div>
				<span class="span">默认播放轮播图<i class="Hui-iconfont Hui-iconfont-help c-success" onclick="openMsg();"></i></span>
				<p class="span_msg pd-20">
					<span>
						<i class="Hui-iconfont Hui-iconfont-help c-success"></i>主要播放方式分为:①轮播图轮播; 若均不设置则默认轮播图轮播②视频播放;
					</span>
				</p>
			</div>
		</div>
		
		<div class="showBanner">
			<ul class="row clearfix">
			<%-- <c:if test="${empty  page.list }"> <div class="Hui-tags-has"><p style="text-align:center;color:#fff; font-size:30px "  >请先上传图片！</p> </div></c:if> --%>
			<c:forEach items="${page.list }" var="page">
					<li class="col-lg-2 col-sm-3">
						<div class="bannerBox">
							
						<c:if test="${empty page.filePath }"><img src="${ctx }/staticfile/images/coursedefaultpic.png"/></c:if>
							<c:if test="${not empty page.filePath }"><img src="${RESOURCE_WAY }/${page.filePath}"/></c:if>
							<p class="delBtn" thisId=${ page.pvId} >
								<i class="experimentFont" onclick="delBanner(this)">&#xe627;</i>
								<c:if test="${ page.isPublish == 0}" >
								<i class="experimentFont c-success" onclick="showBanner(this)"isShow="${ page.isPublish}">&#xe64e; </i>
								</c:if  >
								
								<c:if test="${ page.isPublish == 1}" >
								<i class="c-999 experimentFont" onclick="showBanner(this)"isShow="${ page.isPublish}">&#xe610; </i>
								</c:if>
								
							</p>
						</div>
						<p>
							<span>${page.title}</span>
						</p>
					</li>
			</c:forEach>
			</ul>
		</div>
		

		<!--  分页开始 -->
		<div class="paging">
			<c:if test="${page.thisPage>0 }">
				<a class="paging_previous pre" thisPage="${page.thisPage-1 }">上一页</a>
			</c:if>
			<c:if test="${page.thisPage <= 0}">
				<a class="paging_previous">上一页</a>
			</c:if>

			<span><a class="paging_this checked"
				thisPage="${page.thisPage }">${page.thisPage+1 }</a></span>

			<c:if test="${page.pageNum-page.thisPage>1 }">
				<a class="paging_next next" thisPage="${page.thisPage+1 }">下一页</a>
			</c:if>
			<c:if test="${page.pageNum-page.thisPage<=1 }">
				<a class="paging_next">下一页</a>
			</c:if>

		</div>

	</div>

	<!-- 分页访问的链接 -->
	<form action="${ctx }/labClassCardPicWebController/Piclist/${labId}" method="post" class="hide" id="PageForm">
		<input type="hidden" name="thisPage">
	</form>

	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp"%>
	<script type="text/javascript">
		var ctx = '${ctx}';
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/lab_electronicScreen_manage.js"></script>
	<script type="text/javascript">
	
	
		//分页方法和事件
		$(".paging_previous.pre").off().on("click", function() {
			//上一页
			var page = $(this).attr("thisPage");
			reloadPage(page);
		});

		$(".paging_next.next").off().on("click", function() {
			//下一页
			var page = $(this).attr("thisPage");
			var totalPage = $(".paging_jump").attr("thisPage");//总页数
			reloadPage(page);
		});
			
			
		//跳转页面的请求
		function reloadPage(pageNum){
			var  pages=$("#PageForm input[name='thisPage']").val(pageNum);
			$("#PageForm").submit();
		}


	
	</script>

</body>
</html>