<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML><html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
	<meta http-equiv="Cache-Control" content="no-siteapp" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/font/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/common.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/minilab/css/lab_change.css">
	<title>迷你实验室列表</title>
</head>
<body>
<div class="page-container">
		 <div class="clearfix editbar cl pd-5 bg-1 bk-gray">		
			<div class="col-xs-12 col-sm-5 col-md-3 f-r f-16">
				<form action="${ctx }/miniLab/list" method="post" id="searchForm">
					<input type="text" name="keyword" value="" placeholder="请输入实验室名称/编号查询" class="search_input"><button class="btn-success search_btn text-c" type="" style="background: #33bab0;border-color: #33bab0;"><i class="Hui-iconfont"></i> 搜索</button>
				</form>
			</div>
		</div>
		<div class="contain">
			<div class="row cl">
			<c:choose>
				<c:when test="${!empty page.list }">
					<c:forEach  items="${page.list }" var="lab">
					
					<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 c-white eachLab mt-20">
					<div class="pos-r each-lab radius box-shadow">
						<div class="lab-post pos-a"><img src="${RESOURCE_WAY }/${lab.labImg}"/></div>
						<div class="lab-leftCover smart"></div>
						<div class="lab-rightCover pos-a"></div>
						<div class="lab-content cl pos-a">
							<div class="pd-10">
								<a href="${ctx }/miniLab/getPage/${lab.labId}">
									<p><strong>${lab.labName }</strong></p>
									<p>NO.${lab.labNumber }</p>
									<p class="labSeatNum"><i class="experimentFont">&#xe70e;</i>${lab.labSeat }(位)</p>
									<p class="departmentName"><c:if test="${not empty lab.departmentName }">${lab.departmentName }</c:if></p>
								</a>
							</div>
						</div>
					</div>
				</div>
				</c:forEach>
				</c:when>
				<c:otherwise>
				<!-- wu -->
				</c:otherwise>
				</c:choose>
			
			</div>
		</div>
	</div>
	<div class="pos-f" style="bottom: 20px;bottom: 0.2rem;width: 100%;">	
	
		<div class="paging">
			<c:if test="${page.thisPage>0 }"><a class="paging_previous pre radius" thisPage="${page.thisPage-1 }">上一页</a></c:if>
			<c:if test="${page.thisPage <= 0}"><a class="paging_previous radius">上一页</a></c:if>
			
			<span><a class="paging_this checked radius" thisPage="${page.thisPage }">${page.thisPage+1 }</a></span>
			
			<c:if test="${page.pageNum-page.thisPage>1 }"><a class="paging_next next radius" thisPage="${page.thisPage+1 }">下一页</a></c:if>
			<c:if test="${page.pageNum-page.thisPage<=1 }"><a class="paging_next radius">下一页</a></c:if>
			
			<span class="f-12 ml-10">跳转到: <input type="text" class="paging_jump" class="f-14" thisPage="${page.pageNum}"> 页</span>
		</div>
	</div>
	<form action="${ctx }/miniLab/list" method="post" class="hide" id="PageForm">
		<input type="hidden" name="thisPage">
		<input type="hidden" name="keyword">
 	</form>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/minilab/js/lab_change.js"></script>

</body>

</html>