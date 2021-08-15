package com.akash.ecommerce.dto;

import java.util.Set;

import com.akash.ecommerce.entity.Address;
import com.akash.ecommerce.entity.Customer;
import com.akash.ecommerce.entity.Order;
import com.akash.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {
	private Customer customer;
	private Address shippingAddress;
	private Address billingAddress;
	private Order order;
	private Set<OrderItem> orderItems;
}
