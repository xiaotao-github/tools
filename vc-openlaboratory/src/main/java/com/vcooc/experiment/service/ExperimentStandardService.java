package com.vcooc.experiment.service;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.common.util.StringUtil;
import com.vcooc.experiment.mapper.ExperimentStandardMapper;

@Service
public class ExperimentStandardService {

	@Autowired
	private ExperimentStandardMapper experimentStandardMapper;
	/**
	 * 根据实验的id,查询该实验下的标准
	 * 		单表查询,根据序号排序
	 * 		只查非伪删除的数据
	 * @param exprimentId
	 * @return
	 */
	public List<ExperimentStandard> selectByExprimentId(Integer experimentId){
		if(experimentId == null){
			throw new RuntimeException("【查询实验评分标准】实验id不能为空");
		}
		return experimentStandardMapper.selectByExprimentId(experimentId,2);
	}
	
	/**
	 * 根据实验表里面的实验评定id,查询所有实验标准
	 *	 	单表数据,根据序号排序
	 *		只查非伪删除的数据
	 * @param standardIdentify   实验评定id
	 * @return
	 */
	public List<ExperimentStandard> selectByStandardIdentify(String standardIdentify){
		return experimentStandardMapper.selectByStandardIdentify(standardIdentify,2);
	}
	
	
	/**
	 * 根据成绩评定UUID查询最大的序号,建议使用这个接口
	 * 		1、不包括伪删除数据
	 * 		2、如果为null,返回0
	 * 		3、如果要添加操作，要自加1
	 * @return
	 */
	public Integer getMaxNumber(String standardIdentify){
		Integer number = experimentStandardMapper.getMaxNumber(standardIdentify, 2);
		return number == null ? 0:number;
	}
	
	/**
	 * 通过成绩标准id，获取最大的序号,建议使用上面的接口getMaxNumber(String standardIdentify)
	 * 		这里的序号不是全部数据
	 * 		而是跟这条数据同样的实验的最大序号
	 * @param standardId
	 * @return
	 */
	public Integer getMaxNumberById(long standardId){
		Integer number = experimentStandardMapper.getMaxNumberById(standardId, 2);
		return number == null ? 0:number;
	}
	
	
	
	
	/**
	 * 添加评分标准
	 * @param record
	 */
	public void insert(ExperimentStandard record){
		//数据库sql加了
		//record.setCreateTime(new Date());
		//record.setUpdateTime(record.getCreateTime());
		//获取最大的序号
		record.setNumber(getMaxNumber(record.getStandardIdentify())+1);
		record.setStealth(2);
		checkStandards(record);
		experimentStandardMapper.insert(record);
	}
	/**
	 * 添加一套评分标准
	 * @param experimentStandards 评分标准
	 * @param standardIdentify 评分标准标识
	 */
	public void addStandards(List<ExperimentStandard> experimentStandards,String standardIdentify){
		if(CollectionUtils.isEmpty(experimentStandards)){
			throw new RuntimeException("【添加实验评定标准】 添加数据为空");
		}
		Integer maxNumber = getMaxNumber(standardIdentify)+1;
		for(int i=0;i<experimentStandards.size();i++){
			experimentStandards.get(i).setNumber(maxNumber+i);
			experimentStandards.get(i).setStandardIdentify(standardIdentify);
			experimentStandards.get(i).setStealth(2);
			checkStandards(experimentStandards.get(i));
		}
		experimentStandardMapper.addStandard(experimentStandards);
	}
	/**
	 * 校验评分标准
	 * @param record
	 */
	public void checkStandards(ExperimentStandard record){
		if(record==null){
			throw new RuntimeException("【实验评定标准校验】评分数据不能为空");
		}
		if(StringUtil.isEmpty(record.getStandardIdentify())){
			throw new RuntimeException("【实验评定标准校验】评分标识StandardIdentify不能为空");
		}
		if(StringUtil.isEmpty(record.getNumber()+"")){
			throw new RuntimeException("【实验评定标准校验】评分序号number不能为空");
		}
		if(StringUtil.isEmpty(record.getPresentation())){
			throw new RuntimeException("【实验评定标准校验】评分内容不能为空");
		}
		if(StringUtil.isEmpty(record.getScore()+"")){
			throw new RuntimeException("【实验评定标准校验】评定分数不能为空");
		}
	}
	
	/**
	 * 通过id查询单条数据
	 * @param standardId
	 * @return
	 */
	public ExperimentStandard selectById(long standardId){
		return experimentStandardMapper.selectByPrimaryKey(standardId);
	}
	
	
	
	/**
	 * 修改评分标准
	 * @param record
	 */
	public void update(ExperimentStandard record){
		//record.setUpdateTime(new Date());
		checkStandards(record);
		experimentStandardMapper.updateByPrimaryKeySelective(record);
	}
	
	
	/**
	 * 伪删除评分标准
	 * 		包括修改序号,后面的序号补上来
	 * @param standardI
	 */
	public void delete(long standardId){
		experimentStandardMapper.deleteById(standardId,1);
	}
	
	
	/**
	 * 修改序号
	 * @param standardId    要修改的数据id
	 * @param oldNumber		不能空
	 * @param newNumber     新的序号,不能空
	 */
	public void updateNumber(long standardId,Integer oldNumber,Integer newNumber){
		//判断一下是向前还是向后
		if(oldNumber != newNumber){
			if(oldNumber>newNumber) experimentStandardMapper.downNumber(standardId, oldNumber, newNumber);
			else experimentStandardMapper.UpNumber(standardId, oldNumber, newNumber);
		}
	}
	
	/**
	 * 复制评分标准
	 * @param standardIdentify
	 * @param standardIds   勾选的评分标准,逗号分隔
	 * 亲爱的小哥哥小姐姐们啊,在这里为了不让数据乱了,只能牺牲一丢丢效率啦~~~~
	 * 小工也是‘鱿鱼’了好久的呢~~~~~~~
	 */
	public void copeStandards(String standardIdentify,String standardIds){
		for(String index:standardIds.split(",")){
			//循环插入into select
			experimentStandardMapper.copeStandards(standardIdentify, getMaxNumber(standardIdentify)+1, index);
		}
	}
	/**
	 * 修改实验下的评分标准
	 * @param hasData
	 * @param experimentId
	 */
	public void editByExperimentId(List<ExperimentStandard> experimentStandards, String standardIdentify) {
		//校验
		if(CollectionUtils.isEmpty(experimentStandards)){
			throw new RuntimeException("【修改实验下的评分标准】实验评分标准不能为空,实验id");
		}
		for (ExperimentStandard temp : experimentStandards) {
			temp.setStealth(2);
			temp.setStandardIdentify(standardIdentify);
			checkStandards(temp);
		}
		//删除旧的实验评分标准
		experimentStandardMapper.deleteByStandardIdentify(standardIdentify);
		//将新的实验评分标准插入
		experimentStandardMapper.addStandard(experimentStandards);
	}
		
}
