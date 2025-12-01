// lifetimeDonor.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { ILifetimeDonor } from "./lifetimeDonor.interface";
import { LifetimeDonor } from "./lifetimeDonor.model";

// Create New lifetimeDonor service

export const createLifetimeDonorService = async (payload: ILifetimeDonor) => {
  const result = await LifetimeDonor.create(payload);
  return result;
};

// getAll lifetimeDonor service

export const getAllLifetimeDonorService = async (query: Record<string, unknown>) => {
  const lifetimeDonorQueries = new QueryBuilder(LifetimeDonor.find(), query)
    .sort()
    .filter()
    .search([
      'name',
      'category',
      'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()

  const result = await lifetimeDonorQueries.modelQuery;
  return result;
};

// get lifetimeDonor by Id or single  service

export const getLifetimeDonorByIdService = async (id: string) => {
  const result = await LifetimeDonor.findById(id);
  return result;
};

// delete lifetimeDonor by Id or single  service

export const deleteLifetimeDonorByIdService = async (id: string) => {
  const result = await LifetimeDonor.findByIdAndDelete(id);
  return result;
};
// update lifetimeDonor by Id or single  service

export const updateLifetimeDonorByIdService = async (id: string, payload: Partial<ILifetimeDonor>) => {
  const result = await LifetimeDonor.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


