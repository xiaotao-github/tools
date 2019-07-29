var $step = $("#step");
var $index = $("#index");
var $num = 0;
var ueName = new Array();
var pageStyle = new Array(0,0,0,0,0);
var isSubmit = 0;
var stepSize = 0;
var standardSize = 0;


$step.step({
	index: 0,
	time: 200,
	title: ["实验信息", "实验步骤", "实验模板", "实验资源", "实验评分标准"]
});

$(window).resize(function(){
	$step.WResize();
})

var sPE = {
	init : function(){
		var l = $('.eachStep').length;
		for(var i=0;i<l;i++){
			var name = 'step-editor-'+($num*1);
			var n = 'ue'+($num*1);
			n = UE.getEditor(name,{
				toolbars: [[
		        'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
		        ]],
		        autoHeightEnabled: false,initialFrameHeight:200
			});
			this.ArrayAdd();
			$num = $num*1+1;
		}
	}, removeEditor : function(o,n){
		var name = 'step-editor-'+(n*1);
		UE.getEditor(name).destroy();
		this.ArrayDelete(n);
		$("#"+name).remove();
	}, addEditor : function(){
		var name = 'step-editor-'+($num*1);
		//console.log(name)
		var n = 'ue'+($num*1);
		n = UE.getEditor(name,{
			toolbars: [[
	        'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
	        ]],
	        autoHeightEnabled: false,initialFrameHeight:200
		});
		this.ArrayAdd();
		$num= $num+1;
	}, addStep : function(o){
		var $o = $(o),
			c = '<li class="eachStep" steporder="'+$num+'">'+
					'<div class="div fs-16 bc-white cl"><p class="stepSign fl" onclick="sPE.slideStep(this);">'+
						'<i class="Hui-iconfont fc-darkGreen pdl-5 pdr-5 fs-18" style="cursor:pointer;">&#xe698;</i>'+
						'<span class="fw-bold pdl-10 pdr-10 fc-white fs-14 bc-darkBlue radius">步骤</span></p>'+
						'<p class="controlBtn fr"><i class="Hui-iconfont fc-green" onclick="sPE.addStep(this);">&#xe604;</i><i class="Hui-iconfont fc-red" onclick="sPE.removeStep(this,'+$num+');">&#xe60b;</i></p>'+
					'</div>'+
					'<div style="clear:both;"></div>'+
					'<div class="stepContext pd-10 bc-gray">'+
						'<div><p>标题: </p><p><input type="text" class="input-text steptitlename"></p></div>'+
							'<input class="stepNum" type="hidden"  value="">'+
						'<div class="stepContainer"><div class="step-contain-editor"><p>内容: </p>'+
							'<div id="step-editor-'+$num+'" class="step-editor-content"  style="width: 100%;"></div>'+
						'</div><div class="step-plainTxt" style="display:none;">'+
							'<textarea  class="step-yourtext textarea-content1" name="contentTextList" ></textarea>'+
							'<textarea  class="textarea-content2" name="contentList" ></textarea>'+
						'</div></div>'+
					'</div>'+
				'</li>';
		$o.parents('.eachStep').after(c);
		var e = $o.parents('.eachStep').next().find('.stepSign');
		this.slideStep(e);
		this.reOrder('stepSign',0);
		this.addEditor();
	}, removeStep : function(o,n){
		var $o = $(o);
		//var name="step-editor-"+n;
		var e = $o.parents('.eachStep').prev().find('.stepSign');
		$o.parents('.eachStep').remove();
		this.removeEditor(o,n);
		this.slideStep(e);
		this.reOrder('stepSign',0);
		
	}, ArrayAdd : function(){
		ueName.push($num);
	}, ArrayDelete : function(v){
		for(var i=0;i<ueName.length;i++){
			if(ueName[i] == v){
				ueName.splice(i,1);
			}
		}
	}, slideStep : function(o){
		var $o = $(o);
		if($o.parent().siblings('.stepContext').is(":hidden")){
			$o.children('i').html('&#xe699;');
			$o.parent().siblings(".stepContext").slideDown();
			$o.parents(".eachStep").siblings().find('.stepSign').children('i').html('&#xe698;');
			$o.parents(".eachStep").siblings().find('.stepContext').slideUp();
		}else{
			$o.children('i').html('&#xe698;');
			$o.parent().siblings(".stepContext").slideUp();
		}
	}, reOrder : function(c,n){
		if(n==0){
			$('.'+c).each(function(index){
				$('.stepSign').eq(index).children('span').html('步骤'+(index/1+1));
				$('.stepNum').eq(index).attr('name','experimentSteps['+index+'].stepNum').val(index);
				$('.steptitlename').eq(index).attr('name','experimentSteps['+index+'].title');
//				$('.step-editor-content').eq(index).attr('name','contentList');
	//			$('.step-yourtext').eq(index).attr('name','contentTextList');
			})
		}else{
			$('.'+c).each(function(index){
				$('.'+c).eq(index).children('span').html(index/1+1);
				$('.standard-number').eq(index).attr('name','experimentStandards['+index+'].number').val(index);
				$('.standard-standTitle').eq(index).attr('name','experimentStandards['+index+'].standTitle');
				$('.standard-presentation').eq(index).attr('name','experimentStandards['+index+'].presentation');
				$('.standards-score').eq(index).attr('name','experimentStandards['+index+'].score');

				
			})
		}
	}, checkPage: function(n){
		switch (n){
			case 0 :
				pageStyle[0] = 1;
				changePage(1);
				break;
			case 1 :
				var flag = 0;
				for(var i = 0;i<$('.eachStep').length;i++){
					var a,b,c,
						p = $('.eachStep').eq(i).attr('steporder');
					a = this.getEditorContent(p);
					b = this.getEditorText(p);
					c = this.getStepTitle(p);
					b = (b.replace(" ","")).replace('\n',"");
					if(b != "" && b != null && c != "" && c!= null){
						flag = 1;
					}else{
						flag = 0;
						alert('请完成内容的填写!');
						return false;
					}
					//console.log(flag)
				}
				if(flag==1){
					pageStyle[1] = 1;
					changePage(2);
				}
				break;
			case 2 :
				var a, b,
					p = 'templateDetail';
				a = this.getEditorContent(p);
				b = this.getEditorText(p);
				b = (b.replace(" ","")).replace('\n',"");
				if(b != "" && b != null){
					pageStyle[2] = 1;
					changePage(3);
				}else{
					alert('请完成内容的填写!');
					return false;
				}
				break;
			case 3 :
				var a,b;
				a = $('.experiment-instructor').val();
				b = $('.experiment-trueAnswer').val();
				if(a!=''){
					 var typeA = a.substring(a.lastIndexOf(".")+1,a.length).toLowerCase();
					 //var typeB = b.substring(b.lastIndexOf(".")+1,b.length).toLowerCase();
					 if((typeA=='doc' || typeA=='docx')){
						     pageStyle[3] = 1;
							changePage(4);
							return false;
					 }else{
						 alert('实验指导书必须是doc或docx格式');
					 }
					 
				}else{
				    pageStyle[3] = 1;
					changePage(4);
					return false;
				}
				break;
			case 4 :
				var f1 = 0, f2 = 0;
				$('.eachStandard').each(function(i){
					var a = $('.eachStandard').eq(i).find('textarea').val(),
						b = $('.eachStandard').eq(i).find('input[type="text"]').val();
					if((a.replace(" ","")).replace('\n',"")==''){
						f1 = 0;
						$('.eachStandard').eq(i).find('textarea').focus();
						return false;
					}else{
						f1 = 1;
					}
					if((b.replace(" ","")).replace('\n',"")==''){
						f2 = 0;
						$('.eachStandard').eq(i).find('input[type="text"]').focus();
						return false;
					}else{
						f2 = 1;
					}
				})
				//console.log(f1+'     '+f2)
				var flag = f1*f2;
				if(flag != 0){
					pageStyle[4] = 1;
				}
				return pageStyle[4];
				break;
			default:
				console.log('第一页')
		}
	}, getEditorText : function(n){
		if(isNaN(n)==false){
			var o = 'step-editor-'+n;
		}else{
			var o = n;
		}
		//console.log(o);
		var c = UE.getEditor(o).getPlainTxt();
		return c;
	}, getEditorContent : function(n){
		if(isNaN(n)==false){
			var o = 'step-editor-'+n;
		}else{
			var o = n;
		}
		//console.log(o);
		var c = UE.getEditor(o).getContent();
		return c;
	}, getStepTitle : function(n){
		var c = "";
		$('.eachStep').each(function(index){
			if($('.eachStep').eq(index).attr('stepOrder') == n){
				c = $(".steptitlename").eq(index).val();
			}
		})
		return c;
	}, initOtherEditor : function(c){
		var name = c,
			n = 'editor-'+n;
		n = UE.getEditor(name,{
			toolbars: [[
	        'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
	        ]],
	        autoHeightEnabled: true,initialFrameHeight:400
		});
	}, addStandard : function(o){
		var $o = $(o);
		var content = '<tr class="eachStandard"><td width="30" class="text-c standardOrder">'+
							'<span>1</span>'+
							'<i class="add Hui-iconfont c-green" onclick="sPE.addStandard(this);">&#xe604;</i>'+
							'<i class="del Hui-iconfont c-red" onclick="sPE.delStandard(this);">&#xe706;</i>'+
							'</td><td width="120" class="text-r">'+
							'<input type="hidden" class="standard-number" name="" value=""/>'+
							'<textarea name="" class="standard-standTitle" id=""></textarea>'+
						'</td><td width="120" class="text-r">'+
							'<textarea name="" class="standard-presentation" id=""></textarea>'+
						'</td><td width="30" class="text-c">'+
							'<input type="text" name="" class="text-c standards-score">'+
						'</td></tr>';
		$o.parents('tr').after(content);
		this.reOrder('standardOrder',1);	

	}, delStandard : function(o){
		var $o = $(o);
		$o.parents('tr').remove();
		this.reOrder('standardOrder',1);	
	}, submit : function(){
		var n = this.checkPage(4);
		if(n==1){
			var index = layer.load(1,{
				shade : [0.8,'#fff']
			});
			isSubmit = 1;
			$('#form-experimentManage-add').submit();
			changePage(4);
		}else{
			layer.msg('请完成内容的填写!');
		}
	}, callBack : function(data){
		setTimeout(function(){
			layer.closeAll('loading');
		},1500)
	}, addThisPlainTxt : function(n,i){
		//alert("hi:"+i);
		var content1 = this.getEditorText(n);
		var content2 = this.getEditorContent(n);
		$('.eachStep').each(function(){
			$('.step-plainTxt').eq(i).children('.textarea-content1').html(content1);
			$('.step-plainTxt').eq(i).children('.textarea-content2').html(content2);
			//console.log(content);
		})
	}, initStepTwoPlainTxt : function(){
		var flag = 0;
		for(var i = 0;i<$('.eachStep').length;i++){
			var n = $('.eachStep').eq(i).attr('stepOrder');
			var a = this.getEditorContent(n),
				b = this.getEditorText(n),
				c = this.getStepTitle(n);
			b = (b.replace(" ","")).replace('\n',"");
			if(b != "" && b != null && c != "" && c!= null){
				this.addThisPlainTxt(n,i);
				flag = 1
			}else{
				flag =0;
				layer.msg('步骤内容不能为空! ');
				return false;
			}
		}
		return flag;
	}
}

