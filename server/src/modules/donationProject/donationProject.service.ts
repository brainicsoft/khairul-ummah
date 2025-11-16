// donationProject.service.ts
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
            'email',
            'title',
            // 'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await donationProjectQueries.modelQuery;
      return result ;
};

// get donationProject by Id or single  service

export const getDonationProjectByIdService = async (id:string) => {
  const result = await DonationProject.findById(id);
  return result;
};

// delete donationProject by Id or single  service

export const deleteDonationProjectByIdService = async (id:string) => {
  const result = await DonationProject.findByIdAndDelete(id);
  return result;
};
// update donationProject by Id or single  service

export const updateDonationProjectByIdService = async (id:string,payload:Partial<IDonationProject>) => {
  const result = await DonationProject.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      