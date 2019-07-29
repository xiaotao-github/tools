package com.vcooc.common.util;


import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;

import java.io.InputStream;

import org.apache.log4j.Logger;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.StreamOpenOfficeDocumentConverter;
import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;

/*

 * doc docx、ppt、pptx格式转换为swf
 * @author Administrator
 */

public class DocConverter {
	private static Logger logger = Logger.getLogger(DocConverter.class);  
	
	//openOffice 的端口号
	private Integer OPENOFFICE_PORT = 8100;
	private String swfPath;
    private static final int environment=1;//环境1：windows 2:linux(涉及pdf2swf路径问题)
    private String OPENOFFICEPATH;

    private String fileString;

    private String outputPath="";//输入路径，如果不设置就输出在默认位置

    private String fileName;
    
    private File pdfFile;

    private File swfFile;

    private File docFile;
    
    private String type;
    

   

    public DocConverter(String fileString,String swfPath,String OPENOFFICEPATH)

    {
        ini(fileString,swfPath,OPENOFFICEPATH);
    }

   

    /*

     * 重新设置 file

     * @param fileString

     */

    public void setFile(String fileString,String swfPath,String OPENOFFICEPATH)

    {

        ini(fileString,swfPath,OPENOFFICEPATH);

    }

   

    /*

     * 初始化

     * @param fileString

     */

    private void ini(String fileString,String SwfPath,String OPENOFFICEPATH){
        this.fileString=fileString;
        this.OPENOFFICEPATH = OPENOFFICEPATH;
        this.swfPath = SwfPath;
        this.fileName=fileString.substring(0,fileString.lastIndexOf("."));
        this.type = fileString.substring(fileString.lastIndexOf(".")+1);
        docFile=new File(fileString);
        pdfFile=new File(fileName+".pdf");
        swfFile=new File(fileName+".swf");
    }

   

    /*

     * 转为PDF

     * @param file

     */

    private void doc2pdf() throws Exception

    {

        if(docFile.exists())

        {

            if(!pdfFile.exists())

            {
                try
                {
                    
                    if(type.matches("^.*(ppt|pptx)$")){
                    	System.out.println(docFile);
                    	System.out.println(pdfFile);
                    	System.out.println(docFile.getAbsolutePath());
                    	ppt2pdf(docFile.getAbsolutePath(),pdfFile.getAbsolutePath());
                    }else{
                    	JavaCallOpenoffice.Openoffice(OPENOFFICEPATH);
                        OpenOfficeConnection connection=new SocketOpenOfficeConnection(OPENOFFICE_PORT);
                    	connection.connect();
                    	DocumentConverter converter=new StreamOpenOfficeDocumentConverter(connection);
                    	converter.convert(docFile,pdfFile);
                    	//close the connection
                    	connection.disconnect();
                    	JavaCallOpenoffice.DistorySoffice();
                    }

                    System.out.println("****pdf转换成功，PDF输出："+pdfFile.getPath()+"****");
                    
                }
                catch(java.net.ConnectException e)
                {
                    //ToDo Auto-generated catch block
                    e.printStackTrace();
                    System.out.println("****swf转换异常，openoffice服务未启动！****");
                    throw e;
                }
                catch(com.artofsolving.jodconverter.openoffice.connection.OpenOfficeException e)
                {
                    e.printStackTrace();
                    System.out.println("****swf转换器异常，读取转换文件失败****");
                    throw e;
                }
                catch(Exception e)
                {
                    e.printStackTrace();
                    throw e;
                } 
            }
            else
            {
                System.out.println("****已经转换为pdf，不需要再进行转化****");
            }
        }
        else
        {
            System.out.println("****swf转换器异常，需要转换的文档不存在，无法转换****");
        }
    }
   
    public  void ppt2pdf(String source,String target){
    	System.out.println("开始转换PPT");
    	  ActiveXComponent app = null;  
    	  Dispatch presentation = null;
    	  try {  
    	   app = new ActiveXComponent("KWPP.Application");  
    	   Dispatch presentations = app.getProperty("Presentations").toDispatch();  
    	   presentation = Dispatch.call(presentations,//  
    	     "Open",   
    	     source,// FileName  
    	     true,// ReadOnly  
    	     true,// Untitled 指定文件是否有标题。  
    	     false // WithWindow 指定文件是否可见。  
    	     ).toDispatch();  
    	  
    	   File tofile = new File(target);  
    	   if (tofile.exists()) {  
    	    tofile.delete();  
    	   }  
    	   Dispatch.call(presentation,//  
    	     "SaveAs", //  
    	     target, // FileName  
    	     32);  
    	   Dispatch.call(presentation, "Close");  
    	  } catch (Exception e) {
    		  logger.info(e.getMessage());
    		  System.out.println("========Error:文档转换失败：" + e.getMessage());
    	
    	  } finally {  
    		  if (app != null) app.invoke("Quit");
    	  }  
      }
    
    

