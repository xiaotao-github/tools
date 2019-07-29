package com.vcooc.common.service.shiro;


import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.cache.CacheManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RedisCacheManagerService implements CacheManager {

	private static final Logger logger = LoggerFactory
			.getLogger(RedisCacheManagerService.class);

	// fast lookup by name map
	private final ConcurrentMap<String, Cache> caches = new ConcurrentHashMap<String, Cache>();
	
	@Autowired
	private RedisService redisService;

	
	
	@Override
	public <K, V> Cache<K, V> getCache(String name) throws CacheException {
		logger.debug("获取名称为: " + name + " 的RedisCache实例");
		
		Cache c = caches.get(name);
		
		if (c == null) {

			// create a new cache instance
			c = new RedisCache<K, V>(redisService, RedisServiceConfig.SHIRO_KEYPREFIX);
			
			// add it to the cache collection
			caches.put(name, c);
		}
		return c;
	}
}
