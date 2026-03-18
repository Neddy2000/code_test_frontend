import nock from 'nock';
import { apiClient } from '../../main/modules/apiClient';

const API_URL = 'http://host.docker.internal:8080/api';

describe('ApiClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('getTasks', () => {
    test('should fetch tasks with pagination params', async () => {
      const mockData = {
        tasks: [{ id: '1', title: 'Task 1' }],
        totalTasks: 1,
        totalPages: 1,
        currentPage: 0
      };

      nock(API_URL)
        .get('/tasks')
        .query({ page: 0, size: 10 })
        .reply(200, mockData);

      const result = await apiClient.getTasks(0, 10);
      expect(result).toEqual(mockData);
    });
  });

  describe('getTaskById', () => {
    test('should fetch a task by ID', async () => {
      const mockTask = { id: '1', title: 'Task 1' };

      nock(API_URL)
        .get('/tasks/1')
        .reply(200, mockTask);

      const result = await apiClient.getTaskById('1');
      expect(result).toEqual(mockTask);
    });
  });

  describe('createTask', () => {
    test('should create a new task', async () => {
      const taskData = { title: 'New Task', priority: 'MEDIUM', status: 'TODO' };
      const createdTask = { id: '2', ...taskData };

      nock(API_URL)
        .post('/tasks', taskData)
        .reply(201, createdTask);

      const result = await apiClient.createTask(taskData);
      expect(result).toEqual(createdTask);
    });
  });

  describe('updateTask', () => {
    test('should update a task', async () => {
      const updateData = { title: 'Updated Task' };
      const updatedTask = { id: '1', title: 'Updated Task' };

      nock(API_URL)
        .patch('/tasks/1', updateData)
        .reply(200, updatedTask);

      const result = await apiClient.updateTask('1', updateData);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    test('should delete a task', async () => {
      nock(API_URL)
        .delete('/tasks/1')
        .reply(204);

      await expect(apiClient.deleteTask('1')).resolves.not.toThrow();
    });
  });

  describe('getUsers', () => {
    test('should fetch all users', async () => {
      const mockUsers = [{ id: '1', name: 'User 1' }];

      nock(API_URL)
        .get('/users')
        .reply(200, mockUsers);

      const result = await apiClient.getUsers();
      expect(result).toEqual(mockUsers);
    });
  });
});
