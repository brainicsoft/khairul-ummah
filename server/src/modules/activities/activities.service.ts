// activities.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IActivities } from "./activities.interface";
import { Activities } from "./activities.model";

// Create New activities service

export const createActivitiesService = async (payload: IActivities) => {
  const result = await Activities.create(payload);
  return result;
};

// getAll activities service

export const getAllActivitiesService = async (query: Record<string, unknown>) => {
  const activitiesQueries = new QueryBuilder(Activities.find(), query)
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

  const result = await activitiesQueries.modelQuery;
  const meta = await activitiesQueries.countTotal();
  return {result , meta};
};

// get activities by Id or single  service

export const getActivitiesByIdService = async (id: string) => {
  const result = await Activities.findById(id);
  return result;
};

// delete activities by Id or single  service

export const deleteActivitiesByIdService = async (id: string) => {
  const result = await Activities.findByIdAndDelete(id);
  return result;
};
// update activities by Id or single  service

export const updateActivitiesByIdService = async (id: string, payload: Partial<IActivities>) => {
  const result = await Activities.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};

export const getActivitiesBySlugService = async (slug: string) => {
  let activities;
  if (slug) {
    activities = await Activities.findOne({ slug: slug });
  }
  return activities;
};
