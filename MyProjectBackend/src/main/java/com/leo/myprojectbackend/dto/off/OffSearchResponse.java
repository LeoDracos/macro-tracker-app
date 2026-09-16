package com.leo.myprojectbackend.dto.off;

import lombok.Data;

import java.util.List;

@Data
public class OffSearchResponse {
    private Integer count;
    private List<OffProduct> products;
}
