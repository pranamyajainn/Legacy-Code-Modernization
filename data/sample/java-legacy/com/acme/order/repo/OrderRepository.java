package com.acme.order.repo;

import com.acme.order.service.Order;
import java.util.HashMap;
import java.util.Map;

public class OrderRepository {
    private Map<String, Order> database = new HashMap<>();

    public void save(Order order) {
        database.put(order.getId(), order);
    }

    public Order findById(String id) {
        return database.get(id);
    }
}
