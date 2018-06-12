package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.User;

import java.util.*;

import com.example.SurveyApe_server.model.ServiceResponse;
import com.example.SurveyApe_server.repository.UserRepository;
//import com.oracle.javafx.jmx.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import javax.mail.*;
import javax.mail.PasswordAuthentication;
import javax.mail.internet.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/users")
public class UserResource {

    @Autowired
    UserRepository userRepository;


    @GetMapping(value = "/all")
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PostMapping(value = "/verify")
    public ResponseEntity <ServiceResponse> verify(@RequestBody final User user){

        System.out.println("**************");
        System.out.println(user.getEmail());
        System.out.println(user.getVerified());
        ServiceResponse r=new ServiceResponse();
        User u = userRepository.findByEmail(user.getEmail());
        if(user.getVerified().equals(u.getVerified())) {
            r.setMessage("true");
            u.setVerified("0");
            userRepository.save(u);
            sendConfirmation (u.getEmail());
        }
        else
            r.setMessage("false");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity <ServiceResponse> login(@RequestBody final User user) {

        System.out.println("login called");
        System.out.println(user.getPwd());
        System.out.println(user.getEmail());
        String email = user.getEmail();
        User u = userRepository.findByEmail(user.getEmail());

        if(u == null){
            System.out.println("User does not exist!!");
            ServiceResponse r=new ServiceResponse();
            r.setMessage("User does not exist!!");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else{
            if(!user.getPwd().equals(u.getPwd())){
                System.out.println("Incorrect Password!!");
                ServiceResponse r=new ServiceResponse();
                r.setMessage("Incorrect Password!!");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if(!u.getVerified().equals("0")){
                System.out.println("Verify first!!");
                ServiceResponse r=new ServiceResponse();
                r.setMessage("Verify first!!");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else{
                System.out.println("logged In!!");
                ServiceResponse r=new ServiceResponse();
                r.setMessage("logged in");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }


//            System.out.println("Logged In");
//            ServiceResponse r=new ServiceResponse();
//            r.setMessage("logged in");
//            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);

    }


        /*

        if(u == null){
            System.out.println("User does not exist!!");
            ServiceResponse r=new ServiceResponse();
            r.setMessage("User does not exist!!");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);}
        else{
            if(u.getPwd()!=user.getPwd()) {
                ServiceResponse r = new ServiceResponse();
                r.setMessage("Wrong password");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.INTERNAL_SERVER_ERROR);}
            else if(u.getVerified()==0) {
                System.out.println("Logged In");
                ServiceResponse r = new ServiceResponse();
                r.setMessage("logged in");
                return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK); }

                else {
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("Verify First");
                    return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
                }

            }
*/
















    @PostMapping(value = "/register")
    public ResponseEntity <ServiceResponse> registerUser(@RequestBody User user) {
        System.out.println("register called");

        System.out.println(user.getFirstname());
        System.out.println(user.getLastname());
        System.out.println(user.getPwd());
        System.out.println(user.getEmail());
        System.out.println("I m here"+userRepository.findByEmail(user.getEmail()));
        if (userRepository.findByEmail(user.getEmail())!=null)
        {
            System.out.println("check");
            ServiceResponse r = new ServiceResponse();
            r.setMessage("User already exists!! Please login.");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        Random rand = new Random();


        User u = new User();
        u.setEmail(user.getEmail());
        u.setVerified(1000+rand.nextInt(8999)+"");
        u.setFirstname(user.getFirstname());
        u.setLastname(user.getLastname());
        u.setPwd(user.getPwd());


        userRepository.save(u);
        ServiceResponse r = new ServiceResponse();
        r.setMessage("User Registered!!");

        sendEmail(user.getEmail(),u.getVerified());
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    public static void sendEmail(String uname,String code) {
        final String username = "surveyape07@gmail.com";
        final String password = "SurveyApe";
        //properties
        Properties pro = new Properties();
        pro.put("mail.smtp.auth", "true");
        pro.put("mail.smtp.starttls.enable", "true");
        pro.put("mail.smtp.host", "smtp.gmail.com");
        pro.put("mail.smtp.port", "587");

        Session session = Session.getInstance(pro,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            //send
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("surveyape07@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, //use uname
                    InternetAddress.parse(uname));
            //compose
            message.setSubject("Successfully Registered");
            message.setText(
                    "Visit http://localhost:3000 for verifying your email address" +
                            "Enter code : "+code);
            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }




    public static void sendConfirmation(String uname) {
        final String username = "surveyape07@gmail.com";
        final String password = "SurveyApe";
        //properties
        Properties pro = new Properties();
        pro.put("mail.smtp.auth", "true");
        pro.put("mail.smtp.starttls.enable", "true");
        pro.put("mail.smtp.host", "smtp.gmail.com");
        pro.put("mail.smtp.port", "587");

        Session session = Session.getInstance(pro,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            //send
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("surveyape07@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, //use uname
                    InternetAddress.parse(uname));
            //compose
            message.setSubject("Successfully Verified");
            message.setText( "Welcome to SurveyApe." +
                    "For login enter : localhost:3000 ");  ///verify/"+uanme
            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


}