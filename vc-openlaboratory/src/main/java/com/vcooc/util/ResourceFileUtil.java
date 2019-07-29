package com.vcooc.util;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import com.vcooc.base.pojo.ResourceFile;

public class ResourceFileUtil {
	/**
	 * 资源文件分类
	 * flvPath ：flv预览路径
	 * swfPath ： swf预览路径
	 * imgPath ：img预览路径
	 * othersPath：其他资源文件
	 * path:磁盘路径，用户判断文件是否存在
	 * @param List<ResourceFile> 资源文件集合
	 * @return 返回分类好的文件预览路径
	 */
	public static Map<String, List<String>> getTypeFile(List<ResourceFile> files,String path) {
		Map<String, List<String>> fileMap = new HashMap<String, List<String>>();
		if (files == null || files.size() == 0) {
			return null;
		}
		// 视频集合
		List<String> flv = new ArrayList<String>();
		// 文档结合
		List<String> swf = new ArrayList<String>();
		// 图片集合
		List<String> img = new ArrayList<String>();
		// 其他资源集合
		List<String> others = new ArrayList<String>();
		// 遍历文件
		for (ResourceFile file : files) {
			if (file != null && file.getFileSize() != null && StringUtils.isNotEmpty(file.getFileFormatPath())) {
				//截取，判断后缀
				String type = file.getFileFormatPath().substring(file.getFileFormatPath().lastIndexOf(".") + 1);
				// 视频
				if (type.equalsIgnoreCase("flv")) {
					flv.add(file.getFileFormatPath());
					// 文档
				} else if (type.equalsIgnoreCase("swf") || type.equalsIgnoreCase("pdf") || type.equalsIgnoreCase("html")) {
					/**
					 * 备注:
					 * 		源文件是swf，后缀加上1
					 * 		源文件是office的，后缀加上2
					 * 		源文件是pdf，后缀加上3
					 * 		源文件是doc/docx的，后缀加上4
					 */
					File tempfile = new File(path+file.getFileFormatPath());
					if (tempfile.exists()) {
						//swf文件存在，判断源文件格式
						String rescourceType = file.getFilePath().substring(file.getFilePath().lastIndexOf(".") + 1);
						if(rescourceType.equalsIgnoreCase("swf")){
							//源文件是swf,后缀加一
							swf.add(file.getFileFormatPath()+1);
						}else if(rescourceType.equalsIgnoreCase("pdf")){
							swf.add(file.getFileFormatPath()+3);
						}else{
							if(type.equalsIgnoreCase("html")){
								swf.add(file.getFileFormatPath()+4);
							}else{
								swf.add(file.getFileFormatPath()+2);
							}
						}
					} else {
						others.add(file.getFilePath());
					}

					// 图片jpg|png|gif|jbp
				} else if (type.equalsIgnoreCase("jpg") || type.equalsIgnoreCase("png") || type.equalsIgnoreCase("gif")
						|| type.equalsIgnoreCase("jbp")) {
					img.add(file.getFileFormatPath());
				} else {
					// 其他资源
					others.add(file.getFileFormatPath());
				}
			}
		}
		fileMap.put("flvPath", flv);
		fileMap.put("swfPath", swf);
		fileMap.put("imgPath", img);
		fileMap.put("othersPath", others);
		return fileMap;
	}
	
	
	/**
	 * 资源文件分类
	 * flvPath ：flv预览路径
	 * swfPath ： swf预览路径
	 * imgPath ：img预览路径
	 * othersPath：其他资源文件
	 * path:磁盘路径，用户判断文件是否存在
	 * @param List<ResourceFile> 资源文件集合
	 * @return 返回分类好的文件预览路径
	 */
	public static Map<String, List<String>> getTypeFile(List<ResourceFile> files) {
		Map<String, List<String>> fileMap = new HashMap<String, List<String>>();
		if (files == null || files.size() == 0) {
			return null;
		}
		// 视频集合
		List<String> flv = new ArrayList<String>();
		// 文档结合
		List<String> swf = new ArrayList<String>();
		// 图片集合
		List<String> img = new ArrayList<String>();
		// 其他资源集合
		List<String> others = new ArrayList<String>();
		// 遍历文件
		for (ResourceFile file : files) {
			if (file != null && file.getFileSize() != null && StringUtils.isNotEmpty(file.getFileFormatPath())) {
				//截取，判断后缀
				String type = file.getFileFormatPath().substring(file.getFileFormatPath().lastIndexOf(".") + 1);
				// 视频
				if (type.equalsIgnoreCase("flv")) {
					flv.add(file.getFileFormatPath());
					// 文档
				} else if (type.equalsIgnoreCase("swf") || type.equalsIgnoreCase("pdf") ) {
					swf.add(file.getFileFormatPath());

					// 图片jpg|png|gif|jbp
				} else if (type.equalsIgnoreCase("jpg") || type.equalsIgnoreCase("png") || type.equalsIgnoreCase("gif")
						|| type.equalsIgnoreCase("jbp")) {
					img.add(file.getFileFormatPath());
				} else {
					// 其他资源
					others.add(file.getFileFormatPath());
				}
			}
		}
		fileMap.put("flvPath", flv);
		fileMap.put("swfPath", swf);
		fileMap.put("imgPath", img);
		fileMap.put("othersPath", others);
		return fileMap;
	}
	
