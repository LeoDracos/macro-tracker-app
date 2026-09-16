package com.leo.myprojectbackend.controller;

import com.leo.myprojectbackend.dto.DailySummaryDto;
import com.leo.myprojectbackend.entity.MealLogEntry;
import com.leo.myprojectbackend.enums.MealType;
import com.leo.myprojectbackend.service.MealLogService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:3000"})
@RequiredArgsConstructor
public class MealLogController {

    private final MealLogService mealLogService;

    @PostMapping("/add")
    public ResponseEntity<MealLogEntry> logFood(@RequestBody LogFoodRequest request){
        MealLogEntry entry = mealLogService.logFood(
                request.getUserId(),
                request.getDate(),
                request.getMealType(),
                request.getExternalApiId(),
                request.getServings()
        );
        return ResponseEntity.ok(entry);
    }

    @GetMapping("/summary")
    public ResponseEntity<DailySummaryDto> getDailySummary(@RequestParam Long userId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        DailySummaryDto summary = mealLogService.getDailySummary(userId, date);
        return ResponseEntity.ok(summary);
    }

    @DeleteMapping("/entries/{entryId}")
    public ResponseEntity<Void> deleteLogEntry(@PathVariable Long entryId){
        mealLogService.deleteEntry(entryId);
        return ResponseEntity.noContent().build();
    }



}


@Data
class LogFoodRequest {
    private Long userId;
    private LocalDate date;
    private MealType mealType;
    private String externalApiId;
    private Double servings;
}