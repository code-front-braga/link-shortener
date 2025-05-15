import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.HOST_URL as string,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
});
