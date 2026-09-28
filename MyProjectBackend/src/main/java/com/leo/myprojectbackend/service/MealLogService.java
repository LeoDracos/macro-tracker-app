package com.leo.myprojectbackend.service;

import com.leo.myprojectbackend.dto.DailySummaryDto;
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

    @Transactional
    public MealLogEntry logFood(Long userId, LocalDate date, MealType mealType, String externalApiId, Double servings){

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Food> food = foodRepository.findByExternalApiId(externalApiId);

        List<MealLog> existingLogs = mealLogRepository.findByUserIdAndLogDate(userId, date);
        System.out.println(existingLogs.size());
        MealLog mealLog = existingLogs.stream()
                .filter(log -> log.getMealType() == mealType)
                .findFirst()
                .orElseGet(() -> {
                    System.out.println("NEW LOG MADE");
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

        System.out.println("=== DEBUG LOG FOOD START ===");
        System.out.println("1. Saved Entry ID: " + savedEntry.getId());
        System.out.println("2. Servings Consumed: " + savedEntry.getServingsConsumed());
        System.out.println("3. Food Object: " + savedEntry.getFood());
        if (savedEntry.getFood() != null) {
            System.out.println("4. Food ID: " + savedEntry.getFood().getId());
            System.out.println("5. Food Name: " + savedEntry.getFood().getName());
        }
        System.out.println("6. MealLog ID: " + (savedEntry.getMealLog() != null ? savedEntry.getMealLog().getId() : "NULL"));
        System.out.println("=== DEBUG LOG FOOD END ===");


        return savedEntry;
    }

    public DailySummaryDto getDailySummary(Long userId, LocalDate date){
        System.out.println("=== DEBUG GET DAILY SUMMARY START ===");
        System.out.println("Searching for UserId: " + userId + " on Date: " + date);
        List<MealLog> dailyLogs = mealLogRepository.findByUserIdAndLogDate(userId, date);
        System.out.println("Found MealLogs count: " + dailyLogs.size());

        double totalCalories = 0;
        double totalCarbs = 0;
        double totalProtein = 0;
        double totalFat = 0;

        for (MealLog log : dailyLogs){
            System.out.println(" -> Processing MealLog ID: " + log.getId() + " | Type: " + log.getMealType());
            System.out.println("    Entries count in this log: " + log.getEntries().size());
            for(MealLogEntry entry : log.getEntries()){
                Food food = entry.getFood();
                double servings = entry.getServingsConsumed();

                System.out.println("    + Entry ID: " + entry.getId() + " | Food: " + (food != null ? food.getName() : "NULL") + " | Servings: " + servings);

                totalCarbs+= food.getCarbs()*servings;
                totalCalories+= food.getCalories()*servings;
                totalFat+= food.getFat()*servings;
                totalProtein+= food.getProtein()*servings;
            }
        }
        System.out.println("CALCULATED TOTALS -> Cals: " + totalCalories + " | Prot: " + totalProtein + " | Carbs: " + totalCarbs + " | Fat: " + totalFat);
        System.out.println("=== DEBUG GET DAILY SUMMARY END ===");
        DailySummaryDto summary = new DailySummaryDto(totalCalories, totalProtein, totalCarbs, totalFat);
        System.out.println("=== create DTO ===");

        return summary;
    }

    public void deleteEntry(Long entryId){
        mealLogEntryRepository.deleteById(entryId);
    }

}
