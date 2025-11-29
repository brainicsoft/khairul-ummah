// contact.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { IContact } from "./contact.interface";
    import { Contact } from "./contact.model";

    // Create New contact service
 
    export const createContactService = async (payload: IContact) => {
  const result = await Contact.create(payload);
  return result;
};

// getAll contact service

    export const getAllContactService = async (query: Record<string, unknown>) => {
      const contactQueries = new QueryBuilder(Contact.find(), query)
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

      const result = await contactQueries.modelQuery;
      return result ;
};

// get contact by Id or single  service

export const getContactByIdService = async (id:string) => {
  const result = await Contact.findById(id);
  return result;
};

// delete contact by Id or single  service

export const deleteContactByIdService = async (id:string) => {
  const result = await Contact.findByIdAndDelete(id);
  return result;
};
// update contact by Id or single  service

export const updateContactByIdService = async (id:string,payload:Partial<IContact>) => {
  const result = await Contact.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      