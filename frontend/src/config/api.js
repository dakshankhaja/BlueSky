export const API_BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  POSTS: `${API_BASE_URL}/api/posts`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`,
  }
}; 