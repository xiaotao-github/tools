package com.vcooc.base.pojo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
/**
 * 角色信息表
 * @author admin
 *
 */
@Table(name="role")
public class Role  extends BaseBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//角色id
	private Integer pId;//角色父级id ，自关联
	private List<Menu> menus;//角色权限,一对多
	private String name;//角色名称
	private Department department;//所属院系
	private TeacherInfo teacherInfo;//操作员信息(teacherInfoId)
	private Integer stealth ;//做伪删除字段，1隐藏，2.显示；
	
	@Transient
	private Role roleParent;
	
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Integer getStealth() {
		return stealth;
	}
	public void setStealth(Integer stealth) {
		this.stealth = stealth;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getpId() {
		return pId;
	}
	public void setpId(Integer pId) {
		this.pId = pId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}
	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}
	public List<Menu> getMenus() {
		return menus;
	}
	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}
	public Role getRoleParent() {
		return roleParent;
	}
	public void setRoleParent(Role roleParent) {
		this.roleParent = roleParent;
	}
}
