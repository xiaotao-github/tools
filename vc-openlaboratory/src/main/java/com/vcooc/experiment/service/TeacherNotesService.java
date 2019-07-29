package com.vcooc.experiment.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcooc.base.pojo.TeachNotes;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.common.spring.exetend.PropertyConfig;
import com.vcooc.experiment.mapper.TeachNotesMapper;


@Service
public class TeacherNotesService extends BaseService<TeachNotes> {
	// 最大查询数量
	@PropertyConfig
	private Integer MAX_COUNT;
	@Autowired
	private TeachNotesMapper teachNotesMapper;

	/**
	 * 增加笔记
	 * 
	 * @param notes插入的笔记对象
	 * @throws Exception
	 */
	public TeachNotes addNotes(TeachNotes notes) {
		// 判断对象数据是否为空
		if (notes == null || notes.getNotesContent() == null) {
			throw new RuntimeException("数据不完整，请重新操作");
		}
	    notes.setStealth(2);
	    notes.setNoteType(4);//开放与预约笔记
	    notes.setCreateTime(new Date());
	    teachNotesMapper.insertSelective(notes);
	    return notes;
	}

	public List<TeachNotes> selectNotesByUserId(TeacherInfo teacherInfo){
		//TeachNotes record = new TeachNotes();
		//record.setTeacherInfoId(teacherInfo.getId());
		//record.setNoteType(3);//实验笔记
		//record.setStealth(2);//伪被删除的;
		//return teachNotesMapper.select(record);
		List<TeachNotes> tnList = teachNotesMapper.selectNotesByUserId(teacherInfo.getUser().getId(),4,2);
		return tnList ;
	}

	/**
	 * 根据条件查询教师笔记
	 * @param vcoocUserId
	 * @param condition
	 * @return
	 * @throws Exception
	 */
/*	public List<TeachNotes> selectNotesByCondition(TeacherInfo teacherInfo,String condition) throws Exception{
		return teachNotesMapper.selectNotesByCondition(condition,2);
	}
	
	
	public void deleteNotesById(Integer id) throws Exception{
		teachNotesMapper.deleteNotesByNotesId(1, id);
	}*/
	
}
