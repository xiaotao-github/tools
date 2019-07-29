package com.vcooc.common.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.util.mime.MimeUtility;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import eu.bitwalker.useragentutils.UserAgent;

/**
 * 文件操作工具类
 * @author ITSmallBird
 */
public class FileOperateUtils {
	
	private static String regExp = "[`~!@%#$^&*()=|{}':;',\\[\\]<>?~！@#￥……&*（）——|{}【】‘；：”“'，、？]";
	
	private static final String FILELOCK = "lock";
	/**
	 * 校验文件格式
	 * @param files 文件数组
	 * @param format ：符合的文件格式： 多个格式之间用"|"隔开，如："jpg|png|gif"
	 * @return:true:校验通过、false:校验不通过
	 */
	public static Boolean checkFilepattern(MultipartFile[] files,String format){
		for (MultipartFile file : files) {
			if(file.getSize()>0){
				//1.获取文件后缀名
				String fileName = file.getOriginalFilename();//原始文件名
				String extFileName = fileName.substring(fileName.lastIndexOf("."));//文件后缀名
				String lowerExt = extFileName.toLowerCase();
				if(!extFileName.matches("^.*("+lowerExt+")$")){	//正则表达式校验
					return false;
				}
			}
		}
		return true;
	}
	/**
	 * 校验文件格式
	 * @param file
	 * @param format
	 * @return true:校验通过、false:校验不通过
	 */
	public static Boolean checkFilepattern(MultipartFile file,String format){
			//1.获取文件后缀名
			String fileName = file.getOriginalFilename();//原始文件名
			String extFileName = fileName.substring(fileName.lastIndexOf("."));//文件后缀名
			String lowerExt = extFileName.toLowerCase();
			return lowerExt.matches("^.*("+format+")$");	//正则表达式校验
	}
	
