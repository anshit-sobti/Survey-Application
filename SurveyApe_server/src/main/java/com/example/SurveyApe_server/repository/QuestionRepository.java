package com.example.SurveyApe_server.repository;

import com.example.SurveyApe_server.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


import com.example.SurveyApe_server.model.Question;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface QuestionRepository extends JpaRepository<Question, Long> {

    public ArrayList<Question> findAllBySname(String sname);



    public void deleteAllBySname(String name);

}