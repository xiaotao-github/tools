/**
 * 
 */

/*-------------------静态页面测试数据 start /接入数据时 请删除-------------------*/
//var sysresult = new Object();
//sysresult.data = new Array(0,1,2,3,4,5);
/*-------------------静态页面测试数据 end /接入数据时 请删除---------------------*/

function getDepartment(){
	/*$.ajax({
		type: 'GET',
		url: manageUrl+'/departmentController/selectAllDepartmentByUserId/'+userId,
		dataType: 'JSON',
		success: function(sysresult){
			if(sysresult.status == 200){
				var optioncontent = '<option value="">- 请选择院系 -</option>';
				for(var i=0;i<sysresult.data.length;i++){
					optioncontent += '<option value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
				}
				$("#departmentSelect").html(optioncontent);
			}else{
				$("#departmentSelect").html('<option value="" disabled="disabled">- 暂无可选院系 -</option>');				
			}
		},
		error: function(sysresult){
			layer.msg('连接服务器失败!');
		}
	})
	*/
	//请求所有院系
	var url =manageUrl+'/departmentController/selectAllDepartmentByUserId/'+userId+'?callback=?';
	$.getJSON(url,function(sysresult){
		if(sysresult.status == 200){
			var optioncontent = '<option value="">- 请选择院系 -</option>';
			if(sysresult.data.length>0){
				for(var i=0;i<sysresult.data.length;i++){
					optioncontent += '<option value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
				}
			}else{
				optioncontent +='<option value="" disabled="disabled">- 暂无可选院系 -</option>';	
			}
			$("#departmentSelect").html(optioncontent);
		}else {
			layer.msg(sysresult.msg);
		}
	});
}

$(function(){
	
	getDepartment();
	$('#departmentSelect').on('change',function(){
		var departmentId =$("#departmentSelect").find("option:selected").val(); 
		url =manageUrl+'/majorController/selectMajorsByDepartmentId/'+departmentId+'?callback=?';
		$.getJSON(url,function(sysresult){
			if(sysresult.status == 200){
				var optioncontent = '<option value="">- 请选择专业 -</option>';
				if(sysresult.data.length>0){
					
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent += '<option value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
					}
				}else{
					optioncontent +='<option value="" disabled="disabled">- 暂无可选专业 -</option>';	
				}
				$("#majorSelect").html(optioncontent);
			}else if(sysresult.status == 202){
				var optioncontent = '<option value="">- 请选择专业 -</option>';
				$("#majorSelect").html(optioncontent);
				layer.msg(sysresult.msg);	
			}
		});
		/*$.ajax({
			type: 'GET',
			url: '',
			dataType: 'JSON',
			success: function(sysresult){
				if(sysresult.status == 200){
					var optioncontent = '<option value="">- 请选择专业 -</option>';
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent += '<option value="'+'1111'+'">'+'电子信息工程'+'</option>';
					}
					$("#majorSelect").html(optioncontent);
				}else{
					$("#majorSelect").html('<option value="" disabled="disabled">- 无可选择专业 -</option>');
				}
			},
			error: function(sysresult){
				layer.msg('连接服务器失败!');
			}
		})*/
	})
	
	$('#majorSelect').on('change',function(){
		
		var majorId =$("#majorSelect").find("option:selected").val(); 
		url =manageUrl+'/gradeController/selectGradesByMajorId/'+majorId+'?callback=?';
		
		$.getJSON(url,function(sysresult){
			if(sysresult.status == 200){
				var optioncontent = '<option value="">- 请选择年级 -</option>';
				if(sysresult.data.length>0){
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent += '<option value="'+sysresult.data[i].id+'">'+sysresult.data[i].name+'</option>';
					}
				}else{
					optioncontent +='<option value="" disabled="disabled">- 无可选择年级 -</option>';	
				}
				$("#gradeSelect").html(optioncontent);
			}else {
				var optioncontent = '<option value="">- 请选择年级 -</option>';
				$("#gradeSelect").html(optioncontent);
				layer.msg(sysresult.msg);
			}
		});
		
		/*$.ajax({
			type: 'GET',
			url: '',
			dataType: 'JSON',
			success: function(sysresult){
				if(sysresult.status == 200){
					var optioncontent = '<option value="">- 请选择年级 -</option>';
					for(var i=0;i<sysresult.data.length;i++){
						optioncontent += '<option value="'+'1111'+'">'+'2016级'+'</option>';
					}
					$("#gradeSelect").html(optioncontent);
				}else{
					$("#gradeSelect").html('<option value="" disabled="disabled">- 无可选择年级 -</option>');
				}				
			},
			error: function(sysresult){
				layer.msg('连接服务器失败!');
			}
		})*/
	})
	
	$('#gradeSelect').on('change',function(){
		
		var gradeId =$("#gradeSelect").find("option:selected").val(); 
		url =manageUrl+'/tbClassController/selectClassesByGradeId/'+gradeId+'?callback=?';
		
		$.getJSON(url,function(sysresult){
			if(sysresult.status == 200){
				var listContent = '';
				for(var i=0;i<sysresult.data.length;i++){
					if(i == 0){
						listContent += '<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="'+sysresult.data[i].id+'" datatype="*" nullmsg="请选择需要导入的班级！"><span>'+sysresult.data[i].name+'</span></label>';
					}else{
						listContent += '<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="'+sysresult.data[i].id+'"><span>'+sysresult.data[i].name+'</span></label>';
					}
				}
				$("#classesCheck").html(listContent);
			}else {
				var listContent = '';
				$("#classesCheck").html(listContent);
				layer.msg(sysresult.msg);
			}
		});
		
		/*$.ajax({
			type: 'GET',
			url: '',
			dataType: 'JSON',
			success: function(sysresult){
				if(sysresult.status == 200){
					var listContent = '';
					for(var i=0;i<sysresult.data.length;i++){
						if(i == 0){
							listContent += '<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="1" datatype="*" nullmsg="请选择需要导入的班级！"><span>电子信息工程1班</span></label>';
						}else{
							listContent += '<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="'+'111'+'"><span>'+'班级名称'+'</span></label>';
						}
					}
					$("#classesCheck").html(listContent);
				}else{					
					$("#classesCheck").html('<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="" datatype="*" nullmsg="请选择需要导入的班级！" disabled="disabled"><span>无可选班级</span></label>');
				}
			},
			error: function(sysresult){
				layer.msg('连接服务器失败!');				
			}
		})*/
	})
	
	$("#attendanceUserAdd-form").Validform({
		btnSubmit:"#attendanceUserAddSub",
		btnReset:"#attendanceUserReset",
		tiptype:function(msg,o,cssctl){
			if(o.obj.is('input[name="classId"]')){
		        var objtip=o.obj.parent().parent().siblings().children(".Validform_checktip");
			}else{
				var objtip=o.obj.parent().siblings().children(".Validform_checktip");
			}
			cssctl(objtip,o.type);
			objtip.text(msg);
	    },
		ignoreHidden:false,
		dragonfly:false,
		tipSweep:false,
		label:".label",
		showAllError:true,
		postonce:true,
		ajaxPost:true,
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
		},
		beforeSubmit:function(curform){
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		},
		callback: function(sysresult){
			//console.log(sysresult);
			if(sysresult.status == 200){
				layer.msg('已提交请求!',{icon:1,time:1500});
				var loadingLayer = layer.load(1);
				layer.close(loadingLayer);
				setTimeout('window.parent.location.reload()',1800);
			}else{
				layer.msg(sysresult.msg);
			}
		}
	});
})