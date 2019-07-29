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
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/laboratory/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">

<style>
	.menu-third{
		color: #FFF;
	}

	.menu-third menu{
		display: none;
	}
	
	.menu-third menu li a{
		font-size: 12px;
	}
	
	.menu-third-title{
		margin:0;
		cursor:pointer;
		text-indent: 2em;
		position:relative;
	}
	
	.menu-third-title i{
		position:absolute;
		right:30px;
	}
	menu li a {
		position:relative;
	}
	menu li .menu-third-selected {
		border-left:6px solid #2284d4;
		padding-left:36px;
	}
	menu li .menu-third-selected:before{
		position:absolute;
		right:0px;
		top:7px;
		width:0px;
		height:0px;
		content:" ";
		border-bottom: 10px solid  transparent ;
        border-top: 10px solid transparent ;
        border-right: 8px solid #fff ;
	}
</style>

<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室开放预约管理系统</title>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript">
var ctx = "${ctx}";
	 //直接定死，后面再进行改成不要这个
	 var identify= 2;
	var cookieName="systemIdentify";
	 //设置cookie
	setIndetifyCookie(cookieName,identify);
		
	//1.虚拟仿真 2.开放预约
	
	//设置cookie值
	function setIndetifyCookie(name,identify,exDay){
		 var d = new Date();
		 document.cookie =  name+ "=" + identify +";path=/";
	}
     $(function(){
    	 $('.deskPage').attr('src',ctx+'/page/toMainPage/'+'/${cookie.vcoocUserId.value}');

     }) 
</script>
</head>
<body>
<div class="navbar-wrapper">
	<div class="navbar navbar-fixed-top">
		<div class="container-fluid cl">
		<a class="logo navbar-logo f-l mr-10 hidden-xs" href="#"><img src="${cookie.RESOURCE_WAY.value }/system_file/img/logo.png" alt="logo" ></a>
		  
		    <a class="logo navbar-logo-m f-l mr-10 visible-xs" href="">实验室开放与预约管理系统</a> 
			<span class="logo navbar-slogan f-l mr-10 hidden-xs">实验室开放与预约管理系统</span> 

			<a aria-hidden="false" class="nav-toggle Hui-iconfont visible-xs" href="javascript:;">&#xe667;</a>
			<div class="nav navbar-nav">
				<ul class="cl">
					<li class="dropDown dropDown_hover"><a href="javascript:;" class="dropDown_A"><i class="Hui-iconfont">&#xe6ab;</i> 切换子系统 <i class="Hui-iconfont">&#xe6d5;</i></a>
						<ul class="dropDown-menu menu radius box-shadow" style="line-height:40px;line-height:43px/9;*line-height:40px;_line-height:40px;">
						<%-- <li><a href="${SSO_URL }/adminPage/index.html" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 平台主页</a></li> --%>
							<li><a href="${MANAGE_URL}/page/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 行政中心</a></li>
							<%-- <li><a href="${CLASSROOM_URL }/page/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 教学中心</a></li> --%>
					
							<%-- 	
							<li><a href="${VS_EXPERIMENT}/page/admin/index?identify=1" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 虚拟实验</a></li>
							 <li><a href="${PEXPERIMENTOPEN}/page/admin/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 实验系统</a></li> 
							<li><a href="${EXAM_URL }/exam3/AdminLogin.jspx" onclick="" target="_target"><i class="Hui-iconfont pr-10">&#xe616;</i> 考试中心</a></li> 
							<li><a href="${RESOURCE_URL}/page/main/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 资源中心</a></li> 
							--%>
							<li><a href="${DISCUSSION_URL}/page/teacherInfo/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 交流中心</a></li>
							
							<%-- <li><a href="${TEACHER_SPACE_URL}/page/admin/index" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 协同学习</a></li>  
							<shiro:hasPermission name="信息门户管理">
								<li><a href="${WEB_SITE_URL}/backstageController/main" onclick=""><i class="Hui-iconfont pr-10">&#xe616;</i> 信息门户</a></li>
							</shiro:hasPermission> 
							<shiro:lacksPermission name="信息门户管理">
								<li><a href="${WEB_SITE_URL}/webController/main" onclick="" target="_target"><i class="Hui-iconfont pr-10">&#xe616;</i> 信息门户</a></li>
							</shiro:lacksPermission> --%>
						</ul>
					</li>
				</ul>
			</div>
			<div id="Hui-userbar" class="nav navbar-nav navbar-userbar hidden-xs">
				<ul class="cl">
					<li>
						<img id="userImg" src="" alt="请上传头像" class="avatar radius size-L mr-5"/>
					</li>
					<li id="userRole"></li>
					<li class="dropDown dropDown_hover">
						<a href="#" class="dropDown_A" id="userName"><i class="Hui-iconfont">&#xe6d5;</i></a>
						<ul class="dropDown-menu menu radius box-shadow">
						 	<li><a href="${SSO_URL }/teacherController/tomyselfInfoRevise">修改信息</a></li>
						 	<li><a href="${SSO_URL }/adminPage/passwordRevise">修改密码</a></li>
						    <li><a href="javascript:void(0)" onclick="out()">退出</a></li>
						</ul>
					</li>
					<li id="Hui-msg"> <a href="${cookie.DISCUSSION_URL.value}/invitationController/selectNotReplyInvitations" title="消息"><span class="badge badge-danger"></span><i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i></a> </li>
					<li id="Hui-skin" class="dropDown right dropDown_hover"> <a href="javascript:;" class="dropDown_A" title="换肤"><i class="iconfont icon-huanfu1"></i></a>
						<ul class="dropDown-menu menu radius box-shadow">
							<li><a href="javascript:;" data-val="black" title="黑色">黑色</a></li>
							<li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
							<li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>
							<li><a href="javascript:;" data-val="red" title="红色">红色</a></li>
							<li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>
							<li><a href="javascript:;" data-val="orange" title="橙色">橙色</a></li>
							<li><a href="javascript:;" data-val="purple" title="紫色">紫色</a></li>
							<li><a href="javascript:;" data-val="lightblue" title="浅蓝色">浅蓝色</a></li>
							<!-- <li><a href="javascript:;" data-val="learningOnline" title="教学中心">教学中心</a></li> -->
							<li><a href="javascript:;" data-val="blue-gray" title="行政中心 ">行政中心</a></li>
							<!-- <li><a href="javascript:;" data-val="experiment" title="实验中心">实验中心</a></li> -->
							<li><a href="javascript:;" data-val="laboratory" title="实验中心">开放与预约管理系统(默认)</a></li>
							<li><a href="javascript:;" data-val="communicateCenter" title="交流中心">交流中心</a></li>
							<!-- <li><a href="javascript:;" data-val="resourcesCenter" title="资源中心">资源中心</a></li> -->
						</ul>
					</li>
				</ul>
			</div>
	</div>
