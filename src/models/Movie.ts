import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

const MovieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  streamingLink: { type: String, required: true }
});

export const Movie = model<IMovie>('Movie', MovieSchema);
