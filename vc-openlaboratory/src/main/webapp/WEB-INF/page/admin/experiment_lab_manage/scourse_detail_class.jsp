<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
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
	<div class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
		 <span class="c-gray en">&gt;</span>
		${experimentLab.labName }实验室
		 <span class="c-gray en">&gt;</span> ${scheduleInfo.experimentCourse.courseName}:排课详情
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="contain">
			<div class="row cl radius box-shadow pd-10" style="border:1px solid #ddd;margin:0 0 20px 0;background-color:#f5f5f5;">
				<div class="col-md-4 col-xs-12 col-sm-4 col-lg-3">
	               <c:if test="${empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath }">
						<img src="${ctx }/staticfile/images/coursedefaultpic.png" class="col-sm-12" style="display:block;"/>
					</c:if>
					<c:if test="${not empty scheduleInfo.experimentCourse.resourceFile.fileFormatPath}">
						<img src="${RESOURCE_WAY }/${scheduleInfo.experimentCourse.resourceFile.fileFormatPath}" class="col-sm-12" style="display:block;"/>
					</c:if>
				</div>
				<div class="col-md-8 col-sm-12 col-sm-8 col-lg-9">
					<div class="cl">
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
							<span > 上课时间: <fmt:formatDate  value="${scheduleInfo.schooltime}" pattern="yyyy-MM-dd" />
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
							<i class="Hui-iconfont">&#xe606;</i>
						   <span>创建时间: ${scheduleInfo.createTimeToString }
						   </span>
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
						<a onclick="exportScore()" title="导出成绩" class="btn radius btn-primary" style="position: absolute;top: 5px;right: 25px;">
							<i class="Hui-iconfont">&#xe644;</i>导出当前选中成绩
						</a>
						<a onclick="exportScoreClass()" title="导出全部班级成绩" class="btn radius btn-primary" style="position:;top: 5px;right: 25px;">
							<i class="Hui-iconfont">&#xe644;</i>导出全部班级成绩
						</a>
					</div>
					<ul>
						<c:forEach items="${tbclassList.classList }" var="tbclass" varStatus="vs">
							<li class="eachClassMemberList mb-20" thisId="${tbclass.id }">
								 <p class="className">
									<span onclick="classTableSlide(this);" class="c-white f-16 pl-20"><i class="Hui-iconfont pr-10 f-12">▲</i>${tbclass.name }(${tbclass.majorName }) </span>
									 <a onclick="removeClass(this,'${tbclass.id }')" title="移除班级" class="btn radius btn-danger"><i class="Hui-iconfont">&#xe706;</i>删除班级</a> 
								</p> 
								<div class="classTable pd-20 clearfix">
									<table class="eventTable1 table table-border table-bordered table-bg table-sort table-hover">
										<thead>
											<tr>
												<th class="text-c"width="65">选中当前页&nbsp;<label><input type="checkbox"  onchange="selectAllchecked(this,${vs.index })"/></label></th>
												<th class="text-c">学生学号</th>
												<th class="text-c">学生姓名</th>
												<th class="text-c">实验情况</th>
												<th class="text-c">考勤状态</th>
												<th class="text-c">报告提交时间</th>
												<th class="text-c">学生成绩</th>
												<th class="text-c ">学生课代表</th>
											</tr>
										</thead>
										<tbody>
											<c:forEach items="${tbclass.studentInfoList }" var="stu">
											
												<tr>
													<td class="text-c" width="65"><input type="checkbox" name="checkbox_${vs.index }" value="${stu.scheduleStudentScore.scheduleStudentScoreId}" onchange="checkboxChange(this)" ></td>
													<td class="text-c" width="90">${stu.user.username }</td>
													<td class="text-c" width="90">${stu.name }</td>
													<td class="text-c" width="90">
															<c:if test="${ empty stu.scheduleStudentScore.signinTime }"></c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==1}">进行中</c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==2}">待批改</c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==3}">已批改</c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==4}">重做中</c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==5}">只提交了图片</c:if>
															<c:if test="${stu.scheduleStudentScore.submitStatus ==6}">已保存报告</c:if>
													</td>
														<!-- 非智慧实验室不用考勤  -->
													<c:if test="${empty experimentLab.mainframeKey}">
															<td class="text-c" width="90">免考勤</td>
													</c:if>
													
													<c:if test="${not empty experimentLab.mainframeKey }">
													<td class="text-c" width="100">
													<c:if test="${stu.scheduleStudentScore.signin eq null }">未考勤<fmt:formatDate  value="${ stu.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if>
													<c:if test="${stu.scheduleStudentScore.signin == 1 }">正常考勤/<fmt:formatDate  value="${ stu.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if>
													<c:if test="${stu.scheduleStudentScore.signin == 2 }">迟到/<fmt:formatDate  value="${ stu.scheduleStudentScore.signinTime}" pattern="yyyy-MM-dd hh:mm:ss" /></c:if>
													</td>
													</c:if>		
													<c:if test="${not empty stu.scheduleStudentScore.submitTime  }">
													<td class="text-c" width="90"><fmt:formatDate  value="${stu.scheduleStudentScore.submitTime }" pattern="yyyy-MM-dd hh:mm:ss" /></td>
													</c:if>
													<c:if test="${ empty stu.scheduleStudentScore.submitTime  }">
													<td class="text-c" width="90">未提交</td>
													</c:if>
													<td class="text-c" width="75">
														<span>${stu.scheduleStudentScore.score }</span>
														<i class="experimentFont fc-darkGreen pl-10" title="查看详情" style="cursor: pointer;" onclick="openScoreDetail('${stu.name}','${ctx }/scheduleStudentScoreController/selectById/${stu.scheduleStudentScore.scheduleStudentScoreId }')">&#xe672;</i>
													</td>
													
													<td class="text-c" width="75">
														<c:if test="${scheduleInfo.deputy eq 0 }">
															<a class="label label-success radius" href="javascript:void(0);" onclick="addCounrselist('${ctx }/courseScheduleController/addDeputy',${stu.user.id },'${scheduleId}',this)">设为课代表 </a>
														</c:if>
														<c:if test="${scheduleInfo.deputy ne 0 and scheduleInfo.deputy ne stu.user.id}">
															<span class="c-999">已设置课代表</span>
														</c:if>
														<c:if test="${scheduleInfo.deputy eq stu.user.id }">
															<a class="label label-warning radius" href="javascript:void(0);" onclick="delectDeputy('${ctx }/courseScheduleController/delectDeputy',${stu.user.id },'${scheduleId}',this)">取消课代表 </a>
														</c:if>
													</td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div>
							</li>
						</c:forEach>
					</ul>
				</div>
			</div>
		</div>
	</div>
	
	
	<!-- 添加班级 style="display: none;"-->
	  <form id="layer_add_class"  class="form hide" name="" action="">
		<div class="row cl">
		    <label class="col-sm-3 text-r"><span>班级： </span></label>
		    <div class="col-sm-8">
		    	<div id="add_class_select">
		    		<select name="classId" id="add_class_select">
		    		</select>
		    		<input type="checkbox" name="tbClassId" value="1">商软二班
		    	</div>
		    	<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
	    	</div>
		</div>
	
		
	    <div class="row cl">
	    	<div class="col-xs-12 col-sm-12 text-c">
				<button type="button" class="btn btn-primary radius" id="layer_add_class_btn">
				<i class="Hui-iconfont">&#xe600;</i>
				 添加</button>
				<button type="button" class="btn btn-secondary radius" id="layer_add_class_cancle">
				<i class="iconfont icon-zhongzhi2"></i>
				取消</button>
			</div>
			<div class="col-xs-12 col-sm-12 text-c c-red">
				<i class="pdr-10"></i><span></span>
			</div>
	    </div>
	  </form> 
	  <!--  -->
	    <form action="${ctx}/scheduleStudentScoreController/exportScoreClass" method="post" id="ClassId">
		 <input type="hidden" name="classIds" value="" id="Classids">
		 <input type="hidden" name="scheduleId" value="${scheduleInfo.scheduleId }" >
		</form>
	  
	  <form action="${ctx}/scheduleStudentScoreController/exportScore" method="post" id="fas">
		 <input type="hidden" name="ids" value="" id="ids">
	</form>
	  
	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript"	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"	src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/eventDetail.js"></script>
	<script type="text/javascript">
	var number = 0;
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
	layer.confirm('确认要删除该预约吗?(一旦删除,该预约下所有数据都会被删除!)',{title:'删除'},function(index){
		   layer.close(index);
		   $.ajax({
			   url:"${ctx}/courseScheduleController/delete/${scheduleInfo.scheduleId}"+'/'+'${scheduleInfo.experimentCourse.courseName}'+'/'+'${scheduleInfo.schooltime}'+'/'+'${ scheduleInfo.slice}'+'/'+'${scheduleInfo.type }'+'/'+number,
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
function removeClass(obj,id){
	 layer.confirm('确认要删除该班级排课吗(一旦删除,该课程下所有班级的学生实验成绩都会被删除)',{title:'删除'},function(index){
	$.ajax({
		// url:"${ctx}/courseScheduleController/removeClass/${scheduleId}/"+id,
		 url:"${ctx}/courseScheduleController/removeAutonomyClass/"+'${scheduleId}'+'/'+id+'/'+'${scheduleInfo.experimentCourse.courseName}'+'/'+'${scheduleInfo.schooltime}'+'/'+'${ scheduleInfo.slice}'+'/'+'${scheduleInfo.type }',
		
		 type:"POST",
		 dataType:"json",
		 success:function(result){
			 if(result.status == 200){
				 layer.msg('移除成功',{icon:1,time:1000});
				 $(obj).parent().parent().addClass("hide");
			 }else{
				 layer.msg(result.msg,{icon:2,time:2000});
			 }
		 }
	    });
   	 });
}
	//查找可添加的班级	
 var classAddLayer;
function class_add(){
	$.ajax({
		// url:"${ctx}/courseScheduleController/addAllowTbClass",
		 url:"${ctx}/courseScheduleController/addAllowTbClass/"+'${scheduleInfo.newSchooltime}'+'/'+'${scheduleInfo.slice}'+'/'+'${scheduleId}',
		 type:"POST",
		//data:{scheduleId:'${scheduleId}'},
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
</script>
<!--学生成绩导出js-->
<script type="text/javascript">
//数组操作工具
 var ArrayUtil = {
	deleteItem :function(datas,item){ //删除数组中所有指定元素
		for(var i = 0; i<datas.length;){
			if(datas[i] == item){
				datas.splice(i,1);				
			}else{
				i++;
			}
		}
		return datas;
	},addItem:function(datas,item){ //添加指定元素，重复的不添加
		var blf = true;
		for(var i=0;i<datas.length;i++){
			if(datas[i]==item){
				blf = false;
				break;
			}
		}
		if(blf)datas.push(item);				
		return datas;
	}
} 
var scoreIds = []; //定义一个用于存放学生成绩id的全局变量
function selectAllchecked(obj,classIndex){
	var checkbox_name = "checkbox_"+classIndex; //需要选中的name
	if($(obj).prop("checked")){ //选中
		$("input[name='"+checkbox_name+"']").each(function(){
			ArrayUtil.addItem(scoreIds,$(this).val());
		});
	}else{//取消选择
		$("input[name='"+checkbox_name+"']").each(function(){
			ArrayUtil.deleteItem(scoreIds,$(this).val());
		});
	}
}

function checkboxChange(obj){
	if($(obj).prop("checked")){//选中
		ArrayUtil.addItem(scoreIds,$(obj).val());
	}else{//取消选择
		//去掉全选
		$(obj).parents("tbody").siblings("thead").find("input[type='checkbox']").prop("checked",false);
		ArrayUtil.deleteItem(scoreIds,$(obj).val());
	}
}

//导出成绩
function exportScore(){
	if(scoreIds!=null && scoreIds.length!=0){
		layer.confirm('确认要批量导出吗？',{title:'导出项目成绩'},function(index){
			$('#ids').val(scoreIds);
 			$("#fas").submit();
 			layer.close(index)
		})
	}else{
		layer.msg('请选择所需导出的项!',{icon:2,time:1000});
	}
}

/* 全部班级成绩 */
 function exportScoreClass(){
	var data = new Array();
	$('.eachClassMemberList').each(function(index){
		var ids = $('.eachClassMemberList').eq(index).attr('thisId');
		data.push(ids);
	});
	layer.confirm('确认要批量导出吗？',{title:'导出项目成绩'},function(index){
		console.log(data);
		$('#Classids').val(data);
		$("#ClassId").submit();
		layer.close(index)
	})
}
//设为课代表
	function addCounrselist(url,id,scheduleId,obj){
		layer.confirm('确认设置该学生为课代表吗!',{title : '确定加入吗？'},
			function(index) {
				$.ajax({
				 	type: 'POST',
				 	url: url,
				 	dataType: 'json',
				 	data: {
						 'studentId':id,
						 'scheduleId':scheduleId
					 },
				 	success: function(data){
				 		if(data.status=200){
				 			layer.msg('设置成功!',{icon:1,time:1000},function(){
				 				window.location.reload();
				 			});
				    	}
				 		if(data.status=202){
				    		layer.msg(data.msg,{icon:1,time:1000});
				    	}
				 	},
				 	error:function(data) {
				 		layer.msg("系统异常，请联系工程师！",{icon:2,time:1500});    
				 	},
				 });
		});
	}
	
	//取消课代表
	function delectDeputy(url,id,scheduleId,obj){
		layer.confirm('确认取消课代表吗!',{title : '确定取消吗？'},
			function(index) {
				$.ajax({
				 	type: 'POST',
				 	url: url,
				 	dataType: 'json',
				 	data: {
						 'studentId':id,
						 'scheduleId':scheduleId
					 },
				 	success: function(data){
				 		if(data.status=200){
				 			layer.msg('已取消!',{icon:1,time:1000},function(){
				 				window.location.reload();
				 			});
				    	}
				 		if(data.status=202){
				    		layer.msg(data.msg,{icon:1,time:1000});
				    	}
				 	},
				 	error:function(data) {
				 		layer.msg("系统异常，请联系工程师！",{icon:2,time:1500});    
				 	},
				 });
		});
	}


</script>
	
</body>
</html>