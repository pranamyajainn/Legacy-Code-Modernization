import { GraphNode, GraphEdge } from 'shared';

export const SEED_GRAPH_NODES: GraphNode[] = [
    // API Layer
    { id: 'api.OrderController', label: 'OrderController', type: 'class', package: 'com.acme.order.api' },
    { id: 'api.UserController', label: 'UserController', type: 'class', package: 'com.acme.user.api' },
    { id: 'api.PaymentController', label: 'PaymentController', type: 'class', package: 'com.acme.payment.api' },

    // Service Layer
    { id: 'svc.OrderService', label: 'OrderService', type: 'class', package: 'com.acme.order.service' },
    { id: 'svc.UserService', label: 'UserService', type: 'class', package: 'com.acme.user.service' },
    { id: 'svc.PaymentService', label: 'PaymentService', type: 'class', package: 'com.acme.payment.service' },
    { id: 'svc.NotificationService', label: 'NotificationService', type: 'class', package: 'com.acme.notification.service' },

    // Domain Models
    { id: 'dom.Order', label: 'Order', type: 'class', package: 'com.acme.order.domain' },
    { id: 'dom.User', label: 'User', type: 'class', package: 'com.acme.user.domain' },

    // Repository Layer
    { id: 'repo.OrderRepository', label: 'OrderRepository', type: 'class', package: 'com.acme.order.repo' },
    { id: 'repo.UserRepository', label: 'UserRepository', type: 'class', package: 'com.acme.user.repo' },
    { id: 'repo.PaymentRepository', label: 'PaymentRepository', type: 'class', package: 'com.acme.payment.repo' },

    // Utils
    { id: 'util.DateUtils', label: 'DateUtils', type: 'class', package: 'com.acme.shared.util' },
    { id: 'util.StringUtils', label: 'StringUtils', type: 'class', package: 'com.acme.shared.util' },
];

export const SEED_GRAPH_EDGES: GraphEdge[] = [
    // API -> Service
    { source: 'api.OrderController', target: 'svc.OrderService', type: 'uses' },
    { source: 'api.UserController', target: 'svc.UserService', type: 'uses' },

    // Service -> Service (Coupling)
    { source: 'svc.OrderService', target: 'svc.UserService', type: 'uses' },
    { source: 'svc.OrderService', target: 'svc.PaymentService', type: 'uses' },
    { source: 'svc.PaymentService', target: 'svc.NotificationService', type: 'uses' },

    // Service -> Repo
    { source: 'svc.OrderService', target: 'repo.OrderRepository', type: 'uses' },
    { source: 'svc.UserService', target: 'repo.UserRepository', type: 'uses' },

    // Service -> Domain
    { source: 'svc.OrderService', target: 'dom.Order', type: 'uses' },

    // Cross-cutting
    { source: 'svc.OrderService', target: 'util.DateUtils', type: 'uses' },
    { source: 'repo.OrderRepository', target: 'util.StringUtils', type: 'uses' },
];
