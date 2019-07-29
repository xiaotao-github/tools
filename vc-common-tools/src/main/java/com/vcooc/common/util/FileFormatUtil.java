package com.vcooc.common.util;

import java.io.File;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * 文件格式化工具 单例 ,多线程
 * 
 * @author Administrator
 */
public class FileFormatUtil {
	// 消息队列
	private static final LinkedBlockingQueue<String> QUEUE = new LinkedBlockingQueue<>();
	// 设置单例
	private static final FileFormatUtil FILEFORMATUTIL = new FileFormatUtil();
	// 文档格式化工具
	private static String SWF_PATH = "";
	// 批处理文件路径
	private static String OPENOFFICEPATH = "";
	// 单一线程池
	private static ExecutorService executor = Executors.newSingleThreadExecutor();
	private static final String Lock = "FROMATLOCL";

	private FileFormatUtil() {
	}

	/**
	 * @param SWF_PATH
	 *            SWF工具的路径
	 * @return 获取FileFormatUtil对象
	 */
	public static FileFormatUtil getFileFormatUtil(String SWFDATA, String OpenofficePathDATA) {
		OPENOFFICEPATH = OpenofficePathDATA;
		SWF_PATH = SWFDATA;
		return FILEFORMATUTIL;
	}

	// 运行
	public void run() {
		//JavaCallOpenoffice.Openoffice(OPENOFFICEPATH);
		executor.submit(new Task());
		
		// executor.shutdown();
	}

	/**
	 * 存入需要转换的文件路径
	 * 
	 * @param filePath
	 * @return 成功：true , 失败：false
	 */
	public Boolean addFilePath(String filePath) {
		return QUEUE.offer(filePath);
	}

	/**
	 * @return 返回队列中需要转换的文件的数量
	 */
	public Integer queueSize() {
		return QUEUE.size();
	}

	static class Task implements Runnable {
		public void run() {
			while (true) {
				synchronized (Lock) {
					if (QUEUE.size() > 0) {
						// 移除并获取队列头部的文件路径
						String filePath = QUEUE.poll();
						File srcFile = new File(filePath);
						String fileName = srcFile.getName();
						String extFileName = fileName.substring(fileName.lastIndexOf("."));// 文件后缀名
						if (extFileName.matches("^.*(asx|asf|mpg|wmv|3gp|mp4|mov|avi)$")) { // 视频格式
							// 定义转换后的视频存放路径（统一转为FLV）
							try {
								String targetUrl = filePath.substring(0, filePath.lastIndexOf(".")) + ".flv";
								VideoFormatUtil.formatVideo(filePath, targetUrl);
							} catch (Exception e) {
								e.printStackTrace();
							}
						} else if (extFileName.matches("^.*(ppt|pptx|xls|xlsx)$")) {// 文档格式
							try {
								DocConverter d = new DocConverter(filePath, SWF_PATH,OPENOFFICEPATH);
								d.conver();
							} catch (Exception e) {
								e.printStackTrace();
							}
						} else if (extFileName.matches("^.*(doc|docx)$")) {
							try {
								String htmlfile = filePath.substring(0, filePath.lastIndexOf(".")) + ".html";
								Word2Html.wordToHtml(filePath, htmlfile);
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
					} else {
						break;
					}
				}
			}
		}
	}
}
