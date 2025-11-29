// massege.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IMassege } from "./massege.interface";
    import { Massege } from "./massege.model";

    // Create New massege service
 
    export const createMassegeService = async (payload: IMassege) => {
  const result = await Massege.create(payload);
  return result;
};

// getAll massege service

    export const getAllMassegeService = async (query: Record<string, unknown>) => {
      const massegeQueries = new QueryBuilder(Massege.find(), query)
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

      const result = await massegeQueries.modelQuery;
      return result ;
};

// get massege by Id or single  service

export const getMassegeByIdService = async (id:string) => {
  const result = await Massege.findById(id);
  return result;
};

// delete massege by Id or single  service

export const deleteMassegeByIdService = async (id:string) => {
  const result = await Massege.findByIdAndDelete(id);
  return result;
};
// update massege by Id or single  service

export const updateMassegeByIdService = async (id:string,payload:Partial<IMassege>) => {
  const result = await Massege.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      