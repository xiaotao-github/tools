package com.vcooc.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class ImportExcelUtil {
	private final static String excel2003L = ".xls"; // 2003- 版本的excel
	private final static String excel2007U = ".xlsx"; // 2007+ 版本的excel
/**
 * 
 * @param in：流
 * @param fileName:获取后缀名，判断格式是否正确
 * @param beginRow:开始读取的行数
 * @param cellCount:每行读取的单元格个数
 * @return
 * @throws Exception
 */
	private   List<Object> getBankListByExcel(InputStream in, String fileName,Integer beginRow,Integer cellCount) throws Exception {
		List<Object> list = null;

		// 创建Excel工作薄
		Workbook work = this.getWorkbook(in, fileName);
		if (null == work) {
			throw new Exception("创建Excel工作薄为空！");
		}
		Sheet sheet = null;
		Row row = null;
		Cell cell = null;

		list = new ArrayList<Object>();
	
		// 遍历Excel中所有的sheet
		for (int i = 0; i < work.getNumberOfSheets(); i++) {
			sheet = work.getSheetAt(i);
			if (sheet == null) {
				continue;
			}
			// 遍历当前sheet中的所有行
			for (int j = beginRow-1; j <= sheet.getLastRowNum()+1; j++) {
				row = sheet.getRow(j);
				
				if (row == null || row.getFirstCellNum() == j) {
					
					continue;
				}
              
	
				// 遍历所有的列
				List<Object> li = new ArrayList<Object>();
				for (int y = row.getFirstCellNum(); y <= cellCount; y++) {
					if(y== -1 ){
						continue;
					}
					//单元格为空时，创建一个单元格对象
					if (row.getCell(y) == null){
						cell =row.createCell(y);
						cell.setCellValue("");
					}
					cell = row.getCell(y);
                 
					li.add(this.getCellValue(cell));
				}
				
				//判断该集合是否为""对象
				boolean flag=false;
				for (int k = 0; k < li.size(); k++) {
					if(!"".equals(li.get(k))){
						flag=true;
					}
				}
				if(flag){
					list.add(li);
				}
				
			
			}
		}

		return list;
	}

	/**
	 * 描述：根据文件后缀，自适应上传文件的版本
	 * 
	 * @param inStr,fileName
	 * @return
	 * @throws Exception
	 */
	private  Workbook getWorkbook(InputStream inStr, String fileName) throws Exception {
		Workbook wb = null;
		
	
		String fileType = fileName.substring(fileName.lastIndexOf("."));
		if (excel2003L.equals(fileType)) {
			wb = new HSSFWorkbook(inStr); // 2003-
		} else if (excel2007U.equals(fileType)) {
			wb = new XSSFWorkbook(inStr); // 2007+
		} else {
			throw new Exception("解析的文件格式有误！");
		}
		return wb;
	}

	/**
	 * 描述：对表格中数值进行格式化
	 * 
	 * @param cell
	 * @return
	 */
	private  Object getCellValue(Cell cell) {
		Object value = null;
		DecimalFormat df = new DecimalFormat("0"); // 格式化number String字符
		SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd"); // 日期格式化
		DecimalFormat df2 = new DecimalFormat("0.00"); // 格式化数字
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_STRING:
			value = cell.getRichStringCellValue().getString();
			break;
		case Cell.CELL_TYPE_NUMERIC:
			if ("General".equals(cell.getCellStyle().getDataFormatString())) {
				value = df.format(cell.getNumericCellValue());
			} else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
				value = sdf.format(cell.getDateCellValue());
			} else {
				value = df2.format(cell.getNumericCellValue());
			}
			break;
		case Cell.CELL_TYPE_BOOLEAN:
			value = cell.getBooleanCellValue();
			break;
		case Cell.CELL_TYPE_BLANK:
			value = "";
			break;
		default:
			break;
		}
		return value;
	}
//  String[] toStr(InputStream in,File file)
//	List<String> toStr(InputStream in,File file)
//	将读取的数据转换为list集合
	public static String toStr(InputStream in,String fileName,Integer beginRow,Integer cellCount)  throws Exception {
		String s="";
		List<String> list=new ArrayList<String>();
		List<Object> obj = new ImportExcelUtil().getBankListByExcel(in,fileName,beginRow, cellCount);
		String str="";
		for (Object object : obj) {
			str = object.toString();
			str = str.replace("[", "");
			str = str.replace("]", "");
			s+=str+",";
		}
     return s;
	}
	
/*	public static void main(String[] args)  throws Exception {
	    String path = "E:\\student.xlsx";
		File file = new File(path);
		InputStream in = new FileInputStream(file);
		String fileName=file.getName();
		String s="";
		List<String> list=new ArrayList<String>();
		List<Object> obj = new ImportExcelUtil().getBankListByExcel(in,fileName,1,8);
		for (Object object : obj) {
			String str = object.toString();
			str = str.replace("[", "");
			str = str.replace("]", "");
			s+=str+",";
		}
		String[] st=s.split(",");
		System.out.println(st.length);	
		System.out.println(s);
     
	}*/
	
}
