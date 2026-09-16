package com.leo.myprojectbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="food")
@Getter @Setter
@NoArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private Boolean isCustom; //true = user created, false = API

    private String externalApiId;


    @ManyToOne
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;

    private String name;
    private Integer calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private Double servingSize;
    private String servingUnit;

}
