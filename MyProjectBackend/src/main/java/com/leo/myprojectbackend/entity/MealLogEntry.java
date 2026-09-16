package com.leo.myprojectbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "meal_log_entries")
public class MealLogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "meal_log_id", nullable = false)
    private MealLog mealLog;

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    private Double servingsConsumed;
}