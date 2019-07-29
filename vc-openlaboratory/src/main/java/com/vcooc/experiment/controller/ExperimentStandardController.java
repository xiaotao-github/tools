package com.vcooc.experiment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentStandard;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.util.StringUtil;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.controller.Interface.VerificationUser;
import com.vcooc.experiment.controller.Interface.VerificationUserModel;
import com.vcooc.experiment.dto.ExperimentStandardDTO;
import com.vcooc.experiment.service.ExperimentService;
import com.vcooc.experiment.service.ExperimentStandardService;

@Controller
@RequestMapping("experimentStandardController")
public class ExperimentStandardController extends BaseController{
	
	@Autowired
	private ExperimentService experimentService;
	@Autowired
	private ExperimentStandardService experimentStandardService;

	
	/**
	 * 根据实验id,查询实验评分标准
	 * @param exprimentId 实验id，
	 * @param menuParam   权限参数
	 * @return
	 */
	@RequestMapping("list/{exprimentId}/{menuParam}")
	public ModelAndView list(final @PathVariable Integer exprimentId,
			final @PathVariable Integer menuParam){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				Experiment experiment = experimentService.selectById(exprimentId);
				if(experiment == null){
					return ExceptionErrorModelAndView("出错啦~请检查您当前的网络或者刷新后重试");
				}
				if(experiment.getStandardIdentify() == null || "".equals(experiment.getStandardIdentify())){
					//创建32位UUID，update
					experiment.setStandardIdentify(get32UUID());
					experimentService.updateByPrimaryKeySelective(experiment);
				}
				mv.addObject("standardIdentify", experiment.getStandardIdentify());   //添加评分标准用
				mv.addObject("menuParam", menuParam);                                 //复制评分标准时，查询实验用
				mv.addObject("experimentStandardList",
						experimentStandardService.selectByStandardIdentify(experiment.getStandardIdentify()));
				mv.setViewName("");
				return mv;
			}
		});
	}
	
	
	
	/**
	 * 添加评分标准
	 * @param experimentStandard
	 * @return
	 */
	@RequestMapping("insert")
	@ResponseBody
	public SysResult insert(final ExperimentStandard experimentStandard){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				experimentStandardService.insert(experimentStandard);
				return sysResult;
			}
		});
	}
	
	
	/**
	 * 去修改评分标准页面
	 * @param standardId
	 * @return
	 */
	@RequestMapping("toEditPage/{standardId}")
	public ModelAndView toEditPage(final @PathVariable long standardId){
		return VerificationUserModel(new VerificationUserModel() {
			
			@Override
			public ModelAndView success(TeacherInfo teacherInfo, ModelAndView mv) {
				mv.addObject("data", experimentStandardService.selectById(standardId));
				return mv;
			}
		});
	}
	
	
	
	/**
	 * 修改评分标准
	 * @param experimentStandard
	 * @return
	 */
	@RequestMapping("edit")
	@ResponseBody
	public SysResult edit(final ExperimentStandard experimentStandard){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				experimentStandardService.update(experimentStandard);
				return sysResult;
			}
		});
	}
	
	
	
	/**
	 * 删除评分标准
	 * @param experimentStandard
	 * @return
	 */
	@RequestMapping("delete/{standardId}")
	@ResponseBody
	public SysResult delete(final @PathVariable long standardId){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				experimentStandardService.delete(standardId);
				return sysResult;
			}
		});
	}
	
	
	
	/**
	 * 修改序号
	 * @param standardId  要修改的数据id
	 * @param oldNumber   旧的序号,这里要这个参数是，如果不要，还需要去查一次数据，可减少数据库交互
	 * @param newNumber   新的序号
	 * @return
	 */
	@RequestMapping("updateNumber/{standardId}")
	@ResponseBody
	public SysResult updateNumber(final @PathVariable long standardId,
			final Integer oldNumber,final Integer newNumber){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				Integer maxNumber = experimentStandardService.getMaxNumberById(standardId);
				if(newNumber>maxNumber){
					return SysResult.build(202, "超过最大的序号,请重新输入序号",maxNumber);
				}
				if(newNumber <= 0){
					return SysResult.build(202, "最小的序号不能低于1");
				}
				experimentStandardService.updateNumber(standardId, oldNumber, newNumber);
				return sysResult;
			}
		});
	}
	
	
	
	/**
	 * 根据实验id,复制
	 * @param exprimentId  要复制评分标准的实验id
	 * @param standardIds  勾选的评分标准
	 * @return
	 */
	@RequestMapping("copy")
	@ResponseBody
	public SysResult copy(final Integer exprimentId,final String standardIds){
		return VerificationUser(new VerificationUser() {
			
			@Override
			public SysResult success(TeacherInfo teacherInfo, SysResult sysResult) {
				Experiment experiment = experimentService.selectById(exprimentId);
				if(experiment == null){
					return SysResult.build(202,"出错啦~请检查您当前的网络或者刷新后重试");
				}
				if(experiment.getStandardIdentify() == null || "".equals(experiment.getStandardIdentify())){
					//创建32位UUID，update
					experiment.setStandardIdentify(get32UUID());
					experimentService.updateByPrimaryKeySelective(experiment);
				}
				experimentStandardService.copeStandards(experiment.getStandardIdentify(), standardIds);
				return sysResult;
			}
		});
	}
	
	/**
	 * 修改实验下的评分标准
	 * @param menuParam 权限参数
	 * @param experimentId 实验id
	 * @param standardIdentify  实验评分标准标识
	 * @return
	 */
	@RequestMapping("editByExperimentId/{menuParam}/{experimentId}")
	public ModelAndView editByExperimentId(@PathVariable("menuParam")Integer menuParam
			,@PathVariable("experimentId")Integer experimentId
			,@RequestParam("standardIdentify")String standardIdentify
			,ExperimentStandardDTO experimentStandardDTO){
		if(experimentId==null){
			throw new RuntimeException("【修改实验评分标准】实验id为空");
		}
		if(experimentStandardDTO==null){
			throw new RuntimeException("【修改实验评分标准】实验评分标准不能为空");
		}
		//就得数据无 standardIdentify 生成standardIdentify
		if(StringUtil.isEmpty(standardIdentify)){
			standardIdentify = experimentService.updateStandardIdentify(experimentId);
		}
		
		experimentStandardService.editByExperimentId(experimentStandardDTO.getHasData(),standardIdentify);
		return new ModelAndView("forward:/experimentController/selectExperimentToEditPage/"+experimentId+"/"+menuParam+"?status=200");
		
	}
	
}
