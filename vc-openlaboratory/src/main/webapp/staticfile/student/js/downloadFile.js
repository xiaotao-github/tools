//判断是否为Trident内核浏览器(IE等)函数
function browserIsIe() {
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        return true;
    }
    else{
        return false;
    }
}
//创建iframe并赋值的函数,传入参数为图片的src属性值.
function createIframe(imgSrc) {
    //如果隐藏的iframe不存在则创建
    if ($("#IframeReportImg").length === 0){
        $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="downloadImg();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
    }
    //iframe的src属性如不指向图片地址,则手动修改,加载图片
    if ($('#IframeReportImg').attr("src") != imgSrc) {
        $('#IframeReportImg').attr("src",imgSrc);
    } else {
        //如指向图片地址,直接调用下载方法
        downloadImg();
    }
}
//下载图片的函数
function downloadImg() {
    //iframe的src属性不为空,调用execCommand(),保存图片
    if ($('#IframeReportImg').src != "about:blank") {
        window.frames["IframeReportImg"].document.execCommand("SaveAs");
    }
}

function getBase64(url){
	 //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片
    var Img = new Image(),
        dataURL = '';
    Img.src = url;
    Img.setAttribute("crossOrigin", 'Anonymous');
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/' + fileType); //转换图片为dataURL
    };
    return dataURL;
}

function downloadChromeGif(src,filename){    //row.ITEMNAME为文件名称，src为文件存储地址       
	var _baseURL = getBase64(src);

    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 图片转base64地址
    eleLink.href = _baseURL;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);

}

//接下来进行事件绑定
var aBtn = $(".downloadGif");
if (browserIsIe()) {
    //是ie等,绑定事件
    aBtn.on("click", function() {
        var imgSrc = $(this).siblings("img").attr("src");
        //调用创建iframe的函数
        createIframe(imgSrc);
    });
} else {
    aBtn.each(function(i,v){
    //支持download,添加属性.
    	if (window.navigator.userAgent.indexOf("Chrome") !== -1 && window.navigator.userAgent.indexOf("Edge") === -1){
    		aBtn.on("click", function() {    	        
    			downloadChromeGif($(v).siblings("img").attr("src"),$(v).siblings("img").attr('alt'));
    	    });
    	}else{
		    var imgSrc = $(v).siblings("img").attr("src");
		    $(v).attr("download",imgSrc);
		    $(v).attr("href",imgSrc);
    	}
    })
}