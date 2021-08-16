package com.akash.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {

	// final bcz @data means lombok only generate the constructor for final fields
	// or we can also use the @NonNull over the method instead of final
	private final String orderTrackingNumber;
}
