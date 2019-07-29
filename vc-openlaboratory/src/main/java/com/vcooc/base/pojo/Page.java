package com.vcooc.base.pojo;

import java.util.List;
/**
 * 分页对象
 * @author Administrator
 *
 * @param <T>
 */
public class Page<T> {
	private List<T> list;//数据
	
	private Integer pageSize=6;//每页显示数量
	
	private Integer thisPage=0;//当前页码
	
	private Integer pageNum = 0;//总页码
	
	private Integer total;
	
	private Integer startNumber; //分页时,偏移量,
	
	private Integer endNum=1;    //最后一页
	
	public Page() {
		super();
	}
	public Page(List<T> list,Integer thisPage,Integer pageSize,Integer total){
		this.list = list; 	
		this.thisPage = thisPage;
		this.pageSize = pageSize;
		if(list!=null){
		this.pageNum = total/pageSize+(total%pageSize==0?0:1);
		}
		this.total = total;
		if(total != null && total >0 && pageSize != null && pageSize >0)
			this.endNum = total/pageSize;
		if(total%pageSize != 0) this.endNum++;
	}
	
	public Integer getStartNumber() {
		return startNumber;
	}
	public void setStartNumber(Integer startNumber) {
		this.startNumber = startNumber;
	}
	public List<T> getList() {
		return list;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public Integer getThisPage() {
		return thisPage;
	}
	public Integer getPageNum() {
		return pageNum;
	}
	public void setList(List<T> list) {
		this.list = list;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public void setThisPage(Integer thisPage) {
		this.thisPage = thisPage;
	}
	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getEndNum() {
		return endNum;
	}
	public void setEndNum(Integer endNum) {
		this.endNum = endNum;
	}
}
