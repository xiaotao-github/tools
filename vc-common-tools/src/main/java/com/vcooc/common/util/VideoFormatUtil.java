package com.vcooc.common.util;

import java.io.File;

import com.sun.star.uno.RuntimeException;

import it.sauronsoftware.jave.AudioAttributes;
import it.sauronsoftware.jave.Encoder;
import it.sauronsoftware.jave.EncoderException;
import it.sauronsoftware.jave.EncodingAttributes;
import it.sauronsoftware.jave.InputFormatException;
import it.sauronsoftware.jave.VideoAttributes;

/**
 * 视频格式工具
 *  将其他格式的视频转化为flv格式的视频
 * @author Administrator
 */

public class VideoFormatUtil {
	/**
	 * 将其他格式的视频转化为flv格式的视频
	 * @param pathUrl 视频资源路径
	 * @param targetUrl 输出资源路径
	 * @return
	 */
	public static void formatVideo(String pathUrl,String targetUrl){
		File source = new File(pathUrl);
		if(!source.exists()){
			throw new RuntimeException("资源文件不存在");
		}
		File target = new File(targetUrl); 
		AudioAttributes audio = new AudioAttributes();
		audio.setCodec("libmp3lame");
		audio.setBitRate(new Integer(64000));
		audio.setChannels(new Integer(1));
		audio.setSamplingRate(new Integer(22050));
		VideoAttributes video = new VideoAttributes();
		video.setCodec("flv");
		video.setBitRate(new Integer(16000));
		video.setFrameRate(new Integer(8));//控制高清的参数
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("flv");
		attrs.setAudioAttributes(audio);
		attrs.setVideoAttributes(video);
		Encoder encoder = new Encoder();
		try {
			encoder.encode(source, target, attrs);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			throw new RuntimeException("视频转码失败："+e.getMessage());
		} catch (InputFormatException e) {
			e.printStackTrace();
			throw new RuntimeException("视频转码失败："+e.getMessage());
		} catch (EncoderException e) {
			e.printStackTrace();
			throw new RuntimeException("视频转码失败："+e.getMessage());
		}
	}
}
