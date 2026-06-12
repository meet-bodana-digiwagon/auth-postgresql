import { Router } from 'express';
import * as adminService from './admin-service.js';

const router = Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await adminService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const updated = await adminService.updateUserRole(req.params.id, req.body.role);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export { router as adminRouter };
