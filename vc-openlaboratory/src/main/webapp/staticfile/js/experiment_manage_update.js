var ue = UE.getEditor('experimentEditor',{
	toolbars: [[
    'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
    ]],
    autoHeightEnabled: false,initialFrameHeight:200
});

/*if(editType == 1){
	
}*/

//添加实验基本信息校验(只校验 不提交)
$('#form-experimentManage-edit').Validform({
	btnSubmit:".submitBtn", 
	tiptype:2, 
	label:".label",
	showAllError:false,
	postonce:true,
	ajaxPost:true,
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
	callback: function(data){
		console.log(1111);
		if(data.status == 200){
			layer.close();
			window.parent.location.reload();
		}else{
			   layer.msg('删除错误');

		}
		$('#Validform_msg').css('display','none');
	}
})
