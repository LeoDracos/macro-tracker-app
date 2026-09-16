package com.leo.myprojectbackend.controller;

import com.leo.myprojectbackend.entity.User;
import com.leo.myprojectbackend.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){//@RequestBody converts the JSON to the user entity
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){//@PathVariable uses the id from the url
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user){
        User currentUser = userService.loginUser(user);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/{id}/goals")
    public ResponseEntity<User> updateMacroGoals(@PathVariable Long id, @RequestBody UpdateGoalsRequest request){
        User updatedUser = userService.updateMacroGoals(id, request.getTargetCalories(), request.getTargetProtein(), request.getTargetCarbs(), request.getTargetFat());
        return ResponseEntity.ok(updatedUser);
    }



}
@Data
class UpdateGoalsRequest {
    private Integer targetCalories;
    private Integer targetProtein;
    private Integer targetCarbs;
    private Integer targetFat;
}

