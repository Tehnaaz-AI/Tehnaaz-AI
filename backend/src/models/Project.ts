import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  link: string;
  image: string;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
