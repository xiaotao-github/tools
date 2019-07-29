package com.vcooc.experiment.dto;



/**
 * 用于封装学生提交报告保存文件的路径
 * @author ITcast
 *
 */
public class ExperimentFileNameDTO {
            private String experimentCourseName;
            private String experimentName;
            private String studentName;
            private String scheduleId;
            private String experimentId;
            private String scheduleStudentScoreId;
            private String studentId;
            
			public String getScheduleId() {
				return scheduleId;
			}
			public void setScheduleId(String scheduleId) {
				this.scheduleId = scheduleId;
			}
			public String getExperimentId() {
				return experimentId;
			}
			public void setExperimentId(String experimentId) {
				this.experimentId = experimentId;
			}
			public String getScheduleStudentScoreId() {
				return scheduleStudentScoreId;
			}
			public void setScheduleStudentScoreId(String scheduleStudentScoreId) {
				this.scheduleStudentScoreId = scheduleStudentScoreId;
			}
			public String getStudentId() {
				return studentId;
			}
			public void setStudentId(String studentId) {
				this.studentId = studentId;
			}
			public String getExperimentCourseName() {
				return experimentCourseName;
			}
			public void setExperimentCourseName(String experimentCourseName) {
				this.experimentCourseName = experimentCourseName;
			}
			public String getExperimentName() {
				return experimentName;
			}
			public void setExperimentName(String experimentName) {
				this.experimentName = experimentName;
			}
			public String getStudentName() {
				return studentName;
			}
			public void setStudentName(String studentName) {
				this.studentName = studentName;
			}
            
            
}
