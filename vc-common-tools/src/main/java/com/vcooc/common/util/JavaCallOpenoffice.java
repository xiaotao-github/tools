package com.vcooc.common.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

/**
 * java控制openOffice工具类
 * 
 * @author Administrator
 *Openoffice 启动openOffice
 *DistorySoffice 关闭openOffice
 */
public class JavaCallOpenoffice {
	
	public static  void Openoffice(String filePath,String dish,String prgramPath,String host,String port) {
		Runtime rn = Runtime.getRuntime();
		Process p = null;
		try {
			File file = new File(filePath);
			if (false == file.exists()) {
				FileWriter writer = new FileWriter(filePath);
				writer.write("@echo   off ");
				writer.write("\r\n ");
				writer.write(dish+":");
				writer.write("\r\n ");
				writer.write("CD "+prgramPath);
				writer.write("\r\n");
				writer.write(
						"soffice -headless -accept=socket,host="+host+",port="+port+";urp;" + " -nofirststartwizard");
				writer.write("\r\n ");
				writer.write("@echo   on ");
				writer.close();
			}
			p = rn.exec("cmd.exe /"+dish+" "+ filePath);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}
	public static  void Openoffice(String OPENOFFICEPATH) {
		Runtime rn = Runtime.getRuntime();
		Process p = null;
		try {
			p = rn.exec("cmd.exe / "+ OPENOFFICEPATH);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}
	    /**
	     * 构造方法，实现关闭soffice进程
	     */
	    public static void DistorySoffice() {
	    	 Process process=null;
	        try {
	            //显示进程
	            process=Runtime.getRuntime().exec("tasklist");
	            Scanner in=new Scanner(process.getInputStream());
	            while (in.hasNextLine()) {
	                String processString=in.nextLine();
	                if (processString.contains("soffice.exe")) {
	                    //关闭soffice进程的命令
	                    String cmd="taskkill /f /im soffice.exe";
	                    process=Runtime.getRuntime().exec(cmd);
	                    System.out.println("openoffice正常关闭.......");
	                }
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
}
