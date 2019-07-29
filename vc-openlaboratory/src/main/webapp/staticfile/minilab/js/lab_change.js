//分页方法和事件
$(".paging_previous.pre").off().on("click",function(){
	//上一页
	var page = $(this).attr("thisPage");
	reloadPage(page);
});

$(".paging_next.next").off().on("click",function(){
	//下一页
	var page = $(this).attr("thisPage");
	var totalPage = $(".paging_jump").attr("thisPage");//总页数
	reloadPage(page);
});

$(".paging_jump").off().on("change",function(){
	//跳转页
	var jumpPage = $(".paging_jump").val(); //跳转的页数
	var totalPage = $(".paging_jump").attr("thisPage");//总页数
	if(jumpPage<=0) return false;
	if(jumpPage>totalPage){
		layer.msg("最多只能跳转到第"+totalPage+"页", { icon : 2, time : 2000 });
		return false;
	}
	reloadPage(jumpPage/1-1);
});


//跳转页面的请求
function reloadPage(pageNum){
	$("#PageForm input[name='thisPage']").val(pageNum);
	$("#PageForm input[name='keyword']").val($("#searchForm input[name='keyword']").val());
	$("#PageForm").submit();
}