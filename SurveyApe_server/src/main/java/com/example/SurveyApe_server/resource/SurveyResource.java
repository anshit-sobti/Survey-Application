package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.*;
import com.example.SurveyApe_server.repository.QuestionRepository;
import com.example.SurveyApe_server.repository.ResponseRepository;
import com.example.SurveyApe_server.repository.SurveyRepository;
import com.example.SurveyApe_server.repository.UserRepository;
import com.example.SurveyApe_server.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Random;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;

//import com.google.zxing.BarcodeFormat;
//import com.google.zxing.BinaryBitmap;
//import com.google.zxing.EncodeHintType;
//import com.google.zxing.MultiFormatReader;
//import com.google.zxing.MultiFormatWriter;
//import com.google.zxing.NotFoundException;
//import com.google.zxing.Result;
//import com.google.zxing.WriterException;
//import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
//import com.google.zxing.client.j2se.MatrixToImageWriter;
//import com.google.zxing.common.BitMatrix;
//import com.google.zxing.common.HybridBinarizer;
//import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/surveys")
public class SurveyResource {

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



    @PostMapping(value="/addSurvey")
    public @ResponseBody ResponseEntity<?> addSurvey (@RequestBody final Complete obj) throws Exception{
        sr.save(obj.getSurvey());
        qr.saveAll(obj.getQuestions());
        String link;
        String rusers = obj.getSurvey().getUsers();
        String[] ru = rusers.split(";");
        if(obj.getSurvey().getType().equals("General")) {
            //send email to all users same link

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName();
                sendEmail(link,ru[i]);

            }

            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        else if (obj.getSurvey().getType().equals("Closed")) {
            //send email to all users with unique link3000

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i]; //change user
                sendEmail(link,ru[i]);
            }

            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }

        else if (obj.getSurvey().getType().equals("Open")){
            //ccheck if user is there then follow 1
            //else follow2

            for (int i=0;i<ru.length;i++){
                User x = ur.findByEmail(ru[i]);
                if(x!=null){
                    link =  "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName();
                    sendEmail(link,ru[i]);
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("success");
                                  }
                else {
                    link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i];
                    sendEmail(link,ru[i]);


                }
            }
            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);


        }

        ServiceResponse r = new ServiceResponse();
        r.setMessage("x");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }


@Transactional
    @PostMapping(value="/addSurvey1")
    public @ResponseBody ResponseEntity<?> addSurvey1 (@RequestBody final Complete obj) throws Exception{

        sr.save(obj.getSurvey());
        qr.saveAll(obj.getQuestions());
        isr.removeByName(obj.getSurvey().getName());
        String link;
        String rusers = obj.getSurvey().getUsers();
        String[] ru = rusers.split(";");
        if(obj.getSurvey().getType().equals("General")) {
            //send email to all users same link

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName();
                sendEmail(link,ru[i]);

            }

            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        else if (obj.getSurvey().getType().equals("Closed")) {
            //send email to all users with unique link3000

            for(int i=0;i<ru.length;i++) {
                link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i]; //change user
                sendEmail(link,ru[i]);
            }

            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }

        else if (obj.getSurvey().getType().equals("Open")){
            //ccheck if user is there then follow 1
            //else follow2

            for (int i=0;i<ru.length;i++){
                User x = ur.findByEmail(ru[i]);
                if(x!=null){
                    link =  "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName();
                    sendEmail(link,ru[i]);
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("success");
                }
                else {
                    link = "http://localhost:3000/takesurvey?sname=" + obj.getSurvey().getName() + "&uname="+ru[i];
                    sendEmail(link,ru[i]);


                }
            }
            ServiceResponse r = new ServiceResponse();
            r.setMessage("success");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);


        }

        ServiceResponse r = new ServiceResponse();
        r.setMessage("x");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    public static void sendEmail(String link,String uname) {
        link = link.replaceAll("\\s","+");
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
            message.setSubject("Invited to take a survey");
            message.setText("Take survey using this link : "
                    + link);  ///verify/"+uanme

            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {

        }
    }

