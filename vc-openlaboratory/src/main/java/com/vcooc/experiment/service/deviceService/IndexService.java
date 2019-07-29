package com.vcooc.experiment.service.deviceService;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang.math.RandomUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.websocket.MyWebSocketHandler;
import com.vcooc.experiment.websocket.ReciverImgWebsocketHandler;
import com.vcooc.util.ImageUtils;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
@Service
public class IndexService {

	private static final Logger logger = LoggerFactory.getLogger(IndexService.class);
	
	@Lazy
	@Autowired
	private ReciverImgWebsocketHandler reciverImgWebsocketHandler;

	@PropertyConfig
	private String VS_EXPERIMENT;// 项目路径
	@PropertyConfig
	private String FILE_PATH;// 资源的路径

	private String oscilloscopeFiles = "oscilloscopeFiles";// 硬件实验图片保存目录


	/**
	 * 
	 * @param userName
	 * @param userId
	 * @param file
	 */
	/*public void addFile(String userName, String userId, MultipartFile file) {
		try {
			if (file != null & file.getSize() != 0) {
				// 设置实验图片路径
				String path = "/" + oscilloscopeFiles + "/" + userId + "/";
				String filePath = FileOperateUtils.upload(FILE_PATH, path, file);
				logger.info("filePath{} ", filePath);
				logger.info("userName{} ", userName);
				logger.info("userId{} ", userId);
				// 进行websocket 推送
				this.senMessage(userId, "", filePath);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
	
	/**
	 * 处理前台提交的图片数据
	 * @param experimentId
	 * @param userId
	 * @param imgData
	 */
	public void receiveImgData(String userId, String imgData) {
		try {
			System.out.println(userId+"  "+imgData);
			if (!StringUtils.isEmpty(imgData) && imgData.length()>800) {
				// 设置实验图片路径
				String path = "/" + oscilloscopeFiles +"/"+ userId + "/";
				int randomInt = RandomUtils.nextInt(999);
				path = path+randomInt+".png";
				System.out.println(path);
				ImageUtils.generateImage(imgData, FILE_PATH, path);
				logger.info("filePath{} ", path);
				logger.info("userId{} ", userId);
				/*//保存至map
				Set<String> imgPathSet = deviceImgFilePathMap.get(userId);
				if(imgPathSet==null) imgPathSet = new HashSet<>();
				imgPathSet.add(path);
				deviceImgFilePathMap.put(userId, imgPathSet);*/
				// 进行websocket 推送
				this.senMessage(userId, "", path);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 接收到数据进行发送，判断条件如下： 根据用于id 做匹配
	 * @param request
	 * @param response
	 */
	public void senMessage(String userId, String body,String filePath)  {
		//存放总数据
		Map<String, Object> mapData = new HashMap<>();
		//图片不等于空返回图片路径
		if (!filePath.isEmpty()) {
			mapData.put("picPath", filePath);
		}
		JSONObject jsonObject = JSONUtil.parseObj(mapData);
		String msg = jsonObject.toString();
		try {
			reciverImgWebsocketHandler.sendMsgToUser(msg,userId);
		} catch (IOException e) {

			e.printStackTrace();
		}
	}


}
