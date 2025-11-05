import api from './api';

export const getMenu = () => api.get('/menu');

export const createItem = (data: any) => api.post('/menu', data);

export const updateItem = (id: number, data: any) => api.put(`/menu/${id}`, data);

export const deleteItem = (id: number) => api.delete(`/menu/${id}`);
