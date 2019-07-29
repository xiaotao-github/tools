<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>修改个人信息</title>
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
<jsp:include page="./header.jsp"></jsp:include>
<!-- S container -->
<p class="contain-nav">
	<span><a href="${PEXPERIMENTOPEN}/page/student/index">系统首页</a>&nbsp;>>&nbsp;<a href="##">修改信息</a></span>
</p>
<!--主体-->
    <div class="main clear">
        <!--内容-->
        <div class="content clear">
            <div class="info">
                <p class="title"><i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;修改基本信息</p>
                <form action="${ctx }/studentController/updateStudentInfoAndFileById" method="post" class="demoform" enctype="multipart/form-data">
                    <div class="revisecontent">
                        <div class="left">
                            <label class="left-title">更换头像：</label>
                            <div class="left-content">
                                <div>
									<c:if test="${studentInfo.imagePath eq null}">
		                                <img id="ImgPr" src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg"/>
									</c:if>
									<c:if test="${studentInfo.imagePath != null }">
		                                <img id="ImgPr" src="${cookie.RESOURCE_WAY.value}/${studentInfo.imagePath}"/>
									</c:if>
                                </div>
                                <input id="up" name="photoFile" type="file" value="选择头像">
                                <p>仅支持格式：JPG、PNG、GIF、JPEG、BMP</p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="form-group clear">
                                <label class="right-label"><span>*&nbsp;</span>姓名：</label>
                                <div class="right-div">
                                    <input class="name-input" type="text" value="${studentInfo.name }" name="name" datatype="names" nullmsg="姓名不能为空！" errormsg="请输入正确的用户姓名" sucmsg="用户名可用！" placeholder="请输入您的姓名">
                                </div>
                                <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                            </div>
                            <div class="form-group clear">
                                <label class="right-label"><span>*&nbsp;</span>性别：</label>
                                <div class="right-div">
                                    <label>
                                        <input type="radio" name="sex" value="1" <c:if test="${studentInfo.sex eq 1 }">checked="checked"</c:if>  ><span>男</span>
                                    </label>
                                    &nbsp;
                                    <label>
                                        <input type="radio" name="sex" value="2" <c:if test="${studentInfo.sex eq 2 }">checked="checked"</c:if> ><span>女</span>
                                    </label>
                                </div>
                                <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                            </div>
                            <div class="form-group clear">
                                <label class="right-label"><span>&nbsp;</span>电话：</label>
                                <div class="right-div">
                                    <input class="name-input" type="text" value="${studentInfo.phone }" name="phone" datatype="m" nullmsg="请输入您的联系电话！" errormsg="请输入正确的联系电话！" sucmsg="联系电话可用！" placeholder="请输入您的联系电话">
                                </div>
                                <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                            </div>
                            <div class="form-group clear">
                                <label class="right-label"><span>&nbsp;</span>QQ：</label>
                                <div class="right-div">
                                    <input class="name-input" type="text" value="${studentInfo.qqNum }" name="qqNum" datatype="m" nullmsg="请输入您的QQ号！" errormsg="请输入数字！" sucmsg="通过校验！" placeholder="请输入您的QQ号">
                                </div>
                                <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                            </div>
                            <div class="form-group clear">
                                <label class="right-label"><span>&nbsp;</span>邮箱地址：</label>
                                <div class="right-div">
                                    <input class="name-input" type="text" value="${studentInfo.email }" name="email" datatype="e" nullmsg="请输入您的邮箱地址！" errormsg="请输入正确的邮箱地址！" sucmsg="邮箱地址可用！" placeholder="请输入您的邮箱地址">
                                </div>
                                <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                            </div>
                            <div class="form-group clear">
                                <label class="right-label">个人说明：</label>
                                <div class="right-div">
                                    <textarea class="textarea" placeholder="说点什么..." name="studentPresentation">${st.studentPresentation }</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn clear">
		                <button id="btn-sub"><i class="fa fa-check-square" aria-hidden="true"></i>&nbsp;确认</button>
		                &emsp;&emsp;
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
	if('${status}'=="200"){
		layer.msg('${msg}',{icon:1,time:1500});
		setTimeout('window.location.href="${PEXPERIMENTOPEN}/page/student/index";',1500);
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
        showAllError: false,
        postonce: true,
        ajaxPost: false,
        datatype: {
            "names": /^([A-Za-z]|[\u4E00-\u9FA5]{2,7}$)+$/,
            "m":/^[0-9]*$/,
            "e":/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
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
        },
        beforeSubmit: function (curform) {
        },
        callback: function (data) {
        	
        	if(data.status==200){
        		layer.msg('修改成功',{icon:1,time:2000});
        	}else{
        		layer.msg(data.msg,{icon:2,time:2000});
        	}
        }
    });
</script>

<!--图片上传预览-->
<script>
    jQuery.fn.extend({
        uploadPreview: function (opts) {
            var _self = this,
                    _this = $(this);
            opts = jQuery.extend({
                Img: "ImgPr",
                Width: 100,
                Height: 100,
                ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                Callback: function () {
                }
            }, opts || {});
            _self.getObjectURL = function (file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
            };
            _this.change(function () {
                if (this.value) {
                    if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                        this.value = "";
                        return false
                    }
                    if ($.browser.msie) {
                        try {
                            $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                        } catch (e) {
                            var src = "";
                            var obj = $("#" + opts.Img);
                            var div = obj.parent("div")[0];
                            _self.select();
                            if (top != self) {
                                window.parent.document.body.focus()
                            } else {
                                _self.blur()
                            }
                            src = document.selection.createRange().text;
                            document.selection.empty();
                            obj.hide();
                            obj.parent("div").css({
                                'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                                'width': opts.Width + 'px',
                                'height': opts.Height + 'px'
                            });
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
                        }
                    } else {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                    }
                    opts.Callback()
                }
            })
        }
    });
</script>
<script>
    $(function () {
        $("#up").uploadPreview({Img: "ImgPr"});
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