package com.athenas.atividadeTecnica.enums;

public enum Sexo {

	M("Masculino"), S("Feminino");

	private String label;

	private Sexo(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

}
