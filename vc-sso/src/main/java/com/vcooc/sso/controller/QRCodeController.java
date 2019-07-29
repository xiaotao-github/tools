package com.vcooc.sso.controller;

import java.io.IOException;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.vcooc.common.service.IpService;
import com.vcooc.sso.utils.QRCodeEncoderHandler;

@RequestMapping("/QRCodeController/")
@Controller
public class QRCodeController {
	@Autowired
	private IpService ipService;
	
	/**
	 * 
	 * @param url 用户扫码的路径
	 * @param vcoocUserId 用户的cookie Id 
	 * @param request 
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getQRCode")  
	 @ResponseBody
    public void getImage(String originalPath,String vcoocUserId,HttpServletRequest request,HttpServletResponse response) {  
        // 禁止图像缓存。  
        response.setHeader("Pragma", "no-cache");  
        response.setHeader("Cache-Control", "no-cache");  
        response.setDateHeader("Expires", 0);  
        response.setContentType("image/png");  
        // 将图像输出到Servlet输出流中。  
        ServletOutputStream sos=null;
		try {
				sos = response.getOutputStream();
				String path = ipService.getSSO_URL()+"/login_mobile.jsp?originalPath="+originalPath;
				//String path = "http://192.168.0.31:1909/login_mobile.jsp?originalPath="+originalPath;
		        ImageIO.write(QRCodeEncoderHandler.encoderQRCode(path, 8), "png", sos);  
		   
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(sos!=null){
				try {
					sos.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
    }
	
	@RequestMapping("/getQRCodeToUrl")  
	 @ResponseBody
   public void getImageToUrl(String originalPath,String vcoocUserId,HttpServletRequest request,HttpServletResponse response) {  
       // 禁止图像缓存。  
       response.setHeader("Pragma", "no-cache");  
       response.setHeader("Cache-Control", "no-cache");  
       response.setDateHeader("Expires", 0);  
       response.setContentType("image/png");  
       // 将图像输出到Servlet输出流中。  
       ServletOutputStream sos=null;
		try {
			sos = response.getOutputStream();
			//String path = "http://192.168.0.31:1909/login_mobile.jsp?originalPath="+originalPath;
	        ImageIO.write(QRCodeEncoderHandler.encoderQRCode(originalPath, 8), "png", sos);  
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(sos!=null){
				try {
					sos.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
   }
	/**
	 * 封装cookie（用户信息），跳转回原来页面
	 * @param request
	 * @param response
	 * @param url 用户登录的原地址
	 * @param userParam 用户的信息 ，将封装到cookie中
	 * @return
	 */
	/*@RequestMapping("redirectUrl")
	public String redirectUrl(HttpServletRequest request,HttpServletResponse response,String url,String userParam){
		//判断用户是否登录
		if(redisSessionService.querySessionStudentInfo(userParam)==null && redisSessionService.querySessionTeacherInfo(userParam)==null){
			return "redirect:"+ipService.getSSO_URL();
		}
		//封装用户信息
		CookieUtils.setCookie(request, response, "vcoocUserId", userParam);
		return "redirect:"+url;
	}*/
}
