import mongoose, { Schema, Document } from 'mongoose';

export interface IJourney extends Document {
  year: string;
  description: string;
  images: { image: string }[];
  order: number;
}

const JourneySchema: Schema = new Schema({
  year: { type: String, required: true },
  description: { type: String, required: true },
  images: [{
    image: { type: String, required: true }
  }],
  order: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IJourney>('Journey', JourneySchema);
