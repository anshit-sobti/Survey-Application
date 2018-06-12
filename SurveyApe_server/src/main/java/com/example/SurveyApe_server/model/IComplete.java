package com.example.SurveyApe_server.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.example.SurveyApe_server.*;


public class IComplete {

    ISurvey survey;
    ArrayList<IQuestion> questions;
    public ISurvey getSurvey() {
        return survey;
    }
    public void setSurvey(ISurvey survey) {
        this.survey = survey;
    }
    public ArrayList<IQuestion> getQuestions() {
        return questions;
    }
    public void setQuestions(ArrayList<IQuestion> questions) {
        this.questions = questions;
    }





}