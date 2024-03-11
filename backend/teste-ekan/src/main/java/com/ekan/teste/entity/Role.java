package com.ekan.teste.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ekan.teste.entity.Permission.ADMIN_READ;
import static com.ekan.teste.entity.Permission.ADMIN_DELETE;
import static com.ekan.teste.entity.Permission.ADMIN_CREATE;
import static com.ekan.teste.entity.Permission.ADMIN_UPDATE;

import static com.ekan.teste.entity.Permission.MANAGER_READ;
import static com.ekan.teste.entity.Permission.MANAGER_UPDATE;
import static com.ekan.teste.entity.Permission.MANAGER_DELETE;
import static com.ekan.teste.entity.Permission.MANAGER_CREATE;

@RequiredArgsConstructor
public enum Role {

  USER(Collections.emptySet()),
  ADMIN(
          Set.of(
                  ADMIN_READ,
                  ADMIN_UPDATE,
                  ADMIN_DELETE,
                  ADMIN_CREATE,
                  MANAGER_READ,
                  MANAGER_UPDATE,
                  MANAGER_DELETE,
                  MANAGER_CREATE
          )
  ),
  MANAGER(
          Set.of(
                  MANAGER_READ,
                  MANAGER_UPDATE,
                  MANAGER_DELETE,
                  MANAGER_CREATE
          )
  )

  ;

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}