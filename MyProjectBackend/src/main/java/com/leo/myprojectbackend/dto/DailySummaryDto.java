package com.leo.myprojectbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class DailySummaryDto {
    public DailySummaryDto(double totalCalories, double totalProtein, double totalCarbs, double totalFat) {
    }
}
