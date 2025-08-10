import mongoose from 'mongoose';

const TopStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TopStudent || mongoose.model('TopStudent', TopStudentSchema);