	/**
	 * 上传资源，根据业务需求，参数根据业务需求设定
	 * @param parentPath : 主路径,从配置文件中读取
	 * @param protectName :项目名称,从配置文件中读取
	 * @param libraryName ：库名 ,除了资源管理子系统，其他系统上传的无库名，组写 ""
	 * @param authorName ：作者名
	 * @param fileTitle : 文件标题
	 * @param file ： 文件
	 * @return	文件存放路径(除去主路径)
	 * @throws IllegalStateException
	 * @throws IOException
	 * @return protectName+"/"+libraryName+"/"+authorName+"/"+fileTitile+"/"+newFileName
	 */
	public static String upload(String parentPath,String protectName,String libraryName,String authorName,String fileTitile,MultipartFile file) throws IllegalStateException, IOException{
		 if(!StringUtils.isNotEmpty(parentPath)){
			 throw new RuntimeException("文件存放路径的主目录不能为空");
		 }
		 if(!StringUtils.isNotEmpty(protectName)){
			 throw new RuntimeException("文件存放路径的所属项目目录不能为空");
		 }
		 if(!StringUtils.isNotEmpty(libraryName)){
			 libraryName = "";
		 }
		 if(!StringUtils.isNotEmpty(fileTitile)){
			 fileTitile = "";
		 }
		 if(!StringUtils.isNotEmpty(authorName)){
			 throw new RuntimeException("文件存放路径的所属作者不能为空");
		 }
		//1.生成文件存放路径:主路径+库名+后缀名
		 //去掉文件中最后有x的（pptx,docx xlsx 无法解析转为ppt、doc、xls）
		String oldFileName = file.getOriginalFilename();//原始文件名
		//将文件的关键词去掉
		oldFileName = oldFileName.replaceAll(regExp, "");
		if(oldFileName.endsWith("x")){
			oldFileName = oldFileName.substring(0,oldFileName.length()-1);
		}
		//3.生成文件存放路径
		String dir = parentPath+"/"+protectName+"/"+libraryName+"/"+authorName+"/"+fileTitile;
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
		return ((protectName+"/"+libraryName+"/"+authorName+"/"+fileTitile+"/").replaceAll(" ","")).trim()+newFileName;
	}
	/**
	 * 上传资源，根据业务需求，参数根据业务需求设定
	 * @param parentPath : 主路径,从配置文件中读取
	 * @param protectName :项目名称,从配置文件中读取
	 * @param libraryName ：库名 ,除了资源管理子系统，其他系统上传的无库名，组写 ""
	 * @param authorName ：作者名
	 * @param file ： 文件
	 * @return	文件存放路径(除去主路径)
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static String upload(String parentPath,String protectName,String libraryName,String authorName,MultipartFile file) throws IllegalStateException, IOException{
			 if(!StringUtils.isNotEmpty(parentPath)){
				 throw new RuntimeException("文件存放路径的主目录不能为空");
			 }
			 if(!StringUtils.isNotEmpty(protectName)){
				 throw new RuntimeException("文件存放路径的所属项目目录不能为空");
			 }
			 if(!StringUtils.isNotEmpty(libraryName)){
				 libraryName = "";
			 }
			 if(!StringUtils.isNotEmpty(authorName)){
				 throw new RuntimeException("文件存放路径的所属作者不能为空");
			 }
			 authorName = authorName.replaceAll(regExp, "");
			 libraryName = libraryName.replaceAll(regExp, "");
			 
			//1.生成文件存放路径:主路径+库名+后缀名
			//2.获取文件格式
			String oldFileName = file.getOriginalFilename();	//原始文件名
			oldFileName = oldFileName.replaceAll(regExp, "");
			//3.生成文件存放路径
			String dir = parentPath+"/"+protectName+"/"+libraryName+"/"+authorName+"/";
			dir = dir.replace(" ","").trim();
			//若目录不存在，创建目录
			File path = new File(dir);
			if(!path.exists()){
				path.mkdirs();
			}
			oldFileName = oldFileName.replaceAll(regExp, "");
			//4.生成新的文件名称 作者&时间戳_&$文件名称  -->分割线 _&$
			String newFileName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date())+"-"+RandomUtils.nextInt(100, 999)+"_"+oldFileName;
			newFileName = newFileName.replace(" ","").trim();
			file.transferTo(new File(dir+"/"+newFileName));
			return (protectName+"/"+libraryName+"/"+authorName+"/").replaceAll(" ", "").trim()+newFileName;
	}
	
	public static String upload(MultipartFile file,String parentPath,String...params) throws IllegalStateException, IOException{
		 if(!StringUtils.isNotEmpty(parentPath)){
			 throw new RuntimeException("文件存放路径的主目录不能为空");
		 }
		 StringBuilder sb = new StringBuilder();
		 for (String str : params) {
			 str = str.replaceAll(regExp, "");
			 sb.append(str).append("/");
		}
		 String filePath = sb.toString().replace(" ","").trim();
		 sb.insert(0,parentPath+"/");
		//1.生成文件存放路径:主路径+库名+后缀名
		//2.获取文件格式
		//3.生成文件存放路径
		String dir = sb.toString().replace(" ", "").trim();
		//若目录不存在，创建目录
		File path = new File(dir);
		if(!path.exists()){
			path.mkdirs();
		}
		String oldFileName = file.getOriginalFilename();	//原始文件名
		oldFileName = oldFileName.replaceAll(regExp, "");
		//4.生成新的文件名称 作者&时间戳_&$文件名称  -->分割线 _&$
		String newFileName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date())+"-"+RandomUtils.nextInt(100, 999)+"_"+oldFileName;
		newFileName = newFileName.replace(" ","").trim();
		file.transferTo(new File(dir+"/"+newFileName));
		return filePath+"/"+newFileName;
	}
	/**
	 * 上传文件 返回文件和格式化的文件路径
	 * 注意 格式化工具要安装在C盘
	 * @param file
	 * @param parentPath
	 * @param params
	 * @return filePath 文件路径  fileFormatPath 文件格式化路径
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static Map<String,String> uploadReturnMap(MultipartFile file,String parentPath,String...params) throws IllegalStateException{
		 if(!StringUtils.isNotEmpty(parentPath)){
			 throw new RuntimeException("文件存放路径的主目录不能为空");
		 }
		 StringBuilder sb = new StringBuilder();
		 for (String str : params) {
			 str = str.replaceAll(regExp, "");
			 sb.append(str).append("/");
		}
		 String filePath = sb.toString().replace(" ","").trim();
		 sb.insert(0,parentPath+"/");
		//1.生成文件存放路径:主路径+库名+后缀名
		//2.获取文件格式
		//3.生成文件存放路径
		String dir = sb.toString().replace(" ", "").trim();
		//若目录不存在，创建目录
		File path = new File(dir);
		if(!path.exists()){
			path.mkdirs();
		}
		String oldFileName = file.getOriginalFilename();	//原始文件名
		oldFileName = oldFileName.replaceAll(regExp, "");
		String fileSuffix = oldFileName.substring(oldFileName.lastIndexOf(".")+1, oldFileName.length());//文件后缀
		//4.生成新的文件名称 作者&时间戳_&$文件名称  -->分割线 _&$
		String newFileName = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date())+"-"+RandomUtils.nextInt(100, 999)+"_"+oldFileName;
		newFileName = newFileName.replace(" ","").trim();
		File saveFile = new File(dir+"/"+newFileName);
		try {
			file.transferTo(saveFile);
		} catch (IOException e) {
			saveFile.delete();
			throw new RuntimeException("文件上传失败:"+e.getMessage());
		}
		
		Map<String,String> map = new HashMap<String,String>();
		map.put("filePath", filePath+"/"+newFileName);
		boolean isFormat = false;
		//格式化资源  获取文件后缀
		FileFormatUtil fileFormatUtil = FileFormatUtil.getFileFormatUtil("C:\\Program Files (x86)\\SWFTools", "C:\\openoprenoffice.bat");
		if (fileSuffix.matches("^.*(asx|asf|mpg|wmv|3gp|mp4|mov|avi)$")) { // 视频格式
				String previewtPath = newFileName.substring(0, newFileName.lastIndexOf(".")) + ".flv";
				fileFormatUtil.addFilePath(dir+"/"+newFileName);
				map.put("fileFormatPath",filePath+"/"+previewtPath);
				isFormat = true;
			}else if(fileSuffix.matches("^.*(ppt|pptx|xls|xlsx)$")){//文档格式
				String previewtPath = newFileName.substring(0, newFileName.lastIndexOf(".")) + ".swf";
				fileFormatUtil.addFilePath(dir+"/"+newFileName);
				map.put("fileFormatPath",filePath+"/"+previewtPath);
				isFormat = true;
			}else if(fileSuffix.matches("^.*(doc|docx)$")){//doc|docx| doc转换为html文档格式
				String previewtPath = newFileName.substring(0, newFileName.lastIndexOf(".")) + ".html";
				fileFormatUtil.addFilePath(dir+"/"+newFileName);
				map.put("fileFormatPath",filePath+"/"+previewtPath);
				isFormat = true;
			}
		if(isFormat)fileFormatUtil.run();
		return map;
	}
	
	/**
	 * 上传资源，根据业务需求，参数根据业务需求设定
	 * @param parentPath : 父目录，配置文件中读取
	 * @param targetPath : 文件存放路径
	 * @param file ： 文件
	 * @return	文件存放路径(除去主路径)
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public static String upload(String parentPath,String targetPath,MultipartFile file) throws IllegalStateException, IOException{
			 if(!StringUtils.isNotEmpty(targetPath)){
				 throw new RuntimeException("文件存放路径的不能为空");
			 }
			 targetPath = targetPath.replace(" ", "").trim();
			 targetPath = targetPath.replaceAll(regExp, "");
			//1.生成文件存放路径:主路径+库名+后缀名
			//2.获取文件格式
			String oldFileName = file.getOriginalFilename();	//原始文件名
			oldFileName = oldFileName.replaceAll(regExp, "");
			
			//3.生成文件存放路径
			String dir = parentPath+"/"+targetPath;
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
			return targetPath+"/"+newFileName;
	}
	/**
	 * 文件下载
	 * @param request：请求
	 * @param response：响应
	 * @param filePath ： 文件存放路径--主路径+数据库中的文件存放路径
	 * @throws IOException 
	 */
	public static void download(HttpServletRequest request,HttpServletResponse response,String filePath) throws IOException{
			File file = new File(filePath);
	        //判断文件是否存在
	        if(!file.exists()) {
	        	throw new RuntimeException("该文件已经被删除！");
	        }
	        //判断文件类型
	        String mimeType = URLConnection.guessContentTypeFromName(file.getName());
	        if(mimeType == null) {
	            mimeType = "application/octet-stream";
	        }
	        response.setContentType(mimeType);
	         
	        //设置文件响应大小
	        response.setContentLength((int) file.length());
	         
	        //文件名编码，解决乱码问题
	        String fileName =file.getName().substring(file.getName().lastIndexOf("_")+1);
	        String encodedFileName = null;
	        String userAgentString = request.getHeader("User-Agent");
	        String browser = UserAgent.parseUserAgentString(userAgentString).getBrowser().getGroup().getName();
	        if(browser.equals("Chrome") || browser.equals("Internet Exploer") || browser.equals("Safari")) {
	            encodedFileName = URLEncoder.encode(fileName,"utf-8").replaceAll("\\+", "%20");
	        } else {
	            encodedFileName = MimeUtility.decodeText(fileName);
	        }
	        //解决文件名中文乱码问题
	        encodedFileName = new String(encodedFileName.getBytes(), "ISO-8859-1");
	        //设置Content-Disposition响应头，一方面可以指定下载的文件名，另一方面可以引导浏览器弹出文件下载窗口
	        response.setHeader("Content-Disposition", "attachment;fileName=\"" + encodedFileName + "\"");
	         
	        //文件下载
	        InputStream in = new BufferedInputStream(new FileInputStream(file));
	        FileCopyUtils.copy(in, response.getOutputStream());
	    }
	/*
	 * 字符串转码
	 */
	public static String toUtf8String(String s) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 0 && c <= 255) {
                sb.append(c);
            } else {
                byte[] b;
                try {
                    b = Character.toString(c).getBytes("utf-8");
                } catch (Exception ex) {
                    System.out.println(ex);
                    b = new byte[0];
                }
                for (int j = 0; j < b.length; j++) {
                    int k = b[j];
                    if (k < 0)
                        k += 256;
                    sb.append("%" + Integer.toHexString(k).toUpperCase());
                }
            }
        }
        return sb.toString();
    }

	/**
	 * 删除文件，若该文件所属文件夹无其他文件，则同时删除文件夹。
	 * @param filePath 文件路径
	 * @return
	 */
	public static Boolean deleteFile(String filePath,Boolean blf){
		//获取File对象
		File file = new File(filePath);
		synchronized (FILELOCK) {
			//判断该目录是否存在
			if(!file.exists()){//若不存在，指定为删除成功
				return true;
			}
			//判断File对象是目录还是文件
			if(file.isDirectory()){//若File对象是目录
					/*if(file.delete()){// 若是空目录,删除成功，继续递归
						return deleteFile(file.getParent(),blf);
					}else{//若是非空目录，删除失败
						return true;//删除失败，返回删除文件成功
					}*/
					return true;//删除失败，返回删除文件成功
			}else{//若File对象是文件
				if(file.delete()){//删除文件，并判断删除结果，
					//删除成功，获取文件的上级目录,递归删除文件夹
					//return deleteFile(file.getParent(),blf);
					return true;//返回删除文件成功
				}else{
					return false;//删除文件失败
				}
			}
		}
	}
	
	/**
	 * 删除文件夹
	 * @param dir
	 * @param blf
	 * @return
	 */
	public static Boolean deleteDir(File dir,Boolean blf){
		/*synchronized (blf) {
			if (dir.isDirectory()) {
	            String[] children = dir.list();
	        for (int i=0; i<children.length; i++) {
	            boolean success = deleteDir(new File(dir, children[i]),blf);
	            if (!success) {
	                return false;
	            }
	        }
		}
	        // 目录此时为空，可以删除
	        return dir.delete();
		}*/
		return true;
	}
	/**
	 * 删除文件夹
	 * @param dir
	 * @param blf
	 * @return
	 */
	public static Boolean deleteDir(String dirPath,Boolean blf){
		/*synchronized (blf) {
			File dir = new File(dirPath);
			if (dir.isDirectory()) {
	            String[] children = dir.list();
	        for (int i=0; i<children.length; i++) {
	            boolean success = deleteDir(new File(dir, children[i]),blf);
	            if (!success) {
	                return false;
	            }
	        }
		}
	        // 目录此时为空，可以删除
	        return dir.delete();
		}*/
		return true;
	}
}
