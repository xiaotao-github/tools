<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>实验图片上传</title>
    <link rel="stylesheet" href="${ctx}/staticfile/student/css/experiment_image_upload.css">
</head>
<body>
<div class="outsideBox">
    <form action="${ctx }/studentController/saveExperimentImage" method="post" id="form" enctype=multipart/form-data>
       <input type="text" disabled="disabled" name="subProjectFile" class="input-text">
					<!-- 报告Id 用于判断是否已经提交过 是 则修改-->
					<input type="hidden" name="scheduleStudentScoreId" value="${scheduleStudentScoreId }" class="input-text">
        <div class="uploadBox">
            <div class="showImg"></div>
            <img src="${ctx}/staticfile/images/cam.png" alt="" class="upImgCover" id="ImgPr">
            <input type="file" class="uploadButton" accept = 'image/*' name="subGifFile" datatype="*" nullmsg="图片不能为空!" errormsg="请上传图片文件!" id="up">
        </div>
        <p class="submitBox">
            <input type="submit" value="提    交" id="submitButton" name="submit"  />
        </p>
    </form>
</div>
</body>
<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/upload.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/student/js/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">

	$(function () {
	    //防止页面后退
	    history.pushState(null, null, document.URL);
	    window.addEventListener('popstate', function () {
	            history.pushState(null, null, document.URL);
	    });
	})

    $("#form").Validform({
        btnSubmit:"#submitButton",
        btnReset:".btn_reset",
        tiptype:function(msg,o){
            if (o.type == 3){
                layer.msg(msg, {time: 800});
            }else if(o.type == 1){
                layer.msg("正在提交...",{time:800});
            }
        },
        ignoreHidden:false,
        dragonfly:false,
        tipSweep:true,
        label:".label",
        showAllError:false,
        postonce:true,
        ajaxPost:true,
        sync:true,
        datatype:{
            "*6-20": /^[^\s]{6,20}$/,
            "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
            "username":function(gets,obj,curform,regxp){
                //参数gets是获取到的表单元素值，obj为当前表单元素，curform为当前验证的表单，regxp为内置的一些正则表达式的引用;
                var reg1=/^[\w\.]{4,16}$/,
                    reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;

                if(reg1.test(gets)){return true;}
                if(reg2.test(gets)){return true;}
                return false;

                //注意return可以返回true 或 false 或 字符串文字，true表示验证通过，返回字符串表示验证失败，字符串作为错误提示显示，返回false则用errmsg或默认的错误提示;
            },
            "phone":function(){
                // 5.0 版本之后，要实现二选一的验证效果，datatype 的名称 不 需要以 "option_" 开头;
            }
        },
        beforeCheck:function(curform){
            //在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
            //这里明确return false的话将不会继续执行验证操作;
        },
        beforeSubmit:function(curform){
            curform.submit();
            return false;
        }
    })

    var status = '${status}';
    var msg  = '${msg}';
    if(status!=null){
        if(status==200){
            layer.msg("上传成功,请在PC端刷新查看");
        }else if(status == 403){
            layer.msg("上传失败,请重新上传,原因:"+msg);
        }
    }


    $(function(){
        $('#Validform_msg').css('display','none');
        $('.submit').click();
        $("#up").uploadPreview({Img: "ImgPr"});
    })
</script>
</html>