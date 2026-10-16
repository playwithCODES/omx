const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchMoviesUrl = `${API_URL}/api/movies`;
export const loginUrl = `${API_URL}/api/auth/login`;
export const registerUrl=`${API_URL}/api/auth/register`;
export const forgotPasswordUrl = `${API_URL}/api/auth/forgot-password`;
export const resetPasswordUrl=`${API_URL}/api/auth/reset-password`;
