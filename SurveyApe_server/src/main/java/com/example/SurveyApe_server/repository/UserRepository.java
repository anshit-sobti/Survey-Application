package com.example.SurveyApe_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.SurveyApe_server.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {
    public User findFirstByEmailAndPwd(String email, String pwd);
    public User findByEmail(String email);
}
