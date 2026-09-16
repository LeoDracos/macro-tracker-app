package com.leo.myprojectbackend.dto.off;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OffNutriments {
    @JsonProperty("energy-kcal_100g")
    private Integer calories;

    @JsonProperty("proteins_100g")
    private Double protein;

    @JsonProperty("carbohydrates_100g")
    private Double carbs;

    @JsonProperty("fat_100g")
    private Double fat;
}
