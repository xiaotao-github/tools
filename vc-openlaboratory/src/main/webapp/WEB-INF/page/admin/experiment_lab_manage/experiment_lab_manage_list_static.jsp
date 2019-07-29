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
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experimentManage.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室管理</title>
<body>
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	实验室预约  <span class="c-gray en">&gt;</span>
	<c:if test="${menuParam==1}">
	通用实验室
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
		 <div class="clearfix editbar cl pd-5 bg-1 bk-gray">
		 	<div class="f-l clearfix">
		 		<div class="f-l">
		 			<img src="${ctx }/staticfile/images/each_labBg_smart_sign.png" alt="" style="width:20px" class="pd-5"><span class="c-success"><strong>智慧实验室</strong></span>
		 		</div>
		 		<div class="pl-10 f-l">
		 			<img src="${ctx }/staticfile/images/each_labBg_sign.png" alt=""  style="width:20px" class="pd-5"><span class="c-999"><strong>普通实验室</strong></span>
		 		</div>
		 	</div>
		
			<div class="f-r">
				<form action="${ctx }/experimentLabController/list/${menuParam }" method="post" id="searchForm">
					<input type="text" name="keyword" value="${keyword }" placeholder="请输入实验室名称/编号查询" style="width:250px" class="input-text"><button class="btn btn-success search_btn" type="" style="background: #33bab0;border-color: #33bab0;"><i class="Hui-iconfont"></i> 搜索</button>
				</form>
			</div>
		</div>
		<div class="contain">
			<div class="row cl">
				<c:choose>
				<c:when test="${!empty page.list }">
					<c:forEach  items="${page.list }" var="lab">
						<div class="col-xs-4 col-sm-4 col-md-3 col-lg-2 c-white eachLab mt-20">
							<div class="pos-r each-lab radius box-shadow">
								<c:if test="${empty lab.labImg }"><img class="lab-post" src="${ctx }/staticfile/images/coursedefaultpic.png"/></c:if>
								<c:if test="${not empty lab.labImg }"><img class="lab-post" src="${RESOURCE_WAY }/${lab.labImg}"/></c:if>
								<div class="lab-leftCover <c:if test="${!empty lab.mainframeId }">smart</c:if> pos-a"></div>
								<div class="lab-rightCover pos-a"></div>
								<div class="lab-content cl pos-a">
									<div class="pd-10">
										<div data-href="${ctx}/courseScheduleController/toDetailPage/${lab.labId }/-1" data-title="实验室详情(${lab.labName })" onclick="Hui_admin_tab(this);">
											<p><strong>${lab.labName }</strong></p>
											<p>NO.${lab.labNumber }</p>
											<p class="labSeatNum"><i class="experimentFont">&#xe70e;</i>${lab.labSeat }(位)</p>
											<!-- 智慧实验室 -->
											<c:if test="${not empty lab.mainframeId }"></c:if>
											<p class="departmentName"><c:if test="${ empty lab.departmentName }">通用实验室</c:if></p>
										
											<!-- 通用实验室 -->
											<c:if test="${ empty lab.mainframeId }"></c:if>
											<p class="departmentName"><c:if test="${not empty lab.departmentName }">${lab.departmentName }</c:if></p>
											
										</div>
								
									</div>
								</div>
							</div>
						</div>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div style="width:500px;margin:0 auto;"><img style="display:block;width:100%;height:100%;" src="${ctx}/staticfile/images/null.png"></div>
					</div>
				</c:otherwise>
				</c:choose>
			</div>
		</div>
		<div class="paging">
			<c:if test="${page.thisPage>0 }"><a class="paging_previous pre radius" thisPage="${page.thisPage-1 }">上一页</a></c:if>
			<c:if test="${page.thisPage <= 0}"><a class="paging_previous radius">上一页</a></c:if>
			
			<span><a class="paging_this checked radius" thisPage="${page.thisPage }">${page.thisPage+1 }</a></span>
			
			<c:if test="${page.pageNum-page.thisPage>1 }"><a class="paging_next next radius" thisPage="${page.thisPage+1 }">下一页</a></c:if>
			<c:if test="${page.pageNum-page.thisPage<=1 }"><a class="paging_next radius">下一页</a></c:if>
			
			<span class="f-12 ml-10">跳转到: <input type="text" class="paging_jump" class="f-14" thisPage="${page.pageNum}"> 页</span>
		</div>
	</div>
	
	<div class="text-c pd-30 f-20 c-white selectScreenManageType">
		<div class="mr-20 ml-20 mt-20 mb-20 pd-20" style="background: #f2f2f2;">
			<p class="screenManageBtn pd-10 mb-30 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌轮播图管理" data-href=""><span>电子班牌轮播图管理</span></p>
			<p class="screenManageBtn pd-10 mb-30 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌视频管理" data-href=""><span>电子班牌视频管理</span></p>
			<p class="screenManageBtn pd-10 radius box-shadow" onclick="Hui_admin_tab(this);" data-title="电子班牌公告管理" data-href=""><span>电子班牌公告管理</span></p>
		</div>
	</div>
	
	<form action="${ctx }/experimentLabController/list/${menuParam}" method="post" class="hide" id="PageForm">
		<input type="hidden" name="thisPage">
		<!-- <input type="hidden" name="pageSize"> -->
		<input type="hidden" name="keyword">
 	</form>
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
		

		//实验室删除,需要改
		function experiment_lab_del(obj, id,labName) {
			layer.confirm('删除该实验室会一并将所属数据删除！',{title:'删除实验室'},function(index) {
				$.ajax({
					type : 'POST',
					url : '${ctx}/experimentLabController/delete/'+id+'/'+labName,
					dataType : 'json',
					success : function(data) {
						if(data.status==200){
							$(obj).parent().parent().remove();
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
		
		//选择管理项目
		var dataHref = ['${ctx }/labClassCardPicWebController/Piclist',
		                '${ctx }/labClassCardWebVideoController/Videolist',
		                '${ctx }/labNoticeController/selectByLabIdToPage/']
		function openManagesel(obj){
			var labId = $(obj).attr('labId');
				
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
		
		
		//分页方法和事件
		$(".paging_previous.pre").off().on("click",function(){
			//上一页
			var page = $(this).attr("thisPage");
			reloadPage(page);
		});
		
		$(".paging_next.next").off().on("click",function(){
			//下一页
			var page = $(this).attr("thisPage");
			var totalPage = $(".paging_jump").attr("thisPage");//总页数
			reloadPage(page);
		});
		
		$(".paging_jump").off().on("change",function(){
			//跳转页
			var jumpPage = $(".paging_jump").val(); //跳转的页数
			var totalPage = $(".paging_jump").attr("thisPage");//总页数
			if(jumpPage<=0||isNaN(jumpPage)) {
				layer.msg("请输入正确的页数", { icon : 2, time : 2000 });
				return false;
			}
			if(jumpPage>totalPage){
				layer.msg("最多只能跳转到第"+totalPage+"页", { icon : 2, time : 2000 });
				return false;
			}
			reloadPage(jumpPage/1-1);
		});
		
		
		//跳转页面的请求
		function reloadPage(pageNum){
			$("#PageForm input[name='thisPage']").val(pageNum);
			$("#PageForm input[name='keyword']").val($("#searchForm input[name='keyword']").val());
			$("#PageForm").submit();
		}
		
	</script>
</body>
</html>