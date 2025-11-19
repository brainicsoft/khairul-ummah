// donationProject.service.ts
import { Types } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IDonationProject } from "./donationProject.interface";
import { DonationProject } from "./donationProject.model";

// Create New donationProject service

export const createDonationProjectService = async (payload: IDonationProject) => {
  const result = await DonationProject.create(payload);
  return result;
};

// getAll donationProject service

export const getAllDonationProjectService = async (query: Record<string, unknown>) => {
  const donationProjectQueries = new QueryBuilder(DonationProject.find(), query)
    .sort()
    .filter()
    .search([
      'title',
      // 'email',
      // 'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()

  const result = await donationProjectQueries.modelQuery;
  const meta = await donationProjectQueries.countTotal();
  return {result , meta};
};

//  Only active donation projects (status = "active")
// ---------------------------
export const getAllActiveDonationProjectService = async (query: Record<string, unknown>) => {
  const donationProjectQueries = new QueryBuilder(DonationProject.find({ status: "active" }), query)
    .sort()
    .filter()
    .search([
      // "title",
      //  "desc",
        // "category"
      ])
    .fields()
    .paginate();

  const result = await donationProjectQueries.modelQuery;
  const meta = await donationProjectQueries.countTotal();

  return { result, meta };
};

// get donationProject by Id or single  service

export const getDonationProjectByIdService = async (id: string) => {
  const result = await DonationProject.findById(id);
  return result;
};

// get donationProject by slug

export const getDonationProjectBySlugService = async (slug: string) => {
  let donationProject;
  if (slug) {
    donationProject = await DonationProject.findOne({ slug: slug });
  }
  return donationProject;
};

// delete donationProject by Id or single  service

export const deleteDonationProjectByIdService = async (id: string) => {
  const result = await DonationProject.findByIdAndDelete(id);
  return result;
};
// update donationProject by Id or single  service

export const updateDonationProjectByIdService = async (id: string, payload: Partial<IDonationProject>) => {
  const result = await DonationProject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,

  });
  return result;
};

// Get only slugs of all donation projects
export const getAllDonationSlugsService = async () => {
  const slugs = await DonationProject.find({ status: "active" })
    .select("slug -_id") // select only slug, remove _id
    .lean();

  return slugs;
};

