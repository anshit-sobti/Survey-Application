package com.example.SurveyApe_server.repository;

import java.util.ArrayList;

import com.example.SurveyApe_server.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.SurveyApe_server.model.Survey;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface SurveyRepository extends JpaRepository<Survey, Long> {
        public Survey findByName(String name);
        public ArrayList<Survey> findAllByEmail(String email);
        @Query("SELECT name FROM Survey t where t.users like concat('%',:email,'%') and t.type = 'General'")
        public ArrayList<String> getGeneral(@Param("email") String email);
        @Query(value = "SELECT name FROM Survey t where t.users like concat('%',:email,'%') and t.type = 'Open'")
        public ArrayList<String> getOpen(@Param("email") String email);
        public void deleteByName(String name);
}