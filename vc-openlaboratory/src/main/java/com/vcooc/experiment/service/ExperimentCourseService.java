package com.vcooc.experiment.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentCourse;
import com.vcooc.base.pojo.ExperimentTemplate;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherLogInformation;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.common.util.FileOperateUtils;
import com.vcooc.experiment.mapper.ExperimentCourseMapper;
import com.vcooc.experiment.mapper.ExperimentTemplateMapper;
import com.vcooc.experiment.mapper.ResourceFileMapper;
import com.vcooc.experiment.mapper.TeacherLogInformationMapper;

@Service
public class ExperimentCourseService extends BaseService<ExperimentCourse> {
	@Autowired
	private ExperimentCourseMapper experimentCourseMapper;
	@Autowired
	private ResourceFileMapper resourceFileMapper;
	@Autowired
	private TeacherLogInformationMapper teacherLogInformationMapper;
	@Autowired
	private ExperimentTemplateMapper experimentTemplateMapper;

	@PropertyConfig
	private Integer MAX_COUNT;// 最大查旬数
	@PropertyConfig
	private String FILE_PATH;// 文件存放路径前缀
	@PropertyConfig
	private String VS_EXPERIMENT;// 文件存放的项目文件夹名称

	/**
	 * 根据用户信息和权限参数，查询实验课程信息： 包括课程下的任课教师，课程的所属院系；
	 * 
	 * @param menuParam
	 * @param teacherInfo
	 * @return
	 */
	public List<ExperimentCourse> selectExperimentCoursesByMenuParam(Integer menuParam, TeacherInfo teacherInfo) {
		switch (menuParam) {
		case 1:
			return experimentCourseMapper.selectExperimentCourseByWhere(null, 2, MAX_COUNT);
		case 2:
			if (teacherInfo.getDepartment() == null || teacherInfo.getDepartment().getId() == null) {
				throw new RuntimeException("对不起,您不属于任何院系,无法获取您的院系信息!");
			}
			return experimentCourseMapper.selectExperimentCourseByWhere(teacherInfo.getDepartment().getId(), 2,
					MAX_COUNT);
		case 3:
			return experimentCourseMapper.selectTeacherExperimentCourseByTeacherInfoId(teacherInfo.getId(), 2);
		default:
			return null;
		}
	}

	/**
	 * 查询主页面的课程信息信息-以及课程下的设计实验信息 课程下的参考实验信息
	 * 
	 * @param menuParam
	 * @param teacherInfo
	 * @return
	 */
	public List<Department> selectMainPageDepartmentExperimentCourses(TeacherInfo teacherInfo) {
		// 伪代码，后期添加权限删除-打开注释部分
		List<ExperimentCourse> experimentCourseList = experimentCourseMapper.selectExperimentCourseByWhere(null, 2,
				MAX_COUNT);
		if (experimentCourseList != null && !experimentCourseList.isEmpty()) {
			List<Department> departmentList = new ArrayList<Department>();
			for (ExperimentCourse experimentCourse : experimentCourseList) {
				Boolean temp = true;
				for (Department department : departmentList) {
					if (department.getId() == experimentCourse.getDepartmentId()) {
						department.getExperimentCourseList().add(experimentCourse);
						temp = false;
					}
				}
				if (temp) {
					if (experimentCourse.getDepartment() != null) {
						Department department = experimentCourse.getDepartment();
						List<ExperimentCourse> experimentCoursesList = new ArrayList<ExperimentCourse>();
						experimentCoursesList.add(experimentCourse);
						department.setExperimentCourseList(experimentCoursesList);
						departmentList.add(department);
					}
				}
			}
			return departmentList;
		}
		return null;
		/*
		 * if(teacherInfo.getPowers()!=null){
		 * if(teacherInfo.getPowers().get("查看实验课程(所有)")!=null){
		 * List<ExperimentCourse> experimentCourseList =
		 * experimentCourseMapper.selectExperimentCourseByWhere(null,2,MAX_COUNT
		 * ); }else if(teacherInfo.getPowers().get("查看实验课程(院系)")!=null){
		 * if(teacherInfo.getDepartment()==null
		 * ||teacherInfo.getDepartment().getId()==null){ throw new
		 * RuntimeException("对不起,您不属于任何院系,无法获取您的院系信息!"); }
		 * List<ExperimentCourse> experimentCourseList =
		 * experimentCourseMapper.selectExperimentCourseByWhere(teacherInfo.
		 * getDepartment().getId(),2,MAX_COUNT); }else{ List<ExperimentCourse>
		 * experimentCourseList =
		 * experimentCourseMapper.selectTeacherExperimentCourseByTeacherInfoId(
		 * teacherInfo.getId(),2); } if(experimentCourseList!=null &&
		 * !experimentCourseList.isEmpty()){ List<Department> departmentList =
		 * new ArrayList<Department>(); for (ExperimentCourse experimentCourse :
		 * experimentCourseList) { Boolean temp = true; for (Department
		 * department : departmentList) {
		 * if(department.getId()==experimentCourse.getDepartmentId()){
		 * department.getExperimentCourseList().add(experimentCourse); temp =
		 * false; } } if(temp){ if(experimentCourse.getDepartment()!=null){
		 * Department department = experimentCourse.getDepartment();
		 * List<ExperimentCourse> experimentCoursesList = new
		 * ArrayList<ExperimentCourse>();
		 * experimentCoursesList.add(experimentCourse);
		 * department.setExperimentCourseList(experimentCoursesList);
		 * departmentList.add(department); } } } return departmentList; } }
		 * return null;
		 */
	}

