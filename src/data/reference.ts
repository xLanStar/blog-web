const { VITE_SERVER_HOST } = import.meta.env;

export const SERVER_HOST = VITE_SERVER_HOST;

// Auth
const AUTH_URL = `${SERVER_HOST}/auth`;
export const AUTH_SIGNUP_URL = `${AUTH_URL}/signup`;
export const AUTH_VERIFY_URL = `${AUTH_URL}/verify`;
export const AUTH_LOGIN_URL = `${AUTH_URL}/login`;
export const AUTH_LOGOUT_URL = `${AUTH_URL}/logout`;

// API
const API_URL = `${SERVER_HOST}/api`;

// API - Post
export const API_POST_URL = `${API_URL}/post`;
export const API_POST_LIKE_URL = `${API_POST_URL}/like`;
export const API_POST_DISLIKE_URL = `${API_POST_URL}/dislike`;

// API - Comment
export const API_COMMENT_URL = `${API_URL}/comment`;
