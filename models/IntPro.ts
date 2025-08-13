import mongoose, { Schema, model, models } from 'mongoose';

const IntProSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const IntPro = models.IntPro || model('IntPro', IntProSchema);

export default IntPro;
