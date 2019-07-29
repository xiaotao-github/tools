package com.vcooc.experiment.mapper;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.TeachNotes;
import com.vcooc.common.mapper.SysMapper;

public interface TeachNotesMapper extends SysMapper<TeachNotes>{


    /**根据教师用户id查询教务笔记
     * @param userId
     * @param MAX_COUNT
     * @param stealth
     * @return
     */
	@Select("SELECT * FROM teach_notes WHERE teacher_info_id =#{userId} AND note_type = #{noteType} AND  stealth = #{stealth}  GROUP BY id  ORDER BY id  DESC")
    List<TeachNotes> selectNotesByUserId(@Param("userId")Integer userId,@Param("noteType")Integer noteType,@Param("stealth")Integer stealth);
/*	*
 * //**
	 * 插入教务笔记
	 * @param notes
	 *//*
       public void addNotes(TeachNotes notes);
       
       *//**
        * 根据教师用户id查询教务笔记
        * @param userId
        * @return
        *//*
       //public List<TeachNotes> selectNotesByUserId(@Param("userId")Integer userId,@Param("maxCount")Integer MAX_COUNT,@Param("stealth")Integer stealth);
       *//**
        * 根据笔记内容查询笔记
        * @param condition
        * @return
        *//*
       public List<TeachNotes> selectNotesByCondition(String condition,@Param("stealth")Integer stealth);
       *//**
        * 根据笔记id将stealth为1
        * @param stealth
        * @param id
        *//*
       public void deleteNotesByNotesId(@Param("stealth")Integer stealth,@Param("id")Integer id);*/
}
