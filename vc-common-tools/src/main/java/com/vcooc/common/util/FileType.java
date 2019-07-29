package com.vcooc.common.util;

public enum FileType {
     WORD("word","'doc','docx'"),
     PPT("ppt","'ppt','pptx'"),
     EXCEL("xls","'xls','xlsx'"),
     TXT("txt","'txt'"),
     PDF("pdf","'pdf'"),
     VIDEO("video","'avi','rmvb','rm','mp4','flv','wmv','mpg','mov','3gp','mp3'"),
     SWF("swf","'swf'"),
     CODE("code","'html','js','css'"),
     PDSPRG("pdsprg","'pdsprg'"),
     ZIP("zip","'zip','rar'"),
     DNS("dns","'dns'"),
     CAD("cad","'cad'"),
	 IMG("img","'jpg','gif','png'");
	 
    // 成员变量
	private String name;
    private String fileType;
    // 构造方法，注意：构造方法不能为public，因为enum并不可以被实例化
    private FileType(String name,String fileType) {
      this.fileType = fileType;
      this.name= name;
    }

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
 

 
  
}
