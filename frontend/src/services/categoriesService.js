import api from './api';

const unwrap = (response) => response.data;

export const categoriesService = {
    getAll: () => api.get('/categories').then(unwrap),
    create: (payload) => api.post('/categories', payload).then(unwrap),
    getById: (id) => api.get(`/categories/${id}`).then(unwrap),
    update: (payload, id) => api.put(`/categories/${id}`, payload).then(unwrap),
    delete: (id) => api.delete(`/categories/${id}`).then(unwrap),
};

export const dashboardService = categoriesService; 