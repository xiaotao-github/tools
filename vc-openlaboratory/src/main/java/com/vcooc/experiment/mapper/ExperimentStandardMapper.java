package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentStandard;

public interface ExperimentStandardMapper{
	
	/**
	 * 根据实验的id,查询该实验下的标准,只查非伪删除的数据
	 * 单表查询,根据序号排序
	 * @param exprimentId   实验id
	 * @param stealth  可为null
	 * @return
	 */
	public List<ExperimentStandard> selectByExprimentId(
			@Param("exprimentId")Integer exprimentId,@Param("stealth")Integer stealth);
	
	
	/**
	 * 根据实验表里面的实验评定id,查询所有实验标准
	 * 单表数据,根据序号排序
	 * @param standardIdentify   实验评定id
	 * @param stealth    可为null
	 * @return
	 */
	public List<ExperimentStandard> selectByStandardIdentify(
			@Param("standardIdentify")String standardIdentify,@Param("stealth")Integer stealth);
	
	
	/**
	 * 根据成绩评定UUID查询最大的序号
	 * @param standardIdentify
	 * @param stealth  可为null
	 * @return
	 */
	public Integer getMaxNumber(
			@Param("standardIdentify")String standardIdentify,@Param("stealth")Integer stealth);
	
	
	/**
	 * 通过成绩标准id，获取最大的序号
	 * 		这里的序号不是全部数据
	 * 		而是跟这条数据同样的实验的最大序号
	 * @param standardId
	 * @return
	 */
	public Integer getMaxNumberById(
			@Param("standardId")long standardId,@Param("stealth")Integer stealth);
	
	
	/**
	 * 软删除评分标准
	 * 真删除学生成绩(已注释掉了)
	 * 修改评分标准序号
	 * @param standardId
	 * @param stealth
	 */
	public void deleteById(
			@Param("standardId")long standardId,@Param("stealth")Integer stealth);
	
	/**
	 * 向前;比如     3-->1
	 * @param standardId
	 * @param oldNumber
	 * @param newNumber
	 */
	public void UpNumber(@Param("standardId")long standardId,
			@Param("oldNumber")Integer oldNumber,@Param("newNumber")Integer newNumber);
	
	
	/**
	 * 向后;比如    1-->3
	 * @param standardId
	 * @param oldNumber
	 * @param newNumber
	 */
	public void downNumber(@Param("standardId")long standardId,
			@Param("oldNumber")Integer oldNumber,@Param("newNumber")Integer newNumber);
	
	
	/**
	 * 复制实验评定标准
	 * @param standardIdentify  实验关联
	 * @param number            序号
	 * @param standardId        标准id,这里对数据库来说没差别，所以不强制。如要调用，在后面+""
	 */
	public void copeStandards(@Param("standardIdentify")String standardIdentify,
			@Param("number")Integer number,@Param("standardId")String standardId);
	
	
	/**
	 * 添加
	 * @param record
	 */
	public void insert(ExperimentStandard record);
	
	
	/**
	 * 根据主键
	 * @param standardId
	 * @return
	 */
	public ExperimentStandard selectByPrimaryKey(long standardId);
	
	
	/**
	 * 修改不为null的字段
	 * @param record
	 */
	public void updateByPrimaryKeySelective(ExperimentStandard record);

	/**
	 * 批量添加实验评定标准
	 * @param experimentStandards
	 */
	public void addStandard(@Param("experimentStandards")List<ExperimentStandard> experimentStandards);

	/**
	 * 删除旧的评分标准
	 * @param standardIdentify
	 */
	public void deleteByStandardIdentify(String standardIdentify);
}
