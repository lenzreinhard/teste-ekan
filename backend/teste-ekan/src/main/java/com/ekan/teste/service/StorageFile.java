package com.ekan.teste.service;
import java.util.Date;
import java.util.Optional;
import java.io.IOException;
import com.ekan.teste.entity.Documento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ekan.teste.repository.DocumentoRepository;

import utils.FileUtils;

@Service
public class StorageFile {

	@Autowired
	private DocumentoRepository repository;
	
	public Documento uploadFile(MultipartFile file) throws IOException{
		Documento doc = Documento.builder().descricao(file.getOriginalFilename()).dataInclusao(new Date()).dataAtualizacao(new Date()).tipoDocumento(file.getContentType()).Documento(FileUtils.compressFile(file.getBytes())).build();
		return doc;

	}
	
	public byte[] downloadFile(String filename) 
	{
		try {
			Optional<Documento> doc = repository.findByDescricao(filename);
			byte[] files = FileUtils.decompressFile(doc.get().getDocumento());
			return files;
		}
		catch(Exception error)
		{
			return null;
		}
	}
}
