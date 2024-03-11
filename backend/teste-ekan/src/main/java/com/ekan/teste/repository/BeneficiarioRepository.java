package com.ekan.teste.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ekan.teste.entity.Beneficiario;

@Repository
public interface BeneficiarioRepository extends CrudRepository<Beneficiario, Long>{
}
