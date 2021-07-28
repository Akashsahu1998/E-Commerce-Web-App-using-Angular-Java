package com.akash.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.akash.ecommerce.entity.State;

@CrossOrigin("*")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

	List<State> findByCountryCode(@Param("code") String code);
}
