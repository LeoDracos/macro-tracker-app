package com.leo.myprojectbackend.entity;

import com.leo.myprojectbackend.enums.MealType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="meal_logs")
@Getter @Setter
@NoArgsConstructor
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate logDate;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @OneToMany
    @JoinColumn(name = "entries_id")
    private List<MealLogEntry> entries = new ArrayList<>();



}
