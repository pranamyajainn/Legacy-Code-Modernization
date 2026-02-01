'use client';

import { DiffEditor } from '@monaco-editor/react';

const JAVA_CODE = `package com.acme.order.service;

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
}`;

const GO_CODE = `package service

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
}

func (s *OrderService) CreateOrder(ctx context.Context, order *domain.Order) (*domain.Order, error) {
	if len(order.Items) == 0 {
		return nil, errors.New("order must have items")
	}
	return s.repo.Save(ctx, order)
}

func (s *OrderService) FindAll(ctx context.Context) ([]*domain.Order, error) {
	return s.repo.FindAll(ctx)
}`;

export default function CodeDiffViewer() {
    return (
        <div className="w-full h-full bg-[#1e1e1e] flex flex-col border border-slate-800 rounded-lg overflow-hidden">
            <div className="h-9 flex items-center bg-[#252526] border-b border-[#3e3e42] px-4 justify-between">
                <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#d8a136]" />
                        <span className="text-slate-300">OrderService.java</span>
                    </div>
                    <span className="text-slate-600">→</span>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#59c4fa]" />
                        <span className="text-slate-300">service.go</span>
                    </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                    READ-ONLY
                </div>
            </div>
            <div className="flex-1 relative">
                <DiffEditor
                    height="100%"
                    language="java"
                    original={JAVA_CODE}
                    modified={GO_CODE}
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        renderSideBySide: true,
                        scrollBeyondLastLine: false,
                        fontSize: 12,
                        fontFamily: 'JetBrains Mono, monospace',
                        lineNumbers: 'on',
                        renderOverviewRuler: false,
                        diffWordWrap: 'off'
                    }}
                />
            </div>
        </div>
    );
}
