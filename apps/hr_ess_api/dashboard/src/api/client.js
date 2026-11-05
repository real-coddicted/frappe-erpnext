import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Extracts a readable error message from a Frappe API error response
 */
const formatError = (error) => {
  if (error.response) {
    // Frappe sometimes sends _server_messages (JSON array of strings)
    if (error.response.data && error.response.data._server_messages) {
      try {
        const messages = JSON.parse(error.response.data._server_messages);
        return JSON.parse(messages[0]).message || 'Server Error';
      } catch (e) {
        // fallback
      }
    }
    // General message or exc_type
    if (error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return `Server Error: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    return 'Network Error: No response received from the server.';
  } else {
    return `Error: ${error.message}`;
  }
};

export const apiGet = async (path, params = {}) => {
  try {
    const queryParams = params && params.params ? params.params : params;
    const response = await apiClient.get(path, { params: queryParams });
    return response.data;
  } catch (error) {
    const msg = formatError(error);
    console.error(`[apiGet] ${path} failed:`, msg);
    throw new Error(msg);
  }
};

export const apiPost = async (path, data = {}) => {
  try {
    const response = await apiClient.post(path, data);
    return response.data;
  } catch (error) {
    const msg = formatError(error);
    console.error(`[apiPost] ${path} failed:`, msg);
    throw new Error(msg);
  }
};

export const setCsrfToken = (token) => {
  apiClient.defaults.headers.common['X-Frappe-CSRF-Token'] = token;
};

export default apiClient;
