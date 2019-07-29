<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/css/chapter_addQuestions.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
</head>
<body>
	<div class="addResourcesContain">
		<p class="txt">为《${experimentCourse.courseName }》课程 &nbsp;挑选实验</p>
		<ul class="nav clearfix">
			<li class="selected">已挑选的实验</li>
			<li>未挑选的实验</li>
		</ul>
		<ul class="resourcestable">
			<li class="resourcestable_checked">
				<table class="table table-border resources_table table-bordered table-bg table-sort table-hover">
					<thead>
						<th class="text-c" width="20"></th>
						<th class="text-c" width="80">实验名称</th>
						<th class="text-c" width="60">实验类型</th>
						<th class="text-c" width="40">难易程度</th>
						<th class="text-c" width="30">课时</th>
						<th class="text-c" width="70">修改时间</th>
						<th class="text-c" width="80">标识</th>
						<th class="text-c" width="40">作者</th>
						<th class="text-c" width="20">预览</th>
					</thead>
					<tbody class="tbody">
						<c:forEach items="${hasExperimentList }" var="e">
							<tr class="checked">
								<td class="text-c tdClick"><label> <input type="checkbox" name="experimentId" ids="${e.experimentId }" checked="checked"></label></td>
								<td class="text-c"><span class="resourcesContain" onclick="previewResources(this);">${e.experimentName }</span></td>
								<td class="text-c">
									<span class="resourcesAuthor">
									<c:choose>
									<c:when test="${e.experimentType==1 }">设计实验</c:when>
									<c:otherwise>参考实验</c:otherwise>
									</c:choose> 
									</span>
								</td>
								<td class="text-c">
									<span class="">
									<c:choose>
									<c:when test="${e.level==1 }">
										容易
									</c:when>
									<c:when test="${e.level==2 }">
										适中
									</c:when>
									<c:when test="${e.level==3 }">
										困难
									</c:when>
									</c:choose> 
									</span>
								</td>
								<td class="text-c"><span class="">${e.needHour }</span></td>
								<td class="text-c"><span class="">${e.updateTimeToString }</span></td>
								<td class="text-c"><span class="">${e.keyword }</span></td>
								<td class="text-c"><span class="">${e.author.name }</span></td>
								<td class="text-c"><a><i class="experimentFont" onclick="experiment_preview('预览','${ctx }/experimentController/selectExperimentToPreviewPage/${e.experimentId }')">&#xe64e;</i></a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</li>
			<li class="resourcestable_uncheck">
				<table class="table resources_table table-border resources_table table-bordered table-bg table-sort table-hover">
					<thead>
						<th class="text-c" width="20"></th>
						<th class="text-c" width="80">实验名称</th>
						<th class="text-c" width="60">实验类型</th>
						<th class="text-c" width="40">难易程度</th>
						<th class="text-c" width="30">课时</th>
						<th class="text-c" width="70">修改时间</th>
						<th class="text-c" width="80">标识</th>
						<th class="text-c" width="40">作者</th>
						<th class="text-c" width="20">预览</th>
					</thead>
					<tbody class="tbody">
						<c:forEach items="${otherExperimentList }" var="e">
							<tr class="">
								<td class="text-c tdClick"><label> <input type="checkbox" name="experimentId" ids="${e.experimentId }"></label></td>
								<td class="text-c"><span class="resourcesContain" onclick="previewResources(this);">${e.experimentName }</span></td>
								<td class="text-c">
									<span class="resourcesAuthor">
									<c:choose>
										<c:when test="${e.experimentType==1 }">设计实验</c:when>
										<c:otherwise>参考实验</c:otherwise>
									</c:choose> 
									</span>
								</td>
								<td class="text-c">
									<span class="">
									<c:choose>
										<c:when test="${e.level==1 }">
											容易
										</c:when>
										<c:when test="${e.level==2 }">
											适中
										</c:when>
										<c:when test="${e.level==3 }">
											困难
										</c:when>
									</c:choose> 
									</span>
								</td>
								<td class="text-c"><span class="">${e.needHour }</span></td>
								<td class="text-c"><span class="">${e.updateTimeToString }</span></td>
								<td class="text-c"><span class="">${e.keyword }</span></td>
								<td class="text-c"><span class="">${e.author.name }</span></td>
								<td class="text-c"><a><i class="experimentFont" onclick="experiment_preview('预览','${ctx }/experimentController/selectExperimentToPreviewPage/${e.experimentId }')">&#xe64e;</i></a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</li>
		</ul>
	</div>
	<div class="text-c btnGroup">
		<button class="btn btn-primary radius" type="button" id="postData">
		 保存</button>
		<button class="btn btn-secondary radius" type="button" id="exitPage">
		<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
		<i class="iconfont icon-zhongzhi2"></i>
		取消</button>
	</div>
