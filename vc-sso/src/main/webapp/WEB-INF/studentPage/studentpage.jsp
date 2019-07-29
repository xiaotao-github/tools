<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>
<body>
	<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
	<!--此页面用于加载http链接而已  -->
	<script type="text/javascript">
	window.location.href="${PEXPERIMENTOPEN}/page/student/index";
	</script> 
</body>
</html>