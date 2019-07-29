<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
	
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>实验室开放与预约管理系统</title>
    <link href="${ctx }/staticfile/css/index.css" rel="stylesheet">
    <link rel="stylesheet" href="${ctx }/staticfile/font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/myselfInfoRevise.css">
    <link rel="stylesheet" href="${ctx }/staticfile/css/passwordRevise.css">
    <link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
	<style type="text/css">
		.hide_Validform{
			display: none !important;
		}
	    .phcolor {
	        color: #999;
	    }
	</style>
</head>
<body>
<jsp:include page="./header.jsp"></jsp:include>
<!--主体-->

<div class="password-main clear">
    <!--位置导航-->
    <div class="main-bar">
        <span><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>&nbsp;当前位置：</span>
        <a href="${PEXPERIMENTOPEN}/page/admin/index">主页</a>
        <span style="margin-left: 4px;margin-right: 4px"> > </span>
        <span id="current">修改用户密码</span>
        <span style="margin-left: 4px;margin-right: 4px"> > </span>
        <a href="javascript:history.back(-1)">返回上一步</a>
    </div>
    <!--内容-->
    <div class="password-content clear">
        <div class="password clear">
            <p class="title">
                <span class="span-1"><i class="fa fa-key" aria-hidden="true"></i>&nbsp;修改用户密码</span>
            </p>
            <form action="${ctx}/teacherController/updatetTeacherPwd" method="post" class="demoform">
                <div class="revisecontent">
                    <div class="form-group clear">
                        <label class="password-name"><span>*&nbsp;</span>原密码：</label>
                        <div class="text-input">
                            <input class="password-input" name="pwd" type="password" value="" ajaxurl=""
                                   nullmsg="请输入原密码" errormsg="请输入正确的原密码" sucmsg="" placeholder="请输入您的原始密码">
                        </div>
                        <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                    </div>
                    <div class="form-group clear">
                        <label class="password-name"><span>*&nbsp;</span>新密码：</label>
                        <div class="text-input">
                            <input class="password-input" type="password" value="" name="userpassword" datatype="*1-20"
                                   nullmsg="请输入新密码" errormsg="密码不能超过20位！" sucmsg="密码可用，请牢记！" placeholder="请输入您的新密码">
                        </div>
                        <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                    </div>
                    <div class="form-group clear">
                        <label class="password-name"><span>*&nbsp;</span>确认密码：</label>
                        <div class="text-input">
                            <input class="password-input" type="password" name="confirmPwd" value="" name="userpassword2" datatype="*1-20"
                                   recheck="userpassword" nullmsg="请再次输入新密码" errormsg="您两次输入的密码不一致！" sucmsg="密码正确，请牢记！"
                                   placeholder="请再次输入新密码">
                        </div>
                        <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                    </div>
                </div>
                <div style="clear: both"></div>
        <div class="btn clear">
            <button id="btn-sub" type="button"><i class="fa fa-check-square" aria-hidden="true"></i>&nbsp;确认</button>
            &nbsp;&nbsp;
            <button id="btn-reset" type="button"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;重置</button>
        </div>
            </form>
        </div>
        
    </div>

</div>
<jsp:include page="./footer.jsp"></jsp:include>
<script src="${ctx }/staticfile/js/Validform_v5.3.2.js"></script>

<script>
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
        		layer.msg('修改成功',{icon:1,time:2000});
        		setTimeout(function(){ window.location.href="${SSO_URL}/page/lab";}, 1800);
        		 return;
        	}else if(data.status==203){
        		layer.msg(data.msg,{icon:1,time:2000});
				setTimeout(function(){window.location.href="${SSO_URL}/page/lab";}, 1800);	        		
       		 	return;
        	}else{
	        	layer.msg(data.msg,{icon:1,time:3000});
	        	setTimeout(function(){window.location.reload();}, 2500);
        	}
        }
    });
</script>
</body>
</html>