package com.akash.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akash.ecommerce.dto.Purchase;
import com.akash.ecommerce.dto.PurchaseResponse;
import com.akash.ecommerce.service.CheckoutService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/checkout")
public class CheckoutController {

	private CheckoutService checkoutService;

	// for only one constructor its not compulsory to have @Autowired, sping will
	// automatically put
	@Autowired
	public CheckoutController(CheckoutService checkoutService) {
		this.checkoutService = checkoutService;
	}

	@PostMapping("/purchase")
	public PurchaseResponse placeHolder(@RequestBody Purchase purchase) {
		PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
		return purchaseResponse;
	}
}
