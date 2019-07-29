<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/static/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/static/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/cooManage-Font/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<!-- <link rel="stylesheet" type="text/css" href="${ctx }/staticfile/static/h-ui/css/dataTable-cooperateLearning-skin.css" /> -->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
<style>

	table{
		width: 100%;
		border-bottom:1px solid #ddd;
		border-right:1px solid #ddd;
		border-collapse: separate;
	    border-spacing: 0;
	    clear: both;
	}

	table thead{
		line-height: 45px;
		background:#4cacea;
	    color: #fff;
	}

	table thead th{
		text-align: center;
	    border-top: 1px solid #ddd;
    	border-left: 1px solid #ddd;
	}

	table td{
		text-align: center;
		height: 45px;
	    border-top: 1px solid #ddd;
    	border-left: 1px solid #ddd;
    	cursor: pointer;
	}
	
	table td.selector{
		background-color: #c5e8ff;
	}

	table tbody td:hover{
		background: #fbf5b7;
		color:#333;
	}
</style>
<style>
	.row{margin:0;}
</style>
<title>实验报告管理</title>
</head>

<body>
<div style="-webkit-overflow-scrolling:touch;overflow:auto; height:100vh;" id="wrapper">
	<nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	实验资源管理  <span class="c-gray en">
	<a class="btn bc-linear bc-h-linear radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin fc-white"></i>
	</a>
	</nav>

	<div class="page-container">
		<div class="editbar cl pd-5 bg-1 bk-gray mt-20">
			<a href="javascript:;" onClick="" title="添加" class="btn radius btn-primary"> <i class="Hui-iconfont">&#xe600;</i>实验报告</a>
		</div>
		
		实验数据采集区
		<div class="clearfix pd-20 bk-gray mt-20 box-shadow containerBox">
			<p>
				<span>标题: </span><input type="text" name="" id=""/>
			</p>
			<div>
				<span>描述: </span><textarea></textarea>
			</div>
		
			<div class="contentBox">
		<!--  
				<table class="mt-20 mb-20">
					<thead>
						<tr>
							<th>属性1</th>
							<th>属性2</th>
							<th>属性3</th>
							<th>属性4</th>
							<th>属性5</th>
							<th>属性6</th>
							<th>属性7</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="selector"></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				
				<table class="mt-20 mb-20">
					<thead>
						<tr>
							<th>属性8</th>
							<th>属性9</th>
							<th>属性10</th>
							<th>属性11</th>
							<th>属性12</th>
							<th>属性13</th>
							<th>属性14</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				-->
				<p>1、放大器加负反馈对性能有那些改善？</p><p>2、反馈系数的理论计算值与实测值差别的原因在哪里？</p><p>3、验算带宽的增加是否符合理论值（1+AF）倍。</p><p><br/></p><p style="overflow-wrap: break-word; margin-top: 0px; margin-bottom: 10px; padding: 0px; color: rgb(102, 102, 102); font-family: &quot;Microsoft Yahei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Helvetica Neue&quot;, Helvetica, tahoma, arial, &quot;WenQuanYi Micro Hei&quot;, Verdana, sans-serif, 宋体; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);">输入1KHz的正弦信号，输出端接示波器，反复调整电位器及信号源输出幅值，使输出幅度在示波器屏幕上得到一个最大不失真输出波形，然后断开输入信号源，用万用表测量晶体管各级对地的电位，就可以得到该放大电路静态工作点，将测量数据填写入表2.7-1中。</p>
				<table width="877">
				<tbody style="overflow-wrap: break-word; margin: 0px; padding: 0px;">
				<tr class="firstRow" style="overflow-wrap: break-word; margin: 0px; padding: 0px;">
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">
				<p style="overflow-wrap: break-word; padding: 5px 10px;">Vb(V)</p></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">
				<p style="overflow-wrap: break-word; padding: 5px 10px;">Ve(V)</p></td><td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><p style="overflow-wrap: break-word; padding: 5px 10px;">Vc(V)</p></td><td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><p style="overflow-wrap: break-word; padding: 5px 10px;">Ie=Ve/Re</p></td></tr><tr style="overflow-wrap: break-word; margin: 0px; padding: 0px;">
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">
				<p style="overflow-wrap: break-word; padding: 5px 10px;">理 论 值</p></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">  
				<br/></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">  <br/>   </td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/>
				</td></tr>
				<tr style="overflow-wrap: break-word; margin: 0px; padding: 0px;">
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;">
				<p style="overflow-wrap: break-word; padding: 5px 10px;">实 测 值</p></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td>
				<td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td><td style="overflow-wrap: break-word; margin: 0px; padding: 0px; font-size: 12px; color: rgb(51, 51, 51); -webkit-font-smoothing: antialiased;"><br/></td></tr></tbody></table><p style="overflow-wrap: break-word; margin-top: 0px; margin-bottom: 10px; padding: 0px; color: rgb(102, 102, 102); font-family: &quot;Microsoft Yahei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Helvetica Neue&quot;, Helvetica, tahoma, arial, &quot;WenQuanYi Micro Hei&quot;, Verdana, sans-serif, 宋体; font-size: 14px; white-space: normal; background-color: rgb(255, 255, 255);"><br/></p>
			</div>
		 
			<p class="text-c mt-20">
				<span class="pt-5 pb-5 pl-20 pr-20 radius c-white btn-success mr-20" id="but" onclick="subTable(this)">保存</span>
				<span> <font color="red" id="msgid"></font> </span>
			</p>
		</div>
	</div>


	<!--_footer 作为公共模版分离出去-->
	<script type="text/javascript" src="${ctx }/staticfile/js/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript">
	//学生id ${studentInfo.id}
	var Id ="xutong";
	var RESOURCE_WAY='${cookie.RESOURCE_WAY.value}';
	function subTable(obj){
		var title = $(obj).parents('.containerBox').find('input').val();
		var description = $(obj).parents('.containerBox').find('textarea').val();
		var content = $(obj).parents('.containerBox').find('.contentBox').html();
		layer.confirm('确认要保存吗？',function(index) {
		$.ajax({
			type:'POST',
			url: 'http://192.168.0.90:8999/IndexController/addList',
			dataType: 'JSON',
			data:{
				title: title,
				description : description,
				content : content
			},
			success :function(data){
				$("#msgid").html("保存成功！");  
				layer.msg('保存成功!',{icon:1,time:1500});
			},
			error :function(data){				
				layer.msg(data.status)
			} 
		})
		console.log(title);
		console.log(description);
		console.log(content);
		});
	}
	
	function initImg(data){
		var obj = $('<img />').attr('src','${cookie.RESOURCE_WAY.value}'+data.picPath).addClass('mt-20 img');
		console.log(obj);
		return obj;
		
	}
	
	$(function(){
		
		$('td').each(function(index){
			if($('td').eq(index).text().replace(/\s*/g,"").length != 0){
				$('td').eq(index).css('background-color','#f2f2f2');
			}else{
				$('td').eq(index).on('click',function(){
					$('td').removeClass('selector');
					$(this).addClass('selector');
				})
			}
		})
		
	 
		//$(".selector").html('2331');
	})
	</script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/list.js"></script>
</div>
</body>
</html>