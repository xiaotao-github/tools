<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>个人信息</title>
	<link rel="stylesheet" href="${ctx }/staticfile/css/student_reset.css">
	<link rel="stylesheet" href="${ctx }/staticfile/css/student_common.css">
	<link rel="stylesheet" href="${ctx }/staticfile/css/student_usermsgedit.css">
	<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
	<style>
	.changeSubmit{display:block;width:100px;height:40px;line-height:40px;text-align:center;font-size:18px;color:#FFF;background:#5b90af;margin:20px auto;cursor:pointer;}
	</style>
</head>


<body>
	<jsp:include page="./header.jsp"></jsp:include>
	<div class="userInfoViewContainer">
		<p class="contain-nav">
			<span><a href="${PEXPERIMENTOPEN}/page/student/index">系统首页</a>&nbsp;>>&nbsp;<a href="##">个人信息</a></span>
		</p>
		<div class="infoView-main clearfix">
			<p class="infoView-title">个人信息<a href="${ctx }/studentController/toStudentInfoEdit.html"><span><i></i>编辑</span></a></p>
			<div class="infoView-left">
				<div class="infoView-avatar">
					<c:if test="${studentInfo.imagePath =='' || studentInfo.imagePath eq null  }">
						<img src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg" alt="">
					</c:if>
					<c:if test="${studentInfo.imagePath !='' && studentInfo.imagePath != null   }">
						<img src="${cookie.RESOURCE_WAY.value}/${studentInfo.imagePath}" alt="">
					</c:if>
				</div>
				<div class="infoMsg-left">
				<p class="p clearfix">
						<span class="span1">学院:</span>
						<span class="span2">${studentInfo.tbClass.grade.major.department.name }</span>
					</p>
					<p class="p clearfix">
						<span class="span1">专业 :</span>
						<span class="span2">${studentInfo.tbClass.grade.major.name }</span>
					</p>
					<p class="p clearfix">
						<span class="span1">年级 :</span>
						<span class="span2">${studentInfo.tbClass.grade.name }</span>
					</p>
					<p class="p clearfix">
						<span class="span1">班级 :</span>
						<span class="span2">${studentInfo.tbClass.name }</span>
					</p>
					<p class="p clearfix">
						<span class="span1">学号 :</span>
						<span class="span2">${studentInfo.user.username }</span>
					</p>
					<p class="p clearfix">
						<span class="span1">积分 :</span>
						<span class="span2">
							<c:if test="${studentInfo.integral eq null}">0</c:if>
							<c:if test="${studentInfo.integral != null}">${studentInfo.integral}</c:if>
						</span>
					</p>
				</div>
			</div>
			<div class="infoView-right">
				<p class="p clearfix">
					<span class="span1">姓名 :</span>
					<span class="span2">${studentInfo.name }</span>
				</p>
				<p class="p clearfix">
					<span class="span1">性别 :</span>
					<span class="span2">
					<c:if test="${studentInfo.sex==1 }">男</c:if>
					<c:if test="${studentInfo.sex==2 }">女</c:if>
					</span>
				</p>
				<p class="p clearfix">
					<span class="span1">电话 :</span>
					<span class="span2">${studentInfo.phone }</span>
					<span class="span3 phone" >
					<c:if test="${studentInfo.phone eq null}">未绑定</c:if>
					<c:if test="${studentInfo.phone != null}">已绑定</c:if>
					&nbsp;|&nbsp;<a href="##">修改</a></span>
				</p>
				<p class="p clearfix">
					<span class="span1">QQ :</span>
					<span class="span2">${studentInfo.qqNum }</span>
					<span class="span3 qq">
					<c:if test="${studentInfo.qqNum eq null }">未绑定</c:if>
					<c:if test="${studentInfo.qqNum != null }">已绑定</c:if>
					&nbsp;|&nbsp;<a href="##">修改</a></span>
				</p>
				<p class="p clearfix">
					<span class="span1">邮箱 :</span>
					<span class="span2">${studentInfo.email }</span>
					<span class="span3 mail">
					<c:if test="${studentInfo.email eq null }">未绑定</c:if>
					<c:if test="${studentInfo.email != null }">已绑定</c:if>
					&nbsp;|&nbsp;<a href="##">修改</a></span>
				</p>
				<p class="p1 clearfix">
					<span class="span11">个人说明 :</span>
					<span class="span21">
						<c:if test="${st.studentPresentation eq null}">无</c:if>
						<c:if test="${st.studentPresentation != null}">${st.studentPresentation }</c:if>
					</span>
				</p>
			</div>
		</div>
	</div>	
	<jsp:include page="./footer.jsp"></jsp:include>
	<script type="text/javascript">
	
	function update(title,content){
		layer.open({
			type: 1,
			title:title,
			content: content,
			area: ['500px','300px']
		})
	}
	
	function change(obj,url){
		var changeData = obj.parent().find('input').val();
		var name = obj.parent().find('input').attr('name');
		changeData = $.trim(changeData);
		if(changeData == null ||changeData == ""){
			layer.msg("请输入修改的数据信息",{icon:2,time:2000});
			return;
		}
		if(name == 'phone'){
			$.ajax({
				type:'post',
				data:{'phone': changeData,
					'id':'${studentInfo.id}'	
				},
				dataType:'json',
				url:url,
				success:function(data){
					if(data.status == 200){
						layer.msg("修改成功",{icon:1,time:1500});
						setTimeout('window.location.reload();',1500);
					}else{
						layer.msg(data.msg,{icon:2,time:2000});
					}
				},
				error:function(data){
					layer.msg("连接失败",{icon:2,time:2000});
				}
			})
		}
		if(name == 'qqNum'){
			$.ajax({
				type:'post',
				data:{'qqNum': changeData,
					'id':'${studentInfo.id}'	
				},
				dataType:'json',
				url:url,
				success:function(data){
					if(data.status == 200){
						layer.msg("修改成功",{icon:1,time:1500});
						setTimeout('window.location.reload();',1500);
					}else{
						layer.msg(data.msg,{icon:2,time:2000});
					}
				},
				error:function(data){
					layer.msg("连接失败",{icon:2,time:2000});
				}
			})
		}
		if(name == 'email'){
			$.ajax({
				type:'post',
				data:{'email': changeData,
					'id':'${studentInfo.id}'	
				},
				dataType:'json',
				url:url,
				success:function(data){
					if(data.status == 200){
						layer.msg("修改成功",{icon:1,time:1500});
						setTimeout('window.location.reload();',1500);
					}else{
						layer.msg(data.msg,{icon:2,time:2000});
					}
				},
				error:function(data){
					layer.msg("连接失败",{icon:2,time:2000});
				}
			})
		}
	
	}
	
	$(".span3.phone").off().on('click',function(){
		var title = '修改电话',
			content = '<div style="width:300px;margin: 0 auto;padding:20px;"><span>电话： </span><input type="text" name="phone" style="" class="phoneChangeInput"><p class="changeSubmit" onclick="changeSubmit(this);">提交</p></div>';
		update(title,content);
	});
	$(".span3.qq").off().on('click',function(){
		var title = '修改QQ',
			content = '<div style="width:300px;margin: 0 auto;padding:20px;"><span>QQ： </span><input type="text" name="qqNum" style="" class="phoneChangeInput"><p class="changeSubmit" onclick="changeSubmit(this);">提交</p></div>';
		update(title,content);
	});
	$(".span3.mail").off().on('click',function(){
		var title = '修改邮箱',
			content = '<div style="width:300px;margin: 0 auto;padding:20px;"><span>邮箱： </span><input type="text" name="email" style="" class="phoneChangeInput"><p class="changeSubmit" onclick="changeSubmit(this);">提交</p></div>';
		update(title,content);
	});
	
	
		function changeSubmit(obj){
		var obj = $(obj);
		console.log(obj.parent().find('span').html());
		var url = '${ctx}/studentController/updateStudentInfoById';
		change(obj,url);
	}; 
	
	
	</script>
</body>
</html>
	