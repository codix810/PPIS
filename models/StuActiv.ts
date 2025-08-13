import mongoose, { Schema, model, models } from 'mongoose';

const StuActivSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const StuActiv = models.StuActiv || model('StuActiv', StuActivSchema);

export default StuActiv;
