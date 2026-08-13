import Portfolio from '../models/portfolio.js';
import cloudinary from '../config/cloudinary.js';

// GET /api/portfolio - Get portfolio data (returns the single portfolio doc, creates one if none exists)
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({});
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/portfolio - Update portfolio data
export const updatePortfolio = async (req, res) => {
  try {
    const { name, title, about, skills, email, cv } = req.body;
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({ name, title, about, skills, email, cv });
    } else {
      portfolio.name = name !== undefined ? name : portfolio.name;
      portfolio.title = title !== undefined ? title : portfolio.title;
      portfolio.about = about !== undefined ? about : portfolio.about;
      portfolio.skills = skills !== undefined ? skills : portfolio.skills;
      portfolio.email = email !== undefined ? email : portfolio.email;
      portfolio.cv = cv !== undefined ? cv : portfolio.cv;
      await portfolio.save();
    }
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/portfolio/upload-cv - Upload CV file to Cloudinary and save URL to DB
export const uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload to Cloudinary using buffer (from multer memory storage)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'portfolio_cv',
          public_id: `cv_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    // Save CV URL to portfolio in database
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create({ cv: result.secure_url });
    } else {
      portfolio.cv = result.secure_url;
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      data: portfolio,
      cvUrl: result.secure_url
    });
  } catch (error) {
    console.error('CV upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
