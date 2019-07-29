package com.vcooc.base.pojo;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 权限信息表
 * @author admin
 *
 */
@Table(name="menu")
public class Menu  extends BaseBean implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id; //权限id
	private Integer pId;//父级id
	private String name;//权限名称
	@Transient
	private Menu parantMenu;//自关联，权限的父级;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Menu getParantMenu() {
		return parantMenu;
	}
	public void setParantMenu(Menu parantMenu) {
		this.parantMenu = parantMenu;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getpId() {
		return pId;
	}
	public void setpId(Integer pId) {
		this.pId = pId;
	}
}
