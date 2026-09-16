package com.leo.myprojectbackend.service;

import com.leo.myprojectbackend.entity.User;
import com.leo.myprojectbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new RuntimeException("Username is already taken!");

        return userRepository.save(user);
    }

    public User loginUser(User user){
        if( userRepository.existsByUsernameAndPassword(user.getUsername(), user.getPassword())){
            return userRepository.findByUsername(user.getUsername()).orElseThrow();
        }
        else{
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    public User updateMacroGoals(Long userId, Integer calories, Integer protein, Integer carbs, Integer fat) {
        User user = getUserById(userId);

        user.setTargetCalories(calories);
        user.setTargetProtein(protein);
        user.setTargetCarbs(carbs);
        user.setTargetFat(fat);

        return userRepository.save(user);
    }


}
