import api from './api';

export const getReservations = (date: string) => api.get('/reservations', { params: { date } });

export const createReservation = (data: any) => api.post('/reservations', data);

export const updateReservation = (id: number, data: any) => api.put(`/reservations/${id}`, data);

export const cancelReservation = (id: number) => api.patch(`/reservations/${id}/cancel`);

export const deleteReservation = (id: number) => api.delete(`/reservations/${id}`);
