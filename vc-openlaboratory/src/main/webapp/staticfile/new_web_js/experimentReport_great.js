	/*-------------------------------------------文件下载----------------------------------*/
	function getReportDoc(){
		var content = '';
		//content += $('.stuInfo').html();
		content += ue.getContent();
		return content;
	}

	function downloadFile(objId){
		alert(111)
		var form = $("<form>");   //定义一个form表单
	    form.attr('style', 'display:none');   //在form表单中添加查询参数
	    form.attr('method', 'post');
	    form.attr('action', resource_url+'/fileController/downloadFile2/'+objId);
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