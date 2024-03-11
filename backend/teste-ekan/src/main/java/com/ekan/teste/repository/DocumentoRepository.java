package com.ekan.teste.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ekan.teste.entity.Documento;

@Repository
public interface DocumentoRepository extends CrudRepository<Documento,Long> {


    Optional<Documento> findByDescricao(String descricao);
}