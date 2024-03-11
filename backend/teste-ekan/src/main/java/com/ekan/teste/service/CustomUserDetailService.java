package com.ekan.teste.service;

import org.apache.logging.log4j.util.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ekan.teste.entity.User;
import com.ekan.teste.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

@Autowired
private UserRepository userRepository;

public CustomUserDetailService(UserRepository repository) {
	    this.userRepository = repository;
	}

@Override
public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Supplier<UsernameNotFoundException> s =
            () -> new UsernameNotFoundException("Problem during authentication!");

    User u = this.userRepository.findByEmail(email).orElseThrow();

    return u;
   }
}