var sPEE = {
	checkForm : function(n){
		switch (n){
			case 0 :
				$('#form-experimentManage-edit').submit();
				break;
			case 1 :
				var flag = 0;
				for(var i = 0;i<$('.eachStep').length;i++){
					var a,b,c,
						p = $('.eachStep').eq(i).attr('steporder');
					a = this.prototype.getEditorContent(p);
					b = this.prototype.getEditorText(p);
					c = this.prototype.getStepTitle(p);
					b = (b.replace(" ","")).replace('\n',"");
					if(b != "" && b != null && c != "" && c!= null){
						this.prototype.addThisPlainTxt(p,i);
						flag = 1;
					}else{
						flag = 0;
						layer.msg('请完成内容的填写!');
						return false;
					}
				}
				if(flag==1){
					$('#form-experimentStep-edit').submit();
				}else{
					layer.msg('步骤标题以及内容不能为空!');
				}
				break;
			case 2 : 
				var a, b,
					p = 'templateDetail';
				a = this.prototype.getEditorContent(p);
				b = this.prototype.getEditorText(p);
				b = (b.replace(" ","")).replace('\n',"");
				if(b != "" && b != null){
					$('#form-experimentTemplate-edit').submit();
				}else{
					layer.msg('请完成内容的填写!');
					return false;
				}
				break;
			case 3 :
				var a,b;
				a = $('.experiment-instructor').val();
				b = $('.experiment-trueAnswer').val();
				if(a!='' || b!=''){
					$('#form-experimentTemolate-edit').submit();
				}else{
					layer.msg('请上传实验指导书或标准答案!');
					return false;
				}
				break;
			case 4 :
				var f1 = 0, f2 = 0;
				$('.eachStandard').each(function(i){
					var a = $('.eachStandard').eq(i).find('textarea').val(),
						b = $('.eachStandard').eq(i).find('input[type="text"]').val();
					if((a.replace(" ","")).replace('\n',"")==''){
						f1 = 0;
						$('.eachStandard').eq(i).find('textarea').focus();
						return false;
					}else{
						f1 = 1;
					}
					if((b.replace(" ","")).replace('\n',"")==''){
						f2 = 0;
						$('.eachStandard').eq(i).find('input[type="text"]').focus();
						return false;
					}else{
						f2 = 1;
					}
				})
				var flag = f1*f2;
				if(flag != 0){
					$('#form-experimentStandaerd-edit').submit();
				}else{
					layer.msg('请完成评分标准的填写! ');
				}
				break;
			default:
				console.log('第一页');
				break;
		}
	},	pageSubmit : function(n){
		this.checkForm(n);
	}
}

