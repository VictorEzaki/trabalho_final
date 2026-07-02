import api from './api';

const unwrap = (response) => response.data;

export const dashboardService = {
    getAll: () => api.get('/expenses').then(unwrap),
    create: (payload) => api.post('/expenses', payload).then(unwrap),
    getById: (id) => api.get(`/expenses/${id}`).then(unwrap),
    update: (payload, id) => api.put(`/expenses/${id}`).then(unwrap),
    getById: (id) => api.delete(`/expenses/${id}`).then(unwrap),
}; 