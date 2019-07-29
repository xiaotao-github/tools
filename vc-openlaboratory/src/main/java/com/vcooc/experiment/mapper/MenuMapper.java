package com.vcooc.experiment.mapper;

import java.util.List;

import com.vcooc.base.pojo.Menu;

public interface MenuMapper {

	List<Menu> getMenusByRoleId(Integer roleId);

}
