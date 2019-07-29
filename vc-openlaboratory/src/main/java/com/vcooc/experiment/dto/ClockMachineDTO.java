package com.vcooc.experiment.dto;

public class ClockMachineDTO {
	
	private String clockinId;
	
	private String fkName;
	
	private Long labId;
	
	private Long id;

	public String getClockinId() {
		return clockinId;
	}

	public void setClockinId(String clockinId) {
		this.clockinId = clockinId;
	}

	public String getFkName() {
		return fkName;
	}

	public void setFkName(String fkName) {
		this.fkName = fkName;
	}

	public Long getLabId() {
		return labId;
	}

	public void setLabId(Long labId) {
		this.labId = labId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "ClockMachineDTO [clockinId=" + clockinId + ", fkName=" + fkName + ", labId=" + labId + ", id=" + id
				+ "]";
	}

	public ClockMachineDTO(String clockinId, String fkName, Long labId, Long id) {
		super();
		this.clockinId = clockinId;
		this.fkName = fkName;
		this.labId = labId;
		this.id = id;
	}
	
	
	

}
