package com.vcooc.sso.controller;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.common.vo.SysResult;
@Controller
public class BaseHomeController {
/*	@Autowired
	private IpService IpService;*/
	
	
	@RequestMapping("uploadFile")
	@ResponseBody
	public SysResult adminToPage(MultipartFile mf,String name){
		return SysResult.ok(name);
	}
	
	/**
	 * 后台页面跳转
	 * @param pageName
	 * @return
	 */
	@RequestMapping("adminPage/{pageName}")
	public String adminToPage(@PathVariable("pageName") String pageName){
		return "adminPage/"+pageName;
	}
	
	/**
	 * 学生前台页面跳转
	 * @param pageName
	 * @return
	 */
	@RequestMapping("studentPage/{pageName}")
	public String studentToPage(@PathVariable("pageName") String pageName,HttpServletRequest req){
		return "studentPage/"+pageName;
	}
	/**
	 * 跳转到根目录下
	 * @param pageName
	 * @return
	 */
	@RequestMapping("page/{pageName}")
	public String toIndexPage(@PathVariable("pageName") String pageName){
		return pageName;
	}
}
