<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<style type="text/css">
	.hide_Validform{
			display: none !important;
		}
</style>
</head>
<body>
<div class="page-container">
	<form action="${ctx}/experimentCourseController/addExperimentCourse/${menuParam}${param.menuParam}" method="post"  enctype="multipart/form-data"  id="form-courseManage-add" class="form">
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属院系：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<select name="departmentId" datatype="*" class="select select-box" id="departmentSelect" nullmsg="请选择所属院系！" errormsg="请选择所属院系！">
					</select> 
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>课程名称：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" value="${experimentCourse.courseName }" placeholder="请填写课程名称！" id="param" name="courseName" datatype="*" nullmsg="请输入课程名称！" errormsg="课程名称不可用！请重新输入">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>课程编号：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" value="${experimentCourse.number }" placeholder="请填写课程编号!" id="param" name="number"  datatype="*" nullmsg="请输入课程编号">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>学期：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<select name="semester" datatype="*" class="select select-box" id="semester" nullmsg="请选择所属学期！" errormsg="请选择所属学期！">
					  <!--  <option value="">请选择所属学期</option>
					   <option value="1">上学期</option>
					   <option value="2">下学期</option>
					   <option value="3">上下学期</option> -->
					</select> 
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>总课时：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" value="${experimentCourse.classHour }" placeholder="请填写总课时" id="classHour" name="classHour"  datatype="number" nullmsg="请输入总课时" >
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
        <div class="row cl">
	        <label class="col-xs-3 col-sm-3 pn-0 text-r">选择图片：</label>
	        <div class="formControls col-xs-8 col-sm-8">
	            <div class="col-xs-2 col-sm-2" style="width:100px;height:100px;float:left;padding:0;"><img id="ImgPr" src="" style="width:100%;height:100%;display:block;"></div>
	            <div class="col-xs-7 col-sm-7">
		            <input id="up" type="file" name="photoFile" value="选择头像" style="display:block;float:left;">
		            <p style="display:block;clear:both;">仅支持格式：JPG、PNG、GIF、JPEG、BMP</p>
		        </div>
	        </div>
        </div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>课程介绍：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<textarea name="presentation" cols="" rows="" class="textarea"  placeholder="请输入课程介绍..." dragonfly="true"  onKeyUp="$.Huitextarealength(this,500)" ignore="ignore">${experimentCourse.presentation }</textarea>
					<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		<div class="row cl">
			<div class="col-xs-12 col-sm-12 text-c">
				<button onClick="" class="btn btn-primary radius" type="" id="courseManage-add-sub">
				<i class="Hui-iconfont">&#xe600;</i>
				 添加</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="courseManage-add-reset">
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				重置</button>
			</div>
		</div>
	</form>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
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
    
    //所有学期
    $(function(){
		$.ajax({
		    type:'post',
		    dataType:'json',
		    url:'${ctx}/semesterController/selectAllSemesters',
		    success:function(sysresult){
		    	if(sysresult.status==200){
		    	 	var str='';
		    		if(sysresult.data=='' || sysresult.data==null){
			    	str="<option>暂无学期，请先添加学期信息</option>";		    			
		    		}else{
		    		  for(var i=0;i<sysresult.data.length;i++){
		    			  var start = sysresult.data[i].startTimeToString.substring(0,sysresult.data[i].startTimeToString.indexOf(" "));
		    			  var end = sysresult.data[i].endTimeToString.substring(0,sysresult.data[i].endTimeToString.indexOf(" "));
		    			  str+='<option value='+sysresult.data[i].semesterName+'>'+sysresult.data[i].semesterName+'('+start+'~'+end+')</option>';
		    		  }
		    		  $('#semester').append(str);
		    		} 
		    	}
		    	
		    },
		    error:function(sysresult){
		    	console.log(sysresult)
		    }
			
		})
		
	})
    
    
</script>
<script type="text/javascript">
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var menuParam=GetQueryString("id")

$(function(){
	var menuParam = '${param.menuParam}${menuParam}';

	if("${menuParam}"=="3" || "${param.menuParam}"=="3"){
			menuParam=2;
		}
	var url = '';
	if(menuParam==2){
		url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/${param.menuParam}${menuParam}?callback=?';
	}else{
		url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/-1?callback=?'; 
	}
		//请求所有院系
		$.getJSON(url,function(sysresult){
			if(sysresult.status == 202||sysresult.status == 400){
				$("#departmentSelect option").html("无法查到您的院系信息");
			}else{
				var optioncontent = '';
				optioncontent = '<option name="name" value="" selected>请选择所属院系</option>';
					$("#departmentSelect").append(optioncontent);
				for(var i=0;i<sysresult.data.length;i++){
					optioncontent = '<option name="" value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
					$("#departmentSelect").append(optioncontent);
				}
			}
		});
		$(".selectStuNum").hide();
		$("#form-courseManage-add").Validform({
			btnSubmit:"#courseManage-add-sub", 
			btnReset:"#courseManage-add-reset",
			tiptype:2, 
			ignoreHidden:false,
			dragonfly:false,
			tipSweep:false,
			label:".label",
			showAllError:true,
			postonce:true,
			ajaxPost:false,
			datatype:{
				"*6-20": /^[^\s]{6,20}$/,
				"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
				"n-en" : /[0-9a-zA-Z]{1,23}/,
				"ch"   : /[\u4E00-\u9FA5]+$/,
				"number":/^[0-9]{1,3}$/
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
				var value = $("textarea[name='presentation']").val();
				value = value.replace(/\r\n/g, '<br/>').replace(/\n/g,'<br/>').replace(/\s/g,'&nbsp;'); 
				$("textarea[name='presentation']").val(value);
			},
			beforeSubmit:function(curform){
				//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
				//这里明确return false的话表单将不会提交;	
			}
		});
	})
	if('${status}' =='200'){
			layer.msg('添加成功!',{icon:1,time:1500});
			setTimeout('window.parent.location.reload()',1800);
		}else if('${status}' =='202'){
			layer.msg("${msg}",{icon:2,time:1800});
			setTimeout('window.location',2000);
			/* window.location.reload(); */
	}
	/* function selectStuNumChange(obj){
		var $obj = $(obj);
		var val = $obj.val();
		if(val==2){
			$(".selectStuNum").show();
		}else if(val==1){
			$(".selectStuNum").hide();
		}
	} */
	$(function(){
		$("#Validform_msg").addClass("hide_Validform");
	})
</script>