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
</head>
<body>
<%--临时参数，判断是否有实验指导书 0无  1有  --%>
<c:set var="isInstructor" value="0"/>
<%--临时参数，判断是否有实验标准答案 0无 1有--%>
<c:set var="standardAnswer" value="0"/>
	<div class="addResourcesContain">
		 <p class="p1">为 实验《<span class="span1">${experiment.experimentName }</span>》挑选资源
		 <span class="span2">【实验类型:
		  <c:choose>
				<c:when test="${experiment.experimentType==1 }">
					设计实验
				</c:when>
				<c:when test="${experiment.experimentType==2 }">
					参考实验
				</c:when>
			</c:choose> 
		 】</span></p>
		<ul class="nav clearfix">
			<li class="selected">我的资源</li>
			<li>收藏的资源</li>
			<li>没想要的？上传你的资源</li> 
		</ul>
		<form action="${ctx }/experimentFileController/distributeFilesToVisitExperiment/${vcoocUserId}/${experiment.experimentId}" method="POST" enctype="multipart/form-data" id="searchForm">
			<ul class="resourcestable">
				<li class="resourcestable_checked">
					<table class="table resources_table my_resources_table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr>
								<th class="text-c" width="40">全选<input type="checkbox" onchange="checkOrUncheckC(this)"></th>
						    	<th class="text-c" width="80">资源名称</th>
								<th class="text-c" width="80">资源标题</th>
								<!-- <th class="text-c" width="50">关键字</th> -->
								<!-- <th class="text-c" width="75">所属库</th> -->
								<th class="text-c" width="40">文件格式</th>
								<!-- <th class="text-c" width="70">文件类型</th> -->
								<th class="text-c" width="75">上传时间</th>
								<th class="text-c" width="30">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
							<c:forEach items="${myFileList }" var="m">
							<tr <c:if test="${m.isSelected==1 }">class="checked"</c:if> >
									<td class="text-c tdClick"><c:if test="${m.isSelected==1 }">&nbsp;</c:if><label><input type="checkbox" name="resourcesCheckbox" ids="${m.fileId }" <c:if test="${m.isSelected==1 }">checked="checked"</c:if>></label></td>
								    <td class="text-c"><span>${m.fileName}</span></td>
									<td class="text-c"><span class="resourcesContain" onclick="previewResources(this);">${m.fileTitle }</span></td>
									<%-- <td class="text-c"><span class="resourcesKeyWords">${m.fileTag }</span></td> --%>
								<%-- 	<td class="text-c"><span class="">
										<c:choose>
											<c:when test="${empty m.resourceLibrary.libraryName }">其他资源库</c:when>
											<c:otherwise>${m.resourceLibrary.libraryName }</c:otherwise>
										</c:choose>
									</span>
									</td> --%>
									<td class="text-c"><span class="">${m.fileType }</span></td>
								<%-- 	<td class="text-c"><span class="">
										<select name="isInstructor"  class="fileTypeSelect">
											<option value="0" class="default" <c:if test="${m.isInstructor==0 }">selected="selected"</c:if>>-请选择文件类型-</option>
											<option value="0/${m.fileId }"<c:if test="${m.isInstructor==0 }">selected="selected"</c:if>>-其他资源文件附件-</option>
											<option value="1/${m.fileId }"<c:if test="${m.isInstructor==1 }">selected="selected" <c:set var="isInstructor" value="1"/></c:if>>-实验指导书-</option>
											<option value="2/${m.fileId }"<c:if test="${m.isInstructor==2 }">selected="selected"</c:if>>-GIF结果动态图-</option>
											<option value="3/${m.fileId }"<c:if test="${m.isInstructor==3 }">selected="selected"</c:if>>-实验工程文件-</option>
											<option value="4/${m.fileId }"<c:if test="${m.isInstructor==4 }">selected="selected"</c:if>>-实验报告-</option>
											<option value="5/${m.fileId }"<c:if test="${m.isInstructor==5 }">selected="selected" <c:set var="standardAnswer" value="1"/></c:if>>-标准答案-</option>
										</select>
									</td> --%>
									<td class="text-c"><span class="">${m.createTimeToString }</span></td>
									<td class="text-c">
										<i class="experimentFont" onclick="previewResources(this);" title="预览资源文件" style="cursor:pointer;">&#xe64e;</i>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</li>
				<li class="resourcestable_uncheck hide">
					<table class="table resources_table collect_resources_table table-border table-bordered table-bg table-sort table-hover">
						<thead>
							<tr>
								<th class="text-c" width="40">全选<input type="checkbox" onchange="checkOrUncheckC(this)"></th>
								<th class="text-c" width="80">资源名称</th>
								<th class="text-c" width="80">资源标题</th>
								<th class="text-c" width="50">作者</th>
								<!-- <th class="text-c" width="50">关键字</th> -->
								<!-- <th class="text-c" width="60">所属库</th> -->
								<th class="text-c" width="30">文件格式</th>
								<!-- <th class="text-c" width="20">文件类型</th> -->
								<th class="text-c" width="80">上传时间</th>
								<th class="text-c" width="20">操作</th>
							</tr>
						</thead>
						<tbody class="tbody">
							<c:forEach items="${collectedFileList }" var="c">
								<tr <c:if test="${c.isSelected==1 }">class="checked"</c:if> >
									<td class="text-c tdClick"><c:if test="${c.isSelected==1 }">&nbsp;</c:if><label><i></i><input type="checkbox" name="collectCheckbox" ids="${c.fileId }" <c:if test="${c.isSelected==1 }">checked="checked"</c:if>></label></td>
									<td class="text-c"><span>${c.fileName}</span></td>
									<td class="text-c"><span class="resourcesContain" onclick="previewResources(this);">${c.fileTitle }</span></td>
									<td class="text-c"><span class="resourcesAuthor">${c.author.name }</span></td>
									<%-- <td class="text-c"><span class="resourcesKeyWords">${c.fileTag }</span></td> --%>
									<%--<td class="text-c"><span class="">
								 	<c:choose>
										<c:when test="${empty c.resourceLibrary.libraryName }">其他资源库</c:when>
										<c:otherwise>${c.resourceLibrary.libraryName }</c:otherwise>
									</c:choose> 
									</span>
									</td>--%>
									<td class="text-c"><span class="">${c.fileType }</span></td>
								<%-- 	<td class="text-c"><span class="">
										<select name="isInstructor"  class="fileTypeSelect">
											<option value="0" class="default" <c:if test="${c.isInstructor==0 }">selected="selected"</c:if>>-请选择文件类型-</option>
											<option value="0/${c.fileId }"<c:if test="${c.isInstructor==0 }">selected="selected"</c:if>>-其他资源文件附件-</option>
											<option value="1/${c.fileId }"<c:if test="${c.isInstructor==1 }">selected="selected" <c:set var="isInstructor" value="1"/></c:if>>-实验指导书-</option>
											<option value="2/${c.fileId }"<c:if test="${c.isInstructor==2 }">selected="selected"</c:if>>-GIF结果动态图-</option>
											<option value="3/${c.fileId }"<c:if test="${c.isInstructor==3 }">selected="selected"</c:if>>-实验工程文件-</option>
											<option value="4/${c.fileId }"<c:if test="${c.isInstructor==4 }">selected="selected"</c:if>>-实验报告-</option>
											<option value="5/${c.fileId }"<c:if test="${c.isInstructor==5 }">selected="selected" <c:set var="standardAnswer" value="1"/></c:if>>-标准答案-</option>
										</select>
									</td> --%>
									<td class="text-c"><span class="">${c.createTimeToString }</span></td>
									<td class="text-c">
										<a herf="javascript:void(0);"><i class="experimentFont" onclick="previewResources(this);" title="预览资源文件" >&#xe64e;</i></a>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</li>
				 <li class="resourcestable_uncheck hide clearfix">
				 	<div class="form">
					  	<div class="row cl">
						   	<label class="col-xs-2 col-sm-2 pn-0 text-r">资源标题：</label>
						    <div class="col-xs-9 col-sm-9">
						    	<input type="text"  name="fileTitle" class="input-text">
						    </div>
						</div>
					<%-- 	<div  class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">所属资源库：</label>
							<div class="col-xs-9 col-sm-9">
								<select name="libraryId" class="select select-box">
									<c:forEach items="${resourceLibraries }" var="rl">
										<option value="${rl.libraryId }">${rl.libraryName }</option>
									</c:forEach>
								</select>
							</div>
						</div> --%>
				 	<%-- 	<div  class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传实验指导书：</label>
							<div class="col-xs-9 col-sm-9">
								<c:choose>
									<c:when test="${isInstructor==1}">	
										<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="instructorFiles" type="file" class="fc-white"  disabled="disabled"/><span class="file-upload-tip">提示:该实验下已经有实验指导书</span></p></div>
									</c:when>
									<c:otherwise>
										<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="instructorFiles" type="file" class="fc-white"/></p></div>
									</c:otherwise>
								</c:choose>
							</div>
						</div> --%>
					<!-- 	<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传GIF动态图: </label>
							<div class="col-xs-9 col-sm-9">
								<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="gifFiles" type="file" class="fc-white"/></p></div>
							</div>
						</div> -->
					<!-- 	<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传工程文件: </label>
							<div class="col-xs-9 col-sm-9">
								<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="projetFiles" type="file" class="fc-white"/></p></div>
							</div>
						</div> -->
				<!-- 		<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传实验报告模板: </label>
							<div class="col-xs-9 col-sm-9">
								<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="experimentReport" type="file" class="fc-white"/></p></div>
							</div>
						</div> -->
					<%-- 	<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传实验标准答案: </label>
							<div class="col-xs-9 col-sm-9">
								<c:choose>
									<c:when test="${standardAnswer==1}">	
										<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="standardAnswer" type="file" class="fc-white" disabled="disabled"/><span class="file-upload-tip">提示:该实验下已经有实验标准答案</span></p></div>
									</c:when>
									<c:otherwise>
										<div class="pd-20" style="border: 1px solid #ddd;background: #759598;"><p class="" style="border: 1px dashed #ccc;padding:5px 20px;margin:0;"><input name="standardAnswer" type="file" class="fc-white"/></p></div>
									</c:otherwise>
								</c:choose>
							</div>
						</div> --%>
						<div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">上传其他资源: </label>
							<div class="col-xs-9 col-sm-9">
								<ul class="fileuploadPart pd-20">
									<li class="pd-20 pdt-5 pdb-5 mrb-5"><input type="file" name ="otherFiles"/><span class="plus experimentFont fc-green" onclick="plusFile(this);">&#xe608;</span></li>
								</ul>
							</div>
						</div>
						<div class="row cl">
						     <label class="col-xs-2 col-sm-2 pn-0 text-r">资源介绍：</label>
						     <div class="col-xs-9 col-sm-9">	
						     	<textarea rows="" cols="" name="filePresentation" class="textarea" onKeyUp="$.Huitextarealength(this,500)"></textarea>
						     	<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
						     </div>
						</div>
					<%-- 	<div class="row cl">
						   	<label class="col-xs-2 col-sm-2 pn-0 text-r">资源标签：</label>
						    <div class="col-xs-9 col-sm-9">
						    	<input type="text" id="fileTag" name="fileTag" class="input-text" value="${experiment.experimentName}">
						        <p style="clear: both;margin: 0;"><span style="color:red;pr-10">*</span><span style="color:blue;">不同标签请用空格或者逗号隔开多个标签字符</span></p>
						    </div>
						   <button type="button" onclick="addLabel()" style="top:0;right: 175px;height: 30px;">保存标签</button>
						</div> --%>
						<div class="row cl resourceSign">
							<label class="form-label col-xs-2 col-sm-2 col-md-2 text-r"></label>
								<div class="formControls col-xs-9 col-sm-9 col-md-9 resourceSignBox cl">
						
					            </div>
			            </div>
			            <!-- <div class="row cl">
							<label class="col-xs-2 col-sm-2 pn-0 text-r">是否允许下载：</label>
							<div class="col-xs-9 col-sm-9">
								<input type="radio" value="1" name="isDownload" checked>是
								<input type="radio" value="2" name="isDownload">否  
							</div>
					   	</div> -->
					</div>
				</li> 
			</ul>
			<input name="resourceFileIds" type="hidden" value=""/>
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
</body>
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

