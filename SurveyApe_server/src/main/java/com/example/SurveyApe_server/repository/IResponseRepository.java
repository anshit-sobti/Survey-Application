package com.example.SurveyApe_server.repository;


        import java.util.ArrayList;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param; 
import org.springframework.data.repository.CrudRepository;

import com.example.SurveyApe_server.model.IResponse;
import com.example.SurveyApe_server.model.Response;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface IResponseRepository extends JpaRepository<IResponse, Long> {
     
	

	public ArrayList<IResponse> getAllBySname(String name);

	
	public ArrayList<IResponse> getAllByQdescription(String description);

	
}

