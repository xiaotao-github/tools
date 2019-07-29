package com.vcooc.base.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="scourse_student")
public class ScourseStudent extends BaseBean {
	  private static final long serialVersionUID = 385466688768060914L;
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private  String scourseStudentId;
	    private Integer studentId; //学生
	    private  Integer scheduleId;//课程id
	    private Integer labMyseat;//我的预约工位
	    
	    
	    
		public Integer getScheduleId() {
			return scheduleId;
		}
		public void setScheduleId(Integer scheduleId) {
			this.scheduleId = scheduleId;
		}
		public Integer getLabMyseat() {
			return labMyseat;
		}
		public void setLabMyseat(Integer labMyseat) {
			this.labMyseat = labMyseat;
		}
		public String getScourseStudentId() {
			return scourseStudentId;
		}
		public void setScourseStudentId(String scourseStudentId) {
			this.scourseStudentId = scourseStudentId;
		}
		public Integer getStudentId() {
			return studentId;
		}
		public void setStudentId(Integer studentId) {
			this.studentId = studentId;
		}
}