sPEE.prototype = sPE;


function changePage(num){
	if(pageStyle[num-1]==0){
		sPE.checkPage(num-1);
	}else{
		if($step.getIndex()==1){
			var a = sPE.initStepTwoPlainTxt();
			if(a==1){
				$step.toStep(num);
				for(var i=0;i<=num;i++){
					$('.ui-step-item-num').eq(i).children('span').attr('onclick','changePage('+i+')').css('cursor','pointer');
				}
				$('.step-page').eq(num).addClass('active')
				$('.step-page').eq(num).siblings().removeClass('active');
			}else{
				layer.msg('步骤内容不能为空! ');
			}
		}else{
			$step.toStep(num);
			for(var i=0;i<=num;i++){
				$('.ui-step-item-num').eq(i).children('span').attr('onclick','changePage('+i+')').css('cursor','pointer');
			}
			$('.step-page').eq(num).addClass('active')
			$('.step-page').eq(num).siblings().removeClass('active');
		}
	}
}

changePage(0);

function Trim(str,is_global)

{

    var result;

    result = str.replace(/(^\s+)|(\s+$)/g,"");

    if(is_global.toLowerCase()=="g")

    {

        result = result.replace(/\s/g,"");

     }

    return result;

}



function onPage(num){
	$step.onStep(num);
	$('.step-page').eq(num).addClass('active')
	$('.step-page').eq(num).siblings().removeClass('active');
}


//添加实验基本信息校验(只校验 不提交)
$('#form-experimentManage-add').Validform({
	btnSubmit:".nBtn1", 
	tiptype:2, 
	label:".label",
	showAllError:false,
	postonce:true,
	ajaxPost:false,
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
		if(isSubmit!=1){
			changePage(1);
			return false;
		}else{
			console.log(1321);
		}

	},
	callBack: function(sysresult){
		sPE.callBack(sysresult);
	}
})

//修改实验基本信息提交
$('#form-experimentManage-edit').Validform({
	btnSubmit:".nBtn1", 
	tiptype:2, 
	label:".label",
	showAllError:false,
	postonce:true,
	ajaxPost:false,
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
	callBack : function(sysresult){
	}
})