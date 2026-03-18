import axios, { AxiosInstance } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL || 'http://host.docker.internal:8080/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Logging
    this.client.interceptors.request.use((config: any) => {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
      return config;
    });

    // Response Logging
    this.client.interceptors.response.use(
      (response: any) => {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        return response;
      },
      (error: any) => {
        console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response?.status}`, error.message);
        return Promise.reject(error);
      }
    );
  }

  // --- Tasks ---

  public async getTasks(page: number = 0, size: number = 10) {
    const response = await this.client.get('/tasks', {
      params: { page, size }
    });
    return response.data;
  }

  public async getTaskById(id: string) {
    const response = await this.client.get(`/tasks/${id}`);
    return response.data;
  }

  public async createTask(data: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    dueDate?: string;
    assignedToId?: string;
    reporterId?: string;
  }) {
    const response = await this.client.post('/tasks', data);
    return response.data;
  }

  public async updateTaskStatus(id: string, status: string) {
    const response = await this.client.patch(`/tasks/${id}/status`, { status });
    return response.data;
  }

  public async updateTask(id: string, data: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
    assignedToId?: string;
  }) {
    const response = await this.client.patch(`/tasks/${id}`, data);
    return response.data;
  }

  public async deleteTask(id: string) {
    await this.client.delete(`/tasks/${id}`);
  }

  // --- Users ---

  public async getUsers() {
    const response = await this.client.get('/users');
    return response.data;
  }

  public async getUserById(id: string) {
    const response = await this.client.get(`/users/${id}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();
