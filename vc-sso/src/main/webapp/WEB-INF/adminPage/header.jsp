<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<div class="header">
    <div class="top">
        <div class="left">
            <div class="title"><i class="fa fa-volume-up fa-lg" aria-hidden="true"></i>&nbsp;最新公告：</div>
            <div id="scrollDiv" class="content">
                <ul>
                	<!-- <li>
                        <a href="##"><span>2017-06-14 9:23</span> 最新公告最新公告最新公告最新公告最新公告</a>
                    </li>
                    <li>
                        <a href="##"><span>2017-06-14 9:23</span> 最新公告最新公告最新公告最新公告最新公告</a>
                    </li>
                    <li>
                        <a href="##"><span>2017-06-14 9:23</span> 最新公告最新公告最新公告最新公告最新公告</a>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="right">
            <span>欢迎您：</span>
            <a class="name" href="">${teacherInfo.name}&nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i></a>
            <ul style="display: none">
              <%--   <li class="info">
                    <a href="${ctx }/adminPage/myselfInfoRevise">修改信息</a>
                </li> --%>
                <li class="info">
                    <a href="${ctx }/adminPage/passwordRevise">修改密码</a>
                </li>
                <shiro:hasPermission name="信息门户管理">
               <%--   <li class="info">
                    <a href="${cookie.WEB_SITE_URL.value}/backstageController/main">信息管理</a>
                </li> --%>
                </shiro:hasPermission> 
                <%-- <li class="info">
                    <a href="${cookie.WEB_SITE_URL.value}/webController/main">信息中心</a>
                </li>  --%>
				<li class="info" ><a href="${MANAGE_URL}/page/index" onclick="">行政中心</a></li>		
				<li class="info"> <a href="${DISCUSSION_URL}/page/teacherInfo/index" onclick="">交流中心</a></li>
                <li class="info">
                <%-- <a href="${ctx }/adminPage/index.html">返回主页</a> --%>
                 <a href="${ctx}/page/admin/index" onclick="">返回主页</a>
                </li>
                 <li class="info">
                    <a href="${ctx}/page/lab" onclick="">退出</a>
                </li> 
            </ul>
        </div>
    </div>
</div>
<div class="nav clear">
    <div class="bottom">
     <a href="${PEXPERIMENTOPEN}/page/admin/index">
        <div class="logo">
            <img src="${RESOURCE_WAY }/system_file/img/logo.png">
        </div>
      <!--  <p class="title">渥课·虚拟仿真实验教学平台</p> -->
      <p class="title">实验室开放预约管理系统</p>
    </a>
   </div>
</div>

<!-- 头部 -->