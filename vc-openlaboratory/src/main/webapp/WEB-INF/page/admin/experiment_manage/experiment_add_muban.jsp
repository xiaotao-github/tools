<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- <!DOCTYPE html> -->
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>

<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<style>
	.page-container{width:960px;margin:0 auto;}
	.input-submit:hover{background:#51848a ;}
</style>
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<!--编辑器文件上传保存路径-->
<c:set var="ueditFilePath" value="${FILE_PATH }/${experiment.experimentInstructorBag}" scope="session"/>
</head>
<body>
<div class="page-container">
	<p class="fs-20 fw-bold fc-666">为<span style="color:#508f94">《${experiment.experimentName }》</span>实验添加实验报告模板</p>
	<div class="fs-12">
		<p style="color: red">
			<span>温馨提示:</span>
			<span>若需要实现实验报告模板自动批改功能,请按下面格式来添加实验报告模板，若不需要，则不用;</span>
		</p>
		<p style="color: blue">
			<span style="display:block;" class="fl">提示:</span>
			<span style="display:block;padding-left:40px;"> 
				1.为了实现系统智能批改，需要系统识别以下特殊字符：”#[”   ”]#”  ”~”<br/>
				2.需要学生填写的空格，请用”#[”和”]#”扩起来，如：”#[5]#”;<br/>
				3.若是浮动的约数，可以在约数的取值区间用”~”区分开。如答案取值在4到4.5：“#[4~4.5]#”<br/>
				4.特别声明：扩起答案的特殊字符是半角的英文字符，特殊字符之间是答案，请不要在答案之间添加其他特殊字符。特别是“#”、“]”、“[”、“~”、无意义的空格等<br/>
			</span>
		</p>
	</div>
	<div>
		<form action="${ctx}/experimentController/updateExperiment" method="post" id="form-experimentManage-edit">
			<script id="theQuestionsDetailPage-editor1" type="text/plain" style="height:100px">
				${experiment.experimentInstructor}
			</script>
			<p class="mrt-20" style="text-align:center;">
				<span class="input-submit bc-darkGreen fc-white fs-18" style="padding:3px 20px;cursor:pointer;" onclick="formSubmit()">提&emsp;交</span>
			</p>
		</form>
	</div>
</div>

<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->
<script type="text/javascript">
 var realPath='${ctx}';
 //编辑器，图片上传展示需要的参数
 var RESOURCE_WAY ='${RESOURCE_WAY}';
 var ueditFilePath = '${experiment.experimentInstructorBag}';
</script>
<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script>
//console.log('${experiment.experimentInstructor}')
	var ue1 = UE.getEditor('theQuestionsDetailPage-editor1',{
		 toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', 'attachment', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', '|', 'preview'
        ]],
        maximumWords : 10000,
        initialFrameWidth: 960,
        initialFrameHeight: 400,
        autoHeightEnabled:true
	});

function formSubmit(){
	var experimentInstructor = ue1.getContent()+"";
	 $.ajax({
		type:'post',
		dataType:'json',
		url:'${ctx}/experimentController/updateExperimentMuban',
		data:{
			'experimentInstructor':experimentInstructor, 
			'experimentId':'${experimentId}',
		},
		success:function(data){
			if(data.status==200){
				layer.msg('添加成功',{icon:1});
				setTimeout(function(){	window.location.reload();},2000);
			}
		},
		error:function(data){
			layer.msg('添加失败！',{icon:2});
			setTimeout(function(){	window.location.parent.reload();},2000);
		}
	}); 
}
</script>
</body>
</html>