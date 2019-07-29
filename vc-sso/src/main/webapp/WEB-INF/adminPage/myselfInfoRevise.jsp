<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
<div class="myself-main clear">
    <!--位置导航-->
    <div class="main-bar">
        <span><i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>&nbsp;当前位置：</span>
       <!--  <a href="index.html">主页</a> -->
       <a href="${PEXPERIMENTOPEN}/page/admin/index" onclick="">主页</a>
        <span style="margin-left: 4px;margin-right: 4px"> > </span>
        <span id="current">修改个人基本信息</span>
        <span style="margin-left: 4px;margin-right: 4px"> > </span>
        <!-- <a href="javascript:history.back(-1)">返回上一步</a> -->
        <a href="${PEXPERIMENTOPEN}/page/admin/index" onclick="">返回上一步</a>
    </div>
    <!--内容-->
    <div class="myself-content clear">
        <div class="info">
            <p class="title"><i class="fa fa-id-card" aria-hidden="true"></i>&nbsp;修改个人基本信息</p>
           <form action="${ctx}/teacherController/updatetTeacher" method="post" id="demoform" enctype="multipart/form-data"> 
                 <input name="id" value="${teacherInfo.id }" type="hidden"/>
                <div class="revisecontent">
                    <div class="left">
                        <div class="left-content">
	                        <p>更换头像：<p>
                            <div style="margin-top:10px;clear:both;overflow:hidden;">
                            	<c:choose>
                            		<c:when test="${empty teacherInfo.imagePath}">
	                            		<img id="ImgPr" src="${cookie.RESOURCE_WAY.value}/system_file/img/touxiang.jpg"/>
                            		</c:when>
                            		<c:otherwise>
	                            		<img id="ImgPr" src="${cookie.RESOURCE_WAY.value}/${teacherInfo.imagePath}"/>
                            		</c:otherwise>
                            	</c:choose>
	                            <div style="float:left;padding-left:20px;margin-top:40px;">
		                            <input id="up" type="file" name="photoFile" value="选择头像" >
		                            <p>仅支持格式：JPG、PNG、GIF、JPEG、BMP</p>
	                           </div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    	<!--个性签名-->
                        <div style="margin-top:20px;">
	                        <p> <span style="color:red;">*</span> 设置个人签名：</p>
                            <div id="mySignature" >
                           		<img alt="" src="${RESOURCE_WAY }/${teacherInfo.exp1}"/>
                            </div>
                            <input type="hidden" value="" name="exp1" id="exp1">
                            <div id="signature"></div>
                            <p style="font-size:12px;padding:10px 0;color: blue;"><span style="color:red;">*</span>您可以在上方方框区域内通过鼠标手写您的签名!</p>
							<button name="" value="生成图片" type="button" onclick="exportImage()">生成签名</button>
							<button name="重置" value="生成图片" type="button" onclick="reset2()">重置</button>
                        </div>
                    </div>
                    <br/>
                    
                    
                    <div class="right">
                        <div class="form-group clear">
                            <label class="right-label"><span style="color:red;">*&nbsp;</span>姓名：</label>
                            <div class="right-div">
                                <input class="name-input" type="text" name="name" value="${teacherInfo.name }" datatype="names" nullmsg="姓名不能为空！" errormsg="请输入正确的用户姓名" sucmsg="用户名可用！" placeholder="请输入您的姓名">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        <div class="form-group clear">
                            <label class="right-label"><span style="color:red;">*&nbsp;</span>性别：</label>
                            <div class="right-div">
                            	<c:choose>
                            		<c:when test="${teacherInfo.sex eq 1 }">
                            			 <label>
	                                   		 <input type="radio" name="sex" value="1"  checked="checked"><span >男</span>
		                                </label>
		                                &nbsp;
		                                <label>
	                                    	<input type="radio" name="sex" value="2"><span>女</span>
	                                	</label>
                            		</c:when>
                            		<c:otherwise>
                            			<label>
	                                   		 <input type="radio" name="sex" value="1"><span>男</span>
		                                </label>
		                                &nbsp;
		                                <label>
	                                    	<input type="radio" name="sex" value="2" checked="checked"><span>女</span>
	                                	</label>
                            		</c:otherwise>
                            	</c:choose>
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        <div class="form-group clear">
                            <label class="right-label"><span style="color:red;">&nbsp;</span>联系电话：</label>
                            <div class="right-div">
                                <input class="name-input" name="phone" type="text" value="${teacherInfo.phone }"  placeholder="请输入您的联系电话">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        
                        <div class="form-group clear">
                            <label class="right-label"><span style="color:red;">&nbsp;</span>个人介绍：</label>
                            <div class="right-div">
                                <textarea  style="width: 400px;height: 100px;resize:none;" name="teacherPresentation" placeholder="您的个人介绍">${teacherInfo.teacherPresentation }</textarea>
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                        
                        
                        <div class="form-group clear">
                            <label class="right-label"><span style="color:red;">&nbsp;</span>邮箱地址：</label>
                            <div class="right-div">
                                <input class="name-input" name="email" type="text" value="${teacherInfo.email }"  placeholder="请输入您的邮箱地址">
                            </div>
                            <p class="Validform_checktip clear" style="padding-left: 100px"></p>
                        </div>
                    </div>
                </div>
                <div style="clear: both"></div>
		        <div class="btn clear">
		            <button id="btn-sub"><i class="fa fa-check-square" aria-hidden="true"></i>&nbsp;确认</button>
		            &nbsp;&nbsp;
		            <button id="btn-reset" type="button"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;重置</button>
		        </div>
            </form> 
        </div>
    </div>
