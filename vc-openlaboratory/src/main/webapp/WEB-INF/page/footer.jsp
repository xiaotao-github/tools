<%@ page language="java"  pageEncoding="UTF-8"%>
<style>
/*S footer css*/
.vcoocfoot{
	position: absolute;
	bottom: 0;
	width: 100%;
    clear: both;
}

.footer{
    background: #222;
    width: 100%;
    border-top: 2px solid #ccc;
    color: #fff;
    /*padding: 10px 0;*/
    font-size: 12px;
}

.footerInner{
    width: 680px;
    margin: 0 auto;
}

.footerQR{
    float: left;
    padding: 10px;
}

.footerQR img{
    width: 80px;
    height: 80px;
    background: #fff;
}

.footerRight{
    float: left;
    margin-left: 60px;
}

.footerTop{

}

.footerTop .d0{
    float: left;
    height: 60px;
    line-height: 60px;
    line-height: 63px/9;
    *line-height: 60px;
    _line-height: 60px;
    margin-right: 30px;
}

.footerTop .d1{
    float: left;
   /*  height: 30px; */
    line-height: 30px;
    line-height: 33px/9;
    *line-height: 30px;
    _line-height:30px;
}

.footerTop .d1 p{
	margin:0;
	height:30px;
}

.footerTop .d1 p a{
    color: #fff;
}

.footerTop .d2{
    float: left;
}

.footerTop .d3{
    float: left;
    font-size: 14px;
    margin-top: 20px;
}

.footerBottom{
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
    line-height: 20px/9;
    *line-height: 20px;
    _line-height: 20px;
}

.footerBottom li{
    float: left;
    margin-right: 30px;
}

.footerBottom li i{
    display: block;
    float: left;
}

.footerBottom li span{
    display: block;
    float: left;
    margin-left: 5px;
}

.footerBottom li i img{
    width: 20px;
}


</style>
<div style="width: 100%;height: 10px;background-color: #222;"></div>
<div class="footer">
    <div class="footerInner clearfix">
        <div class="footerRight">
            <div class="footerTop clearfix">
                <div class="d0">
                    <p>Copyright &copy; 2016-2018 </p>
                </div>
                <div class="d1">
                    <!-- <p><a href="http://www.windway.cn/" target="_target">广州市风标电子技术有限公司</a></p>
                    <p><a href="##">风标学院——计算机学院</a></p> -->
           			 <p><a href="##">风标学院—电子信息工程学院</a></p>
           			 <p><a href="http://www.windway.cn/" target="_target">广州市风标教育技术股份有限公司</a></p>
                </div>
                <div class="d2">
                    <img src="${ctx}/staticfile/images/webFooter/unite.png" alt="">
                </div>
                <p class="d3">联合研制</p>
            </div>
        </div>
    </div>
</div>