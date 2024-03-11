package com.ekan.teste.controller;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.ekan.teste.service.StorageFile;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/beneficiario")
@CrossOrigin
@Tag(name="open-api")
@SecurityRequirement(
        name = "bearerAuth"
)
public class BeneficiarioController {
	@Autowired
	private StorageFile service;
	
	private final BeneficiarioRepository beneficiarioRepository;
	private final DocumentoRepository documentoRepository;
	BeneficiarioController(BeneficiarioRepository beneficiarioRepository,DocumentoRepository documentoRepository) {
        this.beneficiarioRepository = beneficiarioRepository;
        this.documentoRepository = documentoRepository;
    }
	
	@GetMapping
	public Iterable<Beneficiario> listar() {
		Iterable<Beneficiario> benes = this.beneficiarioRepository.findAll();
		benes.forEach(ben->{
			ben.getDocumento().forEach(doc->{
				doc.setDocumento(service.downloadFile(doc.getDescricao()));
			});
		});
		return benes;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> listaPorId(@PathVariable(value="id")Long id) {
		Optional<Beneficiario> beneficiario = this.beneficiarioRepository.findById(id);
		if(!beneficiario.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beneficiário não encontrado!");
		}
		beneficiario.get().getDocumento().forEach(doc->{
			doc.setDocumento(service.downloadFile(doc.getDescricao()));
		});
		
		return ResponseEntity.status(HttpStatus.OK).body(beneficiario);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Beneficiario adicionar(@RequestBody Beneficiario beneficiario)
	{
		beneficiario.setDataInclusao(new Date());
		beneficiario.setDataAtualizacao(new Date());
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
		
		List<Documento> docs = new ArrayList<Documento>();
		boolean breaking = false;
		for(int i = 0; i<beneficiario.getDocumento().size();i++)
		{
			Documento doc = beneficiario.getDocumento().get(i);
			for (int j = 0; j < beneficiarioToUpdate.get().getDocumento().size();j++)
			{
				Documento doc2 = beneficiarioToUpdate.get().getDocumento().get(j);
				if(doc2.equals(doc))
				{
					doc2.setDataAtualizacao(new Date());
					doc2.setDescricao(beneficiarioToUpdate.get().getDocumento().get(j).getDescricao());
					doc2.setDataInclusao(beneficiarioToUpdate.get().getDocumento().get(j).getDataInclusao());
					doc2.setDocumento(beneficiarioToUpdate.get().getDocumento().get(j).getDocumento());
					doc2.setTipoDocumento(beneficiarioToUpdate.get().getDocumento().get(j).getTipoDocumento());
					docs.add(doc2);
					breaking = true;
					break;
				}
				else {
					breaking = false;
				}
			}
			if(!breaking)
			{
				Optional<Documento> d = this.documentoRepository.findById(doc.getId());
				doc.setDataAtualizacao(new Date());
				doc.setDescricao(d.get().getDescricao());
				doc.setDataInclusao(d.get().getDataInclusao());
				doc.setDocumento(d.get().getDocumento());
				doc.setTipoDocumento(d.get().getTipoDocumento());
				docs.add(doc);
			}
			
		}
		beneficiario.setDocumento(docs);
		beneficiario.setDataInclusao(beneficiarioToUpdate.get().getDataInclusao());
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
		this.beneficiarioRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Beneficiário Excluído com sucesso!");
	}
}
