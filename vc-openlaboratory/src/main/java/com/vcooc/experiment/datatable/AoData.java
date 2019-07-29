package com.vcooc.experiment.datatable;
/**
 * datatable的分页数据类
 * @author Administrator
 *
 */
public class AoData {
	
	//获取分页的数据
	String sEcho = null;
    int iDisplayStart = 0; // 起始索引
    int iDisplayLength = 0; // 每页显示的行数
    String sSearch = null;//查询条件
    Integer sortCol = null;//排序列表
    String sortDir = "asc";
    Integer size =0;
	public String getsEcho() {
		return sEcho;
	}
	public void setsEcho(String sEcho) {
		this.sEcho = sEcho;
	}
	public int getiDisplayStart() {
		return iDisplayStart;
	}
	public void setiDisplayStart(int iDisplayStart) {
		this.iDisplayStart = iDisplayStart;
	}
	public int getiDisplayLength() {
		return iDisplayLength;
	}
	public void setiDisplayLength(int iDisplayLength) {
		this.iDisplayLength = iDisplayLength;
	}
	public String getsSearch() {
		return sSearch;
	}
	public void setsSearch(String sSearch) {
		this.sSearch = sSearch;
	}
	public Integer getSortCol() {
		return sortCol;
	}
	public void setSortCol(Integer sortCol) {
		this.sortCol = sortCol;
	}
	public String getSortDir() {
		return sortDir;
	}
	public void setSortDir(String sortDir) {
		this.sortDir = sortDir;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
    
    
}
