<%-- <%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
</head>
<body>
	<form action="${ctx }/courseController/insertCourseClassByCourseId/${courseId}" method="post" id="form-classManage-add">
		<table>
			<c:forEach items="${departmentList }" var="d">
				<tr>
					<td>${d.name }:</td>
					<td>
						<table>
							<c:forEach items="${d.majorList }" var="m">
								<tr>
									<td>${m.name }:</td>
									<td>
										<table>
											<c:forEach items="${m.gradeList }" var="g">
												<tr>
													<td>${g.name }:</td>
													<td>
														<table>
															<c:forEach items="${g.tbClassList }" var="t">
																<tr>
																	<td>
																		<c:choose>
																			<c:when test="${t.isSelect==1 }"><input type="checkbox" name="tbClassIds" value="${t.id }" checked="checked"><spen>${t.name }</spen></br></c:when>
																			<c:otherwise><input type="checkbox" name="tbClassIds" value="${t.id }"><spen>${t.name }</spen></br></c:otherwise>
																		</c:choose>
																	</td>
																</tr>
															</c:forEach>
														</table>
													</td>
												</tr>
											</c:forEach>
										</table>
									</td>
								</tr>
							</c:forEach>
						</table>
					</td>
				</tr>
			</c:forEach>
		</table>
		<div class="col-xs-8 col-sm-9 col-xs-offset-4 col-sm-offset-2 text-c">
			<button onClick="" class="btn btn-primary radius" type="" id="classManage-add-sub">
			<i class="Hui-iconfont">&#xe600;</i>
			 添加</button>
		</div>
	</form>
</body>
<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
$(function(){
	$(".selectStuNum").hide();
	
	$("#form-classManage-add").Validform({
		btnSubmit:"#classManage-add-sub", 
		tiptype:2, 
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:true,
		postonce:true,
		ajaxPost:true,
		datatype:{
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"n-en" : /[0-9a-zA-Z]{1,23}/,
			"ch"   : /[\u4E00-\u9FA5]+$/
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		},
		callback:function(data){
			console.log(data)
			if(data.status=="200"){
				layer.msg(data.data,{icon:1,time:1500});
				setTimeout('window.parent.location.reload()',1800);
			}else{
				layer.msg(data.data,{icon:1,time:1500});
				setTimeout('window.parent.location.reload()',1800);
				
				// window.location.reload(); 
			}
		}
	});
})
</script>
</html> --%>