package com.ekan.teste.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ekan.teste.entity.Beneficiario;
import com.ekan.teste.entity.Documento;
import com.ekan.teste.repository.BeneficiarioRepository;
import com.ekan.teste.repository.DocumentoRepository;

@RestController
@RequestMapping("/beneficiario")
@CrossOrigin
public class BeneficiarioController {

	private final BeneficiarioRepository beneficiarioRepository;
	private final DocumentoRepository documentoRepository;
    BeneficiarioController(BeneficiarioRepository beneficiarioRepository,DocumentoRepository documentoRepository) {
        this.beneficiarioRepository = beneficiarioRepository;
        this.documentoRepository = documentoRepository;
    }
	
	@GetMapping
	public List<Beneficiario> listar() {
		return this.beneficiarioRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> listaPorId(@PathVariable(value="id")Long id) {
		Optional<Beneficiario> beneficiario = this.beneficiarioRepository.findById(id);
		if(!beneficiario.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beneficiário não encontrado!");
		}
		return ResponseEntity.status(HttpStatus.OK).body(beneficiario);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Beneficiario adicionar(@RequestBody Beneficiario beneficiario)
	{
		beneficiario.setDataInclusao(new Date());
		beneficiario.setDataAtualizacao(new Date());
		List<Documento> lstdoc = beneficiario.getDocumento();
		List<Long> ids = new ArrayList<Long>();
		for(int i = 0; i < lstdoc.size(); i++) 
		{
			ids.add(lstdoc.get(i).getId());
		}
		List<Documento> documentoToUpdate = this.documentoRepository.findAllById(ids);
		beneficiario.setDocumento(documentoToUpdate);
		return this.beneficiarioRepository.save(beneficiario);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> atualizar(@PathVariable(value="id")Long id,@RequestBody Beneficiario beneficiario)
	{
		beneficiario.setDataAtualizacao(new Date());
		Optional<Beneficiario> beneficiarioToUpdate = this.beneficiarioRepository.findById(id);
		if(!beneficiarioToUpdate.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beneficiário não encontrado!");
		}
		beneficiario.setDataInclusao(beneficiarioToUpdate.get().getDataInclusao());
		
		List<Documento> lstdoc = beneficiario.getDocumento();
		List<Long> ids = new ArrayList<Long>();
		for(int i = 0; i < lstdoc.size(); i++) 
		{
			ids.add(lstdoc.get(i).getId());
		}
		List<Documento> documentoToUpdate = this.documentoRepository.findAllById(ids);
		beneficiario.setDocumento(documentoToUpdate);
		
		Beneficiario beneficiarioDTO = new Beneficiario();
		BeanUtils.copyProperties(beneficiario, beneficiarioDTO);
		beneficiarioDTO.setId(beneficiarioToUpdate.get().getId());
		return ResponseEntity.status(HttpStatus.OK).body(this.beneficiarioRepository.save(beneficiarioDTO));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable(value="id")Long id)
	{

		Optional<Beneficiario> beneficiarioUpdated = this.beneficiarioRepository.findById(id);
		if(!beneficiarioUpdated.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beneficiário não encontrado!");
		}
		Beneficiario beneficiarioDTO = new Beneficiario();
		BeanUtils.copyProperties(beneficiarioUpdated.get(), beneficiarioDTO);
		this.beneficiarioRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body(beneficiarioDTO);
	}
}
