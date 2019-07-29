package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.vcooc.base.pojo.ExperimentFile;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.common.mapper.SysMapper;

public interface ExperimentFileMapper extends SysMapper<ExperimentFile> {
	
	/**
	 * 根据实验ID，查询实验下的资源文件信息
	 * 	包括作者、所属资源库、所属院系
	 * @param experimentId 实验ID
	 * @return
	 */
	List<ResourceFile> selectExperimentFileByExperimentFileId(@Param("experimentId")Integer experimentId);
	
	/**
	 * 将资源分配给实验
	 * @param experimentId
	 * @param resourceFileIds
	 */
	void distributeFilesToExperiment(@Param("experimentId")Integer experimentId,@Param("resourceFileIds") List<Integer> resourceFileIds,@Param("fileType")Integer fileType);
	
	/**
	 * 删除旧的资源文件
	 * @param experimentId
	 * @param resourceFileIds
	 */
	void deleteOldFile(@Param("experimentId")Integer experimentId,@Param("resourceFileIds") List<Integer> resourceFileIds);
	
	/**
	 * 查询旧的资源文件ID
	 * @param experimentId
	 * @return
	 */
	List<Integer> selectOldFileId(@Param("experimentId")Integer experimentId);
	
	/**
	 * 根据实验ID和资源文件ID，查询对应的数据ID
	 * @param experimentId 实验Id
	 * @param resourceFileId 资源文件ID
	 * @return 若无 返回null
	 */
	Integer selectExperimentFile(@Param("experimentId")Integer experimentId,@Param("resourceFileId") Integer resourceFileId);
	/**
	 * 根据实验ID和类型，查询对应的资源文件ID
	 * @param experimentId
	 * @param fileType  0.其他文件类型 1.实验指导书 2.GIF动态图 3.实验工程文件 4.实验报告 5.标准答案
	 * @return
	 */
	List<ResourceFile> selectExperimentFileIdByExperimentIdAndType(@Param("experimentId")Integer experimentId,@Param("fileType") int fileType);
	/**
	 * 将原先的实验指导书设置为其他资源文件：
	 * 即改变is_instructor 设置为0
	 * @param experimentId
	 * @param fileId
	 * @param fileType 
	 * 	资源文件类型 ： 设计实验：0.其他资源文件附件 1.实验指导书  5.标准答案   
	 * 	参考实验：0.其他文件类型 1.实验指导书 2.GIF动态图 3.实验工程文件 4.实验报告 5.标准答案
	 */
	Integer updateExperimentInstructorFileToOtherFile(@Param("experimentId")Integer experimentId,@Param("resourceFileId") Integer fileId,@Param("IsInstructor")Integer fileType);

	/**
	 * 根据实验id 和类型查询实验文件信息
	 * @param experimentId
	 * @param type 实验的文件类型 0.其他资源文件 1.实验指导书 2.GIF动态图 3.实验工程文件 4.实验报告  5.实验标准答案  多个类型用逗号(,)隔开
	 * @return
	 */
	List<ResourceFile> selectFileByEperimentId(@Param("experimentId")Integer experimentId,@Param("type")String type);
}
