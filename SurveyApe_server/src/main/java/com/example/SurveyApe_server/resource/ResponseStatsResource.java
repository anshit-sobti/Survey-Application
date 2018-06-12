package com.example.SurveyApe_server.resource;

import com.example.SurveyApe_server.model.*;
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
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/surveys")
public class ResponseStatsResource {

	@Autowired
	SurveyRepository sr;
	@Autowired
	QuestionRepository qr;
	@Autowired
	ResponseRepository rr;
	@Autowired
	UserRepository ur;

	@PostMapping(value="/stats")
	public @ResponseBody ResponseStats addResponse (@RequestBody Survey survey) {
		System.out.println("this is it *********************"+ survey);
		ResponseStats obj=new ResponseStats();
		obj.setSname(survey.getName());
		obj.setEnd(survey.getEnd());
		obj.setPublish(survey.getPublish());

		//-------------------------------------------
		String x = rr.findSubmission(survey.getName());
		obj.setNo_of_submission(Integer.parseInt(x));
		//------------------------------------
		obj.setQuestions(qr.findAllBySname(survey.getName()));
		//------------------------------------------
		float part_rate = Integer.parseInt(x);
		Survey recp = sr.findByName(survey.getName());
		int count=0;
		for (int i = 0; i < recp.getUsers().length(); i++) {
			if (recp.getUsers().charAt(i) == ';') {
				count++;
			}
			if(recp.getUsers().contains("*"))
				count--;
		}
		count++;

		part_rate = (part_rate)/(part_rate+count);
		obj.setParticipation_rate(part_rate);


		//-----------------------------------------




		ArrayList<Answers> ans = new ArrayList<>();
		for(int i=0;i<obj.getQuestions().size();i++) {
			Question t = obj.getQuestions().get(i);
			ArrayList<Response> nn = rr.getAllByQdescription(t.getDescription());

			HashMap<String,Integer> map = new HashMap<>();
			for(int j=0;j<nn.size();j++) {

				Response r = nn.get(j);
				String[] opt = r.getOptions().split(";");
				for(int k=0;k<opt.length;k++) {
					if(map.containsKey(opt[k])) {
						map.put(opt[k], map.get(opt[k])+1);
					}
					else {
						map.put(opt[k], 1);
					}
				}
			}
			Answers a = new Answers();
			a.setMap(map);
			a.setQuestion(t);;
			ans.add(a);
		}

		obj.setAnswers(ans);;
		return obj;
	}


}
