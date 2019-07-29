<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	

<!DOCTYPE html>
 <html>
 <c:set var="ctx" value="${pageContext.request.contextPath}" />
   <head>  
     <title>test</title>  
     <script src="${ctx }/staticfile/js/jquery-1.11.2.min.js"></script>
     <script type="text/javascript">
     $(function(){
	     $('#btn').click(function () {
	    	    var userName = $("input[name=userName]").val();
	    	    console.log(userName);
	    	    var img = document.myForm.img.files[0];
	    	    
	    	    var fm = new FormData();
	    	    fm.append('name', userName);
	    	    fm.append('mf', img);
	    	    $.ajax(
	    	        {
	    	            url: '${ctx}/uploadFile',
	    	            type: 'POST',
	    	            data: fm,
	    	            contentType: false, //禁止设置请求类型
	    	            processData: false, //禁止jquery对DAta数据的处理,默认会处理
	    	            //禁止的原因是,FormData已经帮我们做了处理
	    	            success: function (result) {
	    	            	console.log(result);
	    	                //测试是否成功
	    	                //但需要你后端有返回值
	    	                alert(result);
	    	            }
	    	        }
	    	    );
	    	});
     })
     </script>  
   </head>  
   <body>  
     <form name="myForm"  enctype="multipart/form-data">
	    <input type="text" name="userName">
	    <input type="file" name="img">
	    <input type="button" id="btn" value="submit">
	</form>
     <div id="prompt"></div>                               
   </body>  
 </html>  