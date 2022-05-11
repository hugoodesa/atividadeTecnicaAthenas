package com.athenas.atividadeTecnica.models;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import com.athenas.atividadeTecnica.enums.Sexo;

@Entity
@Table(name = "clientes")
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	@NotNull
	private String nome;
	@NotNull
	private String cpf;

	@Enumerated(EnumType.STRING)
	private Sexo sexo;

	private double altura;
	private double peso;

	public Pessoa() {
	}

	public Pessoa(Long id, String nome, String cpf, double altura, double peso) {
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.altura = altura;
		this.peso = peso;
	}
	
	private double calcularPesoIdeal() {
		double doublePesoIdeal = 0.0;

		if (sexo.equals(Sexo.M)) {
			doublePesoIdeal = (72.7 * altura) - 58;
		} else {
			doublePesoIdeal = (62.1 * altura) - 44.7;
		}

		return doublePesoIdeal;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		this.altura = altura;
	}

	public double getPeso() {
		return peso;
	}

	public void setPeso(double peso) {
		this.peso = peso;
	}

}