//    public static void sendEmail(String qrCodedata,String uname) throws  Exception {
//        //String qrCodedata = "localhost:8080/test_string";
//        String filePath = "/1new_test2.png";
//        String charset = "UTF-8"; // or "ISO-8859-1"
//        Map  hintMap = new HashMap ();
//
//        BitMatrix matrix = new MultiFormatWriter().encode(
//
//                new String(qrCodedata.getBytes(charset), charset),
//
//                BarcodeFormat.QR_CODE, 200, 200, hintMap);
//
//        MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
//                .lastIndexOf('.') + 1), new File(filePath));
//
//        try {
//
//            final String from = "kamesh17dx@gmail.com";
//            final String password = "Kameshks1719@";
//
//            //  String toAddress = "kameshgangwani@gmail.com";
//
//            String name = "This is the QR code survey verification";
//
//            Session session;
//
//            Message mesg;
//
//            Properties properties = new Properties();
//            properties.put("mail.smtp.host", "smtp.gmail.com");
//            properties.put("mail.smtp.port", "587");
//            properties.put("mail.smtp.auth", "true");
//            properties.put("mail.smtp.starttls.enable", "true");
//
//            Authenticator auth = new Authenticator() {
//                public PasswordAuthentication getPasswordAuthentication() {
//                    return new PasswordAuthentication(from, password);
//                }
//            };
//
//            session = Session.getInstance(properties, auth);
//            session.setDebug(true);
//
//            mesg = new MimeMessage(session);
//
//            mesg.setFrom(new InternetAddress(from));
//
//            InternetAddress toAdd = new InternetAddress(uname);
//
//            mesg.addRecipient(Message.RecipientType.TO, toAdd);
//
//
//            mesg.setSubject(" 1test2 QR code for Survey Verification");
//
//            Multipart mp = new MimeMultipart("related");
//
//            String cid = "qr";
//
//            MimeBodyPart pixPart = new MimeBodyPart();
//            pixPart.attachFile("/1new_test2.png");
//            pixPart.setContentID("<" + cid + ">");
//            pixPart.setDisposition(MimeBodyPart.INLINE);
//
//            MimeBodyPart textPart = new MimeBodyPart();
//            textPart.setText("<html>" + "Hello " + name + ", <br> "
//                    + "Please find your visiting QR code <br> "
//                    + "<div><img src=\"cid:" + cid
//                    + "\" /></div></html>"
//                    + "</html>", "US-ASCII", "html");
//
//            mp.addBodyPart(textPart);
//            mp.addBodyPart(pixPart);
//
//            mesg.setContent(mp);
//
//            Transport.send(mesg);
//
//        } catch (MessagingException e) {
//            System.err.println(e);
//            e.printStackTrace(System.err);
//        } catch (IOException e) {
//            System.err.println(e);
//            e.printStackTrace();
//        }
//    }




    @PostMapping(value="/addResponse")
    public @ResponseBody ResponseEntity<?> addResponse (@RequestBody CompleteResponse obj) {

        System.out.println("hit it");
        User x = obj.getUser();
        Survey m = sr.findByName(obj.getResponses().get(0).getSname());
        if (m.getUsers().contains(x.getEmail())) {
            m.setUsers(m.getUsers().replace(x.getEmail(), "*"));
        }
        sendResponse(x.getEmail());
        rr.saveAll(obj.getResponses());

        ServiceResponse r = new ServiceResponse();
        r.setMessage("Survey Submitted Successfully!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }


    private void sendResponse(String uname) {
        // TODO Auto-generated method stub
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
            message.setSubject("Survey Submitted");
            message.setText("Survey Response stored successfully");  ///verify/"+uanme

            Transport.send(message);
            System.out.println("Done");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

    @PostMapping(value="/getSurvey")
    public ArrayList<Question> getSurvey (@RequestBody final Question obj)  {
        System.out.println("i am here"+ obj.getSname());
//        Survey a = sr.findByName(obj.getName());
//        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
//        Date date = new Date();
//        Date publishDate = dateFormat.parse(a.getPublish());
//        Date endDate = dateFormat.parse(a.getEnd());
//        if(date.compareTo(publishDate)>0 & date.compareTo(endDate)<0)
       // if(!sr.findByName(obj.getSname()).getUnpublish().equals("True"))
            return qr.findAllBySname(obj.getSname());
        //ArrayList<Question> n = null;
        //return n;
//        else
//         return null;
    }




    @PostMapping(value="/getUniqueSurvey")
    public ArrayList<Question> getUniqueSurvey (@RequestBody final CompleteSurvey obj) throws ParseException {

        System.out.println("******************************");
        String  x = obj.getSurvey().getName();
        System.out.println(x);
        System.out.println(obj.getUser().getEmail());
        Survey survey = sr.findByName(x);
        System.out.println("******************************");
        //if(!survey.getUnpublish().equals("True")) {

            String y = obj.getUser().getEmail();
//        Survey a = sr.findByName(obj.getSurvey().getName());
//        Date date = new Date();
//        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
//        Date publishDate = dateFormat.parse(a.getPublish());
//        Date endDate = dateFormat.parse(a.getEnd());
//        if(date.compareTo(publishDate)>0 & date.compareTo(endDate)<0) {
            System.out.println(y);
            if (survey.getUsers().contains(y)){
                survey.setUsers(survey.getUsers().replace(y,"*"));
                sr.save(survey);

                return qr.findAllBySname(survey.getName());
            }
       // }// }}
        return new ArrayList<Question>();
    }

    @PostMapping(value = "/getPublished")
    public ArrayList<String> getSurveys(@RequestBody final User email){
        System.out.println(email);
        ArrayList<Survey> obj =  sr.findAllByEmail(email.getEmail());
        System.out.println(obj);
        ArrayList<String> out = new ArrayList<String> ();
        int i=0;
        for(Survey x : obj) {
            out.add(i,x.getName());
            i++;
        }
        System.out.println(out);
        return out;
    }

    @PostMapping(value = "/getGeneral")
    public ArrayList<String> getGeneral(@RequestBody final User email){
        System.out.println(email);
        ArrayList<String> obj =  sr.getGeneral(email.getEmail());
        return obj;
//        System.out.println(obj);
//        ArrayList<String> out = new ArrayList<String> ();
//        int i=0;
//        for(Survey x : obj) {
//            out.add(i,x.getName());
//            i++;
//        }
//        System.out.println(out);
//        return out;
    }

    @PostMapping(value = "/getOpen")
    public ArrayList<String> getOpen(@RequestBody final User email){
        System.out.println("******************check");
        System.out.println(email.getEmail());
        ArrayList<String> obj =  sr.getOpen(email.getEmail());
        System.out.println(obj.get(0));
        return obj;
        /*
        System.out.println(obj);
        System.out.println(obj.size());
        ArrayList<String> out = new ArrayList<String> ();
        int i=0;
        for(Survey x : obj) {
            out.add(i,x.getName());
            i++;
        }
        System.out.println(out);
        return out;
        */
    }



    @PostMapping(value = "/deleteSurvey")
    public @ResponseBody ResponseEntity<?> deleteSurvey (@RequestBody final Survey obj){
        System.out.println(obj.getName());
        if (rr.countResponse(obj.getName())>0) {
            ServiceResponse r = new ServiceResponse();
            r.setMessage("Survey has responses cannot unpublish!!");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        Survey a = sr.findByName(obj.getName());
        a.setUnpublish("true");
        sr.save(a);
        ServiceResponse r = new ServiceResponse();
        r.setMessage("Survey is unpublished!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }


    @PostMapping(value="/takeSurvey")
    public ArrayList<Question> takeSurvey (@RequestBody final Survey obj) throws ParseException {
        System.out.println("i am here"+ obj.getName());
        Survey a = sr.findByName(obj.getName());
        if(!a.getUnpublish().equals("True")) {
            DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            Date date = new Date();
            Date publishDate = dateFormat.parse(a.getPublish());
            Date endDate = dateFormat.parse(a.getEnd());
            if(date.compareTo(publishDate)>0 & date.compareTo(endDate)<0)
                return qr.findAllBySname(obj.getName());


        }
        return null;

    }

    @PostMapping(value="/takeUniqueSurvey")
    public ArrayList<Question> takeUniqueSurvey (@RequestBody final CompleteSurvey obj) throws ParseException {

        System.out.println("******************************");
        String  x = obj.getSurvey().getName();
        System.out.println(x);
        Survey survey = sr.findByName(x);

        if(!survey.getUnpublish().equals("True")) {
            String y = obj.getUser().getEmail();
            Survey a = sr.findByName(obj.getSurvey().getName());
            Date date = new Date();
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date publishDate = dateFormat.parse(a.getPublish());
            Date endDate = dateFormat.parse(a.getEnd());
            if(date.compareTo(publishDate)>0 & date.compareTo(endDate)<0) {
                System.out.println(y);
                if (survey.getUsers().contains(y)){
                    survey.setUsers(survey.getUsers().replace(y,"*"));
                    sr.save(survey);

                    return qr.findAllBySname(survey.getName());
                } }
        }
        return null;
    }

    @PostMapping(value="/editInvite")
    public @ResponseBody ResponseEntity<?> editInvite (@RequestBody Survey obj)  throws Exception{
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        Survey a = sr.findByName(obj.getName());
       // Date publishDate = dateFormat.parse(a.getPublish());
        Date endDate = dateFormat.parse(a.getEnd());
        if( date.compareTo(endDate)<0) {
            System.out.println("hit it");
            Survey survey = sr.findByName(obj.getName());
            String invites = survey.getUsers();
            invites = invites + ";" + obj.getUsers();
            survey.setUsers(invites);
            sr.save(survey);


            addemail(obj);


            ServiceResponse r = new ServiceResponse();
            r.setMessage("Invitees added Successfully!!");
            return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
        }
        ServiceResponse r = new ServiceResponse();
        r.setMessage("Extend end date of survey to add more people!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }

    private void addemail(Survey x) throws Exception{
        Survey obj = sr.findByName(x.getName());
        String rusers = x.getUsers();
        String[] ru = rusers.split(";");
        if (obj.getType().equals("General")) {
            //send email to all users same link

            for (int i = 0; i < ru.length; i++) {
                String link = "http://localhost:3000/takesurvey?sname=" + obj.getName();
                sendEmail(link, ru[i]);

            }


        } else if (obj.getType().equals("Closed")) {
            //send email to all users with unique link3000

            for (int i = 0; i < ru.length; i++) {
                String link = "http://localhost:3000/takesurvey?sname=" + obj.getName() + "&uname=" + ru[i]; //change user
                sendEmail(link, ru[i]);
            }

        } else if (obj.getType().equals("Open")) {
            //ccheck if user is there then follow 1
            //else follow2

            for (int i = 0; i < ru.length; i++) {
                User t = ur.findByEmail(ru[i]);
                if (t != null) {
                    String link = "http://localhost:3000/takesurvey?sname=" + obj.getName();
                    sendEmail(link, ru[i]);
                    ServiceResponse r = new ServiceResponse();
                    r.setMessage("success");
                } else {
                    String link = "http://localhost:3000/takesurvey?sname=" + obj.getName() + "&uname=" + ru[i];
                    sendEmail(link, ru[i]);


                }
            }
        }
    }




    @PostMapping(value="/editEnd")
    public @ResponseBody ResponseEntity<?> editEnd (@RequestBody Survey obj) {

        System.out.println("hit it");
        Survey survey = sr.findByName(obj.getName());
        String end = obj.getEnd();

        survey.setEnd(end);
        sr.save(survey);


        ServiceResponse r = new ServiceResponse();
        r.setMessage("Survey End Date extended!!");
        return new ResponseEntity<ServiceResponse>(r, HttpStatus.OK);
    }




}
