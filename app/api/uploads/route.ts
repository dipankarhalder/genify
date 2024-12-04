import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import nextConnect from 'next-connect';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const uploadDir = './public/uploads';

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir); // Set upload directory
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // Get file extension
      cb(null, Date.now() + ext); // Use timestamp for filename
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

const handler = nextConnect<NextRequest, NextResponse>();

// Middleware to handle file upload
handler.use(upload.single('image')); // The form field name must be 'image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
handler.post((req: any, res: any) => {
  if (req.file) {
    return res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  }
  return res.status(400).json({ error: 'No file uploaded' });
});

export default handler;