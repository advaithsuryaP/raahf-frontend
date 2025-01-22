import { environment } from '../../../environments/environment';

const SERVER_URL = environment.api;
export const API_ENDPOINTS = {
    transactions: `${SERVER_URL}/transactions`,
    transaction: (id: string) => `${SERVER_URL}/transactions/${id}`,
    categories: `${SERVER_URL}/categories`,
    accounts: `${SERVER_URL}/accounts`,
    login: `${SERVER_URL}/auth/login`,
    register: `${SERVER_URL}/auth/register`,
};
