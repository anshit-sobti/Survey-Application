package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.*;
import com.example.SurveyApe_server.repository.IQuestionRepository;
import com.example.SurveyApe_server.repository.IResponseRepository;
import com.example.SurveyApe_server.repository.ISurveyRepository;
import com.example.SurveyApe_server.repository.QuestionRepository;
import com.example.SurveyApe_server.repository.ResponseRepository;
import com.example.SurveyApe_server.repository.SurveyRepository;
import com.example.SurveyApe_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/surveys")
public class ISurveyResource {

    @Autowired
    SurveyRepository sr;
    @Autowired
    QuestionRepository qr;
    @Autowired
    ResponseRepository rr;
    @Autowired
    UserRepository ur;
    @Autowired
    ISurveyRepository isr;
    @Autowired
    IQuestionRepository iqr;
    @Autowired
    IResponseRepository irr;



    @PostMapping(value="/saveSurvey")
    public @ResponseBody ResponseEntity<?> addSurvey (@RequestBody final IComplete obj) {

        isr.save(obj.getSurvey());
        iqr.saveAll(obj.getQuestions());
        
        ServiceResponse r = new ServiceResponse();
        r.setMessage("success");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }


    @PostMapping(value="/addIResponse")
    public @ResponseBody ResponseEntity<?> addResponse (@RequestBody ICompleteResponse obj) {

        System.out.println("hit it");

        irr.saveAll(obj.getResponses());

        ServiceResponse r = new ServiceResponse();
        r.setMessage("Survey saved Successfully!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    @PostMapping(value="/getISurvey")
    public ArrayList<IQuestion> getSurvey (@RequestBody final ISurvey obj) {
        System.out.println("i am here"+ obj.getName());

        return iqr.findAllBySname(obj.getName());
    }


    @PostMapping(value = "/getSaved")
    public ArrayList<String> getSurveys(@RequestBody final User email){
       // System.out.println(sr.findAllByEmail(email));
        //return (sr.findAllByEmail(email)).getSname();
        System.out.println(email);
        ArrayList<ISurvey> obj =  isr.findAllByEmail(email.getEmail());
        System.out.println(obj);
        ArrayList<String> out = new ArrayList<String> ();
        int i=0;
        for(ISurvey x : obj) {
            out.add(i,x.getName());
            i++;
        }
        System.out.println(out);
        return out;
    }


}




