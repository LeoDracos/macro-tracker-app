package com.leo.myprojectbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class DailySummaryDto {
        private double totalCalories;
        private double totalProtein;
        private double totalCarbs;
        private double totalFat;
}

