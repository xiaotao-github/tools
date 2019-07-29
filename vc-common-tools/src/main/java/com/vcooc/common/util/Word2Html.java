package com.vcooc.common.util;

import org.springframework.core.env.SystemEnvironmentPropertySource;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;


public class Word2Html {
	public static final int WORD_HTML = 8;
	//public static final int WORD_TXT = 7;
	public static final int PPT_HTML = 12;
	public static final int EXCEL_HTML = 44;

	/**
	 * 需要导入文件包  jacob.jar 和 jacob-1.17-x86.dll（这个根据电脑配置  32位  64位）
	 * 
	 */
	/**
	 * WORD转HTML
	 * @param docfile WORD文件全路径
	 * @param htmlfile 转换后HTML存放路径
	 */
	public static void wordToHtml(String docfile, String htmlfile)
	{
		System.out.println("---------------开始word----------------");
		ActiveXComponent app = new ActiveXComponent("word.Application"); // 启动   word 换成 WPS
		
		try
		{
			app.setProperty("Visible", new Variant(false));
			Dispatch docs = app.getProperty("Documents").toDispatch();
			Dispatch doc = Dispatch.invoke(
					docs,
					"Open",
					Dispatch.Method,
					new Object[] { docfile, new Variant(false),
							new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(doc, "SaveAs", Dispatch.Method, new Object[] {
					htmlfile, new Variant(WORD_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(doc, "Close", f);
		}
		catch (Exception e)
		{
			System.out.println("---------------获取启动word组件失败----"+ e.getMessage());
			e.printStackTrace();
		}
		finally
		{
			
			app.invoke("Quit", new Variant[] {});
		}
	}
	
	/**
	 * EXCEL转HTML
	 * @param xlsfile EXCEL文件全路径
	 * @param htmlfile 转换后HTML存放路径
	 */
	public static void excelToHtml(String xlsfile, String htmlfile)
	{
		ActiveXComponent app = new ActiveXComponent("Excel.Application"); // 启动word
		try
		{
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.invoke(
					excels,
					"Open",
					Dispatch.Method,
					new Object[] { xlsfile, new Variant(false),
							new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {
					htmlfile, new Variant(EXCEL_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			app.invoke("Quit", new Variant[] {});
		}
	}
	
	
	 /**
     * PowerPoint转成HTML
     * 
     * @param pptPath
     *            PowerPoint文件全路径
     * @param htmlfile
     *            转换后HTML存放路径
     */
    public static void pptToHtml(String pptPath, String htmlPath) {
       ActiveXComponent offCom = new ActiveXComponent("PowerPoint.Application");
       try {
           offCom.setProperty("Visible", new Variant(true));
           Dispatch excels = offCom.getProperty("Presentations").toDispatch();
           Dispatch excel = Dispatch.invoke(
                  excels,
                  "Open",
                  Dispatch.Method,
                  new Object[] { pptPath, new Variant(false),
                         new Variant(false) }, new int[1]).toDispatch();
           Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {
                  htmlPath, new Variant(PPT_HTML) }, new int[1]);
           Variant f = new Variant(false);
           Dispatch.call(excel, "Close");
       } catch (Exception e) {
           e.printStackTrace();
       } finally {
           offCom.invoke("Quit", new Variant[] {});
       }
    }
    
    
    public static void main(String[] args) {
		String docfile="C:/Users/ITcast/Desktop/2019-04-20-11-04-51-178_物联传感智能家居产品介绍.ppt";
		//String htmlfile = docfile.substring(0, docfile.lastIndexOf("."))+".html";
		//System.out.println(htmlfile);
		String htmlfile="C:/Users/ITcast/Desktop/周报、月报/target/2019-04-20-11-04-51-178_物联传感智能家居产品介绍.html";
		//Word2Html.pptToHtml(docfile, htmlfile);
		

		 ActiveXComponent xl = new ActiveXComponent("kwpp.Application");
		        Dispatch xlo = (Dispatch)(xl.getObject());
		        try {
		             System.out.println("version="+xl.getProperty("Version"));
		             System.out.println("version="+Dispatch.get(xlo, "Version"));
		        } catch (Exception e) {
		            e.printStackTrace();
		        } finally {
		            xl.invoke("Quit", new Variant[] {});
		        }
		
		
	}
}
