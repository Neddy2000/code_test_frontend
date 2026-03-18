import { Application } from 'express';
import { apiClient } from '../modules/apiClient';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 0;
      const size = 10;
      const paginationData = await apiClient.getTasks(page, size);
      res.render('home', { 
        tasks: paginationData.tasks, 
        totalTasks: paginationData.totalTasks,
        totalPages: paginationData.totalPages,
        currentPage: paginationData.currentPage
      });
    } catch (error) {
      console.error('Error fetching tasks from backend:', error.message);
      res.render('home', { tasks: [], error: 'Failed to load tasks' });
    }
  });
}
