import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  certLabel: string;
  cert: string;
  side: 'left' | 'right';
  order: number;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  certLabel: { type: String, required: true },
  cert: { type: String, required: true },
  side: { type: String, enum: ['left', 'right'], required: true },
  order: { type: Number, required: true, default: 0 }
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