</div>
</div>
<div class="Hui-aside">
	<div style="height: 35px;line-height:35px; background:#2c2f2f;color:#fff;font-size:16px;letter-spacing:5px;padding-left:15px;"><i class="iconfont icon-git45"></i>&nbsp;目录</div>
	<div class="menu_dropdown bk_2">
	 <shiro:hasPermission name="开放与预约学期管理"> 
		<dl id="menu-article">
			<dt><i class="experimentFont pr-10">&#xe606;</i>学期管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<li><a data-href="${ctx }/semesterController/selectSemesters" data-title="学期管理" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>学期管理</a></li>
				</ul>
			</dd>
		</dl>
		</shiro:hasPermission>
	<shiro:hasPermission name="实验室管理">	
		<dl id="menu-article">
				<dt><i class="experimentFont pr-10">&#xe6d7;</i>实验室管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
				<dd>
					<ul>
						
						<li><a data-href="${ctx }/labClockInManageController/machineList/1" data-title="考勤机管理" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>考勤机管理</a></li>
						
						<shiro:hasPermission name="所有实验室管理">
							<li><a data-href="${ctx }/experimentLabController/experimentLabList/1" data-title="所有实验室" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>所有实验室</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="院系实验室管理">
							<li><a data-href="${ctx }/experimentLabController/experimentLabList/2" data-title="院系实验室" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>院系实验室</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="个人实验室管理">
							<li><a data-href="${ctx }/experimentLabController/experimentLabList/3" data-title="我的实验室" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>我的实验室</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="实验室黑名单管理(通用)">
						<li><a data-href="${ctx }/lab/black/list" data-title="实验室黑名单管理" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>实验室黑名单管理</a></li>
						</shiro:hasPermission>
					</ul>
				</dd>
	
		</dl>
		</shiro:hasPermission>
	
		<shiro:hasPermission name="开放与预约课程管理">
		<dl id="menu-article">
			<dt><i class="experimentFont pr-10">&#xe617;</i>课程管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
			<dd>
				<ul>
					<shiro:hasPermission name="所有开放与预约课程">
						<li><a data-href="${ctx}/experimentCourseController/selectExperimentCoursesToPage/1" data-title="所有课程" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>所有课程</a></li>
					</shiro:hasPermission>
					<shiro:hasPermission name="院系开放与预约课程">
						<li><a data-href="${ctx}/experimentCourseController/selectExperimentCoursesToPage/2" data-title="院系课程" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>院系课程</a></li>
					</shiro:hasPermission>
					<shiro:hasPermission name="个人开放与预约课程">
							<li><a data-href="${ctx}/experimentCourseController/selectExperimentCoursesToPage/3" data-title="我的课程" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>我的课程</a></li>
					</shiro:hasPermission>
				</ul>
			</dd>
		</dl>
	</shiro:hasPermission>
		
		<shiro:hasPermission name="实验室课表管理">
		<dl id="menu-article">
				<dt><i class="experimentFont pr-10">&#xe6d7;</i>课表管理<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
				<dd>
					<ul>
						<li><a data-href="${ctx }/courseScheduleController/myCourseScheduleList?menuParam=3" data-title="我的课表" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>我的课表</a></li>
					</ul>
				</dd>
		</dl>
		</shiro:hasPermission>
		<shiro:hasPermission name="实验室预约">
			<dl id="menu-article">
				<dt><i class="experimentFont pr-10">&#xe60e;</i>实验室预约<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>
				<dd>
					<ul>
						<shiro:hasPermission name="通用实验室">
							<li><a data-href="${ctx }/experimentLabController/list/1" data-title="通用实验室" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>通用实验室</a></li>
						</shiro:hasPermission>
						<shiro:hasPermission name="院系实验室">
							<li><a data-href="${ctx }/experimentLabController/list/2" data-title="院系实验室" href="javascript:void(0)"><i class="Hui-iconfont">&#xe67e;</i>院系实验室</a></li>
						</shiro:hasPermission>
					</ul>
				</dd>
			</dl>
		</shiro:hasPermission>
			
		
		
