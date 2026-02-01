package com.acme.order.service;

import com.acme.order.repo.OrderRepository;

public class OrderService {
    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public Order getOrder(String id) {
        return repo.findById(id);
    }

    public void createOrder(Order order) {
        if (order.getTotalAmount() < 0) {
            throw new IllegalArgumentException("Negative amount");
        }
        repo.save(order);
    }
}
