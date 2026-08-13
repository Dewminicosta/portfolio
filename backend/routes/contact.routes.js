import express from 'express';
import {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactRateLimiter, createMessage);
router.get('/messages', getMessages);
router.patch('/messages/:id', updateMessageStatus);
router.delete('/messages/:id', deleteMessage);

export default router;