    /*
     * 转换成swf
     */
    @SuppressWarnings("unused")
	private void pdf2swf() throws Exception
    {
        Runtime r=Runtime.getRuntime();
        if(!swfFile.exists())
        {
            if(pdfFile.exists())
            {

                if(environment==1)//windows环境处理
                {
                	if(swfPath==null){
                		throw new RuntimeException("SWFTool路径不能为空");
                	}
                    try {
                    	/*if(pdfFile.length()>){
                    		
                    	}*/
                    	
 //                   	Process p=r.exec(swfPath+"/pdf2swf.exe "+pdfFile.getPath()+" -s  flashversion=9 -o "+swfFile.getPath()+" -T 9");
                        Process p=r.exec(swfPath+"/pdf2swf.exe "+pdfFile.getPath()+" -s poly2bitmap flashversion=9 -o "+swfFile.getPath()+" -T 9");
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.print(loadStream(p.getErrorStream()));
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.println("****swf转换成功，文件输出："+swfFile.getPath()+"****");
                        if(pdfFile.exists())
                        {
                            pdfFile.delete();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        throw e;
                    }
                }

                else if(environment==2)//linux环境处理
                {
                    try {
                        Process p=r.exec("pdf2swf "+pdfFile.getPath()+" -o "+swfFile.getPath()+" -T 9");
                        System.out.print(loadStream(p.getInputStream()));
                        System.err.print(loadStream(p.getErrorStream()));
                        System.err.println("****swf转换成功，文件输出："+swfFile.getPath()+"****");
                        if(pdfFile.exists())
                        {
                            pdfFile.delete();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        throw e;
                    }
                }
            }
            else {
                System.out.println("****pdf不存在，无法转换****");
            }
        }
        else {
            System.out.println("****swf已存在不需要转换****");
        }
    }
    static String loadStream(InputStream in) throws IOException
    {
        int ptr=0;
        in=new BufferedInputStream(in);
        StringBuffer buffer=new StringBuffer();
        while((ptr=in.read())!=-1)
        {
            buffer.append((char)ptr);
        }
        return buffer.toString();
    }

   

    /*

     * 转换主方法

     */

    public boolean conver()
    {
       
        try {
            doc2pdf();
            pdf2swf();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        if(swfFile.exists())

        {
            return true;
        }
        else {
            return false;
        }
    }
   
    /*

     * 返回文件路径

     * @param s

     */

    public String getswfPath()
    {
        if(swfFile.exists())

        {
            String tempString =swfFile.getPath();
            tempString=tempString.replaceAll("\\\\", "/");
            return tempString;
        }
        else{
            return "";
        }
    }

   

    /*

     * 设置输出路径

     */

    public void setOutputPath(String outputPath)

    {
        this.outputPath=outputPath;
        if(!outputPath.equals(""))
        {
            String realName=fileName.substring(fileName.lastIndexOf("/"),fileName.lastIndexOf("."));
            if(outputPath.charAt(outputPath.length())=='/')
            {
                swfFile=new File(outputPath+realName+".swf");
            }
            else
            {
                swfFile=new File(outputPath+realName+".swf");
            }
        }
    }

    public static void 	main(String s[]) throws IOException{
		DocConverter d=new DocConverter("D:/vcooc_file/resource_share/student_file/理工学院/liuxurui/三电实验智能在线互动与考核评估系统1/2019-04-19-17-28-10-202_三电实验智能在线互动与考核评估系统1.pptx","D:\\swftools", "D:\\openOffice\\openoprenoffice.bat");
		d.conver();
    	String source = "";
    	String target = "C:/Users/ITcast/2019-04-20-11-04-51-178_物联传感智能家居产品介绍.swf";
    	//String source = "G:\\Proteus仿真技术课程.xls";
    	//String target = "G:\\aaa.pdf";
    	//File file = new File(source);
    } 
}