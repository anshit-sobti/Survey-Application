package com.example.SurveyApe_server.repository;

import com.example.SurveyApe_server.model.IQuestion;
import com.example.SurveyApe_server.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;


import com.example.SurveyApe_server.model.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface IQuestionRepository extends JpaRepository<IQuestion, Long> {

    public ArrayList<IQuestion> findAllBySname(String sname);
    @Query("SELECT count(name) FROM IQuestion  t where t.sname = :name")
    public int getCount(@Param("name") String name);

    public void removeAllBySname(String name);
}