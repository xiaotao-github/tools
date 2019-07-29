package com.vcooc.util;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.poifs.filesystem.POIFSFileSystem;


public class Html2WorldUtils {
	/**
	 * 将实验报告转换成world文档下载
	 * @param request
	 * @param response
	 * @param report 实验报告
	 * @param fileName 文档名称
	 * @throws IOException 
	 */
	public static void html2World(HttpServletRequest request,HttpServletResponse response,String report,String fileName) throws IOException{
			String tableCss = "table{width:80%;border: 2px solid #000000;border-right: none;border-bottom: none;border-collapse: collapse;}";
			String trCss = "table tr{height: 35px;padding: 0;border: none;text-align:center;}";
			String tdCss = "table tr td{border: 2px solid #000000;font-size: 14px; text-align:left;}";
			String bodyCss = "body{	text-align:center;	margin-left:auto;	margin-right:auto;}";
			
			/*String tableCss = "table{width:80%;border: 2px solid #333;border-right: none;border-bottom: none;border-collapse: collapse;}";
			String trCss = "table tr{height: 35px;padding: 0;border: none;}";
			String tdCss = "table tr td{border: 2px solid #333;font-size: 14px;}";
			String bodyCss = "body{margin-left:auto;	margin-right:auto;}";*/
			String content ="<html><style>"+bodyCss+tableCss+trCss+tdCss+"</style><body>" + report + "</body></html>";
			POIFSFileSystem fs = new POIFSFileSystem();
			InputStream is = new ByteArrayInputStream(content.getBytes("UTF-8"));
			fs.createDocument(is, "WordDocument");
	        response.setContentType("multipart/form-data");
	        //解决文件名中文乱码问题
	        fileName = new String(fileName.replace(" ","").getBytes(), "ISO-8859-1");
	        //设置文件名
	        response.setHeader("Content-Disposition", "attachment;fileName="+fileName+".doc");
	        //输出到客户端
	        fs.writeFilesystem(response.getOutputStream());
	        is.close();
	}
	
	/**
	 * 单个实验报告生成word文档
	 * @param request
	 * @param response
	 * @param reportMap
	 * @throws IOException
	 */
	public static void html2WorldList(HttpServletRequest request,HttpServletResponse response,Map<String,Object>  map) throws IOException{
			
		String tableCss = "table{width:60%;border: 2px solid #000000;border-right: none;border-bottom: none;border-collapse: collapse;}";
		String trCss = "table tr{height: 35px;padding: 0;border: none;text-align:center;} ";
		String tdCss = "table tr td{border: 2px solid #000000;font-size: 14px; text-align:left;} ";
		String bodyCss = "body{text-align:center; margin-left:auto; margin-right:auto;} ";
		String bodyDivCss = ".body_css{width:60%; margin: 0 auto; }";
		Object reportObj = map.get("report");
		if(reportObj!=null){
			String report = String.valueOf(reportObj).replace("text-align: left","");
			String content ="<html><style>"+bodyCss+tableCss+trCss+tdCss+bodyDivCss+"</style><body><div class='body_css'>" + report + "</div></body></html>";
			POIFSFileSystem fs = new POIFSFileSystem();
			InputStream is = new ByteArrayInputStream(content.getBytes("UTF-8"));
			
		   	fs.createDocument(is, "WordDocument");
	        response.setContentType("multipart/form-data");
	        //解决文件名中文乱码问题
	         String fileName = new String(((String) map.get("fileName")).replace(" ", "").getBytes(), "ISO-8859-1");
	        //设置文件名
	        response.setHeader("Content-Disposition", "attachment;fileName="+fileName+".doc");
	        //输出到客户端
	        fs.writeFilesystem(response.getOutputStream());
	        is.close();
		}
		
}
	
	
/**
 * 批量将实验成绩转换为word并压缩后下载
 * @param request
 * @param response
 * @param reportMap
 * @param filePath 压缩包存储地址
 * @param zipTitle 压缩包文件
 * @throws IOException
 */
	public static void html2WorldList(HttpServletRequest request,HttpServletResponse response,List<Map<String,Object>> reportMap,String filePath,String zipTitle) throws IOException{
	    for (Map<String, Object> map : reportMap) {
	        //解决文件名中文乱码问题
	        String fileName = (String) map.get("fileName");
	    	File dirfile = new File(filePath);
	    	
	    	if(!dirfile.exists()){
				dirfile.mkdirs();
			}
	    	
	    	String tableCss = "table{width:80%;border: 2px solid #000000;border-right: none;border-bottom: none;border-collapse: collapse;}";
			String trCss = "table tr{height: 35px;padding: 0;border: none;text-align:center;}";
			String tdCss = "table tr td{border: 2px solid #000000;font-size: 14px; text-align:left;}";
			String bodyCss = "body{	text-align:center;	margin-left:auto;	margin-right:auto;}";
			
			String content ="<html><style>"+bodyCss+tableCss+trCss+tdCss+"</style><body>" + map.get("report") + "</body></html>";

		
			
			File file = new File(dirfile+File.separator+fileName+".doc");
            if(!file.exists()){
          	  file.createNewFile();
            }
			FileOutputStream out = new FileOutputStream(file);

		    byte[] contentInBytes = content.getBytes("UTF-8");
			   
			   out.write(contentInBytes);
			   out.flush();
			  if(out!=null)out.close();
			
		}
	    //压缩
	    fileToZip(filePath, filePath,zipTitle,response);
	    //下载
	    downloadZip(new File(filePath+File.separator+zipTitle+".zip"), response);
	    //删除压缩文件
	    deleteDir(new File(filePath), true);
}
	
