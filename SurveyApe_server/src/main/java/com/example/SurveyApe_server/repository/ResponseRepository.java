package com.example.SurveyApe_server.repository;


import java.util.ArrayList;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

import com.example.SurveyApe_server.model.Response;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ResponseRepository extends JpaRepository<Response, Long> {

    @Query("SELECT count(distinct email) FROM Response t where t.sname = :survey ")
    public String findSubmission(@Param("survey") String survey);

    public ArrayList<Response> getAllBySname(String name);

    @Query("select options,count(options) from Response t where t.qdescription = :desc  group by t.qdescription,t.options")
    public ArrayList<Response> getAnswers(@Param("desc") String desc);

    public ArrayList<Response> getAllByQdescription(String description);

    public void deleteAllBySname(String name);
    @Query("select count(id) from Response t where t.sname = :survey")
    public int countResponse(@Param("survey") String survey);


}