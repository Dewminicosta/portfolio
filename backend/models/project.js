import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: '' },
  github: { type: String, default: '' },
  live: { type: String, default: '' }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
