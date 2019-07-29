package com.vcooc.base.pojo;

public class EditorResult {

	private String state="SUCCESS";       //返回结果
	private String title;                 //现在文件名称
	private String original;              //文件源文件名称
	private String type;                  //文件类型 .+后缀名
	private String url;                   //文件路径
	private long   size;                  //文件大小
	
	public EditorResult(){
		
	}
	public EditorResult(String title, String original, String url, long size) {
		super();
		this.title = title;
		this.original = original;
		this.url = url;
		this.size = size;
		if(title != null && title != ""){
			this.type = title.substring(title.lastIndexOf("."));
		}
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getOriginal() {
		return original;
	}
	public void setOriginal(String original) {
		this.original = original;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public long getSize() {
		return size;
	}
	public void setSize(long size) {
		this.size = size;
	}
	
}
