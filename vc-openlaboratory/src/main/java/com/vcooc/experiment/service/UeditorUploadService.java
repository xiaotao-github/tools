package com.vcooc.experiment.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.common.spring.exetend.PropertyConfig;

@Service
public class UeditorUploadService {
	@PropertyConfig
	private String FILE_PATH;//文件保存的磁盘路径前缀
	
	private  String regExp = "[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";
	
	
	public  String upload(String foldName,MultipartFile file) throws IllegalStateException, IOException{
		 if(!StringUtils.isNotEmpty(foldName)){
			 throw new RuntimeException("文件存放路径的不能为空");
		 }
		 foldName = foldName.replace(" ", "").trim();
		//1.生成文件存放路径:主路径+库名+后缀名
		//2.获取文件格式
		String oldFileName = file.getOriginalFilename();	//原始文件名
		oldFileName = oldFileName.replaceAll(regExp, "");
		//3.生成文件存放路径
		String dir = FILE_PATH+"/"+foldName;
		dir = dir.replace(" ","").trim();
		//若目录不存在，创建目录
		File path = new File(dir);
		if(!path.exists()){
			path.mkdirs();
		}
		//4.生成新的文件名称 作者&时间戳_&$文件名称  -->分割线 _&$
		String newFileName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date())+"-"+RandomUtils.nextInt(100, 999)+"_"+oldFileName;
		newFileName = newFileName.replace(" ","").trim();
		file.transferTo(new File(dir+"/"+newFileName));
		return foldName+"/"+newFileName;
}
}
