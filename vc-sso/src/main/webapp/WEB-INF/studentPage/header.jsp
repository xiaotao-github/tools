<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div class="header">
    <div class="top">
        <div class="left">
            <div class="title">最新公告：</div>
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
            <span class="avatar">
            	<c:if test="${studentInfo.imagePath =='' || studentInfo.imagePath eq null  }">
						<img src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg" alt="">
				</c:if>
				<c:if test="${studentInfo.imagePath !='' && studentInfo.imagePath != null   }">
					<img src="${cookie.RESOURCE_WAY.value}/${studentInfo.imagePath}" alt="">
				</c:if>
            </span>
            <span>欢迎您！</span>
            <span class="name">${studentInfo.name}</span>
            <span>同学</span>
            <i><img src="${ctx }/staticfile/images/student/slidedown.png" alt="">
            	
            </i>
            <ul style="display: none">
                <li class="info">
                    <a href="${ctx }/studentController/studentInfoView">个人信息</a>
                </li>
                <li class="info">
                    <a href="${ctx }/studentController/toStudentInfoEdit">修改信息</a>
                </li>
                <li class="info">
                    <a href="${ctx }/studentPage/studentPasswordEdit.html">修改密码</a>
                </li>
                <li class="info">
                	 <a href="${ctx}/page/student/index" onclick="">返回主页</a>
                </li>
                <li class="info">
                   <a href="${SSO_URL }/index.jsp" onclick="out()">退出</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="nav clear">
    <div class="bottom">
    <a href="${PEXPERIMENTOPEN}/page/student/index">
        <div class="logo" style="float:left;">
            <img src="${RESOURCE_WAY }/system_file/img/logo.png">
        </div>
        <!-- <p class="title">渥课·虚拟仿真实验教学平台</p> -->
        <p class="title" style="float: left;line-height: 65px;font-size: 24px;padding-left: 20px;">实验室开放预约管理系统</p>
    </a>
    </div>
	
</div>
<script type="text/javascript">
</script>