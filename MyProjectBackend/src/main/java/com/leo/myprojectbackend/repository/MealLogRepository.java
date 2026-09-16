package com.leo.myprojectbackend.repository;

import com.leo.myprojectbackend.entity.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, Long> {


    List<MealLog> findByUserIdAndLogDate(Long UserId, LocalDate logDate);
}