</body>
<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script id="javascript_datatable" type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
/* var data = new Array();
var num = new Array();
var contain = new Array();
for(var i=0;i<20;i++){
	contain.push(i+'<input type="checkbox" name="resourcesCheckbox">')
	num.push(i);
	data[i] = [num[i],contain[i]];
} */
		
		var flag = true;
		var data = new Array();
		var $data = {
			init:function(data){
				var a = data;
				$("input[name=experimentId]").each(function(index){
					if($("input[name=experimentId]").eq(index).prop("checked")){
						var i = $("input[name=experimentId]").eq(index).attr("ids");
						a.push(i);
					}
				})
				return a;
			},
			pushData:function(data,pushId){
				var b = data;
				b.push(pushId);
				return b;
			},
			delData:function(data,delId){
				var c = data;
				for(var i=0;i<c.length;i++){
					//console.log(c[i]);
					if(c[i]==delId){
						c.splice(i,1);
					}
				}
				return c;
			},
			dataPost:function(data){
				var experimentIds=data+""
				$.ajax({
					type:'POST',
					url:'${ctx }/courseExperimentController/distributeExperimentToCourse/${experimentCourse.experimentCourseId}',
					data:{
						'experimentIds':experimentIds
					},
					success:function(data){
						layer.msg('挑选成功!',{icon:1,time:1500});
						setTimeout(function(){window.parent.location.reload()},1600);
					},
					error:function(data){
						layer.msg('挑选失败!',{icon:2,time:1500});
					}
				})
			},
			previewResources : function(obj){
				var $id = $(obj).parent().siblings('.tdClick').children().children().attr("ids");
				var content = '';
				/* $.ajax({
					type:'GET',
					url:'',
					dataType:'json',
					data:'',
					success: function(sysresult){
						content = sysresult.data;
					},
					error: function(sysresult){
						
					}
				}) */
				var index = layer.open({
					type : 2,
					content : '${ctx }/page/chapter_manage/preview.html?id='+$id,
					area : ['800px','550px']
				})
				//layer.full(index);
			}
		}
		data = $data.init(data);
		$("input[name=experimentId]").change(function(){
			var id = $(this).attr("ids");
			if($(this).prop("checked")){
				data = $data.pushData(data,id);
				$(this).parents("tr").addClass("checked");
			}else{
				data = $data.delData(data,id);
				$(this).parents("tr").removeClass("checked");
			}
		});
		
		$("#postData").click(function(){
			console.log(data);
			if(flag){
				$data.dataPost(data);
			}else{
				layer.msg('分配题目数量不能超过选择题目总数!',{icon:2,time:2500});
			}
		})
		
		$("#exitPage").click(function(){
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		})
		
		$(".nav li").each(function(index){
			$(".nav li").eq(index).click(function(){
				$(this).addClass('selected');
				$(".resourcestable li").eq(index).show();
				$(this).siblings().removeClass('selected');
				$(".resourcestable li").eq(index).siblings('li').hide();
			})
		});
		
		//实验预览
		function experiment_preview(title,url){
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
		
		
		$(function(){
			$(".resourcestable_checked .resources_table").dataTable({
				"aaSorting" : [ [ 2, "desc" ] ],//默认第几个排序
				"stripeClasses": [ 'strip1', 'strip2'],
				"orderClasses": false,
				"bStateSave" : false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[0,1,6,8]}// 制定列不参与排序
				]
			});
			$(".resourcestable_uncheck .resources_table").dataTable({
				"aaSorting" : [ [ 2, "desc" ] ],//默认第几个排序
				"stripeClasses": [ 'strip1', 'strip2'],
				"orderClasses": false,
				"bStateSave" : false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[0,1,6,8]}// 制定列不参与排序
				]
			});
		})
</script>
</html>