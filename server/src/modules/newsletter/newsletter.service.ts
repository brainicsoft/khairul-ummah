// newsletter.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { INewsletter } from "./newsletter.interface";
import { Newsletter } from "./newsletter.model";

// Create New newsletter service

export const createNewsletterService = async (payload: INewsletter) => {
  // Check if email already exists
  const existingSubscriber = await Newsletter.findOne({
    email: payload.email,
  });

  if (existingSubscriber) {
    throw new Error("Email already subscribed");
  }

  const result = await Newsletter.create(payload);
  return result;
};



// getAll newsletter service

export const getAllNewsletterService = async (query: Record<string, unknown>) => {
  const newsletterQueries = new QueryBuilder(Newsletter.find(), query)
    .sort()
    .filter()
    .search([
      'email',
      // 'category',
      // 'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()

  const result = await newsletterQueries.modelQuery;
  return result;
};

// get newsletter by Id or single  service

export const getNewsletterByIdService = async (id: string) => {
  const result = await Newsletter.findById(id);
  return result;
};

// delete newsletter by Id or single  service

export const deleteNewsletterByIdService = async (id: string) => {
  const result = await Newsletter.findByIdAndDelete(id);
  return result;
};
// update newsletter by Id or single  service

export const updateNewsletterByIdService = async (id: string, payload: Partial<INewsletter>) => {
  const result = await Newsletter.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


