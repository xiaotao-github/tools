var settingId = null;

function initClickEvent(obj){
	obj.each(function(index){
		obj.eq(index).off().on('click',function(){
			settingId = $(this).attr('thisId');
			if(obj.parent('ul').hasClass('equipmentsList')){
				$('.settingBtn').show();
				$('.reeditBtn').hide();
				$('.editType .equipmentTitle').children('strong').html($(this).find('.equipmentName').text());
			}else{
				$('.settingBtn').hide();
				$('.reeditBtn').show();
				$('.editType .equipmentTitle').children('strong').html($(this).children('p').eq(1).text());
			}
			$('.editType li').removeClass('checked');
			layer.open({
				type : 1,
				title : '选择设备类型',
				content : $('.editType'),
				area : [ '600px', '450px' ],
				scrollbar : false,
				end: function(){
					$('.editType li').removeClass('checked');
					settingId = null;
				}
			})
		})
	})
}

initClickEvent($('.equipmentsList').children('.eachEquipment'));
initClickEvent($('.typePart .eachEquipment'));

$('.editType').find('li').each(function(index){
	$('.editType').find('li').eq(index).on('click',function(){
		$(this).addClass('checked');
		$(this).siblings('li').removeClass('checked');
	})
})

function upTypeSel(){
	var type = $('.editType').find('.checked').attr('thisType'),
		equipmentName = '',
		$obj = null;
		$('.equipmentsList li').each(function(index){
			if($('.equipmentsList li').eq(index).attr('thisId') == settingId){
				$obj = $(this);
				equipmentName = $obj.find('.equipmentName').text();
			}
		})
	$.ajax({
		type: 'POST',
		url: ctx+'/equipment/updateType/'+settingId+'/'+type,
		dataType: 'JSON',
		data : type,
		success: function(sysresult){
			equimentClassify(type,equipmentName,$obj);
			initClickEvent($('.typePart .eachEquipment'));
			layer.closeAll();
			layer.msg('设置成功!');
			
		},
		error: function(sysresult){
			
		}
	})
}

function upTypeChange(){
	var type = $('.editType').find('.checked').attr('thisType'),
		equipmentName = '',
		$obj = null;
		$('.typePart .eachEquipment').each(function(index){
			if($('.typePart .eachEquipment').eq(index).attr('thisId') == settingId){
				$obj = $(this);
				equipmentName = $obj.children('p').eq(1).text();
			}
		})
	$.ajax({
		type: 'POST',
		url: ctx+'/equipment/updateType/'+settingId+'/'+type,
		dataType: 'JSON',
		data : type,
		success: function(sysresult){
			equimentClassify(type,equipmentName,$obj);
			initClickEvent($('.typePart .eachEquipment'));
			layer.closeAll();
			layer.msg('设置成功!');
		},
		error: function(sysresult){
			
		}
	})
}

function equimentClassify(type,equipmentName,o){
	var className = '';
	var startString = '<div class="box-shadow radius bk-gray col-lg-4 col-sm-4 eachEquipment" thisId="'+settingId+'">',
		endString = '</div>',
		content = '',
		classify;
	switch(type){
		case '1':
			className = 'dengpao';
			classify = $('.classify-light');
			break;
		case '2':
			className = 'hongwaizhuanfa';
			classify = $('.classify-hongwai');
			break;
		case '3':
			className = 'diannaozhuo';
			classify = $('.classify-seat');
			break;
		case '4':
			className = 'chazuo';
			classify = $('.classify-chazuo');
			break;
		case '5':
			className = 'camera';
			classify = $('.classify-camera');
			break;
		case '6':
			className = 'chuanglian';
			classify = $('.classify-curtain');
			break;
		case '7':
			className = 'el-icon-men';
			classify = $('.classify-door');
			break;
		case '8':
			className = 'reboot';
			classify = $('.classify-reboot');
			break;
		case '9':
			className = 'WSD';
			classify = $('.classify-sensor');
			break;
		case '10':
			className = 'warning';
			classify = $('.classify-warning');
			break;
		default:
			break;
	}
	/*if(n==0){*/
		content = '<p><i class="experimentFont experimentFont-'+className+'"></i></p><p><span>'+equipmentName+'</span></p>';
		content = startString+content+endString;
	/*}else{
		console.log(o.clone());
		content = o.clone();
	}*/
	classify.append(content);
	o.remove();
}

