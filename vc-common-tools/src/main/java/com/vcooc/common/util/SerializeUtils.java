package com.vcooc.common.util;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SerializeUtils {
	
	private static Logger logger = LoggerFactory.getLogger(SerializeUtils.class);
	
	/**
	 * 反序列化
	 * @param bytes
	 * @return
	 */
	public static Object deserialize(byte[] bytes) {
		Object result = null;
		
		if (isEmpty(bytes)) {
			return null;
		}
		ByteArrayInputStream byteStream = null;
		ObjectInputStream objectInputStream = null;
		try {
			byteStream = new ByteArrayInputStream(bytes);
			try {
				 objectInputStream = new ObjectInputStream(byteStream);
				try {
					result = objectInputStream.readObject();
				}
				catch (ClassNotFoundException ex) {
					throw new Exception("Failed to deserialize object type", ex);
				}
			}
			catch (Throwable ex) {
				throw new Exception("Failed to deserialize", ex);
			}
		} catch (Exception e) {
			logger.error("Failed to deserialize",e);
		}finally {
			if(byteStream!=null){
				try {
					byteStream.close();
				} catch (IOException e) {
					logger.error("Failed to close",e);
				}
			}
			if(objectInputStream!=null){
				try {
					objectInputStream.close();
				} catch (IOException e) {
					logger.error("Failed to close",e);
				}
			}
		}
		return result;
	}
	
	public static boolean isEmpty(byte[] data) {
		return (data == null || data.length == 0);
	}

	/**
	 * 序列化
	 * @param object
	 * @return
	 */
	public static byte[] serialize(Object object) {
		
		byte[] result = null;
		ByteArrayOutputStream byteStream = null;
		ObjectOutputStream objectOutputStream = null;
		if (object == null) {
			return new byte[0];
		}
		
		try {
			 byteStream = new ByteArrayOutputStream(128);
			try  {
				if (!(object instanceof Serializable)) {
					throw new IllegalArgumentException(SerializeUtils.class.getSimpleName() + " requires a Serializable payload " +
							"but received an object of type [" + object.getClass().getName() + "]");
				}
				objectOutputStream = new ObjectOutputStream(byteStream);
				objectOutputStream.writeObject(object);
				objectOutputStream.flush();
				result =  byteStream.toByteArray();
			}
			catch (Throwable ex) {
				throw new Exception("Failed to serialize", ex);
			}
		} catch (Exception ex) {
			logger.error("Failed to serialize",ex);
		}finally {
			if(byteStream!=null){
				try {
					byteStream.close();
				} catch (IOException e) {
					logger.error("Failed to close",e);
				}
			}
			if(objectOutputStream!=null){
				try {
					objectOutputStream.close();
				} catch (IOException e) {
					logger.error("Failed to close",e);
				}
			}
			
			
		}
		return result;
	}
}