</div>
<jsp:include page="./footer.jsp"></jsp:include>
<script src="${ctx }/staticfile/js/Validform_v5.3.2_min.js"></script>
<script src="${ctx }/staticfile/js/jquery.form.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/jSignature/flashcanvas.js"></script>
<script src="${ctx }/staticfile/js/jSignature//jSignature.min.js"></script>
<!--校驗，提交-->
<script type="text/javascript">
function layerSuccessTip(msg){ layer.msg(msg,{icon:1,time:1500});}

function layerErrorTip(msg){ layer.msg(msg,{icon:2,time:1500});}

function reloadContent(){setTimeout('window.location.reload()',1500);}
$(function(){
	$("#demoform").Validform({
		btnSubmit:"#btn-sub", 
		btnReset:"#btn-reset",
		tiptype:2, 
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:false,
		postonce:true,
		ajaxPost:true,
		datatype:{
			"*0-2": /^[^\s]{0,2}$/,
			"*0-20": /^[^\s]{1,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"n-en" : /[0-9a-zA-Z]{1,20}/,
			"ch"   : /[\u4E00-\u9FA5]+$/,
			"mail" : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
			"phone" :/^((1[3,5,7,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/,
			"names" : /^([A-Za-z]|[\u4E00-\u9FA5]{2,7}$)+$/
		},
		usePlugin:{
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;
			curform.ajaxSubmit({
				type:'post',
				url:'${ctx}/teacherController/updatetTeacher',
				success:function(sysresult){
					if(sysresult.status=="200"){
						//layer.msg(sysresult.msg,{icon:2,time:1500,area:['100px','60px']});
						layerSuccessTip("修改信息成功！");
					//	setTimeout(function(){window.location.href='${ctx}/adminPage/index';},1500)
					//开放预约系统修改个人信息方法
					setTimeout(function(){window.location.href='${PEXPERIMENTOPEN}'+'/page/admin/index';},1500)
					}else{
						//layer.msg(sysresult.msg,{icon:1,time:1500,area:['100px','60px']});
						layerErrorTip(sysresult.msg);
						/* var index = parent.layer.getFrameIndex(window.name);
						setTimeout(function(){window.parent.location.reload();parent.layer.close(index);},1500);   */
						//reloadContent();
					}
				},
				error: function(){
			
				}
			});
			return false;
		},
		callback:function(data){
   
		}
	});
	$(".input-file").change(function(){
		var url = $(this).val();
		$(".uploadUrl").val(url);
	})

})

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

    $(function () {
        $("#up").uploadPreview({Img: "ImgPr"});
    });  
</script>
<!--个性前面  图片生成-->

<script type="text/javascript">
	$(document).ready(function() {
	    $("#signature").jSignature()
	})
	var $sigdiv = $("#signature");
	function exportImage(){
		var datapair = $sigdiv.jSignature("getData", "svgbase64") 
		var i = new Image()
		i.src = "data:" + datapair[0] + "," + datapair[1] 
		$("#mySignature").html("");
		$("#mySignature").html($(i));
		$("#exp1").val($("#mySignature").html());
	}
	function reset2(){
		$sigdiv.jSignature("reset");// 重置
		/* $("#signature").html(""); */
	}
</script>
</body>
</html>