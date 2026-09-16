package com.leo.myprojectbackend.service;

import com.leo.myprojectbackend.dto.off.OffProduct;
import com.leo.myprojectbackend.dto.off.OffProductResponce;
import com.leo.myprojectbackend.entity.Food;
import com.leo.myprojectbackend.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FoodService {

    @Value("${usda.api.key:DEMO_KEY}")
    private String usdaApiKey;
    private final FoodRepository foodRepository;
    private final RestTemplate restTemplate;

    public Food getOrCreateExternalFoodByBarcode(String barcode){
        Optional<Food> cachedFood = foodRepository.findByExternalApiId(barcode);

        if(cachedFood.isPresent())
            return cachedFood.get();

        Food externalFood = fetchFromOpenFoodFacts(barcode);

        return foodRepository.save(externalFood);
    }

    public Food getOrCreateExternalFoodByName(String name){
        Optional<Food> cachedFood = foodRepository.findByExternalApiId(name);

        if(cachedFood.isPresent())
            return cachedFood.get();

        Food externalFood = searchFoodByName(name);

        return foodRepository.save(externalFood);
    }

    //OPENFOODFACTS
    private Food fetchFromOpenFoodFacts(String barcode){
        String encodedBarcode = URLEncoder.encode(barcode.trim(), StandardCharsets.UTF_8);

        String url = "https://world.openfoodfacts.org/api/v2/product/" + encodedBarcode + ".json";

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "MyMacroTrackerApp - SpringBoot - Version 1.0");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try{
            ResponseEntity<OffProductResponce> responce = restTemplate.exchange(url, HttpMethod.GET, entity, OffProductResponce.class);

            OffProductResponce body = responce.getBody();
            if(body == null || body.getProduct() == null){
                throw new RuntimeException("Food item not found for barcode: "+ barcode);
            }

            Food food = mapOffProductToFood(body.getProduct());

            return food;
        }
        catch(Exception e){
            throw new RuntimeException("Failed to fetch product data: "+ e.getMessage(), e);
        }
    }

    //USDA
    public Food searchFoodByName(String name){
        String encodedName = URLEncoder.encode(name.trim(), StandardCharsets.UTF_8);

        String url = "https://api.nal.usda.gov/fdc/v1/foods/search?query="
                + encodedName
                + "&pageSize=1"
                + "&dataType=Foundation"
                + "&api_key=" + usdaApiKey;

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response == null || !response.containsKey("foods")) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No USDA results for: " + name);
        }

        List<Map<String, Object>> foods = (List<Map<String, Object>>)response.get("foods");

        if (foods == null || foods.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching ingredient found for: " + name);
        }

        return mapUsdaFoodToFood(foods.get(0));
    }

    public Food createCustomFood(Food food){
        food.setIsCustom(true);
        food.setExternalApiId(null);
        return foodRepository.save(food);
    }

    private Food mapOffProductToFood(OffProduct offProduct) {
        Food food = new Food();
        food.setExternalApiId(offProduct.getCode()); // Barcode acts as external ID
        food.setName(offProduct.getProductName() != null ? offProduct.getProductName() : "Unknown Name");
        food.setIsCustom(false);
        food.setServingSize(100.0);
        food.setServingUnit("g");

        if (offProduct.getNutriments() != null) {
            var nutriments = offProduct.getNutriments();
            food.setCalories(nutriments.getCalories() != null ? nutriments.getCalories() : 0);
            food.setProtein(nutriments.getProtein() != null ? nutriments.getProtein() : 0.0);
            food.setCarbs(nutriments.getCarbs() != null ? nutriments.getCarbs() : 0.0);
            food.setFat(nutriments.getFat() != null ? nutriments.getFat() : 0.0);
        }

        return food;
    }

    public Food mapUsdaFoodToFood(Map<String, Object> usdaFood){
        Food food = new Food();

        food.setName((String) usdaFood.getOrDefault("description", "Unknown Name"));
        food.setIsCustom(false);
        food.setServingSize(100.0);
        food.setServingUnit("g");
        if(usdaFood.get("fdcId") instanceof Number fdcId){
            food.setExternalApiId(fdcId.toString());
        }

        if (usdaFood.get("foodNutrients") instanceof List<?> nutrientsList) {
            for (Object item : nutrientsList) {
                if (item instanceof Map<?, ?> nutrientMap) {

                    String nutrientName = String.valueOf(nutrientMap.get("nutrientName")).toLowerCase();
                    String unitName = String.valueOf(nutrientMap.get("unitName")).toUpperCase();
                    Object amount = nutrientMap.get("value");

                    if (nutrientName.contains("energy") && unitName.equals("KCAL")) {
                        food.setCalories(((Number) amount).intValue());
                    } else if (nutrientName.contains("protein")) {
                        food.setProtein((Double)amount);
                    } else if (nutrientName.contains("carbohydrate")) {
                        food.setCarbs((Double)amount);
                    } else if (nutrientName.contains("total lipid (fat)")) {
                        food.setFat((Double)amount);
                    }
                }
            }
        }

        return food;

    }
}