	/**
	 * 资源文件分类
	 * flvPath ：flv预览路径+id
	 * swfPath ： swf预览路径+id
	 * imgPath ：img预览路径+id
	 * othersPath：其他资源文件+id
	 * path:磁盘路径，用户判断文件是否存在+id
	 * @param List<ResourceFile> 资源文件集合
	 * @return 返回分类好的文件预览路径
	 */
	public static Map<String, List<String>> getTypeFileAndId(List<ResourceFile> files,String path) {
		Map<String, List<String>> fileMap = new HashMap<String, List<String>>();
		if (files == null || files.size() == 0) {
			return null;
		}
		// 视频集合
		List<String> flv = new ArrayList<String>();
		// 文档结合
		List<String> swf = new ArrayList<String>();
		// 图片集合
		List<String> img = new ArrayList<String>();
		// 其他资源集合
		List<String> others = new ArrayList<String>();
		// 遍历文件
		for (ResourceFile file : files) {
			if (file != null && file.getFileSize() != null && StringUtils.isNotEmpty(file.getFileFormatPath())) {
				//截取，判断后缀
				String type = file.getFileFormatPath().substring(file.getFileFormatPath().lastIndexOf(".") + 1);
				// 视频
				if (type.equalsIgnoreCase("flv")) {
					flv.add(file.getFileFormatPath()+"@@"+file.getFileId());
					// 文档
				} else if (type.equalsIgnoreCase("swf") || type.equalsIgnoreCase("pdf") || type.equalsIgnoreCase("html")) {
					/**
					 * 备注:
					 * 		源文件是swf，后缀加上1
					 * 		源文件是office的，后缀加上2
					 * 		源文件是pdf，后缀加上3
					 * 		源文件是doc/docx的，后缀加上4
					 */
					File tempfile = new File(path+file.getFileFormatPath());
					if (tempfile.exists()) {
						//swf文件存在，判断源文件格式
						String rescourceType = file.getFilePath().substring(file.getFilePath().lastIndexOf(".") + 1);
						if(rescourceType.equalsIgnoreCase("swf")){
							//源文件是swf,后缀加一
							swf.add(file.getFileFormatPath()+1+"@@"+file.getFileId());
						}else if(rescourceType.equalsIgnoreCase("pdf")){
							swf.add(file.getFileFormatPath()+3+"@@"+file.getFileId());
						}else{
							if(type.equalsIgnoreCase("html")){
								swf.add(file.getFileFormatPath()+4+"@@"+file.getFileId());
							}else{
								swf.add(file.getFileFormatPath()+2+"@@"+file.getFileId());
							}
						}
					} else {
						others.add(file.getFilePath()+"@@"+file.getFileId());
					}

					// 图片jpg|png|gif|jbp
				} else if (type.equalsIgnoreCase("jpg") || type.equalsIgnoreCase("png") || type.equalsIgnoreCase("gif")
						|| type.equalsIgnoreCase("jbp")) {
					img.add(file.getFileFormatPath()+"@@"+file.getFileId());
				} else {
					// 其他资源
					others.add(file.getFileFormatPath()+"@@"+file.getFileId());
				}
			}
		}
		fileMap.put("flvPath", flv);
		fileMap.put("swfPath", swf);
		fileMap.put("imgPath", img);
		fileMap.put("othersPath", others);
		return fileMap;
	}
	
	/**
	 * 
	 * 对资源进行分类
	 * @param list
	 * @return
	 */
	public static List<ResourceFile> getFileType(List<ResourceFile> list){
		for (ResourceFile resourceFile : list) {
			//判断格式化路径是否为空
			if(StringUtils.isNotEmpty(resourceFile.getFileFormatPath())){
				//截取，判断后缀
				String type = resourceFile.getFileFormatPath().substring(resourceFile.getFileFormatPath().lastIndexOf(".") + 1);				
						
				//1.图片 2.视频 3.文档 4.其他
				if(type.equalsIgnoreCase("flv")){
					resourceFile.setType(2);
				}else if(type.equalsIgnoreCase("swf") || type.equalsIgnoreCase("pdf") || type.equalsIgnoreCase("html") ){
					resourceFile.setType(3);
				}else if(type.equalsIgnoreCase("jpg") || type.equalsIgnoreCase("png") || type.equalsIgnoreCase("gif")
						|| type.equalsIgnoreCase("jbp")){
					resourceFile.setType(1);
				}else{
					resourceFile.setType(4);
				}
			}
			
		}
		return list;
	}
	
	}
