<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/css/chapter_addQuestions.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/experiment_choice_resource.css">
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
</head>
<body>
	<div class="addResourcesContain">
		 <p class="p1">为<span class="span1">《${experiment.experimentName }》</span>挑选资源
		 <span class="span3">
		 </span>
		 </p>
		<ul class="nav clearfix">
			<li class="selected">已挑选的资源</li>
			
			<li >我的资源</li>
			<li>共享的资源</li>
			<li>没想要的？上传你的资源</li> 
		</ul>
		<form action="${ctx }/experimentFileController/distributeFilesToExperiment/${vcoocUserId}/${experiment.experimentId}" method="POST" enctype="multipart/form-data" id="searchForm">
			<ul class="resourcestable">
				<li class="resourcestable_checked">
					<table class="table resources_table isSelected_resources_table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr>
								<th class="text-c" width="20">资源名称</th>
								<th class="text-c" width="80">资源标题</th>
								<th class="text-c" width="50">作者</th>
								<th class="text-c" width="50">关键字</th>
								<th class="text-c" width="60">所属库</th>
								<th class="text-c" width="30">文件类型</th>
								<th class="text-c" width="50">上传时间</th>
								<th class="text-c" width="20">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
							<c:forEach items="${hasFileList }" var="c">
								<tr>
									<td class="text-c"><span>
									    ${c.fileName }
									</span></td>
									<td class="text-c"><span class="resourcesContain">${c.fileTitle }</span></td>
									<td class="text-c"><span class="resourcesAuthor">${c.author.name }</span></td>
									<td class="text-c"><span class="resourcesKeyWords">${c.fileTag }</span></td>
									<td class="text-c"><span class="">
									<c:choose>
										<c:when test="${empty c.resourceLibrary.libraryName}">其他资源库</c:when>
										<c:otherwise>${c.resourceLibrary.libraryName}</c:otherwise>
									</c:choose>
									</span></td>
									<td class="text-c"><span class="">${c.fileType }</span></td>
									<td class="text-c"><span class="">${c.createTimeToString }</span></td>
									<td class="text-c">
										<a href="javascript:void(0);" title="取消分配"><i class="experimentFont" onclick="delectExperimentResources(${c.fileId },${experiment.experimentId });">&#xe627;</i></a>
									</td> 
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</li>
				<li class="resourcestable_uncheck">
					<table class="table resources_table my_resources_table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr>
								<th class="text-c" width="40">全选<input type="checkbox" onchange="checkOrUncheckM(this)"></th>
								<th class="text-c" width="20">资源名称</th>
								<th class="text-c" width="80">资源标题</th>
								<th class="text-c" width="50">关键字</th>
								<th class="text-c" width="60">所属库</th>
								<th class="text-c" width="30">文件类型</th>
								<th class="text-c" width="50">上传时间</th>
								<th class="text-c" width="20">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
							<c:forEach items="${myFileList }" var="m">
								<tr <c:if test="${m.isSelected==1 }">class="checked"</c:if> ids="${m.fileId }">
									<td class="text-c tdClick">
										<c:if test="${m.isSelected==1 }">&nbsp;</c:if><label><input type="checkbox" name="resourcesCheckbox" ids="${m.fileId }" <c:if test="${m.isSelected==1 }">checked="checked"</c:if>></label>
									</td>
									<td><span>${m.fileName}</span></td>
									<td class="text-c">
									<span class="resourcesContain">${m.fileTitle }</span>
									</td>
									<td class="text-c"><span class="resourcesKeyWords">${m.fileTag }</span></td>
									<td class="text-c"><span class="">
									<c:choose>
										<c:when test="${empty m.resourceLibrary.libraryName}">其他资源库</c:when>
										<c:otherwise>${m.resourceLibrary.libraryName}</c:otherwise>
									</c:choose>
									</span></td>
									<td class="text-c"><span class="">${m.fileType }</span></td>
									<td class="text-c"><span class="">${m.createTimeToString }</span></td>
									<td class="text-c">
										<%--  <a href="javascript:void(0);" title="预览资源"><i class="experimentFont" onclick="previewResources(${m.fileId });">&#xe64e;</i></a>  --%>
										<a href="javascript:void(0);" title="删除资源"><i class="experimentFont" style="color:#9a4346" onclick="DelectResources(${m.fileId });">&#xe627;</i></a>
										<a href="javascript:void(0);" title="下载资源"><i class="Hui-iconfont Hui-iconfont-down" onclick="downLoad(${m.fileId});"></i></a> 
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</li>
				<li class="resourcestable_uncheck">
					<table class="table resources_table collect_resources_table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr>
								<th class="text-c" width="20">全选<input type="checkbox" onchange="checkOrUncheckC(this)"></th>
								<th class="text-c" width="20">资源名称</th>
								<th class="text-c" width="80">资源标题</th>
								<th class="text-c" width="50">作者</th>
								<th class="text-c" width="50">关键字</th>
								<th class="text-c" width="60">所属库</th>
								<th class="text-c" width="30">文件类型</th>
								<th class="text-c" width="50">上传时间</th>
								<th class="text-c" width="20">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
							<c:forEach items="${collectedFileList }" var="c">
								<tr <c:if test="${c.isSelected==1 }">class="checked"</c:if> ids="${c.fileId }">
									<td class="text-c tdClick">
									<c:if test="${c.isSelected==1 }">&nbsp;</c:if><label><i></i><input type="checkbox" name="collectCheckbox" ids="${c.fileId }" <c:if test="${c.isSelected==1 }">checked="checked"</c:if>></label>
										
									</td>
									<td class="text-c"><span>${c.fileName }</span></td>
									<td class="text-c"><span class="resourcesContain">${c.fileTitle }</span></td>
									<td class="text-c"><span class="resourcesAuthor">${c.author.name }</span></td>
									<td class="text-c"><span class="resourcesKeyWords">${c.fileTag }</span></td>
									<td class="text-c"><span class="">
									<c:choose>
										<c:when test="${empty c.resourceLibrary.libraryName}">其他资源库</c:when>
										<c:otherwise>${c.resourceLibrary.libraryName}</c:otherwise>
									</c:choose>
									</span></td>
									<td class="text-c"><span class="">${c.fileType }</span></td>
									<td class="text-c"><span class="">${c.createTimeToString }</span></td>
									<td class="text-c">
										<a href="javascript:void(0);" title="下载资源"><i class="Hui-iconfont Hui-iconfont-down" onclick="downLoad(${c.fileId });"></i></a> 
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</li>
				<li class="resourcestable_uncheck clearfix">
					<div class="form">
					    <div class="row cl">
						   	<label class="col-xs-2 col-sm-2 pn-0 text-r">资源标题：</label>
						    <div class="col-xs-9 col-sm-9">
						    	<input type="text"  name="fileTitle" class="input-text">
						    </div>
						</div>
						<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">所属资源库：</label>
							<div class="col-xs-9 col-sm-9">
								<select name="libraryId" class="select select-box">
									<c:forEach items="${resourceLibraries }" var="rl">
										<option value="${rl.libraryId }">${rl.libraryName }</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="row cl">
						     <label class="col-xs-2 col-sm-2 pn-0 text-r">资源介绍：</label>
						     <div class="col-xs-9 col-sm-9">	
						     	<textarea rows="" cols="" name="filePresentation" class="textarea" onKeyUp="$.Huitextarealength(this,500)"></textarea>
						     	<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
						     </div>
						</div>
						<div class="row cl">
						   	<label class="col-xs-2 col-sm-2 pn-0 text-r">资源标签：</label>
						    <div class="col-xs-9 col-sm-9">
						    	<input type="text" id="fileTag" name="fileTag" class="input-text" value="${experiment.experimentName}">
						        <p style="clear: both;margin: 0;"><span style="color:red;pr-10">*</span><span style="color:blue;">不同标签请用空格或者逗号隔开多个标签字符</span></p>
						    </div>
						   <button type="button" onclick="addLabel()" style="top:0;right: 175px;height: 30px;">保存标签</button>
						</div>
						<div class="row cl resourceSign">
							<label class="form-label col-xs-2 col-sm-2 col-md-2 text-r"></label>
								<div class="formControls col-xs-9 col-sm-9 col-md-9 resourceSignBox cl">
						
					            </div>
			            </div>
			            <div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">共享或者私有：</label>
							<div class="col-xs-9 col-sm-9">
								<input type="radio" value="3" name="openStatus" checked>是
								<input type="radio" value="1" name="openStatus">否  
							</div> 
							<input type="hidden" value="1" name="isDownload" />
					   	</div>
					   	<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传资源：</label>
							<div class="col-xs-9 col-sm-9">
								<ul class="fileuploadPart pd-20">
									<li class="pd-20 pdt-5 pdb-5 mrb-5"><input type="file" name ="otherFiles"/><span class="plus experimentFont fc-green" onclick="plusFile(this);">&#xe608;</span></li>
								</ul>
							</div>
						</div>

					</div>
				</li> 
			</ul>
			<input name="resourceFileIds" type="hidden" value=""/>
			<input name="instructorId" type="hidden" value="${instructorId}"/>
		</form>
	</div>
	<div class="text-c btnGroup">
		<button class="btn btn-primary radius" type="button" id="postData">
		<i class="Hui-iconfont">&#xe600;</i>
		 保存</button>
		<button class="btn btn-secondary radius" type="button" id="exitPage">
		<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
		<i class="iconfont icon-zhongzhi2"></i>
		取消</button>
	</div>
	<form action="${ctx }/experimentFileController/downLoad" method="get" id="downLoadFile">
		<input type="hidden" name="fileId" value="" id="fileId"/>
	</form>
	
	<%@include file="../../footer.jsp" %>
