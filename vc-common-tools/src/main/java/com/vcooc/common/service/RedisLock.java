package com.vcooc.common.service;


import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.vcooc.common.service.Function;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;
/**
 * redis锁
 * @author Administrator
 *
 */
@Component
public class RedisLock {
	@Autowired
    private ShardedJedisPool shardedJedisPool;
	
	
	 private <T> T execute(Function<ShardedJedis, T> function) {
	        ShardedJedis shardedJedis = null;
	        try {
	            // 从连接池中获取到jedis分片对象
	            shardedJedis = shardedJedisPool.getResource();
	            return function.execute(shardedJedis);
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            if (null != shardedJedis) {
	                // 关闭，检测连接是否有效，有效则放回到连接池中，无效则重置状态
	                shardedJedis.close();
	            }
	        }
	        return null;
	    }
	//获取锁
	public boolean getLock(final String name,final String value){
		return this.execute(new Function<ShardedJedis, Boolean>() {
            @Override
            public Boolean execute(ShardedJedis shardedJedis) {
            	Long setnx = shardedJedis.setnx(name, value);
            	if(setnx==1L){
            		return true;
            	}
            	String oldTimeValue = shardedJedis.get(name);
            	if(StringUtils.isNotEmpty(oldTimeValue) && System.currentTimeMillis()>Long.valueOf(oldTimeValue)){
            		String oldTime = shardedJedis.getSet(name,value);
            		if(StringUtils.isNotEmpty(oldTime)&& oldTime.equals(oldTimeValue)){
            			return true;
            		}
            	}
            	return false;
            }
        });
	}
	//解锁
	public void unLock(final String name,final String value){
		this.execute(new Function<ShardedJedis, Boolean>() {
            @Override
            public Boolean execute(ShardedJedis shardedJedis) {
            	if(StringUtils.isNotEmpty(name) && StringUtils.isNotEmpty(value)){
            		String timeValue = shardedJedis.get(name);
            		if(StringUtils.isNotEmpty(timeValue)&& timeValue.equals(value)){
            			shardedJedis.del(name);
            			return true;
            		}
            	}
				return false;
            }
		});
	}
}
