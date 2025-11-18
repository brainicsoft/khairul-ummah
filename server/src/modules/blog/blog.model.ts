// blog.model.ts

  import { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>({
 slug: {
   type: String,
   required: true,
   unique: true,
 },
 title: {
   type: String,
   required: true,
   trim: true,
   unique: true,
 },
 description: {
   type: String,
   required: true,
 },
 date: {
   type: String,
   required: true,
 },
 author: {
   type: String,
   required: true,
 },
 category: {
   type: String,
   required: true,
 },
 image: {
   type: String,
   required: true,
 },
 content: {
  type: String,
  required: true,
},
});


  export const Blog = model<IBlog>('Blog', blogSchema);

  