package com.vcooc.experiment.mapper;



import com.vcooc.base.pojo.LabPv;
import com.vcooc.base.pojo.PageData;
import com.vcooc.common.mapper.SysMapper;

public interface LabClassCardVideoWebMapper extends SysMapper<LabPv> {

		/**查询总数
		 * @param pageData
		 * @return
		 */
		Integer SelectCountPage(PageData pageData);

		
	

}
