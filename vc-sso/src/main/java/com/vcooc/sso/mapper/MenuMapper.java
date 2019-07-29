package com.vcooc.sso.mapper;

import java.util.List;

import com.vcooc.base.pojo.Menu;

public interface MenuMapper {

	List<Menu> getMenusByRoleId(Integer roleId);

}
