/*
 * tiyo wish
 * teo.leung@gmail.com
 */

(function ($) {
	//console.log(6666666666);
	
    $.fn.wish = function () {
        var _this = this;
        var _wish = _this.children();
        var _wishs = _wish.length;


        var wish = {
            area: {
                left: 0,
                top: 0,
                right: _this.width(),
                bottom: _this.height()
            },
            skin: {
                width: 225,
                height: 206
            }
        };

        $.extend(wish);//?????

        var _left = wish.area.left;
        var _right = wish.area.right;
        var _top = wish.area.top;
        var _bottom = wish.area.bottom;

        _right = _right - _left > wish.skin.width ? _right : _left + wish.skin.width;
        _bottom = _bottom - _top > wish.skin.height ? _bottom : _top + wish.skin.height;

        _right = _right - wish.skin.width;
        _bottom = _bottom - wish.skin.height;


        var methods = {
            rans: function (v1, v2) {
                var ran = parseInt(Math.random() * (v2 - v1) + v1);//在两个数字之间取个整数
                return ran;
            },
            pos: function () {
                return {left: methods.rans(_left, _right), top: methods.rans(_top, _bottom)}
            },
            css: function () {
                return methods.rans(1, 5);
            }
        }

        _wish.each(function (i) {
            var _p = methods.pos();
            //alert(_p.left+'---'+_p.top +'---'+ this.innerHTML );

            var _s = methods.css();
            var _self = $(this);
            _self.prepend('<a class="close"></a>');
            //_self.addClass('wish').addClass('s'+_s).css({'position':'absolute', 'left':_p.left + 'px', 'top':_p.top + 'px'});

            _self.addClass('wish').addClass('s' + _s).css({'position': 'absolute'}).animate({
                'position': 'absolute',
                'left': _p.left + 'px',
                'top': _p.top + 'px'
            }, 1000);
            ;

            _self.hover(
                function () {
                    _self.css({'z-index': '9999'}).children('.close').show()
                },
                function () {
                    _self.css({'z-index': ''}).children('.close').hide();
                });


            _self.click(function () {
                _self.appendTo(_this);
                /*移动到最后*/
            });


        });

    };
  //删除
	function note_del(){
			console.log(obj);
			var noteid = obj.attr('noteId');
			console.log(noteid);
		layer.confirm('确认要删除吗？',function(index){
			$.ajax({
			 	type: 'POST',
			 	url: '${cookie.MANAGE_URL.value}/teachNotesController/deleteNotesByNotesId',
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
			 			$(obj).parents().remove();
				 		layer.msg('已删除!',{icon:1,time:1000});
				 	    
			 		}else{
			 			layer.msg(data.msg,{icon:1,time:1000});
			 		}
			 	},
			 	error:function(data) {
			 		
			 	},
			 });
		});
	}

})(jQuery);