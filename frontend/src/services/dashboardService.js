import api from './api';

const unwrap = (response) => response.data;

export const dashboardService = {
    summaryCategory: () => api.get('/dashboard/expenses-by-category').then(unwrap),
}; 