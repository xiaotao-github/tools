<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>修改密码</title>
    <link href="${ctx }/staticfile/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx }/staticfile/css/student_reset.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/student_common.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/student_usermsgedit.css">
    <link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
	<style>
    .phcolor {
        color: #999;
    }
</style>
</head>
<body>
<!--S top-->
	<jsp:include page="./header.jsp"></jsp:include>
<!--E top-->

	<!-- S container -->
	<p class="contain-nav">
		<span><a href="${PEXPERIMENTOPEN}/page/student/index">系统首页</a>&nbsp;>>&nbsp;<a href="##">修改密码</a></span>
	</p>
	<!--主体-->
    <div class="password-main clear">
        <!--内容-->
        <div class="password-content clear">
            <div class="password clear">
                <p class="title">
                    <span class="span-1"><i class="fa fa-key" aria-hidden="true"></i>&nbsp;修改密码</span>
                </p>
                <form action="${ctx }/studentController/updatetStudentPwd" method="POST" class="demoform">
                    <div class="revisecontent">
                        <div class="form-group clear">
                            <label class="password-name"><span>*&nbsp;</span>原密码：</label>
                            <div class="text-input">
                                <input class="password-input" type="password" value="" name="pwd"  ajaxurl=""
                                       nullmsg="请输入原密码" errormsg="请输入正确的原密码" sucmsg="" placeholder="请输入您的原始密码">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        <div class="form-group clear">
                            <label class="password-name"><span>*&nbsp;</span>新密码：</label>
                            <div class="text-input">
                                <input class="password-input" type="password" name="userpassword" value="" name="userpassword" datatype="*1-20"
                                       nullmsg="请输入新密码" errormsg="密码不能超过20位！" sucmsg="密码可用，请牢记！" placeholder="请输入您的新密码">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        <div class="form-group clear">
                            <label class="password-name"><span>*&nbsp;</span>确认密码：</label>
                            <div class="text-input">
                                <input class="password-input" type="password" value="" name="confirmPwd" datatype="*"
                                       recheck="userpassword" nullmsg="请再次输入新密码" errormsg="您两次输入的密码不一致！" sucmsg="密码正确，请牢记！"
                                       placeholder="请再次输入新密码">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                    </div>
	            	 <div class="btn clear">
			            <button id="btn-sub" type="button"><i class="fa fa-check-square" aria-hidden="true"></i>&nbsp;确认</button>
			            &nbsp;&nbsp;
			            <button id="btn-reset" type="button"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;重置</button>
	        		</div>
                </form>
            </div>
            <div style="clear: both"></div>
        </div>

    </div>

<!--S footer-->
	<jsp:include page="./footer.jsp"></jsp:include>
<!--E footer-->

<script src="${ctx }/staticfile/js/Validform_v5.3.2_min.js"></script>
<script>
	if('${status}'=="200" || '${status}'=='203'){
		layer.msg('${msg}',{icon:1,time:1500});
		setTimeout('window.location.href="${ctx}/page/lab";',1500);
	}else if('${status}'=="202"){
		layer.msg('${msg}',{icon:2,time:2000});
	}
    $(".demoform").Validform({
        btnSubmit: "#btn-sub",
        btnReset: "#btn-reset",
        tiptype: 2,
        ignoreHidden: false,
        dragonfly: false,
        tipSweep: false,
        label: ".label",
        showAllError: true,
        postonce: true,
        ajaxPost: true,
        datatype: {
            "names": /^([A-Za-z]|[\u4E00-\u9FA5]{2,7}$)+$/
        },
        usePlugin: {
            swfupload: {},
            datepicker: {},
            passwordstrength: {},
            jqtransform: {
                selector: "select,input"
            }
        },
        beforeCheck: function (curform) {
        	if($("input[name=userpassword]").val() != $("input[name=confirmPwd]").val()){
        		return false;
        	}
        },
        beforeSubmit: function (curform) {
        },
        callback: function (data) {
        	if(data.status==200){
        		layer.msg("操作成功",{icon:1,time:1500});
        		 //window.location.href="${ctx}/index.jsp";
        		 setTimeout(function(){
        			 window.location.href="${ctx}/page/lab";
        		 }, 1800);
        		 return;
        	}
        	if(data.status==203){
        		layer.msg(data.msg,{icon:2,time:2000});
       		 	//window.location.href="${ctx}/index.jsp";
       		 	return;
        	}
        	//layer.msg(data.msg,{icon:1,time:3000});
        	//setTimeout("window.location.reload();", 3000);
        }
    });
</script>

<script>
    $(function () {
        supportPlaceholder = 'placeholder' in document.createElement('input');
        placeholder = function (input) {
            var text = input.attr('placeholder'),
                    defaultValue = input.defaultValue;
            if (!defaultValue) {
                input.val(text).addClass("phcolor");
            }
            input.focus(function () {
                if (input.val() == text) {
                    $(this).val("");
                }
            });
            input.blur(function () {
                if (input.val() == "") {
                    $(this).val(text).addClass("phcolor");
                }
            });
            input.keydown(function () {
                $(this).removeClass("phcolor");
            });
        };
        if (!supportPlaceholder) {
            $('input').each(function () {
                text = $(this).attr("placeholder");
                if ($(this).attr("type") == "text") {
                    placeholder($(this));
                }
            });
        }
    });
</script>
</body>
</html>
