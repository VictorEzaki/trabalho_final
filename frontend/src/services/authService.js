import api from './api';

const unwrap = (response) => response.data;

export const authService = {
    create: (payload) => api.post('/users', payload).then(unwrap),
    login: (payload) => api.post(`/users/login`, payload).then(unwrap),
}; 