	/**
	 * 添加实习课程
	 * 
	 * @param experimentCourse
	 * @param imgFile
	 */
	public void addExperimentCourse(HttpServletRequest request, ExperimentCourse experimentCourse,
			MultipartFile imgFile, TeacherInfo teacherInfo) {
		// 判断数据不能为空
		if (experimentCourse.getDepartmentId() == null) {
			throw new RuntimeException("院系不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getNumber())) {
			throw new RuntimeException("课程编号不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getCourseName())) {
			throw new RuntimeException("课程名称不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getSemester())) {
			throw new RuntimeException("课程所属学期不能为空");
		}
		if (experimentCourse.getClassHour() == null) {
			throw new RuntimeException("总课时不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getPresentation())) {
			throw new RuntimeException("课程介绍不能为空");
		}
		// 封装课程封面

		if (imgFile != null && imgFile.getSize() != 0) {
			ResourceFile resourceFile = addCourseImg(experimentCourse, imgFile, teacherInfo);
			if (resourceFile != null) {
				experimentCourse.setCourseImgId(resourceFile.getFileId());
			}
		}
		// 设置操作员ID，封装数据
		experimentCourse.setTeacherInfoId(teacherInfo.getId());
		experimentCourse.setCreateTime(new Date());
		experimentCourse.setUpdateTime(experimentCourse.getCreateTime());
		experimentCourse.setStealth(2);
		experimentCourse.setIsPublish(2);// 1 是虚拟仿真 2 开放与预约
		// 保存到数据库
		experimentCourseMapper.insertSelective(experimentCourse);
		TeacherLogInformation record = TeacherLogInformation.bildInfo(request, teacherInfo.getId(),
				"添加了实验课程《" + experimentCourse.getCourseName() + "》", 7);
		teacherLogInformationMapper.insertSelective(record);
	}

	/**
	 * 上传实验课程封面
	 * 
	 * @param experimentCourse
	 *            项目信息
	 * @param file
	 *            项目封面
	 * @param teacherInfo
	 *            用户信息
	 * @return
	 */
	protected ResourceFile addCourseImg(ExperimentCourse experimentCourse, MultipartFile file,
			TeacherInfo teacherInfo) {
		if (!FileOperateUtils.checkFilepattern(file, "jpg|jpeg|png|gif|bmp")) {
			throw new RuntimeException("请上传正确格式的封面图片");
		}
		String targetPath = VS_EXPERIMENT + "/" + experimentCourse.getCourseName() + "/" + teacherInfo.getName();
		try {
			String filePath = FileOperateUtils.upload(FILE_PATH, targetPath, file);
			String originalFilename = file.getOriginalFilename();// 原始文件名
			// 文件后缀名
			String fileType = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
			// 获取文件的名称
			String fileName = originalFilename.substring(0, originalFilename.indexOf("."));
			// 获取文件的大小
			Long fileSize = file.getSize();
			// 把上传的图片保存到资源文件中
			ResourceFile resourceFile = new ResourceFile();
			resourceFile.setAuthorId(teacherInfo.getId());
			resourceFile.setHandlersId(teacherInfo.getId());
			resourceFile.setFileName(fileName);
			resourceFile.setFileType(fileType);
			resourceFile.setFileTitle("《" + experimentCourse.getCourseName() + "》课程封面");
			resourceFile.setFilePresentation("虚拟仿真实验子系统《" + experimentCourse.getCourseName() + "》实验课程封面");
			resourceFile.setFileSize(fileSize);
			resourceFile.setFilePath(filePath);
			resourceFile.setFileFormatPath(filePath);
			resourceFile.setOpenStatus(1);
			resourceFile.setIsDownload(2);
			resourceFile.setDownloadNum(0);
			resourceFile.setLibraryId(-1);
			resourceFile.setStealth(2);
			// 插入文件信息
			resourceFile.setCreateTime(new Date());
			resourceFile.setUpdateTime(resourceFile.getCreateTime());
			resourceFileMapper.insertSelective(resourceFile);
			return resourceFile;
		} catch (IllegalStateException e) {
			e.printStackTrace();
			throw new RuntimeException("图片上传失败，请重试");
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("图片上传失败，请重试");
		}
	}

	/**
	 * 根据实习课程ID，查询实习课程信息
	 * 
	 * @param experimentCourseId
	 * @return
	 */
	public ExperimentCourse selectExperimentCourseById(Integer experimentCourseId) {
		ExperimentCourse experimentCourse = experimentCourseMapper.selectExperimentCourseById(experimentCourseId);
		List<Experiment> experimentList = new ArrayList<Experiment>();
		if (experimentCourse.getPlanExperimentList() != null && !experimentCourse.getPlanExperimentList().isEmpty()) {
			experimentList.addAll(experimentCourse.getPlanExperimentList());
		}
		if (experimentCourse.getVisitExperimentList() != null && !experimentCourse.getVisitExperimentList().isEmpty()) {
			experimentList.addAll(experimentCourse.getVisitExperimentList());
		}
		experimentCourse.setExperimentList(experimentList);
		return experimentCourse;
	}

	/**
	 * 查询课程以及课程下实验信息
	 * 
	 * @param courseId
	 * @return
	 */
	public ExperimentCourse selectCourseAndExprimentByCourseId(Integer courseId, Integer identify) {
		ExperimentCourse exc = experimentCourseMapper.selectCourseAndExprimentByCourseId(courseId, identify);
		if (exc != null) {
			if (exc.getExperimentList().size() != 0) {

				List<Experiment> ex = exc.getExperimentList();// 实验表

				ExperimentTemplate et = new ExperimentTemplate();// 模板表

				for (int i = 0; i < ex.size(); i++) {

					// 获取该实验是否存在模板，如果存在则不可再添加
					et.setExperimentalId(ex.get(i).getExperimentId());

					List<ExperimentTemplate> ets = experimentTemplateMapper.select(et);

					for (int j = 0; j < ets.size(); j++) {

						if (ets.get(j).getId() != null) {
							// 存在 加一个模板 id
							ex.get(i).setExtId(String.valueOf(ets.get(j).getId()));
						}
					}

				}
				exc.setExperimentList(ex);

				return exc;
			} else {

				return exc;
			}
		} else {
			return exc;
		}
	}

	/**
	 * 修改实验课程
	 * 
	 * @param experimentCourse
	 * @param imgFile
	 * @param teacherInfo
	 */
	public void updateExperimentCourse(HttpServletRequest request, ExperimentCourse experimentCourse,
			MultipartFile imgFile, TeacherInfo teacherInfo) {
		// 判断数据不能为空
		if (experimentCourse.getDepartmentId() == null) {
			throw new RuntimeException("院系不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getNumber())) {
			throw new RuntimeException("课程编号不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getCourseName())) {
			throw new RuntimeException("课程名称不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getSemester())) {
			throw new RuntimeException("课程所属学期不能为空");
		}
		if (experimentCourse.getClassHour() == null) {
			throw new RuntimeException("总课时不能为空");
		}
		if (!StringUtils.isNotEmpty(experimentCourse.getPresentation())) {
			throw new RuntimeException("课程介绍不能为空");
		}
		// 封装课程封面
		if (imgFile != null && imgFile.getSize() != 0) {
			ResourceFile resourceFile = addCourseImg(experimentCourse, imgFile, teacherInfo);
			if (resourceFile != null) {
				experimentCourse.setCourseImgId(resourceFile.getFileId());
			}
		}
		// 设置操作员ID
		experimentCourse.setTeacherInfoId(teacherInfo.getId());
		experimentCourse.setUpdateTime(new Date());
		// 更新到数据库
		experimentCourseMapper.updateByPrimaryKeySelective(experimentCourse);
		TeacherLogInformation record = TeacherLogInformation.bildInfo(request, teacherInfo.getId(),
				"修改了实验课程《" + experimentCourse.getCourseName() + "》", 5);
		teacherLogInformationMapper.insertSelective(record);
	}

	/**
	 * 根据院系ID，查询院系下的实验课程信息
	 * 
	 * @param departmentId
	 * @return
	 */
	public List<ExperimentCourse> selectExperimentCourseByDepartmentId(Integer departmentId) {
		return experimentCourseMapper.selectExperimentCourseByWhere(departmentId, 2, MAX_COUNT);
	}

	/**
	 * 根据实验id 查询实验课程信息 可能有多个实验课程，这里只取一个
	 * 
	 * @param experimentId
	 * @return
	 */
	public ExperimentCourse selectCourseByExperimentId(Integer experimentId) {
		if (experimentId == null) {
			throw new RuntimeException("【根据实验id查询实验课程信息】 实验id为空");
		}
		List<ExperimentCourse> experimentCourses = experimentCourseMapper.selectCourseByExperimentId(experimentId);
		if (CollectionUtils.isNotEmpty(experimentCourses)) {
			return experimentCourses.get(0);
		} else {
			return null;
		}
	}

	/**
	 * 统计实验课程表
	 * 
	 * @return
	 */
	public Integer selectexperimentCoutseCount() {
		ExperimentCourse exCoure = new ExperimentCourse();
		exCoure.setStealth(2);// 显示
		exCoure.setIsPublish(2);// 1 为虚拟 2 为实物
		Integer exCount = experimentCourseMapper.selectCount(exCoure);
		return exCount;
	}

	/**
	 * 获取当前操作者所拥有的课程
	 * 
	 * @param teacherInfo
	 * @return
	 */
	public List<ExperimentCourse> selectMyExperimentCourses(TeacherInfo teacherInfo) {
		return experimentCourseMapper.selectTeacherExperimentCourseByTeacherInfoId(teacherInfo.getId(), 2);
	}

}
