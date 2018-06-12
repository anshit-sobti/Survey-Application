package com.example.SurveyApe_server.model;


import java.util.ArrayList;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.SurveyApe_server.*;

public class ResponseStats {

	String sname;
	ArrayList<Question> questions;
	public ArrayList<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(ArrayList<Question> questions) {
		this.questions = questions;
	}
	public ResponseStats () {}

	String publish;
	String end;
	int no_of_submission;
	float participation_rate;

	ArrayList<Answers> Answers;

	public int getNo_of_submission() {
		return no_of_submission;
	}
	public void setNo_of_submission(int no_of_submission) {
		this.no_of_submission = no_of_submission;
	}
	public float getParticipation_rate() {
		return participation_rate;
	}

	public void setParticipation_rate(float part_rate) {
		this.participation_rate = part_rate;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getPublish() {
		return publish;
	}
	public void setPublish(String publish) {
		this.publish = publish;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public ArrayList<Answers> getAnswers() {
		return Answers;
	}
	public void setAnswers(ArrayList<Answers> answers) {
		Answers = answers;
	}








}
