package com.vcooc.util;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import sun.misc.BASE64Decoder;

/**
 * 图片处理工具类
 * @author Administrator
 */
public class ImageUtils {
	
	
	/**
	 * 对字节数组字符进行base64处理，转换成图片
	 * @param imgStr 字节数组
	 * @param imgFilePath 文件生成路径
	 * @return
	 */
	public static boolean generateImage(String imgStr,String filePath,String imgFilePath){
		File file = new File(filePath);
		if(!file.exists()){
			file.mkdirs();
		}
		  if (imgStr == null) // 图像数据为空
	            return false;
		  System.out.println(imgStr);
		  imgStr = imgStr.substring(imgStr.indexOf(",")+1);
		  System.out.println(imgStr);
	      BASE64Decoder decoder = new BASE64Decoder();
	      try {
			byte[] bs = decoder.decodeBuffer(imgStr);
			//调整异常数据
			for(int i=0;i<bs.length;i++){
				if(bs[i]<0){
					bs[i]+=256;
				}
			}
			 
			File tempfile = new File(filePath+"/"+imgFilePath);
			if(!tempfile.exists()) {
				new File(filePath+"/"+imgFilePath.substring(1,imgFilePath.lastIndexOf("/"))).mkdirs();
			}
			
			FileOutputStream write = new FileOutputStream(tempfile);
    		write.write(bs);
    		write.close();
    		
			return true;
		} catch (IOException e) {
			throw new RuntimeException("图片转换失败");
		} catch (Exception e) {
			throw new RuntimeException("图片转换失败");
		}
	}
	
	public static void convertToPng(byte[] svgCode,OutputStream os)
            throws TranscoderException, IOException {
		try {
            PNGTranscoder t = new PNGTranscoder();
            TranscoderInput input = new TranscoderInput(new ByteArrayInputStream(svgCode));
            TranscoderOutput output = new TranscoderOutput(os);
            t.transcode(input, output);
            os.flush();
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
	}
}