</div>
</div>
<div class="dislpayArrow hidden-xs"><a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a></div>
<div class="Hui-article-box">
	<div id="Hui-tabNav" class="Hui-tabNav hidden-xs">
		<div class="Hui-tabNav-wp">
			<ul id="min_title_list" class="acrossTab cl">
				<li class="active">
					<span title="我的桌面" class="deskPage" data-href="">我的桌面</span>
					<em></em></li>
		</ul>
	</div>
		<div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
</div>
	<div id="iframe_box" class="Hui-article">
		<div class="show_iframe">
			<div style="display:none" class="loading"></div>
			<iframe scrolling="yes" frameborder="0" class="deskPage" src=""></iframe>
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
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery.contextmenu/jquery.contextmenu.r2.js"></script>
<script type="text/javascript">
	$(function () {
	    //防止页面后退
	    history.pushState(null, null, document.URL);
	    window.addEventListener('popstate', function () {
	            history.pushState(null, null, document.URL);
	    });
	})


$(function(){

	$(".menu-third-title").on('click',function(){
		$(this).siblings('menu').slideToggle();
		$(this).parents('.menu-third').siblings().find('menu').slideUp();
		$(this).parents('.menu-article').siblings().find('menu').slideUp();
		//$(this).siblings().find("a").removeClass("menu-third-selected");
	});
	
	$("menu li a").on('click',function(){
		$(this).addClass("menu-third-selected");
		$(this).parent().siblings().children().removeClass("menu-third-selected");
		$(this).parents(".menu-third").siblings().find("a").removeClass("menu-third-selected");
		$(this).parents(".menu-article").siblings().find("a").removeClass("menu-third-selected");
	});
	
	$('.menu_dropdown dl li a').on('click',function(){
		$('.menu_dropdown dl li').removeClass('checked');
		$(this).parent().addClass('checked');
	})
	
	
	
});
/*个人信息*/
function myselfinfo(url){
	var index =  layer.open({
		type: 2,
		area: ['600px','400px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: '个人信息',
		content: url
	});
}

/*资讯-添加*/
function article_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-添加*/
function picture_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*产品-添加*/
function product_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*用户-添加*/
function member_add(title,url,w,h){
	layer_show(title,url,w,h);
}

/*获取用户信息*/
$.getJSON("${SSO_URL}/userController/queryUser/${cookie.vcoocUserId.value}?callback=?",function(sysresult){
	if(sysresult.status==203){
		alert(sysresult.msg);
		return ;
	}
	if(sysresult.status==200){
		if(sysresult.data.role==null){
			$("#userRole").html("无分配角色");
		}else{
			$("#userRole").html(sysresult.data.role.name);
		}
		$("#userName").html(sysresult.data.name+'<i class="Hui-iconfont">&#xe6d5;</i>');
		if(sysresult.data.imagePath!=null){
			$("#userImg").attr("src","${cookie.RESOURCE_WAY.value}/"+sysresult.data.imagePath);
		}else{
			$("#userImg").attr("src","${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg");
		}
		return ;
	}
});
</script> 
<!--退出-->
<script type="text/javascript">
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
	
	<!--向我求教的信息-->
	 $.getJSON("${cookie.DISCUSSION_URL.value}/invitationController/selectInvitationHelpForMeNum/${cookie.vcoocUserId.value}?callback=?",function(sysresult){
		if(sysresult.status==200){
		   if(sysresult.data=='' || sysresult.data==null){
			   $('.badge-danger').text(0);
		   }else{
			   $('.badge-danger').text(sysresult.data);
		   }
		}
	})
</script>
</body>
</html>