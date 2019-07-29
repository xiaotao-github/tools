<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD sHTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" /> -->
<!-- <meta name="viewport" content="initial-scale=0.28"/> -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/skin/laboratory/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
<style>
	.navbar-slogan{font-size:22px;}
</style>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室开放预约管理系统</title>
<style>
	/* @media screen and (max-width: 1160px){
		html,body{width: 1160px;}
	} */
	.inner{max-width: 1120px;margin: 0 auto;}
	.container-fluid{position: relative;}
	#Hui-userbar{right: 0;}
</style>

</head>
<body>
<div class="navbar-wrapper">
	<div class="navbar navbar-fixed-top">
		<div class="inner clearfix">
			<div class="container-fluid cl"> <a class="logo navbar-logo f-l mr-10 hidden-xs" href="#"><img src="${RESOURCE_WAY }/system_file/img/logo.png" style="width:60px;height:60px;"></a>
				<span class="logo navbar-slogan f-l mr-10 hidden-xs f-22">实验室开放预约管理系统</span> 
				<a aria-hidden="false" class="nav-toggle Hui-iconfont visible-xs" href="javascript:;">&#xe667;</a>
					<%-- <div class="nav navbar-nav">
					<ul class="cl">
						<li class="dropDown dropDown_hover"><a href="javascript:;" class="dropDown_A"><i class="Hui-iconfont">&#xe6ab;</i>切换子系统 <i class="Hui-iconfont">&#xe6d5;</i></a>
							<ul class="dropDown-menu menu radius box-shadow"  style="line-height:40px;line-height:43px/9;*line-height:40px;_line-height:40px;">
							<li class="dropDown dropDown_hover"><a href="${SSO_URL }/studentPage/index.html" onclick=""><i class="Hui-iconfont">&#xe616;</i> 平台主页</a></li>
								<li class="dropDown dropDown_hover"><a href="${CLASSROOM_URL }/page/web/index" onclick=""><i class="Hui-iconfont">&#xe616;</i> 教学中心</a></li>
								<li class="dropDown dropDown_hover"><a href="${EXAM_URL }/exam3/talk/ExaminationList.jspx" onclick=""><i class="Hui-iconfont">&#xe616;</i> 考试中心</a></li> 
								<li class="dropDown dropDown_hover"><a href="${DISCUSSION_URL}/page/studentInfo/index" onclick=""><i class="Hui-iconfont">&#xe616;</i> 交流中心</a></li>
								<li class="dropDown dropDown_hover"><a href="${RESOURCE_URL}/student/main" onclick=""><i class="Hui-iconfont">&#xe616;</i> 资源中心</a></li>
								<li class="dropDown dropDown_hover"><a href="${WEB_SITE_URL}/webController/main" onclick="" target="_target"><i class="Hui-iconfont">&#xe616;</i> 信息门户</a></li>
							
							</ul>
						</li>
					</ul>
				</div> --%>
				<div id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">
					<ul class="cl">
						<li>
							<c:choose>
								<c:when test="${empty studentInfo.imagePath }">
									<img src="${RESOURCE_WAY }/system_file/img/student_touxiang.jpg" alt="" class="avatar radius size-L mr-5">
								</c:when>
								<c:otherwise>
									<img src="${RESOURCE_WAY }/${studentInfo.imagePath}" alt="" class="avatar radius size-L mr-5">
								</c:otherwise>
							</c:choose>
						</li>
						<li class="dropDown dropDown_hover">
							<a href="#" class="dropDown_A">${studentInfo.name }
							<i class="Hui-iconfont">&#xe6d5;</i></a>
							<ul class="dropDown-menu menu radius box-shadow">
					 <li class="info">
                    	<a href="${SSO_URL }/studentController/studentInfoView">个人信息</a>
                	</li>
              		  <li class="info">
                	    <a href="${SSO_URL }/studentController/toStudentInfoEdit">修改信息</a>
              		  </li>
               		 <li class="info">
                		    <a href="${SSO_URL }/studentPage/studentPasswordEdit.html">修改密码</a>
              		  </li>
							<li><a href="javascript:void(0)" onclick="out()">退出</a></li>
						</ul>
					</li>
						<!-- <li id="Hui-msg"> <a href="#" title="消息"><span class="badge badge-danger">1</span><i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i></a> </li> -->
						<li id="Hui-skin" class="dropDown right dropDown_hover"> <a href="javascript:;" class="dropDown_A" title="换肤"><i class="Hui-iconfont" style="font-size:18px">&#xe62a;</i></a>
							<ul class="dropDown-menu menu radius box-shadow">
								<li><a href="javascript:;" data-val="black" title="黑色">黑色</a></li>
								<li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
								<li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>
								<li><a href="javascript:;" data-val="red" title="红色">红色</a></li>
								<li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>
								<li><a href="javascript:;" data-val="orange" title="橙色">橙色</a></li>
								<li><a href="javascript:;" data-val="purple" title="紫色">紫色</a></li>
								<li><a href="javascript:;" data-val="lightblue" title="浅蓝色">浅蓝色</a></li>
							<!-- 	<li><a href="javascript:;" data-val="learningOnline" title="教学中心">教学中心</a></li>
								<li><a href="javascript:;" data-val="blue-gray" title="行政中心">行政中心</a></li>
								<li><a href="javascript:;" data-val="experiment" title="实验中心">实验中心</a></li> -->
								<li><a href="javascript:;" data-val="laboratory" title="实验中心">智慧教学中心(默认)</a></li>
							<!-- 	<li><a href="javascript:;" data-val="communicateCenter" title="交流中心">交流中心</a></li>
								<li><a href="javascript:;" data-val="resourcesCenter" title="资源中心">资源中心</a></li> 
							-->
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="Hui-article-box">
	<div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
		<div class="inner clearfix">
		<div class="Hui-tabNav-wp">
			<ul id="min_title_list" class="acrossTab cl">
				<li class="active">
					<!-- 进行控制层跳转 -->
					<span title="我的桌面"  class="deskPage" data-href="${ctx}/studentController/toMainPage/${studentInfo.id}/${studentInfo.tbClassId}">平台主页</span>
					<em></em>
				</li>

			</ul>
		</div>
		<div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
		</div>
	</div>
	<div id="iframe_box" class="Hui-article">
		<div class="show_iframe" style="display: block;">
			<div style="display:none" class="loading"></div>
			<iframe src="${ctx}/studentController/toMainPage/${studentInfo.id}/${studentInfo.tbClassId}" scrolling="yes" frameborder="0" id="iframepage"></iframe>
		</div>
		
		
	</div>
