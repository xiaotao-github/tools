package com.vcooc.experiment.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.vcooc.base.pojo.ClockingIn;
import com.vcooc.base.pojo.CourseSchedule;
import com.vcooc.base.pojo.Department;
import com.vcooc.base.pojo.Experiment;
import com.vcooc.base.pojo.ExperimentLab;
import com.vcooc.base.pojo.LabBlacklist;
import com.vcooc.base.pojo.LabManager;
import com.vcooc.base.pojo.ResourceCollection;
import com.vcooc.base.pojo.ResourceFile;
import com.vcooc.base.pojo.ResourceLibrary;
import com.vcooc.base.pojo.ScheduleClass;
import com.vcooc.base.pojo.ScheduleStudentScore;
import com.vcooc.base.pojo.StudentExperimentResult;
import com.vcooc.base.pojo.StudentNotes;
import com.vcooc.base.pojo.TeacherInfo;
import com.vcooc.base.pojo.TeacherMsgResult;

public interface StudentHomeMapper {

	/**根据当前学期查询该学生班级下的课程下的所有实验
	 * @param startTime
	 * @param endTime
	 * @param classId
	 * @param pageSize 
	 * @param pageSize2 
	 * @param i 
	 * @return
	 * classId = null 可查询全部（整班上课）该学期预约
	 * type 为空时 获取全部 预约，包括 整班上课 自主预约 不为空是 获取 自主预约
	 */
	List<CourseSchedule> AselectMyHomeScheduleByLabId(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("classId") Integer classId,@Param("type") Integer type, @Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);
	
	
	/**
	 * 
	 *根据学生Id 获取已经预约的课程
	 * @param startTime
	 * @param endTime
	 * @param studentId
	 * @param type 
	 * @param pageSize 
	 * @param i 
	 * @return
	 * studentId = null 可查询全部（自主预约）该学期预约
	 */
	List<CourseSchedule> studentAppointmentList(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("studentId") Integer studentId,@Param("type") Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	
	
	/**
	 * 该学生自主预约的总数
	 * @param studentId
	 * @return
	 */
	//@Select(" SELECT COUNT(*)  FROM scourse_student  WHERE student_id =  #{studentId} ")
	Integer countList(@Param("studentId") Integer studentId);


	/**
	 * 该学生所在班级所关联并在显示的课程
	 * @param classId
	 * @return
	 */
	Integer countExperimenTcourse(@Param("classId") Integer classId);


	/**
	 * 该学生所在班级所关联课程下的实验 
	 * @param classId
	 * @return
	 */
	Integer countexperimentList(@Param("classId") Integer classId);


	/**
	 * 根据实验Id获取所有明细（获取的教师是实验的作者 非实验课程下的教师）
	 * @param scheduleId 
	 * @param scheduleId
	 * @return
	 */
	Experiment finallExperimentList(@Param("experimentId") Integer experimentId, @Param("scheduleId")Integer scheduleId);


	/**
	 * 实验室Id 获取实验室详情
	 * @param labId
	 * @return
	 */
	@Select("SELECT *  FROM experiment_lab AS el WHERE el.stealth = 2 AND el.lab_id = #{labId}")
	ExperimentLab finallexperimentLab(@Param("labId") Integer labId);

	/**
	 * 实验室Id 获取管理员
	 * @param labId
	 * @ret
	 */
	List<LabManager>  finAllExperimentLabManager(@Param("labId") Integer labId);

	/**
	 * 课程表Id 获取课程下面的班级
	 * @param scheduleId
	 * @return
	 */
	List<ScheduleClass> finAllscheduleClassList(@Param("scheduleId") Integer scheduleId);


	/**
	 * 学生id 课程表id  获取该学生对该课程是否已经考勤的信息
	 * @param studentId
	 * @param scheduleId 
	 * @return
	 */
	@Select("SELECT schedule_student_score_id,signin,signin_time,stipulate_sginin_time FROM schedule_student_score WHERE submitter_id = #{studentId} AND schedule_id = #{scheduleId}")
	ScheduleStudentScore selectStudenClockingIn(@Param("studentId")Integer studentId, @Param("scheduleId") Integer scheduleId);


	/**
	 * 学生id 与 实验室Id 获取学生笔记 
	 * @param studentId
	 * @param experimentId
	 * @return
	 */
	@Select("SELECT * FROM student_notes WHERE student_info_id = #{studentId} AND note_type = 3 AND relevance_id = #{experimentId} GROUP BY student_notes_id  ORDER BY student_notes_id  DESC")
	List<StudentNotes> selectstudentNotesList(@Param("studentId") Integer studentId,@Param("experimentId") Integer experimentId);


	/**
	 * 删除笔记
	 * @param notesListId
	 */
	@Delete("DELETE FROM student_notes WHERE student_notes_id = #{notesListId}")
	void delNoteById(@Param("notesListId")Integer notesListId);


	/**根据实验id获取实验资源
	 * @param experimentId
	 * @return
	 */
	List<ResourceFile> selectExperimentByExperimentId(@Param("experimentId") Integer  experimentId);


	/**
	 * 作者Id 获取作者
	 * @param authorId
	 * @return 
	 */
	@Select("SELECT * FROM teacher_info WHERE id = #{authorId}")
	TeacherInfo selectAuthor(@Param("authorId") Integer authorId);


	/**
	 * 资源Id 获取收藏量
	 * @param fileId
	 * @return
	 */
	@Select("SELECT * FROM resource_collection WHERE  file_id = #{fileId}")
	ResourceCollection selectcollection(@Param("fileId") Integer fileId);


	/**
	 * 根据作者院系id 获取所在院系信息
	 * @param departmentId
	 * @return
	 */
	@Select("SELECT * FROM department WHERE id  = #{departmentId}")
	Department selectDepatment(@Param("departmentId") Integer departmentId);


	/**
	 * 根据资源的库id 获取 资源库
	 * @param libraryId
	 * @return
	 */
	@Select("SELECT * FROM resource_library WHERE library_id = #{libraryId}")
	ResourceLibrary selcetLibrary(@Param("libraryId") Integer libraryId);
	
	
	/**
	 * 学生班级获取可预约的实验
	 * 时间为空 ，type 为空  即查询全部 
	 * @param tbClassId
	 * @param type 
	 * @param studentId 
	 * @return
	 */
	//Integer finAllMyReservableExperimentList(@Param("startTime") Date startTime, @Param("endTime") Date endTime,@Param("tbClassId") Integer classId,@Param("type") Integer type);
	Integer finAllMyReservableExperimentList(@Param("tbClassId") Integer classId,@Param("studentId")Integer studentId);



	/**
	 * 获取我的可预约，排除我已经预约过的
	 * @param startTime
	 * @param endTime
	 * @param classId
	 * @param studentId
	 * @param type
	 * @param startRow
	 * @param pageSize
	 * @return
	 */
	//List<CourseSchedule> MyReservation(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("classId") Integer classId,@Param("studentId")Integer studentId, @Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);
	List<CourseSchedule> MyReservation( @Param("classId") Integer classId,@Param("studentId")Integer studentId, @Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	
	
	/**
	 * 获取学生实验列表</br>
	 * @param studentId
	 * @param type   1 为整班上课 </br>
	 * 				 3为自主预约 </br>
	 * 		 		 0为全部       </br>
	 * @param startRow 起始行数</br>
	 * @param pageSize 每页个数 </br>
	 * @return
	 */
	List<StudentExperimentResult> findStudentExperimentList(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);
	
	/**
	 * 获取学生实验列表</br>
	 * @param studentId
	 * @param type   1 为整班上课 </br>
	 * 				 3为自主预约 </br>
	 * 		 		 0为全部       </br>
	 * @param startRow 起始行数</br>
	 * @param pageSize 每页个数 </br>
	 * @return
	 */
	List<StudentExperimentResult> findStudentExperimentListTwo(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	List<StudentExperimentResult> findStudentExperimentListOne(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	List<StudentExperimentResult> findStudentExperimentListThree(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);
	
	List<StudentExperimentResult> findStudentExperimentListFour(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	List<StudentExperimentResult> findStudentExperimentListFive(@Param("studentId")Integer studentId,@Param("type")Integer type,@Param("startRow") Integer startRow,@Param("pageSize") Integer pageSize);

	/**
	 * 课程Id 获取老师信息
	 * @param experimentCourseId
	 * @return
	 */
	List<TeacherMsgResult> selectCourseTeacherByCourseId(@Param("experimentCourseId")Integer experimentCourseId);
	
	/**
	 * 实验室Id 获取老师信息
	 * @param experimentCourseId
	 * @return
	 */
	List<TeacherMsgResult> selectCourseTeacherByExperimentId(@Param("experimentId")Integer experimentId);
	
	/**
	 * 获取学生实验次数</br>
	 * @param studentId
	 * @param type 0全部  1整班上课 3自主预约 </br>
	 * @return
	 */
	Integer findStudentExperimentCount(@Param("studentId")Integer studentId, @Param("type")Integer type);
	Integer findStudentExperimentCountOne(@Param("studentId")Integer studentId, @Param("type")Integer type);
	Integer findStudentExperimentCountTwo(@Param("studentId")Integer studentId, @Param("type")Integer type);
	Integer findStudentExperimentCountThree(@Param("studentId")Integer studentId, @Param("type")Integer type);
	Integer findStudentExperimentCountFour(@Param("studentId")Integer studentId, @Param("type")Integer type);
	Integer findStudentExperimentCountFive(@Param("studentId")Integer studentId, @Param("type")Integer type);






	/**
	 * 获取我当前学期预约实验
	 * @param startTime
	 * @param endTime
	 * @param classId
	 * @param type
	 * @return
	 */
	List<CourseSchedule> MyScheduleByLabId(@Param("startTime") Date startTime, @Param("endTime") Date endTime, @Param("classId") Integer classId,@Param("type") Integer type);


	/**
	 * 获取学生当前学期已经预约过的课程总数
	 * @param startTime
	 * @param endTime
	 * @param studentId
	 * @param type
	 * @return
	 */
	Integer finAllMyReservableExperiment(@Param("startTime") Date startTime, @Param("endTime") Date endTime,@Param("studentId") Integer studentId);

	/**
	 * 学生id 查询黑名单
	 * @param strudentId
	 * @return
	 */
	@Select("SELECT *  FROM  lab_blacklist WHERE student_id = #{strudentId}")
	LabBlacklist finStudentByIdGetBlacklist(@Param("strudentId") Integer strudentId);


	/**
	 * 课程表id获取该课程剩于的工位数（课程表明细）
	 * @param scheduleId
	 * @return
	 * @Select("SELECT seats,lab_id,Remaining_seats FROM course_schedule AS cs WHERE cs.schedule_id = #{scheduleId}")
	 */
	@Select("SELECT * FROM course_schedule AS cs WHERE cs.schedule_id = #{scheduleId}")
	CourseSchedule selectCourseSchedule(@Param("scheduleId") Integer scheduleId);


	/**
	 * 统计该课程已经多少人预约过了
	 * @param scheduleId
	 * @return
	 */
	@Select(" SELECT  COUNT(*) FROM scourse_student  WHERE schedule_id = #{scheduleId}")
	Integer countSeat(@Param("scheduleId") Integer scheduleId);


	/**
	 * 插入学生自主预约数据
	 * @param get32uuid 主键
	 * @param scheduleId 课程id
	 * @param studentId 学生id
	 * @param studentNumber 学生工位
	 */
    @Insert("INSERT INTO scourse_student(scourse_student_id,schedule_id,student_id,lab_myseat,create_time,update_time) VALUES(#{id},#{scheduleId},#{studentId},#{studentNumber},NOW(),NOW())")
	void insertStudentSeat(@Param("id")String id, @Param("scheduleId")Integer scheduleId,@Param("studentId") Integer studentId, @Param("studentNumber")Integer studentNumber);

    
    /**
     * 获取总资源 根据 实验类型 
     * @param type 1，2，3
     * @param departmentId 
     * @return
     */
    List<ResourceFile> totalResources (@Param("type")Integer type,@Param("departmentId") Integer departmentId);


	/**
	 * 获取学生预约的课程表明细
	 * @param scheduleId
	 * @return
	 */
	CourseSchedule selectStudentCourseSchedule(@Param("scheduleId")Integer scheduleId);
	

	
	
	
	
	
	
	
	
	
	
}
