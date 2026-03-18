import { app } from '../../main/app';
import { apiClient } from '../../main/modules/apiClient';
import request from 'supertest';

jest.mock('../../main/modules/apiClient');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('Task Page Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('on GET /tasks/new', () => {
    test('should render create task page', async () => {
      mockedApiClient.getUsers.mockResolvedValue([{ id: '1', name: 'User 1' }]);

      const res = await request(app).get('/tasks/new');
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('Create a new Task');
      expect(res.text).toContain('User 1');
    });
  });

  describe('on POST /tasks/new', () => {
    test('should create task and redirect to home', async () => {
      mockedApiClient.createTask.mockResolvedValue({ id: '1', title: 'New Task' });

      const res = await request(app)
        .post('/tasks/new')
        .send({ title: 'New Task', priority: 'HIGH' });
      
      expect(res.status).toBe(302);
      expect(res.header.location).toBe('/');
      expect(mockedApiClient.createTask).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
        priority: 'HIGH'
      }));
    });
  });

  describe('on GET /tasks/:id', () => {
    test('should render task details page', async () => {
      const mockTask = { id: '1', title: 'Task 1', description: 'Desc' };
      mockedApiClient.getTaskById.mockResolvedValue(mockTask);

      const res = await request(app).get('/tasks/1');
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('Task 1');
      expect(res.text).toContain('Desc');
    });
  });

  describe('on GET /tasks/:id/edit', () => {
    test('should render edit task page', async () => {
      const mockTask = { id: '1', title: 'Task 1' };
      mockedApiClient.getTaskById.mockResolvedValue(mockTask);
      mockedApiClient.getUsers.mockResolvedValue([{ id: '1', name: 'User 1' }]);

      const res = await request(app).get('/tasks/1/edit');
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('Edit Task');
      expect(res.text).toContain('Task 1');
    });
  });

  describe('on POST /tasks/:id/edit', () => {
    test('should update task and redirect to task view', async () => {
      mockedApiClient.updateTask.mockResolvedValue({ id: '1', title: 'Updated Task' });

      const res = await request(app)
        .post('/tasks/1/edit')
        .send({ title: 'Updated Task', status: 'IN_PROGRESS' });
      
      expect(res.status).toBe(302);
      expect(res.header.location).toBe('/tasks/1');
    });
  });

  describe('on GET /tasks/:id/delete', () => {
    test('should delete task and redirect to home', async () => {
      mockedApiClient.deleteTask.mockResolvedValue(undefined);

      const res = await request(app).get('/tasks/1/delete');
      
      expect(res.status).toBe(302);
      expect(res.header.location).toBe('/');
      expect(mockedApiClient.deleteTask).toHaveBeenCalledWith('1');
    });
  });
});
