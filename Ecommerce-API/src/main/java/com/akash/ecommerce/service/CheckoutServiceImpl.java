package com.akash.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.akash.ecommerce.dto.Purchase;
import com.akash.ecommerce.dto.PurchaseResponse;
import com.akash.ecommerce.repository.CustomerRepository;

@Service
public class CheckoutServiceImpl implements CheckoutService {
	private CustomerRepository customerRepository;

	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PurchaseResponse placeHolder(Purchase purchase) {
		// TODO Auto-generated method stub
		return null;
	}

}
