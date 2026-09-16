package com.leo.myprojectbackend.dto.off;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OffProductResponce {
    @JsonProperty("product_name")
    private String productName;
    private OffProduct product;
}
