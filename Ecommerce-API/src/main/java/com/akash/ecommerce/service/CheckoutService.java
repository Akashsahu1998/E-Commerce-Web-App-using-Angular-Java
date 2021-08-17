package com.akash.ecommerce.service;

import com.akash.ecommerce.dto.Purchase;
import com.akash.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
	PurchaseResponse placeOrder(Purchase purchase);
}