<script id="javascript_datatable" type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
/*判断提交结果*/
	if('${status}' =='200'){
		layer.msg('分配成功!',{icon:1,time:1500});
		setTimeout('window.parent.location.reload()',1800);
	}else if('${status}' =='202'){
		layer.msg("${msg}",{icon:2,time:1500});
		setTimeout('window.location',1800);
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
			$("input[name='resourcesCheckbox'][ids='"+ids[i]+"']").attr("checked","checked");
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
	}) 
	
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
	

	
	function previewResources(obj){
		var $id = $(obj).parent().siblings('.tdClick').children().children().attr("ids");
		var content = '';
		var index = layer.open({
			type : 2,
			content : '${ctx }/page/admin/experiment_manage/resources_preview.html?id='+$id,
			area : ['600px','550px'],
			maxmin: true,
			title: '资源预览'
		})
		layer.full(index);
	};
		
	$("#exitPage").click(function(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.layer.close(index);
	})
	var i;
	$(".nav li").each(function(index){
		$(".nav li").eq(index).click(function(){
			$(this).addClass('selected');
			$(".resourcestable li").eq(index).show();
			$(this).siblings().removeClass('selected');
			$(".resourcestable li").eq(index).siblings('li').hide();
			i=index;
		})
	});
		
	
	
	$("#postData").click(function(){
		if(i==2){
				var fileTitle=$("input[name='fileTitle']").val()
				if(fileTitle=='' || fileTitle==null){
			  		layer.msg('资源标题不能为空!',{icon:2,time:2000});
			  		return false;
				}
		}
		$("input[name='resourceFileIds']").val(data+"");
		document.getElementById("searchForm").submit();					
	});
	
	/*获取下拉框的值*/
