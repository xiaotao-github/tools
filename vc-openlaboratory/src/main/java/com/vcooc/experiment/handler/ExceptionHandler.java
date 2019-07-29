package com.vcooc.experiment.handler;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
/**
 * 实验的全局异常处理
 * @author Administrator
 */
public class ExceptionHandler implements HandlerExceptionResolver{

	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("status", 202);
		map.put("msg", ex.getMessage());
		return new ModelAndView("error",map);
	}
}
