package com.leo.myprojectbackend.controller;

import com.leo.myprojectbackend.entity.Food;
import com.leo.myprojectbackend.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api/foods")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @PostMapping("/custom")
    public ResponseEntity<Food> createCustomFood(@RequestBody Food food){
        Food savedFood = foodService.createCustomFood(food);
        return ResponseEntity.ok(savedFood);
    }

    @GetMapping("/barcode/{apiId}")
    public ResponseEntity<Food> getOrCreateExternalFoodByBarcode(@PathVariable String apiId){
        Food food = foodService.getOrCreateExternalFoodByBarcode(apiId);
        return ResponseEntity.ok(food);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Food> getOrCreateExternalFoodByName(@PathVariable String name){
        Food food = foodService.getOrCreateExternalFoodByName(name);
        return ResponseEntity.ok(food);
    }



}
