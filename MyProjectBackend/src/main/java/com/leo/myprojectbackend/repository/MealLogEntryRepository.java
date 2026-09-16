package com.leo.myprojectbackend.repository;

import com.leo.myprojectbackend.entity.MealLogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealLogEntryRepository extends JpaRepository<MealLogEntry, Long> {
}
