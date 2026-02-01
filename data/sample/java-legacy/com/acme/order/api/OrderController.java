package com.acme.order.api;

import com.acme.order.service.Order;
import com.acme.order.service.OrderService;

public class OrderController {
    private OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    public Order get(String id) {
        System.out.println("Fetching order: " + id);
        return service.getOrder(id);
    }
}
