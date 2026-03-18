import { Application, Request, Response } from 'express';
import { apiClient } from '../modules/apiClient';

export default function (app: Application): void {
  
  // Render the Create Task Form
  app.get('/tasks/new', async (req: Request, res: Response) => {
    try {
      const users = await apiClient.getUsers();
      res.render('create-task', { users });
    } catch (error) {
      console.error('Error fetching users for create form:', error.message);
      res.render('create-task', { users: [], error: 'Failed to load users' });
    }
  });

  // Handle Form Submission for Create Task
  app.post('/tasks/new', async (req: Request, res: Response) => {
    try {
      await apiClient.createTask({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: 'TODO',
        dueDate: req.body.dueDate || null,
        assignedToId: req.body.assignedToId || null,
      });
      console.log('Successfully created task');
      res.redirect('/');
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
      res.render('error', { message: 'Failed to create task' });
    }
  });

  // View a Specific Task Details
  app.get('/tasks/:id', async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const task = await apiClient.getTaskById(taskId);
      res.render('view-task', { task });
    } catch (error) {
       console.error(`Error fetching task details for ID ${req.params.id}:`, error.message);
       res.render('error', { message: 'Could not fetch task details' });
    }
  });

  // Delete a Task
  app.get('/tasks/:id/delete', async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      await apiClient.deleteTask(taskId);
      console.log(`Successfully deleted task ${taskId}`);
      res.redirect('/');
    } catch (error) {
       console.error(`Error deleting task ${req.params.id}:`, error.message);
       res.render('error', { message: 'Could not delete task' });
    }
  });

  // Render Edit Form
  app.get('/tasks/:id/edit', async (req: Request, res: Response) => {
    try {
      const task = await apiClient.getTaskById(req.params.id);
      const users = await apiClient.getUsers();
      res.render('edit-task', { task, users });
    } catch (error) {
      console.error(`Error fetching task ${req.params.id} for edit:`, error.message);
      res.render('error', { message: 'Failed to find task to edit' });
    }
  });

  // Handle Edit Submission
  app.post('/tasks/:id/edit', async (req: Request, res: Response) => {
    try {
      const dueDate = req.body.dueDate ? (req.body.dueDate.includes('T') ? req.body.dueDate : `${req.body.dueDate}T00:00:00Z`) : null;

      await apiClient.updateTask(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        dueDate: dueDate,
        assignedToId: req.body.assignedToId || null,
      });
      console.log(`Successfully updated task ${req.params.id}`);
      res.redirect(`/tasks/${req.params.id}`);
    } catch (error) {
      console.error(`Error updating task ${req.params.id}:`, error.response?.data || error.message);
      res.status(500).render('error', { message: 'Failed to update task' });
    }
  });
}
