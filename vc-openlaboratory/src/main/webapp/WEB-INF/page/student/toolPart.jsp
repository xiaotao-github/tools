<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>user control interface</title>
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/web_hui/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/reset.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/public.css">
	<link rel="stylesheet" type="text/css" href="${ctx}/staticfile/student/css/toolPart.css" />
</head>
<body>
	
	<div class="toolNav pos-f">
		<p class="pd-5" style="background: #eee;border: 1px solid #aaa;">
			<span class="radius btn box-shadow reconnection" style="height: auto;font-size: 14px;">服务器重连</span>
			<!-- 测试硬件对接数据是否能解析 ↓ -->
			<span class="radius btn box-shadow pl-5" style="height: auto;font-size: 14px;" onclick="sendCommands()">发送测试指令到本地服务器</span>
			<!-- 测试硬件对接数据是否能解析 ↑ -->
		</p>
		<ul class="clearfix text-c">
			<li class="f-l selected"><div class="radius fw-bold">示波器</div></li>
			<li class="f-l"><div class="radius fw-bold">电表</div></li>
		</ul>
	</div>
	
	<div class="cl pd-20 pt-30 pb-30 eachChangePart selected">
		<div class="col-xs-12 col-lg-6 cl">
			<div id="demo3" class="pd-10 mg-10 box-shadow bk-gray" style="display: inline-block;"></div>
			<canvas id='canvasId' style='display:none;'></canvas>
			<!-- <button class="btn btn-primary radius box-shadow mt-10 mb-10" type="button" onclick="chartRedraw();" style="display: block;">重新绘图</button> -->
			<div class="clearfix">
				<span class="btn btn-success radius box-shadow mt-10 mb-10" style="font-size:14px;height:auto;" onclick="send_1(1);">获取实时数据</span>
				<span class="btn btn-danger radius box-shadow mt-10 mb-10" style="font-size:14px;height:auto;" onclick="send_1(0);">停止获取实时数据</span>
				<span class="pl-5 pr-5">|</span>
				<span class="btn btn-primary radius box-shadow mt-10 mb-10" style="font-size:14px;height:auto;" onclick="send_1(2);">获取当前数据</span>
				<span class="btn btn-primary radius box-shadow mt-10 mb-10 f-r createSvg" style="font-size:14px;height:auto;">生成图片</span>
				<span class="btn btn-default radius box-shadow mt-10 mb-10 f-r defaultBtn" style="font-size:14px;height:auto;display:none;">正在生成图片...</span>
			</div>
		</div>
		<div class="col-xs-12 col-lg-6 cl">
			<div class="row cl">
				<div class="col-xs-12">
					<p>实验日期：<span>2019-04-02</span>&emsp;<span>15:28</span></p>
				</div>
			</div>
			<div class="row cl">
				<div class="col-6 f-l mt-20">
					<ul>
						<li class="row cl f-16">
							<p class="col-5 f-l">信号名称:</p>
							<p class="col-7 f-l">CH1</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">信号频率:</p>
							<p class="col-7 f-l"><span class="settingData ch-hz">--</span> Hz</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最大值:</p>
							<p class="col-7 f-l"><span class="settingData ch-max">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最小值:</p>
							<p class="col-7 f-l"><span class="settingData ch-min">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">峰峰值:</p>
							<p class="col-7 f-l"><span class="settingData ch-maxMin">--</span>V</p>
						</li>
						<li class="row cl rotateP">
							<div class="col-5 f-l sizeTimesBg">
								<div class="rotateBtn" thisChannel="1"></div>
							</div>
							<p class="col-7 f-l pt-20">
								<select name="" id="" onchange="sizeNumChange(1,this)">
									<option value="0.002">2mV</option>
									<option value="0.005" selected>5mV</option>
									<option value="0.01">10mV</option>
									<option value="0.02">20mV</option>
									<option value="0.05">50mV</option>
									<option value="0.1">0.1V</option>
									<option value="0.2">0.2V</option>
									<option value="0.5">0.5V</option>
									<option value="1">1V</option>
									<option value="2">2V</option>
									<option value="5">5V</option>
									<option value="10">10V</option>
									<option value="20">20V</option>
									<option value="50">50V</option>
								</select>
								<!-- <input type="number" step="5" min="0" max="20" value="5" onchange="sizeNumChange(1,this);"/> -->
							</p>
						</li>
						<li class="row cl positionP">
							<p class="col-5 f-l">position:</p>
							<p class="col-7 f-l">
								<input type="number" step="10" min="-200" max="200" value="0" onchange="upNumChange(1,this)">
							</p>
						</li>
					</ul>
				</div>
				<div class="col-6 f-l mt-20">
					<ul>
						<li class="row cl f-16">
							<p class="col-5 f-l">信号名称:</p>
							<p class="col-7 f-l">CH2</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">信号频率:</p>
							<p class="col-7 f-l"><span class="settingData ch-hz">--</span> Hz</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最大值:</p>
							<p class="col-7 f-l"><span class="settingData ch-max">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最小值:</p>
							<p class="col-7 f-l"><span class="settingData ch-min">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">峰峰值:</p>
							<p class="col-7 f-l"><span class="settingData ch-maxMin">--</span>V</p>
						</li>
						<li class="row cl rotateP">
							<div class="col-5 f-l sizeTimesBg">
								<div class="rotateBtn" thisChannel="2"></div>
							</div>
							<p class="col-7 f-l pt-20">
								<select name="" id="" onchange="sizeNumChange(2,this)">
									<option value="0.002">2mV</option>
									<option value="0.005" selected>5mV</option>
									<option value="0.01">10mV</option>
									<option value="0.02">20mV</option>
									<option value="0.05">50mV</option>
									<option value="0.1">0.1V</option>
									<option value="0.2">0.2V</option>
									<option value="0.5">0.5V</option>
									<option value="1">1V</option>
									<option value="2">2V</option>
									<option value="5">5V</option>
									<option value="10">10V</option>
									<option value="20">20V</option>
									<option value="50">50V</option>
								</select>
								<!-- <input type="number" step="5" min="0" max="20" value="5" onchange="sizeNumChange(2,this);"/> -->
							</p>
						</li>
						<li class="row cl positionP">
							<p class="col-5 f-l">position:</p>
							<p class="col-7 f-l">
								<input type="number" step="10" min="-200" max="200" value="0" onchange="upNumChange(2,this)">
							</p>
						</li>
					</ul>
				</div>
				<div class="col-6 f-l mt-20">
					<ul>
						<li class="row cl f-16">
							<p class="col-5 f-l">信号名称:</p>
							<p class="col-7 f-l">CH3</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">信号频率:</p>
							<p class="col-7 f-l"><span class="settingData ch-hz">--</span> Hz</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最大值:</p>
							<p class="col-7 f-l"><span class="settingData ch-max">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最小值:</p>
							<p class="col-7 f-l"><span class="settingData ch-min">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">峰峰值:</p>
							<p class="col-7 f-l"><span class="settingData ch-maxMin">--</span>V</p>
						</li>
						<li class="row cl rotateP">
							<div class="col-5 f-l sizeTimesBg">
								<div class="rotateBtn" thisChannel="3"></div>
							</div>
							<p class="col-7 f-l pt-20">
								<select name="" id="" onchange="sizeNumChange(3,this)">
									<option value="0.002">2mV</option>
									<option value="0.005" selected>5mV</option>
									<option value="0.01">10mV</option>
									<option value="0.02">20mV</option>
									<option value="0.05">50mV</option>
									<option value="0.1">0.1V</option>
									<option value="0.2">0.2V</option>
									<option value="0.5">0.5V</option>
									<option value="1">1V</option>
									<option value="2">2V</option>
									<option value="5">5V</option>
									<option value="10">10V</option>
									<option value="20">20V</option>
									<option value="50">50V</option>
								</select>
								<!-- <input type="number" step="5" min="0" max="20" value="5" onchange="sizeNumChange(3,this);"/> -->
							</p>
						</li>
						<li class="row cl positionP">
							<p class="col-5 f-l">position:</p>
							<p class="col-7 f-l">
								<input type="number" step="10" min="-200" max="200" value="0" onchange="upNumChange(3,this)">
							</p>
						</li>
					</ul>
				</div>
				<div class="col-6 f-l mt-20">
					<ul>
						<li class="row cl f-16">
							<p class="col-5 f-l">信号名称:</p>
							<p class="col-7 f-l">CH4</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">信号频率:</p>
							<p class="col-7 f-l"><span class="settingData ch-hz">--</span> Hz</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最大值:</p>
							<p class="col-7 f-l"><span class="settingData ch-max">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">最小值:</p>
							<p class="col-7 f-l"><span class="settingData ch-min">--</span>V</p>
						</li>
						<li class="row cl">
							<p class="col-5 f-l">峰峰值:</p>
							<p class="col-7 f-l"><span class="settingData ch-maxMin">--</span>V</p>
						</li>
						<li class="row cl rotateP">
							<div class="col-5 f-l sizeTimesBg">
								<div class="rotateBtn" thisChannel="4"></div>
							</div>
							<p class="col-7 f-l pt-20">
								<select name="" id="" onchange="sizeNumChange(4,this)">
									<option value="0.002">2mV</option>
									<option value="0.005" selected>5mV</option>
									<option value="0.01">10mV</option>
									<option value="0.02">20mV</option>
									<option value="0.05">50mV</option>
									<option value="0.1">0.1V</option>
									<option value="0.2">0.2V</option>
									<option value="0.5">0.5V</option>
									<option value="1">1V</option>
									<option value="2">2V</option>
									<option value="5">5V</option>
									<option value="10">10V</option>
									<option value="20">20V</option>
									<option value="50">50V</option>
								</select>
								<!-- <input type="number" step="5" min="0" max="20" value="5" onchange="sizeNumChange(4,this);"/> -->
							</p>
						</li>
						<li class="row cl positionP">
							<p class="col-5 f-l">position:</p>
							<p class="col-7 f-l">
								<input type="number" step="10" min="-200" max="200" value="0" onchange="upNumChange(4,this)">
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="cl pd-20 pt-30 pb-30 eachChangePart">
		<div class="mt-20 box-shadow radius pd-5">
			<p class="pd-5 f-16 fw-bold">AC(交流)电流</p>
			<div class="elementBox">
				<ul class="cl eachMachineType">
					<!-- <li class="col-3 text-c f-l mt-10">
						<p class="bg-1 bk-gray pd-10"><span>122.00</span> mA</p>
						<p class="pt-5">设备的名称</p>
					</li> -->
				</ul>
			</div>
		</div>
		<div class="mt-20 box-shadow radius pd-5">
			<p class="pd-5 f-16 fw-bold">AC(交流)电压</p>
			<div class="elementBox">
				<ul class="cl eachMachineType"></ul>
			</div>
		</div>
		<div class="mt-20 box-shadow radius pd-5">
			<p class="pd-5 f-16 fw-bold">DC(直流)电流</p>
			<div class="elementBox">
				<ul class="cl eachMachineType"></ul>
			</div>
		</div>
		<div class="mt-20 box-shadow radius pd-5">
			<p class="pd-5 f-16 fw-bold">DC(直流)电压</p>
			<div class="elementBox">
				<ul class="cl eachMachineType"></ul>
			</div>
		</div>
		<div class="mt-20 box-shadow radius pd-5">
			<p class="pd-5 f-16 fw-bold">功率表</p>
			<div class="elementBox">
				<ul class="cl eachMachineType"></ul>
			</div>
		</div>
		<div class="mt-20 pd-5">
			<div class="elementBox">
				<ul class="cl eachMachineType"></ul>
			</div>
		</div>
	</div>
	<div class="cl pd-20 pt-30 pb-30 eachChangePart"></div>
	<div class="cl pd-20 pt-30 pb-30 eachChangePart"></div>

	<script>	
		var ctx = '${ctx }';
	</script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/highcharts.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/exporting.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/highcharts-zh_CN.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/HighchartsTheme.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/rgbcolor.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/hcharts/canvg.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/dealWithLocalServerData_v2.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/userControl.js"></script>
	<script type="text/javascript" src="${ctx}/staticfile/student/js/websocketLocalhostConnect.js"></script>
	
	<script>
		/*测试硬件对接数据是否能解析 ↓*/
		function sendCommands(){
			var commands = [
				{command: ':MEASUrement:MEAS1:SOUrcel ',data: 'CH1',instrument: 'type1'}
			]
			webSocket_1.send(commands);
		}
		/*测试硬件对接数据是否能解析 ↑*/
	
		$(function(){
			$('.toolNav ul').children('li').each(function(index){
				$('.toolNav ul').children('li').eq(index).on('click',function(){
					$(this).removeClass('selected').addClass('selected');
					$(this).siblings('li').removeClass('selected');
					if(!$('.eachChangePart').eq(index).hasClass('selected')){
						$('.eachChangePart').eq(index).siblings('.eachChangePart').removeClass('selected');
						$('.eachChangePart').eq(index).addClass('selected');
					}else{
						$('.eachChangePart').eq(index).siblings('.eachChangePart').removeClass('selected');
					}
				})
			})
		})
	</script>
	
</body>
</html>