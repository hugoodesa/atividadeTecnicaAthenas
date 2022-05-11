package com.athenas.atividadeTecnica.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.athenas.atividadeTecnica.models.Pessoa;
import com.athenas.atividadeTecnica.repository.PessoaRepository;

@EnableCaching
@EnableSpringDataWebSupport
@RestController
@RequestMapping("/pessoas")
public class PessoaController {

	@Autowired
	private PessoaRepository repository;

	@GetMapping("/{id}")
	public ResponseEntity<Pessoa> getPessoaBy(@PathVariable Long id) {
		Optional<Pessoa> cliente = repository.findById(id);
		if (cliente.isPresent()) {
			return ResponseEntity.ok(cliente.get());
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/todos")
	public Page<Pessoa> getAllPessoa(@PageableDefault(direction = Direction.ASC, page = 0) Pageable paginacao) {
		Page<Pessoa> pessoas = repository.findAll(paginacao);
		return pessoas;
	}

	@PostMapping
	public ResponseEntity<Pessoa> postPessoa(@RequestBody Pessoa pessoa) {
		try {
			Pessoa pessoaPosted = repository.save(pessoa);
			return ResponseEntity.ok(pessoaPosted);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Pessoa> deletePessoa(@PathVariable Long id) {
		try {
			this.repository.deleteById(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.badRequest().build();
	};
	
	@PutMapping("/{id}")
	public ResponseEntity<Pessoa> deletePessoa(@PathVariable Long id,@RequestBody Pessoa pessoa) {
		try {
			this.repository.deleteById(id);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.badRequest().build();
	};

}
