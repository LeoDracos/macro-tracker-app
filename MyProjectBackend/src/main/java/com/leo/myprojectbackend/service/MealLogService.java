package com.leo.myprojectbackend.service;

import com.leo.myprojectbackend.dto.DailySummaryDto;
import com.leo.myprojectbackend.entity.Food;
import com.leo.myprojectbackend.entity.MealLog;
import com.leo.myprojectbackend.entity.MealLogEntry;
import com.leo.myprojectbackend.entity.User;
import com.leo.myprojectbackend.enums.MealType;
import com.leo.myprojectbackend.repository.MealLogEntryRepository;
import com.leo.myprojectbackend.repository.MealLogRepository;
import com.leo.myprojectbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealLogService {

    private final MealLogRepository mealLogRepository;
    private final UserRepository userRepository;
    private final FoodService foodService;
    MealLogEntryRepository mealLogEntryRepository;

    public MealLogEntry logFood(Long userId, LocalDate date, MealType mealType, String externalApiId, Double servings){

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Food food = foodService.getOrCreateExternalFoodByBarcode(externalApiId);

        List<MealLog> existingLogs = mealLogRepository.findByUserIdAndLogDate(userId, date);
        MealLog mealLog = existingLogs.stream()
                .filter(log -> log.getMealType() == mealType)
                .findFirst()
                .orElseGet(() -> {
                    MealLog newLog = new MealLog();
                    newLog.setUser(user);
                    newLog.setLogDate(date);
                    newLog.setMealType(mealType);
                    return mealLogRepository.save(newLog);
                });

        MealLogEntry entry = new MealLogEntry();
        entry.setMealLog(mealLog);
        entry.setFood(food);
        entry.setServingsConsumed(servings);

        mealLog.getEntries().add(entry);
        mealLogRepository.save(mealLog);

        return entry;
    }

    public DailySummaryDto getDailySummary(Long userId, LocalDate date){
        List<MealLog> dailyLogs = mealLogRepository.findByUserIdAndLogDate(userId, date);

        double totalCalories = 0;
        double totalCarbs = 0;
        double totalProtein = 0;
        double totalFat = 0;

        for (MealLog log : dailyLogs){
            for(MealLogEntry entry : log.getEntries()){
                Food food = entry.getFood();
                double servings = entry.getServingsConsumed();

                totalCarbs+= food.getCarbs()*servings;
                totalCalories+= food.getCalories()*servings;
                totalFat+= food.getFat()*servings;
                totalProtein+= food.getProtein()*servings;
            }
        }
        return new DailySummaryDto(totalCalories, totalProtein, totalCarbs, totalFat);
    }

    public void deleteEntry(Long entryId){
        mealLogEntryRepository.deleteById(entryId);
    }

}