</body>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js" id="javascript_datatable"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
		var ctx = '${ctx}';

		/*判断提交结果*/
		if('${status}' =='200'){
			layer.msg('分配成功!',{icon:1,time:1500});
			setTimeout('window.location.reload()',1800);
		}else if('${status}' =='202'){
			layer.msg("${msg}",{icon:2,time:2000});
			/* window.location.reload(); */
		}
		
		
		
		function checkOrUncheckM(obj){
			var str;
			/* 是否选中状态 */
			if($(obj).prop("checked")){
				//全选
				$("input[name='resourcesCheckbox']").each(function(){
					str = $(this).attr("ids");
					//只push那些没有checked，避免重复
					$(this).prop("checked",true);
					$(this).parents("tr").addClass("checked");
					data.push(str);	
				});
			}else{
				//取消全选
				$("input[name='resourcesCheckbox']").each(function(){
					str = $(this).attr("ids");
					$(this).prop("checked",false);
					$(this).parents("tr").removeClass("checked");
					for(var i=0;i<data.length;i++){
						if(data[i]==str){
							data.splice(i,1);
						}
					}
				});
			}
			data=data.unique();
		}
	
	
	
	
		function checkOrUncheckC(obj){
			var str;
			/* 是否选中状态 */
			if($(obj).prop("checked")){
				//全选
				$("input[name='collectCheckbox']").each(function(){
					str = $(this).attr("ids");
					//只push那些没有checked，避免重复
					$(this).prop("checked",true);
					$(this).parents("tr").addClass("checked");
					data.push(str);	
				});
			}else{
				//取消全选
				$("input[name='collectCheckbox']").each(function(){
					str = $(this).attr("ids");
					$(this).prop("checked",false);
					$(this).parents("tr").removeClass("checked");
					for(var i=0;i<data.length;i++){
						if(data[i]==str){
							data.splice(i,1);
						}
					}
				});
			}
			data=data.unique();
		}
		
		//取消分配该资源
		function delectExperimentResources(id,experimentId){
			$.ajax({
				async: false,
				type: 'GET',
				url: '${ctx}/experimentFileController/delectExperimentResources/'+id+'/'+experimentId,
				dataType: 'json',
				success: function(sysresult){
	          if(sysresult.status==200){
				layer.msg('取消成功!',{icon:1,time:1500},function(){
					location.replace(location.href);
				});
	          }
				},
				error:function(data) {
				console.log(data.msg);
				}
		 	  });
		}
	
		//删除资源标签
		function deleteLabel(id){
			layer.confirm('确认要删除该标签？',{title:'删除资源标签'},function(index){
			$.ajax({
				async: false,
				type: 'GET',
				url: '${ctx}/resourceCategoryController/deleteResourceCategory/'+id,
				dataType: 'json',
				success: function(sysresult){
	          if(sysresult.status==200){
        	  	$(".resourceSignBox").children('span').each(function(index,ele){
        	  		var ids = $(this).attr('ids');
        	  		var obj = $(this);
        	  		if(ids == id){
        	  			obj.remove();
        	  		}
        	  	})
				layer.msg('删除成功!',{icon:1,time:2000});
	          }
				},
				error:function(data) {
				console.log(data.msg);
				}
		 	  });
			});
		}
		
		//添加资源标签
		function addLabel(){
			var content=$("input[name='fileTag']").val();
			if(content==''){
		  		layer.msg('标签不能为空!',{icon:2,time:2000});
		  		return false;
			}
			$.ajax({
				type: 'post',
				url: '${ctx}/resourceCategoryController/addResourceCategory',
				data:{ 
					content:content
				},
				dataType: 'json',
				success: function(sysresult){
				if(sysresult.status==200){
					layer.msg('添加成功!',{icon:1,time:2000});
					/* $("#fileTag").val(''); */
					var id=sysresult.data;
					for(var i=0;i<sysresult.data.length;i++){
			        		content='<span style="display:block;float:left;margin: 3px 5px;padding: 0px 5px;border: 1px solid #5a98de;color: #5a98de;cursor: pointer;" selectType="0" ids='+sysresult.data[i].resourseCategoryId+'><em onclick="resourceSignSel(this);" style="font-style: normal;">'+sysresult.data[i].categoryName+'</em><i style="padding-left:5px;color:red;" onclick="deleteLabel('+sysresult.data[i].resourseCategoryId+');" class="Hui-iconfont">&#xe706;</span>'
			        		$('.resourceSign .resourceSignBox').append(content);  
			        		 
			        	}
				}else{
					layer.msg(sysresult.msg,{icon:2,time:2000});  
				}
				},
				error:function(data) {
				console.log(data.msg);
				}
		 	});
		}
		
		//查询资源标签
		$(function(){
			$.ajax({
				type: 'post',
				url: '${ctx}/resourceCategoryController/selectAllResourceCategoryByTeacherInfoId',
				dataType: 'json',
				success: function(sysresult){
			          if(sysresult.status==200){
			        		var content;
			        		if(sysresult.data==null || sysresult.data==''){
			        			return false;
			        		}
 			        	for(var i=0;i<sysresult.data.length;i++){
 			        		content='<span style="display:block;float:left;margin: 3px 5px;padding: 0px 5px;border: 1px solid #5a98de;color: #5a98de;cursor: pointer;" selectType="0" ids='+sysresult.data[i].resourseCategoryId+'><em onclick="resourceSignSel(this);" style="font-style: normal;">'+sysresult.data[i].categoryName+'</em><i style="padding-left:5px;color:red;" onclick="deleteLabel('+sysresult.data[i].resourseCategoryId+');" class="Hui-iconfont">&#xe706;</span>'
 			        		$('.resourceSign .resourceSignBox').append(content);  
 			        		 
 			        	}
			          }
			          
				},
				error:function(data) {
				console.log(data.msg);
				}
		 	});
		
		})
		

 		function selResourceSign(obj){
 			var isSelected = $(obj).parent().attr('selectType');
 			if(isSelected == '0'){
 				resourceSignSel(obj);
 			}else if(isSelected == '1'){
 				resourceSignRemove(obj);
 			}
 		}
 		
 		//挑选资源标签
 		function resourceSignSel(obj){
 			var sign = $(obj).html();
 			var content = $('#fileTag').val();
 			if(content.length==0){
 				content = sign;
 			}else if(content.indexOf(' ')!=-1){
 				content = content +" "+sign;
 			}/*else if(content.indexOf(',')!=-1||content.indexOf('，')!=-1){
 				content = content+','+sign;
 			}*/else{
 				content = content+' '+sign;
 			}
 			/* $(obj).parent().css({'border':'1px solid red','color':'red'}).attr('selectType','1'); */
 			$("#fileTag").val(content);
 			$("#fileTag").focus().val(content);
 		}
 		
 		function resourceSignRemove(obj){
 			/* $(obj).parent().css({'border':'1px solid #ccc','color':'999'}); */
 			/* layer.msg('您已选择了该标签!',{time: 2000}); */
 		}
	
	
	
		//在JavaScript数组原型定义 去重方法
		Array.prototype.unique = function(){
			 var res = [];
			 var json = {};
			 for(var i = 0; i < this.length; i++){
			  if(!json[this[i]]){
			    res.push(this[i]);
			    json[this[i]] = 1;
			  }
			}
			return res;
		}
		
		
		
		
		var flag = true;
		var data = new Array();
		var resourceIds = '${ids}';
		if(resourceIds != ""){
			var ids = resourceIds.split(",");
			for(var i=0; i<ids.length; i++){
				$("input[name='resourcesCheckbox'][ids='"+ids[i]+"']").prop("checked",true);
				$("input[name='resourcesCheckbox'][ids='"+ids[i]+"']").parents("tr").addClass("checked");
				data.push(ids[i]);
			}
		}
			
		$("input[name=resourcesCheckbox]").change(function(){
			var id = $(this).attr("ids");
			if($(this).prop("checked")){
				data.push(id);
				$(this).parents("tr").addClass("checked");
			}else{
				for(var i=0;i<data.length;i++){
					if(data[i]==id){
						data.splice(i,1);
					}
				}
				$(this).parents("tr").removeClass("checked");
			}
		}); 
		
		
		$("input[name=collectCheckbox]").change(function(){
			var id = $(this).attr("ids");
			if($(this).prop("checked")){
				data.push(id);
				$(this).parents("tr").addClass("checked");
			}else{
				for(var i=0;i<data.length;i++){
					if(data[i]==id){
						data.splice(i,1);
					}
				}
				$(this).parents("tr").removeClass("checked");
			}
		}) 
		//删除资源
		function DelectResources(id){
			layer.confirm('确认要删除吗？删除将不可恢复！',{title:'删除该资源'},function(index) {
			  $.ajax({
			        type:'GET',
			        dataType:'json',
			        url:ctx+'/experimentFileController/DelectResources/'+id,
			        success: function(sysresult){
			            if(sysresult.status==200){
			            	layer.msg('删除资源成功!!',{icon:1,time:1500},function(){
								location.replace(location.href);
							});
			            }else{
			                layer.msg(sysresult.msg,{icon:2,time:1500});
			            }
			        },
			        error: function(data){
			            console.log(data)
			        }
			    })
			});
		};
		
		
		//预览
		function previewResources(id){
			var index = layer.open({
				type : 2,
				content : '${ctx }/page/admin/experiment_manage/resources_preview.html?id='+id,
				area : ['600px','450px'],
				resize : true,
				maxmin:true,
				title: '资源预览'
			})
			layer.full(index);
		};
			
		$("#exitPage").click(function(){
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		})
		
		var resourcestablenum = 0;
		$(".nav li").each(function(index){
			$(".nav li").eq(index).click(function(){
				$(this).addClass('selected');
				$(".resourcestable li").eq(index).show();
				$(this).siblings().removeClass('selected');
				$(".resourcestable li").eq(index).siblings('li').hide();
				
				if(index == 0){
					$('.btnGroup').hide();
				}else{
					$('.btnGroup').show();
				}
				
				resourcestablenum=index;
			})
		});
		$("#postData").click(function(){
			if(resourcestablenum==3){
				var fileTitle=$("input[name='fileTitle']").val()
				if(fileTitle=='' || fileTitle==null){
			  		layer.msg('资源标题不能为空!',{icon:2,time:2000});
			  		return false;
				}
			}
			
			var fileTitle=$("input[name='fileTitle']").val()
			$("input[name='resourceFileIds']").val(data+"");
			document.getElementById("searchForm").submit();					
		});
		
		
		/*点击获取实验报告ID，封装进隐藏域之中*/
		function setInstructor(url,id){
			if('${instructorId}'!=''&&id!='${instructorId}'){
				layer.msg('该实验下已经有实验指导书',{icon:2,time:1500});
				return;
			}
			$("input[name='instructorId']").val(id);
			$.ajax({
			 	type: 'POST',
			 	url: url,
			 	dataType: 'json',
			 	 data: {
					 'fileId':id
				 },
			 	success: function(data){
			 		if(data.status==200){
				 		layer.msg('OK!',{icon:1,time:1500});
				 		setTimeout('window.location.reload()',2500);
			 		}else{
				 		layer.msg(data.msg,{icon:2,time:2000});
			 		}
			 	},
			 	error:function(data) {
			 		layer.msg('设置失败，服务器错误',{icon:2,time:2000});
			 	},
			 });
		};
		//下载文件
		function downLoad(id){
		    //判断该文件是否存在
		    $.ajax({
		        type:'GET',
		        dataType:'json',
		        url:ctx+'/experimentFileController/fileExistsById/'+id,
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
		
		
		/*设置实验标准答案以及展现方式*/
		function updateExperimentAnswerAndWayStatus(fileId,fileType){
			//若是设置标准答案，设置标准答案展现状态
			if(updateExperimentAnswer(fileId,fileType)){
				if(fileType==5){
					setTimeout(
						function(){
							layer.confirm('<span style="font-size:20px;">标准答案的展现方式是?</span>', {
								 area:['498px','auto'],
								  title:'设置标准答案展现方式',
								  btn: ['直接展现','提交后展现','批改后展现','实验结束时展现'] //按钮
								  ,btn3: function(index, layero){
									    //按钮【按钮三】的回调
										updateExperimentShowType(1);
									  }
									,btn4: function(index, layero){
									    //按钮【按钮三】的回调
										updateExperimentShowType(0);
									  }
								},function(){//直接展现 3 
										updateExperimentShowType(3);
								},function(){//提交后展现 2
									updateExperimentShowType(2);
								}
							);
						}
					, 1600);
			   }else{
				   setTimeout('window.location.reload()',2000);
			   }
			}
		}
		/*设置实验标准答案*/
		function updateExperimentAnswer(fileId,fileType){
			var  blf = null; 
			$.ajax({
				 	type: 'POST',
				 	url: '${ctx}/experimentFileController/updateExperimentFileType/${experiment.experimentId}',
				 	dataType: 'json',
				 	async:false,
				 	 data: {
						 'fileType':fileType,
						 'fileId':fileId
					 },
				 	success: function(data){
				 		if(data.status==200){
				 			layer.msg('ok',{icon:1,time:1500});
				 			blf = true;
				 		}else{
							layer.msg(data.msg,{icon:2,time:2000});
							blf = false;
				 		}
				 	},
				 	error:function(data) {
				 		layer.msg('设置失败，服务器错误',{icon:2,time:2000});
				 	},
				 });
			 return blf;
		}
		//修改实验标准答案展现状态
		function updateExperimentShowType(showType){
			$.ajax({
			 	type: 'POST',
			 	url: '${ctx}/experimentController/updateExperimentAnswerShowWay',
			 	dataType: 'json',
			 	 data: {
					 'experimentId':'${experiment.experimentId}',
					 'answerShowWay':showType
				 },
			 	success: function(data){
			 		if(data.status==200){
				 		layer.msg('答案展现状态设置完毕',{icon:1,time:1500});
				 		setTimeout('window.location.reload()',2000);
			 		}else{
				 		layer.msg("展现状态设置出错:"+data.msg,{icon:2,time:1500});
				 		setTimeout('window.location.reload()',2000);

			 		}
			 	}
			 });
		}
		function plusFile(obj){
			var $obj = $(obj);
			var name = $obj.siblings('input').attr('name');
			var content = '<li class="pd-20 pdt-5 pdb-5 mrb-5"><input type="file" name ="'+name+'"/><span class="plus experimentFont fc-green experimentFont" onclick="plusFile(this);">&#xe608;</span><span class="subtract experimentFont fc-red" onclick="subtractFile(this);">&#xe627;</span></li>';
			$obj.parents('.fileuploadPart').append(content);
		}

		function subtractFile(obj){
			var $obj = $(obj);
			$obj.parent('li').remove();
		}
		//
		
		$(function(){
			$(".my_resources_table").dataTable({
				"aaSorting" : [ [ 0, "desc" ] ],//默认第几个排序
				"stripeClasses": [ 'strip1', 'strip2'],
				"orderClasses": false,
				"bStateSave" : false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[0,1,2,3,7]}// 制定列不参与排序
				]
			});
			$(".collect_resources_table").dataTable({
				"aaSorting" : [ [ 0, "desc" ] ],//默认第几个排序
				"stripeClasses": [ 'strip1', 'strip2'],
				"orderClasses": false,
				"bStateSave" : false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[0,1,2,3,8]}// 制定列不参与排序
				]
			});
			
			$(".isSelected_resources_table").dataTable({
				"stripeClasses": [ 'strip1', 'strip2'],
				"orderClasses": false,
				"bStateSave" : false,//状态保存
				"aoColumnDefs": [
				  {"orderable":false,"aTargets":[0,1,6]}// 制定列不参与排序
				]
			});
		});
</script>
</html>