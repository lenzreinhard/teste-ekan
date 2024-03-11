package com.ekan.teste.controller;

import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ekan.teste.entity.Documento;
import com.ekan.teste.repository.DocumentoRepository;

import com.ekan.teste.service.StorageFile;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.Explode;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.enums.ParameterStyle;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/documento")
@CrossOrigin
@Tag(name="open-api")
@SecurityRequirement(
        name = "bearerAuth"
)
public class DocumentoController {
	
	@Autowired
	private StorageFile service; 
	
	private final DocumentoRepository documentoRepository;
	DocumentoController(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }
	
	@GetMapping
	public Iterable<Documento> listar(
			@RequestParam int download){
		Iterable<Documento> docs = this.documentoRepository.findAll();
		if(download==1) {
			docs.forEach(doc->{
				doc.setDocumento(service.downloadFile(doc.getDescricao()));
			});
		}
		return docs;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> listarbyId(@PathVariable(value="id")Long id,@RequestParam int download) {
		Optional<Documento> doc = this.documentoRepository.findById(id);
		if(!doc.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado!");
		}
		if(download==1)
		{
			doc.get().setDocumento(service.downloadFile(doc.get().getDescricao()));			
		}
	
		return ResponseEntity.status(HttpStatus.OK).body(doc);
	}
	
	@PostMapping(consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseStatus(HttpStatus.CREATED)
	
	public ResponseEntity<Object> adicionar(@RequestParam("Documento")MultipartFile doc) throws IOException
	{
		
		byte[] doc2 = service.downloadFile(doc.getOriginalFilename());
		if(doc2 != null)
		{
			return ResponseEntity.status(HttpStatus.FOUND).body("Documento já encontrado!\nTente enviar com outro nome!");
		}
		else {
			Documento documento = service.uploadFile(doc);
			if (documento!= null)
			{
				return ResponseEntity.status(HttpStatus.OK).body(this.documentoRepository.save(documento));
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado!");
		}
	}
	
	@PutMapping(path="/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> atualizar(@PathVariable(value="id")Long id,@RequestParam("Documento")MultipartFile doc) throws IOException
	{
		byte[] doc2 = service.downloadFile(doc.getOriginalFilename());
		if(doc2 != null)
		{
			return ResponseEntity.status(HttpStatus.FOUND).body("Documento já encontrado!\nTente enviar com outro nome!");
		}
		else {
			Documento documento = service.uploadFile(doc);
			if (documento!=null)
			{
				Optional<Documento> documentoToUpdate = this.documentoRepository.findById(id);
				if(!documentoToUpdate.isPresent())
				{
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado!");
				}
				documento.setDataInclusao(documentoToUpdate.get().getDataInclusao());
				Documento documentoDTO = new Documento();
				BeanUtils.copyProperties(documento, documentoDTO);
				documentoDTO.setId(documentoToUpdate.get().getId());
				return ResponseEntity.status(HttpStatus.OK).body(this.documentoRepository.save(documentoDTO));
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado!");
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable(value="id")Long id)
	{

		Optional<Documento> documentoUpdated = this.documentoRepository.findById(id);
		if(!documentoUpdated.isPresent())
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Documento não encontrado!");
		}
		Documento documentoDTO = new Documento();
		BeanUtils.copyProperties(documentoUpdated.get(), documentoDTO);
		this.documentoRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body(documentoDTO);
	}
}
