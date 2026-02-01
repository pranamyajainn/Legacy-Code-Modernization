package com.acme.order.service;

import java.util.List;

public class Order {
    private String id;
    private String customerId;
    private double totalAmount;
    private List<String> items;

    public Order(String id, String customerId, double totalAmount, List<String> items) {
        this.id = id;
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public String getId() { return id; }
    public String getCustomerId() { return customerId; }
    public double getTotalAmount() { return totalAmount; }
    public List<String> getItems() { return items; }
}
