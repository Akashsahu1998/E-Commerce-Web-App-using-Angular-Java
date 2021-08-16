package com.akash.ecommerce.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.akash.ecommerce.dto.Purchase;
import com.akash.ecommerce.dto.PurchaseResponse;
import com.akash.ecommerce.entity.Customer;
import com.akash.ecommerce.entity.Order;
import com.akash.ecommerce.entity.OrderItem;
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

		// retrieve the order info from dto
		Order order = purchase.getOrder();

		// generate tracking number
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);

		// populate order with orderitems
		Set<OrderItem> orderItems = purchase.getOrderItems();
		orderItems.forEach(item -> order.add(item));

		// populate order with billing address and shipping address
		order.setBillingAddress(purchase.getBillingAddress());
		order.setShippingAddress(purchase.getShippingAddress());

		// populate customer with order
		Customer customer = purchase.getCustomer();
		customer.add(order);

		// save to the database
		customerRepository.save(customer);

		// return a response
		return new PurchaseResponse(orderTrackingNumber);
	}

	private String generateOrderTrackingNumber() {
		// Generate a random UUID number (UUID version-4)
		// https://en.wikipedia.org/wiki/Universally_unique_identifier
		// for generating the random unique ID
		return UUID.randomUUID().toString();
	}

}
