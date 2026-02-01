export interface ArtifactFile {
    id: string;
    name: string;
    path: string;
    type: 'java' | 'go' | 'json' | 'md' | 'yaml';
    content: string;
    category: 'legacy' | 'modern' | 'report';
}

export const DEMO_ARTIFACTS: ArtifactFile[] = [
    {
        id: 'legacy-1',
        name: 'OrderService.java',
        path: 'src/main/java/com/acme/order/service/OrderService.java',
        type: 'java',
        category: 'legacy',
        content: `package com.acme.order.service;

import com.acme.order.domain.Order;
import com.acme.order.repo.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Order createOrder(Order order) {
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have items");
        }
        return repository.save(order);
    }

    public List<Order> findAll() {
        return repository.findAll();
    }
}`
    },
    {
        id: 'legacy-2',
        name: 'OrderController.java',
        path: 'src/main/java/com/acme/order/api/OrderController.java',
        type: 'java',
        category: 'legacy',
        content: `package com.acme.order.api;

import com.acme.order.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    // ...
}`
    },
    {
        id: 'modern-1',
        name: 'service.go',
        path: 'pkg/order/service.go',
        type: 'go',
        category: 'modern',
        content: `package service

import (
    "context"
    "errors"
    "github.com/acme/order/domain"
    "github.com/acme/order/repo"
)

type OrderService struct {
    repo repo.OrderRepository
}

func NewOrderService(r repo.OrderRepository) *OrderService {
    return &OrderService{repo: r}
}`
    },
    {
        id: 'modern-2',
        name: 'api.go',
        path: 'pkg/order/api.go',
        type: 'go',
        category: 'modern',
        content: `package api

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
    // ...
}`
    },
    {
        id: 'report-1',
        name: 'migration-report.md',
        path: 'reports/migration-summary.md',
        type: 'md',
        category: 'report',
        content: `# Migration Summary
        
- **Source**: Java 17 (Spring Boot)
- **Target**: Go 1.21 (Gin/Gorm)
- **Coverage**: 100%
- **Complexity Reduction**: 42%

## Modules Migrated
1. Order Service
2. User Service
3. Payment Gateway
`
    }
];
