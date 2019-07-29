package com.vcooc.experiment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.PathVariable;

import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.Page;
import com.vcooc.base.pojo.PageData;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.common.mapper.SysMapper;

public interface LabClassCardPicWebMapper extends SysMapper<LabPv>{


	 /**
	 * @param  isPublish
	 * @param labId实验室ID
	 * @param p 分页类
	 * @return
	 */


	List<LabPv> SelectByMenuParam(PageData pageData);

	/**查询总数
	 * @param pageData
	 * @return
	 */
	Integer SelectCountPage(PageData pageData);

	/**修改
	 * @param pvid id
	 * @param is_publish 1 隐藏
	 */
	@Update("UPDATE lab_pv SET is_publish = 1  WHERE pv_id =  #{pvid}")
	void updateById(Integer pvid);

	

	
	

}
