// gallery.model.ts

  import { Schema, model } from 'mongoose';
import { IGallery } from './gallery.interface';

const gallerySchema = new Schema<IGallery>({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  purpose: {
    type: String,
    required: false,
  },
   date: {
    type: String,
    required: false,
    default: Date.now,
  },
});


  export const Gallery = model<IGallery>('Gallery', gallerySchema);

  