</div>
	<div class="contextMenu" id="Huiadminmenu">
		<ul>
			<li id="closethis">关闭当前 </li>
			<li id="closeall">关闭全部 </li>
		</ul>
	</div> 
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/web_hui/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->
<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery.contextmenu/jquery.contextmenu.r2.js"></script>
<script type="text/javascript">
	$(function () {
	    //防止页面后退
	    history.pushState(null, null, document.URL);
	    window.addEventListener('popstate', function () {
	            history.pushState(null, null, document.URL);
	    });
	})


/*个人信息*/
function myselfinfo(){
	layer.open({
		type: 1,
		area: ['300px','200px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: '查看信息',
		content: '<div>管理员信息</div>'
	});
}

$(function(){
	$('.menu_dropdown dl li a').on('click',function(){
		$('.menu_dropdown dl li').removeClass('checked');
		$(this).parent().addClass('checked');
	})
})

	function out(){
		layer.confirm('确认要退出登录吗?',{title:'信息'},function(index){
			$.getJSON("${cookie.SSO_URL.value}/fbwisdomlabController/fbwisdomlablogOut?callback=?",function(sysresult){
				if(sysresult.status==200){
					 window.location.href="${cookie.SSO_URL.value}/page/lab";
		  		 	//console.log(window.location.href)
				}
			})
		});
	}
</script> 
</body>
</html>