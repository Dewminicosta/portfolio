import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, default: '' },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
