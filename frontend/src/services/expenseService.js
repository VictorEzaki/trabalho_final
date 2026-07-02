import api from './api';

const unwrap = (response) => response.data;

export const expenseService = {
    getAll: () => api.get('/expenses').then(unwrap),
    create: (payload) => api.post('/expenses', payload).then(unwrap),
    getById: (id) => api.get(`/expenses/${id}`).then(unwrap),
    update: (payload, id) => api.put(`/expenses/${id}`, payload).then(unwrap),
    delete: (id) => api.delete(`/expenses/${id}`).then(unwrap),
};

export const dashboardService = expenseService; 