import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher extends Document {
  name: string;
  specialty: string;
  imageUrl: string;
  description?: string;  // الحقل الجديد للوصف
  createdAt: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now },
});

const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;
