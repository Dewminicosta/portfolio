import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  about: { type: String, default: '' },
  skills: { type: String, default: '' },
  email: { type: String, default: '' },
  cv: { type: String, default: '' }
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