	 /** 
     * 将存放在sourceFilePath目录下的源文件，打包成fileName名称的zip文件，并存放到zipFilePath路径下 
     * @param sourceFilePath :待压缩的文件路径 
     * @param zipFilePath :压缩后存放路径 
     * @param fileName :压缩后文件的名称 
     * @return 
     */  
	public static void fileToZip(String sourceFilePath,String zipFilePath,String fileName,HttpServletResponse response){  
        File sourceFile = new File(sourceFilePath);  
        FileInputStream fis = null;  
        BufferedInputStream bis = null;  
        FileOutputStream fos = null;  
        ZipOutputStream zos = null;  
          
        if(sourceFile.exists() == false){  
            throw new RuntimeException("待压缩的文件目录："+sourceFilePath+"不存在.");  
        }else{  
            try {  
                File zipFile = new File(zipFilePath + "/" + fileName +".zip");  
                if(zipFile.exists()){  
                	throw new RuntimeException(zipFilePath + "目录下存在名字为:" + fileName +".zip" +"打包文件.");  
                }else{  
                    File[] sourceFiles = sourceFile.listFiles();  
                    if(null == sourceFiles || sourceFiles.length<1){  
                    	throw new RuntimeException("待压缩的文件目录：" + sourceFilePath + "里面不存在文件，无需压缩.");  
                    }else{  
                        fos = new FileOutputStream(zipFile);  
                        zos = new ZipOutputStream(new BufferedOutputStream(fos));  
                        byte[] bufs = new byte[1024*10];  
                        for(int i=0;i<sourceFiles.length;i++){  
                            //创建ZIP实体，并添加进压缩包  
                            ZipEntry zipEntry = new ZipEntry(sourceFiles[i].getName());  
                            zos.putNextEntry(zipEntry);  
                            //读取待压缩的文件并写进压缩包里  
                            fis = new FileInputStream(sourceFiles[i]);  
                            bis = new BufferedInputStream(fis, 1024*10);  
                            int read = 0;  
                            while((read=bis.read(bufs, 0, 1024*10)) != -1){  
                                zos.write(bufs,0,read);  
                            }  
                            if(null!= fis)fis.close();
                            if(null!= bis)bis.close();
                        }  
                 
                    }  
                }  
            } catch (FileNotFoundException e) {  
                e.printStackTrace();  
                throw new RuntimeException(e);  
            } catch (IOException e) {  
                e.printStackTrace();  
                throw new RuntimeException(e);  
            } finally{  
                //关闭流  
                try {  
                	 if(null!= bis) bis.close(); 
                     if(null!=fis) fis.close();
                     if(null!= zos) zos.close();  
                     if(null!=fos) fos.close();
                   
                } catch (IOException e) {  
                    e.printStackTrace();  
                    throw new RuntimeException(e);  
                }  
            }  
        }  
 
    }  
	

    /**
     * 以流的形式下载文件
     *
     * @param file
     * @param response
     * @return
     */
    public static HttpServletResponse downloadZip(File file, HttpServletResponse response) {
    	InputStream fis=null;
    	 OutputStream toClient=null;
        try {
        	fis = new BufferedInputStream(new FileInputStream(file.getPath()));
            // 以流的形式下载文件。
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();
            toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            //如果输出的是中文名的文件，在此处就要用URLEncoder.encode方法进行处理
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            try {
            	if(fis!=null) fis.close();
            	if(toClient!=null) toClient.close();
                File f = new File(file.getPath());
                f.delete();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return response;
    }
    

    /**
     * 删除目录以及目录下的所有文件
     * @param dir
     * @param blf
     * @return
     */
	public static Boolean deleteDir(File dir,Boolean blf){
		synchronized (blf) {
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
		}
	}
	
	
}
