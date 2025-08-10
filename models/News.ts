import mongoose, { Schema, model, models } from 'mongoose';

const newsSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  notes: { type: String },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const News = models.News || model('News', newsSchema);

export default News;
