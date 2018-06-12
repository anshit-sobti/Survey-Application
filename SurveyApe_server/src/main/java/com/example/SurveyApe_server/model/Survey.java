package com.example.SurveyApe_server.model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.example.SurveyApe_server.*;

@Entity // This tells Hibernate to make a table out of this class
public class Survey {

    String users;
    String publish;
    String end;
    String email;
    String type;
    @Id
    String name;
    String unpublish;

    public String getUnpublish() {
        return unpublish;
    }

    public void setUnpublish(String unpublish) {
        this.unpublish = unpublish;
    }

    public String getUsers() {
        return users;
    }

    public void setUsers(String users) {
        this.users = users;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}