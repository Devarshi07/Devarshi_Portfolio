import express from 'express';
import { submitContact, getContactRequests, updateContactStatus } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', getContactRequests);
router.patch('/:id/status', updateContactStatus);

export default router;