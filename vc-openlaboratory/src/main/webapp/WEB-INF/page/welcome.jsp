<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
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
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
	<!--[if IE 6]>
	<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
	<script>DD_belatedPNG.fix('*');</script>
	<![endif]-->
	<title>我的桌面</title>
	
	<style>
		.dataTables_length{
			display: none;
		}
	
		.dataTables_filter{
			padding-bottom: 10px;
		}
		
		.dataTable .even td.sorting_1{
			background: #fffaea;
		}
		
		.dataTable td.sorting_1:hover{
			background: #eaeaea;
		}
	</style>
	
	</head>
	<body>
	
	<div class="page-container clearfix pd-30 pb-50 pt-50">
		<div class="welcomePageTop">
			<div class="welcomePageTopPB">
				<h2>行政中心</h2>
				<p class="welcomeItro">这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍这里是介绍</p>
				<ul class="numCout clearfix mb-20">
					<li class=" colorPart datePart clearfix">
						<img src="${ctx }/staticfile/images/welcome-icon/date_icon.png" alt="date_icon"/>
						<p>
							<span class="loginDate"><span></span><span></span></span>
							<!-- <span class="welcomeMsg"></span> -->
						</p>
					</li>
					<li class="departmentPart colorPart clearfix ">
						<img src="${ctx }/staticfile/images/welcome-icon/department_icon.png" alt="department_icon"/>
						
						<p>
							<span class="top">主要院系</span>
							<span class="bottom"></span>
						</p>
					</li>
					<li class="majorPart colorPart clearfix">
						<img src="${ctx }/staticfile/images/welcome-icon/major_icon.png" alt="major_icon"/>
						<p>
							<span class="top">开设专业</span>
							<span class="bottom"></span>
						</p>
					</li>
					<li class="classPart colorPart clearfix">
						<img src="${ctx }/staticfile/images/welcome-icon/class_icon.png" alt="class_icon"/>
						<p>
							<span class="top">班级设立</span>
							<span class="bottom"></span>
						</p>
					</li>
					<li class="studentPart colorPart clearfix">
						<img src="${ctx }/staticfile/images/welcome-icon/student_icon.png" alt="student_icon"/>
						<p>
							<span class="top">平台学生</span>
							<span class="bottom"></span>
						</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="welcomePageLeft f-l">
			<div class="welcomePageTeachNote mt-20">
			<form action="${ctx}/teachNotesController/addNotes" method="post" id="noteForm">
				<div class="welcomePagenNoteAdd">
					<h4 class="noteHead margin-0 pl-10">记录笔记</h4>
					<textarea name="notesContent" id="notesContent" cols="30" rows="5" class="noteEditBox" placeholder="您可在此记录你的笔记!"  datatype="*"  errormsg="不能为空！"></textarea>
					<div class="noteFooter text-r">
							<span class="Validform_checktip"></span>
						<span class="btn btn-primary radius mt-5  mr-5"><a href="##" class="noteAddSubBtn">保存</a></span>
					</div>
				</div>
			</form>
				<div class="welcomePageNoteList">
					<p class="welcomePageNoteMore margin-0 clearfix">
						<span>我的笔记</span>
						<a href="javascript:;" onClick="teachnote('教学笔记','${ctx }/page/system_manage/teachnote.html')">更多>></a>
					</p>
					<ul>
						
					</ul>
				</div>
			</div>
		</div>
		<div class="welcomePageRight f-l pl-20">
			<div class="welcomePageUserOperateList mt-20">
				<h4 class="margin-0 pl-10">您的操作记录:</h4>
				<table class="table table-border table-bordered table-bg table-sort">
					<thead>
						<tr><th>我的记录</th></tr>
					</thead>
					<tbody class="tbody">
					
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<footer class="footer">
		<div class="container">
				Copyright &copy;<br>
		</div>
	</footer>
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script> 
		<!-- 加载操作日志 -->
	 <script type="text/javascript">
		(function(){
				$.ajax({
					async: false,
					type: 'GET',
					url: '${ctx}/systemController/selectTeacherLogInformationReturnSysResult/3',
					dataType: 'json',
					success: function(sysresult){
						if(sysresult.status == 202||sysresult.status == 400){
						}else{
							var optioncontent = '';
							for(var i=0;i<sysresult.data.length;i++){
								var times = sysresult.data[i].operationTime;
								times=parseInt(times,10);//转为整形
								var date =new Date(times);//正确
								
								 if(sysresult.data[i].filePath!=null){
									/* optioncontent = "<tr><td>您在<span  style='padding-left: 10px; padding-right:30px;'>"+date.toLocaleString()+"</span>"+sysresult.data[i].message+",操作IP为: <span>"+sysresult.data[i].operationIp+"</span>,操作文件：<a href='"+${ctx}/downLoad/sysresult.data[i].filePath+"'>下载</a></td></tr>";
									$(".tbody").append(optioncontent); 		 */	
										optioncontent = '<tr><td>您在<span  style="padding-left: 10px; padding-right:30px;">'+date.toLocaleString()+'</span>'+sysresult.data[i].message+',操作IP为: <span>'+sysresult.data[i].operationIp+'</span>,操作文件：<a href="javascript:void(0);" onClick="fileDownLoad(\''+sysresult.data[i].filePath+'\')">下载</a></td></tr>';
										$(".tbody").append(optioncontent);
									
								}else{ 
		 							optioncontent = "<tr><td>您在<span  style='padding-left: 10px; padding-right:30px;'>"+date.toLocaleString()+"</span>"+sysresult.data[i].message+",操作IP为: <span>"+sysresult.data[i].operationIp+"</span></td></tr>";
									$(".tbody").append(optioncontent);
								 } 
							}
						}
					},
					error:function(data) {
					}
		 		});
			}());
	</script> 
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<script id="javascript_datatable" type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script id="javascript_laypage" type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
	<script type="text/javascript">
		$('.table-sort').dataTable({
			"aaSorting" : [ [ 0, "desc" ] ],//默认第几个排序
			"bStateSave" : true,//状态保存
			"aoColumnDefs" : [
			//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
			{
				"orderable" : false
			} // 制定列不参与排序
			]
		});
	</script>
	<!--教务笔记-->
	
	<script type="text/javascript">
	

    
		/*教学笔记*/
		function teachnote(title,url){
			var index = layer.open({
				type: 2,
				title: title,
				content: url,
				area: ['100%','100%'],
				fix: true, 
				maxmin: false,
				shade:0.4,
				scrollbar: false,
				resize: true,
			});
		}
	
	
		$ (function(){
		$.ajax({
			async: false,
			type: 'GET',
			url: '${ctx}/teachNotesController/selectNotesByUserId',
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					alert(sysresult.msg);
				}else{
					var data = sysresult.data;
					var optioncontent = '';
					if(data==null){
						return ;
					}
					for(var i=0;i<sysresult.data.length;i++){
						var times = sysresult.data[i].createTime;
						times=parseInt(times,10);//转为整形
						var date =new Date(times);//正确
				
							optioncontent ="<li class='clearfix'><p class='noteAddedTime'><span>"+ date.getFullYear()+"-"+(date.getMonth()+1) +"</span><span>"+date.getDate()+"</span></p><p class='noteContain'>"+sysresult.data[i].notesContent+"</p></li>";
							$(".welcomePageNoteList ul").append(optioncontent);
					}
				}
			},
			error:function(data) {
			}
		 }); 
				$("#noteForm").Validform({
					btnSubmit:".noteAddSubBtn", 
					tiptype:2, 
					ignoreHidden:false,
					dragonfly:false,
					tipSweep:false,
					label:".label",
					showAllError:false,
					postonce:true,
					ajaxPost:true,
					datatype:{
						
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
					callback:function(data){
						if(data.status=="200"){
							layer.msg('添加成功!',{icon:1,time:1500});
							var index = parent.layer.getFrameIndex(window.name);
							window.parent.location.reload();
							parent.layer.close(index);
						}else{
							layer.msg(data.msg,{icon:1,time:1500});
							/* window.location.reload(); */
						}
					}
				});
			})
	</script>
	
	<script>
		$(function(){
			var t = new Date();
			var date = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate();
			var week = t.getDay();
			var day;
			switch(week){
				case 1 :
					day = '星期一';
					break;
				case 2 :
					day = '星期二';
					break;
				case 3 : 
					day = '星期三';
					break;
				case 4 :
					day = '星期四';
					break;
				case 5 :
					day = '星期五';
					break;
				case 6 :
					day = '星期六';
					break;
				case 7 :
					day = '星期天';
					break;
			}
/* 			var H = t.getHours();
			var time;
			if(H>=6&&H<=10){
				time = "早上好!";
			}else if(H>=11&&H<=13){
				time = "中午好!";
			}else if(H>=14&&H<=17){
				time = "下午好!";
			}else{
				time = "晚上好!";
			} */
			$(".loginDate span:nth-child(2)").html(date);
			$(".loginDate span:nth-child(1)").html(day);
			//$(".welcomeMsg").html(time);
			
			$(".welcomePageUserOperateList .dataTables_filter .input-text").addClass("focus");
			
		    	
		        $('.welcomePageNoteList ul li').hover(function () {
		            $(this).css('color', '#628da2');
		            $(this).find(".noteAddedTime").css('backgroundColor', '#628da2');
		        }, function () {
		            $(this).css('color', '#333');
		            $(this).find(".noteAddedTime").css('backgroundColor', '#7ecef4');
		        });
			
		});
	</script>
	<!--获取统计数据-->
	<script type="text/javascript">
		$.ajax({
			async: true,
			type: 'GET',
			url: '${ctx}/systemController/selectStatisticalData',
			dataType: 'json',
			success: function(sysresult){
				if(sysresult.status == 202||sysresult.status == 400){
					alert(sysresult.msg);
				}else{
						var data = sysresult.data;
						if(data.role==1){//如果为管理员
							$(".departmentPart .top").html("主要院系");
							$(".departmentPart .bottom").html(data.departmentNum);
							$(".majorPart .bottom").html(data.majorNum);
							$(".classPart .bottom").html(data.classNum);
							$(".studentPart .bottom").html(data.studentNum);
						}else if(data.role==2){
							$(".departmentPart .top").html("我的院系");
							$(".departmentPart .bottom").html(data.departmenName);
							$(".majorPart .bottom").html(data.majorNum);
							$(".classPart .bottom").html(data.classNum);
							$(".studentPart .bottom").html(data.studentNum);
						}else{
						}
					}
			},
			error:function(data) {
				alert("查询所有院系失败");
			}
		 });
	</script>
	<script type="text/javascript">
	/*监听文件下载  */
	function fileDownLoad(filePath){
		$.ajax({
			type:"POST",
			url:"${ctx }/systemController/downLoad",
			data:"filePath="+filePath,
			success:function(data){
				layer.msg(data.msg,{icon:2,time:1000});
			},
			dataType:"json"
		})
	}
	</script>
	</body>
</html>