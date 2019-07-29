/*-----------------------------------wordlimit---------------------------------*/
	function wordlimit(cname,wordlength,isOpen){
		var cname=$("."+cname);
		for(var i=0;i<cname.length;i++){
			var nowLength=cname[i].innerHTML.length;
			var content = cname[i].innerHTML;
			if(nowLength>wordlength){
				if(isOpen==0){
					cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
				}else if(isOpen==1){
					cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+'. . . . . . <a href="##" onClick="openMore(\''+content+'\');" style="color:#50a5be">[展开]</a>';
				}else if(isOpen==2){
					$(cname[i]).parent().append('<br/><span class="moreIntro"><a href="##" onClick="moreIntro(\''+content+'\');">查看更多+</a></span>');
					cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
				}saveBtn
			}
		}
	}
	//去空格
	function Trim(str){ 
	    return str.replace(/(^\s*)|(\s*$)/g, ""); 
	}

/*---------------------------------------- 不同条件下 自动批改 部分------------------------------------*/
	var experimentStatus = 2;
	var labReport = $('.labReport.hideTable').html();
	var submitStatus = 1;
	//var stuFill =stuExperimentReport;
	//submitStatus; 提交状态 ，2：待批改、3：已批改
	//experimentStatus 1：未开始、2：进行中、3：已过期
	var trueAnswer = new Array();
	var stuAnswer = new Array();
	if(submitStatus==2||submitStatus==3){
		//$('#report-editor').parent().append('<div class="testCtrPart hideTable pd-20"><p class="pdb-10 fs-16 fw-bold">实验报告</p>'+dasdasddadad+'</div>');
		$('.fileuploadPart').hide();
		$('.filecontrolPart').css({'margin':0,'border':'1px solid #ccc','width':'100%'});
		$('.filecontrolPart').find('.icon-del').remove();
		//$('.report-submitPart').remove();
	}else{
		if(experimentStatus==1){
			var totalNum = 0;
			var trueNum = 0;
			$('.questionText').html($('.testCtrPart').html());
			var tds_teach = new Array();
			teachAnswerInit(tds_teach);
			getQuestionText();
			$(".testCtrPart").html($(".questionText"));
			}
		else if(experimentStatus==2 ||submitStatus ==4){
			$('.report-answerAndResultPart').remove();
			initUeditor();
		}else{
			var totalNum = 0;
			var trueNum = 0;
			$('.questionText').html($('.testCtrPart').html());
			var tds_teach = new Array();
			teachAnswerInit(tds_teach);
			getQuestionText();
			$(".testCtrPart").html($(".questionText"));
		}
	}
	
	var ue;
	function initUeditor(){
		var totalNum = 0;
		var trueNum = 0;
		ue = UE.getEditor('report-editor',{
			toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
	        ]],
	        autoHeightEnabled: false,initialFrameHeight:550,initialFrameWidth:743
		});
		//var teacherFill = '<table><tbody><tr class="firstRow"><td style="padding:0 7px;border-width:1px;border-style:solid;border-color:windowtext" width="114" valign="top"></td><td style="padding:0 7px;border-left:medium none" width="114" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">Vb(V)</span></p></td><td style="padding:0 7px;border-left:medium none" width="160" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">Ve(V)</span></p></td><td style="padding:0 7px;border-left:medium none" width="128" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">Vc(V)</span></p></td><td style="padding:0 7px;border-left:medium none" width="247" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">Ie =Ve/Re</span></p></td></tr><tr><td style="padding:0 7px;border-left:1px solid windowtext;border-right:1px solid windowtext;border-top:medium none" width="114" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">理论值</span></p></td><td style="padding:0 7px;border-left:medium none" width="114" valign="top">&nbsp;&nbsp;&nbsp;&nbsp; #[12.5]#</td><td style="padding:0 7px;border-left:medium none;word-break:break-all" width="154" valign="top"><p>#[1.20~1.30]#</p></td><td style="padding:0 7px;border-left:medium none" width="128" valign="top">#[1]#<br></td><td style="padding:0 7px;border-left:medium none" width="247" valign="top">#[5.0～5.1]#<br></td></tr><tr><td style="padding:0 7px;border-left:1px solid windowtext;border-right:1px solid windowtext;border-top:medium none" width="114" valign="top"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-autospace:ideograph-numeric;text-align:center;line-height:27px"><span style=";font-family:黑体;font-size:16px">实测值</span></p></td><td style="padding:0 7px;border-left:medium none" width="114" valign="top">#[12.5]#</td><td style="padding:0 7px;border-left:medium none" width="160" valign="top">#[1.25]#</td><td style="padding:0 7px;border-left:medium none" width="128" valign="top">#[3.14]#</td><td style="padding:0 7px;border-left:medium none" width="247" valign="top"><p>#[5.06]#</p></td></tr></tbody></table>';
		//20171206
	/*	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
		UE.Editor.prototype.getActionUrl = function(action) {
			//判断路径   这里是config.json 中设置执行上传的action名称
		    if (action == 'uploadimage') {
		        return ctx+'/ueditorUploadFileController/upload?foldName='+ueditFilePath;
		    } else if (action == 'uploadvideo') {
		        return '';
		    } else {
		        return this._bkGetActionUrl.call(this, action);
		    }
		}*/
		
		// $(".test123").click(function(){
		// 	$('.testCtrPart').html(ue.getContent());
		// 	var tds = new Array();
		// 	answerInit(tds);
		// })
		ue.addListener('ready',function(){
			var content = ue.getContent();
			$('.teachCtrPart').html(content);
			$('.questionText').html(content);
			var tds_teach = new Array();
			teachAnswerInit(tds_teach);
			getQuestionText();
			if(labReport!=''){
				ue.setContent(labReport,false);
			}else{
				ue.setContent($('.questionText').html(),false);
			}
		});
	}

	function answerInit(tds){
		$(".testCtrPart td").each(function(){
			tds.push($(this).html());
		})
		for(var i =0;i<tds.length;i++){
			stuAnswer.push(tdCut(tds[i]));
		}
		answerCheck();
	}
	function teachAnswerInit(tds){
		$(".teachCtrPart td").each(function(){
			tds.push($(this).html());
		})
		for(var i =0;i<tds.length;i++){
			trueAnswer.push(tdCut(tds[i]));
		}
	}
	function answerCheck(){
		for(var i = 0;i<trueAnswer.length;i++){
				if(trueAnswer[i]!='' && trueAnswer[i]!=null ){
					totalNum++;
					if(trueAnswer[i]==(stuAnswer[i])){
						trueNum++;
						$(".testCtrPart td").eq(i).addClass('true');
					}else{
						var strSign = trueAnswer[i].indexOf('~');
						var strSign1 = trueAnswer[i].indexOf('～');
						if(strSign!=-1){
							var a = trueAnswer[i].substring(0,strSign)*1;
							var b = trueAnswer[i].substring(strSign+1,trueAnswer[i].length)*1;
							if(stuAnswer[i]>=a&&stuAnswer[i]<=b){
								trueNum++;
								$(".testCtrPart td").eq(i).addClass('true');
							}else{
								$(".testCtrPart td").eq(i).addClass('wrong');
							}
						}else if(strSign1!=-1){
							var a = trueAnswer[i].substring(0,strSign1)*1;
							var b = trueAnswer[i].substring(strSign1+1,trueAnswer[i].length)*1;
							if(stuAnswer[i]>=a&&stuAnswer[i]<=b){
								trueNum++;
								$(".testCtrPart td").eq(i).addClass('true');
							}else{
								$(".testCtrPart td").eq(i).addClass('wrong');
							}
						}else{
							$(".testCtrPart td").eq(i).addClass('wrong');
						}
					}
				}
			}
		var score = (trueNum/totalNum)*100.0;
	}
	function getQuestionText(){
		$(".questionText td").each(function(){
			if($(this).html().indexOf('#[')!=-1){
				$(this).html('#[]#');
			}
		})
	}
	function tdCut(data){
		var result = '';
		data = $.trim(data);
		data = data.replace(/(^\s*)|(\s*$)/g,'');//在截取之前也去一下空格。
		var startSign = data.indexOf('#[')+2;
		var endSign = data.indexOf(']#');
		if((startSign!=-1)&&(endSign!=-1)){
			result = data.substring(startSign,endSign);
			result = $.trim(result);
			result = result.replace(/(^\s*)|(\s*$)/g,'');
		}
		return result;
	}


	/*----------------------------------------------动态图上传部分-----------------------------------------*/
	jQuery.fn.extend({
        uploadPreview: function (opts) {
            var _self = this,
                    _this = $(this);
            opts = jQuery.extend({
                Img: "ImgPr",
                Width: 100,
                Height: 100,
                ImgType: ["gif"],
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
                        layer.msg("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "类型");
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
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0])).css('background','#fff');
                    }
                    opts.Callback()
                }
            })
        }
    }); 

    $(function () {
        $("#up").uploadPreview({Img: "ImgPr"});
    }); 

    function previewGif(obj){
    	var url = $(obj).siblings('img').attr('src');
    	$('.previewGif').children('img').attr('src',url);
    	var index = layer.open({
			type:1,
			content:$(".previewGif"),
			title:false,
			area:['600px','450px']
		});
    }

    function showUrl(obj){
    	var url = $(obj).val();
    	$(obj).parents('.attachmentUploadBtn').siblings('.attachmentUploadPath').children('input').val(url);
    }


	/*--------------------------------------------- 保存和提交部分 ------------------------------------------*/

	$('.saveBtn').off().on('click',function(){
		
		/*var l = $('.filecontrolPart .gif').length;
		if(l == 0){
			var a = $('.getGif').children('input').val();
			if((a.indexOf('.gif')!=-1)&&(a!='')){
				var b = getReportDoc();
				$('#print').val(b);
				$('#submitStatus').val(1);
				$('.submitBtn').click();
			}else{
				layer.alert('请上传实验结果动态图', {
					  skin: 'layui-layer-molv'
					  ,title:'温馨提示'
					  ,closeBtn: 0
					}
				);
			}
		}else{*/
		layer.confirm('确定要保存该实验吗?',{btn: ['确定','取消'],title:"保存实验", skin:'layui-layer-molv'},function(index){
			var b = getReportDoc();
			$('#stuResult').val(b);
			$('#submitStatus').val(1);
			$('.submitBtn').click();
		});
		//}
	})


	$('.subBtn').off().on('click',function(){
		$('.testCtrPart').html(ue.getContent());
		var tds = new Array();
		answerInit(tds);
		var l = $('.filecontrolPart .gif').length;
		if(l == 0){
			var a = $('.getGif').children('input').val();
			//if((a.indexOf('.gif')!=-1)&&(a!='')){
				layer.confirm('确定要提交该实验报告吗?(提交之后将不能修改)',{btn: ['确定','取消'],title:"提交实验报告",skin:'layui-layer-molv'},function(index){
					var b = getReportDoc();
					$('#print').val(b);
					$('#submitStatus').val(2);
					$('#stuResult').val($('.testCtrPart').html());
					$('.subBtn').remove();
					$('.saveBtn').remove();
					$('.submitBtn').click();
				}, function(index){
					  $('#question-edit-sub').removeAttr('style');
					  layer.close(index);
				  });
			/*}else{
				layer.alert('请上传实验结果动态图', {
					  skin: 'layui-layer-molv' //样式类名
					  ,title:'温馨提示'
					  ,closeBtn: 0
					}
				);
			}*/
		}else{
			layer.confirm('确定要提交该实验报告吗?(交之后将不能修改)',{btn: ['确定','取消'],title:"提交实验报告", skin:'layui-layer-molv'},function(index){
				var b = getReportDoc();
				$('#print').val(b);
				$('#submitStatus').val(2);
				$('#stuResult').val($('.testCtrPart').html());
				$('.subBtn').remove();
				$('.saveBtn').remove();
				$('.submitBtn').click();
			}, function(index){
				  $('#question-edit-sub').removeAttr('style');
				  layer.close(index)
			  });
		}
	})
	function getReportDoc(){
		var content = '';
		//content += $('.stuInfo').html();
		content += ue.getContent();
		return content;
	}


	function showQRcode(){
		var index = layer.open({
			type:1,
			content:$(".QRCodeDetail"),
			title:false,
			area:['400px','400px']
		});
	}

	$(".chapterDetailQRCode").off().on('click',function(){showQRcode();})
	

	/*-------------------------------------------文件下载----------------------------------*/
	function downLoad(id){
		//判断该文件是否存在
		$.ajax({
			type:'POST',
			dataType:'json',
			url:ctx+'/experimentWebController/fileExistsById/'+id,
			success: function(sysresult){
				if(sysresult.status==200){
					//下载资源
					    $('#fileId').val(id);
                       $('#downLoadFile').submit();
				}else{
					layer.msg(sysresult.msg,{icon:2,time:1500});
				}
			},
			error: function(data){
				console.log(data)
			}
		})
	}

	function downloadFile(objId){
		var form = $("<form>");   //定义一个form表单
	    form.attr('style', 'display:none');   //在form表单中添加查询参数
	    form.attr('method', 'post');
	    form.attr('action', '${RESOURCE_URL}/fileController/downloadFile2/'+objId);
	    $('body').append(form);  //将表单放置在web中
	    form.submit();
	}

	/*生成实验报告*/
	function report2World(pre,experimentName,submitStatus){
		if(submitStatus==1||submitStatus==4){
			var invitationContent = $('.stuInfo').html()+ue.getContent()+'<div style="border:1px solid #ddd; margin-top:10px;padding:20px;"><p><span style="display:block;">教师评语：</span><span style="display:block;margin-top:10px;text-indent: 1em;">这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！</span></p></div>';
			$(".getReportDoc").html(invitationContent);
			$('.getReportDoc').find('.stuInfoTable').css({'text-align':'center','width':'100%','border':'1px solid #ddd','border-right':'none','border-bottom':'none','border-collapse':'collapse'}).children('tbody').children('tr').css({'height':'35px','padding':'0','border':'none'}).children('td').css({'text-align':'cneter','border':'1px solid #ddd','border-left':'none','border-top':'none','font-size':'14px'});
			$('.getReportDoc').find('.stuInfoTable').children('thead').remove();
			//$('.getReportDoc').find('.stuInfoTable').children('thead').css({'display':'none','height':'0','border':'none'}).children('th').css({'display':'none','height':'0','border':'none'});
			invitationContent = $('.getReportDoc').html();
			var form = $("<form>");   //定义一个form表单
			form.attr('style', 'display:none');   //在form表单中添加查询参数
			form.attr('target', '');
			form.attr('method', 'post');
			form.attr('action', realPath+'/submitExperimentFileWebController/report2World');
			/*实验报告  */
			var input1 = $('<input>');
			input1.attr('type', 'hidden');
			input1.attr('name', 'report');
			input1.attr('value', invitationContent);
			/*文件名称*/
			var input2 = $('<input>');
			input2.attr('type', 'hidden');
			input2.attr('name', 'fileName');
			input2.attr('value', pre+'《'+experimentName+'》实验报告');
			$('body').append(form);  //将表单放置在web中
			form.append(input1);   //将查询参数控件提交到表单上
			form.append(input2);
			form.submit();
		}else{
			var invitationContent = $('.stuInfo').html()+$('.testCtrPart').html();
			$(".getReportDoc").html(invitationContent);
			$('.getReportDoc').find('.stuInfoTable').css({'text-align':'center','width':'100%','border':'1px solid #ddd','border-right':'none','border-bottom':'none','border-collapse':'collapse'}).children('tbody').children('tr').css({'height':'35px','padding':'0','border':'none'}).children('td').css({'text-align':'cneter','border':'1px solid #ddd','border-left':'none','border-top':'none','font-size':'14px'});
			$('.getReportDoc').find('.stuInfoTable').children('thead').remove();
			invitationContent = $('.getReportDoc').html();
			var form = $("<form>");   //定义一个form表单
			form.attr('style', 'display:none');   //在form表单中添加查询参数
			form.attr('target', '');
			form.attr('method', 'post');
			form.attr('action', realPath+'/submitExperimentFileWebController/report2World');
			/*实验报告  */
			var input1 = $('<input>');
			input1.attr('type', 'hidden');
			input1.attr('name', 'report');
			input1.attr('value', invitationContent);
			/*文件名称*/
			var input2 = $('<input>');
			input2.attr('type', 'hidden');
			input2.attr('name', 'fileName');
			input2.attr('value', '《'+experimentName+'》实验报告');
			$('body').append(form);  //将表单放置在web中
			form.append(input1);   //将查询参数控件提交到表单上
			form.append(input2);
			form.submit();
		}
	}
	//生成pdf实验报告
function report2PDF(submitExperimentFileId){
		toPdfPrefix();
		var index = layer.open({
			type : 2,
			scrollbar : false,
			title : 'PDF预览',
			content : ctx+'/submitExperimentFileController/report2PDF/'+submitExperimentFileId,
			area : [ '600px', '450px' ],
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}

//执行toPdf前运行一遍 
function toPdfPrefix(){
	  html2canvas(document.body, {
		  useCORS:true,
	  	  onrendered:function(canvas) {
	  		var fileName = "11111111";
	  	      var contentWidth = canvas.width;
	  	      var contentHeight = canvas.height;
	  	      //一页pdf显示html页面生成的canvas高度;
	  	      var pageHeight = contentWidth / 592.28 * 841.89;
	  	      //未生成pdf的html页面高度
	  	      var leftHeight = contentHeight;
	  	      //页面偏移
	  	      var position = 0;
	  	      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
	  	      var imgWidth = 595.28;
	  	      var imgHeight = 592.28/contentWidth * contentHeight;

	  	      var pageData = canvas.toDataURL('image/jpeg', 1.0);
	  	  }})
}