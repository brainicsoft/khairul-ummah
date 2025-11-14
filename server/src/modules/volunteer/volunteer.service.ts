// volunteer.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IVolunteer } from "./volunteer.interface";
    import { Volunteer } from "./volunteer.model";

    // Create New volunteer service
 
    export const createVolunteerService = async (payload: IVolunteer) => {
  const result = await Volunteer.create(payload);
  return result;
};

// getAll volunteer service

    export const getAllVolunteerService = async (query: Record<string, unknown>) => {
      const volunteerQueries = new QueryBuilder(Volunteer.find(), query)
      .sort()
      .filter()
      .search([
            'email',
            'fullName',
            // 'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await volunteerQueries.modelQuery;
      return result ;
};

// get volunteer by Id or single  service

export const getVolunteerByIdService = async (id:string) => {
  const result = await Volunteer.findById(id);
  return result;
};

// delete volunteer by Id or single  service

export const deleteVolunteerByIdService = async (id:string) => {
  const result = await Volunteer.findByIdAndDelete(id);
  return result;
};
// update volunteer by Id or single  service

export const updateVolunteerByIdService = async (id:string,payload:Partial<IVolunteer>) => {
  const result = await Volunteer.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      