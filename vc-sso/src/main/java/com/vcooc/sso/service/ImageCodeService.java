package com.vcooc.sso.service;

import java.awt.Color;  
import java.awt.Font;  
import java.awt.Graphics;  
import java.awt.image.BufferedImage;  
import java.util.ArrayList;  
import java.util.Arrays;  
import java.util.List;  
import java.util.Random;  
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Service;

import com.sun.star.ucb.Cookie;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.CookieUtils;
import com.vcooc.sso.utils.CookieSSOUtils;  
  
/** 
 * @Description: 图片验证码生成类 
 * @ClassName: ImageCode.java 
 * @Package: com.caiyl.src.util 
 * @Author:  
 * @Date:  
 * @Copyright:  
 */  

@Service
public class ImageCodeService{  
	@PropertyConfig
    private int ImageCode_width;
	@PropertyConfig
    private int ImageCode_height;
	@PropertyConfig
    private int ImageCode_codeLength;
	@PropertyConfig
    private String ImageCode_randomString;
	@PropertyConfig
    private String ImageCode_fontName;
	@PropertyConfig
    private int ImageCode_fontStyle;
	@PropertyConfig
    private int ImageCode_fontSize;  
      
    public BufferedImage getImage(HttpServletRequest request, HttpServletResponse response){  
        // 在内存中创建图象  
        BufferedImage image = new BufferedImage(ImageCode_width, ImageCode_height,BufferedImage.TYPE_INT_RGB);  
        // 获取图形上下文  
        Graphics g = image.getGraphics();  
        // 生成随机类  
        Random random = new Random();  
        // 设定背景色  
        g.setColor(getRandColor(200, 250));  
        g.fillRect(0, 0, ImageCode_width, ImageCode_height);  
        // 设定字体  
        g.setFont(new Font(ImageCode_fontName, ImageCode_fontStyle, ImageCode_fontSize));  
        g.setColor(getRandColor(160, 200));  
        for (int i = 0; i < 155; i++) {  
            int x = random.nextInt(ImageCode_width);  
            int y = random.nextInt(ImageCode_height);  
            int xl = random.nextInt(12);  
            int yl = random.nextInt(12);  
            g.drawLine(x, y, x + xl, y + yl);  
        }  
        String sRand = randomRand(ImageCode_codeLength);// 取随机产生的认证码  
        int strWidth = ImageCode_width/2-g.getFontMetrics().stringWidth(sRand)/ImageCode_codeLength-24;  
        int strHeight = ImageCode_height/2+12;  
        for (int i = 0; i < ImageCode_codeLength; i++) {  
            String rand = sRand.substring(i, i + 1);  
            // 将认证码显示到图象中  
            g.setColor(new Color(20 + random.nextInt(110), 20 + random  
                    .nextInt(110), 20 + random.nextInt(110)));// 调用函数出来的颜色相同，  
            int zz=new Random().nextInt(8);  
            zz=zz%2==0?zz-10:zz;  
            g.drawString(rand, strWidth+(13+16*i), strHeight+zz);  
        }
        //同时存储cookie 和session
        SecurityUtils.getSubject().getSession().setAttribute("yanzhengma", sRand);
       //验证码存cookie
       CookieSSOUtils.addCookie(sRand,"yanzhengma",60 * 60,request,response);
        g.dispose();  
        return image;  
    }  
      
    
      
    public static String randomResult(int length) {  
        String i[] = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };  
        List<String> l = new ArrayList<String>();  
        l.addAll(Arrays.asList(i));  
        Random ran = new Random();  
        String s = "";  
        while (l.size() > 10 - length)  
            s += l.remove(ran.nextInt(l.size()));  
        s = s.replaceAll("^(0)(\\d)", "$2$1");  
        return s;  
    }  
  
    private Color getRandColor(int fc, int bc) {// 给定范围获得随机颜色  
        Random random = new Random();  
        if (fc > 255)  
            fc = 255;  
        if (bc > 255)  
            bc = 255;  
        int r = fc + random.nextInt(bc - fc);  
        int g = fc + random.nextInt(bc - fc);  
        int b = fc + random.nextInt(bc - fc);  
        return new Color(r, g, b);  
    }  
  
    private String randomRand(int n) {  
        String rand = "";  
        int len = ImageCode_randomString.length() - 1;  
        double r;  
        for (int i = 0; i < n; i++) {  
            r = (Math.random()) * len;  
            rand = rand + ImageCode_randomString.charAt((int) r);  
        }  
        return rand;  
    }  
}  
