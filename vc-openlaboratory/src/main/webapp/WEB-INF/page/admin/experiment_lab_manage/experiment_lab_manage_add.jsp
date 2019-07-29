<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />

<style type="text/css">
	.cl:after,.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.cl,.clearfix{zoom:1}
	.teacheCheckArraign{}
	.check_teacher_department{padding-bottom:10px;}
	.check_teacher_department p{height:21px;line-height:20px;font-size:14px;padding:5px; cursor:pointer;margin:0;background:#4ca3bc;color:#fff;}
	.check_teacher_department p span{display:block;float:left;}
	.check_teacher_department p .drop{float:right;}
	.check_teacher_department p .drop img{height:20px;padding:0 5px;}
	.check_teacher_department ul{border-bottom:1px solid #d8d8d8;padding:10px;display:none;}
	.check_teacherName{display:block;float:left;padding:0 10px;width:75px;}
	.hide_Validform{
		display: none !important;
	}
	.row{margin-left:0;margin-right:0;}
</style>
</head>
<body>
	<form action="${ctx}/experimentLabController/add" method="post" enctype="multipart/form-data"  id="form-experiment-lab-add" class="form">
	<input type="hidden" name="labManagerIds" value="">
	<input type="hidden" name="labDescription" value="">
		
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验室编号：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text"  placeholder="请填写实验室编号！" value="${data.labNumber }" name="labNumber" datatype="*" 
					nullmsg="请输入实验室编号！" errormsg="实验室编号不可用！请重新输入" ajaxurl="${ctx }/experimentLabController/vaildateNumber/-1">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验室名称：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text"  placeholder="请填写实验室名称！"  name="labName" datatype="*" 
					nullmsg="请输入实验室名称！" errormsg="实验室名称不可用！请重新输入" ajaxurl="${ctx }/experimentLabController/vaildateName/-1">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
			
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验室座位数：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text"  placeholder="请填写座位数!"  name="labSeat"  datatype="number" nullmsg="请输入实验室座位数">
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		
		<c:if test="${menuParam!=3 }">
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验室负责人：</label>
				<ul class="teacheCheckArraign col-xs-8 col-sm-8">
					<c:forEach items="${departmentList }" var="department">
						<li class="check_teacher_department">
							<p class="clearfix"><span>${department.name }</span><span class="drop"><img alt="" src="${ctx }/staticfile/images/drop1.png"></span></p>
							<ul class="clearfix">
								<c:forEach items="${department.teacherInfoList }" var="teacherInfo">
									<li class="check_teacherName">
										<label><input type="checkbox" name="teacherInfoIds"  <c:if test="${teacherInfo.isSelected ==1 }">checked="checked"</c:if> value="${department.id },${teacherInfo.id }">${teacherInfo.name }</label>
									</li>
								</c:forEach>
							</ul>
						</li>
					</c:forEach>
				</ul>
			</div>
		</c:if>
		<c:if test="${menuParam == 3 }">
			<input type="hidden" name="teacherInfoIds" value="${teacherInfo.id }">
		</c:if>
		
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">是否指定院系：</label>
			<div class="formControls col-xs-8 col-sm-8"> 
				<div>
					<!-- <select name="departmentId" datatype="*" class="select select-box" id="departmentSelect" nullmsg="请选择实验室归属！" errormsg="请选择实验室归属！" ignore="ignore"></select> -->
					<select name="departmentId" datatype="*" class="select select-box" id="departmentSelect" nullmsg="请选择实验室归属！" errormsg="请选择实验室归属！"></select>
					
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div>
		
		<!-- <div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">视频流：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" name="videoStream">
				</div>
			</div>
		</div> -->
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>实验室状态：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<label class="pl-5 pr-5"><input type="radio" name="labStatus" value="1" checked="checked"><span>可用</span></label>
					<label class="pl-5 pr-5"><input type="radio" name="labStatus" value="2"><span>维护中</span></label>
				</div>
			</div>
		</div>
		
		<div class="row cl">
	        <label class="col-xs-3 col-sm-3 pn-0 text-r">选择封面：</label>
	        <div class="formControls col-xs-8 col-sm-8">
	            <div class="col-xs-2 col-sm-2" style="width:100px;height:100px;float:left;padding:0;"><img id="ImgPr" src="" style="width:100%;height:100%;display:block;"></div>
	            <div class="col-xs-8 col-sm-8">
		            <input id="up" type="file" name="photoFile" title="选择实验室封面" style="display:block;float:left;">
		            <p style="display:block;clear:both;">仅支持格式：JPG、PNG、GIF、JPEG、BMP</p>
		        </div>
	        </div>
        </div>
		
	 	<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">实验室介绍：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<textarea name="labDescription1" cols="" rows="" class="textarea"  placeholder="请输入实验室介绍..." dragonfly="true"  onKeyUp="$.Huitextarealength(this,500)" ignore="ignore"></textarea>
					<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
				</div>
				<div class="cl">
					<span class="Validform_checktip"></span>
				</div>
			</div>
		</div> 
		<div class="row cl pt-10" style="border-top:1px solid #eee;">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red">*</span>提示：</label>
			<div class="col-xs-8 col-sm-8 c-red">若该实验室为智慧实验室,请填写以下内容!</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">网关id：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" name="mainframeId">
				</div>
			</div>
		</div>
		
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">网关密码：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" name="mainframeKey">
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r">网关设备id：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" class="input-text" name="deviceId">
				</div>
			</div>
		</div>
		
		<div class="row cl">
			<div class="col-xs-12 col-sm-12 text-c">
				<button onClick="" class="btn btn-primary radius" type="" id="experiment-lab">
				<i class="Hui-iconfont">&#xe600;</i>
				 添加</button>
				<button onClick="" class="btn btn-secondary radius" type="button" id="experiment-lab-add-cancal">
				<!-- <i class="Hui-iconfont">&#xe68f;</i>  -->
				<i class="iconfont icon-zhongzhi2"></i>
				取消</button>
			</div>
		</div>
	</form>
</body>
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

$("#up").uploadPreview({Img: "ImgPr"}); 
</script>
<script type="text/javascript">
$(function(){
	$("#Validform_msg").addClass("hide_Validform");
	
	$(".check_teacher_department p").toggle(function(){
		$(this).parent().children('ul').slideDown();
		$(this).children('.drop').html('<img src="${ctx}/staticfile/images/up1.png">');
	},function(){
		$(this).parent().children('ul').slideUp();
		$(this).children('.drop').html('<img src="${ctx}/staticfile/images/drop1.png">');
	});
	
	$(".check_teacher_department p").eq(0).click();

	if('${status}' =='200'){
		layer.msg('添加成功!',{icon:1,time:1500});
		setTimeout('window.parent.location.reload()',1800);
	}else if('${status}' =='202'){
		layer.msg("${msg}",{icon:2,time:1800});
		setTimeout('window.location',2000);
	}
	
	
	
})


$(function(){
	$(".selectStuNum").hide();
	
	$("#form-experiment-lab-add").Validform({
		btnSubmit:"", 
		btnReset:"",
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
			getAllCheckedTeacher();
			var value = $("textarea[name='labDescription1']").val();
			value = value.replace(/\r\n/g, '<br/>').replace(/\n/g,'<br/>').replace(/\s/g,'&nbsp;'); 
			$("input[name='labDescription']").val(value);
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		}
	});
	
	//获取院系
	getAllDepartment();
})

//获取所有选中的教师
function getAllCheckedTeacher(){
	var ids = new Array();//所有选中的教师id
	$("input[name='teacherInfoIds']:checked").each(function(){
		var str = $(this).val().split(",");
		ids.push(str[1]);
	})
	$("input[name='labManagerIds']").val(ids+"");
}




function getAllDepartment(){
	var menuParam = '${menuParam}';
	var ordinary = "<option  value='-1' selected>-通用实验室-</option>";
	var optioncontent = '';
	if(menuParam=="3"){
		optioncontent += ordinary;
		optioncontent += '<option value=${teacherInfo.department.id}>${teacherInfo.department.name }</option>';
		$("#departmentSelect").html(optioncontent);
	}else{
		var url = '';
		if(menuParam==2){
			url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/${param.menuParam}${menuParam}?callback=?';
		}else{
			url ='${MANAGE_URL}/departmentController/selectAllDepartmentReturnSysResult/-1?callback=?'; 
		}
		//请求所有院系
		$.getJSON(url,function(sysresult){
			 if(sysresult.status == 202||sysresult.status == 400){
				$("#departmentSelect").html("<option  disabled='disabled'>无法查到您的院系信息</option>");
			}else{
				optioncontent += ordinary;
				for(var i=0;i<sysresult.data.length;i++){
					optioncontent += '<option value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
				}
				$("#departmentSelect").append(optioncontent);
			} 
		});
	}
}
</script>
</html>