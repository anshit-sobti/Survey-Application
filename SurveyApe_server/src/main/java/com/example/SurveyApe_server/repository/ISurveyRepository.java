package com.example.SurveyApe_server.repository;

import java.util.ArrayList;

import com.example.SurveyApe_server.model.ISurvey;
import com.example.SurveyApe_server.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.SurveyApe_server.model.Survey;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ISurveyRepository extends JpaRepository<ISurvey, Long> {
        public ISurvey findByName(String name);
        public ArrayList<ISurvey> findAllByEmail(String email);
        @Query("SELECT count(name) FROM ISurvey  t where t.name = :name")
        public int getCount(@Param("name") String name);

        public void removeByName(String name);
}