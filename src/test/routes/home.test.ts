import { app } from '../../main/app';
import { apiClient } from '../../main/modules/apiClient';
import request from 'supertest';

jest.mock('../../main/modules/apiClient');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('Home Page Routes', () => {
  describe('on GET /', () => {
    test('should render home page with tasks and pagination', async () => {
      const mockTasks = [
        { id: '1', title: 'Test Task', status: 'TODO', priority: 'MEDIUM' }
      ];
      mockedApiClient.getTasks.mockResolvedValue({
        tasks: mockTasks,
        totalTasks: 1,
        totalPages: 1,
        currentPage: 0
      });

      const res = await request(app).get('/');
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('Task Dashboard');
      expect(res.text).toContain('Test Task');
      // Verify pagination (Page 1) is present since we have tasks
      expect(res.text).toContain('govuk-pagination');
      expect(res.text).toContain('aria-label="Page 1"');
    });

    test('should render home page with no tasks and no pagination', async () => {
      mockedApiClient.getTasks.mockResolvedValue({
        tasks: [],
        totalTasks: 0,
        totalPages: 0,
        currentPage: 0
      });

      const res = await request(app).get('/');
      
      expect(res.status).toBe(200);
      expect(res.text).toContain('No tasks found');
      expect(res.text).not.toContain('govuk-pagination');
    });

    test('should render error page if apiClient fails', async () => {
      mockedApiClient.getTasks.mockRejectedValue(new Error('API Failure'));

      const res = await request(app).get('/');
      
      expect(res.status).toBe(200); // Should render error state within home page or error page
      expect(res.text).toContain('Failed to load tasks');
    });
  });
});
