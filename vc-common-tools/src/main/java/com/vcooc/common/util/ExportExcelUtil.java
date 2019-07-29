package com.vcooc.common.util;

import java.io.File;
/**
 * 导出excel表格
 */
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

public class ExportExcelUtil {
	/**
	 * 
	 * @param response:请求
	 * @param headers：表格第一行
	 * @param list：
	 * @param filePath：服务器存储表格的路径
	 * @return
	 */
	public static File exportExcel(HttpServletResponse response, String[] headers, List<String> list,String fileName) {

		// 创excel工作簿
		HSSFWorkbook wb = new HSSFWorkbook();
		Sheet sheet = wb.createSheet();
		//样式
		sheet.setDefaultColumnWidth(26);//行宽 
		

		// 创建第一行
		Row firstRow = sheet.createRow(0);
		//行高
		firstRow.setHeightInPoints(20);  
		// 设置表头
		for (int i = 0; i < headers.length; i++) {
			//字体
			HSSFCellStyle  cellStyle =  wb.createCellStyle();  
			cellStyle.setWrapText(true); 
			Font font = wb.createFont();
		    font.setFontHeightInPoints((short)13); //字体大小
		    font.setFontName("微软雅黑");
		    font.setBoldweight(Font.BOLDWEIGHT_BOLD); //粗体
		    font.setColor(HSSFColor.WHITE.index);//HSSFColor.VIOLET.index //字体颜色
			//自定义颜色
			HSSFPalette palette = wb.getCustomPalette();
			palette.setColorAtIndex(HSSFColor.GREY_80_PERCENT.index, (byte)79, (byte)165, (byte)190);

		    cellStyle.setFillForegroundColor(HSSFColor.GREY_80_PERCENT.index);//单元格背景颜色
		
			cellStyle.setAlignment(CellStyle.ALIGN_CENTER);//水平居中  
			cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);//垂直居中  
            cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			Cell  cell = firstRow.createCell(i);
		    
		    cellStyle.setFont(font);
			cell.setCellStyle(cellStyle);
			cell.setCellValue(headers[i]);
		}

	
		String[] array = null;
		String str = "";
		Row row = null;
		for (int i = 0; i < list.size(); i++) {
			str = list.get(i);
			array = str.split(",");

			// 创建一行
			row = sheet.createRow(i + 1);
			//行高
			row.setHeightInPoints(20);  
			for (int j = 0; j < array.length; j++) { 
				 if(i%2==0){
				//字体
				HSSFCellStyle  cellStyle1 =  wb.createCellStyle(); 
				cellStyle1.setWrapText(true);   
				//自定义颜色
				HSSFPalette palette = wb.getCustomPalette();
				palette.setColorAtIndex(HSSFColor.LEMON_CHIFFON.index, (byte)228, (byte)255, (byte)255);
		    	//字体
				Font font = wb.createFont();
			    font.setFontHeightInPoints((short)11); //字体大小
			    font.setFontName("宋体");
			    cellStyle1.setFillForegroundColor(HSSFColor.BRIGHT_GREEN.index);
				
			    cellStyle1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);//垂直居中 
			    cellStyle1.setAlignment(CellStyle.ALIGN_CENTER);//水平居中
			    cellStyle1.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND); 
			    cellStyle1.setFillForegroundColor(HSSFColor.LEMON_CHIFFON.index);//单元格背景颜色
				// 创建单元格
				Cell cell = row.createCell(j);
				 
				cellStyle1.setFont(font);
			    //文字居中
				cell.setCellStyle(cellStyle1);
				// 给单元格设值
				cell.setCellValue(array[j]);
				 }else{
					 HSSFCellStyle  cellStyle2 =  wb.createCellStyle(); 
						cellStyle2.setWrapText(true);   
				    	//字体
						Font font = wb.createFont();
					    font.setFontHeightInPoints((short)11); //字体大小
					    font.setFontName("宋体");
					    cellStyle2.setFillForegroundColor(HSSFColor.BRIGHT_GREEN.index);
						
					    cellStyle2.setVerticalAlignment(CellStyle.VERTICAL_CENTER);//垂直居中 
					    cellStyle2.setAlignment(CellStyle.ALIGN_CENTER);//水平居中
					    cellStyle2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND); 
					    cellStyle2.setFillForegroundColor(HSSFColor.WHITE.index);//单元格背景颜色
						// 创建单元格
						cellStyle2.setFont(font);
						Cell cell = row.createCell(j);
						 
						cellStyle2.setFont(font);
					    //文字居中
						cell.setCellStyle(cellStyle2);
						// 给单元格设值
					   cell.setCellValue(array[j]);
					 
				 }
				 
			}
		}
		ServletOutputStream outputStream = null;
		try {
			// 设置文件名
			fileName = new String((fileName).getBytes(), "ISO8859_1");
			// 组装附件名称和格式
			response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
			outputStream = response.getOutputStream();
			wb.write(outputStream);
			outputStream.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				outputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
      return null;
	}
}
