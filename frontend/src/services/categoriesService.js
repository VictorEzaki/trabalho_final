import api from './api';

const unwrap = (response) => response.data;

export const dashboardService = {
    getAll: () => api.get('/categories').then(unwrap),
    create: (payload) => api.post('/categories', payload).then(unwrap),
    getById: (id) => api.get(`/categories/${id}`).then(unwrap),
    update: (payload, id) => api.put(`/categories/${id}`).then(unwrap),
    getById: (id) => api.delete(`/categories/${id}`).then(unwrap),
}; 