package com.vcooc.experiment.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.vcooc.base.pojo.TeachNotes;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.service.shiro.RedisSessionService;
import com.vcooc.common.vo.SysResult;
import com.vcooc.experiment.service.TeacherNotesService;

/**
 * 教务笔记管理
 * 
 * @author admin
 *
 */
@Controller
@RequestMapping("teachNotesController")
public class TeacherNotesController {
	@Autowired
	private TeacherNotesService teacherNotesService;
	@Autowired
	private RedisSessionService redisSessionService;

	/**
	 * 添加教务笔记
	 * 
	 * @param notes
	 * @return
	 */
	@RequestMapping("addNotes")
	@ResponseBody
	public SysResult addNotes(TeachNotes notes, @CookieValue(required = false) String vcoocUserId) {
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if(teacherInfo==null){
			return SysResult.build(203,"由于您长时间未操作,请重新登录后再进行操作！");
		}
		notes.setTeacherInfoId(teacherInfo.getId());
		
		return SysResult.ok(teacherNotesService.addNotes(notes));
	}

	/**
	 * 根据教师账号id查询教务笔记
	 * 
	 * @param vcoocUserId
	 * @return
	 */
	@RequestMapping("selectNotesByUserId")
	@ResponseBody
	public SysResult selectNotesByUserId(@CookieValue(required = false) String vcoocUserId) {
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if (teacherInfo == null) {
			return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作！");
		}
		List<TeachNotes> notesList = new ArrayList<TeachNotes>();
		notesList = teacherNotesService.selectNotesByUserId(teacherInfo);
		return SysResult.ok(notesList);
	}

	/**
	 * 根据笔记id删除笔记
	 * 
	 * @param vcoocUserId
	 * @param noteId
	 * @return
	 */
	@RequestMapping("deleteNotesByNotesId/{noteId}")
	@ResponseBody
	public SysResult deleteNotesByNotesId(@CookieValue(required = false) String vcoocUserId,
			@PathVariable("noteId") Integer noteId) {
		TeacherInfo teacherInfo = redisSessionService.querySessionUserInfo(new  TeacherInfo(), vcoocUserId);
		if (teacherInfo == null) {
			return SysResult.build(203, "由于您长时间未操作,请重新登录后再进行操作！");
		}
		teacherNotesService.deleteById(noteId);
		return SysResult.ok("删除成功");
	}
}