/* 禁止下拉库框
	$('.fileTypeSelect').change(function(){
		var p1=$(this).children('option:selected').val();//这就是selected的值
		var obj = this;
		var p2 = p1.split("/");
		$.ajax({
		 	type: 'POST',
		 	url: '${ctx}/experimentFileController/updateExperimentFileType/${experiment.experimentId}',
		 	dataType: 'json',
		 	 data: {
				 'fileType':p2[0],
				 'fileId':p2[1]
			 },
		 	success: function(data){
		 		if(data.status==200){
			 		layer.msg('OK!',{icon:1,time:1500});
			 		setTimeout('window.location.reload()',1800);
		 		}else{
			 		layer.msg(data.msg,{icon:2,time:1500});
			 		$(obj).children('option:first').prop("selected", 'selected');
		 		}
		 	},
		 	error:function(data) {
		 	},
		 }); 
	}) */
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
	
	$(function(){
		$(".my_resources_table").dataTable({
			"aaSorting" : [ [ 0, "desc" ] ],//默认第几个排序
			"stripeClasses": [ 'strip1', 'strip2'],
			"orderClasses": false,
			"bStateSave" : false,//状态保存
			"aoColumnDefs": [
			  {"orderable":false,"aTargets":[1,5]}// 制定列不参与排序
			]
		});
		$(".collect_resources_table").dataTable({
			"aaSorting" : [ [ 0, "desc" ] ],//默认第几个排序
			"stripeClasses": [ 'strip1', 'strip2'],
			"orderClasses": false,
			"bStateSave" : false,//状态保存
			"aoColumnDefs": [
			  {"orderable":false,"aTargets":[1,5]}// 制定列不参与排序
			]
		});
	});
</script>
</html>