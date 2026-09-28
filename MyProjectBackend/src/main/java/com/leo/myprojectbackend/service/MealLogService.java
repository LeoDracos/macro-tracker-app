package com.leo.myprojectbackend.service;

import com.leo.myprojectbackend.dto.DailySummaryDto;
import com.leo.myprojectbackend.dto.MealSummarysDto;
import com.leo.myprojectbackend.entity.Food;
import com.leo.myprojectbackend.entity.MealLog;
import com.leo.myprojectbackend.entity.MealLogEntry;
import com.leo.myprojectbackend.entity.User;
import com.leo.myprojectbackend.enums.MealType;
import com.leo.myprojectbackend.repository.FoodRepository;
import com.leo.myprojectbackend.repository.MealLogEntryRepository;
import com.leo.myprojectbackend.repository.MealLogRepository;
import com.leo.myprojectbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealLogService {

    private final MealLogRepository mealLogRepository;
    private final UserRepository userRepository;
    private final FoodService foodService;
    private final MealLogEntryRepository mealLogEntryRepository;
    private final FoodRepository foodRepository;

    public MealLogEntry logFood(Long userId, LocalDate date, MealType mealType, String externalApiId, Double servings){

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Food> food = foodRepository.findByExternalApiId(externalApiId);

        List<MealLog> existingLogs = mealLogRepository.findByUserIdAndLogDate(userId, date);
        System.out.println(existingLogs.size());
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
        entry.setFood(food.get());
        entry.setServingsConsumed(servings);

        mealLog.getEntries().add(entry);
        MealLogEntry savedEntry = mealLogEntryRepository.save(entry);

        return savedEntry;
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
        DailySummaryDto summary = new DailySummaryDto(totalCalories, totalProtein, totalCarbs, totalFat);

        return summary;
    }

    public MealSummarysDto getMealSummarys(Long userId, LocalDate date, MealType mealType){
        List<MealLog> mealLogList = mealLogRepository.findByUserIdAndLogDate(userId, date);
        MealSummarysDto mealSummarys = new MealSummarysDto();

        double totalCalories;
        double totalCarbs;
        double totalProtein;
        double totalFat;

        for(MealLog log: mealLogList){
            totalCalories = 0;
            totalCarbs = 0;
            totalProtein = 0;
            totalFat = 0;
            for(MealLogEntry entry: log.getEntries()){
                Food food = entry.getFood();
                double servings = entry.getServingsConsumed();

                totalCarbs+= food.getCarbs()*servings;
                totalCalories+= food.getCalories()*servings;
                totalFat+= food.getFat()*servings;
                totalProtein+= food.getProtein()*servings;
            }
            switch (log.getMealType()) {
                case BREAKFAST -> {
                    mealSummarys.setBreakfastCalories(totalCalories);
                    mealSummarys.setBreakfastProtein(totalProtein);
                    mealSummarys.setBreakfastCarbs(totalCarbs);
                    mealSummarys.setBreakfastFats(totalFat);
                }
                case LUNCH -> {
                    mealSummarys.setLunchCalories(totalCalories);
                    mealSummarys.setLunchProtein(totalProtein);
                    mealSummarys.setLunchCarbs(totalCarbs);
                    mealSummarys.setLunchFats(totalFat);
                }
                case DINNER -> {
                    mealSummarys.setDinnerCalories(totalCalories);
                    mealSummarys.setDinnerProtein(totalProtein);
                    mealSummarys.setDinnerCarbs(totalCarbs);
                    mealSummarys.setDinnerFats(totalFat);
                }
                case SNACKS -> {
                    mealSummarys.setSnacksCalories(totalCalories);
                    mealSummarys.setSnacksProtein(totalProtein);
                    mealSummarys.setSnacksCarbs(totalCarbs);
                    mealSummarys.setSnacksFats(totalFat);
                }
            }
        }
        return mealSummarys;
    }

    public void deleteEntry(Long entryId){
        mealLogEntryRepository.deleteById(entryId);
    }

}
