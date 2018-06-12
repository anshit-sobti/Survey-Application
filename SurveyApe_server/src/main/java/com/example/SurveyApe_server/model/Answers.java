package com.example.SurveyApe_server.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.example.SurveyApe_server.*;


public class Answers {

	Question question;
	HashMap<String,Integer> responsestats;

	public Question getQuestion() {
		return question;
	}
	public void setQuestion(Question question) {
		this.question = question;
	}
	public HashMap<String, Integer> getMap() {
		return responsestats;
	}
	public void setMap(HashMap<String, Integer> map) {
		this.responsestats = map;
	}




}