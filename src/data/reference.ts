const { VITE_SERVER_HOST } = import.meta.env;

export const SERVER_HOST = VITE_SERVER_HOST;

// Auth
const AUTH_URL = `${SERVER_HOST}/auth`;
export const AUTH_SIGNUP_URL = `${AUTH_URL}/signup`;
export const AUTH_VERIFY_URL = `${AUTH_URL}/verify`;
export const AUTH_LOGIN_URL = `${AUTH_URL}/login`;

// API
const API_URL = `${SERVER_HOST}/api`;

// API - Post
export const API_POST_URL = `${API_URL}/post`;

// API - Comment
export const API_COMMENT_URL = `${API_URL}/comment`;
