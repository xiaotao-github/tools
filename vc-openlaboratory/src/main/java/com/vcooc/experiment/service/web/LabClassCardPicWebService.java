package com.vcooc.experiment.service.web;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sun.star.uno.RuntimeException;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileFormatUtil;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.mapper.ExperimentLabMapper;
import com.vcooc.experiment.mapper.LabClassCardPicWebMapper;


/**
 * 电子班牌的图片管理CRUD
 *
 */

@Service
public class LabClassCardPicWebService {
	@Autowired
	private LabClassCardPicWebMapper labClassCarPicWebMapper;

	@Autowired
	private ExperimentLabMapper experimentLabMapper;

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

	/**
	 * 实验图片分页
	 * 
	 * @param teacherInfo
	 * @param p
	 *            分页类
	 * @param labId
	 *            实验室id
	 * @param 0
	 *            显示 1 隐藏
	 * @author 1 图片 0 视频
	 * @return
	 */
	public Page<LabPv> selectByPicPage(Page p, Integer labId) {
		// 自定义显示条数
		p.setPageSize(12);
		p.setStartNumber(p.getPageSize() * p.getThisPage());

		// 封装查询参数
		PageData pageData = new PageData();
		pageData.put("page", p);
		pageData.put("labId", labId);
		pageData.put("type", 1);

		List<LabPv> list = labClassCarPicWebMapper.SelectByMenuParam(pageData);

		Integer listCoumt = labClassCarPicWebMapper.SelectCountPage(pageData);

		Page<LabPv> tempPic = new Page<>(list, p.getThisPage(), p.getPageSize(), listCoumt);

		return tempPic;

	}

	/**
	 * 删除
	 * 
	 * @param pvid
	 *            id
	 */
	public void deleteById(Integer pvid) {
		//删除查询名称指定删除本地
		LabPv pv = labClassCarPicWebMapper.selectByPrimaryKey(pvid);
		String pvPath = FILE_PATH+pv.getFilePath();
		deleteFile(pvPath);
		labClassCarPicWebMapper.deleteByPrimaryKey(pvid);

	}

	/**
	 * 修改状态
	 * 
	 * @param pvid
	 *            图片id
	 * @param isShow
	 *            状态标识符 1 隐藏 0显示
	 * @param teacherInfo
	 *            修改者信息
	 */
	public LabPv updateById(Integer pvid, Integer isShow, TeacherInfo teacherInfo) {
		// isShow 为 1 ，图片显示
		if (isShow.equals(1)) {
			isShow = 0;
			LabPv labPv = new LabPv();
			labPv.setPvId(pvid);
			labPv.setTeacherId(teacherInfo.getId());
			labPv.setIsPublish(isShow);
			labPv.setUpdateTime(new Date());
			labClassCarPicWebMapper.updateByPrimaryKeySelective(labPv);
			return labPv;
		}

		if (isShow.equals(0)) {
			isShow = 1;
			LabPv labPv = new LabPv();
			labPv.setPvId(pvid);
			labPv.setIsPublish(isShow);
			labPv.setTeacherId(teacherInfo.getId());
			labPv.setUpdateTime(new Date());
			labClassCarPicWebMapper.updateByPrimaryKeySelective(labPv);
			return labPv;
		}

		return null;
	}

	/**
	 * 添加图片
	 * 
	 * @param files
	 *            图片资源
	 * @param labpvFile
	 *            标题 实验室Id
	 * @param teacherInfo
	 *            添加人
	 */
	public void addFile(MultipartFile[] files, LabPv pv, TeacherInfo teacherInfo) {

		//增加为空判断
		if(StringUtils.isEmpty(pv.getTitle())){
			throw new RuntimeException("图片标题不能为空");
		}

		FileFormatUtil fileFormatUtil = FileFormatUtil.getFileFormatUtil(SWF_PATH, OPENOFFICEPATH);

		// 判断资源文件是否为空
		if (files == null || files.length == 0) {
			throw new RuntimeException("添加失败，请上传资源文件");
		}
		// 判断上传的文件格式是否正确图片
		String FILE_FORMAT_PIC = "jpg|png|gif|jbp";
		if (!FileOperateUtils.checkFilepattern(files, FILE_FORMAT_PIC)) {
			throw new RuntimeException("添加失败，请上传正确格式的文件");
		}

		for (MultipartFile file : files) {

			if (file.getSize() != 0) {
				// 封装资源文件信息
				String fileAllName = file.getOriginalFilename();// 原始文件名
				String extFileName = fileAllName.substring(fileAllName.lastIndexOf(".") + 1);// 文件后缀名
				String fileName = fileAllName.substring(0, fileAllName.lastIndexOf("."));// 文件名
				// 1.封装资源文件名称
				// 2.封装资源文件后缀名
				pv.setCreateTime(new Date());
				pv.setIsPublish(0);
				pv.setType(1);
				pv.setTeacherId(teacherInfo.getId());

				// 保存资源文件
				try {
					// 上传资源文件，封装资源文件路径
					String filePath = FileOperateUtils
							.upload(FILE_PATH, VS_EXPERIMENT, "/class_brandfile_Pic/", teacherInfo.getName(), file)
							.trim();
					pv.setFilePath(filePath);
				} catch (IOException e) {
					e.printStackTrace();
					throw new RuntimeException("文件上传失败,请重新上传");
				}

				labClassCarPicWebMapper.insertSelective(pv);
			}
		}

		fileFormatUtil.run();
	}
	
	/**
	 * 实验室获取电子班牌展示的类型
	 * 
	 * @param labId
	 * @return
	 */
	public ExperimentLab selectStatus(Integer labId) {
		ExperimentLab exLad = experimentLabMapper.selectByPrimaryKey(labId);
		return exLad;
	}

	/**
	 * 修改实验室获取电子班牌展示的类型 为默认图片或者视频
	 * 
	 * @param teacherInfo
	 * @param labPv
	 * @param pvStatus
	 */
	public ExperimentLab updateStatu(TeacherInfo teacherInfo, Integer labId, Integer pvStatus) {

		if (pvStatus.equals(1)) {
			pvStatus = 0;
			ExperimentLab ex = new ExperimentLab();
			ex.setLabId(labId);
			ex.setPvStatus(pvStatus);
			ex.setOperator(teacherInfo);
			ex.setCreateTime(new Date());
			experimentLabMapper.updateByPrimaryKeySelective(ex);
			return ex;
		}

		if (pvStatus.equals(0)) {
			pvStatus = 1;
			ExperimentLab ex = new ExperimentLab();
			ex.setLabId(labId);
			ex.setPvStatus(pvStatus);
			ex.setOperator(teacherInfo);
			ex.setCreateTime(new Date());
			experimentLabMapper.updateByPrimaryKeySelective(ex);
			return ex;
		}
		return null;
	}

	/**
	 * 获取轮播图片不取隐藏
	 * 
	 * @param labId
	 *            实验室Id
	 * @return
	 */
	public List<LabPv> selectByLabIdPic(Integer labId) {
		// TODO Auto-generated method stub
		LabPv lv = new LabPv();
		lv.setLabId(labId);
		lv.setIsPublish(0);
		lv.setType(1);
		return labClassCarPicWebMapper.select(lv);
	}
	
	
	 /**
     * 删除单个文件
     * @param   sPath    被删除文件的文件名
     * @return 单个文件删除成功返回true，否则返回false
     */
    public static boolean deleteFile(String sPath) {
    	boolean   flag = false;
    	File  file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }


}
