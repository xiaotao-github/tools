<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter,com.vcooc.common.util.CookieUtils"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
	
<%
	
	request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	String rootPath = application.getRealPath( "/" );
	//自定义保存的根目录，从而达到上传目录不在是项目下，默认为项目根目录
	/* String saveRootPath = CookieUtils.getCookieValue(request, "FILE_PATH"); */
	String  ueditFilePath = request.getSession().getAttribute("ueditFilePath").toString();
	if(ueditFilePath != null && ueditFilePath != ""){
		/* saveRootPath += CookieUtils.getCookieValue(request, "FILE_PATH"); */
		out.write( new ActionEnter( request, ueditFilePath,rootPath ).exec() );
	}else{
		throw new Exception();
	}
%>