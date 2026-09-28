package com.leo.myprojectbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MealSummarysDto {

    private double breakfastCalories;
    private double breakfastProtein;
    private double breakfastCarbs;
    private double breakfastFats;

    private double lunchCalories;
    private double lunchProtein;
    private double lunchCarbs;
    private double lunchFats;

    private double dinnerCalories;
    private double dinnerProtein;
    private double dinnerCarbs;
    private double dinnerFats;

    private double snacksCalories;
    private double snacksProtein;
    private double snacksCarbs;
    private double snacksFats;
}
