package com.vcooc.experiment.service.web;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import com.sun.star.lib.uno.environments.remote.remote_environment;
import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileFormatUtil;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.mapper.LabClassCardVideoWebMapper;

import cn.hutool.core.util.RandomUtil;

@Service
public class LabClassCarVideoWebService {

	@Autowired
	private LabClassCardVideoWebMapper labClassCarVideoWebMapper;

	@PropertyConfig
	private Integer MAX_COUNT;
	@PropertyConfig
	private String FILE_PATH;
	@PropertyConfig
	private String SWF_PATH;
	@PropertyConfig
	private String FILE_FORMAT;

	// openoffice配置
	@PropertyConfig
	private String OPENOFFICEPATH;
	@PropertyConfig
	private String OPENOFFICEDICK;
	@PropertyConfig
	private String PROGRAMPATH;
	@PropertyConfig
	private String OPENOFFICEHOST;
	@PropertyConfig
	private String OPENOFFICEPORT;
	@PropertyConfig
	private String VS_EXPERIMENT;
	
	

	public List<LabPv> selectByVideoPage(Integer labId) {
		LabPv pv = new LabPv();
		pv.setLabId(labId);
		pv.setType(0);
		List<LabPv> pvList = labClassCarVideoWebMapper.select(pv);
		return pvList;

	}

	/**
	 * 删除
	 * 
	 * @param pvid
	 *            id
	 */
	public void deleteById(Integer pvid) {
		LabPv pv = labClassCarVideoWebMapper.selectByPrimaryKey(pvid);
		//指定删除本地
		String pvPath = FILE_PATH+pv.getFilePath();
		LabClassCardPicWebService.deleteFile(pvPath);
		labClassCarVideoWebMapper.deleteByPrimaryKey(pvid);
	}

	/**
	 * 修改视频的隐藏或者显示
	 * 
	 * @param pvid
	 *            视频Id
	 * @param isPlay
	 *            状态标识符 0 显示 1 隐藏
	 * @param labId
	 */
	public Integer updateById(Integer pvid, Integer isPlay, Integer labId) {
		// isPlay 为1 时 0显示
		if (isPlay.equals(1)) {
			isPlay = 0;
			LabPv labPv = new LabPv();
			labPv.setPvId(pvid);
			labPv.setIsPublish(isPlay);
			labPv.setUpdateTime(new Date());
			// 判断是否超出1条以上限制
			Integer countNumber = CountisPlay(labId);
			if (countNumber >= 1) {
				// 回滚事物
				throw new RuntimeException("只能显示一条视频");
			}
			Integer updateNumber = labClassCarVideoWebMapper.updateByPrimaryKeySelective(labPv);
			return updateNumber;
		}

		if (isPlay.equals(0)) {
			isPlay = 1;
			LabPv labPv = new LabPv();
			labPv.setPvId(pvid);
			labPv.setIsPublish(isPlay);
			labPv.setUpdateTime(new Date());
			Integer updateNumber = labClassCarVideoWebMapper.updateByPrimaryKeySelective(labPv);
			return updateNumber;
		}
		return null;
	}

	/**
	 * 添加视频
	 * 
	 * @param labId
	 *            实验室Id
	 * @param title
	 *            标题
	 * @param files
	 *            文件
	 * @param request
	 * @return
	 */
	public void addFile(MultipartFile[] files, LabPv pv, TeacherInfo teacherInfo) {

		
		FileFormatUtil fileFormatUtil = FileFormatUtil.getFileFormatUtil(SWF_PATH, OPENOFFICEPATH);
		
		if(StringUtils.isEmpty(pv.getTitle())){
			throw new RuntimeException("视频标题不能为空");
		}
		
		if(StringUtils.isEmpty(pv.getPvDescribe())){
			throw new RuntimeException("视频描述不能为空");
		}
		
		// 判断资源文件是否为空
		if (files == null || files.length == 0) {
			throw new RuntimeException("添加失败，请上传资源文件");
		}
		// 判断上传的文件格式是否正确视频格式
		String FILE_FORMAT_VIDEO = "avi|rmvb|rm|mp4|flv|wmv|mpg|mov|3gp";
		if (!FileOperateUtils.checkFilepattern(files, FILE_FORMAT_VIDEO)) {
			throw new RuntimeException("添加失败，请上传正确格式的文件");
		}
		for (MultipartFile file : files) {
			if (file.getSize() != 0) {
				//视频存在则进行跳转
				// 封装资源文件信息
				String fileAllName = file.getOriginalFilename();// 原始文件名
				String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
				String fileName = fileAllName.substring(0, fileAllName.lastIndexOf("."));// 文件名
				// 1.封装资源文件名称
				// 2.封装资源文件后缀名
				pv.setTeacherId(teacherInfo.getId());
				pv.setCreateTime(new Date());
				pv.setUpdateTime(new Date());
				pv.setIsPublish(1);
				pv.setType(0);

				// 保存资源文件
				try {
					// 上传资源文件，封装资源文件路径
					String filePath = FileOperateUtils
							.upload(FILE_PATH, VS_EXPERIMENT, "/class_brandfile_Video", teacherInfo.getName(), file)
							.trim();

					pv.setFilePath(filePath);

				} catch (IOException e) {
					e.printStackTrace();
					throw new RuntimeException("文件上传失败,请重新上传");
				}

				labClassCarVideoWebMapper.insert(pv);
			}
		}

		fileFormatUtil.run();
	}

	/**
	 * 编辑界面跳转查询该实验信息
	 * @param pvId
	 * @return
	 */
	public LabPv finAllList(Integer pvId) {
		LabPv labpv = labClassCarVideoWebMapper.selectByPrimaryKey(pvId);
		return labpv;
	}

	/**
	 * 修改视频
	 * 
	 * @param pvId
	 *            实验室id
	 * @param title
	 *            标题
	 * @param files
	 *            文件
	 * @param request
	 * @return
	 */
	public void updateFile( LabPv pv, TeacherInfo teacherInfo) {
		if(StringUtils.isEmpty(pv.getTitle())){
			throw new RuntimeException("视频标题不能为空");
		}
		
		if(StringUtils.isEmpty(pv.getPvDescribe())){
			throw new RuntimeException("视频描述不能为空");
		}
		
		pv.setTeacherId(teacherInfo.getId());
		pv.setUpdateTime(new Date());
		labClassCarVideoWebMapper.updateByPrimaryKeySelective(pv);
		
	}

	/**
	 * 获取轮播视频不取隐藏视频
	 * 
	 * @param labId
	 *            实验室Id
	 * @return
	 */
	public List<LabPv> selectByLabIdVideo(Integer labId) {
		LabPv lv = new LabPv();
		lv.setLabId(labId);
		lv.setIsPublish(0);
		lv.setType(0);
		return labClassCarVideoWebMapper.select(lv);
	}

	/**
	 * 统计视频类型显示共多少条，用于判断！
	 * 
	 * @param labId
	 * @return 总数
	 */
	public Integer CountisPlay(Integer labId) {
		LabPv lv = new LabPv();
		lv.setLabId(labId);// 实验室Id
		lv.setIsPublish(0);// 显示状态 0显示 1 隐藏
		lv.setType(0);// 指定类型 ：视频
		int ccountList = labClassCarVideoWebMapper.selectCount(lv);
		return ccountList;
	}

}
