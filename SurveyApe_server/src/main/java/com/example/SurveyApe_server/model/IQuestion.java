package com.example.SurveyApe_server.model;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.SurveyApe_server.*;
@Entity
public class IQuestion {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    String sname;


    String qtype;


    String description;


    String options;



    public IQuestion () {}



    public Integer getId() {
        return id;
    }



    public void setId(Integer id) {
        this.id = id;
    }



    public String getSname() {
        return sname;
    }



    public void setSname(String sname) {
        this.sname = sname;
    }



    public String getQtype() {
        return qtype;
    }



    public void setQtype(String qtype) {
        this.qtype = qtype;
    }



    public String getDescription() {
        return description;
    }



    public void setDescription(String description) {
        this.description = description;
    }



    public String getOptions() {
        return options;
    }



    public void setOptions(String options) {
        this.options = options;
    }


}
