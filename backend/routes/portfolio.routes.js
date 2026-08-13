import express from 'express';
import multer from 'multer';
import { getPortfolio, updatePortfolio, uploadCV } from '../controllers/portfolio.controller.js';

const router = express.Router();

// Multer memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
  }
});

router.get('/', getPortfolio);
router.put('/', updatePortfolio);
router.post('/upload-cv', upload.single('cv'), uploadCV);

export default router;
