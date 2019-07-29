package com.vcooc.common.service.shiro;


import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.common.util.SerializeUtils;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;


@Service
public class RedisSessionService extends AbstractSessionDAO {
	@Autowired
	private RedisService redisService;
	
	@Autowired(required=false)
	private JedisPool jedisPool;
	
	private static Logger logger = LoggerFactory.getLogger(RedisSessionService.class);
	
	@Override
	public void update(Session session) throws UnknownSessionException {
		this.saveSession(session);
	}
	
	/**
	 * save session
	 * @param session
	 * @throws UnknownSessionException
	 */
	private void saveSession(Session session) throws UnknownSessionException{
		if(session == null || session.getId() == null){
			logger.error("session or session id is null");
			return;
		}
		
		byte[] key = getByteKey(session.getId());
		if(key.length<=0){
			logger.error("session or session id is null");
			return;
		}
		byte[] value = SerializeUtils.serialize(session);
		this.redisService.set(key, value, RedisServiceConfig.TIME_OUT);
	}
	
	public void saveSession(Session session,String sessionId) throws UnknownSessionException{
		if(session == null || StringUtils.isEmpty(sessionId)){
			logger.error("session or session id is null");
			return;
		}
		byte[] key = getByteKey(sessionId);
		byte[] value = SerializeUtils.serialize(session);
		this.redisService.set(key, value, RedisServiceConfig.TIME_OUT);
	}

	@Override
	public void delete(Session session) {
		if(session == null || session.getId() == null){
			logger.error("session or session id is null");
			return;
		}
		redisService.del(this.getByteKey(session.getId()));

	}

	@Override
	public Collection<Session> getActiveSessions() {
		Set<Session> sessions = new HashSet<Session>();
		Jedis jedis = jedisPool.getResource();
		Set<String> keyStrings = jedis.keys(RedisServiceConfig.SHIRO_KEYPREFIX + "*");
		Set<byte[]> keys = new HashSet<byte[]>();
		for (String str : keyStrings) {
			keys.add(str.getBytes());
		}
		if(keys != null && keys.size()>0){
			for(byte[] key:keys){
				Session s = (Session)SerializeUtils.deserialize(redisService.get(key));
				sessions.add(s);
			}
		}
		return sessions;
	}

	@Override
	public Serializable doCreate(Session session) {
		Serializable sessionId = this.generateSessionId(session);  
        this.assignSessionId(session, sessionId);
        this.saveSession(session);
		return sessionId;
	}

	@Override
	public Session doReadSession(Serializable sessionId) {
		if(sessionId == null){
			logger.error("session id is null");
			return null;
		}
		Session s = (Session)SerializeUtils.deserialize(redisService.get(this.getByteKey(sessionId)));
		return s;
	}
	
	/**
	 * 获得byte[]型的key
	 * @param key
	 * @return
	 */
	private byte[] getByteKey(Serializable sessionId){
		String preKey = RedisServiceConfig.SHIRO_KEYPREFIX + sessionId;
		return preKey.getBytes();
	}
	/**
	 * 渥课自定义查询教师权限
	 * 根据sessionId查询教师权限
	 * @param vcoocUserId
	 * @return
	 */
	public Map<String,String> queryTeacherPowerByCookie(String vcoocUserId){
		Session session = this.doReadSession(vcoocUserId);
		Object obj = session.getAttribute("teacherPowers");
		if(obj!=null){
			if(obj instanceof Map){
				@SuppressWarnings("unchecked")
				Map<String,String> powers = (Map<String,String>) obj;
				return powers;
			}
		}
		return null;
	}
	/**
	 * 渥课自定义查询教师信息
	 */
	public Object querySessionTeacherInfo(String vcoocUserId){
		if(vcoocUserId==null){
			return null;
		}
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		if(session==null){
			return null;
		}
		Object obj = session.getAttribute("teacherInfo");
		if(obj!=null){
			return obj;
		}else{
			return null;
		}
	}
	/**
	 * 渥课自定义查询学生信息
	 */
	public Object querySessionStudentInfo(String vcoocUserId){
		if(vcoocUserId==null){
			return null;
		}
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		if(session==null){
			return null;
		}
		Object obj = session.getAttribute("studentInfo");
		if(obj!=null){
			return obj;
		}else{
			return null;
		}
	}
	/**
	 * 渥课自定义查询企业信息
	 */
	public Object querySessionCompanyInfo(String vcoocUserId){
		if(vcoocUserId==null){
			return null;
		}
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		if(session==null){
			return null;
		}
 		Object obj = session.getAttribute("company");
		if(obj!=null){
			return obj;
		}else{
			return null;
		}
	}
	/**
	 * 获取用户信息
	 * @param clazz
	 * @param vcoocUserId
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public  <T> T querySessionUserInfo(T clazz,String vcoocUserId){
		if(vcoocUserId==null){
			return null;
		}
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		if(session==null){
			return null;
		}
		Object obj = session.getAttribute("studentInfo");
		obj = obj==null?session.getAttribute("teacherInfo"):obj;
		if(obj!=null){
			try {
				clazz = (T) obj;
				return clazz;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}else{
			return null;
		}
	}
	
	@SuppressWarnings({ "unchecked" })
	public  <T> T querySessionUserInfo(T clazz){
		Subject subject = SecurityUtils.getSubject();
		Session session = subject.getSession();
		if(session==null){
			return null;
		}
		Object obj = session.getAttribute("studentInfo");
		obj = obj==null?session.getAttribute("teacherInfo"):obj;
		if(obj!=null){
			try {
				clazz = (T) obj;
				return clazz;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}else{
			return null;
		}
	}
}
